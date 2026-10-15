package compiler

import (
	"cmp"
	"encoding/json"
	"fmt"
	"go/token"
	"go/types"
	"io"
	"maps"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
)

// AsyncReport tells where the async functions of a compiled program come
// from: each root that makes a function async by itself, and how far it
// spreads. It also lists the shape classes and interface methods that
// spread marks from one function to many.
type AsyncReport struct {
	// WholeProgram reports that the build was a whole program, so the
	// analysis closed exported interfaces and function value classes over
	// the graph.
	WholeProgram bool `json:"wholeProgram"`
	// Functions counts the compiled functions and methods with a body.
	Functions int `json:"functions"`
	// AsyncFunctions counts the async ones.
	AsyncFunctions int `json:"asyncFunctions"`
	// AsyncLiterals counts the async function literals.
	AsyncLiterals int `json:"asyncLiterals"`
	// Kinds sums the roots by kind, by spread.
	Kinds []AsyncKind `json:"kinds"`
	// Roots lists the roots, those at the JavaScript and override boundary
	// first, then by spread.
	Roots []AsyncRoot `json:"roots"`
	// Amplifiers lists the shape classes and interface methods that are
	// async, by spread.
	Amplifiers []AsyncRoot `json:"amplifiers"`
	// Cuts lists the declarations that //goscript:sync marks, in source
	// order.
	Cuts []AsyncCut `json:"cuts,omitempty"`
}

// AsyncCut is a declaration that //goscript:sync marks: a function or
// method, an interface or interface method, or a func type, field or
// variable.
type AsyncCut struct {
	// Subject is the declaration.
	Subject string `json:"subject"`
	// Position is where it is declared.
	Position string `json:"position,omitempty"`
	// Reason says what the directive changes: the mark it stopped, or
	// whether calls through it would otherwise be async.
	Reason string `json:"reason"`
}

// AsyncRoot is a root of the async coloring, or an amplifier: a class or
// interface method that one async value or implementation makes async for
// every call through it.
type AsyncRoot struct {
	// Kind is the kind of cause, such as channel, sync, override-interface or
	// shape-class.
	Kind string `json:"kind"`
	// Boundary reports a root at the JavaScript or override boundary.
	Boundary bool `json:"boundary,omitempty"`
	// Subject is the function, interface method, override or class.
	Subject string `json:"subject"`
	// Reason says why it is async.
	Reason string `json:"reason"`
	// Position is where the cause is, when it is in source.
	Position string `json:"position,omitempty"`
	// Functions counts the compiled functions and methods that it makes
	// async transitively, itself included.
	Functions int `json:"functions"`
	// Literals counts the function literals that it makes async.
	Literals int `json:"literals"`
	// Only counts the functions and methods that only it makes async: they
	// would be sync if it were.
	Only int `json:"only"`
	// Packages counts Functions by package, the largest first.
	Packages []AsyncPackageCount `json:"packages"`
	// Chain is one path of async marks from the subject to a function that
	// makes nothing else async, such as main or a test.
	Chain []string `json:"chain"`
	// Values lists, for an amplifier, the async values or implementations
	// that make it async, each with the root that first reached it.
	Values []string `json:"values,omitempty"`
}

// AsyncKind sums the roots of one kind.
type AsyncKind struct {
	Kind string `json:"kind"`
	// Roots counts the roots of the kind.
	Roots int `json:"roots"`
	// Functions counts the functions and methods that its roots make async.
	Functions int `json:"functions"`
	// Only counts those that no root of another kind makes async: they
	// would be sync without the roots of this kind.
	Only int `json:"only"`
}

// AsyncPackageCount is a number of functions in a package.
type AsyncPackageCount struct {
	Package string `json:"package"`
	Count   int    `json:"count"`
}

// relativeTo returns the report with the source paths under dir made
// relative to it.
func (r *AsyncReport) relativeTo(dir string) *AsyncReport {
	// Paths under the absolute directory lose it.
	abs, err := filepath.Abs(dir)
	if r == nil || err != nil {
		return r
	}
	prefix := abs + string(filepath.Separator)
	trim := func(text string) string { return strings.ReplaceAll(text, prefix, "") }

	// Every text field may name a position.
	for _, list := range [][]AsyncRoot{r.Roots, r.Amplifiers} {
		for idx := range list {
			root := &list[idx]
			root.Subject, root.Reason, root.Position = trim(root.Subject), trim(root.Reason), trim(root.Position)
			for i := range root.Chain {
				root.Chain[i] = trim(root.Chain[i])
			}
			for i := range root.Values {
				root.Values[i] = trim(root.Values[i])
			}
		}
	}
	for idx := range r.Cuts {
		cut := &r.Cuts[idx]
		cut.Subject, cut.Reason, cut.Position = trim(cut.Subject), trim(cut.Reason), trim(cut.Position)
	}
	return r
}

// buildCuts describes each declaration that //goscript:sync marks.
func (r *asyncReporter) buildCuts() []AsyncCut {
	// The declarations are listed in source order.
	var objs []types.Object
	for obj, directive := range r.model.asyncDirectives {
		if directive == asyncDirectiveSync {
			objs = append(objs, obj)
		}
	}
	slices.SortFunc(objs, func(a, b types.Object) int { return cmp.Compare(a.Pos(), b.Pos()) })

	// Each says what it changed.
	var cuts []AsyncCut
	for _, obj := range objs {
		cut := AsyncCut{Subject: obj.Name(), Position: r.position(obj.Pos())}
		switch typed := obj.(type) {
		case *types.Func:
			cut.Subject = r.model.functionFullName(typed)
			cut.Reason = r.cutReason(typed)
		case *types.TypeName:
			cut.Subject = typed.Pkg().Path() + "." + typed.Name()
			cut.Reason = r.typeCutReason(typed)
		case *types.Var:
			cut.Reason = r.valueCutReason(typed.Type())
		}
		cuts = append(cuts, cut)
	}
	return cuts
}

// cutReason says which mark //goscript:sync stopped at a function or
// interface method.
func (r *asyncReporter) cutReason(fn *types.Func) string {
	from, ok := r.cuts[fn]
	switch {
	case !ok:
		return "no async mark reaches it"
	case from == noReportNode:
		return "keeps it sync against a root of its own"
	}
	return "keeps it sync against " + r.nodeName(from)
}

// typeCutReason says what //goscript:sync changed on an interface or func
// type.
func (r *asyncReporter) typeCutReason(typeName *types.TypeName) string {
	// An interface's methods were each cut or not.
	iface, ok := typeName.Type().Underlying().(*types.Interface)
	if !ok {
		return r.valueCutReason(typeName.Type())
	}
	var reasons []string
	for method := range iface.ExplicitMethods() {
		if _, cut := r.cuts[method]; cut {
			reasons = append(reasons, method.Name()+": "+r.cutReason(method))
		}
	}
	if len(reasons) == 0 {
		return "no async mark reaches its methods"
	}
	return strings.Join(reasons, "; ")
}

// valueCutReason says whether calls through a func type, field or variable
// of typ would be async without //goscript:sync.
func (r *asyncReporter) valueCutReason(typ types.Type) string {
	if r.model.shapeCallAsync(funcValueShape(typ)) {
		return "calls through it are not awaited; other calls of its shape are async"
	}
	return "calls through it are not awaited; calls of its shape are sync anyway"
}

// asyncReportAmplifierValues bounds the values listed per amplifier.
const asyncReportAmplifierValues = 5

// build makes the report from the recorded graph.
func (r *asyncReporter) build() *AsyncReport {
	// Count the functions of the program.
	g := newAsyncReportGraph(r)
	report := &AsyncReport{WholeProgram: r.wholeProgram}
	for fn, semFn := range r.model.functions {
		if fn == semFn.function && semFn.hasBody && !isInterfaceMethod(fn) {
			report.Functions++
			if semFn.async {
				report.AsyncFunctions++
			}
		}
	}
	for _, node := range r.model.valueNodes {
		if node.async && node.name == funcLitNodeName {
			report.AsyncLiterals++
		}
	}

	// Describe each root and amplifier with its spread.
	only := g.dominatedFunctions(r.roots)
	for _, root := range r.roots {
		entry := g.entry(root.node, root.kind, root.subject, root.detail, only)
		entry.Position = r.position(root.pos)
		entry.Boundary = boundaryAsyncCauses[root.kind]
		report.Roots = append(report.Roots, entry)
	}
	for id := range r.nodes {
		if kind := r.amplifierKind(id); kind != "" {
			entry := g.entry(id, kind, "", "", only)
			entry.Values = g.amplifierValues(id)
			report.Amplifiers = append(report.Amplifiers, entry)
		}
	}

	// The cuts follow the declarations.
	report.Cuts = r.buildCuts()

	// Boundary roots come first, then the widest spread.
	report.Kinds = g.kinds(r.roots)
	slices.SortStableFunc(report.Roots, compareAsyncRoots)
	slices.SortStableFunc(report.Amplifiers, compareAsyncRoots)
	return report
}

// compareAsyncRoots orders boundary roots first, then by spread.
func compareAsyncRoots(a, b AsyncRoot) int {
	if a.Boundary != b.Boundary {
		if a.Boundary {
			return -1
		}
		return 1
	}
	return cmp.Or(
		cmp.Compare(b.Functions, a.Functions),
		cmp.Compare(b.Literals, a.Literals),
		cmp.Compare(a.Subject, b.Subject),
		cmp.Compare(a.Position, b.Position),
	)
}

// amplifierKind returns the kind of a class or interface method node that
// is async and not a root, or "".
func (r *asyncReporter) amplifierKind(id int) string {
	node := r.nodes[id]
	if node.fn == nil || r.rootNodes[id] {
		return ""
	}
	if r.model.asyncValueClasses[node.fn] {
		return asyncCauseShapeClass
	}
	if isInterfaceMethod(node.fn) && r.model.interfaceMethodAsync(node.fn) {
		return asyncCauseInterface
	}
	return ""
}

// position formats pos as file:line, or "" when it is not in source.
func (r *asyncReporter) position(pos token.Pos) string {
	fset := r.model.fileSet()
	if fset == nil || !pos.IsValid() {
		return ""
	}
	position := fset.Position(pos)
	return position.Filename + ":" + strconv.Itoa(position.Line)
}

// nodeName names a node for the report.
func (r *asyncReporter) nodeName(id int) string {
	// A class is named by its shape, and other keys by their full names.
	node := r.nodes[id]
	if node.semFn == nil {
		if shape := r.classShape(node.fn); shape != "" {
			return "calls of " + shape + " values"
		}
		return node.fn.FullName()
	}

	// Synthetic nodes are named by what they stand for.
	semFn := node.semFn
	switch {
	case semFn.name == funcLitNodeName:
		return "func literal" + r.enclosingName(semFn.function) + " at " + r.position(semFn.function.Pos())
	case strings.HasPrefix(semFn.name, lazyInitNodeName):
		return "initializer of " + semFn.function.Pkg().Path() + "." + strings.TrimPrefix(semFn.name, lazyInitNodeName)
	case semFn.name == lockSectionNodeName:
		return "critical section of " + semFn.mutex.Name() + " at " + r.position(semFn.function.Pos())
	case strings.HasPrefix(semFn.name, mutexNodeName):
		return "Lock of mutex " + strings.TrimPrefix(semFn.name, mutexNodeName) + " declared at " + r.position(semFn.function.Pos())
	case semFn.name == funcValueNodeName:
		return "function value from an override package, calling " + r.shapeList(semFn.valueCalls)
	}
	if fullName := r.model.functionFullName(semFn.function); fullName != "" {
		return fullName
	}
	return semFn.function.FullName()
}

// classShape returns the readable shape of a class key, or "".
func (r *asyncReporter) classShape(fn *types.Func) string {
	if fn == nil || fn.Name() != funcValueNodeName {
		return ""
	}
	for shape, class := range r.model.funcValueClasses {
		if class == fn {
			return readableFuncShape(shape)
		}
	}
	return ""
}

// shapeList returns the readable shapes of a shape set.
func (r *asyncReporter) shapeList(shapes map[string]bool) string {
	var list []string
	for _, shape := range slices.Sorted(maps.Keys(shapes)) {
		list = append(list, readableFuncShape(shape))
	}
	return strings.Join(list, ", ")
}

// enclosingName returns " in F" for the declared function whose body holds
// a literal, or "".
func (r *asyncReporter) enclosingName(lit *types.Func) string {
	if lit.Pkg() == nil || r.model.packages[lit.Pkg().Path()] == nil {
		return ""
	}
	for fn, decl := range r.model.packages[lit.Pkg().Path()].functionDecls {
		if decl.Body != nil && decl.Body.Pos() <= lit.Pos() && lit.Pos() < decl.Body.End() {
			return " in " + r.model.functionFullName(fn)
		}
	}
	return ""
}

// readableFuncShape writes a shape as a Go func type, with _ for a type
// parameter.
func readableFuncShape(shape string) string {
	node := parseFuncShape(shape)
	if node == nil {
		return shape
	}
	var b strings.Builder
	writeReadableShape(&b, node)
	return b.String()
}

// writeReadableShape writes one shape node as Go syntax.
func writeReadableShape(b *strings.Builder, node *funcShapeNode) {
	// Atoms and wildcards stand alone.
	op := node.op
	switch {
	case op == funcShapeWildcard:
		b.WriteString("_")
		return
	case len(node.operands) == 0 && !strings.HasPrefix(op, "f"):
		b.WriteString(op)
		return
	}

	// Operators wrap their operands.
	switch {
	case strings.HasPrefix(op, "f"):
		writeReadableSignature(b, node)
	case op == "*", strings.HasPrefix(op, "["):
		b.WriteString(op)
		writeReadableShape(b, node.operands[0])
	case op == "map":
		b.WriteString("map[")
		writeReadableShape(b, node.operands[0])
		b.WriteString("]")
		writeReadableShape(b, node.operands[1])
	case strings.HasPrefix(op, "chan"):
		b.WriteString("chan ")
		writeReadableShape(b, node.operands[0])
	case strings.HasPrefix(op, "n"):
		name, _, _ := strings.Cut(op[1:], "[")
		b.WriteString(name + "[")
		writeReadableList(b, node.operands)
		b.WriteString("]")
	default:
		b.WriteString(op)
	}
}

// writeReadableSignature writes a signature shape as a func type.
func writeReadableSignature(b *strings.Builder, node *funcShapeNode) {
	// The operator holds the variadic flag and the counts.
	parts := strings.Split(strings.TrimPrefix(node.op, "f"), ",")
	params := 0
	if len(parts) == 3 {
		params, _ = strconv.Atoi(parts[1])
	}
	params = min(params, len(node.operands))

	// Parameters, then results.
	b.WriteString("func(")
	writeReadableList(b, node.operands[:params])
	b.WriteString(")")
	results := node.operands[params:]
	switch len(results) {
	case 0:
	case 1:
		b.WriteString(" ")
		writeReadableShape(b, results[0])
	default:
		b.WriteString(" (")
		writeReadableList(b, results)
		b.WriteString(")")
	}
}

// writeReadableList writes shapes separated by commas.
func writeReadableList(b *strings.Builder, nodes []*funcShapeNode) {
	for idx, node := range nodes {
		if idx != 0 {
			b.WriteString(", ")
		}
		writeReadableShape(b, node)
	}
}

// asyncReportGraph is the recorded graph with the traversal state that the
// spread of each entry reuses.
type asyncReportGraph struct {
	r *asyncReporter
	// stamp and parent hold the traversal marks; a node is reached in the
	// current traversal when its stamp equals epoch.
	stamp  []int
	parent []int
	epoch  int
	queue  []int
	// preds lists the nodes with an edge into each node.
	preds [][]int
}

// newAsyncReportGraph prepares the traversals of r's graph.
func newAsyncReportGraph(r *asyncReporter) *asyncReportGraph {
	g := &asyncReportGraph{
		r:      r,
		stamp:  make([]int, len(r.nodes)),
		parent: make([]int, len(r.nodes)),
		preds:  make([][]int, len(r.nodes)),
	}
	for from, edges := range r.edges {
		for _, to := range edges {
			g.preds[to] = append(g.preds[to], from)
		}
	}
	return g
}

// isFunction reports whether a node is a compiled function or method.
func (g *asyncReportGraph) isFunction(id int) bool {
	semFn := g.r.nodes[id].semFn
	return semFn != nil && semFn.hasBody && semFn.function != nil &&
		g.r.model.functions[semFn.function] == semFn
}

// isLiteral reports whether a node is a function literal.
func (g *asyncReportGraph) isLiteral(id int) bool {
	semFn := g.r.nodes[id].semFn
	return semFn != nil && semFn.name == funcLitNodeName
}

// entry describes the spread of the node id.
func (g *asyncReportGraph) entry(id int, kind, subject, reason string, only []int) AsyncRoot {
	// Reach every node from id, breadth first.
	order := g.reach(id)
	entry := AsyncRoot{Kind: kind, Subject: cmp.Or(subject, g.r.nodeName(id)), Reason: reason, Only: only[id]}
	packages := make(map[string]int)
	for _, node := range order {
		if g.isFunction(node) {
			entry.Functions++
			packages[g.r.nodes[node].semFn.function.Pkg().Path()]++
		} else if g.isLiteral(node) {
			entry.Literals++
		}
	}

	// Count by package, the largest first.
	for pkgPath, count := range packages {
		entry.Packages = append(entry.Packages, AsyncPackageCount{Package: pkgPath, Count: count})
	}
	slices.SortFunc(entry.Packages, func(a, b AsyncPackageCount) int {
		return cmp.Or(cmp.Compare(b.Count, a.Count), cmp.Compare(a.Package, b.Package))
	})
	entry.Chain = g.chain(order)
	return entry
}

// kinds sums the roots by kind.
func (g *asyncReportGraph) kinds(roots []asyncReportRoot) []AsyncKind {
	// Group the root nodes by kind.
	byKind := make(map[string][]int)
	for _, root := range roots {
		byKind[root.kind] = append(byKind[root.kind], root.node)
	}

	// Count what each kind reaches, and what the others do not.
	var kinds []AsyncKind
	for kind, nodes := range byKind {
		summary := AsyncKind{Kind: kind, Roots: len(nodes), Functions: g.countFunctions(g.reach(nodes...))}
		var others []int
		for _, root := range roots {
			if root.kind != kind {
				others = append(others, root.node)
			}
		}
		g.reach(others...)
		for node := range g.r.nodes {
			if g.stamp[node] != g.epoch && g.isFunction(node) {
				summary.Only++
			}
		}
		kinds = append(kinds, summary)
	}
	slices.SortFunc(kinds, func(a, b AsyncKind) int {
		return cmp.Or(cmp.Compare(b.Functions, a.Functions), cmp.Compare(a.Kind, b.Kind))
	})
	return kinds
}

// countFunctions counts the functions among nodes.
func (g *asyncReportGraph) countFunctions(nodes []int) int {
	count := 0
	for _, node := range nodes {
		if g.isFunction(node) {
			count++
		}
	}
	return count
}

// reach returns the nodes reachable from ids in breadth-first order, and
// leaves their parents set.
func (g *asyncReportGraph) reach(ids ...int) []int {
	g.epoch++
	g.queue = g.queue[:0]
	for _, id := range ids {
		if g.stamp[id] != g.epoch {
			g.stamp[id] = g.epoch
			g.parent[id] = noReportNode
			g.queue = append(g.queue, id)
		}
	}
	for head := 0; head < len(g.queue); head++ {
		for _, next := range g.r.edges[g.queue[head]] {
			if g.stamp[next] != g.epoch {
				g.stamp[next] = g.epoch
				g.parent[next] = g.queue[head]
				g.queue = append(g.queue, next)
			}
		}
	}
	return g.queue
}

// chain returns the path from the start of order to the main function of
// the program when it is reached, or else to the last node reached.
func (g *asyncReportGraph) chain(order []int) []string {
	// Find the main function, or the farthest node.
	target := order[len(order)-1]
	for _, node := range order {
		if g.isFunction(node) && isMainFunction(g.r.nodes[node].semFn.function) {
			target = node
			break
		}
	}

	// Walk the parents back to the start.
	var chain []string
	for node := target; node != noReportNode; node = g.parent[node] {
		chain = append(chain, g.r.nodeName(node))
	}
	slices.Reverse(chain)
	return chain
}

// isMainFunction reports whether fn is the main function of a main package.
func isMainFunction(fn *types.Func) bool {
	return fn.Name() == "main" && fn.Pkg() != nil && fn.Pkg().Name() == "main" && fn.Parent() == fn.Pkg().Scope()
}

// amplifierValues names the nodes with an edge into id, each with the root
// that first reached it.
func (g *asyncReportGraph) amplifierValues(id int) []string {
	// Name each source of an edge into id with its root.
	sources := g.preds[id]
	var values []string
	for _, from := range sources[:min(len(sources), asyncReportAmplifierValues)] {
		values = append(values, g.r.nodeName(from)+g.rootSuffix(from))
	}
	if len(sources) > asyncReportAmplifierValues {
		values = append(values, fmt.Sprintf("and %d more", len(sources)-asyncReportAmplifierValues))
	}
	return values
}

// rootSuffix returns " (from ROOT)" naming the root that first reached id,
// following the first edges back.
func (g *asyncReportGraph) rootSuffix(id int) string {
	// Follow the first edges, which never loop, to a root.
	node, steps := id, 0
	for g.r.firstFrom[node] != noReportNode && steps < len(g.r.nodes) {
		node = g.r.firstFrom[node]
		steps++
	}

	// Name the root's cause.
	for _, root := range g.r.roots {
		if root.node == node {
			text := root.kind + ": " + root.detail
			if position := g.r.position(root.pos); position != "" {
				text += " at " + position
			}
			if node != id {
				text += " in " + g.r.nodeName(node)
			}
			return " (" + text + ")"
		}
	}
	return ""
}

// dominatedFunctions returns, for each node, the number of functions that
// every path from the roots to them passes through it, itself included: the
// functions that would be sync if it were.
//
// It computes the dominator tree of the graph with a source above every
// root, by the iterative algorithm of Cooper, Harvey and Kennedy.
func (g *asyncReportGraph) dominatedFunctions(roots []asyncReportRoot) []int {
	// Number the nodes in reverse postorder from the source.
	source := len(g.r.nodes)
	succ := func(node int) []int {
		if node == source {
			return asyncRootNodes(roots)
		}
		return g.r.edges[node]
	}
	order := reversePostorder(source, len(g.r.nodes)+1, succ)
	rank := make([]int, len(g.r.nodes)+1)
	for idx, node := range order {
		rank[node] = idx + 1
	}

	// Each node's predecessors, in the reverse postorder numbering.
	preds := make([][]int, len(g.r.nodes)+1)
	for _, node := range order {
		for _, next := range succ(node) {
			preds[next] = append(preds[next], node)
		}
	}

	// Iterate the immediate dominators to their fixed point.
	idom := computeIdom(order, rank, preds, source)

	// Sum the functions up the dominator tree, children first.
	counts := make([]int, len(g.r.nodes)+1)
	for idx := len(order) - 1; idx > 0; idx-- {
		node := order[idx]
		if g.isFunction(node) {
			counts[node]++
		}
		counts[idom[node]] += counts[node]
	}
	return counts
}

// asyncRootNodes returns the nodes of roots.
func asyncRootNodes(roots []asyncReportRoot) []int {
	nodes := make([]int, len(roots))
	for idx, root := range roots {
		nodes[idx] = root.node
	}
	return nodes
}

// reversePostorder returns the nodes reachable from start in reverse
// postorder of a depth-first walk.
func reversePostorder(start, count int, succ func(int) []int) []int {
	// Walk depth first with an explicit stack of next-edge indexes.
	visited := make([]bool, count)
	type frame struct{ node, next int }
	stack := []frame{{node: start}}
	visited[start] = true
	var post []int
	for len(stack) != 0 {
		top := &stack[len(stack)-1]
		edges := succ(top.node)
		if top.next == len(edges) {
			post = append(post, top.node)
			stack = stack[:len(stack)-1]
			continue
		}
		next := edges[top.next]
		top.next++
		if !visited[next] {
			visited[next] = true
			stack = append(stack, frame{node: next})
		}
	}
	slices.Reverse(post)
	return post
}

// computeIdom returns the immediate dominator of each node in order, which
// starts at source; rank numbers the nodes from 1 in that order.
func computeIdom(order, rank []int, preds [][]int, source int) []int {
	// Only the source is decided at first.
	idom := make([]int, len(rank))
	for idx := range idom {
		idom[idx] = noReportNode
	}
	idom[source] = source

	// Intersect the dominators of the decided predecessors until stable.
	for changed := true; changed; {
		changed = false
		for _, node := range order[1:] {
			next := noReportNode
			for _, pred := range preds[node] {
				if idom[pred] == noReportNode {
					continue
				}
				if next == noReportNode {
					next = pred
				} else {
					next = intersectIdom(idom, rank, pred, next)
				}
			}
			if next != idom[node] {
				idom[node] = next
				changed = true
			}
		}
	}
	return idom
}

// intersectIdom returns the nearest common dominator of a and b.
func intersectIdom(idom, rank []int, a, b int) int {
	for a != b {
		for rank[a] > rank[b] {
			a = idom[a]
		}
		for rank[b] > rank[a] {
			b = idom[b]
		}
	}
	return a
}

// asyncReportListedPackages bounds the packages the text form lists.
const asyncReportListedPackages = 6

// asyncReportChainEnds bounds the nodes the text form shows at each end of
// a chain.
const asyncReportChainEnds = 4

// WriteJSON writes the report as indented JSON.
func (r *AsyncReport) WriteJSON(w io.Writer) error {
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ")
	return encoder.Encode(r)
}

// WriteText writes the report as text.
func (r *AsyncReport) WriteText(w io.Writer) error {
	// A summary of the program comes first.
	var b strings.Builder
	build := "a whole program"
	if !r.WholeProgram {
		build = "a library build"
	}
	fmt.Fprintf(&b, "async report: %d of %d functions and methods are async, and %d function literals, in %s\n",
		r.AsyncFunctions, r.Functions, r.AsyncLiterals, build)
	b.WriteString("spread counts the functions and methods each makes async, transitively and itself included;\n")
	b.WriteString("only counts those no other root reaches, which would be sync without it;\n")
	b.WriteString("a chain shows one path of marks, each making the next async: a callee before its caller\n")

	// Then the kinds.
	b.WriteString("\nroots by kind: roots, spread, only\n")
	for _, kind := range r.Kinds {
		fmt.Fprintf(&b, "   %-20s %5d %6d %6d\n", kind.Kind, kind.Roots, kind.Functions, kind.Only)
	}

	// Then the roots and the amplifiers.
	fmt.Fprintf(&b, "\nroots (%d), the JavaScript and override boundary first, then by spread:\n", len(r.Roots))
	for idx, root := range r.Roots {
		writeAsyncRootText(&b, idx+1, root)
	}
	fmt.Fprintf(&b, "\nshape classes and interface methods made async by a value or implementation (%d), by spread:\n", len(r.Amplifiers))
	for idx, root := range r.Amplifiers {
		writeAsyncRootText(&b, idx+1, root)
	}

	// Then the declarations //goscript:sync marks.
	if len(r.Cuts) != 0 {
		fmt.Fprintf(&b, "\ndeclarations %s marks (%d):\n", syncDirectiveLine, len(r.Cuts))
	}
	for idx, cut := range r.Cuts {
		fmt.Fprintf(&b, "\n%d. %s\n   %s\n", idx+1, cut.Subject, cut.Reason)
		if cut.Position != "" {
			fmt.Fprintf(&b, "   at %s\n", cut.Position)
		}
	}
	_, err := io.WriteString(w, b.String())
	return err
}

// writeAsyncRootText writes one root or amplifier as text.
func writeAsyncRootText(b *strings.Builder, number int, root AsyncRoot) {
	// The kind and subject head the entry, then the reason and position.
	fmt.Fprintf(b, "\n%d. [%s] %s\n", number, root.Kind, root.Subject)
	if root.Reason != "" {
		fmt.Fprintf(b, "   %s\n", root.Reason)
	}
	if root.Position != "" {
		fmt.Fprintf(b, "   at %s\n", root.Position)
	}
	for _, value := range root.Values {
		fmt.Fprintf(b, "   value %s\n", value)
	}

	// The spread, by package.
	fmt.Fprintf(b, "   spread %d functions and methods, %d literals; only %d\n", root.Functions, root.Literals, root.Only)
	if len(root.Packages) != 0 {
		var list []string
		for _, count := range root.Packages[:min(len(root.Packages), asyncReportListedPackages)] {
			list = append(list, count.Package+" "+strconv.Itoa(count.Count))
		}
		if more := len(root.Packages) - asyncReportListedPackages; more > 0 {
			list = append(list, fmt.Sprintf("%d more packages", more))
		}
		fmt.Fprintf(b, "   packages %s\n", strings.Join(list, ", "))
	}

	// One chain, with its middle elided when long.
	chain := root.Chain
	if len(chain) > 2*asyncReportChainEnds+1 {
		elided := fmt.Sprintf("(%d more)", len(chain)-2*asyncReportChainEnds)
		chain = slices.Concat(chain[:asyncReportChainEnds], []string{elided}, chain[len(chain)-asyncReportChainEnds:])
	}
	if len(chain) > 1 {
		fmt.Fprintf(b, "   chain %s\n", strings.Join(chain, "\n      -> "))
	}
}

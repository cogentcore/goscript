package compiler

import (
	"go/types"
	"strconv"
	"strings"
)

// Function value shapes.
//
// A call through a function value reaches any function whose value the
// program takes with an assignable type. Assignable func types have
// identical underlying signatures, so the analysis groups calls and values by
// the shape of their signature, ignoring parameter names and receivers.
//
// A shape is a string, so that body summaries and fact digests can carry it.
// A type parameter is the wildcard "?", which matches any type: a generic
// function may be instantiated with any type argument, and matching ignores
// whether two occurrences of one type parameter bind the same type, which
// only matches more. A struct or interface type that mentions a type
// parameter is a wildcard as a whole. Two distinct types that print the same,
// such as local types of different functions, share a shape, which also only
// matches more.
//
// The grammar is a prefix tree: "?" for a wildcard, an atom written as its
// length, a colon and its text, or a parenthesized operator followed by its
// operands: "(*" elem ")", "([]" elem ")", "([N]" elem ")", "(map" key
// elem ")", "(chanD" elem ")", "(nNAME" args ")" for an instantiated named
// type, and "(fV,P,R" params results ")" for a signature, where V is 1 for a
// variadic signature and P and R count the params and results.

// funcShapeWildcard is the shape of a type parameter.
const funcShapeWildcard = "?"

// funcValueShape returns the shape of typ's underlying signature, or "" when
// typ is not a func type.
func funcValueShape(typ types.Type) string {
	signature := signatureForType(typ)
	if signature == nil {
		return ""
	}
	var b strings.Builder
	writeSignatureShape(&b, signature)
	return b.String()
}

// writeSignatureShape writes the shape of signature without its receiver.
func writeSignatureShape(b *strings.Builder, signature *types.Signature) {
	// The operator carries the variadic flag and both counts.
	params, results := signature.Params(), signature.Results()
	b.WriteString("(f")
	if signature.Variadic() {
		b.WriteByte('1')
	} else {
		b.WriteByte('0')
	}
	b.WriteString("," + strconv.Itoa(params.Len()) + "," + strconv.Itoa(results.Len()))

	// The operands are the parameter types, then the result types.
	for v := range params.Variables() {
		b.WriteByte(' ')
		writeTypeShape(b, v.Type())
	}
	for v := range results.Variables() {
		b.WriteByte(' ')
		writeTypeShape(b, v.Type())
	}
	b.WriteByte(')')
}

// writeTypeShape writes the shape of typ.
func writeTypeShape(b *strings.Builder, typ types.Type) {
	typ = types.Unalias(typ)
	switch typed := typ.(type) {
	case *types.TypeParam:
		b.WriteString(funcShapeWildcard)
	case *types.Pointer:
		writeCompositeShape(b, "*", typed.Elem())
	case *types.Slice:
		writeCompositeShape(b, "[]", typed.Elem())
	case *types.Array:
		writeCompositeShape(b, "["+strconv.FormatInt(typed.Len(), 10)+"]", typed.Elem())
	case *types.Map:
		writeCompositeShape(b, "map", typed.Key(), typed.Elem())
	case *types.Chan:
		writeCompositeShape(b, "chan"+strconv.Itoa(int(typed.Dir())), typed.Elem())
	case *types.Signature:
		writeSignatureShape(b, typed)
	case *types.Named:
		writeNamedShape(b, typed)
	default:
		writeAtomShape(b, typ)
	}
}

// writeCompositeShape writes an operator applied to the shapes of operands.
func writeCompositeShape(b *strings.Builder, op string, operands ...types.Type) {
	b.WriteString("(" + op)
	for _, operand := range operands {
		b.WriteByte(' ')
		writeTypeShape(b, operand)
	}
	b.WriteByte(')')
}

// writeNamedShape writes a named type as an atom, or as an operator over its
// type arguments when it is an instance.
func writeNamedShape(b *strings.Builder, named *types.Named) {
	args := named.TypeArgs()
	if args.Len() == 0 {
		writeAtomShape(b, named)
		return
	}
	operands := make([]types.Type, 0, args.Len())
	for arg := range args.Types() {
		operands = append(operands, arg)
	}
	name := types.TypeString(named.Origin(), nil)
	writeCompositeShape(b, "n"+strconv.Itoa(len(name))+":"+name, operands...)
}

// writeAtomShape writes typ as an atom, or as the wildcard when it mentions a
// type parameter.
func writeAtomShape(b *strings.Builder, typ types.Type) {
	if typeMentionsTypeParam(typ, make(map[types.Type]bool)) {
		b.WriteString(funcShapeWildcard)
		return
	}
	text := types.TypeString(typ, nil)
	b.WriteString(strconv.Itoa(len(text)) + ":" + text)
}

// typeMentionsTypeParam reports whether typ mentions a type parameter.
func typeMentionsTypeParam(typ types.Type, seen map[types.Type]bool) bool {
	// Each type is visited once, which also stops recursive types.
	if typ == nil || seen[typ] {
		return false
	}
	seen[typ] = true

	// Composite types mention what their parts mention.
	switch typed := types.Unalias(typ).(type) {
	case *types.TypeParam:
		return true
	case *types.Named:
		for arg := range typed.TypeArgs().Types() {
			if typeMentionsTypeParam(arg, seen) {
				return true
			}
		}
		return false
	case *types.Struct:
		for field := range typed.Fields() {
			if typeMentionsTypeParam(field.Type(), seen) {
				return true
			}
		}
		return false
	case *types.Interface:
		for method := range typed.Methods() {
			if typeMentionsTypeParam(method.Type(), seen) {
				return true
			}
		}
		for embedded := range typed.EmbeddedTypes() {
			if typeMentionsTypeParam(embedded, seen) {
				return true
			}
		}
		return false
	case *types.Signature:
		return tupleMentionsTypeParam(typed.Params(), seen) || tupleMentionsTypeParam(typed.Results(), seen)
	case interface{ Elem() types.Type }:
		if m, ok := typed.(*types.Map); ok && typeMentionsTypeParam(m.Key(), seen) {
			return true
		}
		return typeMentionsTypeParam(typed.Elem(), seen)
	}
	return false
}

// tupleMentionsTypeParam reports whether a variable of tuple mentions a type
// parameter.
func tupleMentionsTypeParam(tuple *types.Tuple, seen map[types.Type]bool) bool {
	for v := range tuple.Variables() {
		if typeMentionsTypeParam(v.Type(), seen) {
			return true
		}
	}
	return false
}

// funcShapeNode is a parsed shape.
type funcShapeNode struct {
	// op is the operator, the atom text, or the wildcard.
	op string
	// operands holds the operands of an operator.
	operands []*funcShapeNode
	// wild reports whether the node or an operand is a wildcard.
	wild bool
}

// parseFuncShape parses a shape, or returns nil when it is malformed.
func parseFuncShape(shape string) *funcShapeNode {
	node, rest := parseFuncShapeNode(shape)
	if rest != "" {
		return nil
	}
	return node
}

// parseFuncShapeNode parses one node from the start of shape and returns the
// rest.
func parseFuncShapeNode(shape string) (*funcShapeNode, string) {
	// A wildcard stands alone.
	if strings.HasPrefix(shape, funcShapeWildcard) {
		return &funcShapeNode{op: funcShapeWildcard, wild: true}, shape[len(funcShapeWildcard):]
	}

	// An operator runs to the first space or closing parenthesis, except that
	// a named instance's operator holds a length-prefixed name.
	if strings.HasPrefix(shape, "(") {
		return parseFuncShapeOperator(shape[1:])
	}

	// An atom is length-prefixed.
	text, rest, ok := cutCountedString(shape)
	if !ok {
		return nil, shape
	}
	return &funcShapeNode{op: text}, rest
}

// parseFuncShapeOperator parses an operator and its operands, after the
// opening parenthesis.
func parseFuncShapeOperator(shape string) (*funcShapeNode, string) {
	// Read the operator, whose named-instance form holds a counted name.
	var op string
	if strings.HasPrefix(shape, "n") {
		name, rest, ok := cutCountedString(shape[1:])
		if !ok {
			return nil, shape
		}
		op, shape = "n"+name, rest
	} else {
		end := strings.IndexAny(shape, " )")
		if end < 0 {
			return nil, shape
		}
		op, shape = shape[:end], shape[end:]
	}

	// Read the operands up to the closing parenthesis.
	node := &funcShapeNode{op: op}
	for strings.HasPrefix(shape, " ") {
		operand, rest := parseFuncShapeNode(shape[1:])
		if operand == nil {
			return nil, shape
		}
		node.operands = append(node.operands, operand)
		node.wild = node.wild || operand.wild
		shape = rest
	}
	if !strings.HasPrefix(shape, ")") {
		return nil, shape
	}
	return node, shape[1:]
}

// cutCountedString splits a length-prefixed string from the start of s.
func cutCountedString(s string) (string, string, bool) {
	count, rest, ok := strings.Cut(s, ":")
	if !ok {
		return "", s, false
	}
	n, err := strconv.Atoi(count)
	if err != nil || n < 0 || n > len(rest) {
		return "", s, false
	}
	return rest[:n], rest[n:], true
}

// funcShapesMatch reports whether a value of shape a may be called through a
// value of shape b: the shapes are equal except where either is a wildcard.
func funcShapesMatch(a, b *funcShapeNode) bool {
	if a.op == funcShapeWildcard || b.op == funcShapeWildcard {
		return true
	}
	if a.op != b.op || len(a.operands) != len(b.operands) {
		return false
	}
	for idx, operand := range a.operands {
		if !funcShapesMatch(operand, b.operands[idx]) {
			return false
		}
	}
	return true
}

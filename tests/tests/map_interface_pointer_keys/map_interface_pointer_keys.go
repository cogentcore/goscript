package main

type node struct {
	Name string
	N    int
}

type tree struct {
	Kids  []*tree
	Attrs map[string]string
	Up    *tree
}

type namer interface {
	name() string
}

func (n *node) name() string { return n.Name }

func main() {
	// Distinct pointers with equal fields are distinct keys.
	a, b := &node{"x", 1}, &node{"x", 1}
	m := map[any]int{}
	m[a] = 1
	m[b] = 2
	println("any keys:", len(m), m[a], m[b])

	// The same holds for keys of a non-empty interface type.
	n := map[namer]int{}
	n[a] = 1
	n[b] = 2
	n[a]++
	println("namer keys:", len(n), n[a], n[b])
	delete(n, a)
	_, okA := n[a]
	_, okB := n[b]
	println("after delete:", len(n), okA, okB)

	// Pointers to structs with fields of every kind, as in a traversal map.
	root := &tree{}
	visits := map[any]int{}
	for i := range 1000 {
		kid := &tree{Up: root}
		root.Kids = append(root.Kids, kid)
		visits[kid] = i
	}
	visits[root] = -1
	sum := 0
	for _, kid := range root.Kids {
		sum += visits[kid]
	}
	println("tree keys:", len(visits), visits[root], sum, visits[root.Kids[7]])

	// Typed nil pointers of the same type are equal keys.
	var n1, n2 *node
	nils := map[any]int{}
	nils[n1] = 1
	nils[n2] = 2
	println("typed nils:", len(nils), nils[n1])

	// Struct values with equal fields are the same key.
	v := map[any]int{}
	v[node{"x", 1}] = 1
	v[node{"x", 1}] = 2
	println("value keys:", len(v), v[node{"x", 1}])
}

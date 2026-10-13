package main

// layers is declared in a different file of the package than its uses as
// an interface value.
type layers []int

func (l layers) Error() string { return "layers" }

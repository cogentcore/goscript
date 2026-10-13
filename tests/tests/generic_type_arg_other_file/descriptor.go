package main

// descriptor is declared in a different file than the generic calls that
// infer it as a type argument.
type descriptor struct {
	Label string
}

func (d *descriptor) toJS() any { return "descriptor " + d.Label }

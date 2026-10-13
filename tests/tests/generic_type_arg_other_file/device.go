package main

// create only names descriptor as a type, while the inferred type argument
// of pointerToJS needs it at run time.
func create(d *descriptor) any {
	return pointerToJS(d)
}

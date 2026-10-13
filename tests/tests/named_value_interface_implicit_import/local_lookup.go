package main

// localLookup boxes a type declared in another file of this package, from a
// call declared in a third file.
func localLookup() (error, bool) {
	return findLayers()
}

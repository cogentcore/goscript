package main

// cTable is initialized lazily, as its values have a type of another file,
// and so must be cCopy, which reads it: b.go, which declares that type,
// uses cCopy, so its file is evaluated after this one.
var cTable = []bValue{{}, {}}

var cCopy = cTable

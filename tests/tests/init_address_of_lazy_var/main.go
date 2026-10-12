package main

import "github.com/s4wave/goscript/tests/tests/init_address_of_lazy_var/levels"

// UserPtr points at a variable initialized in another file; Go initializes
// variables in dependency order, so UserLevel is set before UserPtr.
var UserPtr = &UserLevel

var LevelPtr = &Level

func main() {
	println(*UserPtr, UserLevel)
	*UserPtr = 5
	println(UserLevel, *UserPtr)
	println(*LevelPtr, Level)
	Level = 7
	println(*LevelPtr)
	println(*ImportedPtr, levels.UserLevel, *levels.Ptr())
	*ImportedPtr = 8
	println(levels.UserLevel, *levels.Ptr())
}

var ImportedPtr = &levels.UserLevel

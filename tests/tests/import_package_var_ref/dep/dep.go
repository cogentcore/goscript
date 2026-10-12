package dep

type Level int

// Verbosity has its address taken, so it is stored in a pointer box.
var Verbosity Level = 2

var Ptr = &Verbosity

// UserLevel is initialized from a variable in another file and has its
// address taken.
var UserLevel = defaultLevel

func UserPtr() *Level {
	return &UserLevel
}

func Get() Level {
	return *Ptr
}

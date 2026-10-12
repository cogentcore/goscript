package dep

type Level int

var (
	Count = 1
	Hook  func() error
)

// Verbosity has its address taken, so it is stored in a pointer box.
var Verbosity Level = 2

var Ptr = &Verbosity

// UserLevel is initialized from a variable in another file and has its
// address taken.
var UserLevel = defaultLevel

func Current() int {
	return Count
}

func Wait() error {
	ch := make(chan error, 1)
	ch <- nil
	return <-ch
}

func Run() error {
	return Hook()
}

func Get() Level {
	return *Ptr
}

func UserPtr() *Level {
	return &UserLevel
}

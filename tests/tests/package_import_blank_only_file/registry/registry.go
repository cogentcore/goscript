package registry

var registered = map[string]bool{}

func Register(name string) {
	registered[name] = true
}

func Registered(name string) bool {
	return registered[name]
}

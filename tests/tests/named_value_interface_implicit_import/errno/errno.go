package errno

// Errno is a named basic type with methods, like syscall.Errno.
type Errno uintptr

func (e Errno) Error() string {
	switch e {
	case 20:
		return "not a directory"
	}
	return "errno"
}

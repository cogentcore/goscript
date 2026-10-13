package dep

import "github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno"

// Lookup returns a value whose type is declared in errno, with a second
// result, so that callers can return or assign both results at once.
func Lookup() (errno.Errno, bool) {
	return ErrNotDir, true
}

package dep

import "github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno"

// ErrNotDir has a type from a package that importers of dep do not import.
var ErrNotDir = errno.Errno(20)

package types

import "sync"

// Types holds the registered types.
var Types sync.Map

type Type struct {
	Ext  string
	MIME string
}

// NewType registers a new type, which is asynchronous because of the
// sync.Map.
func NewType(ext, mime string) Type {
	t := Type{Ext: ext, MIME: mime}
	Types.Store(ext, t)
	return t
}

// Get returns the registered type for ext.
func Get(ext string) Type {
	if t, ok := Types.Load(ext); ok {
		return t.(Type)
	}
	return Type{}
}

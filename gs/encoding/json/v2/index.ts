// encoding/json/v2 is not supported: its implementation uses the internals of
// encoding/json/jsontext, which the jsontext override does not implement, so
// compiling it from Go source fails when the package initializes. parity.json
// blocks its exports, so a program that uses one fails to compile instead.
//
// Marshaler and Unmarshaler are the exceptions: encoding/json.Marshaler and
// encoding/json.Unmarshaler are aliases of them since Go 1.27, so code that
// uses those types refers to these, which have the same methods.
import type * as $ from '@goscript/builtin/index.js'

export interface Marshaler {
  MarshalJSON(): [$.Slice<number>, $.GoError]
}

export interface Unmarshaler {
  UnmarshalJSON(data: $.Slice<number>): $.GoError
}

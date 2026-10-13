// Generated file based on multi_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"

import * as errno from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"

export function assignLookup(): [$.GoError, boolean] {
	let err: $.GoError = null! as $.GoError
	let ok: boolean = false
	let __goscriptTuple0: any = dep.Lookup()
	err = $.namedValueInterfaceValue<$.GoError>(__goscriptTuple0[0], "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno"))
	ok = __goscriptTuple0[1]
	return [err, ok]
}

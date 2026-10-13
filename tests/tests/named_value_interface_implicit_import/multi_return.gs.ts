// Generated file based on multi_return.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"

import * as errno from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"

export function lookup(): [$.GoError, boolean] {
	const __goscriptReturn0 = dep.Lookup()
	return [$.namedValueInterfaceValue<$.GoError>(__goscriptReturn0[0], "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno")), __goscriptReturn0[1]]
	throw new globalThis.Error("goscript: unreachable return")
}

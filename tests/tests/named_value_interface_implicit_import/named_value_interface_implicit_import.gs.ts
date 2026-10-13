// Generated file based on named_value_interface_implicit_import.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"

import * as errno from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"

export function notDir(): $.GoError {
	return $.namedValueInterfaceValue<$.GoError>(dep.ErrNotDir, "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno"))
}

export async function main(): globalThis.Promise<void> {
	let err = notDir()
	await $.println("error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())

	let assigned: $.GoError = null! as $.GoError
	assigned = $.namedValueInterfaceValue<$.GoError>(dep.ErrNotDir, "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno"))
	await $.println("assigned:", await $.pointerValue<Exclude<$.GoError, null>>(assigned).Error())

	let declared: $.GoError = $.namedValueInterfaceValue<$.GoError>(dep.ErrNotDir, "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno"))
	await $.println("declared:", await $.pointerValue<Exclude<$.GoError, null>>(declared).Error())

	let ch: $.Channel<$.GoError> | null = $.makeChannel<$.GoError>(1, null! as $.GoError, "both")
	await $.chanSend(ch, $.namedValueInterfaceValue<$.GoError>(dep.ErrNotDir, "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno")))
	await $.println("sent:", await $.pointerValue<Exclude<$.GoError, null>>((await $.chanRecv(ch))).Error())

	await $.println("converted:", await $.pointerValue<Exclude<$.GoError, null>>($.namedValueInterfaceValue<$.GoError>(dep.ErrNotDir, "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno"))).Error())

	let lit: (() => $.GoError | globalThis.Promise<$.GoError>) | null = $.functionValue((): $.GoError => {
		return $.namedValueInterfaceValue<$.GoError>(dep.ErrNotDir, "errno.Errno", {"Error": errno.Errno_Error}, /* @__PURE__ */ $.basicType("uintptr", "errno.Errno"))
	}, ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo))
	await $.println("func literal:", await $.pointerValue<Exclude<$.GoError, null>>((await lit!())).Error())
}

if ($.isMainScript(import.meta)) {
	await main()
}

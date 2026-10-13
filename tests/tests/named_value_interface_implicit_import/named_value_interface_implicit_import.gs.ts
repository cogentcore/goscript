// Generated file based on named_value_interface_implicit_import.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"

import * as errno from "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"

import * as __goscript_local_lookup from "./local_lookup.gs.ts"

import * as __goscript_multi_assign from "./multi_assign.gs.ts"

import * as __goscript_multi_return from "./multi_return.gs.ts"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/named_value_interface_implicit_import/errno/index.js"
import "./local_lookup.gs.ts"
import "./multi_assign.gs.ts"
import "./multi_return.gs.ts"

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

	let [looked, ok] = __goscript_multi_return.lookup()
	await $.println("multi-value return:", await $.pointerValue<Exclude<$.GoError, null>>(looked).Error(), ok)

	let __goscriptTuple0: any = __goscript_multi_assign.assignLookup()
	let multi = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println("multi-value assign:", await $.pointerValue<Exclude<$.GoError, null>>(multi).Error(), ok)

	let __goscriptTuple1: any = __goscript_local_lookup.localLookup()
	let local = __goscriptTuple1[0]
	ok = __goscriptTuple1[1]
	await $.println("local multi-value return:", await $.pointerValue<Exclude<$.GoError, null>>(local).Error(), ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}

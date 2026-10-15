// Generated file based on primitive_error_cross_file.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_error_type from "./error_type.gs.ts"
import "./error_type.gs.ts"

export function fail(): $.GoError {
	return $.namedValueInterfaceValue<$.GoError>(1, "main.remoteError", {"Error": __goscript_error_type.remoteError_Error}, /* @__PURE__ */ $.basicType("int", "main.remoteError"))
}

export async function main(): globalThis.Promise<void> {
	let err = fail()
	if (err != null) {
		await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

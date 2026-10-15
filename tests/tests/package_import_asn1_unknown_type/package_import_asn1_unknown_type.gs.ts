// Generated file based on package_import_asn1_unknown_type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as asn1 from "@goscript/encoding/asn1/index.js"

export async function main(): globalThis.Promise<void> {
	let [, err] = await asn1.Marshal($.interfaceValue($.makeChannel<number>(0, 0, "both"), "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both")))
	await $.println("err nil", err == null)
	if (err != null) {
		await $.println("err", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

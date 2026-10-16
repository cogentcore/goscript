// Generated file based on package_import_encoding_binary.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as binary from "@goscript/encoding/binary/index.js"
import type * as io from "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let buf = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let signed = 2
	{
		let err = await binary.Write($.pointerValueOrNil($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))!, $.structInterfaceValue<binary.ByteOrder | null>($.markAsStructValue($.cloneStructValue($.pointerValue<any>(binary.BigEndian))), "binary.bigEndian", "binary.bigEndian")!, $.basicInterfaceValue(signed, "int32"))
		if (err != null) {
			await $.println("write signed error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	{
		let err = await binary.Write($.pointerValueOrNil($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))!, $.structInterfaceValue<binary.ByteOrder | null>($.markAsStructValue($.cloneStructValue($.pointerValue<any>(binary.BigEndian))), "binary.bigEndian", "binary.bigEndian")!, $.basicInterfaceValue(3, "uint32"))
		if (err != null) {
			await $.println("write unsigned error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	let out = buf.value.Bytes()
	await $.println("len:", $.sliceLen(out))
	for (let __goscriptRangeTarget0 = out, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let b = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number), 8)
		await $.println(b)
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

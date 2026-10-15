// Generated file based on flate_roundtrip.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as flate from "@goscript/compress/flate/index.js"
import * as io from "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	// Mixed repeated and distinct bytes exercise dynamic Huffman blocks.
	let input = $.makeSlice<number>(4096, undefined, "byte")
	for (let __goscriptRangeTarget0 = input, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		;(__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i] = $.uint((i * 31) ^ (i >> 5), 8)
	}
	for (let __goscriptRangeTarget1 = $.arrayToSlice<number>([1, -1, 9]), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let level = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number)
		let compressed = $.varRef($.markAsStructValue(new bytes.Buffer()))
		let __goscriptTuple0: any = flate.NewWriter($.interfaceValue<io.Writer | null>(compressed, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")), level)
		let writer: flate.Writer | $.VarRef<flate.Writer> | null = __goscriptTuple0[0]
		let err = __goscriptTuple0[1]
		if (err != null) {
			$.panic((err as any))
		}
		{
			let [, __goscriptShadow0] = await (writer !== null && (writer as any).__isVarRef !== true && (writer as any).__goValue === undefined ? ((writer as any) as flate.Writer).Write(input) : flate.Writer.prototype.Write.call(writer, input))
			if (__goscriptShadow0 != null) {
				$.panic((__goscriptShadow0 as any))
			}
		}
		{
			let __goscriptShadow1 = await (writer !== null && (writer as any).__isVarRef !== true && (writer as any).__goValue === undefined ? ((writer as any) as flate.Writer).Close() : flate.Writer.prototype.Close.call(writer))
			if (__goscriptShadow1 != null) {
				$.panic((__goscriptShadow1 as any))
			}
		}

		// The decoded bytes must retain the complete original payload.
		let reader = flate.NewReader($.interfaceValue<io.Reader | null>(compressed, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))
		let __goscriptTuple1: any = await io.ReadAll($.pointerValueOrNil((reader as io.Reader | null))!)
		let output: $.Slice<number> = __goscriptTuple1[0]
		err = __goscriptTuple1[1]
		if (err != null) {
			$.panic((err as any))
		}
		{
			let __goscriptShadow2 = await (reader !== null && (reader as any).__isVarRef !== true && (reader as any).__goValue === undefined ? (reader as Exclude<io.ReadCloser, null>) : $.pointerValue<Exclude<io.ReadCloser, null>>(reader)).Close()
			if (__goscriptShadow2 != null) {
				$.panic((__goscriptShadow2 as any))
			}
		}
		await $.println(level, $.sliceLen(output), bytes.Equal(input, output))
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

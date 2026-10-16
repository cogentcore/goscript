// Generated file based on package_import_io_value_reader.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as io from "@goscript/io/index.js"
import * as strings from "@goscript/strings/index.js"

export class zeroReader {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): zeroReader {
		return new zeroReader(true)
	}

	public __goscriptAssign(source: zeroReader): this {
		return this
	}

	public Read(p: $.Slice<number>): [number, $.GoError] {
		$.clear(p, () => 0)
		return [$.sliceLen(p), null]
	}

	static __typeInfo = $.registerStructType(
		"main.zeroReader",
		() => new zeroReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }] }],
		zeroReader,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	// Bound the unbounded value reader directly.
	let __goscriptTuple0: any = await io.ReadAll($.pointerValueOrNil(io.LimitReader($.interfaceValue<io.Reader | null>(new zeroReader(true), "main.zeroReader", "main.zeroReader")!, 3n))!)
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println("limit:", $.sliceLen(data), $.arrayIndex(data!, 0) == 0, err == null)

	// Join a bounded zero range with a trailing reader through a spread slice.
	let rdrs: $.Slice<io.Reader | null> = $.arrayToSlice<io.Reader | null>([io.LimitReader($.interfaceValue<io.Reader | null>(new zeroReader(true), "main.zeroReader", "main.zeroReader")!, 2n)])
	rdrs = $.appendOne(rdrs, $.interfaceValue<io.Reader | null>(strings.NewReader("ab"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")), $.appendZeros.nil)
	let __goscriptTuple1: any = await io.ReadAll($.pointerValueOrNil(io.MultiReader(...(rdrs ?? [])))!)
	data = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("multi:", $.sliceLen(data), $.arrayIndex(data!, 1) == 0, $.bytesToString($.goSlice(data, 2, undefined)), err == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_io_value_reader.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as io from "@goscript/io/index.js"
import * as strings from "@goscript/strings/index.js"

export class zeroReader {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
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
	let __goscriptTuple0: any = await io.ReadAll($.pointerValueOrNil(io.LimitReader($.structInterfaceValue<io.Reader | null>(new zeroReader(true), "main.zeroReader", "main.zeroReader")!, 3n))!)
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err: $.GoError = __goscriptTuple0[1]
	await $.println("limit:", $.sliceLen(data), $.arrayIndex(data!, 0) == 0, err == null)

	// Join a bounded zero range with a trailing reader through a spread slice.
	let rdrs: $.Slice<io.Reader | null> = $.arrayToSlice<io.Reader | null>([io.LimitReader($.structInterfaceValue<io.Reader | null>(new zeroReader(true), "main.zeroReader", "main.zeroReader")!, 2n)])
	rdrs = $.appendOne(rdrs, $.interfaceValue<io.Reader | null>(strings.NewReader("ab"), "*strings.Reader", __goscriptStatic0()), $.appendZeros.nil)
	let __goscriptTuple1: any = await io.ReadAll($.pointerValueOrNil(io.MultiReader(...(rdrs ?? [])))!)
	data = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("multi:", $.sliceLen(data), $.arrayIndex(data!, 1) == 0, $.bytesToString($.goSlice(data, 2, undefined)), err == null)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("strings.Reader"), "strings.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["s", /* @__PURE__ */ $.basicType("string")]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

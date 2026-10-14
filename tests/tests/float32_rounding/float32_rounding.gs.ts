// Generated file based on float32_rounding.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as strconv from "@goscript/strconv/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/bytes/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"
import "@goscript/strconv/index.js"

export class T {
	public get A(): string {
		return this._fields.A
	}

	public set A(value: string) {
		this._fields.A = value
	}

	public get B(): number {
		return this._fields.B
	}

	public set B(value: number) {
		this._fields.B = value
	}

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): T {
		return new T(this, true)
	}

	public __goscriptAssign(source: T): void {
		const target = this._fields
		const values = source._fields
		target.A = values.A
		target.B = values.B
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [],
		T,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("string") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export const c32: number = 0.10000000149011612

export async function main(): globalThis.Promise<void> {
	let sum32: number = 0
	let sum64: number = 0
	for (let __rangeIndex = 0; __rangeIndex < 10; __rangeIndex++) {
		sum32 = globalThis.Math.fround(sum32 + (0.10000000149011612))
		sum64 = sum64 + (0.1)
	}
	await fmt.Println("sum32:", $.basicInterfaceValue(sum32, "float64"))
	await fmt.Println("sum64:", $.basicInterfaceValue(sum64, "float64"))

	let onePointOne32 = 1.100000023841858
	await fmt.Println("widened32:", $.basicInterfaceValue(onePointOne32, "float64"))

	let max32: number = 3.4028234663852886e+38
	let overflow32 = globalThis.Math.fround(max32 * 2)
	let finite64 = max32 * 2
	await fmt.Println("overflow32:", $.basicInterfaceValue(overflow32, "float64"))
	await fmt.Println("finite64:", $.basicInterfaceValue(finite64, "float64"))

	// constants are rounded to float32 like computed values
	let f: number = 3.140000104904175
	let [g, ] = strconv.ParseFloat("3.14", 32)
	let h = globalThis.Math.fround(g)
	await fmt.Println(f == h, 0.10000000149011612 == globalThis.Math.fround((g / 31.4)), $.basicInterfaceValue(0.10000000149011612, "float32"))
	let s = $.varRef(new T({A: "aaa", B: 3.140000104904175}, true))
	let t = new T({A: "aaa", B: h}, true)
	await fmt.Println($.structEqual(s.value, t), $.interfaceValue((s.value).clone(), "main.T", "main.T"), $.interfaceValue((t).clone(), "main.T", "main.T"))

	// float32 values format with the digits needed at 32 bits
	await fmt.Println($.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(h, "float32"), $.basicInterfaceValue(f, "float64"))
	await fmt.Printf("%v %g %.3f %f %e %G\n", $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"))
	await fmt.Println(strconv.FormatFloat(f, 103, -1, 32), strconv.FormatFloat(f, 103, -1, 64))
	await fmt.Println(strconv.FormatFloat(f, 98, -1, 32), strconv.FormatFloat(2.5, 98, -1, 64))
	let x = 0.10000000149011612
	let y = 0.20000000298023224
	let z = globalThis.Math.fround(x + y)
	await fmt.Println($.basicInterfaceValue(z, "float32"), z == 0.30000001192092896, $.basicInterfaceValue(z, "float64"))
	let d: number = 0.1
	let e = globalThis.Math.fround(d)
	await fmt.Println($.basicInterfaceValue(e, "float32"), $.basicInterfaceValue(e, "float64"))
	let m = globalThis.Math.fround(f * 3)
	await fmt.Println($.basicInterfaceValue(m, "float32"), $.basicInterfaceValue(globalThis.Math.fround(m / 7), "float32"))
	await fmt.Printf("%v %v\n", $.interfaceValue($.arrayToSlice<number>([1.100000023841858, 2.200000047683716]), "[]float32", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("float32"))), $.arrayValue([3.299999952316284, 4.400000095367432], /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 2)))

	// float64 values use Go's %v format
	await fmt.Println($.basicInterfaceValue(1e6, "float64"), $.basicInterfaceValue(123456.0, "float64"), $.basicInterfaceValue(0.00001, "float64"), $.basicInterfaceValue(2.5, "float64"))
	await fmt.Printf("%v %f %.2e %g\n", $.basicInterfaceValue(1e21, "float64"), $.basicInterfaceValue(1.5, "float64"), $.basicInterfaceValue(1234.5678, "float64"), $.basicInterfaceValue(100.0, "float64"))
	await fmt.Printf("%.2f %.0f %.0g %.1e\n", $.basicInterfaceValue(1.125, "float64"), $.basicInterfaceValue(2.5, "float64"), $.basicInterfaceValue(1.0, "float64"), $.basicInterfaceValue(2.25, "float64"))

	// float32 fields decoded from JSON are rounded to float32
	let __goscriptTuple0: any = json.Marshal($.interfaceValue((s.value).clone(), "main.T", "main.T"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let j: $.VarRef<T> = $.varRef(new T(undefined, true))
	let err: $.GoError = json.Unmarshal(b, $.interfaceValue(j, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	await fmt.Println($.bytesToString(b), $.structEqual(j.value, s.value), $.interfaceValue((j.value).clone(), "main.T", "main.T"), (err as any))
	let buf: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let enc: json.Encoder | $.VarRef<json.Encoder> | null = json.NewEncoder($.pointerValueOrNil($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))!)
	json.Encoder.prototype.SetIndent.call($.pointerValue<json.Encoder>(enc), "", "\t")
	err = await json.Encoder.prototype.Encode.call($.pointerValue<json.Encoder>(enc), $.interfaceValue(s, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	let k: $.VarRef<T> = $.varRef(new T(undefined, true))
	let err2 = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader(buf.value.Bytes()), "*bytes.Reader", /* @__PURE__ */ $.pointerType("bytes.Reader")))!)), $.interfaceValue(k, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	await fmt.Println(buf.value.Len() > 0, $.structEqual(k.value, s.value), $.interfaceValue((k.value).clone(), "main.T", "main.T"), (err as any), (err2 as any))
}

if ($.isMainScript(import.meta)) {
	await main()
}

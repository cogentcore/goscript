// Generated file based on float32_precision.go
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
	public declare A: string

	public declare B: number

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): T {
		return $.markAsStructValue(new T(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
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
	// constants are rounded to float32 like computed values
	let f: number = 3.140000104904175
	let [g, ] = strconv.ParseFloat("3.14", 32)
	let h = $.float32(g)
	await fmt.Println(f == h, 0.10000000149011612 == $.float32(g / 31.4), $.basicInterfaceValue(0.10000000149011612, "float32"))
	let s = $.varRef($.markAsStructValue(new T({A: "aaa", B: 3.140000104904175})))
	let t = $.markAsStructValue(new T({A: "aaa", B: h}))
	await fmt.Println($.structEqual(s.value, t), $.interfaceValue($.markAsStructValue($.cloneStructValue(s.value)), "main.T", "main.T"), $.interfaceValue($.markAsStructValue($.cloneStructValue(t)), "main.T", "main.T"))

	// float32 values format with the digits needed at 32 bits
	await fmt.Println($.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(h, "float32"), $.basicInterfaceValue(f, "float64"))
	await fmt.Printf("%v %g %.3f %f %e %G\n", $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"), $.basicInterfaceValue(f, "float32"))
	await fmt.Println(strconv.FormatFloat(f, 103, -1, 32), strconv.FormatFloat(f, 103, -1, 64))
	await fmt.Println(strconv.FormatFloat(f, 98, -1, 32), strconv.FormatFloat(2.5, 98, -1, 64))
	let x = 0.10000000149011612
	let y = 0.20000000298023224
	let z = $.float32(x + y)
	await fmt.Println($.basicInterfaceValue(z, "float32"), z == 0.30000001192092896, $.basicInterfaceValue(z, "float64"))
	let d: number = 0.1
	let e = $.float32(d)
	await fmt.Println($.basicInterfaceValue(e, "float32"), $.basicInterfaceValue(e, "float64"))
	let m = $.float32(f * 3)
	await fmt.Println($.basicInterfaceValue(m, "float32"), $.basicInterfaceValue($.float32(m / 7), "float32"))
	await fmt.Printf("%v %v\n", $.interfaceValue($.arrayToSlice<number>([1.100000023841858, 2.200000047683716]), "[]float32", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("float32"))), $.arrayValue([3.299999952316284, 4.400000095367432], /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 2)))

	// float64 values use Go's %v format
	await fmt.Println($.basicInterfaceValue(1e6, "float64"), $.basicInterfaceValue(123456.0, "float64"), $.basicInterfaceValue(0.00001, "float64"), $.basicInterfaceValue(2.5, "float64"))
	await fmt.Printf("%v %f %.2e %g\n", $.basicInterfaceValue(1e21, "float64"), $.basicInterfaceValue(1.5, "float64"), $.basicInterfaceValue(1234.5678, "float64"), $.basicInterfaceValue(100.0, "float64"))

	// float32 fields decoded from JSON are rounded to float32
	let __goscriptTuple0: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(s.value)), "main.T", "main.T"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let j: $.VarRef<T> = $.varRef($.markAsStructValue(new T()))
	let err = json.Unmarshal(b, $.interfaceValue(j, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	await fmt.Println($.bytesToString(b), $.structEqual(j.value, s.value), $.interfaceValue($.markAsStructValue($.cloneStructValue(j.value)), "main.T", "main.T"), (err as any))
	let buf: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let enc: json.Encoder | $.VarRef<json.Encoder> | null = json.NewEncoder($.pointerValueOrNil($.interfaceValue<io.Writer | null>(buf, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))!)
	json.Encoder.prototype.SetIndent.call($.pointerValue<json.Encoder>(enc), "", "\t")
	err = await json.Encoder.prototype.Encode.call($.pointerValue<json.Encoder>(enc), $.interfaceValue(s, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	let k: $.VarRef<T> = $.varRef($.markAsStructValue(new T()))
	let err2 = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader(buf.value.Bytes()), "*bytes.Reader", /* @__PURE__ */ $.pointerType("bytes.Reader")))!)), $.interfaceValue(k, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	await fmt.Println(buf.value.Len() > 0, $.structEqual(k.value, s.value), $.interfaceValue($.markAsStructValue($.cloneStructValue(k.value)), "main.T", "main.T"), (err as any), (err2 as any))
}

if ($.isMainScript(import.meta)) {
	await main()
}

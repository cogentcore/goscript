// Generated file based on reflect_seq.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import type * as iter from "@goscript/iter/index.js"

export class Inner {
	public declare B: number

	constructor(__goscriptValue?: boolean, B$?: number) {
		this.B = B$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(true, this.B)
	}

	public __goscriptAssign(source: Inner): this {
		this.B = source.B
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Inner",
		() => new Inner(),
		() => [],
		Inner,
		() => [/* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export class Outer {
	public declare Inner: Inner | $.VarRef<Inner> | null

	public declare C: number

	constructor(__goscriptValue?: boolean, Inner$?: Inner | $.VarRef<Inner> | null, C$?: number) {
		this.Inner = Inner$ ?? (null! as Inner | $.VarRef<Inner> | null)
		this.C = C$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(true, this.Inner, this.C)
	}

	public __goscriptAssign(source: Outer): this {
		this.Inner = source.Inner
		this.C = source.C
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Outer",
		() => new Outer(),
		() => [],
		Outer,
		() => [/* @__PURE__ */ $.structField("Inner", /* @__PURE__ */ $.pointerType("main.Inner"), [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("C", /* @__PURE__ */ $.basicType("int"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["a", "b"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))))))
	let __goscriptRangeReturn0 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(s)).Seq()!(async (i) => {
			await $.println("slice index", $.markAsStructValue($.cloneStructValue(i)).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn0) {
		return
	}
	let __goscriptRangeReturn1 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(s)).Seq2()!(async (i, e) => {
			await $.println("slice", $.markAsStructValue($.cloneStructValue(i)).Int(), $.markAsStructValue($.cloneStructValue(e)).String())
			return true
		})
	})()
	if (__goscriptRangeReturn1) {
		return
	}
	let __goscriptRangeReturn2 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3, "int")))).Seq()!(async (i) => {
			await $.println("int", $.markAsStructValue($.cloneStructValue(i)).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn2) {
		return
	}
	let __goscriptRangeReturn3 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf("h\xc3\xa9!"))).Seq2()!(async (i, r) => {
			await $.println("string", $.markAsStructValue($.cloneStructValue(i)).Int(), $.markAsStructValue($.cloneStructValue(r)).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn3) {
		return
	}
	let __goscriptRangeReturn4 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["x", 1]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))).Seq2()!(async (k, e) => {
			await $.println("map", $.markAsStructValue($.cloneStructValue(k)).String(), $.markAsStructValue($.cloneStructValue(e)).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn4) {
		return
	}

	let ch = $.makeChannel<number>(2, 0, "both")
	await $.chanSend(ch, 5)
	await $.chanSend(ch, 6)
	ch.close()
	let __goscriptRangeReturn5 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(ch, "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both"))))).Seq()!(async (e) => {
			await $.println("chan", $.markAsStructValue($.cloneStructValue(e)).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn5) {
		return
	}
	let rc = $.makeChannel<number>(1, 0, "both")
	await $.chanSend(rc, 8)
	let [v, ok] = await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(rc, "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both"))))).Recv()
	await $.println("recv", $.markAsStructValue($.cloneStructValue(v)).Int(), ok)
	rc.close()
	let __goscriptTuple0: any = await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(rc, "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both"))))).Recv()
	v = $.assignStruct(v, __goscriptTuple0[0])
	ok = __goscriptTuple0[1]
	await $.println("recv closed", $.markAsStructValue($.cloneStructValue(v)).Int(), ok)

	await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(ch, "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both")))).ChanDir(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 3, reflect.ChanDir_String((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(null, "<-chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "receive")))).ChanDir(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
	await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.basicInterfaceValue(1, "int"))).CanSeq(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.basicInterfaceValue(1, "int"))).CanSeq2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf("")).CanSeq2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.basicInterfaceValue(1.5, "float64"))).CanSeq(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let seq = $.functionValue((_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => {
		;(_yield!(7) as boolean) && (_yield!(9) as boolean)
	}, ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo))
	await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(seq, "func(yield func(int) bool)", ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)))).CanSeq(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(seq, "func(yield func(int) bool)", ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)))).CanSeq2(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let __goscriptRangeReturn6 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(seq, "func(yield func(int) bool)", ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo))))).Seq()!(async (x) => {
			await $.println("func", $.markAsStructValue($.cloneStructValue(x)).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn6) {
		return
	}

	let s3 = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([1, 2, 3, 4]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).Slice3(1, 2, 3)))
	await $.println("slice3", $.markAsStructValue($.cloneStructValue(s3)).Len(), $.markAsStructValue($.cloneStructValue(s3)).Cap(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(s3)).Index(0))).Int())

	let o: Outer = new Outer(true)
	let [, err] = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((o).clone(), "main.Outer", "main.Outer")))).FieldByIndexErr($.arrayToSlice<number>([0, 0]))
	await $.println("nil embedded", err != null)
	o.Inner = new Inner(false, 9)
	let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(o, "main.Outer", "main.Outer")))).FieldByIndexErr($.arrayToSlice<number>([0, 0]))
	let f = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("embedded", $.markAsStructValue($.cloneStructValue(f)).Int(), err == null)

	// A type assertion to reflect.Value, as in text/template.
	for (let __goscriptRangeTarget0 = $.arrayToSlice<any>([$.interfaceValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(5, "int")))), "reflect.Value", __goscriptStatic0()), $.basicInterfaceValue(6, "int")]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let data = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any)
		let [value, __goscriptShadow0] = $.typeAssertTuple<reflect.Value>(data, "reflect.Value")
		if (!__goscriptShadow0) {
			value = $.assignStruct(value, reflect.ValueOf(data))
		}
		await $.println("assert", __goscriptShadow0, $.markAsStructValue($.cloneStructValue(value)).Int())
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods("reflect.Value", "reflect.Value", () => [$.methodSignature("Addr", [], ["reflect.Value"]), $.methodSignature("Bool", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Bytes", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]), $.methodSignature("Call", [["in", /* @__PURE__ */ $.sliceType("reflect.Value")]], [/* @__PURE__ */ $.sliceType("reflect.Value")]), $.methodSignature("CallSlice", [["in", /* @__PURE__ */ $.sliceType("reflect.Value")]], [/* @__PURE__ */ $.sliceType("reflect.Value")]), $.methodSignature("CanAddr", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanComplex", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanConvert", [["t", "reflect.Type"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanFloat", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanInt", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanInterface", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanSet", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanUint", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Cap", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Clear"), $.methodSignature("Close"), $.methodSignature("Comparable", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Complex", [], [/* @__PURE__ */ $.basicType("complex128")]), $.methodSignature("Convert", [["t", "reflect.Type"]], ["reflect.Value"]), $.methodSignature("Elem", [], ["reflect.Value"]), $.methodSignature("Equal", [["u", "reflect.Value"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Field", [["i", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("FieldByIndex", [["index", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))]], ["reflect.Value"]), $.methodSignature("FieldByIndexErr", [["index", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))]], ["reflect.Value", "error"]), $.methodSignature("FieldByName", [["name", /* @__PURE__ */ $.basicType("string")]], ["reflect.Value"]), $.methodSignature("FieldByNameFunc", [["match", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)]], ["reflect.Value"]), $.methodSignature("Fields", [], [({ kind: $.TypeKind.Function, name: "iter.Seq2", params: [({ kind: $.TypeKind.Function, params: ["reflect.StructField", "reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("Float", [], [/* @__PURE__ */ $.basicType("float64")]), $.methodSignature("Grow", [["n", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("Index", [["i", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("Int", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Interface", [], [["i", { kind: $.TypeKind.Interface, methods: [] }]]), $.methodSignature("InterfaceData", [], [/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uintptr"), 2)]), $.methodSignature("IsNil", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsValid", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsZero", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Kind", [], [/* @__PURE__ */ $.basicType("uint", "reflect.Kind")]), $.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("MapIndex", [["key", "reflect.Value"]], ["reflect.Value"]), $.methodSignature("MapKeys", [], [/* @__PURE__ */ $.sliceType("reflect.Value")]), $.methodSignature("MapRange", [], [/* @__PURE__ */ $.pointerType("reflect.MapIter")]), $.methodSignature("Method", [["i", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("MethodByName", [["name", /* @__PURE__ */ $.basicType("string")]], ["reflect.Value"]), $.methodSignature("Methods", [], [({ kind: $.TypeKind.Function, name: "iter.Seq2", params: [({ kind: $.TypeKind.Function, params: ["reflect.Method", "reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("NumField", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("NumMethod", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("OverflowComplex", [["x", /* @__PURE__ */ $.basicType("complex128")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("OverflowFloat", [["x", /* @__PURE__ */ $.basicType("float64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("OverflowInt", [["x", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("OverflowUint", [["x", /* @__PURE__ */ $.basicType("uint64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Pointer", [], [/* @__PURE__ */ $.basicType("uintptr")]), $.methodSignature("Recv", [], [["x", "reflect.Value"], ["ok", /* @__PURE__ */ $.basicType("bool")]]), $.methodSignature("Send", [["x", "reflect.Value"]]), $.methodSignature("Seq", [], [({ kind: $.TypeKind.Function, name: "iter.Seq", params: [({ kind: $.TypeKind.Function, params: ["reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("Seq2", [], [({ kind: $.TypeKind.Function, name: "iter.Seq2", params: [({ kind: $.TypeKind.Function, params: ["reflect.Value", "reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("Set", [["x", "reflect.Value"]]), $.methodSignature("SetBool", [["x", /* @__PURE__ */ $.basicType("bool")]]), $.methodSignature("SetBytes", [["x", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]]), $.methodSignature("SetCap", [["n", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("SetComplex", [["x", /* @__PURE__ */ $.basicType("complex128")]]), $.methodSignature("SetFloat", [["x", /* @__PURE__ */ $.basicType("float64")]]), $.methodSignature("SetInt", [["x", /* @__PURE__ */ $.basicType("int64")]]), $.methodSignature("SetIterKey", [["iter", /* @__PURE__ */ $.pointerType("reflect.MapIter")]]), $.methodSignature("SetIterValue", [["iter", /* @__PURE__ */ $.pointerType("reflect.MapIter")]]), $.methodSignature("SetLen", [["n", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("SetMapIndex", [["key", "reflect.Value"], ["elem", "reflect.Value"]]), $.methodSignature("SetPointer", [["x", /* @__PURE__ */ $.basicType("unknown")]]), $.methodSignature("SetString", [["x", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("SetUint", [["x", /* @__PURE__ */ $.basicType("uint64")]]), $.methodSignature("SetZero"), $.methodSignature("Slice", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("Slice3", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")], ["k", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("TryRecv", [], [["x", "reflect.Value"], ["ok", /* @__PURE__ */ $.basicType("bool")]]), $.methodSignature("TrySend", [["x", "reflect.Value"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Type", [], ["reflect.Type"]), $.methodSignature("Uint", [], [/* @__PURE__ */ $.basicType("uint64")]), $.methodSignature("UnsafeAddr", [], [/* @__PURE__ */ $.basicType("uintptr")]), $.methodSignature("UnsafePointer", [], [/* @__PURE__ */ $.basicType("unknown")])]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

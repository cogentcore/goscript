// Generated file based on reflect_seq.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import type * as iter from "@goscript/iter/index.js"

export class Inner {
	public declare B: number

	constructor(init?: Partial<{B?: number}>, __goscriptValue?: boolean) {
		this.B = init?.B ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(this, true)
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

	constructor(init?: Partial<{Inner?: Inner | $.VarRef<Inner> | null, C?: number}>, __goscriptValue?: boolean) {
		this.Inner = init?.Inner ?? (null! as Inner | $.VarRef<Inner> | null)
		this.C = init?.C ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(this, true)
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

	let o: Outer = new Outer(undefined, true)
	let [, err] = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((o).clone(), "main.Outer", "main.Outer")))).FieldByIndexErr($.arrayToSlice<number>([0, 0]))
	await $.println("nil embedded", err != null)
	o.Inner = new Inner({B: 9})
	let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((o).clone(), "main.Outer", "main.Outer")))).FieldByIndexErr($.arrayToSlice<number>([0, 0]))
	let f = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("embedded", $.markAsStructValue($.cloneStructValue(f)).Int(), err == null)

	// A type assertion to reflect.Value, as in text/template.
	for (let __goscriptRangeTarget0 = $.arrayToSlice<any>([$.interfaceValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(5, "int")))), "reflect.Value", "reflect.Value"), $.basicInterfaceValue(6, "int")]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let data = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any)
		let [value, __goscriptShadow0] = $.typeAssertTuple<reflect.Value>(data, "reflect.Value")
		if (!__goscriptShadow0) {
			value = $.assignStruct(value, reflect.ValueOf(data))
		}
		await $.println("assert", __goscriptShadow0, $.markAsStructValue($.cloneStructValue(value)).Int())
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on reflect_nil_slice_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class S1 {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): S1 {
		return new S1(true, this.Name)
	}

	public __goscriptAssign(source: S1): this {
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.S1",
		() => new S1(),
		() => [],
		S1,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}

export class S5 {
	public declare K: $.Slice<S1 | $.VarRef<S1> | null>

	public declare M: globalThis.Map<string, number> | null

	public declare P: S1 | $.VarRef<S1> | null

	public declare F: (() => void) | null

	constructor(__goscriptValue?: boolean, K$?: $.Slice<S1 | $.VarRef<S1> | null>, M$?: globalThis.Map<string, number> | null, P$?: S1 | $.VarRef<S1> | null, F$?: (() => void) | null) {
		this.K = K$ ?? (null! as $.Slice<S1 | $.VarRef<S1> | null>)
		this.M = M$ ?? (null! as globalThis.Map<string, number> | null)
		this.P = P$ ?? (null! as S1 | $.VarRef<S1> | null)
		this.F = F$ ?? (null! as (() => void) | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): S5 {
		return new S5(true, this.K, this.M, this.P, this.F)
	}

	public __goscriptAssign(source: S5): this {
		this.K = source.K
		this.M = source.M
		this.P = source.P
		this.F = source.F
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.S5",
		() => new S5(),
		() => [],
		S5,
		() => [/* @__PURE__ */ $.structField("K", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")), [0], 0, true), /* @__PURE__ */ $.structField("M", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")), [1], 24, true), /* @__PURE__ */ $.structField("P", /* @__PURE__ */ $.pointerType("main.S1"), [2], 32, true), /* @__PURE__ */ $.structField("F", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), [3], 40, true)]
	)
}

export async function show(name: string, v: any): globalThis.Promise<void> {
	let rv = reflect.ValueOf(v)
	if (!rv.IsValid()) {
		await $.println(name, "invalid")
		return
	}
	await $.println(name, reflect.Kind_String(rv.Kind()), rv.IsNil(), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(rv.Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	let s: $.Slice<S1 | $.VarRef<S1> | null> = null! as $.Slice<S1 | $.VarRef<S1> | null>
	await show("direct", $.interfaceValue(s, "[]*main.S1", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1"))))
	let a: any = $.interfaceValue(s, "[]*main.S1", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")))
	await $.println("a == nil:", a == null)
	await show("any", a)

	let v = $.varRef(new S5(true))
	let f = reflect.ValueOf($.interfaceValue(v, "*main.S5", /* @__PURE__ */ $.pointerType("main.S5"))).Elem()
	for (let i = 0; i < f.NumField(); i++) {
		await show(((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type()).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Name, f.Field(i).Interface())
	}
	let k = f.Field(0).Interface()
	let [, ok] = $.typeAssertTuple<$.Slice<S1 | $.VarRef<S1> | null>>(k, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")))
	await $.println("assert:", ok, k == null)

	// A nil value keeps a zero Pointer after a round trip through Interface.
	for (let i = 0; i < f.NumField(); i++) {
		await $.println("pointer", ((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type()).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Name, reflect.ValueOf(f.Field(i).Interface()).Pointer() == 0)
	}

	// The address of an unnamed field keeps its pointer type.
	for (let i = 0; i < f.NumField(); i++) {
		let p = f.Field(i).Addr().Interface()
		let pv = reflect.ValueOf(p)
		await $.println("addr", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(pv.Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(pv.Elem().Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	let __goscriptTuple0: any = $.typeAssertTuple<$.VarRef<$.Slice<S1 | $.VarRef<S1> | null>> | null>(f.Field(0).Addr().Interface(), /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1"))))
	let kp: $.VarRef<$.Slice<S1 | $.VarRef<S1> | null>> | null = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	kp!.value = $.appendOne($.pointerValue<$.Slice<S1 | $.VarRef<S1> | null>>(kp), new S1(false, "x"), $.appendZeros.nil)
	await $.println("addr assert:", ok, $.sliceLen(v.value.K), $.pointerValue<S1>($.plainSliceIndex(v.value.K!, 0)).Name)

	// Unnamed basic, array and slice values keep their types.
	await show2("int", reflect.ValueOf($.basicInterfaceValue(3, "int")))
	await show2("slice", reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["a"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))
	await show2("map", reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["a", 1]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))
}

export async function show2(name: string, v: reflect.Value): globalThis.Promise<void> {
	await $.println(name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.ValueOf(v.Interface()).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

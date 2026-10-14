// Generated file based on reflect_nil_slice_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class S1 {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): S1 {
		return new S1(this, true)
	}

	public __goscriptAssign(source: S1): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
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
	public get K(): $.Slice<S1 | $.VarRef<S1> | null> {
		return this._fields.K
	}

	public set K(value: $.Slice<S1 | $.VarRef<S1> | null>) {
		this._fields.K = value
	}

	public get M(): globalThis.Map<string, number> | null {
		return this._fields.M
	}

	public set M(value: globalThis.Map<string, number> | null) {
		this._fields.M = value
	}

	public get P(): S1 | $.VarRef<S1> | null {
		return this._fields.P
	}

	public set P(value: S1 | $.VarRef<S1> | null) {
		this._fields.P = value
	}

	public get F(): (() => void) | null {
		return this._fields.F
	}

	public set F(value: (() => void) | null) {
		this._fields.F = value
	}

	public _fields: {
		K: $.Slice<S1 | $.VarRef<S1> | null>
		M: globalThis.Map<string, number> | null
		P: S1 | $.VarRef<S1> | null
		F: (() => void) | null
	}

	constructor(init?: Partial<{K?: $.Slice<S1 | $.VarRef<S1> | null>, M?: globalThis.Map<string, number> | null, P?: S1 | $.VarRef<S1> | null, F?: (() => void) | null}>, __goscriptValue?: boolean) {
		this._fields = {
			K: init?.K ?? (null! as $.Slice<S1 | $.VarRef<S1> | null>),
			M: init?.M ?? (null! as globalThis.Map<string, number> | null),
			P: init?.P ?? (null! as S1 | $.VarRef<S1> | null),
			F: init?.F ?? (null! as (() => void) | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): S5 {
		return new S5(this, true)
	}

	public __goscriptAssign(source: S5): void {
		const target = this._fields
		const values = source._fields
		target.K = values.K
		target.M = values.M
		target.P = values.P
		target.F = values.F
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
	let rv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(v)))
	if (!$.markAsStructValue($.cloneStructValue(rv)).IsValid()) {
		await $.println(name, "invalid")
		return
	}
	await $.println(name, reflect.Kind_String($.markAsStructValue($.cloneStructValue(rv)).Kind()), $.markAsStructValue($.cloneStructValue(rv)).IsNil(), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(rv)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	let s: $.Slice<S1 | $.VarRef<S1> | null> = null! as $.Slice<S1 | $.VarRef<S1> | null>
	await show("direct", $.interfaceValue(s, "[]*main.S1", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1"))))
	let a: any = $.interfaceValue(s, "[]*main.S1", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")))
	await $.println("a == nil:", a == null)
	await show("any", a)

	let v = $.varRef(new S5(undefined, true))
	let f = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*main.S5", /* @__PURE__ */ $.pointerType("main.S5"))))).Elem()))
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(f)).NumField(); i++) {
		await show((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(f)).Type()).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Name, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(i))).Interface())
	}
	let k = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(0))).Interface()
	let [, ok] = $.typeAssertTuple<$.Slice<S1 | $.VarRef<S1> | null>>(k, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")))
	await $.println("assert:", ok, k == null)

	// A nil value keeps a zero Pointer after a round trip through Interface.
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(f)).NumField(); i++) {
		await $.println("pointer", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(f)).Type()).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Name, $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(i))).Interface()))).Pointer() == 0)
	}

	// The address of an unnamed field keeps its pointer type.
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(f)).NumField(); i++) {
		let p = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(i))).Addr())).Interface()
		let pv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(p)))
		await $.println("addr", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(pv)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(pv)).Elem())).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	let __goscriptTuple0: any = $.typeAssertTuple<$.VarRef<$.Slice<S1 | $.VarRef<S1> | null>> | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(0))).Addr())).Interface(), /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1"))))
	let kp = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	kp!.value = $.appendOne($.pointerValue<$.Slice<S1 | $.VarRef<S1> | null>>(kp), new S1({Name: "x"}), $.appendZeros.nil)
	await $.println("addr assert:", ok, $.sliceLen(v.value.K), $.pointerValue<S1>($.arrayIndex(v.value.K!, 0)).Name)

	// Unnamed basic, array and slice values keep their types.
	await show2("int", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3, "int")))))
	await show2("slice", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["a"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))))
	await show2("map", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["a", 1]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))))
}

export async function show2(name: string, v: reflect.Value): globalThis.Promise<void> {
	await $.println(name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.markAsStructValue($.cloneStructValue(v)).Interface()))).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

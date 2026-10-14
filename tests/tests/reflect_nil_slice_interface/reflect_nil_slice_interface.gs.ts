// Generated file based on reflect_nil_slice_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class S1 {
	public declare Name: string

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): S1 {
		return $.markAsStructValue(new S1(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name"])
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

	public _fields: {
		K: $.Slice<S1 | $.VarRef<S1> | null>
		M: globalThis.Map<string, number> | null
		P: S1 | $.VarRef<S1> | null
		F: (() => void) | null
	}

	constructor(init?: Partial<{K?: $.Slice<S1 | $.VarRef<S1> | null>, M?: globalThis.Map<string, number> | null, P?: S1 | $.VarRef<S1> | null, F?: (() => void) | null}>) {
		this._fields = {
			K: init?.K ?? (null! as $.Slice<S1 | $.VarRef<S1> | null>),
			M: init?.M ?? (null! as globalThis.Map<string, number> | null),
			P: init?.P ?? (null! as S1 | $.VarRef<S1> | null),
			F: init?.F ?? (null! as (() => void) | null)
		}
	}

	public clone(): S5 {
		return $.markAsStructValue(new S5(this))
	}

	static {
		$.bindStructFields(this.prototype, ["K", "M", "P", "F"])
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
	await $.println(name, reflect.Kind_String($.markAsStructValue($.cloneStructValue(rv)).Kind()), $.markAsStructValue($.cloneStructValue(rv)).IsNil(), await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(rv)).Type()).String())
}

export async function main(): globalThis.Promise<void> {
	let s: $.Slice<S1 | $.VarRef<S1> | null> = null! as $.Slice<S1 | $.VarRef<S1> | null>
	await show("direct", $.interfaceValue(s, "[]*main.S1", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1"))))
	let a: any = $.interfaceValue(s, "[]*main.S1", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")))
	await $.println("a == nil:", a == null)
	await show("any", a)

	let v = $.varRef($.markAsStructValue(new S5()))
	let f = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*main.S5", /* @__PURE__ */ $.pointerType("main.S5"))))).Elem()))
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(f)).NumField(); i++) {
		await show((await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(f)).Type()).Field(i)).Name, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(i))).Interface())
	}
	let k = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(0))).Interface()
	let [, ok] = $.typeAssertTuple<$.Slice<S1 | $.VarRef<S1> | null>>(k, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1")))
	await $.println("assert:", ok, k == null)

	// A nil value keeps a zero Pointer after a round trip through Interface.
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(f)).NumField(); i++) {
		await $.println("pointer", (await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(f)).Type()).Field(i)).Name, $.uint($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(i))).Interface()))).Pointer(), 64) == 0)
	}

	// The address of an unnamed field keeps its pointer type.
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(f)).NumField(); i++) {
		let p = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(i))).Addr())).Interface()
		let pv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(p)))
		await $.println("addr", await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(pv)).Type()).String(), await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(pv)).Elem())).Type()).String())
	}
	let __goscriptTuple0: any = $.typeAssertTuple<$.VarRef<$.Slice<S1 | $.VarRef<S1> | null>> | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(f)).Field(0))).Addr())).Interface(), /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.S1"))))
	let kp = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	kp!.value = $.append($.pointerValue<$.Slice<S1 | $.VarRef<S1> | null>>(kp), new S1({Name: "x"}), $.appendZeros.nil)
	await $.println("addr assert:", ok, $.len(v.value.K), $.pointerValue<S1>($.arrayIndex(v.value.K!, 0)).Name)

	// Unnamed basic, array and slice values keep their types.
	await show2("int", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3, "int")))))
	await show2("slice", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["a"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))))
	await show2("map", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["a", 1]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))))
}

export async function show2(name: string, v: reflect.Value): globalThis.Promise<void> {
	await $.println(name, await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.markAsStructValue($.cloneStructValue(v)).Interface()))).Type()).String())
}

if ($.isMainScript(import.meta)) {
	await main()
}

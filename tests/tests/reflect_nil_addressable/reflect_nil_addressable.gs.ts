// Generated file based on reflect_nil_addressable.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class S {
	public declare A: number

	public declare B: string

	public _fields: {
		A: number
		B: string
	}

	constructor(init?: Partial<{A?: number, B?: string}>) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? ("" as string)
		}
	}

	public clone(): S {
		return $.markAsStructValue(new S(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
	}

	static __typeInfo = $.registerStructType(
		"main.S",
		() => new S(),
		() => [],
		S,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// A nil interface has no type and no value.
	await $.println(reflect.TypeOf(null) == null, $.markAsStructValue($.cloneStructValue(reflect.ValueOf(null))).IsValid())

	// A *any keeps its interface element type.
	let a = $.varRef($.basicInterfaceValue(1, "int"))
	let pa = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(a, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] })))))
	await $.println($.comparableEqual($.markAsStructValue($.cloneStructValue(pa)).Type(), reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }), zero: () => null }})), reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(pa)).Elem())).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(pa)).Elem())).Elem())).Kind()))
	await $.println($.comparableEqual((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }), zero: () => null }})).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})))

	// Only values reached through a pointer or slice are addressable.
	let v = $.varRef(1)
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(v.value, "int")))).CanAddr(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).CanAddr(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Elem())).CanAddr())
	let s = $.varRef($.markAsStructValue(new S()))
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue($.cloneStructValue(s.value)), "main.S", "main.S")))).Field(0))).CanAddr(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*main.S", /* @__PURE__ */ $.pointerType("main.S"))))).Elem())).Field(0))).CanAddr())
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([1]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).Index(0))).CanAddr())

	// Addr of an addressable value points at it.
	let e = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*main.S", /* @__PURE__ */ $.pointerType("main.S"))))).Elem())).Field(0)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Addr())).Elem())).SetInt(5n)
	await $.println(s.value.A, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Addr())).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on reflect_nil_addressable.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class S {
	public declare A: number

	public declare B: string

	constructor(init?: Partial<{A?: number, B?: string}>, __goscriptValue?: boolean) {
		this.A = init?.A ?? (0 as number)
		this.B = init?.B ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): S {
		return new S(this, true)
	}

	public __goscriptAssign(source: S): this {
		this.A = source.A
		this.B = source.B
		return this
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
	await $.println($.comparableEqual($.markAsStructValue($.cloneStructValue(pa)).Type(), reflect.TypeFor(__goscriptStatic0())), reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(pa)).Elem())).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(pa)).Elem())).Elem())).Kind()))
	await $.println($.comparableEqual((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic0())).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), reflect.TypeFor(__goscriptStatic1())))

	// Only values reached through a pointer or slice are addressable.
	let v = $.varRef(1)
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(v.value, "int")))).CanAddr(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).CanAddr(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Elem())).CanAddr())
	let s = $.varRef(new S(undefined, true))
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((s.value).clone(), "main.S", "main.S")))).Field(0))).CanAddr(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*main.S", /* @__PURE__ */ $.pointerType("main.S"))))).Elem())).Field(0))).CanAddr())
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([1]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).Index(0))).CanAddr())

	// Addr of an addressable value points at it.
	let e = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*main.S", /* @__PURE__ */ $.pointerType("main.S"))))).Elem())).Field(0)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Addr())).Elem())).SetInt(5n)
	await $.println(s.value.A, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Addr())).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }), zero: () => null }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

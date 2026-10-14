// Generated file based on reflect_convert_float32.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

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

	constructor(init?: Partial<{A?: string, B?: number}>) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): T {
		return $.markAsStructValue(new T(this))
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [],
		T,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("float32"), [1], 16, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let f32 = reflect.TypeFor(__goscriptStatic0())
	let c = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3n, "int64")))).Convert($.pointerValueOrNil(f32)!)))
	let [f, ok] = $.typeAssertTuple<number>($.markAsStructValue($.cloneStructValue(c)).Interface(), /* @__PURE__ */ $.basicType("float32"))
	await $.println(ok, f == 3, reflect.Kind_String($.markAsStructValue($.cloneStructValue(c)).Kind()))

	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3.9, "float64")))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!))).Int())
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(300, "int")))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic2()))!))).Int())
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(-1, "int")))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic3()))!))).Uint())
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue($.int(65, 32), "int32")))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic4()))!))).String())
	let b: $.Slice<number> = $.mustTypeAssert<$.Slice<number>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf("hé"))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic5()))!))).Interface(), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")))
	await $.println($.len(b))
	let r: $.Slice<number> = $.mustTypeAssert<$.Slice<number>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf("hé"))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic6()))!))).Interface(), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int32")))
	await $.println($.len(r))
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(new Uint8Array([111, 107]), "[]byte", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")))))).Convert($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic4()))!))).String())

	// Setting a float32 rounds to float32 precision, as a Go assignment does.
	let x = 3.14
	let s: T | $.VarRef<T> | null = new T({A: "aaa", B: $.float32(x)})
	let d: T | $.VarRef<T> | null = new T()
	let dv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(d, "*main.T", /* @__PURE__ */ $.pointerType("main.T"))))).Elem()))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(dv)).Field(0))).SetString("aaa")
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(dv)).Field(1))).SetFloat(x)
	await $.println($.pointerValue<T>(s).B == $.pointerValue<T>(d).B, $.stringEqual($.pointerValue<T>(s).A, $.pointerValue<T>(d).A))
	let d2: T | $.VarRef<T> | null = new T()
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(d2, "*main.T", /* @__PURE__ */ $.pointerType("main.T"))))).Elem())).Field(1))).Set($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(x, "float64")))).Convert($.pointerValueOrNil(f32)!))))
	await $.println($.pointerValue<T>(s).B == $.pointerValue<T>(d2).B)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int8"), zero: () => 0 }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8"), zero: () => 0 }})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), zero: () => null }})
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int32")), zero: () => null }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

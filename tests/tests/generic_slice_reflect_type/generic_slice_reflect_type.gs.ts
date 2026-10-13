// Generated file based on generic_slice_reflect_type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class Data {
	public declare A: number

	public declare B: number

	public _fields: {
		A: number
		B: number
	}

	constructor(init?: Partial<{A?: number, B?: number}>) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): Data {
		return $.markAsStructValue(new Data(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
	}

	static __typeInfo = $.registerStructType(
		"main.Data",
		() => new Data(),
		() => [],
		Data,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("float32"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("float32"), [1], 4, true)]
	)
}

export async function describe<E>(__typeArgs: $.GenericTypeArgs | undefined, s: $.Slice<E>): globalThis.Promise<void> {
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "[]E", /* @__PURE__ */ $.sliceType(__typeArgs?.["E"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))))
	await $.println("type:", await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).String(), "elem kind:", reflect.Kind_String((await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(v)).Type()).Elem())).Kind())), "len:", $.markAsStructValue($.cloneStructValue(v)).Len())
	if ($.markAsStructValue($.cloneStructValue(v)).Len() > 0) {
		await $.println("index kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Index(0))).Kind()))
	}
}

export async function describeMap(__typeArgs: $.GenericTypeArgs | undefined, m: globalThis.Map<any, any> | null): globalThis.Promise<void> {
	await $.println("map type:", await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(m, "map[K]V", /* @__PURE__ */ $.mapType(__typeArgs?.["K"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }, __typeArgs?.["V"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))).String())
}

export async function describePointer(__typeArgs: $.GenericTypeArgs | undefined, p: any): globalThis.Promise<void> {
	await $.println("pointer type:", await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.typeParamPointerInterfaceValue(p, __typeArgs?.["E"], "*E", /* @__PURE__ */ $.pointerType(__typeArgs?.["E"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))).String())
}

export async function main(): globalThis.Promise<void> {
	await describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: "main.Data", zero: () => $.markAsStructValue(new Data()) }}, $.arrayToSlice<Data>([$.markAsStructValue(new Data({A: 1, B: 2}))]))
	await describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }}, $.arrayToSlice<number>([1, 2, 3]))
	await describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, $.arrayToSlice<number>([]))
	await describeMap({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: "main.Data", zero: () => $.markAsStructValue(new Data()) }}, $.makeMap<string, Data>([]))
	await describePointer({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: "main.Data", zero: () => $.markAsStructValue(new Data()) }}, new Data())
}

if ($.isMainScript(import.meta)) {
	await main()
}

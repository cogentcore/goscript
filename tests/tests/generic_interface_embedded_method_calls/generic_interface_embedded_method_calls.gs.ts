// Generated file based on generic_interface_embedded_method_calls.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type base = {
	Value(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"main.base",
	null,
	[{ name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export type derived = {
	Other(__typeArgs: $.GenericTypeArgs | undefined): any
	Value(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"main.derived",
	null,
	[{ name: "Other", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }, { name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class impl {
	public declare value: any

	public declare other: any

	constructor(init?: Partial<{value?: any, other?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.value = init?.value !== undefined ? (__goscriptFresh === true ? init.value : $.copyElement(init.value)) : (null! as any)
		this.other = init?.other !== undefined ? (__goscriptFresh === true ? init.other : $.copyElement(init.other)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): impl {
		return new impl(this, true)
	}

	public __goscriptAssign(source: impl): this {
		this.value = $.assignFieldValue(this.value, source.value)
		this.other = $.assignFieldValue(this.other, source.other)
		return this
	}

	public Other(__typeArgs: $.GenericTypeArgs | undefined): any {
		const i: impl | $.VarRef<impl> | null = this;
		return $.copyElement($.pointerValue<impl>(i).other)
	}

	public Value(__typeArgs: $.GenericTypeArgs | undefined): any {
		const i: impl | $.VarRef<impl> | null = this;
		return $.copyElement($.pointerValue<impl>(i).value)
	}

	static __typeInfo = $.registerStructType(
		"main.impl",
		() => new impl(),
		() => [{ name: "Other", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }, { name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		impl,
		() => [{ name: "value", key: "value", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "other", key: "other", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export async function read(__typeArgs: $.GenericTypeArgs | undefined, d: derived | null): globalThis.Promise<any> {
	return $.callInterfaceMethod((d !== null && (d as any).__isVarRef !== true && ((d as any).__goValue === undefined || (d as any).__goType?.charCodeAt(0) !== 42) ? (d as Exclude<derived, null>) : $.pointerValue<Exclude<derived, null>>(d)), "Value", {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
}

export async function main(): globalThis.Promise<void> {
	let i = new impl({value: 7, other: "ok"})
	await $.println(await read(__goscriptStatic0(), $.namedValueInterfaceValue<derived | null>(i, "*main.impl", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }, E: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({Other: (receiver: any) => $.pointerValue(receiver).Other(__goscriptStatic0()), Value: (receiver: any) => $.pointerValue(receiver).Value(__goscriptStatic0())})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType("main.impl"))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("Other", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Value", [], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

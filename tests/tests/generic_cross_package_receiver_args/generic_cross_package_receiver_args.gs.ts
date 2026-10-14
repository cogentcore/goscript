// Generated file based on generic_cross_package_receiver_args.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/generic_cross_package_receiver_args/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/generic_cross_package_receiver_args/dep/index.js"

export type Derived = {
	Other(__typeArgs: $.GenericTypeArgs | undefined): any
	Value(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"main.Derived",
	null,
	[{ name: "Other", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }, { name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class wrapper {
	public get Impl(): dep.Impl | $.VarRef<dep.Impl> | null {
		return this._fields.Impl
	}

	public set Impl(value: dep.Impl | $.VarRef<dep.Impl> | null) {
		this._fields.Impl = value
	}

	public _fields: {
		Impl: dep.Impl | $.VarRef<dep.Impl> | null
	}

	constructor(init?: Partial<{Impl?: dep.Impl | $.VarRef<dep.Impl> | null}>) {
		this._fields = {
			Impl: init?.Impl ?? (null! as dep.Impl | $.VarRef<dep.Impl> | null)
		}
	}

	public clone(): wrapper {
		return $.markAsStructValue(new wrapper(this))
	}

	public Other(__typeArgs: $.GenericTypeArgs | undefined): any {
		const w: wrapper | $.VarRef<wrapper> | null = this;
		let zero: any = $.genericZero(__typeArgs, "E", null)
		return zero
	}

	public Value(__typeArgs: $.GenericTypeArgs | undefined): any {
		return $.pointerValue<dep.Impl>(this.Impl).Value({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
	}

	static __typeInfo = $.registerStructType(
		"main.wrapper",
		() => new wrapper(),
		() => [{ name: "Other", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }, { name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }],
		wrapper,
		() => [{ name: "Impl", key: "Impl", type: /* @__PURE__ */ $.pointerType("dep.Impl"), anonymous: true }]
	)
}

export async function read(__typeArgs: $.GenericTypeArgs | undefined, d: Derived | null): globalThis.Promise<any> {
	return (await $.callInterfaceMethod($.pointerValue<Exclude<Derived, null>>(d), "Value", {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}) as any)
}

export function setGeneric(__typeArgs: $.GenericTypeArgs | undefined, w: dep.Wrapper | $.VarRef<dep.Wrapper> | null, value: any): any {
	return (dep.Keyed.prototype.SetValues.call($.pointerValue<dep.Wrapper>(w).Keyed, {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }, U: __typeArgs?.["U"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}, value) as any)
}

export function setConcrete(w: dep.Wrapper | $.VarRef<dep.Wrapper> | null): string {
	return (dep.Keyed.prototype.SetValues.call($.pointerValue<dep.Wrapper>(w).Keyed, __goscriptStatic0(), 7) as string)
}

export async function main(): globalThis.Promise<void> {
	let impl: wrapper | $.VarRef<wrapper> | null = new wrapper({Impl: new dep.Impl({Item: 7})})
	await $.println("interface:", await read(__goscriptStatic1(), $.namedValueInterfaceValue<Derived | null>(impl, "*main.wrapper", __goscriptStatic2(), __goscriptStatic3(), __goscriptStatic4())))
	let keyed: dep.Wrapper | $.VarRef<dep.Wrapper> | null = new dep.Wrapper({Keyed: new dep.Keyed()})
	await $.println("generic empty:", $.stringEqual(setGeneric(__goscriptStatic0(), keyed, 7), ""))
	await $.println("concrete empty:", $.stringEqual(setConcrete(keyed), ""))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }, U: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }, E: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({Other: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Other(__goscriptStatic1(), ...$.stripGenericTypeArgs(args)), Value: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Value(__goscriptStatic1(), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= (/* @__PURE__ */ $.pointerType("main.wrapper"))
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ([$.methodSignature("Other", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Value", [], [/* @__PURE__ */ $.basicType("int")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

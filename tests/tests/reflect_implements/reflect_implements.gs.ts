// Generated file based on reflect_implements.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export type Stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.Stringer",
	null,
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class MyType {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyType {
		return new MyType(this, true)
	}

	public __goscriptAssign(source: MyType): void {
	}

	public String(): string {
		const m = this;
		return "MyType"
	}

	static __typeInfo = $.registerStructType(
		"main.MyType",
		() => new MyType(),
		() => [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])],
		MyType,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let t = reflect.TypeFor(__goscriptStatic0())
	let ptr = reflect.PointerTo($.pointerValueOrNil(t)!)
	let iface = reflect.TypeFor(__goscriptStatic1())

	await $.println("MyType implements Stringer:", (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Implements($.pointerValueOrNil(iface)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("*MyType implements Stringer:", (__goscriptAwait = (ptr !== null && (ptr as any).__isVarRef !== true && (ptr as any).__goValue === undefined ? (ptr as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(ptr)).Implements($.pointerValueOrNil(iface)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.MyType", zero: () => new MyType(undefined, true), methods: {String: (receiver: any) => $.pointerValue(receiver).String()} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Stringer", zero: () => null, methods: {String: (receiver: any) => receiver.String()} }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on generic_receiver_method_calls.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type reader = {
	Value(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"main.reader",
	null,
	[{ name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class box {
	public get value(): any {
		return this._fields.value
	}

	public set value(value: any) {
		this._fields.value = value
	}

	public _fields: {
		value: any
	}

	constructor(init?: Partial<{value?: any}>) {
		this._fields = {
			value: init?.value !== undefined ? $.copyElement(init.value) : (null! as any)
		}
	}

	public clone(): box {
		return $.markAsStructValue(new box(this))
	}

	public Value(__typeArgs: $.GenericTypeArgs | undefined): any {
		const b: box | $.VarRef<box> | null = this;
		return $.copyElement($.pointerValue<box>(b).value)
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [{ name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		box,
		() => [{ name: "value", key: "value", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class holder {
	public get box(): box {
		return this._fields.box
	}

	public set box(value: box) {
		this._fields.box = value
	}

	public _fields: {
		box: box
	}

	constructor(init?: Partial<{box?: box}>) {
		this._fields = {
			box: init?.box ? $.markAsStructValue($.cloneStructValue(init.box)) : $.markAsStructValue(new box({value: null}))
		}
	}

	public clone(): holder {
		return $.markAsStructValue(new holder(this))
	}

	public Value(__typeArgs: $.GenericTypeArgs | undefined): any {
		return $.pointerValue<box>(this.box).Value({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }})
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [{ name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		holder,
		() => [{ name: "box", key: "box", type: "main.box", anonymous: true }]
	)
}

export function direct(__typeArgs: $.GenericTypeArgs | undefined, b: box | $.VarRef<box> | null): any {
	return (box.prototype.Value.call(b, {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}) as any)
}

export async function throughInterface(__typeArgs: $.GenericTypeArgs | undefined, r: reader | null): globalThis.Promise<any> {
	return (await $.callInterfaceMethod($.pointerValue<Exclude<reader, null>>(r), "Value", {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}) as any)
}

export function promoted(__typeArgs: $.GenericTypeArgs | undefined, h: holder | $.VarRef<holder> | null): any {
	return ($.pointerValue<holder>(h).box.Value({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}) as any)
}

export async function methodExpression(__typeArgs: $.GenericTypeArgs | undefined, b: box | $.VarRef<box> | null): globalThis.Promise<any> {
	let value: ((_p0: box | $.VarRef<box> | null) => any | globalThis.Promise<any>) | null = $.functionValue((b: box | $.VarRef<box> | null): any => $.pointerValue<box>(b).Value({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.box")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	return value!(b)
}

export async function main(): globalThis.Promise<void> {
	let b: box | $.VarRef<box> | null = new box({value: 7})
	await $.println("direct:", direct(__goscriptStatic0(), b))
	await $.println("interface:", await throughInterface(__goscriptStatic0(), $.namedValueInterfaceValue<reader | null>(b, "*main.box", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())))
	await $.println("promoted:", promoted(__goscriptStatic0(), new holder({box: $.markAsStructValue($.cloneStructValue($.pointerValue<box>(b)))})))
	await $.println("expression:", await methodExpression(__goscriptStatic0(), b))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({Value: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Value(__goscriptStatic0(), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType("main.box"))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("Value", [], [/* @__PURE__ */ $.basicType("int")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

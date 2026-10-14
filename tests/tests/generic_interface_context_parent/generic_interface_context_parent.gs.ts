// Generated file based on generic_interface_context_parent.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as context from "@goscript/context/index.js"
import "@goscript/context/index.js"

export type Resolver = {
	Resolve(ctx: context.Context | null, handler: Handler | null): $.GoError | globalThis.Promise<$.GoError>
}

$.registerInterfaceType(
	"main.Resolver",
	null,
	[{ name: "Resolve", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export type Handler = {
	Mark(): void
}

$.registerInterfaceType(
	"main.Handler",
	null,
	[{ name: "Mark", args: [], returns: [] }]
);

export type ValueReader = {
	Get(): number
}

$.registerInterfaceType(
	"main.ValueReader",
	null,
	[{ name: "Get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class handler {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): handler {
		return $.markAsStructValue(new handler(this))
	}

	public Mark(): void {
	}

	static __typeInfo = $.registerStructType(
		"main.handler",
		() => new handler(),
		() => [{ name: "Mark", args: [], returns: [] }],
		handler,
		() => []
	)
}

export class genericResolver {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): genericResolver {
		return $.markAsStructValue(new genericResolver(this))
	}

	public async Resolve(__typeArgs: $.GenericTypeArgs | undefined, ctx: context.Context | null, handler: Handler | null): globalThis.Promise<$.GoError> {
		let [child, cancel] = context.WithCancel($.pointerValueOrNil(ctx)!)
		await cancel!()
		await $.chanRecv(await $.pointerValue<Exclude<context.Context, null>>(child).Done())
		await $.pointerValue<Exclude<Handler, null>>(handler).Mark()
		return null
	}

	static __typeInfo = $.registerStructType(
		"main.genericResolver",
		() => new genericResolver(),
		() => [{ name: "Resolve", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }],
		genericResolver,
		() => []
	)
}

export class genericValue {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
	}

	public clone(): genericValue {
		return $.markAsStructValue(new genericValue(this))
	}

	public Get(__typeArgs: $.GenericTypeArgs | undefined): number {
		const v = this;
		return v.value
	}

	static __typeInfo = $.registerStructType(
		"main.genericValue",
		() => new genericValue(),
		() => [{ name: "Get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		genericValue,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let resolver: Resolver | null = $.namedValueInterfaceValue<Resolver | null>(new genericResolver(), "*main.genericResolver", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())
	{
		let err = await $.pointerValue<Exclude<Resolver, null>>(resolver).Resolve(context.Background(), $.interfaceValue<Handler | null>($.markAsStructValue(new handler()), "main.handler", "main.handler"))
		if (err != null) {
			await $.println("resolve failed")
			return
		}
	}
	await $.println("resolve ok")
	let g = $.markAsStructValue(new genericValue({value: 7}))
	let reader: ValueReader | null = $.namedValueInterfaceValue<ValueReader | null>($.markAsStructValue($.cloneStructValue(g)), "main.genericValue", __goscriptStatic4(), __goscriptStatic5(), __goscriptStatic6())
	g.value = 9
	if (await $.pointerValue<Exclude<ValueReader, null>>(reader).Get() != 7) {
		await $.println("value copy failed")
		return
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({Resolve: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Resolve(__goscriptStatic0(), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType("main.genericResolver"))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("Resolve", [["ctx", "context.Context"], ["handler", "main.Handler"]], ["error"])])
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({Get: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Get(__goscriptStatic0(), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ("main.genericValue")
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ([$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

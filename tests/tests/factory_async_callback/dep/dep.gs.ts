// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/factory_async_callback/dep", ["dep.Factory", "dep.Bus", "dep.factory"])

export type Factory = {
	GetConfigID(): string
}

$.registerInterfaceType(
	"dep.Factory",
	null,
	[{ name: "GetConfigID", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Bus {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Bus {
		return new Bus(this, true)
	}

	public __goscriptAssign(source: Bus): this {
		return this
	}

	static __typeInfo = $.registerStructType(
		"dep.Bus",
		() => new Bus(),
		() => [],
		Bus,
		() => []
	)
}

export class factory {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): factory {
		return new factory(this, true)
	}

	public __goscriptAssign(source: factory): this {
		return this
	}

	public GetConfigID(__typeArgs: $.GenericTypeArgs | undefined): string {
		const f: factory | $.VarRef<factory> | null = this;
		return "factory-async"
	}

	static __typeInfo = $.registerStructType(
		"dep.factory",
		() => new factory(),
		() => [{ name: "GetConfigID", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		factory,
		() => []
	)
}

export async function NewFactory(b: Bus): globalThis.Promise<Factory | null> {
	let ch = $.makeChannel<{}>(1, {}, "both")
	await $.chanSend(ch, {})
	await $.chanRecv(ch)
	return $.namedValueInterfaceValue<Factory | null>(new factory(), "*dep.factory", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "dep.Bus", zero: () => new Bus(undefined, true) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({GetConfigID: (receiver: any) => $.pointerValue(receiver).GetConfigID(__goscriptStatic0())})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType("dep.factory"))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("GetConfigID", [], [/* @__PURE__ */ $.basicType("string")])])
}

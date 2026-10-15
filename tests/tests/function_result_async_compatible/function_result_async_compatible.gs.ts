// Generated file based on function_result_async_compatible.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Value = {
	Value(): number
}

$.registerInterfaceType(
	"main.Value",
	null,
	[{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class box {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): this {
		this.value = source.value
		return this
	}

	public Value(): number {
		const b: box | $.VarRef<box> | null = this;
		return $.pointerValue<box>(b).value
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		box,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function asyncBox(): globalThis.Promise<box | $.VarRef<box> | null> {
	let ch = $.makeChannel<number>(1, 0, "both")
	await $.chanSend(ch, 7)
	return (await (async () => { const __goscriptLiteralField0 = await $.chanRecv(ch); return new box({value: __goscriptLiteralField0}) })())
}

export function unwrap(v: Value | null): Value | null {
	return v
}

export async function wrapNew(__typeArgs: $.GenericTypeArgs | undefined, newValue: (() => any | globalThis.Promise<any>) | null): globalThis.Promise<(() => Value | null | globalThis.Promise<Value | null>) | null> {
	return $.functionValue(async (): globalThis.Promise<Value | null> => {
		return unwrap($.typeParamInterfaceValue<Value | null>((__goscriptAwait = newValue!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Value", [], [/* @__PURE__ */ $.basicType("int")])] }, zero: () => null }))
	}, ({ kind: $.TypeKind.Function, params: [], results: ["main.Value"] } as $.FunctionTypeInfo))
}

export async function main(): globalThis.Promise<void> {
	let fn: (() => Value | null | globalThis.Promise<Value | null>) | null = await wrapNew(__goscriptStatic0(), asyncBox)
	await $.println((__goscriptAwait = $.pointerValue<Exclude<Value, null>>((__goscriptAwait = fn!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Value(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType("main.box"), zero: () => null, methods: {Value: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Value(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

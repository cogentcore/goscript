// Generated file based on package_import_errors.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"

export type scalarErr = number

$.registerNamedValueType(
	"main.scalarErr",
	{Error: (receiver: any) => (scalarErr_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.scalarErr",
	{Error: (receiver: any) => (scalarErr_Error as any)($.pointerValue(receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class customErr {
	public declare msg: string

	constructor(init?: Partial<{msg?: string}>, __goscriptValue?: boolean) {
		this.msg = init?.msg ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): customErr {
		return new customErr(this, true)
	}

	public __goscriptAssign(source: customErr): this {
		this.msg = source.msg
		return this
	}

	public Error(): string {
		const e: customErr | $.VarRef<customErr> | null = this;
		return $.pointerValue<customErr>(e).msg
	}

	static __typeInfo = $.registerStructType(
		"main.customErr",
		() => new customErr(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		customErr,
		() => [{ name: "msg", key: "msg", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class wrappedErr {
	public declare err: $.GoError

	constructor(init?: Partial<{err?: $.GoError}>, __goscriptValue?: boolean) {
		this.err = init?.err ?? (null! as $.GoError)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): wrappedErr {
		return new wrappedErr(this, true)
	}

	public __goscriptAssign(source: wrappedErr): this {
		this.err = $.assignFieldValue(this.err, source.err)
		return this
	}

	public Error(): string {
		const e = this;
		return "wrapped: " + ($.pointerValue<Exclude<$.GoError, null>>(e.err).Error() as string)
	}

	public Unwrap(): $.GoError {
		const e = this;
		return e.err
	}

	static __typeInfo = $.registerStructType(
		"main.wrappedErr",
		() => new wrappedErr(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Unwrap", args: [], returns: [{ type: "error" }] }],
		wrappedErr,
		() => [{ name: "err", key: "err", type: "error" }]
	)
}

export function scalarErr_Error(recv: scalarErr): string {
	return "scalar error"
}

export async function main(): globalThis.Promise<void> {
	// Test basic error creation
	let err1 = errors.New("first error")
	let err2 = errors.New("second error")

	await $.println("err1:", (__goscriptAwait = (err1 !== null && (err1 as any).__isVarRef !== true && ((err1 as any).__goValue === undefined || (err1 as any).__goType?.charCodeAt(0) !== 42) ? (err1 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err1)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("err2:", (__goscriptAwait = (err2 !== null && (err2 as any).__isVarRef !== true && ((err2 as any).__goValue === undefined || (err2 as any).__goType?.charCodeAt(0) !== 42) ? (err2 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err2)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test error comparison
	await $.println("err1 == err2:", $.comparableEqual(err1, err2))
	await $.println("err1 == nil:", err1 == null)

	// Test nil error
	let nilErr: $.GoError = null! as $.GoError
	await $.println("nilErr == nil:", nilErr == null)

	let typedErr = new customErr({msg: "typed error"})
	let __goscriptTuple0: any = errors.AsType(__goscriptStatic0(), $.interfaceValue<$.GoError>(new wrappedErr({err: $.interfaceValue<$.GoError>(typedErr, "*main.customErr", /* @__PURE__ */ $.pointerType("main.customErr"))}, true), "main.wrappedErr", "main.wrappedErr")!)
	let matched: customErr | $.VarRef<customErr> | null = (__goscriptTuple0[0] as customErr | $.VarRef<customErr> | null)
	let ok = __goscriptTuple0[1]
	await $.println("AsType matched:", ok)
	if (ok) {
		await $.println("AsType message:", $.pointerValue<customErr>(matched).msg)
	}
	let __goscriptTuple1: any = errors.AsType(__goscriptStatic0(), $.pointerValueOrNil(err1)!)
	ok = __goscriptTuple1[1]
	await $.println("AsType missing:", ok)

	let scalarTarget: $.VarRef<scalarErr> = $.varRef(0)
	await $.println("As scalar missing:", errors.As($.pointerValueOrNil(err1)!, $.namedValueInterfaceValue<any>(scalarTarget, "*main.scalarErr", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())), scalarTarget.value)
	await $.println("As scalar matched:", errors.As($.namedValueInterfaceValue<$.GoError>(42, "main.scalarErr", {"Error": scalarErr_Error}, /* @__PURE__ */ $.basicType("uint8", "main.scalarErr"))!, $.namedValueInterfaceValue<any>(scalarTarget, "*main.scalarErr", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())), scalarTarget.value)

	await $.println("test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.pointerType("main.customErr"), zero: () => null, methods: {Error: (receiver: any) => $.pointerValue(receiver).Error()} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({Error: (receiver: any) => (scalarErr_Error as any)($.pointerValue(receiver))})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8", "main.scalarErr")))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

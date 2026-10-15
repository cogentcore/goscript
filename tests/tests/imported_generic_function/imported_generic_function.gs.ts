// Generated file based on imported_generic_function.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as helper from "@goscript/github.com/s4wave/goscript/tests/tests/imported_generic_function/helper/index.js"

export function collectValues(value: helper.Value | null): [$.Slice<helper.Value | null>, $.GoError] {
	const __goscriptReturn0 = helper.Collect(__goscriptStatic0(), value)
	return [(__goscriptReturn0[0] as $.Slice<helper.Value | null>), __goscriptReturn0[1]]
	throw new globalThis.Error("goscript: unreachable return")
}

export function collectAssigned(value: helper.Value | null): [$.Slice<helper.Value | null>, $.GoError] {
	let __goscriptTuple0: any = helper.Collect(__goscriptStatic0(), value)
	let values: $.Slice<helper.Value | null> = (__goscriptTuple0[0] as $.Slice<helper.Value | null>)
	let err = __goscriptTuple0[1]
	if (err != null) {
		return [null, err]
	}
	return [values, null]
}

export async function main(): globalThis.Promise<void> {
	let box = (helper.Wrap(__goscriptStatic1(), 21) as helper.Box)
	await $.println("wrapped:", box.Value)
	let __goscriptTuple1: any = collectValues($.interfaceValue<helper.Value | null>(new helper.IntValue({N: 34}, true), "helper.IntValue", "helper.IntValue"))
	let values: $.Slice<helper.Value | null> = __goscriptTuple1[0]
	let err = __goscriptTuple1[1]
	if (err != null) {
		await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("collected:", (__goscriptAwait = $.pointerValue<Exclude<helper.Value, null>>($.arrayIndex(values!, 0)).GetValue(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let __goscriptTuple2: any = collectAssigned($.interfaceValue<helper.Value | null>(new helper.IntValue({N: 35}, true), "helper.IntValue", "helper.IntValue"))
	let assigned: $.Slice<helper.Value | null> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	if (err != null) {
		await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("assigned:", (__goscriptAwait = $.pointerValue<Exclude<helper.Value, null>>($.arrayIndex(assigned!, 0)).GetValue(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "helper.Value", zero: () => null, methods: {GetValue: (receiver: any, ...args: any[]) => receiver.GetValue(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

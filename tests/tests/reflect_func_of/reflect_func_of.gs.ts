// Generated file based on reflect_func_of.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	let intType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
	let stringType = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
	let sliceStringType = reflect.SliceOf($.pointerValueOrNil(stringType)!)

	let fnType = reflect.FuncOf($.arrayToSlice<reflect.Type | null>([intType]), $.arrayToSlice<reflect.Type | null>([stringType]), false)
	await $.println("func:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 19, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).NumIn(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).In(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).NumOut(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).Out(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(fnType).IsVariadic(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let variadicType = reflect.FuncOf($.arrayToSlice<reflect.Type | null>([sliceStringType]), $.arrayToSlice<reflect.Type | null>([intType]), true)
	await $.println("variadic:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(variadicType).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(variadicType).NumIn(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(variadicType).In(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(variadicType).NumOut(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(variadicType).Out(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(variadicType).IsVariadic(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	await $.println("reflect_func_of test finished")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

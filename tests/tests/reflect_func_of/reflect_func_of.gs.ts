// Generated file based on reflect_func_of.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	let intType = reflect.TypeFor(__goscriptStatic0())
	let stringType = reflect.TypeFor(__goscriptStatic1())
	let sliceStringType = reflect.SliceOf($.pointerValueOrNil(stringType)!)

	let fnType = reflect.FuncOf($.arrayToSlice<reflect.Type | null>([intType]), $.arrayToSlice<reflect.Type | null>([stringType]), false)
	await $.println("func:", await $.pointerValue<Exclude<reflect.Type, null>>(fnType).String(), await $.pointerValue<Exclude<reflect.Type, null>>(fnType).Kind() == 19, await $.pointerValue<Exclude<reflect.Type, null>>(fnType).NumIn(), await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>(fnType).In(0))).String(), await $.pointerValue<Exclude<reflect.Type, null>>(fnType).NumOut(), await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>(fnType).Out(0))).String(), await $.pointerValue<Exclude<reflect.Type, null>>(fnType).IsVariadic())

	let variadicType = reflect.FuncOf($.arrayToSlice<reflect.Type | null>([sliceStringType]), $.arrayToSlice<reflect.Type | null>([intType]), true)
	await $.println("variadic:", await $.pointerValue<Exclude<reflect.Type, null>>(variadicType).String(), await $.pointerValue<Exclude<reflect.Type, null>>(variadicType).NumIn(), await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>(variadicType).In(0))).String(), await $.pointerValue<Exclude<reflect.Type, null>>(variadicType).NumOut(), await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>(variadicType).Out(0))).String(), await $.pointerValue<Exclude<reflect.Type, null>>(variadicType).IsVariadic())

	await $.println("reflect_func_of test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

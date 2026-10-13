// Generated file based on package_var_func_value_async_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as types from "@goscript/github.com/s4wave/goscript/tests/tests/package_var_func_value_async_init/types/index.js"

import * as __goscript_matchers from "./matchers.gs.ts"

import * as __goscript_package_init from "./__goscript_package_init.gs.ts"
import "@goscript/github.com/s4wave/goscript/tests/tests/package_var_func_value_async_init/types/index.js"
import "./matchers.gs.ts"

export var TypeWasm: types.Type

export async function __goscript_init_TypeWasm(): globalThis.Promise<void> {
	if (((TypeWasm) as any) === undefined) {
		TypeWasm = await $.markAsStructValue($.cloneStructValue(await __goscript_matchers.__goscript_get_newType()!("wasm", "application/wasm")))
	}
}

export function __goscript_get_TypeWasm(): types.Type {
	if (((TypeWasm) as any) === undefined) {
		throw new globalThis.Error("goscript package variable TypeWasm read before initialization")
	}
	return TypeWasm
}

export function __goscript_set_TypeWasm(__goscriptValue: types.Type): void {
	$.assignStruct(TypeWasm, __goscriptValue)
}

export var TypeDex: types.Type

export async function __goscript_init_TypeDex(): globalThis.Promise<void> {
	if (((TypeDex) as any) === undefined) {
		TypeDex = await $.markAsStructValue($.cloneStructValue(await __goscript_matchers.__goscript_get_newType()!("dex", "application/vnd.android.dex")))
	}
}

export function __goscript_get_TypeDex(): types.Type {
	if (((TypeDex) as any) === undefined) {
		throw new globalThis.Error("goscript package variable TypeDex read before initialization")
	}
	return TypeDex
}

export function __goscript_set_TypeDex(__goscriptValue: types.Type): void {
	$.assignStruct(TypeDex, __goscriptValue)
}

export let Application: globalThis.Map<types.Type, string> | null = $.makeMap<types.Type, string>([[$.markAsStructValue($.cloneStructValue((await __goscript_init_TypeWasm(), __goscript_get_TypeWasm()))), "wasm"], [$.markAsStructValue($.cloneStructValue((await __goscript_init_TypeDex(), __goscript_get_TypeDex()))), "dex"]])

export function __goscript_set_Application(__goscriptValue: globalThis.Map<types.Type, string> | null): void {
	Application = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	await $.println("wasm:", (await __goscript_init_TypeWasm(), __goscript_get_TypeWasm()).Ext, (await __goscript_init_TypeWasm(), __goscript_get_TypeWasm()).MIME)
	await $.println("dex:", (await types.Get("dex")).MIME)
	await $.println("application:", $.len(Application), $.mapGet<types.Type, string, string>(Application, $.markAsStructValue($.cloneStructValue((await __goscript_init_TypeWasm(), __goscript_get_TypeWasm()))), "")[0])
}

await __goscript_package_init.__goscript_package_init()

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_var_async_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export let cache = $.varRef($.markAsStructValue(new sync.Map()))

export function __goscript_set_cache(__goscriptValue: sync.Map): void {
	$.assignStruct(cache.value, __goscriptValue)
}

export function store(key: string, value: string): string {
	cache.value.Store(key, value)
	return value
}

export let storeFunc: ((key: string, value: string) => string | globalThis.Promise<string>) | null = store

export function __goscript_set_storeFunc(__goscriptValue: ((key: string, value: string) => string | globalThis.Promise<string>) | null): void {
	storeFunc = __goscriptValue
}

export let stored: string = (storeFunc!("init", "from func value") as string)

export function __goscript_set_stored(__goscriptValue: string): void {
	stored = __goscriptValue
}

export function getValueFromCache(key: string): [any, boolean] {
	return cache.value.Load(key)
}

export async function main(): globalThis.Promise<void> {
	cache.value.Store("hello", "world")

	let [val, ok] = getValueFromCache("hello")
	if (ok) {
		await $.println("Found:", $.mustTypeAssert<string>(val, /* @__PURE__ */ $.basicType("string")))
	}

	let __goscriptTuple0: any = getValueFromCache("init")
	val = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println("Stored:", stored, ok, $.mustTypeAssert<string>(val, /* @__PURE__ */ $.basicType("string")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

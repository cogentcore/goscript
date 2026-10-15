// Generated file based on async_call_in_return.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export let cache = $.varRef($.markAsStructValue(new sync.Map()))

export function __goscript_set_cache(__goscriptValue: sync.Map): void {
	$.assignStruct(cache.value, __goscriptValue)
}

export function getFromCache(key: string): [any, boolean] {
	let [val, ok] = cache.value.Load(key)
	return [val, ok]
}

export function getFromCacheInline(key: string): [any, boolean] {
	return cache.value.Load(key)
}

export async function main(): globalThis.Promise<void> {
	cache.value.Store("test", $.basicInterfaceValue(42, "int"))

	let [val1, ok1] = getFromCache("test")
	if (ok1) {
		await $.println("getFromCache found:", $.mustTypeAssert<number>(val1, /* @__PURE__ */ $.basicType("int")))
	}

	let [val2, ok2] = getFromCacheInline("test")
	if (ok2) {
		await $.println("getFromCacheInline found:", $.mustTypeAssert<number>(val2, /* @__PURE__ */ $.basicType("int")))
	}

	let [, ok3] = getFromCache("missing")
	if (!ok3) {
		await $.println("Not found as expected")
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on call_async_returned_function.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export let cache = $.varRef($.markAsStructValue(new sync.Map()))

export function __goscript_set_cache(__goscriptValue: sync.Map): void {
	$.assignStruct(cache.value, __goscriptValue)
}

export function getCallback(): ((_p0: string) => void) | null {
	cache.value.Load($.basicInterfaceValue(1, "int"))
	return $.functionValue(async (msg: string) => {
		await $.println("Callback:", msg)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
}

export async function main(): globalThis.Promise<void> {
	// Call the function returned by an async function
	// This should generate: (await getCallback())!("hello")
	// NOT: await getCallback()!("hello")
	void (__goscriptAwait = getCallback()!("hello"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

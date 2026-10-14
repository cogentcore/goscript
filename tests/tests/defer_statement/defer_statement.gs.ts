// Generated file based on defer_statement.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	__defer.defer(async () => { await $.println("deferred") })
	let release: ((name: string) => void) | null = $.functionValue(async (name: string): globalThis.Promise<void> => {
		await using __defer = new $.AsyncDisposableStack()
		__defer.defer(async () => { await $.println("func deferred", name) })
		await $.println("func body", name)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
	void (__goscriptAwait = release!("first"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	void (__goscriptAwait = release!("second"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("main")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on func_literal.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let greet: ((name: string) => string | globalThis.Promise<string>) | null = $.functionValue((name: string): string => {
		return $.concatString("Hello, ", name)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))

	let message = (__goscriptAwait = greet!("world"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println(message)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

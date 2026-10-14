// Generated file based on generic_function_instantiation_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function identity(__typeArgs: $.GenericTypeArgs | undefined, value: any): any {
	return value
}

export async function main(): globalThis.Promise<void> {
	let fn: ((value: number) => number | globalThis.Promise<number>) | null = $.functionValue((value: any): any => identity({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, value), ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	await $.println((__goscriptAwait = fn!(7), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

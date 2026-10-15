// Generated file based on generic_function_instantiation_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function identity(__typeArgs: $.GenericTypeArgs | undefined, value: any): any {
	return $.copyElement(value)
}

export async function main(): globalThis.Promise<void> {
	let fn: ((value: number) => number | globalThis.Promise<number>) | null = $.functionValue((value: any): any => identity(__goscriptStatic0(), value), ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	await $.println((fn!(7) as number))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

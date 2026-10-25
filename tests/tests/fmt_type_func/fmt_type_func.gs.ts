// Generated file based on fmt_type_func.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export type handler = ((_p0: string) => $.GoError | globalThis.Promise<$.GoError>) | null

export function add(a: number, b: number): number {
	return a + b
}

export async function main(): globalThis.Promise<void> {
	let f = $.functionValue((a: number): string => {
		return ""
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let g: (() => void) | null = null! as (() => void) | null
	let h: handler | null = $.functionValue((_p0: string): $.GoError => {
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: ["error"] } as $.FunctionTypeInfo))
	fmt.Printf("%T|%T|%T|%T\n", $.interfaceValue(f, "func(a int) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), $.interfaceValue($.goFunc(add, "main.add"), "func(a int, b int) int", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), $.interfaceValue(h, "main.handler", ({ kind: $.TypeKind.Function, name: "main.handler", params: [/* @__PURE__ */ $.basicType("string")], results: ["error"] } as $.FunctionTypeInfo)), $.interfaceValue($.functionValue((_p0: $.Slice<any>): [number, $.GoError] => {
		return [0, null]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: [/* @__PURE__ */ $.basicType("int"), "error"], isVariadic: true } as $.FunctionTypeInfo)), "func(...any) (int, error)", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: [/* @__PURE__ */ $.basicType("int"), "error"], isVariadic: true } as $.FunctionTypeInfo)))
	fmt.Printf("%T\n", $.interfaceValue(g, "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	let x: any = $.interfaceValue(f, "func(a int) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	fmt.Println((fmt.Sprintf("%T", x) as string))
}

if ($.isMainScript(import.meta)) {
	await main()
}

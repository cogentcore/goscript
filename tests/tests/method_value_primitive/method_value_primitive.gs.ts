// Generated file based on method_value_primitive.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type myInt = number

$.registerNamedValueType(
	"main.myInt",
	{add: (receiver: any, ...args: any[]) => (myInt_add as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), multiply: (receiver: any, ...args: any[]) => (myInt_multiply as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("add", [["x", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("multiply", [["x", /* @__PURE__ */ $.basicType("int")], ["y", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.myInt",
	{add: (receiver: any, ...args: any[]) => (myInt_add as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), multiply: (receiver: any, ...args: any[]) => (myInt_multiply as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("add", [["x", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("multiply", [["x", /* @__PURE__ */ $.basicType("int")], ["y", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")])]
);

export function myInt_add(m: myInt, x: number): number {
	return m + x
}

export function myInt_multiply(m: myInt, x: number, y: number): number {
	return (m * x) * y
}

export async function main(): globalThis.Promise<void> {
	let n: myInt = 5

	// Method value: binding the receiver to create a function
	let addFn: ((x: number) => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => (x: number) => myInt_add(__receiver, x))(n), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.myInt.add-fm")
	await $.println("addFn(3):", (addFn!(3) as number))

	let mulFn: ((x: number, y: number) => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => (x: number, y: number) => myInt_multiply(__receiver, x, y))(n), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.myInt.multiply-fm")
	await $.println("mulFn(2, 3):", (mulFn!(2, 3) as number))

	// Test with different receiver value
	let m: myInt = 10
	let addFn2: ((x: number) => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => (x: number) => myInt_add(__receiver, x))(m), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.myInt.add-fm")
	await $.println("addFn2(7):", (addFn2!(7) as number))
}

if ($.isMainScript(import.meta)) {
	await main()
}

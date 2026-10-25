// Generated file based on function_type_assertion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Greeter = ((name: string) => string | globalThis.Promise<string>) | null

export type Adder = ((a: number, b: number) => number | globalThis.Promise<number>) | null

export type AddFunc = ((a: number, b: number) => number | globalThis.Promise<number>) | null

export class FuncContainer {
	public declare myFunc: any

	constructor(__goscriptValue?: boolean, myFunc$?: any) {
		this.myFunc = myFunc$ ?? (null! as any)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): FuncContainer {
		return new FuncContainer(true, this.myFunc)
	}

	public __goscriptAssign(source: FuncContainer): this {
		this.myFunc = $.assignFieldValue(this.myFunc, source.myFunc)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.FuncContainer",
		() => new FuncContainer(),
		() => [],
		FuncContainer,
		() => [{ name: "myFunc", key: "myFunc", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export function greet(name: string): string {
	return "Hello, " + name
}

export function add(a: number, b: number): number {
	return a + b
}

export function getGreeter(): any {
	return $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
}

export function getAdder(): any {
	return $.interfaceValue($.namedFunction(add, "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
}

export async function main(): globalThis.Promise<void> {
	// 1. Simple function type assertion
	let i: any = $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let [fn, ok] = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>(i, ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	if (ok) {
		await $.println((fn!("World") as string))
	} else {
		await $.println("Simple assertion failed")
	}

	let j: any = $.interfaceValue($.namedFunction(add, "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let __goscriptTuple0: any = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(j, ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let addFn: Adder | null = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	if (ok) {
		await $.println((addFn!(5, 3) as number))
	} else {
		await $.println("Simple adder assertion failed")
	}

	// 2. Type assertion of a function returned from another function
	let returnedFn = getGreeter()
	let __goscriptTuple1: any = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>(returnedFn, ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let greetFn: Greeter | null = __goscriptTuple1[0]
	ok = __goscriptTuple1[1]
	if (ok) {
		await $.println((greetFn!("Gopher") as string))
	} else {
		await $.println("Returned function assertion failed")
	}

	let returnedAdder = getAdder()
	let __goscriptTuple2: any = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(returnedAdder, ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let addFnFromFunc: Adder | null = __goscriptTuple2[0]
	ok = __goscriptTuple2[1]
	if (ok) {
		await $.println((addFnFromFunc!(10, 20) as number))
	} else {
		await $.println("Returned adder assertion failed")
	}

	// 3. Type assertion of a function in a struct field
	let container = new FuncContainer(true, $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)))
	let __goscriptTuple3: any = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>(container.myFunc, ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let structFn: Greeter | null = __goscriptTuple3[0]
	ok = __goscriptTuple3[1]
	if (ok) {
		await $.println((structFn!("Struct") as string))
	} else {
		await $.println("Struct function assertion failed")
	}

	let adderContainer = new FuncContainer(true, $.interfaceValue($.namedFunction(add, "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))
	let __goscriptTuple4: any = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(adderContainer.myFunc, ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let structAdderFn: Adder | null = __goscriptTuple4[0]
	ok = __goscriptTuple4[1]
	if (ok) {
		await $.println((structAdderFn!(7, 8) as number))
	} else {
		await $.println("Struct adder assertion failed")
	}

	// 4. Type assertion of a function in a map
	let funcMap = $.makeMap<string, any>()
	$.mapSet(funcMap, "greeter", $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)))
	$.mapSet(funcMap, "adder", $.interfaceValue($.namedFunction(add, "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))

	let __goscriptTuple5: any = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>($.mapGet<string, any, any>(funcMap, "greeter", null)[0], ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let mapFn: Greeter | null = __goscriptTuple5[0]
	ok = __goscriptTuple5[1]
	if (ok) {
		await $.println((mapFn!("Map") as string))
	} else {
		await $.println("Map function assertion failed")
	}

	let __goscriptTuple6: any = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>($.mapGet<string, any, any>(funcMap, "adder", null)[0], ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let mapAdderFn: Adder | null = __goscriptTuple6[0]
	ok = __goscriptTuple6[1]
	if (ok) {
		await $.println((mapAdderFn!(1, 2) as number))
	} else {
		await $.println("Map adder assertion failed")
	}

	// 5. Type assertion of a function in a slice
	let funcSlice = $.makeSlice<any>(2)
	$.sliceElems(funcSlice!)[$.sliceSlot(funcSlice!, 0)] = $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	$.sliceElems(funcSlice!)[$.sliceSlot(funcSlice!, 1)] = $.interfaceValue($.namedFunction(add, "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), "main.Adder", ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))

	let __goscriptTuple7: any = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>($.plainSliceIndex(funcSlice!, 0), ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let sliceFn: Greeter | null = __goscriptTuple7[0]
	ok = __goscriptTuple7[1]
	if (ok) {
		await $.println((sliceFn!("Slice") as string))
	} else {
		await $.println("Slice function assertion failed")
	}
	let __goscriptTuple8: any = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>($.plainSliceIndex(funcSlice!, 1), ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let sliceAdderFn: Adder | null = __goscriptTuple8[0]
	ok = __goscriptTuple8[1]
	if (ok) {
		await $.println((sliceAdderFn!(9, 9) as number))
	} else {
		await $.println("Slice adder assertion failed")
	}

	// 6. Type assertion with ok variable (successful and failing)
	let k: any = $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let [, ok1] = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>(k, ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	await $.println(ok1)

	let [, ok2] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(k, ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println(ok2)

	let l: any = "not a function"
	let [, ok3] = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>(l, ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	await $.println(ok3)

	// 7. Type assertion that should panic (commented out for now to allow test to run)
	// defer func() {
	// 	if r := recover(); r != nil {
	// 		println("Panic caught as expected")
	// 	}
	// }()
	// var m interface{} = "definitely not a func"
	// _ = m.(Greeter) // This would panic
	// println("This line should not be reached if panic test is active")

	// Test with nil interface
	let nilInterface: any = null! as any
	let [nilFn, okNil] = $.typeAssertTuple<((name: string) => string | globalThis.Promise<string>) | null>(nilInterface, ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	if (!okNil && (nilFn == null)) {
		await $.println("Nil interface assertion correct")
	} else {
		await $.println("Nil interface assertion failed")
	}

	// Test assertion to wrong function type
	let wrongFnInterface: any = $.interfaceValue($.namedFunction(greet, "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "main.Greeter", ({ kind: $.TypeKind.Function, name: "main.Greeter", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let [wrongFn, okWrong] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(wrongFnInterface, ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	if (!okWrong && (wrongFn == null)) {
		await $.println("Wrong function type assertion correct")
	} else {
		await $.println("Wrong function type assertion failed")
	}

	// 8. Type assertion of a declared function to its unnamed type
	let plain: any = $.interfaceValue($.goFunc(add, "main.add"), "func(a int, b int) int", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let [plainFn, okPlain] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(plain, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	if (okPlain) {
		await $.println((plainFn!(4, 4) as number))
	} else {
		await $.println("Unnamed function type assertion failed")
	}

	let [aliasFn, okAlias] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(plain, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	if (okAlias) {
		await $.println((aliasFn!(6, 6) as number))
	} else {
		await $.println("Alias function type assertion failed")
	}

	let typed: ((a: number, b: number) => number | globalThis.Promise<number>) | null = add
	let typedAny: any = $.interfaceValue(typed, "func(a int, b int) int", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let [, okTyped] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(typedAny, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println(okTyped)

	let [, okNamed] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(plain, ({ kind: $.TypeKind.Function, name: "main.Adder", params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println(okNamed)

	let [, okUnnamed] = $.typeAssertTuple<((a: number, b: number) => number | globalThis.Promise<number>) | null>(j, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println(okUnnamed)
}

if ($.isMainScript(import.meta)) {
	await main()
}

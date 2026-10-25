// Generated file based on dead_code_reflect_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"

export type Greeting = string

$.registerNamedValueType(
	"main.Greeting",
	{Bye: (receiver: any) => (Greeting_Bye as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Hello: (receiver: any) => (Greeting_Hello as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Bye", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Hello", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Greeting",
	{Bye: (receiver: any) => (Greeting_Bye as any)($.pointerValue(receiver)), Hello: (receiver: any) => (Greeting_Hello as any)($.pointerValue(receiver))},
	[$.methodSignature("Bye", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Hello", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class Calc {
	public declare base: number

	constructor(__goscriptValue?: boolean, base$?: number) {
		this.base = base$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Calc {
		return new Calc(true, this.base)
	}

	public __goscriptAssign(source: Calc): this {
		this.base = source.base
		return this
	}

	public Add(n: number): number {
		const c = this;
		return c.base + n
	}

	public Double(): number {
		const c = this;
		return c.base * 2
	}

	public Reset(): void {
		const c: Calc | $.VarRef<Calc> | null = this;
		$.pointerValue<Calc>(c).base = 0
	}

	static __typeInfo = $.registerStructType(
		"main.Calc",
		() => new Calc(),
		() => [$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Reset", [], [], true)],
		Calc,
		() => [/* @__PURE__ */ $.structField("base", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/dead_code_reflect_methods" })]
	)
}

export function Greeting_Hello(g: Greeting): string {
	return "hello " + g
}

export function Greeting_Bye(g: Greeting): string {
	return "bye " + g
}

export async function call(v: any, name: string, args: $.Slice<any>): globalThis.Promise<$.Slice<reflect.Value>> {
	let _in = $.makeSlice<reflect.Value>($.sliceLen(args))
	for (let __goscriptRangeTarget0 = args, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __goscriptSliceWindow0 = $.sliceRange(_in), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let a = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as any);
		;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i)] = reflect.ValueOf(a)
	}
	return reflect.ValueOf(v).MethodByName(name).Call(_in)
}

export async function main(): globalThis.Promise<void> {
	let c = new Calc(false, 5)
	let names = $.arrayToSlice<string>(["Add", "Double"])
	fmt.Println($.basicInterfaceValue($.plainSliceIndex((await call($.interfaceValue(c, "*main.Calc", /* @__PURE__ */ $.pointerType("main.Calc")), $.plainSliceIndex(names!, 0), $.arrayToSlice<any>([$.basicInterfaceValue(3, "int")])))!, 0).Int(), "int64"), $.basicInterfaceValue($.plainSliceIndex((await call($.interfaceValue(c, "*main.Calc", /* @__PURE__ */ $.pointerType("main.Calc")), $.plainSliceIndex(names!, 1), null))!, 0).Int(), "int64"))

	let t = reflect.TypeOf($.interfaceValue(c, "*main.Calc", /* @__PURE__ */ $.pointerType("main.Calc")))
	for (let i = 0; i < (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait); i++) {
		fmt.Println($.basicInterfaceValue(i, "int"), ((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && ((t as any).__goValue === undefined || (t as any).__goType?.charCodeAt(0) !== 42) ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Method(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.Method).Name)
	}
	let v = reflect.ValueOf(__goscriptStatic3())
	for (let i = 0; i < v.NumMethod(); i++) {
		fmt.Println(((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(v.Type()).Method(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.Method).Name, $.plainSliceIndex((await v.Method(i).Call(null))!, 0).String())
	}
	await call($.interfaceValue(c, "*main.Calc", /* @__PURE__ */ $.pointerType("main.Calc")), "Reset", null)
	fmt.Println($.basicInterfaceValue($.pointerValue<Calc>(c).base, "int"))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Bye: (receiver: any) => (Greeting_Bye as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Hello: (receiver: any) => (Greeting_Hello as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("string", "main.Greeting"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Bye", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Hello", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ($.namedValueInterfaceValue<any>("go", "main.Greeting", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

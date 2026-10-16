// Generated file based on interface_pointer_method_set.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export type Setter = {
	Set(_p0: number): void
}

$.registerInterfaceType(
	"main.Setter",
	null,
	[$.methodSignature("Set", [/* @__PURE__ */ $.basicType("int")])]
);

export type Getter = {
	Get(): number
}

$.registerInterfaceType(
	"main.Getter",
	null,
	[$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")])]
);

export type Count = number

$.registerNamedValueType(
	"main.Count",
	{Get: (receiver: any) => (Count_Get as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.Count",
	{Get: (receiver: any) => (Count_Get as any)($.pointerValue(receiver)), Set: (receiver: any, ...args: any[]) => (Count_Set as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int")]])]
);

export class T {
	public declare v: number

	constructor(__goscriptValue?: boolean, v$?: number) {
		this.v = v$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): T {
		return new T(true, this.v)
	}

	public __goscriptAssign(source: T): this {
		this.v = source.v
		return this
	}

	public Get(): number {
		const t = this;
		return t.v
	}

	public Set(v: number): void {
		let t: T | $.VarRef<T> | null = this;
		$.pointerValue<T>(t).v = v
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int")]], [], true)],
		T,
		() => [/* @__PURE__ */ $.structField("v", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/interface_pointer_method_set" })]
	)
}

export class ByValue {
	public declare T: T

	constructor(__goscriptValue?: boolean, T$?: T) {
		this.T = T$ ?? new T(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ByValue {
		return new ByValue(true, this.T.clone())
	}

	public __goscriptAssign(source: ByValue): this {
		this.T.__goscriptAssign(source.T)
		return this
	}

	public Get(): any {
		return $.pointerValue<T>(this.T).Get()
	}

	public Set(v: any): any {
		return $.pointerValue<T>(this.T).Set(v)
	}

	static __typeInfo = $.registerStructType(
		"main.ByValue",
		() => new ByValue(),
		() => [$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int")]], [], true)],
		ByValue,
		() => [/* @__PURE__ */ $.structField("T", "main.T", [0], 0, true, { anonymous: true })]
	)
}

export class ByPointer {
	public declare T: T | $.VarRef<T> | null

	constructor(__goscriptValue?: boolean, T$?: T | $.VarRef<T> | null) {
		this.T = T$ ?? (null! as T | $.VarRef<T> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ByPointer {
		return new ByPointer(true, this.T)
	}

	public __goscriptAssign(source: ByPointer): this {
		this.T = source.T
		return this
	}

	public Get(): any {
		return $.pointerValue<T>(this.T).Get()
	}

	public Set(v: any): any {
		return $.pointerValue<T>(this.T).Set(v)
	}

	static __typeInfo = $.registerStructType(
		"main.ByPointer",
		() => new ByPointer(),
		() => [$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int")]])],
		ByPointer,
		() => [/* @__PURE__ */ $.structField("T", /* @__PURE__ */ $.pointerType("main.T"), [0], 0, true, { anonymous: true })]
	)
}

export function Count_Set(c: $.VarRef<Count> | null, v: number): void {
	c!.value = v
}

export function Count_Get(c: Count): number {
	return c
}

export async function check(name: string, v: any): globalThis.Promise<void> {
	let [, s] = $.typeAssertTuple<Setter | null>(v, "main.Setter")
	let [, g] = $.typeAssertTuple<Getter | null>(v, "main.Getter")
	await $.println(name, "Setter:", s, "Getter:", g)
}

export async function main(): globalThis.Promise<void> {
	let x: any = $.structInterfaceValue(new T(true, 1), "main.T", "main.T")
	let px: any = $.interfaceValue(new T(false, 2), "*main.T", /* @__PURE__ */ $.pointerType("main.T"))

	// A T value has only the value methods, so it is a Getter but not a Setter.
	await check("T", x)
	await check("*T", px)
	await check("ByValue", $.structInterfaceValue(new ByValue(true), "main.ByValue", "main.ByValue"))
	await check("*ByValue", $.interfaceValue(new ByValue(), "*main.ByValue", /* @__PURE__ */ $.pointerType("main.ByValue")))
	await check("ByPointer", $.structInterfaceValue(new ByPointer(true, new T()), "main.ByPointer", "main.ByPointer"))
	await check("Count", __goscriptStatic3())
	let c = $.varRef(4)
	await check("*Count", $.namedValueInterfaceValue<any>(c, "*main.Count", __goscriptStatic4(), __goscriptStatic5(), __goscriptStatic6()))

	// Type switches decide the same way.
	for (let __goscriptRangeTarget0 = $.arrayToSlice<any>([x, px]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any)
		{
			const __goscriptTypeSwitchValue = v
			switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic7())) {
				case 0:
					{
						await $.println("switch: Setter")
					}
					break
				case 1:
					{
						await $.println("switch: Getter")
					}
					break
				default:
					{
						await $.println("switch: neither")
					}
					break
			}
		}
	}

	// The method set of a value is still usable through its pointer.
	let t = $.varRef(new T(true))
	let s: Setter | null = $.interfaceValue<Setter | null>(t, "*main.T", /* @__PURE__ */ $.pointerType("main.T"))
	void (__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && ((s as any).__goValue === undefined || (s as any).__goType?.charCodeAt(0) !== 42) ? (s as Exclude<Setter, null>) : $.pointerValue<Exclude<Setter, null>>(s)).Set(5), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("set through pointer:", t.value.Get())

	// reflect agrees.
	let setter = (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(null, "*main.Setter", /* @__PURE__ */ $.pointerType("main.Setter")))).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("reflect T:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.structInterfaceValue(new T(true), "main.T", "main.T"))).Implements($.pointerValueOrNil(setter)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "*T:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new T(), "*main.T", /* @__PURE__ */ $.pointerType("main.T")))).Implements($.pointerValueOrNil(setter)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("reflect Count:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(__goscriptStatic8())).Implements($.pointerValueOrNil(setter)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "*Count:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.namedValueInterfaceValue<any>(c, "*main.Count", __goscriptStatic4(), __goscriptStatic5(), __goscriptStatic6()))).Implements($.pointerValueOrNil(setter)!), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("NumMethod T:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.structInterfaceValue(new T(true), "main.T", "main.T"))).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "*T:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new T(), "*main.T", /* @__PURE__ */ $.pointerType("main.T")))).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Get: (receiver: any) => (Count_Get as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int", "main.Count"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ($.namedValueInterfaceValue<any>(3, "main.Count", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({Get: (receiver: any) => (Count_Get as any)($.pointerValue(receiver)), Set: (receiver: any, ...args: any[]) => (Count_Set as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int", "main.Count")))
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ([$.methodSignature("Get", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int")]])])
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= ($.typeSwitchSite(["main.Setter", "main.Getter"]))
}

var __goscriptStatic8$value: any
function __goscriptStatic8(): any {
	return __goscriptStatic8$value ??= ($.namedValueInterfaceValue<any>(0, "main.Count", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on reflect_method_values.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as strings from "@goscript/strings/index.js"

export type Label = string

export type Level = number

$.registerNamedValueType(
	"main.Level",
	{Double: (receiver: any) => (Level_Double as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.Level",
	{Double: (receiver: any) => (Level_Double as any)($.pointerValue(receiver))},
	[$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class Widget {
	public declare Text: string

	public declare Lab: Label

	constructor(__goscriptValue?: boolean, Text$?: string, Lab$?: Label) {
		this.Text = Text$ ?? ""
		this.Lab = Lab$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Widget {
		return new Widget(true, this.Text, this.Lab)
	}

	public __goscriptAssign(source: Widget): this {
		this.Text = source.Text
		this.Lab = source.Lab
		return this
	}

	public SetLab(l: Label): Widget | $.VarRef<Widget> | null {
		const w: Widget | $.VarRef<Widget> | null = this;
		$.pointerValue<Widget>(w).Lab = l
		return w
	}

	public SetText(s: string): Widget | $.VarRef<Widget> | null {
		const w: Widget | $.VarRef<Widget> | null = this;
		$.pointerValue<Widget>(w).Text = s
		return w
	}

	public Sum(vs: $.Slice<Level>): number {
		const w: Widget | $.VarRef<Widget> | null = this;
		let n = 0
		for (let __goscriptRangeTarget0 = vs, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Level)
			n += v
		}
		return n
	}

	public Upper(): string {
		const w = this;
		return strings.ToUpper(w.Text)
	}

	static __typeInfo = $.registerStructType(
		"main.Widget",
		() => new Widget(),
		() => [$.methodSignature("SetLab", [["l", /* @__PURE__ */ $.basicType("string", "main.Label")]], [/* @__PURE__ */ $.pointerType("main.Widget")], true), $.methodSignature("SetText", [["s", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.pointerType("main.Widget")], true), $.methodSignature("Sum", [["vs", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int", "main.Level"))]], [/* @__PURE__ */ $.basicType("int")], true, true), $.methodSignature("Upper", [], [/* @__PURE__ */ $.basicType("string")])],
		Widget,
		() => [/* @__PURE__ */ $.structField("Text", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Lab", /* @__PURE__ */ $.basicType("string", "main.Label"), [1], 16, true)]
	)
}

export class Inner {
	public declare X: number

	constructor(__goscriptValue?: boolean, X$?: number) {
		this.X = X$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(true, this.X)
	}

	public __goscriptAssign(source: Inner): this {
		this.X = source.X
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Inner",
		() => new Inner(),
		() => [],
		Inner,
		() => [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export class Outer {
	public declare Inner: Inner | $.VarRef<Inner> | null

	constructor(__goscriptValue?: boolean, Inner$?: Inner | $.VarRef<Inner> | null) {
		this.Inner = Inner$ ?? (null! as Inner | $.VarRef<Inner> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(true, this.Inner)
	}

	public __goscriptAssign(source: Outer): this {
		this.Inner = source.Inner
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Outer",
		() => new Outer(),
		() => [],
		Outer,
		() => [/* @__PURE__ */ $.structField("Inner", /* @__PURE__ */ $.pointerType("main.Inner"), [0], 0, true, { anonymous: true })]
	)
}

export function Level_Double(l: Level): number {
	return l * 2
}

export function NewWidget(): Widget | $.VarRef<Widget> | null {
	return new Widget()
}

export async function main(): globalThis.Promise<void> {
	// A pointer has all the methods; a struct value only its value methods.
	let pt = reflect.TypeOf($.interfaceValue(new Widget(), "*main.Widget", /* @__PURE__ */ $.pointerType("main.Widget")))
	for (let i = 0; i < (__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait); i++) {
		let m = $.markAsStructValue($.cloneStructValue(((__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).Method(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.Method)))
		fmt.Println("ptr method", $.basicInterfaceValue(i, "int"), m.Name, $.basicInterfaceValue(m.Index, "int"), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(m.Type).IsVariadic(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	let vt = reflect.TypeOf($.structInterfaceValue(new Widget(true), "main.Widget", "main.Widget"))
	fmt.Println("value methods", $.basicInterfaceValue((__goscriptAwait = (vt !== null && (vt as any).__isVarRef !== true && ((vt as any).__goValue === undefined || (vt as any).__goType?.charCodeAt(0) !== 42) ? (vt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(vt)).NumMethod(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), "int"), ((__goscriptAwait = (vt !== null && (vt as any).__isVarRef !== true && ((vt as any).__goValue === undefined || (vt as any).__goType?.charCodeAt(0) !== 42) ? (vt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(vt)).Method(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.Method).Name)

	// A method of a pointer held in a settable Value is called by index.
	let out = await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.goFunc(NewWidget, "main.NewWidget"), "func() *main.Widget", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.pointerType("main.Widget")] } as $.FunctionTypeInfo))))).Call(null)
	let slot = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil($.markAsStructValue($.cloneStructValue($.arrayIndex(out!, 0))).Type())!))).Elem()))
	$.markAsStructValue($.cloneStructValue(slot)).Set($.markAsStructValue($.cloneStructValue($.arrayIndex(out!, 0))))
	let [m, ] = await (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).MethodByName("SetText")
	await $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(slot)).Method(m.Index))).Call($.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue(reflect.ValueOf("abc")))]))
	fmt.Println("text", $.pointerValue<Widget>($.mustTypeAssert<Widget | $.VarRef<Widget> | null>($.markAsStructValue($.cloneStructValue(slot)).Interface(), /* @__PURE__ */ $.pointerType("main.Widget"))).Text, $.basicInterfaceValue($.markAsStructValue($.cloneStructValue(slot)).NumMethod(), "int"))

	// A named string argument arrives as a string.
	let setLab = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(slot)).MethodByName("SetLab")))
	await $.markAsStructValue($.cloneStructValue(setLab)).Call($.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue(reflect.ValueOf($.namedValueInterfaceValue<any>("hello", "main.Label", {}, /* @__PURE__ */ $.basicType("string", "main.Label")))))]))
	let w = $.mustTypeAssert<Widget | $.VarRef<Widget> | null>($.markAsStructValue($.cloneStructValue(slot)).Interface(), /* @__PURE__ */ $.pointerType("main.Widget"))
	let w$: Widget = w == null ? $.pointerTarget<Widget>(w) : (w as any).__isVarRef === true ? (w as any).value : (w as any).__goValue === undefined ? (w as any) : $.pointerTarget<Widget>(w)
	fmt.Println("label", $.basicInterfaceValue($.stringLen((w$ as Widget).Lab), "int"), $.stringEqual((w$ as Widget).Lab, "hello"))

	// A variadic method takes its arguments one by one.
	let sum = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(slot)).MethodByName("Sum")))
	fmt.Println("variadic", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(sum)).Type()).IsVariadic(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.arrayIndex((await $.markAsStructValue($.cloneStructValue(sum)).Call($.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue(reflect.ValueOf(__goscriptStatic3()))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf(__goscriptStatic4())))])))!, 0))).Int(), "int64"))

	// A method of a named int is bound to its value.
	let double = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf(__goscriptStatic5()))).Method(0)))
	fmt.Println("double", $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.arrayIndex((await $.markAsStructValue($.cloneStructValue(double)).Call(null))!, 0))).Int(), "int64"))

	// A func stored in a settable Value can be called.
	let fn = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.interfaceValue($.goFunc(strings.ToUpper, "strings.ToUpper"), "func(s string) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(fn)).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.goFunc(strings.ToUpper, "strings.ToUpper"), "func(s string) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))))))
	fmt.Println("func", $.markAsStructValue($.cloneStructValue($.arrayIndex((await $.markAsStructValue($.cloneStructValue(fn)).Call($.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue(reflect.ValueOf("up")))])))!, 0))).String())

	// Method and SelectCase values are copied as structs.
	let methods = $.arrayToSlice<reflect.Method>([$.markAsStructValue($.cloneStructValue(((__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).Method(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.Method)))])
	let first = $.markAsStructValue($.cloneStructValue($.arrayIndex(methods!, 0)))
	let cases = $.arrayToSlice<reflect.SelectCase>([$.markAsStructValue(new reflect.SelectCase({Dir: 3}))])
	let c = $.markAsStructValue($.cloneStructValue($.arrayIndex(cases!, 0)))
	fmt.Println("copies", first.Name, c.Dir == 3)

	// FieldByIndex steps through an embedded struct pointer.
	let o = new Outer(true, new Inner(false, 7))
	fmt.Println("embedded", $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue(o, "main.Outer", "main.Outer")))).FieldByIndex($.arrayToSlice<number>([0, 0])))).Int(), "int64"))

	// A sized number keeps its type through Interface.
	let f32 = (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.functionValue((w: Widget): string => $.pointerValue<Widget>(w).Upper(), ({ kind: $.TypeKind.Function, params: ["main.Widget"], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "func(main.Widget) string", ({ kind: $.TypeKind.Function, params: ["main.Widget"], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))))).Type()).NumIn(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	fmt.Println("float32", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1.100000023841858, "float32")))).Interface(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(-3, "int8")))).Interface(), $.basicInterfaceValue(f32, "int"))

	// A new array has its length of zero elements.
	let arr = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.ArrayOf(3, $.pointerValueOrNil(reflect.TypeOf(""))!))!))).Elem()))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(arr)).Index(1))).SetString("b")
	fmt.Println("array", $.basicInterfaceValue($.markAsStructValue($.cloneStructValue(arr)).Len(), "int"), $.basicInterfaceValue($.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil(reflect.ArrayOf(4, $.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0, "byte", "uint8")))!))!))).Len(), "int"), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(arr)).Index(1))).String())

	// A MakeFunc argument has the type of its parameter.
	let mf = $.markAsStructValue($.cloneStructValue(reflect.MakeFunc($.pointerValueOrNil(reflect.TypeOf($.interfaceValue($.functionValue((_p0: Widget | $.VarRef<Widget> | null): string => {
		return ""
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Widget")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)), "func(*main.Widget) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Widget")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))))!, $.functionValue((args: $.Slice<reflect.Value>): $.Slice<reflect.Value> => {
		return $.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue(reflect.ValueOf(($.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 0))).Type()).String() as string))))])
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType("reflect.Value")], results: [/* @__PURE__ */ $.sliceType("reflect.Value")] } as $.FunctionTypeInfo)))))
	fmt.Println("makefunc", $.markAsStructValue($.cloneStructValue($.arrayIndex((await $.markAsStructValue($.cloneStructValue(mf)).Call($.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(new Widget(), "*main.Widget", /* @__PURE__ */ $.pointerType("main.Widget")))))])))!, 0))).String())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Double: (receiver: any) => (Level_Double as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("int", "main.Level"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Double", [], [/* @__PURE__ */ $.basicType("int")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ($.namedValueInterfaceValue<any>(3, "main.Level", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ($.namedValueInterfaceValue<any>(4, "main.Level", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ($.namedValueInterfaceValue<any>(5, "main.Level", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

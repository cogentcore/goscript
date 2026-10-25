// Generated file based on reflect_make_func.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	let intType = reflect.TypeFor(__goscriptStatic0())
	let stringType = reflect.TypeFor(__goscriptStatic1())
	let boolType = reflect.TypeFor(__goscriptStatic2())

	let unaryType = reflect.FuncOf($.arrayToSlice<reflect.Type | null>([intType]), $.arrayToSlice<reflect.Type | null>([stringType]), false)
	let unaryValue = reflect.MakeFunc($.pointerValueOrNil(unaryType)!, $.functionValue((args: $.Slice<reflect.Value>): $.Slice<reflect.Value> => {
		return $.arrayToSlice<reflect.Value>([reflect.ValueOf("value-" + $.runeToString($.intFromWide($.int64Add(48n, $.arrayIndex(args!, 0).Int()), 32)))])
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType("reflect.Value")], results: [/* @__PURE__ */ $.sliceType("reflect.Value")] } as $.FunctionTypeInfo)))
	let unary: ((_p0: number) => string | globalThis.Promise<string>) | null = $.mustTypeAssert<((_p0: number) => string | globalThis.Promise<string>) | null>(unaryValue.Interface(), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	await $.println("direct:", (__goscriptAwait = unary!(7), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let reflectedUnary = await unaryValue.Call($.arrayToSlice<reflect.Value>([reflect.ValueOf($.basicInterfaceValue(8, "int"))]))
	await $.println("reflected:", $.arrayIndex(reflectedUnary!, 0).String())
	let [, wrong] = $.typeAssertTuple<((_p0: string) => string | globalThis.Promise<string>) | null>(unaryValue.Interface(), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	await $.println("wrong assertion:", wrong)

	let zeroType = reflect.FuncOf(null, null, false)
	let zeroCalled = false
	let zeroValue = reflect.MakeFunc($.pointerValueOrNil(zeroType)!, $.functionValue((args: $.Slice<reflect.Value>): $.Slice<reflect.Value> => {
		zeroCalled = true
		return null
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType("reflect.Value")], results: [/* @__PURE__ */ $.sliceType("reflect.Value")] } as $.FunctionTypeInfo)))
	void (__goscriptAwait = $.mustTypeAssert<(() => void) | null>(zeroValue.Interface(), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("zero:", zeroCalled)

	let tupleType = reflect.FuncOf(null, $.arrayToSlice<reflect.Type | null>([intType, boolType]), false)
	let tupleValue = reflect.MakeFunc($.pointerValueOrNil(tupleType)!, $.functionValue((args: $.Slice<reflect.Value>): $.Slice<reflect.Value> => {
		return $.arrayToSlice<reflect.Value>([reflect.ValueOf($.basicInterfaceValue(3, "int")), reflect.ValueOf(true)])
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType("reflect.Value")], results: [/* @__PURE__ */ $.sliceType("reflect.Value")] } as $.FunctionTypeInfo)))
	let tuple: (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null = $.mustTypeAssert<(() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null>(tupleValue.Interface(), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))
	let [_number, ok] = await tuple!()
	await $.println("tuple direct:", _number, ok)
	let reflectedTuple = await tupleValue.Call(null)
	await $.println("tuple reflected:", $.arrayIndex(reflectedTuple!, 0).Int(), $.arrayIndex(reflectedTuple!, 1).Bool())

	let variadicType = reflect.FuncOf($.arrayToSlice<reflect.Type | null>([intType, reflect.SliceOf($.pointerValueOrNil(stringType)!)]), $.arrayToSlice<reflect.Type | null>([intType]), true)
	let variadicValue = reflect.MakeFunc($.pointerValueOrNil(variadicType)!, $.functionValue((args: $.Slice<reflect.Value>): $.Slice<reflect.Value> => {
		return $.arrayToSlice<reflect.Value>([reflect.ValueOf($.basicInterfaceValue($.int64ToNumber($.arrayIndex(args!, 0).Int()) + $.arrayIndex(args!, 1).Len(), "int"))])
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.sliceType("reflect.Value")], results: [/* @__PURE__ */ $.sliceType("reflect.Value")] } as $.FunctionTypeInfo)))
	let variadic: ((_p0: number, _p1: $.Slice<string>) => number | globalThis.Promise<number>) | null = $.mustTypeAssert<((_p0: number, _p1: $.Slice<string>) => number | globalThis.Promise<number>) | null>(variadicValue.Interface(), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))], results: [/* @__PURE__ */ $.basicType("int")], isVariadic: true } as $.FunctionTypeInfo))
	await $.println("variadic direct:", (__goscriptAwait = variadic!(10, $.arrayToSlice<string>(["a", "b"])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let reflectedVariadic = await variadicValue.Call($.arrayToSlice<reflect.Value>([reflect.ValueOf($.basicInterfaceValue(20, "int")), reflect.ValueOf("a"), reflect.ValueOf("b"), reflect.ValueOf("c")]))
	await $.println("variadic reflected:", $.arrayIndex(reflectedVariadic!, 0).Int())
	let reflectedSlice = await variadicValue.CallSlice($.arrayToSlice<reflect.Value>([reflect.ValueOf($.basicInterfaceValue(30, "int")), reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["a", "b"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))))]))
	await $.println("variadic callslice:", $.arrayIndex(reflectedSlice!, 0).Int())

	await $.println("reflect_make_func test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("bool"), zero: () => false }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on reflect_value_methods_more.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as strings from "@goscript/strings/index.js"
import type * as iter from "@goscript/iter/index.js"
import "@goscript/strings/index.js"

export class pair {
	public declare A: number

	public declare B: string

	constructor(__goscriptValue?: boolean, A$?: number, B$?: string) {
		this.A = A$ ?? 0
		this.B = B$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): pair {
		return new pair(true, this.A, this.B)
	}

	public __goscriptAssign(source: pair): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	public Add(n: number): void {
		const p: pair | $.VarRef<pair> | null = this;
		const p$: pair = p == null ? $.pointerTarget<pair>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<pair>(p);
		;(p$ as pair).A += n
	}

	public Sum(): number {
		const p = this;
		return p.A + $.stringLen(p.B)
	}

	static __typeInfo = $.registerStructType(
		"main.pair",
		() => new pair(),
		() => [$.methodSignature("Add", [["n", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])],
		pair,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// The Can methods report the kinds that their accessors accept.
	let i = reflect.ValueOf($.basicInterfaceValue(1, "int"))
	let u = reflect.ValueOf($.basicInterfaceValue(2, "uint8"))
	let f = reflect.ValueOf($.basicInterfaceValue(1.5, "float64"))
	let c = reflect.ValueOf($.basicInterfaceValue($.complex(0, 1), "complex128"))
	await $.println("can:", i.CanInt(), i.CanUint(), u.CanUint(), f.CanFloat(), c.CanComplex(), f.CanComplex())
	await $.println("overflow:", reflect.ValueOf($.basicInterfaceValue($.complex(0, 0), "complex64")).OverflowComplex($.complex(1e+40, 0)), c.OverflowComplex($.complex(1e+40, 0)))

	// Comparable looks at the values an interface or struct holds.
	let a: $.VarRef<any> = $.varRef($.interfaceValue($.arrayToSlice<number>([1]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	await $.println("comparable:", reflect.ValueOf($.interfaceValue(a, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }))).Elem().Comparable(), reflect.ValueOf($.structInterfaceValue(new pair(true), "main.pair", "main.pair")).Comparable())

	// Clear empties a map and zeros a slice; SetCap shrinks a slice's capacity.
	let m = $.makeMap<string, number>([["a", 1]])
	reflect.ValueOf($.interfaceValue(m, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))).Clear()
	let s: $.VarRef<$.Slice<number>> = $.varRef($.makeSlice<number>(2, 8, "number"))
	$.sliceElems(s.value!)[$.sliceSlot(s.value!, 0)] = 5
	let sv = reflect.ValueOf($.interfaceValue(s, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))).Elem()
	sv.Clear()
	sv.SetCap(4)
	await $.println("clear:", $.len(m), $.plainSliceIndex(s.value!, 0), $.sliceLen(s.value), $.cap(s.value))

	// Fields and Methods iterate with names and values.
	let p = $.varRef(new pair(true, 1, "xy"))
	let __goscriptRangeReturn0 = false
	;await (async () => {
		await reflect.ValueOf($.structInterfaceValue((p.value).clone(), "main.pair", "main.pair")).Fields()!(async (sf, v) => {
			await $.println("field:", sf.Name, reflect.Kind_String(v.Kind()))
			return true
		})
	})()
	if (__goscriptRangeReturn0) {
		return
	}
	let __goscriptRangeReturn1 = false
	;await (async () => {
		await reflect.ValueOf($.structInterfaceValue((p.value).clone(), "main.pair", "main.pair")).Methods()!(async (meth, v) => {
			await $.println("method:", meth.Name, $.plainSliceIndex((await v.Call(null))!, 0).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn1) {
		return
	}

	// The Type iterators yield fields, methods, and function inputs and outputs.
	let pt = reflect.TypeOf($.structInterfaceValue((p.value).clone(), "main.pair", "main.pair"))
	let __goscriptRangeReturn2 = false
	;await (async () => {
		await ((__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).Fields(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as iter.Seq<reflect.StructField> | null)!(async (sf) => {
			await $.println("type field:", sf.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(sf.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return true
		})
	})()
	if (__goscriptRangeReturn2) {
		return
	}
	let __goscriptRangeReturn3 = false
	;await (async () => {
		await ((__goscriptAwait = (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).Methods(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as iter.Seq<reflect.Method> | null)!(async (meth) => {
			await $.println("type method:", meth.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(meth.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.markAsStructValue($.cloneStructValue(meth)).IsExported())
			return true
		})
	})()
	if (__goscriptRangeReturn3) {
		return
	}
	// Method.Func takes the receiver as its first argument.
	let [sum, ] = await (pt !== null && (pt as any).__isVarRef !== true && ((pt as any).__goValue === undefined || (pt as any).__goType?.charCodeAt(0) !== 42) ? (pt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(pt)).MethodByName("Sum")
	await $.println("func:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(sum.Func.Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.plainSliceIndex((await sum.Func.Call($.arrayToSlice<reflect.Value>([reflect.ValueOf($.structInterfaceValue((p.value).clone(), "main.pair", "main.pair"))])))!, 0).Int())
	let [addm, ] = await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(p, "*main.pair", /* @__PURE__ */ $.pointerType("main.pair")))).MethodByName("Add")
	await addm.Func.Call($.arrayToSlice<reflect.Value>([reflect.ValueOf($.interfaceValue(p, "*main.pair", /* @__PURE__ */ $.pointerType("main.pair"))), reflect.ValueOf($.basicInterfaceValue(5, "int"))]))
	await $.println("ptr func:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(addm.Func.Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), p.value.A)
	let ft = reflect.TypeOf($.interfaceValue($.goFunc(strings.Repeat, "strings.Repeat"), "func(s string, count int) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)))
	let __goscriptRangeReturn4 = false
	;await (async () => {
		await ((__goscriptAwait = (ft !== null && (ft as any).__isVarRef !== true && ((ft as any).__goValue === undefined || (ft as any).__goType?.charCodeAt(0) !== 42) ? (ft as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(ft)).Ins(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as iter.Seq<reflect.Type | null> | null)!(async (_in) => {
			await $.println("in:", (__goscriptAwait = (_in !== null && (_in as any).__isVarRef !== true && ((_in as any).__goValue === undefined || (_in as any).__goType?.charCodeAt(0) !== 42) ? (_in as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(_in)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return true
		})
	})()
	if (__goscriptRangeReturn4) {
		return
	}
	let __goscriptRangeReturn5 = false
	;await (async () => {
		await ((__goscriptAwait = (ft !== null && (ft as any).__isVarRef !== true && ((ft as any).__goValue === undefined || (ft as any).__goType?.charCodeAt(0) !== 42) ? (ft as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(ft)).Outs(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as iter.Seq<reflect.Type | null> | null)!(async (out) => {
			await $.println("out:", (__goscriptAwait = (out !== null && (out as any).__isVarRef !== true && ((out as any).__goValue === undefined || (out as any).__goType?.charCodeAt(0) !== 42) ? (out as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(out)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return true
		})
	})()
	if (__goscriptRangeReturn5) {
		return
	}

	// SetIterKey and SetIterValue copy the current map entry.
	let k = reflect.New($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!).Elem()
	let e = reflect.New($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!).Elem()
	let it = reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["k", 7]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))).MapRange()
	while ((it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as reflect.MapIter).Next() : reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(it)))) {
		k.SetIterKey(it)
		e.SetIterValue(it)
	}
	await $.println("iter:", k.String(), e.Int())

	// TrySend and TryRecv do not block.
	let ch = reflect.ValueOf($.interfaceValue($.makeChannel<number>(1, 0, "both"), "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both")))
	await $.println("trysend:", await ch.TrySend(reflect.ValueOf($.basicInterfaceValue(3, "int"))), await ch.TrySend(reflect.ValueOf($.basicInterfaceValue(4, "int"))))
	let [x, ok] = await ch.TryRecv()
	await $.println("tryrecv:", x.Int(), ok)
	let __goscriptTuple0: any = await ch.TryRecv()
	x = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println("empty:", x.IsValid(), ok)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

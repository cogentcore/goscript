// Generated file based on reflect_value_methods_more.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import type * as iter from "@goscript/iter/index.js"

export class pair {
	public declare A: number

	public declare B: string

	constructor(__goscriptValue?: boolean, A$?: number, B$?: string) {
		this.A = A$ ?? 0
		this.B = B$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pair {
		return new pair(true, this.A, this.B)
	}

	public __goscriptAssign(source: pair): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	public Sum(): number {
		const p = this;
		return p.A + $.stringLen(p.B)
	}

	static __typeInfo = $.registerStructType(
		"main.pair",
		() => new pair(),
		() => [$.methodSignature("Sum", [], [/* @__PURE__ */ $.basicType("int")])],
		pair,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// The Can methods report the kinds that their accessors accept.
	let i = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1, "int"))))
	let u = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(2, "uint8"))))
	let f = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1.5, "float64"))))
	let c = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue($.complex(0, 1), "complex128"))))
	await $.println("can:", $.markAsStructValue($.cloneStructValue(i)).CanInt(), $.markAsStructValue($.cloneStructValue(i)).CanUint(), $.markAsStructValue($.cloneStructValue(u)).CanUint(), $.markAsStructValue($.cloneStructValue(f)).CanFloat(), $.markAsStructValue($.cloneStructValue(c)).CanComplex(), $.markAsStructValue($.cloneStructValue(f)).CanComplex())
	await $.println("overflow:", $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue($.complex(0, 0), "complex64")))).OverflowComplex($.complex(1e+40, 0)), $.markAsStructValue($.cloneStructValue(c)).OverflowComplex($.complex(1e+40, 0)))

	// Comparable looks at the values an interface or struct holds.
	let a: $.VarRef<any> = $.varRef($.interfaceValue($.arrayToSlice<number>([1]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	await $.println("comparable:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(a, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }))))).Elem())).Comparable(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue(new pair(true), "main.pair", "main.pair")))).Comparable())

	// Clear empties a map and zeros a slice; SetCap shrinks a slice's capacity.
	let m = $.makeMap<string, number>([["a", 1]])
	$.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(m, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))).Clear()
	let s: $.VarRef<$.Slice<number>> = $.varRef($.makeSlice<number>(2, 8, "number"))
	$.sliceElems(s.value!)[$.sliceSlot(s.value!, 0)] = 5
	let sv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(sv)).Clear()
	$.markAsStructValue($.cloneStructValue(sv)).SetCap(4)
	await $.println("clear:", $.len(m), $.arrayIndex(s.value!, 0), $.sliceLen(s.value), $.cap(s.value))

	// Fields and Methods iterate with names and values.
	let p = new pair(true, 1, "xy")
	let __goscriptRangeReturn0 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue((p).clone(), "main.pair", "main.pair")))).Fields()!(async (sf, v) => {
			await $.println("field:", sf.Name, reflect.Kind_String($.markAsStructValue($.cloneStructValue(v)).Kind()))
			return true
		})
	})()
	if (__goscriptRangeReturn0) {
		return
	}
	let __goscriptRangeReturn1 = false
	;await (async () => {
		await $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue((p).clone(), "main.pair", "main.pair")))).Methods()!(async (meth, v) => {
			await $.println("method:", meth.Name, $.markAsStructValue($.cloneStructValue($.arrayIndex((await $.markAsStructValue($.cloneStructValue(v)).Call(null))!, 0))).Int())
			return true
		})
	})()
	if (__goscriptRangeReturn1) {
		return
	}

	// SetIterKey and SetIterValue copy the current map entry.
	let k = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!))).Elem()))
	let e = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!))).Elem()))
	let it = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["k", 7]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))).MapRange()
	while ((it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as reflect.MapIter).Next() : reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(it)))) {
		$.markAsStructValue($.cloneStructValue(k)).SetIterKey(it)
		$.markAsStructValue($.cloneStructValue(e)).SetIterValue(it)
	}
	await $.println("iter:", $.markAsStructValue($.cloneStructValue(k)).String(), $.markAsStructValue($.cloneStructValue(e)).Int())

	// TrySend and TryRecv do not block.
	let ch = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeChannel<number>(1, 0, "both"), "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both")))))
	await $.println("trysend:", await $.markAsStructValue($.cloneStructValue(ch)).TrySend($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3, "int"))))), await $.markAsStructValue($.cloneStructValue(ch)).TrySend($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(4, "int"))))))
	let [x, ok] = await $.markAsStructValue($.cloneStructValue(ch)).TryRecv()
	await $.println("tryrecv:", $.markAsStructValue($.cloneStructValue(x)).Int(), ok)
	let __goscriptTuple0: any = await $.markAsStructValue($.cloneStructValue(ch)).TryRecv()
	x = $.assignStruct(x, __goscriptTuple0[0])
	ok = __goscriptTuple0[1]
	await $.println("empty:", $.markAsStructValue($.cloneStructValue(x)).IsValid(), ok)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

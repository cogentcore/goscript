// Generated file based on reflect_slice_map_ops.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as xml from "@goscript/encoding/xml/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Item {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Item {
		return new Item(true, this.Name)
	}

	public __goscriptAssign(source: Item): this {
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Item",
		() => new Item(),
		() => [],
		Item,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}

export class Holder {
	public declare S: $.Slice<number>

	public declare T: $.Slice<number>

	constructor(__goscriptValue?: boolean, S$?: $.Slice<number>, T$?: $.Slice<number>) {
		this.S = S$ ?? (null! as $.Slice<number>)
		this.T = T$ ?? (null! as $.Slice<number>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(true, this.S, this.T)
	}

	public __goscriptAssign(source: Holder): this {
		this.S = source.S
		this.T = source.T
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [/* @__PURE__ */ $.structField("S", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), [0], 0, true), /* @__PURE__ */ $.structField("T", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), [1], 24, true)]
	)
}

export class Doc {
	public declare Items: $.Slice<Item>

	constructor(__goscriptValue?: boolean, Items$?: $.Slice<Item>) {
		this.Items = Items$ ?? (null! as $.Slice<Item>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Doc {
		return new Doc(true, this.Items)
	}

	public __goscriptAssign(source: Doc): this {
		this.Items = source.Items
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Doc",
		() => new Doc(),
		() => [],
		Doc,
		() => [/* @__PURE__ */ $.structField("Items", /* @__PURE__ */ $.sliceType("main.Item"), [0], 0, true, { tag: "xml:\"item\"" })]
	)
}

export async function main(): globalThis.Promise<void> {
	// MapRange starts before the first entry and uses the map's types.
	let it = reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["x", 3]]), "map[string]float32", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("float32")))).MapRange()
	let n = 0
	while ((it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as reflect.MapIter).Next() : reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(it)))) {
		n++
		await $.println((it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as reflect.MapIter).Key() : reflect.MapIter.prototype.Key.call($.pointerValue<reflect.MapIter>(it))).String(), reflect.Kind_String((it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as reflect.MapIter).Value() : reflect.MapIter.prototype.Value.call($.pointerValue<reflect.MapIter>(it))).Kind()), (it !== null && (it as any).__isVarRef !== true && (it as any).__goValue === undefined ? ((it as any) as reflect.MapIter).Value() : reflect.MapIter.prototype.Value.call($.pointerValue<reflect.MapIter>(it))).Float())
	}
	await $.println(n)
	let empty = reflect.ValueOf($.interfaceValue($.makeMap<string, number>([]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))).MapRange()
	await $.println((empty !== null && (empty as any).__isVarRef !== true && (empty as any).__goValue === undefined ? ((empty as any) as reflect.MapIter).Next() : reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(empty))))

	// Append appends after the slice's length, within its capacity.
	let s: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([1, 2, 3]))
	let sv = reflect.ValueOf($.interfaceValue(s, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))).Elem()
	sv.SetLen(2)
	await $.println($.sliceLen(s.value), $.cap(s.value))
	let a = reflect.Append(sv, reflect.ValueOf($.basicInterfaceValue(9, "int")))
	await $.println(a.Len(), a.Index(2).Int())
	let b = reflect.AppendSlice(sv, reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([7, 8]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))
	await $.println(b.Len(), b.Index(3).Int())

	// Copy copies within the lengths of the slices.
	let c = $.arrayToSlice<number>([1, 2, 3, 4])
	let copied = reflect.Copy(reflect.ValueOf($.interfaceValue($.goSlice(c, 2, undefined), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))), reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([8, 9, 10]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))
	await $.println(copied, $.arrayIndex(c!, 0), $.arrayIndex(c!, 2), $.arrayIndex(c!, 3))

	// Values read after a Set through the same Value see the new contents.
	let m: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["old", 0]]))
	let mv = reflect.ValueOf($.interfaceValue(m, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))).Elem()
	mv.Set(reflect.MakeMap($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!))
	mv.SetMapIndex(reflect.ValueOf("k"), reflect.ValueOf($.basicInterfaceValue(1, "int")))
	await $.println($.len(m.value), mv.Len())
	let t: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([0]))
	let tv = reflect.ValueOf($.interfaceValue(t, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))).Elem()
	tv.Set(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!, 2, 2))
	tv.Index(1).SetInt(4n)
	await $.println($.arrayIndex(t.value!, 1), tv.Slice(1, 2).Index(0).Int())

	// Grow then SetLen, as encoding/xml and encoding/json do.
	let h = new Holder(false, undefined, $.makeSlice<number>(1, 10, "number"))
	let h$: Holder = h == null ? $.pointerTarget<Holder>(h) : (h as any).__isVarRef === true ? (h as any).value : (h as any).__goValue === undefined ? (h as any) : $.pointerTarget<Holder>(h)
	let hs = reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))).Elem().Field(0)
	for (let i = 0; i < 5; i++) {
		let __goscriptShadow0 = hs.Len()
		hs.Grow(1)
		hs.SetLen(__goscriptShadow0 + 1)
		hs.Index(__goscriptShadow0).SetInt($.int64(i * 10))
	}
	await $.println("grown:", $.sliceLen((h$ as Holder).S), $.arrayIndex((h$ as Holder).S!, 0), $.arrayIndex((h$ as Holder).S!, 4), $.cap((h$ as Holder).S) >= 5)

	// Grow keeps capacity when it is already large enough.
	let ht = reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))).Elem().Field(1)
	ht.Grow(3)
	await $.println("cap kept:", ht.Cap())

	// MakeSlice honors the capacity and zeroes each struct element.
	let ms = reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic2()))!, 2, 4)
	await $.println("makeslice:", ms.Len(), ms.Cap())
	ms.Index(0).Field(0).SetString("a")
	await $.println("distinct:", ms.Index(0).Field(0).String(), $.stringEqual(ms.Index(1).Field(0).String(), ""))

	// MakeSlice of bytes.
	let bs = reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic3()))!, 3, 3)
	bs.Index(1).SetUint(7n)
	await $.println("bytes:", $.sliceLen(bs.Bytes()), $.uint($.arrayIndex(bs.Bytes()!, 1), 8))

	let d: $.VarRef<Doc> = $.varRef(new Doc(true))
	let err = await xml.Unmarshal(new Uint8Array([60, 100, 111, 99, 62, 60, 105, 116, 101, 109, 62, 60, 78, 97, 109, 101, 62, 120, 60, 47, 78, 97, 109, 101, 62, 60, 47, 105, 116, 101, 109, 62, 60, 105, 116, 101, 109, 62, 60, 78, 97, 109, 101, 62, 121, 60, 47, 78, 97, 109, 101, 62, 60, 47, 105, 116, 101, 109, 62, 60, 47, 100, 111, 99, 62]), $.interfaceValue(d, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	await $.println("xml:", err == null, $.sliceLen(d.value.Items))
	if ($.sliceLen(d.value.Items) == 2) {
		await $.println("xml items:", $.arrayIndex(d.value.Items!, 0).Name, $.arrayIndex(d.value.Items!, 1).Name)
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")), zero: () => null }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType("main.Item"), zero: () => null }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), zero: () => null }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

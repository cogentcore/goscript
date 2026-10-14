// Generated file based on reflect_slice_map_ops.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as xml from "@goscript/encoding/xml/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/encoding/xml/index.js"
import "@goscript/reflect/index.js"

export class Item {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Item {
		return new Item(this, true)
	}

	public __goscriptAssign(source: Item): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
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
	public get S(): $.Slice<number> {
		return this._fields.S
	}

	public set S(value: $.Slice<number>) {
		this._fields.S = value
	}

	public get T(): $.Slice<number> {
		return this._fields.T
	}

	public set T(value: $.Slice<number>) {
		this._fields.T = value
	}

	public _fields: {
		S: $.Slice<number>
		T: $.Slice<number>
	}

	constructor(init?: Partial<{S?: $.Slice<number>, T?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			S: init?.S ?? (null! as $.Slice<number>),
			T: init?.T ?? (null! as $.Slice<number>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		target.S = values.S
		target.T = values.T
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
	public get Items(): $.Slice<Item> {
		return this._fields.Items
	}

	public set Items(value: $.Slice<Item>) {
		this._fields.Items = value
	}

	public _fields: {
		Items: $.Slice<Item>
	}

	constructor(init?: Partial<{Items?: $.Slice<Item>}>, __goscriptValue?: boolean) {
		this._fields = {
			Items: init?.Items ?? (null! as $.Slice<Item>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Doc {
		return new Doc(this, true)
	}

	public __goscriptAssign(source: Doc): void {
		const target = this._fields
		const values = source._fields
		target.Items = values.Items
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
	let it: reflect.MapIter | $.VarRef<reflect.MapIter> | null = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["x", 3]]), "map[string]float32", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("float32")))))).MapRange()
	let n = 0
	while (reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(it))) {
		n++
		await $.println($.markAsStructValue($.cloneStructValue(reflect.MapIter.prototype.Key.call($.pointerValue<reflect.MapIter>(it)))).String(), reflect.Kind_String($.markAsStructValue($.cloneStructValue(reflect.MapIter.prototype.Value.call($.pointerValue<reflect.MapIter>(it)))).Kind()), $.markAsStructValue($.cloneStructValue(reflect.MapIter.prototype.Value.call($.pointerValue<reflect.MapIter>(it)))).Float())
	}
	await $.println(n)
	let empty: reflect.MapIter | $.VarRef<reflect.MapIter> | null = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))).MapRange()
	await $.println(reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(empty)))

	// Append appends after the slice's length, within its capacity.
	let s: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([1, 2, 3]))
	let sv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(sv)).SetLen(2)
	await $.println($.sliceLen(s.value), $.cap(s.value))
	let a = $.markAsStructValue($.cloneStructValue(reflect.Append($.markAsStructValue($.cloneStructValue(sv)), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(9, "int")))))))
	await $.println($.markAsStructValue($.cloneStructValue(a)).Len(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(a)).Index(2))).Int())
	let b = $.markAsStructValue($.cloneStructValue(reflect.AppendSlice($.markAsStructValue($.cloneStructValue(sv)), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([7, 8]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))))))
	await $.println($.markAsStructValue($.cloneStructValue(b)).Len(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(b)).Index(3))).Int())

	// Copy copies within the lengths of the slices.
	let c: $.Slice<number> = $.arrayToSlice<number>([1, 2, 3, 4])
	let copied = reflect.Copy($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.goSlice(c, 2, undefined), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([8, 9, 10]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))))
	await $.println(copied, $.arrayIndex(c!, 0), $.arrayIndex(c!, 2), $.arrayIndex(c!, 3))

	// Values read after a Set through the same Value see the new contents.
	let m: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["old", 0]]))
	let mv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(m, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(mv)).Set($.markAsStructValue($.cloneStructValue(reflect.MakeMap($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!))))
	$.markAsStructValue($.cloneStructValue(mv)).SetMapIndex($.markAsStructValue($.cloneStructValue(reflect.ValueOf("k"))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1, "int")))))
	await $.println($.len(m.value), $.markAsStructValue($.cloneStructValue(mv)).Len())
	let t: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([0]))
	let tv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(t, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(tv)).Set($.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!, 2, 2))))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(tv)).Index(1))).SetInt(4n)
	await $.println($.arrayIndex(t.value!, 1), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(tv)).Slice(1, 2))).Index(0))).Int())

	// Grow then SetLen, as encoding/xml and encoding/json do.
	let h: Holder | $.VarRef<Holder> | null = new Holder({T: $.makeSlice<number>(1, 10, "number")})
	let h$: Holder = h == null ? $.pointerTarget<Holder>(h) : (h as any).__isVarRef === true ? (h as any).value : (h as any).__goValue === undefined ? (h as any) : $.pointerTarget<Holder>(h)
	let hs = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))))).Elem())).Field(0)))
	for (let i = 0; i < 5; i++) {
		let __goscriptShadow0 = $.markAsStructValue($.cloneStructValue(hs)).Len()
		$.markAsStructValue($.cloneStructValue(hs)).Grow(1)
		$.markAsStructValue($.cloneStructValue(hs)).SetLen(__goscriptShadow0 + 1)
		$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(hs)).Index(__goscriptShadow0))).SetInt($.int64(i * 10))
	}
	await $.println("grown:", $.sliceLen((h$ as Holder).S), $.arrayIndex((h$ as Holder).S!, 0), $.arrayIndex((h$ as Holder).S!, 4), $.cap((h$ as Holder).S) >= 5)

	// Grow keeps capacity when it is already large enough.
	let ht = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))))).Elem())).Field(1)))
	$.markAsStructValue($.cloneStructValue(ht)).Grow(3)
	await $.println("cap kept:", $.markAsStructValue($.cloneStructValue(ht)).Cap())

	// MakeSlice honors the capacity and zeroes each struct element.
	let ms = $.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic2()))!, 2, 4)))
	await $.println("makeslice:", $.markAsStructValue($.cloneStructValue(ms)).Len(), $.markAsStructValue($.cloneStructValue(ms)).Cap())
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ms)).Index(0))).Field(0))).SetString("a")
	await $.println("distinct:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ms)).Index(0))).Field(0))).String(), $.stringEqual($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ms)).Index(1))).Field(0))).String(), ""))

	// MakeSlice of bytes.
	let bs = $.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic3()))!, 3, 3)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bs)).Index(1))).SetUint(7n)
	await $.println("bytes:", $.sliceLen($.markAsStructValue($.cloneStructValue(bs)).Bytes()), $.uint($.arrayIndex($.markAsStructValue($.cloneStructValue(bs)).Bytes()!, 1), 8))

	let d: $.VarRef<Doc> = $.varRef(new Doc(undefined, true))
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

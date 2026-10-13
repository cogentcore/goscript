// Generated file based on reflect_slice_map_ops.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as xml from "@goscript/encoding/xml/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/encoding/xml/index.js"
import "@goscript/reflect/index.js"

export class Item {
	public declare Name: string

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Item {
		return $.markAsStructValue(new Item(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name"])
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

	public _fields: {
		S: $.Slice<number>
		T: $.Slice<number>
	}

	constructor(init?: Partial<{S?: $.Slice<number>, T?: $.Slice<number>}>) {
		this._fields = {
			S: init?.S ?? (null! as $.Slice<number>),
			T: init?.T ?? (null! as $.Slice<number>)
		}
	}

	public clone(): Holder {
		return $.markAsStructValue(new Holder(this))
	}

	static {
		$.bindStructFields(this.prototype, ["S", "T"])
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

	public _fields: {
		Items: $.Slice<Item>
	}

	constructor(init?: Partial<{Items?: $.Slice<Item>}>) {
		this._fields = {
			Items: init?.Items ?? (null! as $.Slice<Item>)
		}
	}

	public clone(): Doc {
		return $.markAsStructValue(new Doc(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Items"])
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
	await $.println($.len(s.value), $.cap(s.value))
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
	$.markAsStructValue($.cloneStructValue(mv)).Set($.markAsStructValue($.cloneStructValue(reflect.MakeMap($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")), zero: () => null }}))!))))
	$.markAsStructValue($.cloneStructValue(mv)).SetMapIndex($.markAsStructValue($.cloneStructValue(reflect.ValueOf("k"))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1, "int")))))
	await $.println($.len(m.value), $.markAsStructValue($.cloneStructValue(mv)).Len())
	let t: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([0]))
	let tv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(t, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(tv)).Set($.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }}))!, 2, 2))))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(tv)).Index(1))).SetInt(4n)
	await $.println($.arrayIndex(t.value!, 1), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(tv)).Slice(1, 2))).Index(0))).Int())

	// Grow then SetLen, as encoding/xml and encoding/json do.
	let h: Holder | $.VarRef<Holder> | null = new Holder({T: $.makeSlice<number>(1, 10, "number")})
	let hs = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))))).Elem())).Field(0)))
	for (let i = 0; i < 5; i++) {
		let __goscriptShadow0 = $.markAsStructValue($.cloneStructValue(hs)).Len()
		$.markAsStructValue($.cloneStructValue(hs)).Grow(1)
		$.markAsStructValue($.cloneStructValue(hs)).SetLen(__goscriptShadow0 + 1)
		$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(hs)).Index(__goscriptShadow0))).SetInt($.int64(i * 10))
	}
	await $.println("grown:", $.len($.pointerValue<Holder>(h).S), $.arrayIndex($.pointerValue<Holder>(h).S!, 0), $.arrayIndex($.pointerValue<Holder>(h).S!, 4), $.cap($.pointerValue<Holder>(h).S) >= 5)

	// Grow keeps capacity when it is already large enough.
	let ht = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))))).Elem())).Field(1)))
	$.markAsStructValue($.cloneStructValue(ht)).Grow(3)
	await $.println("cap kept:", $.markAsStructValue($.cloneStructValue(ht)).Cap())

	// MakeSlice honors the capacity and zeroes each struct element.
	let ms = $.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType("main.Item"), zero: () => null }}))!, 2, 4)))
	await $.println("makeslice:", $.markAsStructValue($.cloneStructValue(ms)).Len(), $.markAsStructValue($.cloneStructValue(ms)).Cap())
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ms)).Index(0))).Field(0))).SetString("a")
	await $.println("distinct:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ms)).Index(0))).Field(0))).String(), $.stringEqual($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ms)).Index(1))).Field(0))).String(), ""))

	// MakeSlice of bytes.
	let bs = $.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), zero: () => null }}))!, 3, 3)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bs)).Index(1))).SetUint(7n)
	await $.println("bytes:", $.len($.markAsStructValue($.cloneStructValue(bs)).Bytes()), $.uint($.arrayIndex($.markAsStructValue($.cloneStructValue(bs)).Bytes()!, 1), 8))

	let d: $.VarRef<Doc> = $.varRef($.markAsStructValue(new Doc()))
	let err = await xml.Unmarshal(new Uint8Array([60, 100, 111, 99, 62, 60, 105, 116, 101, 109, 62, 60, 78, 97, 109, 101, 62, 120, 60, 47, 78, 97, 109, 101, 62, 60, 47, 105, 116, 101, 109, 62, 60, 105, 116, 101, 109, 62, 60, 78, 97, 109, 101, 62, 121, 60, 47, 78, 97, 109, 101, 62, 60, 47, 105, 116, 101, 109, 62, 60, 47, 100, 111, 99, 62]), $.interfaceValue(d, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	await $.println("xml:", err == null, $.len(d.value.Items))
	if ($.len(d.value.Items) == 2) {
		await $.println("xml items:", $.arrayIndex(d.value.Items!, 0).Name, $.arrayIndex(d.value.Items!, 1).Name)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

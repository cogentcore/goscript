// Generated file based on reflect_grow_makeslice.go
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
	// Grow then SetLen, as encoding/xml and encoding/json do.
	let h: Holder | $.VarRef<Holder> | null = new Holder({T: $.makeSlice<number>(1, 10, "number")})
	let v = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))))).Elem())).Field(0)))
	for (let i = 0; i < 5; i++) {
		let n = $.markAsStructValue($.cloneStructValue(v)).Len()
		$.markAsStructValue($.cloneStructValue(v)).Grow(1)
		$.markAsStructValue($.cloneStructValue(v)).SetLen(n + 1)
		$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Index(n))).SetInt($.int64(i * 10))
	}
	await $.println("grown:", $.len($.pointerValue<Holder>(h).S), $.arrayIndex($.pointerValue<Holder>(h).S!, 0), $.arrayIndex($.pointerValue<Holder>(h).S!, 4), $.cap($.pointerValue<Holder>(h).S) >= 5)

	// Grow keeps capacity when it is already large enough.
	let tv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder"))))).Elem())).Field(1)))
	$.markAsStructValue($.cloneStructValue(tv)).Grow(3)
	await $.println("cap kept:", $.markAsStructValue($.cloneStructValue(tv)).Cap())

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

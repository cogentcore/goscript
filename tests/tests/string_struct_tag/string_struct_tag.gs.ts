// Generated file based on string_struct_tag.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Item {
	public declare Size: number

	public declare Plain: string

	constructor(__goscriptValue?: boolean, Size$?: number, Plain$?: string) {
		this.Size = Size$ ?? 0
		this.Plain = Plain$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Item {
		return new Item(true, this.Size, this.Plain)
	}

	public __goscriptAssign(source: Item): this {
		this.Size = source.Size
		this.Plain = source.Plain
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Item",
		() => new Item(),
		() => [],
		Item,
		() => [/* @__PURE__ */ $.structField("Size", /* @__PURE__ */ $.basicType("int"), [0], 0, true, { tag: "label:\"Gr\xc3\xb6\xc3\x9fe\" json:\"gr\xc3\xb6\xc3\x9fe\"" }), /* @__PURE__ */ $.structField("Plain", /* @__PURE__ */ $.basicType("string"), [1], 8, true, { tag: "json:\"plain\"" })]
	)
}

export async function main(): globalThis.Promise<void> {
	// A non-ASCII struct tag is a Go string of its UTF-8 bytes.
	let [field, ] = await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.structInterfaceValue(new Item(true), "main.Item", "main.Item"))).FieldByName("Size")
	let label = reflect.StructTag_Get(field.Tag, "label")
	await $.println("label:", label, $.stringLen(label), $.stringEqual(label, "Gr\xc3\xb6\xc3\x9fe"))

	// Its JSON name round-trips through encoding/json.
	let __goscriptTuple0: any = (json.Marshal($.structInterfaceValue(new Item(true, 3, "x"), "main.Item", "main.Item")) as [$.Slice<number>, $.GoError])
	let data: $.Slice<number> = __goscriptTuple0[0]
	await $.println("json:", $.bytesToString(data), $.stringEqual($.bytesToString(data), "{\"gr\xc3\xb6\xc3\x9fe\":3,\"plain\":\"x\"}"))
	let back: $.VarRef<Item> = $.varRef(new Item(true))
	let err = (json.Unmarshal(data, $.interfaceValue(back, "*main.Item", /* @__PURE__ */ $.pointerType("main.Item"))) as $.GoError)
	await $.println("back:", err == null, back.value.Size, back.value.Plain)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on reflect_struct_tag.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/strings/index.js"

export class item {
	public declare Name: string

	public declare Count: number

	public declare Plain: number

	public _fields: {
		Name: string
		Count: number
		Plain: number
	}

	constructor(init?: Partial<{Name?: string, Count?: number, Plain?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Count: init?.Count ?? (0 as number),
			Plain: init?.Plain ?? (0 as number)
		}
	}

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Count", "Plain"])
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true, { tag: "json:\"name\" desc:\"the name of the item, with spaces\" default:\"a b\"" }), /* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [1], 16, true, { tag: "json:\"count,omitempty\"" }), /* @__PURE__ */ $.structField("Plain", /* @__PURE__ */ $.basicType("int"), [2], 24, true)]
	)
}

export function tagLen(tag: reflect.StructTag): number {
	return $.len(tag)
}

export async function main(): globalThis.Promise<void> {
	let typ = reflect.TypeOf($.interfaceValue($.markAsStructValue(new item()), "main.item", "main.item"))
	for (let i = 0; i < await $.pointerValue<Exclude<reflect.Type, null>>(typ).NumField(); i++) {
		let f = $.markAsStructValue($.cloneStructValue(await $.pointerValue<Exclude<reflect.Type, null>>(typ).Field(i)))
		await $.println(f.Name, tagLen(f.Tag), $.stringEqual(String(f.Tag), ""))
		await $.println(" json:", reflect.StructTag_Get(f.Tag, "json"))
		await $.println(" desc:", reflect.StructTag_Get(f.Tag, "desc"))
		let [def, ok] = reflect.StructTag_Lookup(f.Tag, "default")
		await $.println(" default:", def, ok)
		await $.println(" fields:", $.len(strings.Fields(String(f.Tag))))
	}
	let tag: reflect.StructTag = "a:\"1\" b:\"two words\""
	await $.println(reflect.StructTag_Get(tag, "b"), $.stringEqual(tag, "a:\"1\" b:\"two words\""))
}

if ($.isMainScript(import.meta)) {
	await main()
}

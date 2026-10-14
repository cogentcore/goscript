// Generated file based on reflect_struct_tag.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/strings/index.js"

export class item {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Count(): number {
		return this._fields.Count
	}

	public set Count(value: number) {
		this._fields.Count = value
	}

	public get Plain(): number {
		return this._fields.Plain
	}

	public set Plain(value: number) {
		this._fields.Plain = value
	}

	public _fields: {
		Name: string
		Count: number
		Plain: number
	}

	constructor(init?: Partial<{Name?: string, Count?: number, Plain?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Count: init?.Count ?? (0 as number),
			Plain: init?.Plain ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Count = values.Count
		target.Plain = values.Plain
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
	return $.stringLen(tag)
}

export async function main(): globalThis.Promise<void> {
	let typ = reflect.TypeOf($.interfaceValue(new item(undefined, true), "main.item", "main.item"))
	for (let i = 0; i < (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait); i++) {
		let f = $.markAsStructValue($.cloneStructValue(((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField)))
		await $.println(f.Name, tagLen(f.Tag), $.stringEqual(globalThis.String(f.Tag), ""))
		await $.println(" json:", reflect.StructTag_Get(f.Tag, "json"))
		await $.println(" desc:", reflect.StructTag_Get(f.Tag, "desc"))
		let [def, ok] = reflect.StructTag_Lookup(f.Tag, "default")
		await $.println(" default:", def, ok)
		await $.println(" fields:", $.sliceLen(strings.Fields(globalThis.String(f.Tag))))
	}
	let tag: reflect.StructTag = "a:\"1\" b:\"two words\""
	await $.println(reflect.StructTag_Get(tag, "b"), $.stringEqual(tag, "a:\"1\" b:\"two words\""))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

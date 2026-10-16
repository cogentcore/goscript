// Generated file based on reflect_struct_tag.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as strings from "@goscript/strings/index.js"

export class item {
	public declare Name: string

	public declare Count: number

	public declare Plain: number

	constructor(__goscriptValue?: boolean, Name$?: string, Count$?: number, Plain$?: number) {
		this.Name = Name$ ?? ""
		this.Count = Count$ ?? 0
		this.Plain = Plain$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.Name, this.Count, this.Plain)
	}

	public __goscriptAssign(source: item): this {
		this.Name = source.Name
		this.Count = source.Count
		this.Plain = source.Plain
		return this
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
	let typ = reflect.TypeOf($.structInterfaceValue(new item(true), "main.item", "main.item"))
	for (let i = 0; i < (__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && ((typ as any).__goValue === undefined || (typ as any).__goType?.charCodeAt(0) !== 42) ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait); i++) {
		let f = $.markAsStructValue($.cloneStructValue(((__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && ((typ as any).__goValue === undefined || (typ as any).__goType?.charCodeAt(0) !== 42) ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField)))
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

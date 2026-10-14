// Generated file based on address_taken_param_struct.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Format {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Ext(): $.Slice<string> {
		return this._fields.Ext
	}

	public set Ext(value: $.Slice<string>) {
		this._fields.Ext = value
	}

	public _fields: {
		Name: string
		Ext: $.Slice<string>
	}

	constructor(init?: Partial<{Name?: string, Ext?: $.Slice<string>}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Ext: init?.Ext ?? (null! as $.Slice<string>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Format {
		return new Format(this, true)
	}

	public __goscriptAssign(source: Format): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Ext = values.Ext
	}

	static __typeInfo = $.registerStructType(
		"main.Format",
		() => new Format(),
		() => [],
		Format,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Ext", key: "Ext", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }]
	)
}

export let byName: globalThis.Map<string, Format | $.VarRef<Format> | null> | null = $.makeMap<string, Format | $.VarRef<Format> | null>()

export function __goscript_set_byName(__goscriptValue: globalThis.Map<string, Format | $.VarRef<Format> | null> | null): void {
	byName = __goscriptValue
}

export let byExt: globalThis.Map<string, Format | $.VarRef<Format> | null> | null = $.makeMap<string, Format | $.VarRef<Format> | null>()

export function __goscript_set_byExt(__goscriptValue: globalThis.Map<string, Format | $.VarRef<Format> | null> | null): void {
	byExt = __goscriptValue
}

export function registerFormat(__goscriptParam0: Format): void {
	let f: $.VarRef<Format> = $.varRef(__goscriptParam0)
	$.mapSet(byName, f.value.Name, f)
	for (let __goscriptRangeTarget0 = f.value.Ext, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let ext = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		$.mapSet(byExt, ext, f)
	}
	f.value.Name = $.concatString(f.value.Name, "-updated")
}

export async function main(): globalThis.Promise<void> {
	registerFormat(new Format({Name: "json", Ext: $.arrayToSlice<string>(["json"])}, true))
	await $.println($.pointerValue<Format>($.mapGet<string, Format | $.VarRef<Format> | null, Format | $.VarRef<Format> | null>(byName, "json", null)[0]).Name)
	await $.println($.pointerValue<Format>($.mapGet<string, Format | $.VarRef<Format> | null, Format | $.VarRef<Format> | null>(byExt, "json", null)[0]).Name)
	$.pointerValue<Format>($.mapGet<string, Format | $.VarRef<Format> | null, Format | $.VarRef<Format> | null>(byName, "json", null)[0]).Name = "mutated"
	await $.println($.pointerValue<Format>($.mapGet<string, Format | $.VarRef<Format> | null, Format | $.VarRef<Format> | null>(byExt, "json", null)[0]).Name)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on nil_slice_append_spread.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public get value(): string {
		return this._fields.value
	}

	public set value(value: string) {
		this._fields.value = value
	}

	public _fields: {
		value: string
	}

	constructor(init?: Partial<{value?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function clone(items: $.Slice<item | $.VarRef<item> | null>): $.Slice<item | $.VarRef<item> | null> {
	return $.appendSlice<item | $.VarRef<item> | null>(null, items, $.appendZeros.nil)
}

export async function main(): globalThis.Promise<void> {
	let first: item | $.VarRef<item> | null = new item({value: "first"})
	let second: item | $.VarRef<item> | null = new item({value: "second"})
	let items: $.Slice<item | $.VarRef<item> | null> = $.arrayToSlice<item | $.VarRef<item> | null>([first, second])
	let cloned: $.Slice<item | $.VarRef<item> | null> = clone(items)
	await $.println($.sliceLen(cloned), $.pointerValue<item>($.arrayIndex(cloned!, 0)).value, $.pointerValue<item>($.arrayIndex(cloned!, 1)).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

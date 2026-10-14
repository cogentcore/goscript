// Generated file based on typed_nil_slice_interface_assertion.go
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

export async function main(): globalThis.Promise<void> {
	let boxed: any = $.interfaceValue(null, "[]*main.item", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.item")))
	let asserted: $.Slice<item | $.VarRef<item> | null> = $.mustTypeAssert<$.Slice<item | $.VarRef<item> | null>>(boxed, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.item")))
	await $.println(asserted == null)

	let __goscriptTuple0: any = $.typeAssertTuple<$.Slice<item | $.VarRef<item> | null>>(boxed, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.item")))
	let commaOK: $.Slice<item | $.VarRef<item> | null> = __goscriptTuple0[0]
	let ok = __goscriptTuple0[1]
	await $.println(ok, commaOK == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

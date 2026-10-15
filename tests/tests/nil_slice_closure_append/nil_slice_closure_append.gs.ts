// Generated file based on nil_slice_closure_append.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.Value)
	}

	public __goscriptAssign(source: item): this {
		this.Value = source.Value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function fill(fn: ((_p0: number) => void) | null): void {
	fn!(3)
}

export async function main(): globalThis.Promise<void> {
	let values: $.Slice<item> = null! as $.Slice<item>
	fill($.functionValue((value: number) => {
		values = $.appendOne(values, new item(true, value))
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo)))
	if ($.sliceLen(values) != 0) {
		await $.println("first:", $.arrayIndex(values!, 0).Value)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on nil_slice_closure_append.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare Value: number

	constructor(init?: Partial<{Value?: number}>, __goscriptValue?: boolean) {
		this.Value = init?.Value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
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

export async function fill(fn: ((_p0: number) => void) | null): globalThis.Promise<void> {
	void (__goscriptAwait = fn!(3), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

export async function main(): globalThis.Promise<void> {
	let values: $.Slice<item> = null! as $.Slice<item>
	await fill($.functionValue((value: number) => {
		values = $.appendOne(values, new item({Value: value}, true))
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo)))
	if ($.sliceLen(values) != 0) {
		await $.println("first:", $.arrayIndex(values!, 0).Value)
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

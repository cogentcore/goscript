// Generated file based on unsafe_noescape_uintptr_xor.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export class sourceStruct {
	public declare flag: boolean

	public declare data: $.Slice<number>

	constructor(__goscriptValue?: boolean, flag$?: boolean, data$?: $.Slice<number>) {
		this.flag = flag$ ?? false
		this.data = data$ ?? (null! as $.Slice<number>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): sourceStruct {
		return new sourceStruct(true, this.flag, this.data)
	}

	public __goscriptAssign(source: sourceStruct): this {
		this.flag = source.flag
		this.data = source.data
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.sourceStruct",
		() => new sourceStruct(),
		() => [],
		sourceStruct,
		() => [{ name: "flag", key: "flag", type: /* @__PURE__ */ $.basicType("bool") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint")) }]
	)
}

export class viewStruct {
	public declare flag: boolean

	public declare data: $.Slice<number>

	constructor(__goscriptValue?: boolean, flag$?: boolean, data$?: $.Slice<number>) {
		this.flag = flag$ ?? false
		this.data = data$ ?? (null! as $.Slice<number>)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): viewStruct {
		return new viewStruct(true, this.flag, this.data)
	}

	public __goscriptAssign(source: viewStruct): this {
		this.flag = source.flag
		this.data = source.data
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.viewStruct",
		() => new viewStruct(),
		() => [],
		viewStruct,
		() => [{ name: "flag", key: "flag", type: /* @__PURE__ */ $.basicType("bool") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint")) }]
	)
}

export function noescape(p: any): any {
	let x = (p as any)
	return (x as any)
}

export function inlineSlice(values: $.Slice<number>): $.Slice<number> {
	return $.goSlice($.pointerValue<number[]>($.unsafePointerCast<$.VarRef<number[]> | null>($.arrayPointerFromIndexRef<number>($.indexRef(values!, 0), 2, 8, 8))), undefined, undefined)
}

export function markThroughView(src: sourceStruct | $.VarRef<sourceStruct> | null): boolean {
	$.pointerValue<sourceStruct>(src).flag = true
	return $.pointerValue<sourceStruct>(src).flag
}

export async function main(): globalThis.Promise<void> {
	let values = $.arrayToSlice<number>([1, 2])
	let p = ($.indexRef(values!, 1) as any)
	let q = noescape(p)

	await $.println("same:", (q === p || ($.pointerAliasesMade || (q as any)?.__goElementBacking !== undefined) && $.pointerEqual(q, p)))
	await $.println("nil:", q == null)

	let inline = inlineSlice(values)
	await $.println("inline:", $.arrayIndex(inline!, 0), $.arrayIndex(inline!, 1))
	$.sliceElems(inline!)[$.sliceSlot(inline!, 0)] = 9
	await $.println("updated:", $.arrayIndex(values!, 0))

	let src: $.VarRef<sourceStruct> = $.varRef(new sourceStruct(true))
	await $.println("struct:", markThroughView(src), src.value.flag)
}

if ($.isMainScript(import.meta)) {
	await main()
}

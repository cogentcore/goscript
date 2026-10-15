// Generated file based on short_decl_shadow_builtin.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function last(a: $.Slice<number>): number {
	let __goscriptShadow0 = $.sliceLen(a) - 1
	for (let __goscriptSliceWindow0 = $.sliceRange(a), i = 0; i < __goscriptShadow0; i++) {
		;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i + 1)] = (__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i + 1)] + (((__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i)] as number))
	}
	return $.arrayIndex(a!, __goscriptShadow0)
}

export function capacity(a: $.Slice<number>): number {
	let __goscriptShadow1 = $.cap(a)
	let n = $.sliceLen(a)
	return __goscriptShadow1 - n
}

export function grow(a: $.Slice<number>): $.Slice<number> {
	let __goscriptShadow2: $.Slice<number> = $.appendOne(a, 4)
	return __goscriptShadow2
}

export async function main(): globalThis.Promise<void> {
	await $.println(last($.arrayToSlice<number>([1, 2, 3])))
	await $.println(capacity($.makeSlice<number>(2, 5, "number")))
	await $.println($.sliceLen(grow($.arrayToSlice<number>([1, 2, 3]))))
	let __goscriptShadow3 = $.varRef<number>(0)
	__goscriptShadow3!.value = 7
	await $.println($.pointerValue<number>(__goscriptShadow3))
}

if ($.isMainScript(import.meta)) {
	await main()
}

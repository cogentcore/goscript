// Generated file based on short_decl_shadow_builtin.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function last(a: $.Slice<number>): number {
	let __goscriptShadow0 = $.len(a) - 1
	for (let i = 0; i < __goscriptShadow0; i++) {
		a![i + 1] = a![i + 1] + ($.arrayIndex(a!, i))
	}
	return $.arrayIndex(a!, __goscriptShadow0)
}

export function capacity(a: $.Slice<number>): number {
	let __goscriptShadow1 = $.cap(a)
	let n = $.len(a)
	return __goscriptShadow1 - n
}

export function grow(a: $.Slice<number>): $.Slice<number> {
	let __goscriptShadow2: $.Slice<number> = $.append(a, 4)
	return __goscriptShadow2
}

export async function main(): globalThis.Promise<void> {
	await $.println(last($.arrayToSlice<number>([1, 2, 3])))
	await $.println(capacity($.makeSlice<number>(2, 5, "number")))
	await $.println($.len(grow($.arrayToSlice<number>([1, 2, 3]))))
	let __goscriptShadow3 = $.varRef<number>(0)
	__goscriptShadow3!.value = 7
	await $.println($.pointerValue<number>(__goscriptShadow3))
}

if ($.isMainScript(import.meta)) {
	await main()
}

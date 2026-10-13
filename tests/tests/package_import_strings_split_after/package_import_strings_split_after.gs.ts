// Generated file based on package_import_strings_split_after.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/strings/index.js"

export async function show(name: string, parts: $.Slice<string>): globalThis.Promise<void> {
	await $.println(name, $.len(parts))
	for (let __goscriptRangeTarget0 = parts, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let p = __goscriptRangeTarget0![__rangeIndex]
		await $.println($.concatString(($.concatString("  [", p)), "]"))
	}
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget1 = $.arrayToSlice<string>(["a\nb", "a\n", "\n", "a\nb\nc", "ab", ""]), __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget1); __rangeIndex++) {
		let s = __goscriptRangeTarget1![__rangeIndex]
		await $.println("input:", $.len(s))
		await show("SplitAfterN 2:", strings.SplitAfterN(s, "\n", 2))
		await show("SplitAfter:", strings.SplitAfter(s, "\n"))
		await show("SplitN 2:", strings.SplitN(s, "\n", 2))
	}
	await show("SplitN empty sep 2:", strings.SplitN("abc", "", 2))
	await show("SplitAfterN empty sep 2:", strings.SplitAfterN("abc", "", 2))
	await show("SplitN empty sep 5:", strings.SplitN("abc", "", 5))
	await show("SplitN empty sep -1:", strings.SplitN("abc", "", -1))
}

if ($.isMainScript(import.meta)) {
	await main()
}

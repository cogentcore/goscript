// Generated file based on package_import_reflect_mapkeys.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	let keys = reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["alpha", 1], ["beta", 2]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))).MapKeys()

	let seen = $.makeMap<string, boolean>([])
	for (let __goscriptRangeTarget0 = keys, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let key = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as reflect.Value)
		$.mapSet(seen, key.String(), true)
	}

	await $.println("keys:", $.sliceLen(keys))
	await $.println("alpha:", $.mapGet<string, boolean, boolean>(seen, "alpha", false)[0])
	await $.println("beta:", $.mapGet<string, boolean, boolean>(seen, "beta", false)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

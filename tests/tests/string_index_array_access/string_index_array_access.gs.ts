// Generated file based on string_index_array_access.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let encoder = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

	let decodeMap: Uint8Array = $.arrayValue(new Uint8Array(256))
	for (let __goscriptRangeTarget0 = decodeMap, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		decodeMap[i] = 255
	}

	for (let i = 0; i < $.stringLen(encoder); i++) {
		if (decodeMap[$.checkArrayIndex($.indexString(encoder, i), 256)] != 255) {
			$.panic("duplicate symbol")
		}
		decodeMap[$.indexString(encoder, i)] = $.uint(i, 8)
	}

	await $.println("Success: no duplicates")
}

if ($.isMainScript(import.meta)) {
	await main()
}

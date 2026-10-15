// Generated file based on unsafe_pointer_storage.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export function writeBytes(words: $.Slice<bigint>, bytes: $.Slice<number>): void {
	for (let __goscriptRangeTarget0 = bytes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __goscriptSliceWindow0 = $.sliceRange(words), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let b = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number), 8)
		$.unsafePointerRef<number>(($.uint($.uint64Add($.indexByteAddress(words!, 0, 8), $.uint(i, 64)), 64) as any)).value = b
	}
}

export async function main(): globalThis.Promise<void> {
	await $.println("unsafe pointer storage compiles")
}

if ($.isMainScript(import.meta)) {
	await main()
}

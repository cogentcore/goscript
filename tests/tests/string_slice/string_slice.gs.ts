// Generated file based on string_slice.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export let calls = 0

export function __goscript_set_calls(__goscriptValue: number): void {
	calls = __goscriptValue
}

export function bound(i: number): number {
	calls++
	return i
}

export function word(): string {
	calls++
	return "ting"
}

export async function compareSlices(src: string): globalThis.Promise<void> {
	// Equal and different bytes, lengths and bounds.
	await $.println($.sliceStringEqual(src, 0, 4, "func"), $.sliceStringEqual(src, 1, 5, "func"), $.sliceStringEqual(src, 0, 3, "func"), !$.sliceStringEqual(src, undefined, 4, "func"), $.sliceStringEqual(src, 5, undefined, "main() {}"))
	let key = "func"
	await $.println($.sliceStringEqual(src, 0, 4, key), !$.sliceStringEqual(src, 0, 4, key), $.sliceStringEqual(src, 1, 5, "unc "), $.sliceStringEqual(src, 0, 4, $.sliceStringOrBytes(src, 0, 4)), $.sliceStringEqual(src, 0, 4, $.sliceStringOrBytes(src, 5, 9)))

	// A string longer than sixteen bytes, and bytes of UTF-8 text.
	let long = "abcdefghijklmnopqrstuvwxyz"
	await $.println($.sliceStringEqual(long, 2, 22, "cdefghijklmnopqrstuv"), $.sliceStringEqual(long, 2, 22, "cdefghijklmnopqrstuw"), $.sliceStringEqual(long, undefined, undefined, long))
	let text = "h\xc3\xa9llo, \xe4\xb8\x96\xe7\x95\x8c"
	await $.println($.sliceStringEqual(text, 1, 3, "\xc3\xa9"), $.sliceStringEqual(text, 8, 11, "\xe4\xb8\x96"), $.sliceStringEqual(text, 8, 11, "\xe7\x95\x8c"), $.sliceStringEqual(text, 1, 2, "\xc3"))

	// Bounds given by calls are evaluated once, before the other operand.
	calls = 0
	await $.println($.sliceStringEqual("testing", bound(3), bound(7), word()), $.stringEqual(word(), $.sliceStringOrBytes("testing", bound(3), undefined)), calls)
}

export async function compareOutOfRange(src: string, low: number, high: number): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		__defer.defer(async () => { await (async () => {
			await $.println("recovered:", $.recover() != null)
		})() })
		await $.println($.sliceStringEqual(src, low, high, "x"))
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
}

export async function main(): globalThis.Promise<void> {
	let myStr1 = "testing"
	await $.println("myStr1:", myStr1)
	await $.println("len(myStr1):", $.stringLen(myStr1))

	// Basic slicing
	await $.println("myStr1[0:2]:", $.sliceStringOrBytes(myStr1, 0, 2))
	await $.println("myStr1[2:5]:", $.sliceStringOrBytes(myStr1, 2, 5))
	await $.println("myStr1[5:7]:", $.sliceStringOrBytes(myStr1, 5, 7))

	// Slicing to the end
	await $.println("myStr1[3:]:", $.sliceStringOrBytes(myStr1, 3, undefined))

	// Slicing from the beginning
	await $.println("myStr1[:4]:", $.sliceStringOrBytes(myStr1, undefined, 4))

	// Slicing the entire string
	await $.println("myStr1[:]:", $.sliceStringOrBytes(myStr1, undefined, undefined))

	// Slicing with Unicode characters
	let myStr2 = "\xe4\xbd\xa0\xe5\xa5\xbd\xe4\xb8\x96\xe7\x95\x8c"
	// UTF-8 bytes:
	// 你: E4 BD A0
	// 好: E5 A5 BD
	// 世: E4 B8 96
	// 界: E7 95 8C
	// Combined: E4 BD A0 E5 A5 BD E4 B8 96 E7 95 8C
	await $.println("myStr2:", myStr2)
	await $.println("len(myStr2):", $.stringLen(myStr2))

	// Slice the first character '你' (3 bytes)
	await $.println("myStr2[0:3]:", $.sliceStringOrBytes(myStr2, 0, 3))

	// Slice the second character '好' (next 3 bytes)
	await $.println("myStr2[3:6]:", $.sliceStringOrBytes(myStr2, 3, 6))

	// Slice '你好' (first 6 bytes)
	await $.println("myStr2[0:6]:", $.sliceStringOrBytes(myStr2, 0, 6))

	// Slice from middle of a multi-byte char to middle of another - result might be invalid UTF-8 but still a valid slice
	// byteSlice := []byte(myStr2[1:5])
	// NOTE: this would throw an error since this is not possible in JavaScript (converting string to invalid utf-8 then indexing it)
	// instead of implementing this with a hack we chose to just throw an error in this case.
	// println("myStr2[1:5] => bytes:", byteSlice[0], byteSlice[1], byteSlice[2], byteSlice[3]) // Expected: bytes BD A0 E5 A5 (partial 你, partial 好)

	// Empty slices
	await $.println("myStr1[1:1]:", $.sliceStringOrBytes(myStr1, 1, 1))
	await $.println("myStr1[0:0]:", $.sliceStringOrBytes(myStr1, 0, 0))
	await $.println("myStr1[7:7]:", $.sliceStringOrBytes(myStr1, 7, 7))

	let s = "abc"
	let s1 = $.sliceStringOrBytes(s, 0, 1)
	let s2 = $.sliceStringOrBytes(s, 1, 2)
	let s3 = $.sliceStringOrBytes(s, 2, 3)
	await $.println(s1, s2, s3)

	await compareSlices("func main() {}")
	await compareOutOfRange("abc", 2, 4)
	await compareOutOfRange("abc", 2, 1)
	await compareOutOfRange("abc", 3, 3)
}

if ($.isMainScript(import.meta)) {
	await main()
}

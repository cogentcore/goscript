// Generated file based on string_conversion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	// === string(string) Conversion ===
	let myVar = "hello world"
	await $.println(myVar)

	// === string(rune) Conversion ===
	let r = 65
	let s = $.runeToString(r)
	await $.println(s)

	let r2: number = 97
	let s2 = $.runeToString(r2)
	await $.println(s2)

	let r3: number = 0x20AC
	let s3 = $.runeToString(r3)
	await $.println(s3)

	// === string([]rune) Conversion ===
	let myRunes: $.Slice<number> = $.arrayToSlice<number>([71, 111, 83, 99, 114, 105, 112, 116])
	let myStringFromRunes = $.runesToString(myRunes)
	await $.println(myStringFromRunes)

	let emptyRunes: $.Slice<number> = $.arrayToSlice<number>([])
	let emptyStringFromRunes = $.runesToString(emptyRunes)
	await $.println(emptyStringFromRunes)

	// === []rune(string) and string([]rune) Round Trip ===
	let originalString = "你好世界"
	let runesFromString: $.Slice<number> = $.stringToRunes(originalString)
	let stringFromRunes = $.runesToString(runesFromString)
	await $.println(originalString)
	await $.println(stringFromRunes)
	await $.println($.stringEqual(originalString, stringFromRunes))

	// === Modify []rune and convert back to string ===
	let mutableRunes: $.Slice<number> = $.stringToRunes("Mutable String")
	mutableRunes![0] = 109
	mutableRunes![8] = 115
	let modifiedString = $.runesToString(mutableRunes)
	await $.println(modifiedString)

	// === Test cases that might trigger "unhandled string conversion" ===

	// string([]byte) conversion
	let bytes: $.Slice<number> = new Uint8Array([72, 101, 108, 108, 111]) as $.Slice<number>
	let bytesString = $.bytesToString(bytes)
	await $.println(bytesString)
	await $.println($.stringEqual($.bytesToString(new Uint8Array([234, 8, 0]) as $.Slice<number>), $.bytesToString(new Uint8Array([234, 8, 0]))))
	await $.println($.stringEqual($.bytesToString(new Uint8Array([195, 169]) as $.Slice<number>), "é"))
	const magic: string = $.bytesToString(new Uint8Array([255, 6, 0, 0, 83, 50, 115, 84, 119, 79]))
	await $.println((10 as number) == 10)
	let magicBytes: $.Slice<number> = new Uint8Array([255, 6, 0, 0, 83, 50, 115, 84, 119, 79])
	await $.println($.sliceLen(magicBytes) == 10)
	await $.println($.arrayIndex(magicBytes!, 0) == 255)
	await $.println($.arrayIndex(magicBytes!, 1) == 6)
	await $.println($.stringEqual($.bytesToString(magicBytes), $.bytesToString(new Uint8Array([255, 6, 0, 0, 83, 50, 115, 84, 119, 79]))))
	await $.println((2 as number) == 2)
	let utf8Bytes: $.Slice<number> = new Uint8Array([195, 169])
	await $.println($.sliceLen(utf8Bytes) == 2)
	await $.println($.arrayIndex(utf8Bytes!, 0) == 195)
	await $.println($.arrayIndex(utf8Bytes!, 1) == 169)

	// string(int32) conversion
	let i32 = 66
	let i32String = $.runeToString(i32)
	await $.println(i32String)

	// Test with interface{} type assertion
	let v: any = "interface test"
	let interfaceString = $.mustTypeAssert<string>(v, /* @__PURE__ */ $.basicType("string"))
	await $.println(interfaceString)

	// Test with type conversion through variable
	let myString: string = "variable test"
	let convertedString = myString
	await $.println(convertedString)

	// === Test string(byte) conversion ===
	let b: number = 65
	let byteString = $.runeToString(b)
	await $.println(byteString)

	// === Invalid runes convert to U+FFFD ===
	let surrogate: number = 0xd800
	let negative: number = -1
	let tooBig: number = 0x110000
	await $.println($.stringEqual($.runeToString(surrogate), "�"), $.stringEqual($.runeToString(negative), "�"), $.stringEqual($.runeToString(tooBig), "�"))
	let wide: bigint = 128512n
	let wideBad: bigint = 1099511627776n
	await $.println($.stringEqual($.runeToString($.int(wide, 32)), "😀"), $.stringEqual($.runeToString(wide), "😀"), $.stringEqual($.runeToString(wideBad), "�"))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on embed_data_kinds.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as embed from "@goscript/embed/index.js"

export let text = "plain ascii text\n"

export function __goscript_set_text(__goscriptValue: string): void {
	text = __goscriptValue
}

export let textBytes: $.Slice<number> = new Uint8Array([112, 108, 97, 105, 110, 32, 97, 115, 99, 105, 105, 32, 116, 101, 120, 116, 10])

export function __goscript_set_textBytes(__goscriptValue: $.Slice<number>): void {
	textBytes = __goscriptValue
}

export let blob: $.Slice<number> = $.bytesFromBase64("AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/dGFpbA==")

export function __goscript_set_blob(__goscriptValue: $.Slice<number>): void {
	blob = __goscriptValue
}

export let small: $.Slice<number> = new Uint8Array([104, 105])

export function __goscript_set_small(__goscriptValue: $.Slice<number>): void {
	small = __goscriptValue
}

export let unicodeBytes: $.Slice<number> = $.bytesFromText("Embedded UTF-8 text: \"quotes\", \\backslashes\\, tabs\tand\r\nCRLF lines.\nAccents: é à ü ñ; CJK: 漢字かな; emoji: 😀🎉; separators: \u2028 \u2029; control: \u0001\u001f\u007f.\n<lexer><config><name>Go</name><alias>go</alias></config></lexer>\n")

export function __goscript_set_unicodeBytes(__goscriptValue: $.Slice<number>): void {
	unicodeBytes = __goscriptValue
}

export let unicodeText = "Embedded UTF-8 text: \"quotes\", \\backslashes\\, tabs\tand\r\nCRLF lines.\nAccents: \xc3\xa9 \xc3\xa0 \xc3\xbc \xc3\xb1; CJK: \xe6\xbc\xa2\xe5\xad\x97\xe3\x81\x8b\xe3\x81\xaa; emoji: \xf0\x9f\x98\x80\xf0\x9f\x8e\x89; separators: \xe2\x80\xa8 \xe2\x80\xa9; control: \x01\x1f\x7f.\n<lexer><config><name>Go</name><alias>go</alias></config></lexer>\n"

export function __goscript_set_unicodeText(__goscriptValue: string): void {
	unicodeText = __goscriptValue
}

export let files: embed.FS = $.markAsStructValue(new embed.FS(new globalThis.Map<string, Uint8Array>([["blob.bin", $.bytesFromBase64("AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/dGFpbA==")], ["small.txt", new Uint8Array([104, 105])], ["text.txt", new Uint8Array([112, 108, 97, 105, 110, 32, 97, 115, 99, 105, 105, 32, 116, 101, 120, 116, 10])], ["unicode.txt", $.bytesFromText("Embedded UTF-8 text: \"quotes\", \\backslashes\\, tabs\tand\r\nCRLF lines.\nAccents: é à ü ñ; CJK: 漢字かな; emoji: 😀🎉; separators: \u2028 \u2029; control: \u0001\u001f\u007f.\n<lexer><config><name>Go</name><alias>go</alias></config></lexer>\n")]])))

export function __goscript_set_files(__goscriptValue: embed.FS): void {
	$.assignStruct(files, __goscriptValue)
}

export function sum(data: $.Slice<number>): number {
	let total = 0
	for (let __goscriptRangeTarget0 = data, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let b = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number), 8)
		total += ((i % 7) + 1) * b
	}
	return total
}

export async function main(): globalThis.Promise<void> {
	// Text keeps its bytes in strings and byte slices.
	await $.println("text:", $.stringLen(text), $.sliceStringOrBytes(text, undefined, $.stringLen(text) - 1))
	await $.println("text bytes:", $.sliceLen(textBytes), $.stringEqual($.bytesToString(textBytes), text), sum(textBytes))

	// Binary data keeps every byte value, and is a slice of its own.
	await $.println("blob:", $.sliceLen(blob), $.arrayIndex(blob!, 0), $.arrayIndex(blob!, 255), $.arrayIndex(blob!, 256), sum(blob), $.bytesToString($.goSlice(blob, $.sliceLen(blob) - 4, undefined)))
	await $.println("small:", $.sliceLen(small), $.bytesToString(small))
	await $.println("unicode:", $.sliceLen(unicodeBytes), sum(unicodeBytes), $.stringEqual($.bytesToString(unicodeBytes), unicodeText), $.arrayIndex(unicodeBytes!, $.sliceLen(unicodeBytes) - 2))
	$.sliceElems(blob!)[$.sliceSlot(blob!, 0)] = 42
	let __goscriptTuple0: any = $.markAsStructValue($.cloneStructValue(files)).ReadFile("blob.bin")
	let again: $.Slice<number> = __goscriptTuple0[0]
	await $.println("own:", $.arrayIndex(blob!, 0), $.arrayIndex(again!, 0))

	// Files read from an embedded file system match.
	let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(files)).ReadFile("blob.bin")
	let data: $.Slice<number> = __goscriptTuple1[0]
	let err: $.GoError = __goscriptTuple1[1]
	await $.println("fs blob:", err == null, $.sliceLen(data), sum(data))
	let __goscriptTuple2: any = $.markAsStructValue($.cloneStructValue(files)).ReadFile("text.txt")
	data = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("fs text:", err == null, $.stringEqual($.bytesToString(data), text))
	let __goscriptTuple3: any = $.markAsStructValue($.cloneStructValue(files)).ReadFile("small.txt")
	data = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	await $.println("fs small:", err == null, $.bytesToString(data))
	let __goscriptTuple4: any = $.markAsStructValue($.cloneStructValue(files)).ReadFile("unicode.txt")
	data = __goscriptTuple4[0]
	err = __goscriptTuple4[1]
	await $.println("fs unicode:", err == null, $.sliceLen(data), sum(data))
}

if ($.isMainScript(import.meta)) {
	await main()
}

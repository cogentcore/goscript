// Generated file based on embed_string_utf8.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as embed from "@goscript/embed/index.js"
import * as utf8 from "@goscript/unicode/utf8/index.js"
import * as fs from "@goscript/io/fs/index.js"
import "@goscript/io/fs/index.js"

export let text = "h\xc3\xa9llo \xe2\x9c\x93 w\xc3\xb6rld\n"

export function __goscript_set_text(__goscriptValue: string): void {
	text = __goscriptValue
}

export let textBytes: $.Slice<number> = new Uint8Array([104, 195, 169, 108, 108, 111, 32, 226, 156, 147, 32, 119, 195, 182, 114, 108, 100, 10])

export function __goscript_set_textBytes(__goscriptValue: $.Slice<number>): void {
	textBytes = __goscriptValue
}

export let invalid = "bad \xff\xfe end\n"

export function __goscript_set_invalid(__goscriptValue: string): void {
	invalid = __goscriptValue
}

export let files: embed.FS = $.markAsStructValue(new embed.FS(new globalThis.Map<string, Uint8Array>([["d\xc3\xa9.txt", new Uint8Array([97, 99, 99, 101, 110, 116, 10])]])))

export function __goscript_set_files(__goscriptValue: embed.FS): void {
	$.assignStruct(files, __goscriptValue)
}

export async function main(): globalThis.Promise<void> {
	// An embedded string holds the UTF-8 bytes of the file.
	await $.println("text:", $.stringLen(text), utf8.RuneCountInString(text), $.sliceStringOrBytes(text, undefined, $.stringLen(text) - 1))
	await $.println("bytes:", $.sliceLen(textBytes), $.stringEqual($.bytesToString(textBytes), text), $.indexString(text, 1), $.indexString(text, 2))
	for (let __goscriptRunes0 = $.stringRunes($.sliceStringOrBytes(text, undefined, 8)); __goscriptRunes0.next(); ) {
		const i = __goscriptRunes0.index
		const r = __goscriptRunes0.rune
		await $.println("rune:", i, r)
	}

	// Bytes that are not valid UTF-8 are kept as they are.
	await $.println("invalid:", $.stringLen(invalid), utf8.ValidString(invalid), $.indexString(invalid, 4), $.indexString(invalid, 5))

	// The names of embedded files are UTF-8 too.
	let __goscriptTuple0: any = $.markAsStructValue($.cloneStructValue(files)).ReadFile("d\xc3\xa9.txt")
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println("file:", err == null, $.stringEqual($.bytesToString(data), "accent\n"))
	let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(files)).ReadDir(".")
	let entries: $.Slice<fs.DirEntry | null> = __goscriptTuple1[0]
	for (let __goscriptRangeTarget0 = entries, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let entry = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as fs.DirEntry | null)
		await $.println("entry:", (__goscriptAwait = (entry !== null && (entry as any).__isVarRef !== true && ((entry as any).__goValue === undefined || (entry as any).__goType?.charCodeAt(0) !== 42) ? (entry as Exclude<fs.DirEntry, null>) : $.pointerValue<Exclude<fs.DirEntry, null>>(entry)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.stringLen((__goscriptAwait = (entry !== null && (entry as any).__isVarRef !== true && ((entry as any).__goValue === undefined || (entry as any).__goType?.charCodeAt(0) !== 42) ? (entry as Exclude<fs.DirEntry, null>) : $.pointerValue<Exclude<fs.DirEntry, null>>(entry)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

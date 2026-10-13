// Generated file based on string_invalid_utf8.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as strings from "@goscript/strings/index.js"

import * as unicode from "@goscript/unicode/index.js"

import * as utf8 from "@goscript/unicode/utf8/index.js"
import "@goscript/strings/index.js"
import "@goscript/unicode/index.js"
import "@goscript/unicode/utf8/index.js"

export async function main(): globalThis.Promise<void> {
	let s = $.bytesToString(new Uint8Array([66, 97, 100, 85, 84, 70, 56, 226, 226, 161]))
	await $.println($.len(s), utf8.ValidString(s), utf8.RuneCountInString(s))

	// range yields RuneError with width 1 for each invalid byte
	for (const [i, r] of $.rangeString(s)) {
		await $.println(i, $.int(r, 32))
	}

	let __goscriptTuple0: any = utf8.DecodeRuneInString($.sliceStringOrBytes(s, 7, undefined))
	let r = $.int(__goscriptTuple0[0], 32)
	let size = __goscriptTuple0[1]
	await $.println($.int(r, 32), size)
	let __goscriptTuple1: any = utf8.DecodeLastRuneInString(s)
	r = $.int(__goscriptTuple1[0], 32)
	size = __goscriptTuple1[1]
	await $.println($.int(r, 32), size)
	await $.println(utf8.Valid($.stringToBytes(s)), utf8.RuneCount($.stringToBytes(s)))

	// indexing and slicing work on bytes
	await $.println($.uint($.indexStringOrBytes(s, 7), 8), $.uint($.indexStringOrBytes(s, 8), 8), $.uint($.indexStringOrBytes(s, 9), 8), $.len($.sliceStringOrBytes(s, 7, undefined)), $.sliceStringOrBytes(s, undefined, 7))

	// conversions
	let runes: $.Slice<number> = $.stringToRunes(s)
	await $.println($.len(runes), $.int($.arrayIndex(runes!, 7), 32), $.int($.arrayIndex(runes!, 9), 32))
	let bs: $.Slice<number> = $.stringToBytes(s)
	await $.println($.len(bs), $.uint($.arrayIndex(bs!, 7), 8), $.stringEqual($.bytesToString(bs), s))
	await $.println($.len($.runesToString(runes)), $.stringEqual($.runesToString(runes), "BadUTF8���"))

	// building from runes
	let b: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))
	for (let [__rangeIndex, r] of $.rangeString(s)) {
		if (unicode.IsUpper($.int(r, 32))) {
			r = $.int(unicode.ToLower($.int(r, 32)), 32)
		}
		b.value.WriteRune($.int(r, 32))
	}
	let out = b.value.String()
	await $.println($.len(out), $.stringEqual(out, "badutf8���"))

	// concatenation keeps the bytes
	let c = $.concatString(s, "x")
	await $.println($.len(c), $.uint($.indexStringOrBytes(c, 9), 8), $.uint($.indexStringOrBytes(c, 10), 8), utf8.ValidString(c))
	let d = $.concatString("x", s)
	await $.println($.len(d), $.uint($.indexStringOrBytes(d, 0), 8), $.uint($.indexStringOrBytes(d, 8), 8), $.uint($.indexStringOrBytes(d, 10), 8), $.stringEqual(d, $.bytesToString(new Uint8Array([120, 66, 97, 100, 85, 84, 70, 56, 226, 226, 161]))))
	let e = $.concatString(s, "é")
	await $.println($.len(e), $.uint($.indexStringOrBytes(e, 10), 8), $.uint($.indexStringOrBytes(e, 11), 8), $.stringEqual(e, $.bytesToString(new Uint8Array([66, 97, 100, 85, 84, 70, 56, 226, 226, 161, 195, 169]))))
	let f = $.concatString($.sliceStringOrBytes(s, undefined, 8), $.sliceStringOrBytes(s, 8, undefined))
	await $.println($.stringEqual(f, s), $.len(f))

	// strings functions
	await $.println($.stringEqual(strings.ToLower(s), $.bytesToString(new Uint8Array([98, 97, 100, 117, 116, 102, 56, 226, 226, 161]))), $.len(strings.ToLower(s)))
	await $.println($.stringEqual(strings.ToUpper(s), $.bytesToString(new Uint8Array([66, 65, 68, 85, 84, 70, 56, 226, 226, 161]))), $.len(strings.ToUpper(s)))
	await $.println(strings.IndexByte(s, 0xe2), strings.Index(s, $.bytesToString(new Uint8Array([226, 161]))), strings.Contains(s, "UTF"))
	await $.println(strings.ToValidUTF8(s, "?"), strings.ToValidUTF8(s, ""), strings.ToValidUTF8($.bytesToString(new Uint8Array([97, 255, 98, 195])), "[x]"))
	await $.println(strings.Map($.functionValue((r: number): number => {
		if ($.int(r, 32) == 97) {
			return -1
		}
		return $.int(r, 32)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("int32")] } as $.FunctionTypeInfo)), "banana"))

	// decoding at the edges
	await $.println(utf8.FullRune(new Uint8Array([226, 130]) as $.Slice<number>), utf8.FullRune(new Uint8Array([226, 40]) as $.Slice<number>), utf8.FullRuneInString($.bytesToString(new Uint8Array([226]))))
	let __goscriptTuple2: any = utf8.DecodeLastRuneInString($.bytesToString(new Uint8Array([195, 169, 169])))
	r = $.int(__goscriptTuple2[0], 32)
	size = __goscriptTuple2[1]
	await $.println($.int(r, 32), size, utf8.RuneCount(new Uint8Array([237, 160, 128])), utf8.ValidString($.bytesToString(new Uint8Array([237, 160, 128]))))
	let __goscriptTuple3: any = utf8.DecodeRune(new Uint8Array([240, 159, 152, 128]))
	r = $.int(__goscriptTuple3[0], 32)
	size = __goscriptTuple3[1]
	await $.println($.int(r, 32), size)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on string_invalid_utf8.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"
import * as strings from "@goscript/strings/index.js"
import * as unicode from "@goscript/unicode/index.js"
import * as utf8 from "@goscript/unicode/utf8/index.js"

export async function main(): globalThis.Promise<void> {
	let s = "BadUTF8\xe2\xe2\xa1"
	await $.println($.stringLen(s), utf8.ValidString(s), utf8.RuneCountInString(s))

	// range yields RuneError with width 1 for each invalid byte
	for (let __goscriptRunes0 = $.stringRunes(s); __goscriptRunes0.next(); ) {
		const i = __goscriptRunes0.index
		const r = __goscriptRunes0.rune
		await $.println(i, r)
	}

	let [r, size] = utf8.DecodeRuneInString($.sliceStringOrBytes(s, 7, undefined))
	await $.println(r, size)
	let __goscriptTuple0: any = utf8.DecodeLastRuneInString(s)
	r = __goscriptTuple0[0]
	size = __goscriptTuple0[1]
	await $.println(r, size)
	await $.println(utf8.Valid($.stringToBytes(s)), utf8.RuneCount($.stringToBytes(s)))

	// indexing and slicing work on bytes
	await $.println($.indexString(s, 7), $.indexString(s, 8), $.indexString(s, 9), $.stringLen($.sliceStringOrBytes(s, 7, undefined)), $.sliceStringOrBytes(s, undefined, 7))

	// conversions
	let runes = $.stringToRunes(s)
	await $.println($.sliceLen(runes), $.typedSliceIndex(runes!, 7), $.typedSliceIndex(runes!, 9))
	let bs = $.stringToBytes(s)
	await $.println($.sliceLen(bs), $.typedSliceIndex(bs!, 7), $.stringEqual($.bytesToString(bs), s))
	await $.println($.stringLen($.runesToString(runes)), $.stringEqual($.runesToString(runes), "BadUTF8\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd"))

	// building from runes
	let b = $.varRef($.markAsStructValue(new strings.Builder()))
	for (let __goscriptRunes1 = $.stringRunes(s); __goscriptRunes1.next(); ) {
		let r = __goscriptRunes1.rune
		if (unicode.IsUpper(r)) {
			r = unicode.ToLower(r)
		}
		b.value.WriteRune(r)
	}
	let out = b.value.String()
	await $.println($.stringLen(out), $.stringEqual(out, "badutf8\xef\xbf\xbd\xef\xbf\xbd\xef\xbf\xbd"))

	// concatenation keeps the bytes
	let c = s + "x"
	await $.println($.stringLen(c), $.indexString(c, 9), $.indexString(c, 10), utf8.ValidString(c))
	let d = "x" + s
	await $.println($.stringLen(d), $.indexString(d, 0), $.indexString(d, 8), $.indexString(d, 10), $.stringEqual(d, "xBadUTF8\xe2\xe2\xa1"))
	let e = s + "\xc3\xa9"
	await $.println($.stringLen(e), $.indexString(e, 10), $.indexString(e, 11), $.stringEqual(e, "BadUTF8\xe2\xe2\xa1\xc3\xa9"))
	let f = $.sliceStringOrBytes(s, undefined, 8) + $.sliceStringOrBytes(s, 8, undefined)
	await $.println($.stringEqual(f, s), $.stringLen(f))

	// strings functions
	await $.println($.stringEqual(strings.ToLower(s), "badutf8\xe2\xe2\xa1"), $.stringLen(strings.ToLower(s)))
	await $.println($.stringEqual(strings.ToUpper(s), "BADUTF8\xe2\xe2\xa1"), $.stringLen(strings.ToUpper(s)))
	await $.println(strings.IndexByte(s, 0xe2), strings.Index(s, "\xe2\xa1"), strings.Contains(s, "UTF"))
	await $.println(strings.ToValidUTF8(s, "?"), strings.ToValidUTF8(s, ""), strings.ToValidUTF8("a\xffb\xc3", "[x]"))
	await $.println(strings.Map($.functionValue((r: number): number => {
		if (r == 97) {
			return -1
		}
		return r
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("int32")] } as $.FunctionTypeInfo)), "banana"))

	// a binary key keeps its text prefix and orders by its bytes
	let key = "block:\x01\xff\x80"
	let [rest, ok] = strings.CutPrefix(key, "block:")
	await $.println(strings.HasPrefix(key, "block:"), ok, $.stringLen(rest), $.indexString(rest, 0), $.indexString(rest, 1))
	let keys = $.arrayToSlice<string>(["gcroot", key])
	slices.Sort(keys)
	await $.println($.stringEqual($.plainSliceIndex(keys!, 0), key), $.stringCompare(key, "gcroot") < 0, strings.Compare(key, "gcroot"))
	let keyed = $.makeMap<string, number>([[key, 1]])
	await $.println($.mapGet<string, number, number>(keyed, "block:\x01\xff\x80", 0)[0], $.mapGet<string, number, number>(keyed, $.bytesToString($.stringToBytes(key)), 0)[0])

	// bytes split from a sequence join into it again
	let euro = "\xe2\x82\xac"
	await $.println($.stringLen($.sliceStringOrBytes(euro, undefined, 1)), $.stringEqual(($.sliceStringOrBytes(euro, undefined, 1) + $.sliceStringOrBytes(euro, 1, undefined)), euro), $.stringEqual(($.sliceStringOrBytes(euro, undefined, 2) + "\xac"), euro))

	// decoding at the edges
	await $.println(utf8.FullRune(new Uint8Array([226, 130]) as $.Slice<number>), utf8.FullRune(new Uint8Array([226, 40]) as $.Slice<number>), utf8.FullRuneInString("\xe2"))
	let __goscriptTuple1: any = utf8.DecodeLastRuneInString("\xc3\xa9\xa9")
	r = __goscriptTuple1[0]
	size = __goscriptTuple1[1]
	await $.println(r, size, utf8.RuneCount(new Uint8Array([237, 160, 128])), utf8.ValidString("\xed\xa0\x80"))
	let __goscriptTuple2: any = utf8.DecodeRune(new Uint8Array([240, 159, 152, 128]))
	r = __goscriptTuple2[0]
	size = __goscriptTuple2[1]
	await $.println(r, size)
}

if ($.isMainScript(import.meta)) {
	await main()
}

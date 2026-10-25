// Generated file based on package_import_crypto_sha256.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sha256 from "@goscript/crypto/sha256/index.js"
import * as hash from "@goscript/hash/index.js"
import * as io from "@goscript/io/index.js"
import "@goscript/hash/index.js"
import "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let sum = $.cloneArrayValue(await sha256.Sum256(new Uint8Array([97, 98, 99])), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32))
	await $.println("sum len", 32)
	await $.println("sum first", sum[0])
	await $.println("sum last", sum[31])

	let h: hash.Hash | null = sha256.New()
	let [n, err] = await (h !== null && (h as any).__isVarRef !== true && ((h as any).__goValue === undefined || (h as any).__goType?.charCodeAt(0) !== 42) ? (h as Exclude<hash.Hash, null>) : $.pointerValue<Exclude<hash.Hash, null>>(h)).Write(new Uint8Array([97]))
	await $.println("write a", n, err == null)
	let __goscriptTuple0: any = await (h !== null && (h as any).__isVarRef !== true && ((h as any).__goValue === undefined || (h as any).__goType?.charCodeAt(0) !== 42) ? (h as Exclude<hash.Hash, null>) : $.pointerValue<Exclude<hash.Hash, null>>(h)).Write(new Uint8Array([98, 99]))
	n = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("write bc", n, err == null)
	let stream = await (h !== null && (h as any).__isVarRef !== true && ((h as any).__goValue === undefined || (h as any).__goType?.charCodeAt(0) !== 42) ? (h as Exclude<hash.Hash, null>) : $.pointerValue<Exclude<hash.Hash, null>>(h)).Sum(new Uint8Array([1, 2]) as $.Slice<number>)
	await $.println("stream len", $.sliceLen(stream))
	await $.println("stream prefix", $.typedSliceIndex(stream!, 0), $.typedSliceIndex(stream!, 1))
	await $.println("stream digest", $.typedSliceIndex(stream!, 2), $.typedSliceIndex(stream!, 33))

	let backing = $.makeSlice<number>(sha256.Size, undefined, "byte")
	let backed = await (h !== null && (h as any).__isVarRef !== true && ((h as any).__goValue === undefined || (h as any).__goType?.charCodeAt(0) !== 42) ? (h as Exclude<hash.Hash, null>) : $.pointerValue<Exclude<hash.Hash, null>>(h)).Sum($.goSlice(backing, undefined, 0))
	await $.println("backed len", $.sliceLen(backed), $.sliceLen(backing))
	await $.println("backed digest", $.typedSliceIndex(backing!, 0), $.typedSliceIndex(backing!, 31), $.typedSliceIndex(backed!, 0), $.typedSliceIndex(backed!, 31))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_embed.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as embed from "@goscript/embed/index.js"

import * as io from "@goscript/io/index.js"

import * as fs from "@goscript/io/fs/index.js"
import "@goscript/embed/index.js"
import "@goscript/io/index.js"
import "@goscript/io/fs/index.js"

export let files: embed.FS = $.markAsStructValue(new embed.FS(new globalThis.Map<string, Uint8Array>([["data.txt", new Uint8Array([104, 101, 108, 108, 111, 44, 32, 101, 109, 98, 101, 100, 100, 101, 100, 32, 119, 111, 114, 108, 100])]])))

export function __goscript_set_files(__goscriptValue: embed.FS): void {
	$.assignStruct(files, __goscriptValue)
}

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let [f, err] = $.markAsStructValue($.cloneStructValue(files)).Open("data.txt")
	if (err != null) {
		await $.println("open error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	const __goscriptDeferCallee0 = $.functionValue(((__receiver) => () => __receiver.Close())((f !== null && (f as any).__isVarRef !== true && (f as any).__goValue === undefined ? (f as Exclude<fs.File, null>) : $.pointerValue<Exclude<fs.File, null>>(f))), ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo), "io/fs.File.Close-fm")
	__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee0(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })

	// A regular embedded file implements io.ReaderAt and io.Seeker.
	let [ra, isReaderAt] = $.typeAssertTuple<io.ReaderAt | null>(f, "io.ReaderAt")
	let [sk, isSeeker] = $.typeAssertTuple<io.Seeker | null>(f, "io.Seeker")
	await $.println("interfaces:", isReaderAt, isSeeker)

	let b: $.Slice<number> = $.makeSlice<number>(8, undefined, "byte")
	let __goscriptTuple0: any = await (ra !== null && (ra as any).__isVarRef !== true && (ra as any).__goValue === undefined ? (ra as Exclude<io.ReaderAt, null>) : $.pointerValue<Exclude<io.ReaderAt, null>>(ra)).ReadAt(b, 7n)
	let n = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("readat:", n, err == null, $.bytesToString($.goSlice(b, undefined, n)))
	let __goscriptTuple1: any = await (ra !== null && (ra as any).__isVarRef !== true && (ra as any).__goValue === undefined ? (ra as Exclude<io.ReaderAt, null>) : $.pointerValue<Exclude<io.ReaderAt, null>>(ra)).ReadAt(b, 16n)
	n = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("readat end:", n, $.comparableEqual(err, io.EOF), $.bytesToString($.goSlice(b, undefined, n)))

	let __goscriptTuple2: any = await (sk !== null && (sk as any).__isVarRef !== true && (sk as any).__goValue === undefined ? (sk as Exclude<io.Seeker, null>) : $.pointerValue<Exclude<io.Seeker, null>>(sk)).Seek(-5n, 2)
	let pos = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("seek end:", pos, err == null)
	let __goscriptTuple3: any = await (f !== null && (f as any).__isVarRef !== true && (f as any).__goValue === undefined ? (f as Exclude<fs.File, null>) : $.pointerValue<Exclude<fs.File, null>>(f)).Read(b)
	n = __goscriptTuple3[0]
	await $.println("read after seek:", $.bytesToString($.goSlice(b, undefined, n)))
	let __goscriptTuple4: any = await (sk !== null && (sk as any).__isVarRef !== true && (sk as any).__goValue === undefined ? (sk as Exclude<io.Seeker, null>) : $.pointerValue<Exclude<io.Seeker, null>>(sk)).Seek(0n, 0)
	pos = __goscriptTuple4[0]
	let __goscriptTuple5: any = await (sk !== null && (sk as any).__isVarRef !== true && (sk as any).__goValue === undefined ? (sk as Exclude<io.Seeker, null>) : $.pointerValue<Exclude<io.Seeker, null>>(sk)).Seek(6n, 1)
	pos = __goscriptTuple5[0]
	await $.println("seek current:", pos)
	let __goscriptTuple6: any = await (sk !== null && (sk as any).__isVarRef !== true && (sk as any).__goValue === undefined ? (sk as Exclude<io.Seeker, null>) : $.pointerValue<Exclude<io.Seeker, null>>(sk)).Seek(-1n, 0)
	err = __goscriptTuple6[1]
	await $.println("seek invalid:", err != null)

	// A directory does not.
	let [d, ] = $.markAsStructValue($.cloneStructValue(files)).Open(".")
	let [, dirReaderAt] = $.typeAssertTuple<io.ReaderAt | null>(d, "io.ReaderAt")
	await $.println("dir readerat:", dirReaderAt)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

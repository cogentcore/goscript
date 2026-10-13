// Generated file based on os_openfile_flags.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as os from "@goscript/os/index.js"

import * as filepath from "@goscript/path/filepath/index.js"

import type * as fs from "@goscript/io/fs/index.js"
import "@goscript/os/index.js"
import "@goscript/path/filepath/index.js"

export async function write(name: string, flag: number, data: string): globalThis.Promise<void> {
	let __goscriptTuple0: any = os.OpenFile(name, flag, 0o644)
	let f: os.File | $.VarRef<os.File> | null = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("open error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
		return
	}
	os.File.prototype.WriteString.call($.pointerValue<os.File>(f), data)
	os.File.prototype.Close.call($.pointerValue<os.File>(f))
}

export async function read(name: string): globalThis.Promise<string> {
	let __goscriptTuple1: any = os.ReadFile(name)
	let b: $.Slice<number> = __goscriptTuple1[0]
	let err = __goscriptTuple1[1]
	if (err != null) {
		return "read error: " + await $.pointerValue<Exclude<$.GoError, null>>(err).Error()
	}
	return $.bytesToString(b)
}

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let [dir, err] = os.MkdirTemp("", "openflags")
	if (err != null) {
		await $.println("mkdirtemp error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
		return
	}
	__defer.defer(() => { os.RemoveAll(dir) })
	let name = filepath.Join(dir, "f.txt")

	// Create truncates an existing file.
	os.WriteFile(name, new Uint8Array([97, 32, 109, 117, 99, 104, 32, 108, 111, 110, 103, 101, 114, 32, 102, 105, 114, 115, 116, 32, 108, 105, 110, 101]), 0o644)
	let __goscriptTuple2: any = os.Create(name)
	let f: os.File | $.VarRef<os.File> | null = __goscriptTuple2[0]
	os.File.prototype.WriteString.call($.pointerValue<os.File>(f), "short")
	os.File.prototype.Close.call($.pointerValue<os.File>(f))
	await $.println(await read(name))

	// WriteFile also truncates.
	os.WriteFile(name, new Uint8Array([120]), 0o644)
	await $.println(await read(name))

	// O_APPEND adds to the end.
	await write(name, 1025, "yz")
	await $.println(await read(name))

	// O_TRUNC without O_CREATE truncates an existing file.
	await write(name, 513, "t")
	await $.println(await read(name))

	// O_EXCL with O_CREATE fails for an existing file.
	let __goscriptTuple3: any = os.OpenFile(name, 193, 0o644)
	err = __goscriptTuple3[1]
	await $.println(err != null, os.IsExist($.pointerValueOrNil(err)!))
}

if ($.isMainScript(import.meta)) {
	await main()
}

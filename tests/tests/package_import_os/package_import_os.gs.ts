// Generated file based on package_import_os.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as os from "@goscript/os/index.js"
import * as fs from "@goscript/io/fs/index.js"
import "@goscript/io/fs/index.js"

export async function main(): globalThis.Promise<void> {
	{
		let [wd, err] = os.Getwd()
		if (err == null) {
			if (!$.stringEqual(wd, "")) {
				await $.println("Current working directory ok")
			}
		} else {
			await $.println("Error getting working directory:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}

	// Test Environment variables - these work
	os.Setenv("TEST_VAR", "test_value")
	await $.println("Set environment variable TEST_VAR")

	{
		let val = os.Getenv("TEST_VAR")
		if (!$.stringEqual(val, "")) {
			await $.println("Got environment variable TEST_VAR:", val)
		}
	}

	os.Unsetenv("TEST_VAR")
	{
		let val = os.Getenv("TEST_VAR")
		if ($.stringEqual(val, "")) {
			await $.println("Environment variable TEST_VAR unset successfully")
		}
	}

	// Test Hostname - works with mock data
	{
		let [hostname, err] = os.Hostname()
		if (err == null) {
			await $.println("Hostname:", hostname)
		} else {
			await $.println("Error getting hostname:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}

	let [n, err] = await os.File.prototype.Write.call($.pointerValue<os.File>(os.Stdout), new Uint8Array([115, 116, 100, 111, 117, 116, 32, 119, 114, 105, 116, 101, 32, 119, 111, 114, 107, 115, 10]))
	if (err == null) {
		await $.println("Stdout write bytes:", n)
	} else {
		await $.println("Stdout write error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	let fileName = "os-runtime-file.txt"
	let writeErr = await os.WriteFile(fileName, new Uint8Array([114, 117, 110, 116, 105, 109, 101, 32, 102, 105, 108, 101, 32, 99, 111, 110, 116, 101, 110, 116, 115]), 0o644)
	if (writeErr == null) {
		await $.println("WriteFile ok")
	} else {
		await $.println("WriteFile error:", (__goscriptAwait = (writeErr !== null && (writeErr as any).__isVarRef !== true && (writeErr as any).__goValue === undefined ? (writeErr as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(writeErr)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	{
		let __goscriptTuple0: any = await os.ReadFile(fileName)
		let data: $.Slice<number> = __goscriptTuple0[0]
		let readErr = __goscriptTuple0[1]
		if (readErr == null) {
			await $.println("ReadFile data:", $.bytesToString(data))
		} else {
			await $.println("ReadFile error:", (__goscriptAwait = (readErr !== null && (readErr as any).__isVarRef !== true && (readErr as any).__goValue === undefined ? (readErr as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(readErr)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}

	{
		let [info, statErr] = await os.Stat(fileName)
		if (statErr == null) {
			await $.println("Stat name:", (__goscriptAwait = (info !== null && (info as any).__isVarRef !== true && (info as any).__goValue === undefined ? (info as Exclude<fs.FileInfo, null>) : $.pointerValue<Exclude<fs.FileInfo, null>>(info)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			await $.println("Stat size:", (__goscriptAwait = (info !== null && (info as any).__isVarRef !== true && (info as any).__goValue === undefined ? (info as Exclude<fs.FileInfo, null>) : $.pointerValue<Exclude<fs.FileInfo, null>>(info)).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		} else {
			await $.println("Stat error:", (__goscriptAwait = (statErr !== null && (statErr as any).__isVarRef !== true && (statErr as any).__goValue === undefined ? (statErr as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(statErr)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}

	let removeErr = await os.Remove(fileName)
	if (removeErr == null) {
		await $.println("Remove ok")
	} else {
		await $.println("Remove error:", (__goscriptAwait = (removeErr !== null && (removeErr as any).__isVarRef !== true && (removeErr as any).__goValue === undefined ? (removeErr as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(removeErr)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	{
		let [tempDir, __goscriptShadow0] = await os.MkdirTemp("", "os-temp-dir-*")
		if (__goscriptShadow0 == null) {
			await $.println("MkdirTemp ok")
			await os.RemoveAll(tempDir)
		} else {
			await $.println("MkdirTemp error:", (__goscriptAwait = (__goscriptShadow0 !== null && (__goscriptShadow0 as any).__isVarRef !== true && (__goscriptShadow0 as any).__goValue === undefined ? (__goscriptShadow0 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow0)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}

	{
		let __goscriptTuple1: any = await os.CreateTemp("", "os-temp-file-*")
		let tempFile: os.File | $.VarRef<os.File> | null = __goscriptTuple1[0]
		let __goscriptShadow1 = __goscriptTuple1[1]
		if (__goscriptShadow1 == null) {
			await $.println("CreateTemp ok")
			await $.println("CreateTemp name empty:", $.stringEqual(os.File.prototype.Name.call($.pointerValue<os.File>(tempFile)), ""))
			await os.File.prototype.Close.call($.pointerValue<os.File>(tempFile))
			await os.Remove(os.File.prototype.Name.call($.pointerValue<os.File>(tempFile)))
		} else {
			await $.println("CreateTemp error:", (__goscriptAwait = (__goscriptShadow1 !== null && (__goscriptShadow1 as any).__isVarRef !== true && (__goscriptShadow1 as any).__goValue === undefined ? (__goscriptShadow1 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow1)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on import_inferred_external_type_func_lit.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as os from "@goscript/os/index.js"
import * as fs from "@goscript/io/fs/index.js"
import "@goscript/io/fs/index.js"

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let fileName = "external-type-func-lit.txt"
	{
		let err = await os.WriteFile(fileName, new Uint8Array([99, 111, 110, 116, 101, 110, 116, 115]), 0o644)
		if (err != null) {
			await $.println("write error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	const __goscriptDeferArg0 = fileName
	__defer.defer(async () => { await os.Remove(__goscriptDeferArg0) })

	await (async () => {
		let [info, err] = await os.Stat(fileName)
		if (err != null) {
			await $.println("stat error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
		if (false) {
			await $.println("size:", (__goscriptAwait = (info !== null && (info as any).__isVarRef !== true && (info as any).__goValue === undefined ? (info as Exclude<fs.FileInfo, null>) : $.pointerValue<Exclude<fs.FileInfo, null>>(info)).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		} else {
			await $.println("stat closure ok")
		}
	})()
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

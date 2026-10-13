// Generated file based on package_import_runtime_lock_os_thread.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as runtime from "@goscript/runtime/index.js"
import "@goscript/runtime/index.js"

function __goscriptInit0(): void {
	// Graphics and windowing code locks the main goroutine to the main
	// thread in init.
	runtime.LockOSThread()
}

export async function main(): globalThis.Promise<void> {
	let done: $.Channel<boolean> | null = $.makeChannel<boolean>(0, false, "both")
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		await using __defer = new $.AsyncDisposableStack()
		runtime.LockOSThread()
		__defer.defer(() => { runtime.UnlockOSThread() })
		await $.println("locked goroutine ran")
		await $.chanSend(done, true)
	})() })
	await $.chanRecv(done)
	runtime.UnlockOSThread()
	await $.println("main unlocked")
}

__goscriptInit0()

if ($.isMainScript(import.meta)) {
	await main()
}

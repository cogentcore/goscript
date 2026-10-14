// Generated file based on package_import_csync.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as context from "@goscript/context/index.js"

import * as sync from "@goscript/sync/index.js"

import * as time from "@goscript/time/index.js"

import * as csync from "@goscript/github.com/aperturerobotics/util/csync/index.js"
import "@goscript/context/index.js"
import "@goscript/sync/index.js"
import "@goscript/time/index.js"
import "@goscript/github.com/aperturerobotics/util/csync/index.js"

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let mtx: $.VarRef<csync.Mutex> = $.varRef($.markAsStructValue(new csync.Mutex()))
	let counter: number = 0
	let wg: $.VarRef<sync.WaitGroup> = $.varRef($.markAsStructValue(new sync.WaitGroup()))

	let [ctx, cancel] = context.WithTimeout($.pointerValueOrNil(context.Background())!, 5000000000n)
	const __goscriptDeferCallee0 = cancel
	__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee0!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })

	// Number of goroutines to spawn
	let numWorkers = 5
	wg.value.Add(numWorkers)

	// Function that will be run by each worker
	let worker: ((id: number) => void) | null = $.functionValue(async (id: number): globalThis.Promise<void> => {
		await using __defer = new $.AsyncDisposableStack()
		__defer.defer(() => { wg.value.Done() })

		// Try to acquire the lock
		let [relLock, err] = await mtx.value.Lock(ctx)
		if (err != null) {
			await $.println("worker", id, "failed to acquire lock:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
		const __goscriptDeferCallee1 = relLock
		__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee1!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })

		// Critical section
		// println("worker", id, "entered critical section") - non-deterministic, leave commented out
		let current: number = counter
		await time.Sleep(100000000n)
		counter = current + 1
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo))

	// Start worker goroutines
	for (let __goscriptRangeCount0 = numWorkers, i = 0; i < __goscriptRangeCount0; i++) {
		const __goscriptDeferCallee2 = worker
		const __goscriptDeferArg0 = i
		queueMicrotask(async () => { (__goscriptAwait = __goscriptDeferCallee2!(__goscriptDeferArg0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })
	}

	// Wait for all workers to complete or context timeout
	let done: $.Channel<{}> | null = $.makeChannel<{}>(0, {}, "both")
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		await wg.value.Wait()
		done!.close()
	})() })

	const [__goscriptSelect0HasReturn, __goscriptSelect0Value] = await $.selectStatement<any, void>([
		{
			id: 0,
			isSend: false,
			channel: done,
			onSelected: async (__goscriptSelect0Result) => {
				await $.println("All workers completed successfully")
			}
		},
		{
			id: 1,
			isSend: false,
			channel: (__goscriptAwait = $.pointerValue<Exclude<context.Context, null>>(ctx).Done(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait),
			onSelected: async (__goscriptSelect0Result) => {
				await $.println("Test timed out:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>((__goscriptAwait = $.pointerValue<Exclude<context.Context, null>>(ctx).Err(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			}
		}
	], false)
	if (__goscriptSelect0HasReturn) {
		return __goscriptSelect0Value
	}

	await $.println("Final counter value:", counter)
	if (counter != numWorkers) {
		$.panic("counter does not match expected value")
	}

	await $.println("success: csync.Mutex test completed")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as context from "@goscript/context/index.js"

import * as strconv from "@goscript/strconv/index.js"

import * as sync from "@goscript/sync/index.js"

import * as conc from "@goscript/github.com/aperturerobotics/util/conc/index.js"
import "@goscript/context/index.js"
import "@goscript/strconv/index.js"
import "@goscript/sync/index.js"
import "@goscript/github.com/aperturerobotics/util/conc/index.js"

export async function main(): globalThis.Promise<void> {
	let release: $.Channel<{}> | null = $.makeChannel<{}>(0, {}, "both")

	let mu: $.VarRef<sync.Mutex> = $.varRef($.markAsStructValue(new sync.Mutex()))
	let count = 0
	let sum = 0

	let makeJob: ((idx: number) => (() => void) | null | globalThis.Promise<(() => void) | null>) | null = $.functionValue(async (idx: number): globalThis.Promise<(() => void) | null> => {
		return $.functionValue(async (): globalThis.Promise<void> => {
			await $.chanRecv(release)
			await mu.value.Lock()
			count++
			sum = sum + (idx)
			mu.value.Unlock()
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)] } as $.FunctionTypeInfo))

	let q: conc.ConcurrentQueue | $.VarRef<conc.ConcurrentQueue> | null = await conc.NewConcurrentQueue(2, $.arrayToSlice<(() => void) | null>([(__goscriptAwait = makeJob!(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = makeJob!(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)]))
	let [queued, running] = await conc.ConcurrentQueue.prototype.Enqueue.call(q, $.arrayToSlice<(() => void) | null>([(__goscriptAwait = makeJob!(2), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = makeJob!(3), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = makeJob!(4), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)]))
	await $.println($.concatString(($.concatString(($.concatString("queued=", strconv.Itoa(queued))), " running=")), strconv.Itoa(running)))

	release!.close()

	{
		let err = await conc.ConcurrentQueue.prototype.WaitIdle.call(q, context.Background(), null)
		if (err != null) {
			await $.println($.concatString("WaitIdle error: ", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
			return
		}
	}

	await $.println($.concatString(($.concatString(($.concatString("completed=", strconv.Itoa(count))), " sum=")), strconv.Itoa(sum)))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

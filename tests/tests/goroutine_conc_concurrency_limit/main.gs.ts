// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as context from "@goscript/context/index.js"
import * as strconv from "@goscript/strconv/index.js"
import * as sync from "@goscript/sync/index.js"
import * as conc from "@goscript/github.com/aperturerobotics/util/conc/index.js"

export async function main(): globalThis.Promise<void> {
	let release = $.makeChannel<{}>(0, {}, "both")

	let mu = $.varRef($.markAsStructValue(new sync.Mutex()))
	let count = 0
	let sum = 0

	let makeJob = $.functionValue((idx: number): (() => void) | null => {
		return $.functionValue(async () => {
			await $.chanRecv(release)
			await mu.value.Lock()
			count++
			sum += idx
			mu.value.Unlock()
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)] } as $.FunctionTypeInfo))

	let q = await conc.NewConcurrentQueue(2, $.arrayToSlice<(() => void) | null>([makeJob(0), makeJob(1)]))
	let [queued, running] = await (q !== null && (q as any).__isVarRef !== true && (q as any).__goValue === undefined ? ((q as any) as conc.ConcurrentQueue).Enqueue($.arrayToSlice<(() => void) | null>([makeJob(2), makeJob(3), makeJob(4)])) : conc.ConcurrentQueue.prototype.Enqueue.call(q, $.arrayToSlice<(() => void) | null>([makeJob(2), makeJob(3), makeJob(4)])))
	await $.println("queued=" + strconv.Itoa(queued) + " running=" + strconv.Itoa(running))

	release.close()

	{
		let err = await (q !== null && (q as any).__isVarRef !== true && (q as any).__goValue === undefined ? ((q as any) as conc.ConcurrentQueue).WaitIdle(context.Background(), null) : conc.ConcurrentQueue.prototype.WaitIdle.call(q, context.Background(), null))
		if (err != null) {
			await $.println("WaitIdle error: " + (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}

	await $.println("completed=" + strconv.Itoa(count) + " sum=" + strconv.Itoa(sum))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

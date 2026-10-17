// Generated file based on os_signal_notify.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as context from "@goscript/context/index.js"
import * as os from "@goscript/os/index.js"
import * as signal from "@goscript/os/signal/index.js"
import * as time from "@goscript/time/index.js"
import "@goscript/os/index.js"

export async function main(): globalThis.Promise<void> {
	// A channel registered for signals receives none, and the program keeps
	// running timers.
	let c = $.makeChannel<os.Signal | null>(1, null! as os.Signal | null, "both")
	await signal.Notify(c, $.arrayToSlice<os.Signal | null>([os.Interrupt]))
	const [__goscriptSelect0HasReturn, __goscriptSelect0Value] = await $.selectStatement<any, void>([
		{
			id: 0,
			isSend: false,
			channel: c,
			onSelected: async (__goscriptSelect0Result) => {
				await $.println("signal")
			}
		},
		{
			id: 1,
			isSend: false,
			channel: time.After(10000000n),
			onSelected: async (__goscriptSelect0Result) => {
				await $.println("no signal")
			}
		}
	], false)
	if (__goscriptSelect0HasReturn) {
		return __goscriptSelect0Value
	}
	await signal.Stop(c)
	await signal.Reset($.arrayToSlice<os.Signal | null>([os.Interrupt]))
	await $.println("ignored:", signal.Ignored(os.Interrupt))

	// The context of NotifyContext is done when it is stopped.
	let [ctx, stop] = await signal.NotifyContext(context.Background(), $.arrayToSlice<os.Signal | null>([os.Interrupt]))
	await $.println("before stop:", (__goscriptAwait = (ctx !== null && (ctx as any).__isVarRef !== true && ((ctx as any).__goValue === undefined || (ctx as any).__goType?.charCodeAt(0) !== 42) ? (ctx as Exclude<context.Context, null>) : $.pointerValue<Exclude<context.Context, null>>(ctx)).Err(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == null)
	void (__goscriptAwait = stop!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.chanRecv(((__goscriptAwait = (ctx !== null && (ctx as any).__isVarRef !== true && ((ctx as any).__goValue === undefined || (ctx as any).__goType?.charCodeAt(0) !== 42) ? (ctx as Exclude<context.Context, null>) : $.pointerValue<Exclude<context.Context, null>>(ctx)).Done(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as $.Channel<{}> | null))
	await $.println("after stop:", $.comparableEqual((__goscriptAwait = (ctx !== null && (ctx as any).__isVarRef !== true && ((ctx as any).__goValue === undefined || (ctx as any).__goType?.charCodeAt(0) !== 42) ? (ctx as Exclude<context.Context, null>) : $.pointerValue<Exclude<context.Context, null>>(ctx)).Err(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), context.Canceled))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

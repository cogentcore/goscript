// Generated file based on return_async_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as context from "@goscript/context/index.js"
import * as time from "@goscript/time/index.js"

export async function AsyncFunction(): globalThis.Promise<string> {
	await time.Sleep(10000000n)
	return "result"
}

export async function SyncWrapper(): globalThis.Promise<string> {
	return AsyncFunction()
}

export async function AnotherAsyncFunction(ctx: context.Context | null): globalThis.Promise<[string, $.GoError]> {
	await time.Sleep(5000000n)
	return ["async result", null]
}

export async function WrapperWithError(ctx: context.Context | null): globalThis.Promise<[string, $.GoError]> {
	return AnotherAsyncFunction(ctx)
}

export async function main(): globalThis.Promise<void> {
	// These calls should work properly with async/await
	let result1 = await SyncWrapper()
	await $.println("Result1:", result1)

	let ctx = context.Background()
	let [result2, err] = await WrapperWithError(ctx)
	if (err != null) {
		await $.println("Error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("Result2:", result2)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

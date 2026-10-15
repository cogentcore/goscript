// Generated file based on interface_copied_method_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type runner = {
	Run(): void
}

$.registerInterfaceType(
	"main.runner",
	null,
	[{ name: "Run", args: [], returns: [] }]
);

export class task {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): task {
		return new task(true)
	}

	public __goscriptAssign(source: task): this {
		return this
	}

	public async Run(): globalThis.Promise<void> {
		await $.println("run")
	}

	static __typeInfo = $.registerStructType(
		"main.task",
		() => new task(),
		() => [{ name: "Run", args: [], returns: [] }],
		task,
		() => []
	)
}

export async function callCopied(r: runner | null): globalThis.Promise<void> {
	let curr: runner | null = null! as runner | null
	void (() => {
		curr = r
	})()
	void (__goscriptAwait = (curr !== null && (curr as any).__isVarRef !== true && ((curr as any).__goValue === undefined || (curr as any).__goType?.charCodeAt(0) !== 42) ? (curr as Exclude<runner, null>) : $.pointerValue<Exclude<runner, null>>(curr)).Run(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

export async function main(): globalThis.Promise<void> {
	await callCopied($.interfaceValue<runner | null>(new task(true), "main.task", "main.task"))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

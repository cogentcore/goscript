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
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): task {
		return $.markAsStructValue(new task(this))
	}

	public __goscriptAssign(source: task): void {
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
	void ((): void => {
		curr = r
	})()
	void (__goscriptAwait = $.pointerValue<Exclude<runner, null>>(curr).Run(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

export async function main(): globalThis.Promise<void> {
	await callCopied($.interfaceValue<runner | null>($.markAsStructValue(new task()), "main.task", "main.task"))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

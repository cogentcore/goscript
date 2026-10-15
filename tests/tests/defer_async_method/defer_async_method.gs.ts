// Generated file based on defer_async_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class AsyncResource {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): AsyncResource {
		return new AsyncResource(this, true)
	}

	public __goscriptAssign(source: AsyncResource): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
	}

	public async Release(): globalThis.Promise<void> {
		const r: AsyncResource | $.VarRef<AsyncResource> | null = this;
		let ch: $.Channel<boolean> | null = $.makeChannel<boolean>(1, false, "both")
		queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
			await $.chanSend(ch, true)
		})() })
		await $.chanRecv(ch)
		await $.println("Released", $.pointerValue<AsyncResource>(r).name)
	}

	static __typeInfo = $.registerStructType(
		"main.AsyncResource",
		() => new AsyncResource(),
		() => [{ name: "Release", args: [], returns: [], pointerReceiver: true }],
		AsyncResource,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let res: AsyncResource | $.VarRef<AsyncResource> | null = new AsyncResource({name: "test"})
	__defer.defer(async () => { await (res !== null && (res as any).__isVarRef !== true && (res as any).__goValue === undefined ? ((res as any) as AsyncResource).Release() : AsyncResource.prototype.Release.call(res)) })
	await $.println("main function")
}

if ($.isMainScript(import.meta)) {
	await main()
}

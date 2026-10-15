// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as visit from "@goscript/github.com/s4wave/goscript/tests/tests/interface_whole_program_package/visit/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/interface_whole_program_package/visit/index.js"

export class doubler {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): doubler {
		return new doubler(this, true)
	}

	public __goscriptAssign(source: doubler): void {
	}

	public Visit(n: number): number {
		return n * 2
	}

	static __typeInfo = $.registerStructType(
		"main.doubler",
		() => new doubler(),
		() => [{ name: "Visit", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		doubler,
		() => []
	)
}

export class chanFetcher {
	public get ch(): $.Channel<number> | null {
		return this._fields.ch
	}

	public set ch(value: $.Channel<number> | null) {
		this._fields.ch = value
	}

	public _fields: {
		ch: $.Channel<number> | null
	}

	constructor(init?: Partial<{ch?: $.Channel<number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			ch: init?.ch ?? (null! as $.Channel<number> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): chanFetcher {
		return new chanFetcher(this, true)
	}

	public __goscriptAssign(source: chanFetcher): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
	}

	public async Fetch(): globalThis.Promise<number> {
		const c: chanFetcher | $.VarRef<chanFetcher> | null = this;
		const c$: chanFetcher = c == null ? $.pointerTarget<chanFetcher>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<chanFetcher>(c)
		await $.chanSend((c$ as chanFetcher).ch, 21)
		return await $.chanRecv((c$ as chanFetcher).ch)
	}

	static __typeInfo = $.registerStructType(
		"main.chanFetcher",
		() => new chanFetcher(),
		() => [{ name: "Fetch", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		chanFetcher,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export async function main(): globalThis.Promise<void> {
	await $.println("walk:", visit.Walk($.interfaceValue<visit.Visitor | null>(new doubler(undefined, true), "main.doubler", "main.doubler"), $.arrayToSlice<number>([1, 2, 3])))
	await $.println("fetch:", await visit.Fetch($.interfaceValue<visit.Fetcher | null>(new chanFetcher({ch: $.makeChannel<number>(1, 0, "both")}), "*main.chanFetcher", /* @__PURE__ */ $.pointerType("main.chanFetcher"))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on variable_shadowing_scope.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type named = {
	Name(): string
}

$.registerInterfaceType(
	"main.named",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class item {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): item {
		return new item(true)
	}

	public __goscriptAssign(source: item): this {
		return this
	}

	public Name(): string {
		return "item"
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		item,
		() => []
	)
}

export function firstFunc(): [string, number] {
	return ["", 42]
}

export async function secondFunc(x: number): globalThis.Promise<number> {
	if (x != 0) {
		await $.println("Got value:", x)
		return 0
	}
	return 99
}

export async function describe(value: any): globalThis.Promise<void> {
	let __goscriptShadow0 = value
	{
		let __goscriptTuple0: any = $.typeAssertTuple<named | null>(__goscriptShadow0, "main.named")
		let __goscriptShadow1: named | null = __goscriptTuple0[0]
		let ok: boolean = __goscriptTuple0[1]
		if (ok) {
			await $.println("Shadowed name:", (__goscriptAwait = (__goscriptShadow1 !== null && (__goscriptShadow1 as any).__isVarRef !== true && ((__goscriptShadow1 as any).__goValue === undefined || (__goscriptShadow1 as any).__goType?.charCodeAt(0) !== 42) ? (__goscriptShadow1 as Exclude<named, null>) : $.pointerValue<Exclude<named, null>>(__goscriptShadow1)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			return
		}
	}
	await $.println("Shadowed name: missing")
}

export async function main(): globalThis.Promise<void> {
	let [, x] = firstFunc()
	// This is the problematic pattern: x is shadowed but also used in the call
	let __goscriptShadow2 = x
	{
		let __goscriptShadow3 = await secondFunc(__goscriptShadow2)
		if (__goscriptShadow3 != 0) {
			await $.println("Function returned value")
			return
		}
	}
	await $.println("Completed successfully")
	await describe($.structInterfaceValue(new item(true), "main.item", "main.item"))
	await describe("nope")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

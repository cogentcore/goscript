// Generated file based on short_decl_type_assert_type_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type dumper = {
	Dump(): string
}

$.registerInterfaceType(
	"main.dumper",
	null,
	[{ name: "Dump", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class item {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(true)
	}

	public __goscriptAssign(source: item): this {
		return this
	}

	public Dump(): string {
		return "ok"
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "Dump", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		item,
		() => []
	)
}

export function use(v: any): string {
	let __goscriptTuple0: any = $.typeAssertTuple<dumper | null>(v, "main.dumper")
	let __goscriptShadow0: dumper | null = __goscriptTuple0[0]
	let ok: boolean = __goscriptTuple0[1]
	if (!ok) {
		return "bad"
	}
	return (__goscriptShadow0 !== null && (__goscriptShadow0 as any).__isVarRef !== true && ((__goscriptShadow0 as any).__goValue === undefined || (__goscriptShadow0 as any).__goType?.charCodeAt(0) !== 42) ? (__goscriptShadow0 as Exclude<dumper, null>) : $.pointerValue<Exclude<dumper, null>>(__goscriptShadow0)).Dump()
}

export async function main(): globalThis.Promise<void> {
	await $.println(use($.structInterfaceValue(new item(true), "main.item", "main.item")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

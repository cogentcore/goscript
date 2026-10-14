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
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): void {
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

export async function use(v: any): globalThis.Promise<string> {
	let __goscriptTuple0: any = $.typeAssertTuple<dumper | null>(v, "main.dumper")
	let __goscriptShadow0 = __goscriptTuple0[0]
	let ok = __goscriptTuple0[1]
	if (!ok) {
		return "bad"
	}
	return $.pointerValue<Exclude<dumper, null>>(__goscriptShadow0).Dump()
}

export async function main(): globalThis.Promise<void> {
	await $.println(await use($.interfaceValue(new item(undefined, true), "main.item", "main.item")))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

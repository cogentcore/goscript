// Generated file based on method_receiver_reassign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class item {
	public declare n: number

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): this {
		this.n = source.n
		return this
	}

	public dec(): item {
		let s: item = this;
		if (s.n > 0) {
			s = s.__goscriptAssign(new item({n: s.n - 1}, true))
		}
		return (s).clone()
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "dec", args: [], returns: [{ type: "main.item" }] }],
		item,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let original = new item({n: 2}, true)
	let out = $.markAsStructValue($.cloneStructValue(original)).dec()
	await $.println("original:", original.n)
	await $.println("out:", out.n)
}

if ($.isMainScript(import.meta)) {
	await main()
}

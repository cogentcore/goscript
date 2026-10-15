// Generated file based on typed_nil_pointer_conversion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class node {
	public declare next: node | $.VarRef<node> | null

	constructor(__goscriptValue?: boolean, next$?: node | $.VarRef<node> | null) {
		this.next = next$ ?? (null! as node | $.VarRef<node> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): node {
		return new node(true, this.next)
	}

	public __goscriptAssign(source: node): this {
		this.next = source.next
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.node",
		() => new node(),
		() => [],
		node,
		() => [{ name: "next", key: "next", type: /* @__PURE__ */ $.pointerType("main.node") }]
	)
}

export function clone(n: node | $.VarRef<node> | null): node | $.VarRef<node> | null {
	if (n == null) {
		return null
	}
	return new node(false, $.pointerValue<node>(n).next)
}

export async function main(): globalThis.Promise<void> {
	let n: node | $.VarRef<node> | null = null! as node | $.VarRef<node> | null
	let cloned = clone(n)
	await $.println(cloned == null)

	let boxed: any = $.interfaceValue(null, "*main.node", /* @__PURE__ */ $.pointerType("main.node"))
	let [, ok] = $.typeAssertTuple<node | $.VarRef<node> | null>(boxed, /* @__PURE__ */ $.pointerType("main.node"))
	await $.println(boxed == null, ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}

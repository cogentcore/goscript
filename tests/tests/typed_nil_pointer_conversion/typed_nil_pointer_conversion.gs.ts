// Generated file based on typed_nil_pointer_conversion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class node {
	public get next(): node | $.VarRef<node> | null {
		return this._fields.next
	}

	public set next(value: node | $.VarRef<node> | null) {
		this._fields.next = value
	}

	public _fields: {
		next: node | $.VarRef<node> | null
	}

	constructor(init?: Partial<{next?: node | $.VarRef<node> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			next: init?.next ?? (null! as node | $.VarRef<node> | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): node {
		return new node(this, true)
	}

	public __goscriptAssign(source: node): void {
		const target = this._fields
		const values = source._fields
		target.next = values.next
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
	return new node({next: $.pointerValue<node>(n).next})
}

export async function main(): globalThis.Promise<void> {
	let n: node | $.VarRef<node> | null = null! as node | $.VarRef<node> | null
	let cloned: node | $.VarRef<node> | null = clone(n)
	await $.println(cloned == null)

	let boxed: any = $.interfaceValue(null, "*main.node", /* @__PURE__ */ $.pointerType("main.node"))
	let [, ok] = $.typeAssertTuple<node | $.VarRef<node> | null>(boxed, /* @__PURE__ */ $.pointerType("main.node"))
	await $.println(boxed == null, ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}

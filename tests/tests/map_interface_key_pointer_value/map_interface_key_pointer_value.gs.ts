// Generated file based on map_interface_key_pointer_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Node = {
	Key(): string
}

$.registerInterfaceType(
	"main.Node",
	null,
	[{ name: "Key", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Table {
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Table {
		return new Table(true, this.name)
	}

	public __goscriptAssign(source: Table): this {
		this.name = source.name
		return this
	}

	public Key(): string {
		const t: Table | $.VarRef<Table> | null = this;
		return $.pointerValue<Table>(t).name
	}

	static __typeInfo = $.registerStructType(
		"main.Table",
		() => new Table(),
		() => [{ name: "Key", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Table,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let node: Node | null = $.interfaceValue<Node | null>(new Table(false, "users"), "*main.Table", /* @__PURE__ */ $.pointerType("main.Table"))
	let seen = $.makeMap<Node | null, boolean>([[node, true]])
	{
		let __goscriptTuple0: any = $.typeAssertTuple<Table | $.VarRef<Table> | null>(node, /* @__PURE__ */ $.pointerType("main.Table"))
		let table: Table | $.VarRef<Table> | null = __goscriptTuple0[0]
		let ok = __goscriptTuple0[1]
		if (ok) {
			let [value, found] = $.mapGet<Node | null, boolean, boolean>(seen, $.interfaceValue<Node | null>(table, "*main.Table", /* @__PURE__ */ $.pointerType("main.Table")), false)
			await $.println(value, found)
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

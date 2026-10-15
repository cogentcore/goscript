// Generated file based on map_interface_pointer_keys.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type namer = {
	name(): string
}

$.registerInterfaceType(
	"main.namer",
	null,
	[{ name: "name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class node {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public _fields: {
		Name: string
		N: number
	}

	constructor(init?: Partial<{Name?: string, N?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			N: init?.N ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): node {
		return new node(this, true)
	}

	public __goscriptAssign(source: node): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.N = values.N
	}

	public name(): string {
		const n: node | $.VarRef<node> | null = this;
		return $.pointerValue<node>(n).Name
	}

	static __typeInfo = $.registerStructType(
		"main.node",
		() => new node(),
		() => [{ name: "name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		node,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class tree {
	public get Kids(): $.Slice<tree | $.VarRef<tree> | null> {
		return this._fields.Kids
	}

	public set Kids(value: $.Slice<tree | $.VarRef<tree> | null>) {
		this._fields.Kids = value
	}

	public get Attrs(): globalThis.Map<string, string> | null {
		return this._fields.Attrs
	}

	public set Attrs(value: globalThis.Map<string, string> | null) {
		this._fields.Attrs = value
	}

	public get Up(): tree | $.VarRef<tree> | null {
		return this._fields.Up
	}

	public set Up(value: tree | $.VarRef<tree> | null) {
		this._fields.Up = value
	}

	public _fields: {
		Kids: $.Slice<tree | $.VarRef<tree> | null>
		Attrs: globalThis.Map<string, string> | null
		Up: tree | $.VarRef<tree> | null
	}

	constructor(init?: Partial<{Kids?: $.Slice<tree | $.VarRef<tree> | null>, Attrs?: globalThis.Map<string, string> | null, Up?: tree | $.VarRef<tree> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Kids: init?.Kids ?? (null! as $.Slice<tree | $.VarRef<tree> | null>),
			Attrs: init?.Attrs ?? (null! as globalThis.Map<string, string> | null),
			Up: init?.Up ?? (null! as tree | $.VarRef<tree> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): tree {
		return new tree(this, true)
	}

	public __goscriptAssign(source: tree): void {
		const target = this._fields
		const values = source._fields
		target.Kids = values.Kids
		target.Attrs = values.Attrs
		target.Up = values.Up
	}

	static __typeInfo = $.registerStructType(
		"main.tree",
		() => new tree(),
		() => [],
		tree,
		() => [{ name: "Kids", key: "Kids", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.tree")) }, { name: "Attrs", key: "Attrs", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string")) }, { name: "Up", key: "Up", type: /* @__PURE__ */ $.pointerType("main.tree") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Distinct pointers with equal fields are distinct keys.
	let a = new node({Name: "x", N: 1})
	let b = new node({Name: "x", N: 1})
	let m = $.makeMap<any, number>([])
	$.mapSet(m, $.interfaceValue(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 1)
	$.mapSet(m, $.interfaceValue(b, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 2)
	await $.println("any keys:", $.len(m), $.mapGet<any, number, number>(m, $.interfaceValue(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)[0], $.mapGet<any, number, number>(m, $.interfaceValue(b, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)[0])

	// The same holds for keys of a non-empty interface type.
	let n = $.makeMap<namer | null, number>([])
	$.mapSet(n, $.interfaceValue<namer | null>(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 1)
	$.mapSet(n, $.interfaceValue<namer | null>(b, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 2)
	const __goscriptMap0 = n
	const __goscriptMapKey0 = $.interfaceValue<namer | null>(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node"))
	$.mapSet(__goscriptMap0, __goscriptMapKey0, $.mapGet<namer | null, number, number>(__goscriptMap0, $.interfaceValue<namer | null>(__goscriptMapKey0, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)[0] + (1))
	await $.println("namer keys:", $.len(n), $.mapGet<namer | null, number, number>(n, $.interfaceValue<namer | null>(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)[0], $.mapGet<namer | null, number, number>(n, $.interfaceValue<namer | null>(b, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)[0])
	$.deleteMapEntry(n, $.interfaceValue<namer | null>(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node")))
	let [, okA] = $.mapGet<namer | null, number, number>(n, $.interfaceValue<namer | null>(a, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)
	let [, okB] = $.mapGet<namer | null, number, number>(n, $.interfaceValue<namer | null>(b, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)
	await $.println("after delete:", $.len(n), okA, okB)

	// Pointers to structs with fields of every kind, as in a traversal map.
	let root = new tree()
	let root$: tree = root == null ? $.pointerTarget<tree>(root) : (root as any).__isVarRef === true ? (root as any).value : (root as any).__goValue === undefined ? (root as any) : $.pointerTarget<tree>(root)
	let visits = $.makeMap<any, number>([])
	for (let i = 0; i < 1000; i++) {
		let kid = new tree({Up: root});
		;(root$ as tree).Kids = $.appendOne((root$ as tree).Kids, kid, $.appendZeros.nil)
		$.mapSet(visits, $.interfaceValue(kid, "*main.tree", /* @__PURE__ */ $.pointerType("main.tree")), i)
	}
	$.mapSet(visits, $.interfaceValue(root, "*main.tree", /* @__PURE__ */ $.pointerType("main.tree")), -1)
	let sum = 0
	for (let __goscriptRangeTarget0 = (root$ as tree).Kids, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let kid = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as tree | $.VarRef<tree> | null)
		sum += $.mapGet<any, number, number>(visits, $.interfaceValue(kid, "*main.tree", /* @__PURE__ */ $.pointerType("main.tree")), 0)[0]
	}
	await $.println("tree keys:", $.len(visits), $.mapGet<any, number, number>(visits, $.interfaceValue(root, "*main.tree", /* @__PURE__ */ $.pointerType("main.tree")), 0)[0], sum, $.mapGet<any, number, number>(visits, $.interfaceValue($.arrayIndex((root$ as tree).Kids!, 7), "*main.tree", /* @__PURE__ */ $.pointerType("main.tree")), 0)[0])

	// Typed nil pointers of the same type are equal keys.
	let n1: node | $.VarRef<node> | null = null! as node | $.VarRef<node> | null
	let n2: node | $.VarRef<node> | null = null! as node | $.VarRef<node> | null
	let nils = $.makeMap<any, number>([])
	$.mapSet(nils, $.interfaceValue(n1, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 1)
	$.mapSet(nils, $.interfaceValue(n2, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 2)
	await $.println("typed nils:", $.len(nils), $.mapGet<any, number, number>(nils, $.interfaceValue(n1, "*main.node", /* @__PURE__ */ $.pointerType("main.node")), 0)[0])

	// Struct values with equal fields are the same key.
	let v = $.makeMap<any, number>([])
	$.mapSet(v, $.interfaceValue(new node({Name: "x", N: 1}, true), "main.node", "main.node"), 1)
	$.mapSet(v, $.interfaceValue(new node({Name: "x", N: 1}, true), "main.node", "main.node"), 2)
	await $.println("value keys:", $.len(v), $.mapGet<any, number, number>(v, $.interfaceValue(new node({Name: "x", N: 1}, true), "main.node", "main.node"), 0)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

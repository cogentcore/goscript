// Generated file based on tuple_call_forwarding.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/fmt/index.js"

export type Node = {
	Name(): string
}

$.registerInterfaceType(
	"main.Node",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class point {
	public declare x: number

	public declare y: number

	public _fields: {
		x: number
		y: number
	}

	constructor(init?: Partial<{x?: number, y?: number}>) {
		this._fields = {
			x: init?.x ?? (0 as number),
			y: init?.y ?? (0 as number)
		}
	}

	public clone(): point {
		return $.markAsStructValue(new point(this))
	}

	static {
		$.bindStructFields(this.prototype, ["x", "y"])
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [],
		point,
		() => [{ name: "x", key: "x", type: /* @__PURE__ */ $.basicType("int") }, { name: "y", key: "y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class frame {
	public declare name: string

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): frame {
		return $.markAsStructValue(new frame(this))
	}

	public Name(): string {
		const f: frame | $.VarRef<frame> | null = this;
		return $.pointerValue<frame>(f).name
	}

	static {
		$.bindStructFields(this.prototype, ["name"])
	}

	static __typeInfo = $.registerStructType(
		"main.frame",
		() => new frame(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		frame,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class tab {
	public declare name: string

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): tab {
		return $.markAsStructValue(new tab(this))
	}

	public Name(): string {
		const t: tab | $.VarRef<tab> | null = this;
		return $.pointerValue<tab>(t).name
	}

	static {
		$.bindStructFields(this.prototype, ["name"])
	}

	static __typeInfo = $.registerStructType(
		"main.tab",
		() => new tab(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		tab,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class tabs {
	public declare count: number

	public _fields: {
		count: number
	}

	constructor(init?: Partial<{count?: number}>) {
		this._fields = {
			count: init?.count ?? (0 as number)
		}
	}

	public clone(): tabs {
		return $.markAsStructValue(new tabs(this))
	}

	public async NewTab(name: string): globalThis.Promise<[frame | $.VarRef<frame> | null, tab | $.VarRef<tab> | null]> {
		let ts: tabs | $.VarRef<tabs> | null = this;
		$.pointerValue<tabs>(ts).count++
		await $.println("new tab:", name)
		return newTab(name)
	}

	static {
		$.bindStructFields(this.prototype, ["count"])
	}

	static __typeInfo = $.registerStructType(
		"main.tabs",
		() => new tabs(),
		() => [{ name: "NewTab", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.frame") }, { type: /* @__PURE__ */ $.pointerType("main.tab") }] }],
		tabs,
		() => [{ name: "count", key: "count", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function pair(a: number, b: number): [number, number] {
	return [a, b]
}

export function sum(a: number, b: number): number {
	return a + b
}

export function triple(a: number, b: number, c: number): [number, number, number] {
	return [a, b, c]
}

export function makePoint(x: number, y: number, z: number): point | $.VarRef<point> | null {
	return new point({x: x + z, y: y})
}

export function shift(p: point | $.VarRef<point> | null): [point | $.VarRef<point> | null, point | $.VarRef<point> | null, point | $.VarRef<point> | null] {
	return [new point({x: $.pointerValue<point>(p).x + 1, y: $.pointerValue<point>(p).y}), new point({x: $.pointerValue<point>(p).x + 2, y: $.pointerValue<point>(p).y}), new point({x: $.pointerValue<point>(p).x + 3, y: $.pointerValue<point>(p).y})]
}

export function newTab(name: string): [frame | $.VarRef<frame> | null, tab | $.VarRef<tab> | null] {
	return [new frame({name: $.concatString(name, "-frame")}), new tab({name: $.concatString(name, "-tab")})]
}

export async function names(nodes: $.Slice<Node | null>): globalThis.Promise<void> {
	await $.println("names:", $.len(nodes))
	for (let __goscriptRangeTarget0 = nodes, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let n = __goscriptRangeTarget0![__rangeIndex]
		await $.println("name:", (__goscriptAwait = $.pointerValue<Exclude<Node, null>>(n).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

export function total(base: number, rest: $.Slice<number>): number {
	for (let __goscriptRangeTarget1 = rest, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget1); __rangeIndex++) {
		let r = __goscriptRangeTarget1![__rangeIndex]
		base = base + (r)
	}
	return base
}

export function count(v: $.Slice<number>): number {
	return $.len(v)
}

export function span(a: number, b: number, rest: $.Slice<number>): number {
	return (b - a) + $.len(rest)
}

export async function main(): globalThis.Promise<void> {
	await $.println("sum:", sum(...(pair(2, 3) as [number, number])))
	let p: point | $.VarRef<point> | null = makePoint(...(triple(4, 5, 6) as [number, number, number]))
	await $.println("point:", $.pointerValue<point>(p).x, $.pointerValue<point>(p).y)
	let x: point | $.VarRef<point> | null = new point()
	let y: point | $.VarRef<point> | null = new point()
	let z: point | $.VarRef<point> | null = new point()
	let __goscriptTuple0: any = shift(p)
	x = __goscriptTuple0[0]
	y = __goscriptTuple0[1]
	z = __goscriptTuple0[2]
	await $.println("shift:", $.pointerValue<point>(x).x, $.pointerValue<point>(y).x, $.pointerValue<point>(z).x)

	// Results past the fixed parameters fill the variadic slice.
	await names(...(() => { const __goscriptTupleArg0 = newTab("Widgets"); return [$.arrayToSlice<Node | null>([$.interfaceValue<Node | null>(__goscriptTupleArg0[0], "*main.frame", /* @__PURE__ */ $.pointerType("main.frame")), $.interfaceValue<Node | null>(__goscriptTupleArg0[1], "*main.tab", /* @__PURE__ */ $.pointerType("main.tab"))])] as [$.Slice<Node | null>] })())
	await $.println("total:", total(...(() => { const __goscriptTupleArg1 = pair(3, 4); return [__goscriptTupleArg1[0], $.arrayToSlice<number>([__goscriptTupleArg1[1]])] as [number, $.Slice<number>] })()))
	await $.println("count:", count(...(() => { const __goscriptTupleArg2 = pair(3, 4); return [$.arrayToSlice<number>([__goscriptTupleArg2[0], __goscriptTupleArg2[1]])] as [$.Slice<number>] })()))
	await $.println("span:", span(...(() => { const __goscriptTupleArg3 = pair(5, 9); return [__goscriptTupleArg3[0], __goscriptTupleArg3[1], null] as [number, number, $.Slice<number>] })()))
	let ts: tabs | $.VarRef<tabs> | null = new tabs()
	await names(...(await (async () => { const __goscriptTupleArg4 = await tabs.prototype.NewTab.call(ts, "Text"); return [$.arrayToSlice<Node | null>([$.interfaceValue<Node | null>(__goscriptTupleArg4[0], "*main.frame", /* @__PURE__ */ $.pointerType("main.frame")), $.interfaceValue<Node | null>(__goscriptTupleArg4[1], "*main.tab", /* @__PURE__ */ $.pointerType("main.tab"))])] as [$.Slice<Node | null>] })()))
	await $.println("sprint:", await fmt.Sprint(...(() => { const __goscriptTupleArg5 = pair(3, 4); return [$.basicInterfaceValue(__goscriptTupleArg5[0], "int"), $.basicInterfaceValue(__goscriptTupleArg5[1], "int")] as [any, any] })()))
	await $.println("tabs:", $.pointerValue<tabs>(ts).count)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

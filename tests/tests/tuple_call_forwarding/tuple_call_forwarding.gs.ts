// Generated file based on tuple_call_forwarding.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

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

	constructor(__goscriptValue?: boolean, x$?: number, y$?: number) {
		this.x = x$ ?? 0
		this.y = y$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): point {
		return new point(true, this.x, this.y)
	}

	public __goscriptAssign(source: point): this {
		this.x = source.x
		this.y = source.y
		return this
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

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): frame {
		return new frame(true, this.name)
	}

	public __goscriptAssign(source: frame): this {
		this.name = source.name
		return this
	}

	public Name(): string {
		const f: frame | $.VarRef<frame> | null = this;
		return $.pointerValue<frame>(f).name
	}

	static __typeInfo = $.registerStructType(
		"main.frame",
		() => new frame(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		frame,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class tab {
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): tab {
		return new tab(true, this.name)
	}

	public __goscriptAssign(source: tab): this {
		this.name = source.name
		return this
	}

	public Name(): string {
		const t: tab | $.VarRef<tab> | null = this;
		return $.pointerValue<tab>(t).name
	}

	static __typeInfo = $.registerStructType(
		"main.tab",
		() => new tab(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		tab,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class tabs {
	public declare count: number

	constructor(__goscriptValue?: boolean, count$?: number) {
		this.count = count$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): tabs {
		return new tabs(true, this.count)
	}

	public __goscriptAssign(source: tabs): this {
		this.count = source.count
		return this
	}

	public async NewTab(name: string): globalThis.Promise<[frame | $.VarRef<frame> | null, tab | $.VarRef<tab> | null]> {
		const ts: tabs | $.VarRef<tabs> | null = this;
		const ts$: tabs = ts == null ? $.pointerTarget<tabs>(ts) : (ts as any).__isVarRef === true ? (ts as any).value : (ts as any).__goValue === undefined ? (ts as any) : $.pointerTarget<tabs>(ts);
		;(ts$ as tabs).count++
		await $.println("new tab:", name)
		return newTab(name)
	}

	static __typeInfo = $.registerStructType(
		"main.tabs",
		() => new tabs(),
		() => [{ name: "NewTab", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.frame") }, { type: /* @__PURE__ */ $.pointerType("main.tab") }], pointerReceiver: true }],
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
	return new point(false, x + z, y)
}

export function shift(p: point | $.VarRef<point> | null): [point | $.VarRef<point> | null, point | $.VarRef<point> | null, point | $.VarRef<point> | null] {
	const p$: point = p == null ? $.pointerTarget<point>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<point>(p)
	return [new point(false, (p$ as point).x + 1, (p$ as point).y), new point(false, (p$ as point).x + 2, (p$ as point).y), new point(false, (p$ as point).x + 3, (p$ as point).y)]
}

export function newTab(name: string): [frame | $.VarRef<frame> | null, tab | $.VarRef<tab> | null] {
	return [new frame(false, name + "-frame"), new tab(false, name + "-tab")]
}

export async function names(nodes: $.Slice<Node | null>): globalThis.Promise<void> {
	await $.println("names:", $.sliceLen(nodes))
	for (let __goscriptRangeTarget0 = nodes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let n = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Node | null)
		await $.println("name:", (__goscriptAwait = (n !== null && (n as any).__isVarRef !== true && ((n as any).__goValue === undefined || (n as any).__goType?.charCodeAt(0) !== 42) ? (n as Exclude<Node, null>) : $.pointerValue<Exclude<Node, null>>(n)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
}

export function total(base: number, rest: $.Slice<number>): number {
	for (let __goscriptRangeTarget1 = rest, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let r = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number)
		base += r
	}
	return base
}

export function count(v: $.Slice<number>): number {
	return $.sliceLen(v)
}

export function span(a: number, b: number, rest: $.Slice<number>): number {
	return (b - a) + $.sliceLen(rest)
}

export async function main(): globalThis.Promise<void> {
	await $.println("sum:", sum(...(pair(2, 3) as [number, number])))
	let p = makePoint(...(triple(4, 5, 6) as [number, number, number]))
	let p$: point = p == null ? $.pointerTarget<point>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<point>(p)
	await $.println("point:", (p$ as point).x, (p$ as point).y)
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
	let ts = new tabs()
	await names(...(await (async () => { const __goscriptTupleArg4 = await (ts !== null && (ts as any).__isVarRef !== true && (ts as any).__goValue === undefined ? ((ts as any) as tabs).NewTab("Text") : tabs.prototype.NewTab.call(ts, "Text")); return [$.arrayToSlice<Node | null>([$.interfaceValue<Node | null>(__goscriptTupleArg4[0], "*main.frame", /* @__PURE__ */ $.pointerType("main.frame")), $.interfaceValue<Node | null>(__goscriptTupleArg4[1], "*main.tab", /* @__PURE__ */ $.pointerType("main.tab"))])] as [$.Slice<Node | null>] })()))
	await $.println("sprint:", (fmt.Sprint(...(() => { const __goscriptTupleArg5 = pair(3, 4); return [$.basicInterfaceValue(__goscriptTupleArg5[0], "int"), $.basicInterfaceValue(__goscriptTupleArg5[1], "int")] as [any, any] })()) as string))
	await $.println("tabs:", $.pointerValue<tabs>(ts).count)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

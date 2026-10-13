// Generated file based on multi_value_variadic_call.go
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

export class Frame {
	public declare name: string

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): Frame {
		return $.markAsStructValue(new Frame(this))
	}

	public Name(): string {
		const f: Frame | $.VarRef<Frame> | null = this;
		return $.pointerValue<Frame>(f).name
	}

	static {
		$.bindStructFields(this.prototype, ["name"])
	}

	static __typeInfo = $.registerStructType(
		"main.Frame",
		() => new Frame(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Frame,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Tab {
	public declare name: string

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): Tab {
		return $.markAsStructValue(new Tab(this))
	}

	public Name(): string {
		const t: Tab | $.VarRef<Tab> | null = this;
		return $.pointerValue<Tab>(t).name
	}

	static {
		$.bindStructFields(this.prototype, ["name"])
	}

	static __typeInfo = $.registerStructType(
		"main.Tab",
		() => new Tab(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Tab,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Tabs {
	public declare count: number

	public _fields: {
		count: number
	}

	constructor(init?: Partial<{count?: number}>) {
		this._fields = {
			count: init?.count ?? (0 as number)
		}
	}

	public clone(): Tabs {
		return $.markAsStructValue(new Tabs(this))
	}

	public async NewTab(name: string): globalThis.Promise<[Frame | $.VarRef<Frame> | null, Tab | $.VarRef<Tab> | null]> {
		let ts: Tabs | $.VarRef<Tabs> | null = this;
		$.pointerValue<Tabs>(ts).count++
		await $.println("new tab:", name)
		return newTab(name)
	}

	static {
		$.bindStructFields(this.prototype, ["count"])
	}

	static __typeInfo = $.registerStructType(
		"main.Tabs",
		() => new Tabs(),
		() => [{ name: "NewTab", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.Frame") }, { type: /* @__PURE__ */ $.pointerType("main.Tab") }] }],
		Tabs,
		() => [{ name: "count", key: "count", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newTab(name: string): [Frame | $.VarRef<Frame> | null, Tab | $.VarRef<Tab> | null] {
	return [new Frame({name: $.concatString(name, "-frame")}), new Tab({name: $.concatString(name, "-tab")})]
}

export function pair(): [number, number] {
	return [3, 4]
}

export async function names(parent: $.Slice<Node | null>): globalThis.Promise<void> {
	await $.println("count:", $.len(parent))
	for (let __goscriptRangeTarget0 = parent, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let p = __goscriptRangeTarget0![__rangeIndex]
		await $.println("name:", await $.pointerValue<Exclude<Node, null>>(p).Name())
	}
}

export function sum(base: number, rest: $.Slice<number>): number {
	for (let __goscriptRangeTarget1 = rest, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget1); __rangeIndex++) {
		let r = __goscriptRangeTarget1![__rangeIndex]
		base = base + (r)
	}
	return base
}

export function ints(v: $.Slice<number>): number {
	return $.len(v)
}

export async function main(): globalThis.Promise<void> {
	await names(...(() => { const __goscriptTupleArg0 = newTab("Widgets"); return [$.arrayToSlice<Node | null>([$.interfaceValue<Node | null>(__goscriptTupleArg0[0], "*main.Frame", /* @__PURE__ */ $.pointerType("main.Frame")), $.interfaceValue<Node | null>(__goscriptTupleArg0[1], "*main.Tab", /* @__PURE__ */ $.pointerType("main.Tab"))])] as [$.Slice<Node | null>] })())
	await $.println("sum:", sum(...(() => { const __goscriptTupleArg1 = pair(); return [__goscriptTupleArg1[0], $.arrayToSlice<number>([__goscriptTupleArg1[1]])] as [number, $.Slice<number>] })()))
	await $.println("ints:", ints(...(() => { const __goscriptTupleArg2 = pair(); return [$.arrayToSlice<number>([__goscriptTupleArg2[0], __goscriptTupleArg2[1]])] as [$.Slice<number>] })()))
	let ts: Tabs | $.VarRef<Tabs> | null = new Tabs()
	await names(...(await (async () => { const __goscriptTupleArg3 = await Tabs.prototype.NewTab.call(ts, "Text"); return [$.arrayToSlice<Node | null>([$.interfaceValue<Node | null>(__goscriptTupleArg3[0], "*main.Frame", /* @__PURE__ */ $.pointerType("main.Frame")), $.interfaceValue<Node | null>(__goscriptTupleArg3[1], "*main.Tab", /* @__PURE__ */ $.pointerType("main.Tab"))])] as [$.Slice<Node | null>] })()))
	await $.println("sprint:", await fmt.Sprint(...(() => { const __goscriptTupleArg4 = pair(); return [$.basicInterfaceValue(__goscriptTupleArg4[0], "int"), $.basicInterfaceValue(__goscriptTupleArg4[1], "int")] as [any, any] })()))
	await $.println("tabs:", $.pointerValue<Tabs>(ts).count)
}

if ($.isMainScript(import.meta)) {
	await main()
}

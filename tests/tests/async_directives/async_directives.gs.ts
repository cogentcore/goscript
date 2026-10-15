// Generated file based on async_directives.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Logger = {
	Log(msg: string): string | globalThis.Promise<string>
}

$.registerInterfaceType(
	"main.Logger",
	null,
	[{ name: "Log", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type Sink = {
	Put(n: number): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"main.Sink",
	null,
	[{ name: "Put", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Transform = ((_p0: number) => number | globalThis.Promise<number>) | null

export class prefixLogger {
	public get prefix(): string {
		return this._fields.prefix
	}

	public set prefix(value: string) {
		this._fields.prefix = value
	}

	public _fields: {
		prefix: string
	}

	constructor(init?: Partial<{prefix?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			prefix: init?.prefix ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): prefixLogger {
		return new prefixLogger(this, true)
	}

	public __goscriptAssign(source: prefixLogger): void {
		const target = this._fields
		const values = source._fields
		target.prefix = values.prefix
	}

	public Log(msg: string): string {
		const l = this;
		return l.prefix + msg
	}

	static __typeInfo = $.registerStructType(
		"main.prefixLogger",
		() => new prefixLogger(),
		() => [{ name: "Log", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		prefixLogger,
		() => [{ name: "prefix", key: "prefix", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class addSink {
	public get total(): number {
		return this._fields.total
	}

	public set total(value: number) {
		this._fields.total = value
	}

	public _fields: {
		total: number
	}

	constructor(init?: Partial<{total?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			total: init?.total ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): addSink {
		return new addSink(this, true)
	}

	public __goscriptAssign(source: addSink): void {
		const target = this._fields
		const values = source._fields
		target.total = values.total
	}

	public Put(n: number): number {
		let s: addSink | $.VarRef<addSink> | null = this;
		const s$: addSink = s == null ? $.pointerTarget<addSink>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<addSink>(s);
		;(s$ as addSink).total += n
		return (s$ as addSink).total
	}

	static __typeInfo = $.registerStructType(
		"main.addSink",
		() => new addSink(),
		() => [{ name: "Put", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		addSink,
		() => [{ name: "total", key: "total", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class chanSink {
	public get ch(): $.Channel<number> | null {
		return this._fields.ch
	}

	public set ch(value: $.Channel<number> | null) {
		this._fields.ch = value
	}

	public _fields: {
		ch: $.Channel<number> | null
	}

	constructor(init?: Partial<{ch?: $.Channel<number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			ch: init?.ch ?? (null! as $.Channel<number> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): chanSink {
		return new chanSink(this, true)
	}

	public __goscriptAssign(source: chanSink): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
	}

	public async Put(n: number): globalThis.Promise<number> {
		const s: chanSink | $.VarRef<chanSink> | null = this;
		const s$: chanSink = s == null ? $.pointerTarget<chanSink>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<chanSink>(s)
		await $.chanSend((s$ as chanSink).ch, n)
		return await $.chanRecv((s$ as chanSink).ch)
	}

	static __typeInfo = $.registerStructType(
		"main.chanSink",
		() => new chanSink(),
		() => [{ name: "Put", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		chanSink,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export class Button {
	public get OnClick(): ((clicks: number) => number | globalThis.Promise<number>) | null {
		return this._fields.OnClick
	}

	public set OnClick(value: ((clicks: number) => number | globalThis.Promise<number>) | null) {
		this._fields.OnClick = value
	}

	// OnHover keeps the shape's coloring.
	public get OnHover(): ((clicks: number) => number | globalThis.Promise<number>) | null {
		return this._fields.OnHover
	}

	public set OnHover(value: ((clicks: number) => number | globalThis.Promise<number>) | null) {
		this._fields.OnHover = value
	}

	public _fields: {
		OnClick: ((clicks: number) => number | globalThis.Promise<number>) | null
		OnHover: ((clicks: number) => number | globalThis.Promise<number>) | null
	}

	constructor(init?: Partial<{OnClick?: ((clicks: number) => number | globalThis.Promise<number>) | null, OnHover?: ((clicks: number) => number | globalThis.Promise<number>) | null}>, __goscriptValue?: boolean) {
		this._fields = {
			OnClick: init?.OnClick ?? (null! as ((clicks: number) => number | globalThis.Promise<number>) | null),
			OnHover: init?.OnHover ?? (null! as ((clicks: number) => number | globalThis.Promise<number>) | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Button {
		return new Button(this, true)
	}

	public __goscriptAssign(source: Button): void {
		const target = this._fields
		const values = source._fields
		target.OnClick = values.OnClick
		target.OnHover = values.OnHover
	}

	static __typeInfo = $.registerStructType(
		"main.Button",
		() => new Button(),
		() => [],
		Button,
		() => [{ name: "OnClick", key: "OnClick", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo) }, { name: "OnHover", key: "OnHover", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo) }]
	)
}

export class summer {
	public get n(): number {
		return this._fields.n
	}

	public set n(value: number) {
		this._fields.n = value
	}

	public _fields: {
		n: number
	}

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			n: init?.n ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): summer {
		return new summer(this, true)
	}

	public __goscriptAssign(source: summer): void {
		const target = this._fields
		const values = source._fields
		target.n = values.n
	}

	public sum(fs: $.Slice<((_p0: number) => number | globalThis.Promise<number>) | null>): number {
		const s: summer | $.VarRef<summer> | null = this;
		let total = 0
		for (let __goscriptRangeTarget2 = fs, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
			let f = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as ((_p0: number) => number | globalThis.Promise<number>) | null)
			total += $.syncResult(f!($.pointerValue<summer>(s).n))
		}
		return total
	}

	static __typeInfo = $.registerStructType(
		"main.summer",
		() => new summer(),
		() => [{ name: "sum", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		summer,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function logAll(l: Logger | null, msgs: $.Slice<string>): globalThis.Promise<string> {
	let out = ""
	for (let __goscriptRangeTarget0 = msgs, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let msg = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		out += (__goscriptAwait = (l !== null && (l as any).__isVarRef !== true && (l as any).__goValue === undefined ? (l as Exclude<Logger, null>) : $.pointerValue<Exclude<Logger, null>>(l)).Log(msg), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}
	return out
}

export function fill(s: Sink | null, n: number): number {
	let last = 0
	for (let __goscriptRangeCount0 = n, i = 0; i < __goscriptRangeCount0; i++) {
		last = ((s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? (s as Exclude<Sink, null>) : $.pointerValue<Exclude<Sink, null>>(s)).Put(i) as number)
	}
	return last
}

export function applyAll(fs: $.Slice<Transform | null>, n: number): number {
	for (let __goscriptRangeTarget1 = fs, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let f = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as Transform | null)
		n = (f!(n) as number)
	}
	return n
}

export async function click(b: Button | $.VarRef<Button> | null, n: number): globalThis.Promise<number> {
	const b$: Button = b == null ? $.pointerTarget<Button>(b) : (b as any).__isVarRef === true ? (b as any).value : (b as any).__goValue === undefined ? (b as any) : $.pointerTarget<Button>(b)
	return (__goscriptAwait = (b$ as Button).OnClick!(n), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + (__goscriptAwait = (b$ as Button).OnHover!(n), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

export function countAll(f: ((_p0: number) => number | globalThis.Promise<number>) | null, n: number): number {
	return $.syncResult(f!(n)) + 1
}

export async function main(): globalThis.Promise<void> {
	await $.println("log:", await logAll($.interfaceValue<Logger | null>(new prefixLogger({prefix: "> "}, true), "main.prefixLogger", "main.prefixLogger"), $.arrayToSlice<string>(["a", "b"])))

	let sink = new addSink()
	await $.println("fill:", fill($.interfaceValue<Sink | null>(sink, "*main.addSink", /* @__PURE__ */ $.pointerType("main.addSink")), 4))

	let ch = $.makeChannel<number>(0, 0, "both")
	queueMicrotask(async () => {
		let n = await $.chanRecv(ch)
		await $.chanSend(ch, n * 10)
	})
	await $.println("chan put:", await chanSink.prototype.Put.call((new chanSink({ch: ch})), 3))

	// An async literal of Transform's shape.
	let recv = $.functionValue(async (n: number): globalThis.Promise<number> => {
		let c = $.makeChannel<number>(1, 0, "both")
		await $.chanSend(c, n)
		return await $.chanRecv(c)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println("recv:", await recv(5))
	let double = $.functionValue((n: number): number => {
		return n * 2
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println("apply:", applyAll($.arrayToSlice<Transform | null>([double, $.namedFunction(double, "main.Transform", ({ kind: $.TypeKind.Function, name: "main.Transform", params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))]), 3))

	let b = new Button({OnClick: $.functionValue((clicks: number): number => {
		return clicks + 1
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)), OnHover: $.functionValue((clicks: number): number => {
		return clicks + 2
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))})
	await $.println("click:", await click(b, 1))

	await $.println("count:", countAll(double, 4))
	let s = new summer({n: 2})
	await $.println("sum:", (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as summer).sum($.arrayToSlice<((_p0: number) => number | globalThis.Promise<number>) | null>([double, double])) : summer.prototype.sum.call(s, $.arrayToSlice<((_p0: number) => number | globalThis.Promise<number>) | null>([double, double]))))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on interface_whole_program.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Shape = {
	Area(): number
}

$.registerInterfaceType(
	"main.Shape",
	null,
	[{ name: "Area", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Source = {
	Next(): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"main.Source",
	null,
	[{ name: "Next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Valuer = {
	Value(): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"main.Valuer",
	null,
	[{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Getter = {
	Get(): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"main.Getter",
	null,
	[{ name: "Get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Labeler = {
	Label(): string
}

$.registerInterfaceType(
	"main.Labeler",
	null,
	[{ name: "Label", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type Namer = {
	Name(): string
}

$.registerInterfaceType(
	"main.Namer",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type fixedLabel = string

$.registerNamedValueType(
	"main.fixedLabel",
	{Label: (receiver: any, ...args: any[]) => (fixedLabel_Label as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.fixedLabel",
	{Label: (receiver: any, ...args: any[]) => (fixedLabel_Label as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class Rect {
	public get w(): number {
		return this._fields.w
	}

	public set w(value: number) {
		this._fields.w = value
	}

	public get h(): number {
		return this._fields.h
	}

	public set h(value: number) {
		this._fields.h = value
	}

	public _fields: {
		w: number
		h: number
	}

	constructor(init?: Partial<{w?: number, h?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			w: init?.w ?? (0 as number),
			h: init?.h ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Rect {
		return new Rect(this, true)
	}

	public __goscriptAssign(source: Rect): void {
		const target = this._fields
		const values = source._fields
		target.w = values.w
		target.h = values.h
	}

	public Area(): number {
		const r = this;
		return r.w * r.h
	}

	static __typeInfo = $.registerStructType(
		"main.Rect",
		() => new Rect(),
		() => [{ name: "Area", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		Rect,
		() => [{ name: "w", key: "w", type: /* @__PURE__ */ $.basicType("int") }, { name: "h", key: "h", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Square {
	public get side(): number {
		return this._fields.side
	}

	public set side(value: number) {
		this._fields.side = value
	}

	public _fields: {
		side: number
	}

	constructor(init?: Partial<{side?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			side: init?.side ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Square {
		return new Square(this, true)
	}

	public __goscriptAssign(source: Square): void {
		const target = this._fields
		const values = source._fields
		target.side = values.side
	}

	public Area(): number {
		const s: Square | $.VarRef<Square> | null = this;
		const s$: Square = s == null ? $.pointerTarget<Square>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<Square>(s)
		return (s$ as Square).side * (s$ as Square).side
	}

	static __typeInfo = $.registerStructType(
		"main.Square",
		() => new Square(),
		() => [{ name: "Area", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Square,
		() => [{ name: "side", key: "side", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Counter {
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

	public clone(): Counter {
		return new Counter(this, true)
	}

	public __goscriptAssign(source: Counter): void {
		const target = this._fields
		const values = source._fields
		target.n = values.n
	}

	public Next(): number {
		let c: Counter | $.VarRef<Counter> | null = this;
		const c$: Counter = c == null ? $.pointerTarget<Counter>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<Counter>(c);
		;(c$ as Counter).n++
		return (c$ as Counter).n
	}

	static __typeInfo = $.registerStructType(
		"main.Counter",
		() => new Counter(),
		() => [{ name: "Next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Counter,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class ChanSource {
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

	public clone(): ChanSource {
		return new ChanSource(this, true)
	}

	public __goscriptAssign(source: ChanSource): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
	}

	public async Next(): globalThis.Promise<number> {
		const c: ChanSource | $.VarRef<ChanSource> | null = this;
		const c$: ChanSource = c == null ? $.pointerTarget<ChanSource>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<ChanSource>(c)
		await $.chanSend((c$ as ChanSource).ch, 10)
		return await $.chanRecv((c$ as ChanSource).ch)
	}

	static __typeInfo = $.registerStructType(
		"main.ChanSource",
		() => new ChanSource(),
		() => [{ name: "Next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		ChanSource,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export class chanValuer {
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

	public clone(): chanValuer {
		return new chanValuer(this, true)
	}

	public __goscriptAssign(source: chanValuer): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
	}

	public async Value(): globalThis.Promise<number> {
		const c = this;
		await $.chanSend(c.ch, 5)
		return await $.chanRecv(c.ch)
	}

	static __typeInfo = $.registerStructType(
		"main.chanValuer",
		() => new chanValuer(),
		() => [{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		chanValuer,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export class plusOne {
	public get _in(): Valuer | null {
		return this._fields._in
	}

	public set _in(value: Valuer | null) {
		this._fields._in = value
	}

	public _fields: {
		_in: Valuer | null
	}

	constructor(init?: Partial<{_in?: Valuer | null}>, __goscriptValue?: boolean) {
		this._fields = {
			_in: init?._in ?? (null! as Valuer | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): plusOne {
		return new plusOne(this, true)
	}

	public __goscriptAssign(source: plusOne): void {
		const target = this._fields
		const values = source._fields
		target._in = $.assignFieldValue(target._in, values._in, "main.Valuer")
	}

	public async Get(): globalThis.Promise<number> {
		const p = this;
		return (__goscriptAwait = $.pointerValue<Exclude<Valuer, null>>(p._in).Value(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + 1
	}

	static __typeInfo = $.registerStructType(
		"main.plusOne",
		() => new plusOne(),
		() => [{ name: "Get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		plusOne,
		() => [{ name: "in", key: "_in", type: "main.Valuer" }]
	)
}

export class prefixNamer {
	public get labeler(): Labeler | null {
		return this._fields.labeler
	}

	public set labeler(value: Labeler | null) {
		this._fields.labeler = value
	}

	public _fields: {
		labeler: Labeler | null
	}

	constructor(init?: Partial<{labeler?: Labeler | null}>, __goscriptValue?: boolean) {
		this._fields = {
			labeler: init?.labeler ?? (null! as Labeler | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): prefixNamer {
		return new prefixNamer(this, true)
	}

	public __goscriptAssign(source: prefixNamer): void {
		const target = this._fields
		const values = source._fields
		target.labeler = $.assignFieldValue(target.labeler, values.labeler, "main.Labeler")
	}

	public Name(): string {
		const p = this;
		return "name:" + $.pointerValue<Exclude<Labeler, null>>(p.labeler).Label()
	}

	static __typeInfo = $.registerStructType(
		"main.prefixNamer",
		() => new prefixNamer(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		prefixNamer,
		() => [{ name: "labeler", key: "labeler", type: "main.Labeler" }]
	)
}

export function totalArea(shapes: $.Slice<Shape | null>): number {
	let total = 0
	for (let __goscriptRangeTarget0 = shapes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let shape = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Shape | null)
		total += (shape !== null && (shape as any).__isVarRef !== true && (shape as any).__goValue === undefined ? (shape as Exclude<Shape, null>) : $.pointerValue<Exclude<Shape, null>>(shape)).Area()
	}
	return total
}

export async function sumNext(src: Source | null, count: number): globalThis.Promise<number> {
	let sum = 0
	for (let __goscriptRangeCount0 = count, __rangeIndex = 0; __rangeIndex < __goscriptRangeCount0; __rangeIndex++) {
		sum += (__goscriptAwait = (src !== null && (src as any).__isVarRef !== true && (src as any).__goValue === undefined ? (src as Exclude<Source, null>) : $.pointerValue<Exclude<Source, null>>(src)).Next(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}
	return sum
}

export async function readGetter(g: Getter | null): globalThis.Promise<number> {
	return (g !== null && (g as any).__isVarRef !== true && (g as any).__goValue === undefined ? (g as Exclude<Getter, null>) : $.pointerValue<Exclude<Getter, null>>(g)).Get()
}

export function fixedLabel_Label(f: fixedLabel): string {
	return f
}

export function describe(n: Namer | null): string {
	return (n !== null && (n as any).__isVarRef !== true && (n as any).__goValue === undefined ? (n as Exclude<Namer, null>) : $.pointerValue<Exclude<Namer, null>>(n)).Name()
}

export async function main(): globalThis.Promise<void> {
	await $.println("area:", totalArea($.arrayToSlice<Shape | null>([$.interfaceValue<Shape | null>(new Rect({w: 2, h: 3}, true), "main.Rect", "main.Rect"), $.interfaceValue<Shape | null>(new Square({side: 4}), "*main.Square", /* @__PURE__ */ $.pointerType("main.Square"))])))

	await $.println("counter:", await sumNext($.interfaceValue<Source | null>(new Counter(), "*main.Counter", /* @__PURE__ */ $.pointerType("main.Counter")), 3))
	await $.println("chan:", await sumNext($.interfaceValue<Source | null>(new ChanSource({ch: $.makeChannel<number>(1, 0, "both")}), "*main.ChanSource", /* @__PURE__ */ $.pointerType("main.ChanSource")), 2))

	await $.println("getter:", await readGetter($.interfaceValue<Getter | null>(new plusOne({_in: $.interfaceValue<Valuer | null>(new chanValuer({ch: $.makeChannel<number>(1, 0, "both")}, true), "main.chanValuer", "main.chanValuer")}, true), "main.plusOne", "main.plusOne")))

	await $.println("namer:", describe($.interfaceValue<Namer | null>(new prefixNamer({labeler: $.namedValueInterfaceValue<Labeler | null>("x", "main.fixedLabel", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())}, true), "main.prefixNamer", "main.prefixNamer")))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Label: (receiver: any, ...args: any[]) => (fixedLabel_Label as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("string", "main.fixedLabel"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on sort_operands.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sort from "@goscript/sort/index.js"

export type byLen = $.Slice<string>

$.registerNamedType("main.byLen", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

$.registerNamedValueType(
	"main.byLen",
	{Len: (receiver: any, ...args: any[]) => (byLen_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Less: (receiver: any, ...args: any[]) => (byLen_Less as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byLen_Swap as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])]
);

$.registerNamedValueType(
	"*main.byLen",
	{Len: (receiver: any, ...args: any[]) => (byLen_Len as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Less: (receiver: any, ...args: any[]) => (byLen_Less as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byLen_Swap as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])]
);

export class slowInts {
	public get xs(): $.Slice<number> {
		return this._fields.xs
	}

	public set xs(value: $.Slice<number>) {
		this._fields.xs = value
	}

	public get ch(): $.Channel<number> | null {
		return this._fields.ch
	}

	public set ch(value: $.Channel<number> | null) {
		this._fields.ch = value
	}

	public _fields: {
		xs: $.Slice<number>
		ch: $.Channel<number> | null
	}

	constructor(init?: Partial<{xs?: $.Slice<number>, ch?: $.Channel<number> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			xs: init?.xs ?? (null! as $.Slice<number>),
			ch: init?.ch ?? (null! as $.Channel<number> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): slowInts {
		return new slowInts(this, true)
	}

	public __goscriptAssign(source: slowInts): void {
		const target = this._fields
		const values = source._fields
		target.xs = values.xs
		target.ch = values.ch
	}

	public Len(): number {
		const s: slowInts | $.VarRef<slowInts> | null = this;
		return $.sliceLen($.pointerValue<slowInts>(s).xs)
	}

	public async Less(i: number, j: number): globalThis.Promise<boolean> {
		const s: slowInts | $.VarRef<slowInts> | null = this;
		const s$: slowInts = s == null ? $.pointerTarget<slowInts>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<slowInts>(s)
		await $.chanSend((s$ as slowInts).ch, $.arrayIndex((s$ as slowInts).xs!, i))
		return await $.chanRecv((s$ as slowInts).ch) < $.arrayIndex((s$ as slowInts).xs!, j)
	}

	public Swap(i: number, j: number): void {
		let s: slowInts | $.VarRef<slowInts> | null = this;
		const s$: slowInts = s == null ? $.pointerTarget<slowInts>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<slowInts>(s)
		let __goscriptAssign1_0: number = $.arrayIndex((s$ as slowInts).xs!, j)
		let __goscriptAssign1_1: number = $.arrayIndex((s$ as slowInts).xs!, i)
		$.sliceElems((s$ as slowInts).xs!)[$.sliceSlot((s$ as slowInts).xs!, i)] = __goscriptAssign1_0
		$.sliceElems((s$ as slowInts).xs!)[$.sliceSlot((s$ as slowInts).xs!, j)] = __goscriptAssign1_1
	}

	static __typeInfo = $.registerStructType(
		"main.slowInts",
		() => new slowInts(),
		() => [{ name: "Len", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "Less", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Swap", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		slowInts,
		() => [{ name: "xs", key: "xs", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }, { name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export function byLen_Len(s: byLen): number {
	return $.sliceLen((s as byLen))
}

export function byLen_Less(s: byLen, i: number, j: number): boolean {
	return $.stringLen($.arrayIndex(s!, i)) < $.stringLen($.arrayIndex(s!, j))
}

export function byLen_Swap(s: byLen, i: number, j: number): void {
	let __goscriptAssign0_0: string = $.arrayIndex(s!, j)
	let __goscriptAssign0_1: string = $.arrayIndex(s!, i)
	$.sliceElems(s!)[$.sliceSlot(s!, i)] = __goscriptAssign0_0
	$.sliceElems(s!)[$.sliceSlot(s!, j)] = __goscriptAssign0_1
}

export function sortWords(words: $.Slice<string>): $.Slice<string> {
	sort.Sort($.pointerValueOrNil($.namedValueInterfaceValue<sort.Interface | null>((words as byLen), "main.byLen", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))!)
	return words
}

export function stableWords(words: $.Slice<string>): $.Slice<string> {
	sort.Stable($.pointerValueOrNil($.namedValueInterfaceValue<sort.Interface | null>((words as byLen), "main.byLen", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))!)
	return words
}

export function wordsSorted(words: $.Slice<string>): boolean {
	return (sort.IsSorted($.pointerValueOrNil($.namedValueInterfaceValue<sort.Interface | null>((words as byLen), "main.byLen", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))!) as boolean)
}

export async function sortSlow(s: slowInts | $.VarRef<slowInts> | null): globalThis.Promise<$.Slice<number>> {
	await sort.Sort($.pointerValueOrNil($.interfaceValue<sort.Interface | null>(s, "*main.slowInts", /* @__PURE__ */ $.pointerType("main.slowInts")))!)
	return $.pointerValue<slowInts>(s).xs
}

export async function sortAny(data: sort.Interface | null): globalThis.Promise<void> {
	await sort.Sort($.pointerValueOrNil(data)!)
}

export async function main(): globalThis.Promise<void> {
	await $.println($.sliceLen(sortWords($.arrayToSlice<string>(["ccc", "a", "bb"]))), wordsSorted($.arrayToSlice<string>(["a", "bb"])))
	let w = stableWords($.arrayToSlice<string>(["bb", "a", "cc", "d"]))
	await $.println($.arrayIndex(w!, 0), $.arrayIndex(w!, 1), $.arrayIndex(w!, 2), $.arrayIndex(w!, 3))
	let s = await sortSlow(new slowInts({xs: $.arrayToSlice<number>([3, 1, 2]), ch: $.makeChannel<number>(1, 0, "both")}))
	await $.println($.arrayIndex(s!, 0), $.arrayIndex(s!, 1), $.arrayIndex(s!, 2))
	let words = ($.arrayToSlice<string>(["xyz", "x", "xy"]) as byLen)
	await sortAny($.namedValueInterfaceValue<sort.Interface | null>(words, "main.byLen", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	await $.println($.arrayIndex(words!, 0), $.arrayIndex(words!, 1), $.arrayIndex(words!, 2), (sort.IsSorted($.pointerValueOrNil($.namedValueInterfaceValue<sort.Interface | null>(words, "main.byLen", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))!) as boolean))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Len: (receiver: any, ...args: any[]) => (byLen_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Less: (receiver: any, ...args: any[]) => (byLen_Less as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byLen_Swap as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.byLen"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on compound_assign_side_effects.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type counter = {
	Next(): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"main.counter",
	null,
	[{ name: "Next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class point {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public get S(): string {
		return this._fields.S
	}

	public set S(value: string) {
		this._fields.S = value
	}

	public get U8(): number {
		return this._fields.U8
	}

	public set U8(value: number) {
		this._fields.U8 = value
	}

	public get I64(): bigint {
		return this._fields.I64
	}

	public set I64(value: bigint) {
		this._fields.I64 = value
	}

	public get U32(): number {
		return this._fields.U32
	}

	public set U32(value: number) {
		this._fields.U32 = value
	}

	public get F32(): number {
		return this._fields.F32
	}

	public set F32(value: number) {
		this._fields.F32 = value
	}

	public _fields: {
		X: number
		S: string
		U8: number
		I64: bigint
		U32: number
		F32: number
	}

	constructor(init?: Partial<{X?: number, S?: string, U8?: number, I64?: bigint, U32?: number, F32?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number),
			S: init?.S ?? ("" as string),
			U8: init?.U8 ?? (0 as number),
			I64: init?.I64 ?? (0n as bigint),
			U32: init?.U32 ?? (0 as number),
			F32: init?.F32 ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(this, true)
	}

	public __goscriptAssign(source: point): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
		target.S = values.S
		target.U8 = values.U8
		target.I64 = values.I64
		target.U32 = values.U32
		target.F32 = values.F32
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [],
		point,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "S", key: "S", type: /* @__PURE__ */ $.basicType("string") }, { name: "U8", key: "U8", type: /* @__PURE__ */ $.basicType("uint8") }, { name: "I64", key: "I64", type: /* @__PURE__ */ $.basicType("int64") }, { name: "U32", key: "U32", type: /* @__PURE__ */ $.basicType("uint32") }, { name: "F32", key: "F32", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export class chanCounter {
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

	public clone(): chanCounter {
		return new chanCounter(this, true)
	}

	public __goscriptAssign(source: chanCounter): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
	}

	public async Next(): globalThis.Promise<number> {
		const c: chanCounter | $.VarRef<chanCounter> | null = this;
		calls++
		return await $.chanRecv($.pointerValue<chanCounter>(c).ch) % 3
	}

	static __typeInfo = $.registerStructType(
		"main.chanCounter",
		() => new chanCounter(),
		() => [{ name: "Next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		chanCounter,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export let calls = 0

export function __goscript_set_calls(__goscriptValue: number): void {
	calls = __goscriptValue
}

export function idx(): number {
	calls++
	return calls % 3
}

export function key(): string {
	calls++
	return "k"
}

export let pt: point | $.VarRef<point> | null = new point()

export function __goscript_set_pt(__goscriptValue: point | $.VarRef<point> | null): void {
	pt = __goscriptValue
}

export function ptr(): point | $.VarRef<point> | null {
	calls++
	return pt
}

export function arr(): $.VarRef<number[]> | null {
	calls++
	return backing
}

export let backing: $.VarRef<number[]> = $.varRef($.arrayValue(globalThis.Array.from({ length: 3 }, () => 0)))

export function __goscript_set_backing(__goscriptValue: number[]): void {
	backing.value = __goscriptValue
}

export async function fill(ch: $.Channel<number> | null): globalThis.Promise<void> {
	for (let i = 1; i <= 3; i++) {
		await $.chanSend(ch, i)
	}
}

export async function main(): globalThis.Promise<void> {
	let s = $.arrayToSlice<number>([10, 20, 30])

	// Slice index from a call.
	calls = 0
	const __goscriptOperand0 = idx()
	$.sliceElems(s!)[$.sliceSlot(s!, __goscriptOperand0)] += 5
	await $.println("slice +=", $.arrayIndex(s!, 0), $.arrayIndex(s!, 1), $.arrayIndex(s!, 2), calls)

	calls = 0
	$.sliceElems(s!)[$.sliceSlot(s!, idx())]++
	await $.println("slice ++", $.arrayIndex(s!, 0), $.arrayIndex(s!, 1), $.arrayIndex(s!, 2), calls)

	calls = 0
	const __goscriptOperand1 = idx()
	$.sliceElems(s!)[$.sliceSlot(s!, __goscriptOperand1)] <<= 1
	await $.println("slice <<=", $.arrayIndex(s!, 0), $.arrayIndex(s!, 1), $.arrayIndex(s!, 2), calls)

	// Array index from a call.
	let a = $.arrayValue([1, 2, 3])
	calls = 0
	const __goscriptOperand2 = idx()
	a[__goscriptOperand2] *= 7
	await $.println("array *=", $.arrayIndex(a, 0), $.arrayIndex(a, 1), $.arrayIndex(a, 2), calls)

	calls = 0
	a[idx()]--
	await $.println("array --", $.arrayIndex(a, 0), $.arrayIndex(a, 1), $.arrayIndex(a, 2), calls)

	// Map index from a call.
	let m = $.makeMap<string, number>([["k", 1]])
	calls = 0
	const __goscriptMap0 = m
	const __goscriptMapKey0 = key()
	$.mapSet(__goscriptMap0, __goscriptMapKey0, $.mapGet<string, number, number>(__goscriptMap0, __goscriptMapKey0, 0)[0] + (4))
	await $.println("map +=", $.mapGet<string, number, number>(m, "k", 0)[0], calls)

	calls = 0
	const __goscriptMap1 = m
	const __goscriptMapKey1 = key()
	$.mapSet(__goscriptMap1, __goscriptMapKey1, $.mapGet<string, number, number>(__goscriptMap1, __goscriptMapKey1, 0)[0] + (1))
	await $.println("map ++", $.mapGet<string, number, number>(m, "k", 0)[0], calls)

	// Field of a pointer returned by a call.
	calls = 0
	const __goscriptOperand3 = ptr()
	$.pointerValue<point>(__goscriptOperand3).X += 3
	await $.println("field +=", $.pointerValue<point>(pt).X, calls)

	calls = 0
	$.pointerValue<point>(ptr()).X++
	await $.println("field ++", $.pointerValue<point>(pt).X, calls)

	calls = 0
	const __goscriptOperand4 = ptr()
	$.pointerValue<point>(__goscriptOperand4).S += "ab"
	await $.println("string field +=", $.pointerValue<point>(pt).S, calls)

	// Pointer to array from a call, indexed by a call.
	calls = 0
	const __goscriptOperand5 = arr()
	const __goscriptOperand6 = idx()
	$.pointerValue<number[]>(__goscriptOperand5)[__goscriptOperand6] += 9
	await $.println("array ptr +=", $.arrayIndex(backing.value, 0), $.arrayIndex(backing.value, 1), $.arrayIndex(backing.value, 2), calls)

	// Narrow integer element.
	let b = new Uint8Array([250, 251, 252]) as $.Slice<number>
	calls = 0
	const __goscriptOperand7 = idx()
	$.sliceElems(b!)[$.sliceSlot(b!, __goscriptOperand7)] = $.uint($.sliceElems(b!)[$.sliceSlot(b!, __goscriptOperand7)] + (10), 8)
	await $.println("byte +=", $.arrayIndex(b!, 0), $.arrayIndex(b!, 1), $.arrayIndex(b!, 2), calls)

	// String element.
	let ss = $.arrayToSlice<string>(["a", "b", "c"])
	calls = 0
	const __goscriptOperand8 = idx()
	$.sliceElems(ss!)[$.sliceSlot(ss!, __goscriptOperand8)] += "z"
	await $.println("string +=", $.arrayIndex(ss!, 0), $.arrayIndex(ss!, 1), $.arrayIndex(ss!, 2), calls)

	// Dereference of a call result.
	calls = 0
	const __goscriptOperand9 = ptr();
	;($.fieldRef($.pointerValue<point>(__goscriptOperand9)._fields, "X"))!.value += 2
	await $.println("deref +=", $.pointerValue<point>(pt).X, calls)

	// Narrow, wide, unsigned and float32 fields.
	$.pointerValue<point>(pt).U8 = 255
	calls = 0
	const __goscriptOperand10 = ptr()
	$.pointerValue<point>(__goscriptOperand10).U8 = (($.pointerValue<point>(__goscriptOperand10).U8 + 1) & 0xff)
	await $.println("uint8 field ++", $.pointerValue<point>(pt).U8, calls)

	calls = 0
	const __goscriptOperand11 = ptr()
	$.pointerValue<point>(__goscriptOperand11).I64 = $.int64Sub($.pointerValue<point>(__goscriptOperand11).I64, 7n)
	await $.println("int64 field -=", $.pointerValue<point>(pt).I64, calls)

	$.pointerValue<point>(pt).U32 = 2147483648
	calls = 0
	const __goscriptOperand12 = ptr()
	$.pointerValue<point>(__goscriptOperand12).U32 = ($.pointerValue<point>(__goscriptOperand12).U32 >>> (3)) >>> 0
	await $.println("uint32 field >>=", $.pointerValue<point>(pt).U32, calls)

	$.pointerValue<point>(pt).F32 = 1.5
	calls = 0
	const __goscriptOperand13 = ptr()
	$.pointerValue<point>(__goscriptOperand13).F32 = globalThis.Math.fround($.pointerValue<point>(__goscriptOperand13).F32 * (3))
	await $.println("float32 field *=", $.pointerValue<point>(pt).F32, calls)

	// Integer division.
	let q = $.arrayToSlice<number>([7, -9, 11])
	calls = 0
	const __goscriptOperand14 = idx()
	$.sliceElems(q!)[$.sliceSlot(q!, __goscriptOperand14)] = globalThis.Math.trunc($.sliceElems(q!)[$.sliceSlot(q!, __goscriptOperand14)] / 2)
	await $.println("int /=", $.arrayIndex(q!, 0), $.arrayIndex(q!, 1), $.arrayIndex(q!, 2), calls)

	calls = 0
	const __goscriptOperand15 = idx()
	$.sliceElems(q!)[$.sliceSlot(q!, __goscriptOperand15)] %= 4
	await $.println("int %=", $.arrayIndex(q!, 0), $.arrayIndex(q!, 1), $.arrayIndex(q!, 2), calls)

	// A for loop post statement and an if statement init.
	let sum = $.arrayToSlice<number>([0, 0, 0])
	calls = 0
	for (let __goscriptSliceWindow0 = $.sliceRange(sum), n = 0; n < 3; (() => { const __goscriptOperand16 = idx();
	;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, __goscriptOperand16)] += n })()) {
		n++
	}
	await $.println("for post", $.arrayIndex(sum!, 0), $.arrayIndex(sum!, 1), $.arrayIndex(sum!, 2), calls)

	calls = 0
	for (let n = 0; n < 3; (() => { const __goscriptMap2 = m
	const __goscriptMapKey2 = key()
	$.mapSet(__goscriptMap2, __goscriptMapKey2, $.mapGet<string, number, number>(__goscriptMap2, __goscriptMapKey2, 0)[0] + (1)) })()) {
		n++
	}
	await $.println("for post map", $.mapGet<string, number, number>(m, "k", 0)[0], calls)

	calls = 0
	{
		const __goscriptOperand17 = idx()
		$.sliceElems(s!)[$.sliceSlot(s!, __goscriptOperand17)] -= 1
		if ($.arrayIndex(s!, 1) > 0) {
			await $.println("if init", $.arrayIndex(s!, 0), $.arrayIndex(s!, 1), $.arrayIndex(s!, 2), calls)
		}
	}

	// A slice captured by a closure, indexed by a call.
	let captured = $.arrayToSlice<number>([1, 2, 3])
	let bump = $.functionValue(() => {
		const __goscriptOperand18 = idx()
		$.sliceElems(captured!)[$.sliceSlot(captured!, __goscriptOperand18)] += 100
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
	calls = 0
	bump()
	await $.println("closure +=", $.arrayIndex(captured!, 0), $.arrayIndex(captured!, 1), $.arrayIndex(captured!, 2), calls)

	// An index from an async interface method.
	let ch = $.makeChannel<number>(3, 0, "both")
	const __goscriptDeferArg0 = ch
	queueMicrotask(async () => { await fill(__goscriptDeferArg0) })
	let c: counter | null = $.interfaceValue<counter | null>(new chanCounter({ch: ch}), "*main.chanCounter", /* @__PURE__ */ $.pointerType("main.chanCounter"))
	let vals = $.arrayToSlice<number>([0, 0, 0])
	calls = 0
	const __goscriptOperand19 = (__goscriptAwait = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as Exclude<counter, null>) : $.pointerValue<Exclude<counter, null>>(c)).Next(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	$.sliceElems(vals!)[$.sliceSlot(vals!, __goscriptOperand19)] += 5
	const __goscriptOperand20 = (__goscriptAwait = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as Exclude<counter, null>) : $.pointerValue<Exclude<counter, null>>(c)).Next(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	$.sliceElems(vals!)[$.sliceSlot(vals!, __goscriptOperand20)] += 6
	await $.println("async index +=", $.arrayIndex(vals!, 0), $.arrayIndex(vals!, 1), $.arrayIndex(vals!, 2), calls)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

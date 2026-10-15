// Generated file based on package_import_iter_pull_sync_seq.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as iter from "@goscript/iter/index.js"

export class point {
	public declare x: number

	public declare y: number

	constructor(init?: Partial<{x?: number, y?: number}>, __goscriptValue?: boolean) {
		this.x = init?.x ?? (0 as number)
		this.y = init?.y ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(this, true)
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

export function numbers(n: number): iter.Seq<number> | null {
	return $.functionValue(async (_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => {
		for (let __goscriptRangeCount0 = n, i = 0; i < __goscriptRangeCount0; i++) {
			if (!(__goscriptAwait = _yield!(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
				return
			}
		}
	}, ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo))
}

export function points(n: number): iter.Seq2<string, point> | null {
	return $.functionValue(async (_yield: ((_p0: string, _p1: point) => boolean | globalThis.Promise<boolean>) | null) => {
		let names = $.arrayToSlice<string>(["a", "b", "c"])
		for (let __goscriptRangeCount1 = n, i = 0; i < __goscriptRangeCount1; i++) {
			if (!(__goscriptAwait = _yield!($.arrayIndex(names!, i), new point({x: i, y: i * 10}, true)), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
				return
			}
		}
	}, ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), "main.point"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo))
}

export async function sum(seq: ((_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => void) | null): globalThis.Promise<number> {
	let total = 0
	let __goscriptRangeReturn0 = false
	let __goscriptRangeReturnValue0: number | undefined
	;await (async () => {
		await seq!(async (v) => {
			total += v
			return true
		})
	})()
	if (__goscriptRangeReturn0) {
		return __goscriptRangeReturnValue0!
	}
	return total
}

export async function pullAll(seq: ((_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => void) | null): globalThis.Promise<$.Slice<number>> {
	await using __defer = new $.AsyncDisposableStack()
	let __goscriptTuple0: any = iter.Pull(__goscriptStatic0(), seq)
	let next: (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null = (__goscriptTuple0[0] as (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null)
	let stop: (() => void) | null = __goscriptTuple0[1]
	const __goscriptDeferCallee0 = stop
	__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee0!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })
	let out: $.Slice<number> = null! as $.Slice<number>
	while (true) {
		let [v, ok] = await next!()
		if (!ok) {
			return out
		}
		out = $.appendOne(out, v)
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export async function zip(a: ((_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => void) | null, b: ((_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => void) | null): globalThis.Promise<$.Slice<number[]>> {
	await using __defer = new $.AsyncDisposableStack()
	let __goscriptTuple1: any = iter.Pull(__goscriptStatic0(), a)
	let nextA: (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null = (__goscriptTuple1[0] as (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null)
	let stopA: (() => void) | null = __goscriptTuple1[1]
	const __goscriptDeferCallee1 = stopA
	__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee1!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })
	let __goscriptTuple2: any = iter.Pull(__goscriptStatic0(), b)
	let nextB: (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null = (__goscriptTuple2[0] as (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null)
	let stopB: (() => void) | null = __goscriptTuple2[1]
	const __goscriptDeferCallee2 = stopB
	__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee2!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })
	let out: $.Slice<number[]> = null! as $.Slice<number[]>
	while (true) {
		let [va, okA] = await nextA!()
		let [vb, okB] = await nextB!()
		if (!okA || !okB) {
			return out
		}
		out = $.appendOne(out, $.arrayValue([va, vb]))
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export async function main(): globalThis.Promise<void> {
	// A pulled sequence returns its values in order.
	for (let __goscriptRangeTarget0 = await pullAll(numbers(4)), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number)
		await $.println("pulled:", v)
	}
	await $.println("sum:", await sum(numbers(4)))
	for (let __goscriptRangeTarget1 = await zip(numbers(3), numbers(5)), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let pair = $.cloneArrayValue((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number[]), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
		await $.println("zip:", $.arrayIndex(pair, 0), $.arrayIndex(pair, 1))
	}

	// Pull2 returns zero values of its element types at the end.
	let __goscriptTuple3: any = iter.Pull2(__goscriptStatic1(), points(2))
	let next: (() => [string, point, boolean] | globalThis.Promise<[string, point, boolean]>) | null = (__goscriptTuple3[0] as (() => [string, point, boolean] | globalThis.Promise<[string, point, boolean]>) | null)
	let stop: (() => void) | null = __goscriptTuple3[1]
	while (true) {
		let [name, p, ok] = await next!()
		await $.println("point:", name, p.x, p.y, ok)
		if (!ok) {
			break
		}
	}
	void (__goscriptAwait = stop!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)

	// An explicit instantiation and a function value of Pull work too.
	let __goscriptTuple4: any = iter.Pull(__goscriptStatic0(), numbers(2))
	let nextInt: (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null = (__goscriptTuple4[0] as (() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null)
	let stopInt: (() => void) | null = __goscriptTuple4[1]
	let [v, ok] = await nextInt!()
	await $.println("explicit:", v, ok)
	void (__goscriptAwait = stopInt!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let pull: ((seq: ((_yield: ((_p0: number) => boolean | globalThis.Promise<boolean>) | null) => void) | null) => [(() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null, (() => void) | null] | globalThis.Promise<[(() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null, (() => void) | null]>) | null = $.functionValue((seq: iter.Seq<any> | null): [(() => [any, boolean] | globalThis.Promise<[any, boolean]>) | null, (() => void) | null] => iter.Pull(__goscriptStatic0(), seq), ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, name: "iter.Seq", params: [({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)], results: [({ kind: $.TypeKind.Function, params: [], results: [{ kind: $.TypeKind.Interface, methods: [] }, /* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)] } as $.FunctionTypeInfo))
	let [nextValue, stopValue] = (pull!(numbers(2)) as [(() => [number, boolean] | globalThis.Promise<[number, boolean]>) | null, (() => void) | null])
	let __goscriptTuple5: any = await nextValue!()
	v = __goscriptTuple5[0]
	ok = __goscriptTuple5[1]
	await $.println("value:", v, ok)
	void (__goscriptAwait = stopValue!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let __goscriptTuple6: any = await nextValue!()
	ok = __goscriptTuple6[1]
	await $.println("value after stop:", ok)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, V: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, K: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }, V: { type: "main.point", zero: () => new point(undefined, true) }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

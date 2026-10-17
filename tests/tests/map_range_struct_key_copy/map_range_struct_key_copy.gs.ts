// Generated file based on map_range_struct_key_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Line: number

	public declare Char: number

	constructor(__goscriptValue?: boolean, Line$?: number, Char$?: number) {
		this.Line = Line$ ?? 0
		this.Char = Char$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pos {
		return new Pos(true, this.Line, this.Char)
	}

	public __goscriptAssign(source: Pos): this {
		this.Line = source.Line
		this.Char = source.Char
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pos",
		() => new Pos(),
		() => [],
		Pos,
		() => [{ name: "Line", key: "Line", type: /* @__PURE__ */ $.basicType("int") }, { name: "Char", key: "Char", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Key {
	public declare P: Pos

	public declare Name: string

	constructor(__goscriptValue?: boolean, P$?: Pos, Name$?: string) {
		this.P = P$ ?? new Pos(true)
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Key {
		return new Key(true, this.P.clone(), this.Name)
	}

	public __goscriptAssign(source: Key): this {
		this.P.__goscriptAssign(source.P)
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Key",
		() => new Key(),
		() => [],
		Key,
		() => [{ name: "P", key: "P", type: "main.Pos" }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let m = $.makeMap<Pos, string>([[new Pos(true, 1, 2), "a"]])
	for (const [__goscriptRangeKey0, __rangeValue] of m?.entries() ?? []) {
		let k = (__goscriptRangeKey0).clone()
		k.Line = 77
	}
	for (const [__goscriptRangeKey1, v] of m?.entries() ?? []) {
		let k = (__goscriptRangeKey1).clone()
		k.Char = 88
		await $.println(v, k.Line, k.Char)
	}
	await $.println($.len(m), $.mapGet<Pos, string, string>(m, new Pos(true, 1, 2), "")[0])
	for (const [k, __rangeValue] of m?.entries() ?? []) {
		await $.println(k.Line, k.Char)
	}

	let n = $.makeMap<Key, number>([[new Key(true, new Pos(true, 3, 4), "x"), 5]])
	let saved: $.Slice<Key> = null! as $.Slice<Key>
	for (const [__goscriptRangeKey2, __rangeValue] of n?.entries() ?? []) {
		let k = (__goscriptRangeKey2).clone()
		saved = $.appendOne(saved, (k).clone())
		k.P.Line = 9
	}
	await $.println($.mapGet<Key, number, number>(n, new Key(true, new Pos(true, 3, 4), "x"), 0)[0], $.arrayIndex(saved!, 0).P.Line)

	let vals = $.makeMap<string, Pos>([["v", new Pos(true, 5, 6)]])
	for (const [__rangeKey, __goscriptRangeValue0] of vals?.entries() ?? []) {
		let v = (__goscriptRangeValue0).clone()
		v.Line = 66
	}
	let arrs = $.makeMap<string, number[]>([["a", $.arrayValue([1, 2])]])
	for (const [__rangeKey, __goscriptRangeValue1] of arrs?.entries() ?? []) {
		let a = $.cloneArrayValue(__goscriptRangeValue1, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
		a[0] = 9
	}
	await $.println($.mapGet<string, Pos, Pos>(vals, "v", new Pos(true))[0].Line, ($.mapGet<string, number[], number[]>(arrs, "a", $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)))[0])[0])

	let last: Pos = new Pos(true)
	for (const [__goscriptRangeKey3, __rangeValue] of m?.entries() ?? []) {
		last = (__goscriptRangeKey3).clone()
		last.Line = 55
	}
	await $.println($.mapGet<Pos, string, string>(m, new Pos(true, 1, 2), "")[0], last.Line)
}

if ($.isMainScript(import.meta)) {
	await main()
}

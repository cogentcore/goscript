// Generated file based on map_range_struct_key_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public get Line(): number {
		return this._fields.Line
	}

	public set Line(value: number) {
		this._fields.Line = value
	}

	public get Char(): number {
		return this._fields.Char
	}

	public set Char(value: number) {
		this._fields.Char = value
	}

	public _fields: {
		Line: number
		Char: number
	}

	constructor(init?: Partial<{Line?: number, Char?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Line: init?.Line ?? (0 as number),
			Char: init?.Char ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pos {
		return new Pos(this, true)
	}

	public __goscriptAssign(source: Pos): void {
		const target = this._fields
		const values = source._fields
		target.Line = values.Line
		target.Char = values.Char
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
	public get P(): Pos {
		return this._fields.P
	}

	public set P(value: Pos) {
		this._fields.P = value
	}

	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		P: Pos
		Name: string
	}

	constructor(init?: Partial<{P?: Pos, Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			P: init?.P ? init.P.clone() : new Pos(undefined, true),
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Key {
		return new Key(this, true)
	}

	public __goscriptAssign(source: Key): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.P, values.P)
		target.Name = values.Name
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
	let m = $.makeMap<Pos, string>([[new Pos({Line: 1, Char: 2}, true), "a"]])
	for (let [__goscriptRangeKey0, __rangeValue] of m?.entries() ?? []) {
		let k = (__goscriptRangeKey0).clone()
		k.Line = 77
	}
	for (let [__goscriptRangeKey1, v] of m?.entries() ?? []) {
		let k = (__goscriptRangeKey1).clone()
		k.Char = 88
		await $.println(v, k.Line, k.Char)
	}
	await $.println($.len(m), $.mapGet<Pos, string, string>(m, new Pos({Line: 1, Char: 2}, true), "")[0])
	for (const [k, __rangeValue] of m?.entries() ?? []) {
		await $.println(k.Line, k.Char)
	}

	let n = $.makeMap<Key, number>([[new Key({P: new Pos({Line: 3, Char: 4}, true), Name: "x"}, true), 5]])
	let saved: $.Slice<Key> = null! as $.Slice<Key>
	for (let [__goscriptRangeKey2, __rangeValue] of n?.entries() ?? []) {
		let k = (__goscriptRangeKey2).clone()
		saved = $.appendOne(saved, (k).clone())
		k.P.Line = 9
	}
	await $.println($.mapGet<Key, number, number>(n, new Key({P: new Pos({Line: 3, Char: 4}, true), Name: "x"}, true), 0)[0], $.arrayIndex(saved!, 0).P.Line)

	let vals = $.makeMap<string, Pos>([["v", new Pos({Line: 5, Char: 6}, true)]])
	for (let [__rangeKey, __goscriptRangeValue0] of vals?.entries() ?? []) {
		let v = (__goscriptRangeValue0).clone()
		v.Line = 66
	}
	let arrs = $.makeMap<string, number[]>([["a", $.arrayValue([1, 2])]])
	for (let [__rangeKey, __goscriptRangeValue1] of arrs?.entries() ?? []) {
		let a = $.cloneArrayValue(__goscriptRangeValue1, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
		a[0] = 9
	}
	await $.println($.mapGet<string, Pos, Pos>(vals, "v", new Pos(undefined, true))[0].Line, $.arrayIndex($.mapGet<string, number[], number[]>(arrs, "a", $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)))[0], 0))

	let last: Pos = new Pos(undefined, true)
	for (let [__goscriptRangeKey3, __rangeValue] of m?.entries() ?? []) {
		last = (__goscriptRangeKey3).clone()
		last.Line = 55
	}
	await $.println($.mapGet<Pos, string, string>(m, new Pos({Line: 1, Char: 2}, true), "")[0], last.Line)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on struct_move_dead_locals.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class pos {
	public declare Line: number

	public declare Char: number

	constructor(__goscriptValue?: boolean, Line$?: number, Char$?: number) {
		this.Line = Line$ ?? 0
		this.Char = Char$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pos {
		return new pos(true, this.Line, this.Char)
	}

	public __goscriptAssign(source: pos): this {
		this.Line = source.Line
		this.Char = source.Char
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.pos",
		() => new pos(),
		() => [],
		pos,
		() => [{ name: "Line", key: "Line", type: /* @__PURE__ */ $.basicType("int") }, { name: "Char", key: "Char", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class token {
	public declare Kind: number

	public declare At: pos

	constructor(__goscriptValue?: boolean, Kind$?: number, At$?: pos) {
		this.Kind = Kind$ ?? 0
		this.At = At$ ?? new pos(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): token {
		return new token(true, this.Kind, this.At.clone())
	}

	public __goscriptAssign(source: token): this {
		this.Kind = source.Kind
		this.At.__goscriptAssign(source.At)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.token",
		() => new token(),
		() => [],
		token,
		() => [{ name: "Kind", key: "Kind", type: /* @__PURE__ */ $.basicType("int") }, { name: "At", key: "At", type: "main.pos" }]
	)
}

export let saved: token = new token(true)

export function __goscript_set_saved(__goscriptValue: token): void {
	$.assignStruct(saved, __goscriptValue)
}

export async function main(): globalThis.Promise<void> {
	// A local appended last is moved: the slice holds its value.
	let toks: $.Slice<token> = null! as $.Slice<token>
	for (let i = 0; i < 3; i++) {
		let tok = new token(true, i)
		tok.At.Line = i * 10
		toks = $.appendOne(toks, tok)
	}
	$.arrayIndex(toks!, 0).At.Line = 99
	await $.println($.arrayIndex(toks!, 0).At.Line, $.arrayIndex(toks!, 1).At.Line, $.arrayIndex(toks!, 2).At.Line)

	// A local declared outside the loop is copied at each append.
	let outer: $.Slice<token> = null! as $.Slice<token>
	let cur = new token(true, 7)
	for (let i = 0; i < 3; i++) {
		cur.At.Char = i
		outer = $.appendOne(outer, (cur).clone())
	}
	await $.println($.arrayIndex(outer!, 0).At.Char, $.arrayIndex(outer!, 1).At.Char, $.arrayIndex(outer!, 2).At.Char)

	// A later reference in the same statement keeps the copy.
	let v = new pos(true, 1)
	let w: pos = new pos(true)
	let __goscriptAssign0_0: number = 5
	let __goscriptAssign0_1: pos = (v).clone()
	v.Line = __goscriptAssign0_0
	w = w.__goscriptAssign(__goscriptAssign0_1)
	await $.println(v.Line, w.Line)

	// A local read later is copied; its last read is moved.
	let a = new pos(true, 2)
	let b = (a).clone()
	b.Line = 3
	let m = $.makeMap<number, pos>([])
	$.mapSet(m, 1, (a).clone())
	await $.println(a.Line, b.Line, $.mapGet<number, pos, pos>(m, 1, new pos(true))[0].Line)

	// A field of a dead local is moved into a package variable.
	let t = new token(true, 4, new pos(true, 8))
	saved.__goscriptAssign(t)
	saved.At.Line++
	await $.println(saved.At.Line)

	// A local captured by a function literal is copied.
	let c = new pos(true, 6)
	let _get = $.functionValue((): number => {
		return c.Line
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	let d = (c).clone()
	d.Line = 0
	await $.println(_get(), d.Line)

	// A local whose address is taken is copied.
	let e = $.varRef(new pos(true, 11))
	let pe = e
	let f = (e.value).clone()
	$.pointerValue<pos>(pe).Line = 12
	await $.println(e.value.Line, f.Line)

	// A range variable is copied.
	let copies: $.Slice<pos> = null! as $.Slice<pos>
	for (let __goscriptRangeTarget0 = $.arrayToSlice<pos>([new pos(true, 1), new pos(true, 2)]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let p = ((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as pos)).clone()
		copies = $.appendOne(copies, (p).clone())
	}
	$.arrayIndex(copies!, 0).Line = 9
	await $.println($.arrayIndex(copies!, 0).Line, $.arrayIndex(copies!, 1).Line)

	// A function literal parameter is copied.
	let src = $.arrayToSlice<pos>([new pos(true, 1)])
	let kept: $.Slice<pos> = null! as $.Slice<pos>
	each(src, $.functionValue((p: pos) => {
		kept = $.appendOne(kept, (p).clone())
	}, ({ kind: $.TypeKind.Function, params: ["main.pos"], results: [] } as $.FunctionTypeInfo)))
	$.arrayIndex(kept!, 0).Line = 5
	await $.println($.arrayIndex(src!, 0).Line, $.arrayIndex(kept!, 0).Line)
}

export function each(s: $.Slice<pos>, f: ((_p0: pos) => void) | null): void {
	for (let __goscriptRangeTarget1 = s, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let p = ((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as pos)).clone()
		f!((p).clone())
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on struct_result_copy_elision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Line: number

	public declare Char: number

	constructor(__goscriptValue?: boolean, Line$?: number, Char$?: number) {
		this.Line = Line$ ?? 0
		this.Char = Char$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
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

export class Region {
	public declare Start: Pos

	public declare End: Pos

	constructor(__goscriptValue?: boolean, Start$?: Pos, End$?: Pos) {
		this.Start = Start$ ?? new Pos(true)
		this.End = End$ ?? new Pos(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Region {
		return new Region(true, this.Start.clone(), this.End.clone())
	}

	public __goscriptAssign(source: Region): this {
		this.Start.__goscriptAssign(source.Start)
		this.End.__goscriptAssign(source.End)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Region",
		() => new Region(),
		() => [],
		Region,
		() => [{ name: "Start", key: "Start", type: "main.Pos" }, { name: "End", key: "End", type: "main.Pos" }]
	)
}

export class Rule {
	public declare Name: string

	public declare pos: Pos

	constructor(__goscriptValue?: boolean, Name$?: string, pos$?: Pos) {
		this.Name = Name$ ?? ""
		this.pos = pos$ ?? new Pos(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Rule {
		return new Rule(true, this.Name, this.pos.clone())
	}

	public __goscriptAssign(source: Rule): this {
		this.Name = source.Name
		this.pos.__goscriptAssign(source.pos)
		return this
	}

	public Pos(): Pos {
		const r: Rule | $.VarRef<Rule> | null = this;
		return ($.pointerValue<Rule>(r).pos).clone()
	}

	public ValuePos(): Pos {
		const r = this;
		return (r.pos).clone()
	}

	static __typeInfo = $.registerStructType(
		"main.Rule",
		() => new Rule(),
		() => [{ name: "Pos", args: [], returns: [{ type: "main.Pos" }], pointerReceiver: true }, { name: "ValuePos", args: [], returns: [{ type: "main.Pos" }] }],
		Rule,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "pos", key: "pos", type: "main.Pos" }]
	)
}

export class key {
	public declare a: number

	public declare b: number

	constructor(__goscriptValue?: boolean, a$?: number, b$?: number) {
		this.a = a$ ?? 0
		this.b = b$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): key {
		return new key(true, this.a, this.b)
	}

	public __goscriptAssign(source: key): this {
		this.a = source.a
		this.b = source.b
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.key",
		() => new key(),
		() => [],
		key,
		() => [{ name: "a", key: "a", type: /* @__PURE__ */ $.basicType("int") }, { name: "b", key: "b", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let global: Pos = new Pos(true)

export function __goscript_set_global(__goscriptValue: Pos): void {
	$.assignStruct(global, __goscriptValue)
}

export let saved: Pos | $.VarRef<Pos> | null = null! as Pos | $.VarRef<Pos> | null

export function __goscript_set_saved(__goscriptValue: Pos | $.VarRef<Pos> | null): void {
	saved = __goscriptValue
}

export function globalPos(): Pos {
	return (global).clone()
}

export function named(): Pos {
	let p: $.VarRef<Pos> = $.varRef(new Pos(true))
	saved = p
	p.value.Line = 3
	return (p.value).clone()
}

export function namedDefer(): Pos {
	let p: Pos = new Pos(true)
	using __defer = new $.DisposableStack()
	__defer.defer(() => { (() => {
		p.Char = 9
	})() })
	p.Line = 4
	const __goscriptReturn0: Pos = (p).clone()
	p = __goscriptReturn0
	__defer.dispose()
	return (p).clone()
	throw new globalThis.Error("goscript: unreachable return")
}

export function makeRegion(l: number): Region {
	return new Region(true, new Pos(true, l, 1), new Pos(true, l, 2))
}

export function region(r: Region | $.VarRef<Region> | null): Region {
	return ($.pointerValue<Region>(r)).clone()
}

export function identity(__typeArgs: $.GenericTypeArgs | undefined, v: any): any {
	return $.copyElement(v)
}

export async function main(): globalThis.Promise<void> {
	let r = new Rule(false, "r", new Pos(true, 1, 2))
	let r$: Rule = r == null ? $.pointerTarget<Rule>(r) : (r as any).__isVarRef === true ? (r as any).value : (r as any).__goValue === undefined ? (r as any) : $.pointerTarget<Rule>(r)
	let p = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r))
	p.Line = 10
	await $.println((r$ as Rule).pos.Line, p.Line)

	let v = (r$ as Rule).ValuePos()
	v.Char = 20
	await $.println((r$ as Rule).pos.Char, v.Char)

	global.__goscriptAssign(new Pos(true, 5, 6))
	let g = globalPos()
	g.Line = 50
	await $.println(global.Line, g.Line)

	let n = named()
	n.Line = 30
	await $.println($.pointerValue<Pos>(saved).Line, n.Line)

	let d = namedDefer()
	await $.println(d.Line, d.Char)

	let reg = makeRegion(7)
	reg.Start.Line = 70
	await $.println(reg.Start.Line, reg.End.Line)

	let src = $.varRef(new Region(true, new Pos(true, 1, 1)))
	let cp = region(src)
	cp.Start.Line = 99
	await $.println(src.value.Start.Line, cp.Start.Line)

	let id = ((identity(__goscriptStatic0(), (src.value).clone())).clone() as Region)
	id.End.Char = 42
	await $.println(src.value.End.Char, id.End.Char)

	let arr: Pos[] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => new Pos(true)), /* @__PURE__ */ $.arrayType("main.Pos", 2))
	arr[0].__goscriptAssign((r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r)))
	arr[0].Line = 11
	await $.println((r$ as Rule).pos.Line, arr[0].Line)

	let m = $.makeMap<key, number>([])
	let k = new key(true, 1, 2)
	$.mapSet(m, (k).clone(), 1)
	k.a = 5
	let [, ok] = $.mapGet<key, number, number>(m, k, 0)
	await $.println($.len(m), ok, $.mapGet<key, number, number>(m, new key(true, 1, 2), 0)[0])
	k.a = 1
	await $.println($.mapGet<key, number, number>(m, k, 0)[0])
	$.deleteMapEntry(m, k)
	await $.println($.len(m))

	let m2 = $.makeMap<Pos, Region>([])
	$.mapSet(m2, (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r)), makeRegion(1))
	let q = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r))
	let got = ($.mapGet<Pos, Region, Region>(m2, q, new Region(true))[0]).clone()
	got.Start.Line = 100
	await $.println($.mapGet<Pos, Region, Region>(m2, q, new Region(true))[0].Start.Line, got.Start.Line)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Region", zero: () => new Region(true) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on struct_result_copy_elision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Line: number

	public declare Char: number

	public _fields: {
		Line: number
		Char: number
	}

	constructor(init?: Partial<{Line?: number, Char?: number}>) {
		this._fields = {
			Line: init?.Line ?? (0 as number),
			Char: init?.Char ?? (0 as number)
		}
	}

	public clone(): Pos {
		return $.markAsStructValue(new Pos(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Line", "Char"])
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

	public _fields: {
		Start: Pos
		End: Pos
	}

	constructor(init?: Partial<{Start?: Pos, End?: Pos}>) {
		this._fields = {
			Start: init?.Start ? $.markAsStructValue($.cloneStructValue(init.Start)) : $.markAsStructValue(new Pos()),
			End: init?.End ? $.markAsStructValue($.cloneStructValue(init.End)) : $.markAsStructValue(new Pos())
		}
	}

	public clone(): Region {
		return $.markAsStructValue(new Region(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Start", "End"])
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

	public _fields: {
		Name: string
		pos: Pos
	}

	constructor(init?: Partial<{Name?: string, pos?: Pos}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			pos: init?.pos ? $.markAsStructValue($.cloneStructValue(init.pos)) : $.markAsStructValue(new Pos())
		}
	}

	public clone(): Rule {
		return $.markAsStructValue(new Rule(this))
	}

	public Pos(): Pos {
		const r: Rule | $.VarRef<Rule> | null = this;
		return $.markAsStructValue($.cloneStructValue($.pointerValue<Rule>(r).pos))
	}

	public ValuePos(): Pos {
		const r = this;
		return $.markAsStructValue($.cloneStructValue(r.pos))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "pos"])
	}

	static __typeInfo = $.registerStructType(
		"main.Rule",
		() => new Rule(),
		() => [{ name: "Pos", args: [], returns: [{ type: "main.Pos" }] }, { name: "ValuePos", args: [], returns: [{ type: "main.Pos" }] }],
		Rule,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "pos", key: "pos", type: "main.Pos" }]
	)
}

export class key {
	public declare a: number

	public declare b: number

	public _fields: {
		a: number
		b: number
	}

	constructor(init?: Partial<{a?: number, b?: number}>) {
		this._fields = {
			a: init?.a ?? (0 as number),
			b: init?.b ?? (0 as number)
		}
	}

	public clone(): key {
		return $.markAsStructValue(new key(this))
	}

	static {
		$.bindStructFields(this.prototype, ["a", "b"])
	}

	static __typeInfo = $.registerStructType(
		"main.key",
		() => new key(),
		() => [],
		key,
		() => [{ name: "a", key: "a", type: /* @__PURE__ */ $.basicType("int") }, { name: "b", key: "b", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let global: Pos = $.markAsStructValue(new Pos())

export function __goscript_set_global(__goscriptValue: Pos): void {
	$.assignStruct(global, __goscriptValue)
}

export let saved: Pos | $.VarRef<Pos> | null = null! as Pos | $.VarRef<Pos> | null

export function __goscript_set_saved(__goscriptValue: Pos | $.VarRef<Pos> | null): void {
	saved = __goscriptValue
}

export function globalPos(): Pos {
	return $.markAsStructValue($.cloneStructValue(global))
}

export function named(): Pos {
	let p: $.VarRef<Pos> = $.varRef($.markAsStructValue(new Pos()))
	saved = p
	p.value.Line = 3
	return $.markAsStructValue($.cloneStructValue(p.value))
}

export function namedDefer(): Pos {
	let p: Pos = $.markAsStructValue(new Pos())
	using __defer = new $.DisposableStack()
	__defer.defer(() => { ((): void => {
		p.Char = 9
	})() })
	p.Line = 4
	const __goscriptReturn0: Pos = $.markAsStructValue($.cloneStructValue(p))
	p = __goscriptReturn0
	__defer.dispose()
	return $.markAsStructValue($.cloneStructValue(p))
	throw new globalThis.Error("goscript: unreachable return")
}

export function makeRegion(l: number): Region {
	return $.markAsStructValue(new Region({Start: $.markAsStructValue(new Pos({Line: l, Char: 1})), End: $.markAsStructValue(new Pos({Line: l, Char: 2}))}))
}

export function region(r: Region | $.VarRef<Region> | null): Region {
	return $.markAsStructValue($.cloneStructValue($.pointerValue<Region>(r)))
}

export function identity(__typeArgs: $.GenericTypeArgs | undefined, v: any): any {
	return v
}

export async function main(): globalThis.Promise<void> {
	let r: Rule | $.VarRef<Rule> | null = new Rule({Name: "r", pos: $.markAsStructValue(new Pos({Line: 1, Char: 2}))})
	let p = Rule.prototype.Pos.call(r)
	p.Line = 10
	await $.println($.pointerValue<Rule>(r).pos.Line, p.Line)

	let v = $.markAsStructValue($.cloneStructValue($.pointerValue<Rule>(r))).ValuePos()
	v.Char = 20
	await $.println($.pointerValue<Rule>(r).pos.Char, v.Char)

	$.assignStruct(global, $.markAsStructValue(new Pos({Line: 5, Char: 6})))
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

	let src = $.varRef($.markAsStructValue(new Region({Start: $.markAsStructValue(new Pos({Line: 1, Char: 1}))})))
	let cp = region(src)
	cp.Start.Line = 99
	await $.println(src.value.Start.Line, cp.Start.Line)

	let id = ($.markAsStructValue($.cloneStructValue(identity({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Region", zero: () => $.markAsStructValue(new Region()) }}, $.markAsStructValue($.cloneStructValue(src.value))))) as Region)
	id.End.Char = 42
	await $.println(src.value.End.Char, id.End.Char)

	let arr: Pos[] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => $.markAsStructValue(new Pos())), /* @__PURE__ */ $.arrayType("main.Pos", 2))
	$.assignStruct(arr[0], Rule.prototype.Pos.call(r))
	$.arrayIndex(arr, 0).Line = 11
	await $.println($.pointerValue<Rule>(r).pos.Line, $.arrayIndex(arr, 0).Line)

	let m: globalThis.Map<key, number> | null = $.makeMap<key, number>([])
	let k = $.markAsStructValue(new key({a: 1, b: 2}))
	$.mapSet(m, $.markAsStructValue($.cloneStructValue(k)), 1)
	k.a = 5
	let [, ok] = $.mapGet<key, number, number>(m, k, 0)
	await $.println($.len(m), ok, $.mapGet<key, number, number>(m, $.markAsStructValue(new key({a: 1, b: 2})), 0)[0])
	k.a = 1
	await $.println($.mapGet<key, number, number>(m, k, 0)[0])
	$.deleteMapEntry(m, $.markAsStructValue($.cloneStructValue(k)))
	await $.println($.len(m))

	let m2: globalThis.Map<Pos, Region> | null = $.makeMap<Pos, Region>([])
	$.mapSet(m2, Rule.prototype.Pos.call(r), makeRegion(1))
	let q = Rule.prototype.Pos.call(r)
	let got = $.markAsStructValue($.cloneStructValue($.mapGet<Pos, Region, Region>(m2, q, $.markAsStructValue(new Region()))[0]))
	got.Start.Line = 100
	await $.println($.mapGet<Pos, Region, Region>(m2, q, $.markAsStructValue(new Region()))[0].Start.Line, got.Start.Line)
}

if ($.isMainScript(import.meta)) {
	await main()
}

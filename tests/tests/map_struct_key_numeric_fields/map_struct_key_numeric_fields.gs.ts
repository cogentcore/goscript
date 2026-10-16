// Generated file based on map_struct_key_numeric_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Ln: number

	public declare Ch: number

	constructor(__goscriptValue?: boolean, Ln$?: number, Ch$?: number) {
		this.Ln = Ln$ ?? 0
		this.Ch = Ch$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pos {
		return new Pos(true, this.Ln, this.Ch)
	}

	public __goscriptAssign(source: Pos): this {
		this.Ln = source.Ln
		this.Ch = source.Ch
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pos",
		() => new Pos(),
		() => [],
		Pos,
		() => [{ name: "Ln", key: "Ln", type: /* @__PURE__ */ $.basicType("int") }, { name: "Ch", key: "Ch", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Key {
	public declare Name: string

	public declare At: Pos

	public declare On: boolean

	public declare F: number

	constructor(__goscriptValue?: boolean, Name$?: string, At$?: Pos, On$?: boolean, F$?: number) {
		this.Name = Name$ ?? ""
		this.At = At$ ?? new Pos(true)
		this.On = On$ ?? false
		this.F = F$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Key {
		return new Key(true, this.Name, this.At.clone(), this.On, this.F)
	}

	public __goscriptAssign(source: Key): this {
		this.Name = source.Name
		this.At.__goscriptAssign(source.At)
		this.On = source.On
		this.F = source.F
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Key",
		() => new Key(),
		() => [],
		Key,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "At", key: "At", type: "main.Pos" }, { name: "On", key: "On", type: /* @__PURE__ */ $.basicType("bool") }, { name: "F", key: "F", type: /* @__PURE__ */ $.basicType("float64") }]
	)
}

export class Rule {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Rule {
		return new Rule(true, this.Name)
	}

	public __goscriptAssign(source: Rule): this {
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Rule",
		() => new Rule(),
		() => [],
		Rule,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class ScopeRule {
	public declare Scope: Pos

	public declare Rule: Rule | $.VarRef<Rule> | null

	constructor(__goscriptValue?: boolean, Scope$?: Pos, Rule$?: Rule | $.VarRef<Rule> | null) {
		this.Scope = Scope$ ?? new Pos(true)
		this.Rule = Rule$ ?? (null! as Rule | $.VarRef<Rule> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ScopeRule {
		return new ScopeRule(true, this.Scope.clone(), this.Rule)
	}

	public __goscriptAssign(source: ScopeRule): this {
		this.Scope.__goscriptAssign(source.Scope)
		this.Rule = source.Rule
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.ScopeRule",
		() => new ScopeRule(),
		() => [],
		ScopeRule,
		() => [{ name: "Scope", key: "Scope", type: "main.Pos" }, { name: "Rule", key: "Rule", type: /* @__PURE__ */ $.pointerType("main.Rule") }]
	)
}

export class Pair {
	public declare A: string

	public declare B: string

	constructor(__goscriptValue?: boolean, A$?: string, B$?: string) {
		this.A = A$ ?? ""
		this.B = B$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(true, this.A, this.B)
	}

	public __goscriptAssign(source: Pair): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pair",
		() => new Pair(),
		() => [],
		Pair,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("string") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Other {
	public declare A: string

	public declare B: string

	constructor(__goscriptValue?: boolean, A$?: string, B$?: string) {
		this.A = A$ ?? ""
		this.B = B$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Other {
		return new Other(true, this.A, this.B)
	}

	public __goscriptAssign(source: Other): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Other",
		() => new Other(),
		() => [],
		Other,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("string") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Vec {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Vec {
		return new Vec(true, this.X, this.Y)
	}

	public __goscriptAssign(source: Vec): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Vec",
		() => new Vec(),
		() => [],
		Vec,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("float32") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export class Cplx {
	public declare C: $.Complex

	public declare N: number

	constructor(__goscriptValue?: boolean, C$?: $.Complex, N$?: number) {
		this.C = C$ ?? $.complex(0, 0)
		this.N = N$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Cplx {
		return new Cplx(true, this.C, this.N)
	}

	public __goscriptAssign(source: Cplx): this {
		this.C = source.C
		this.N = source.N
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Cplx",
		() => new Cplx(),
		() => [],
		Cplx,
		() => [{ name: "C", key: "C", type: /* @__PURE__ */ $.basicType("complex128") }, { name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let m = $.makeMap<Key, number>([])
	for (let i = 0; i < 2000; i++) {
		$.mapSet(m, new Key(true, "k", new Pos(true, i, i % 7), (i % 2) == 0, i / 2), i)
	}
	await $.println($.len(m), $.mapGet<Key, number, number>(m, new Key(true, "k", new Pos(true, 10, 3), true, 5), 0)[0], $.mapGet<Key, number, number>(m, new Key(true, "k", new Pos(true, 11, 4), false, 5.5), 0)[0])
	let [, ok] = $.mapGet<Key, number, number>(m, new Key(true, "k", new Pos(true, 10, 3), false, 5), 0)
	await $.println(ok)
	$.deleteMapEntry(m, new Key(true, "k", new Pos(true, 10, 3), true, 5))
	let __goscriptTuple0: any = $.mapGet<Key, number, number>(m, new Key(true, "k", new Pos(true, 10, 3), true, 5), 0)
	ok = __goscriptTuple0[1]
	await $.println($.len(m), ok)
	let z = $.makeMap<Pos, string>([[new Pos(true, 0, 0), "zero"]])
	let negZero = 0.0
	negZero = -negZero
	let fz = $.makeMap<number, number>([[0, 1]])
	await $.println($.mapGet<Pos, string, string>(z, new Pos(true), "")[0], $.mapGet<number, number, number>(fz, negZero, 0)[0])

	let r1 = new Rule(false, "a")
	let r2 = new Rule(false, "a")
	let _set = $.makeMap<ScopeRule, boolean>([])
	for (let i = 0; i < 1000; i++) {
		$.mapSet(_set, new ScopeRule(true, new Pos(true, i, 0), r1), true)
	}
	$.pointerValue<Rule>(r1).Name = "changed"
	await $.println($.len(_set), $.mapGet<ScopeRule, boolean, boolean>(_set, new ScopeRule(true, new Pos(true, 5, 0), r1), false)[0], $.mapGet<ScopeRule, boolean, boolean>(_set, new ScopeRule(true, new Pos(true, 5, 0), r2), false)[0], $.mapGet<ScopeRule, boolean, boolean>(_set, new ScopeRule(true, new Pos(true, 5, 0), null), false)[0])

	// Keys whose field values run together are still distinct keys.
	let pairs = $.makeMap<Pair, number>([[new Pair(true, "x|s", ""), 1], [new Pair(true, "x", "|s"), 2], [new Pair(true, "", "x|s"), 3]])
	await $.println($.len(pairs), $.mapGet<Pair, number, number>(pairs, new Pair(true, "x|s", ""), 0)[0], $.mapGet<Pair, number, number>(pairs, new Pair(true, "x", "|s"), 0)[0], $.mapGet<Pair, number, number>(pairs, new Pair(true, "", "x|s"), 0)[0], $.mapGet<Pair, number, number>(pairs, new Pair(true, "x", "s"), 0)[0])

	// NaN is never equal to itself, and -0 equals 0.
	let nan = globalThis.Math.fround(negZero)
	nan = globalThis.Math.fround(nan / nan)
	let vecs = $.makeMap<Vec, number>([])
	$.mapSet(vecs, new Vec(true, nan, 1), 1)
	$.mapSet(vecs, new Vec(true, nan, 1), 2)
	$.mapSet(vecs, new Vec(true, 0, 1), 3)
	$.mapSet(vecs, new Vec(true, globalThis.Math.fround(negZero), 1), 4)
	let [, nanOK] = $.mapGet<Vec, number, number>(vecs, new Vec(true, nan, 1), 0)
	await $.println($.len(vecs), nanOK, $.mapGet<Vec, number, number>(vecs, new Vec(true, 0, 1), 0)[0])

	// Interface keys of two struct types with the same fields stay apart.
	let anys = $.makeMap<any, number>([[$.structInterfaceValue(new Pair(true, "a", "b"), "main.Pair", "main.Pair"), 1], [$.structInterfaceValue(new Other(true, "a", "b"), "main.Other", "main.Other"), 2]])
	$.mapSet(anys, $.structInterfaceValue(new Pair(true, "a", "b"), "main.Pair", "main.Pair"), 3)
	await $.println($.len(anys), $.mapGet<any, number, number>(anys, $.structInterfaceValue(new Pair(true, "a", "b"), "main.Pair", "main.Pair"), 0)[0], $.mapGet<any, number, number>(anys, $.structInterfaceValue(new Other(true, "a", "b"), "main.Other", "main.Other"), 0)[0])

	// Complex fields compare by value.
	let cs = $.makeMap<Cplx, number>([[new Cplx(true, $.complex(1, 2), 3), 1]])
	$.mapSet(cs, new Cplx(true, $.complex(1, 2), 3), 2)
	await $.println($.len(cs), $.mapGet<Cplx, number, number>(cs, new Cplx(true, $.complex(1, 2), 3), 0)[0], $.mapGet<Cplx, number, number>(cs, new Cplx(true, $.complex(1, 3), 3), 0)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

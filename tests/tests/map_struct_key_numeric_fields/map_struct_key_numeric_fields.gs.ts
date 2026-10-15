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
}

if ($.isMainScript(import.meta)) {
	await main()
}

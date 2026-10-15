// Generated file based on map_struct_key_numeric_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Ln: number

	public declare Ch: number

	constructor(init?: Partial<{Ln?: number, Ch?: number}>, __goscriptValue?: boolean) {
		this.Ln = init?.Ln ?? (0 as number)
		this.Ch = init?.Ch ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pos {
		return new Pos(this, true)
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

	constructor(init?: Partial<{Name?: string, At?: Pos, On?: boolean, F?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.At = init?.At ? init.At.clone() : new Pos(undefined, true)
		this.On = init?.On ?? (false as boolean)
		this.F = init?.F ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Key {
		return new Key(this, true)
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

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Rule {
		return new Rule(this, true)
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

	constructor(init?: Partial<{Scope?: Pos, Rule?: Rule | $.VarRef<Rule> | null}>, __goscriptValue?: boolean) {
		this.Scope = init?.Scope ? init.Scope.clone() : new Pos(undefined, true)
		this.Rule = init?.Rule ?? (null! as Rule | $.VarRef<Rule> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ScopeRule {
		return new ScopeRule(this, true)
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
		$.mapSet(m, new Key({Name: "k", At: new Pos({Ln: i, Ch: i % 7}, true), On: (i % 2) == 0, F: i / 2}, true), i)
	}
	await $.println($.len(m), $.mapGet<Key, number, number>(m, new Key({Name: "k", At: new Pos({Ln: 10, Ch: 3}, true), On: true, F: 5}, true), 0)[0], $.mapGet<Key, number, number>(m, new Key({Name: "k", At: new Pos({Ln: 11, Ch: 4}, true), On: false, F: 5.5}, true), 0)[0])
	let [, ok] = $.mapGet<Key, number, number>(m, new Key({Name: "k", At: new Pos({Ln: 10, Ch: 3}, true), On: false, F: 5}, true), 0)
	await $.println(ok)
	$.deleteMapEntry(m, new Key({Name: "k", At: new Pos({Ln: 10, Ch: 3}, true), On: true, F: 5}, true))
	let __goscriptTuple0: any = $.mapGet<Key, number, number>(m, new Key({Name: "k", At: new Pos({Ln: 10, Ch: 3}, true), On: true, F: 5}, true), 0)
	ok = __goscriptTuple0[1]
	await $.println($.len(m), ok)
	let z = $.makeMap<Pos, string>([[new Pos({Ln: 0, Ch: 0}, true), "zero"]])
	let negZero = 0.0
	negZero = -negZero
	let fz = $.makeMap<number, number>([[0, 1]])
	await $.println($.mapGet<Pos, string, string>(z, new Pos(undefined, true), "")[0], $.mapGet<number, number, number>(fz, negZero, 0)[0])

	let r1 = new Rule({Name: "a"})
	let r2 = new Rule({Name: "a"})
	let _set = $.makeMap<ScopeRule, boolean>([])
	for (let i = 0; i < 1000; i++) {
		$.mapSet(_set, new ScopeRule({Scope: new Pos({Ln: i, Ch: 0}, true), Rule: r1}, true), true)
	}
	$.pointerValue<Rule>(r1).Name = "changed"
	await $.println($.len(_set), $.mapGet<ScopeRule, boolean, boolean>(_set, new ScopeRule({Scope: new Pos({Ln: 5, Ch: 0}, true), Rule: r1}, true), false)[0], $.mapGet<ScopeRule, boolean, boolean>(_set, new ScopeRule({Scope: new Pos({Ln: 5, Ch: 0}, true), Rule: r2}, true), false)[0], $.mapGet<ScopeRule, boolean, boolean>(_set, new ScopeRule({Scope: new Pos({Ln: 5, Ch: 0}, true), Rule: null}, true), false)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

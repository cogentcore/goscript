// Generated file based on map_struct_key_numeric_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public get Ln(): number {
		return this._fields.Ln
	}

	public set Ln(value: number) {
		this._fields.Ln = value
	}

	public get Ch(): number {
		return this._fields.Ch
	}

	public set Ch(value: number) {
		this._fields.Ch = value
	}

	public _fields: {
		Ln: number
		Ch: number
	}

	constructor(init?: Partial<{Ln?: number, Ch?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Ln: init?.Ln ?? (0 as number),
			Ch: init?.Ch ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pos {
		return new Pos(this, true)
	}

	public __goscriptAssign(source: Pos): void {
		const target = this._fields
		const values = source._fields
		target.Ln = values.Ln
		target.Ch = values.Ch
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
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get At(): Pos {
		return this._fields.At
	}

	public set At(value: Pos) {
		this._fields.At = value
	}

	public get On(): boolean {
		return this._fields.On
	}

	public set On(value: boolean) {
		this._fields.On = value
	}

	public get F(): number {
		return this._fields.F
	}

	public set F(value: number) {
		this._fields.F = value
	}

	public _fields: {
		Name: string
		At: Pos
		On: boolean
		F: number
	}

	constructor(init?: Partial<{Name?: string, At?: Pos, On?: boolean, F?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			At: init?.At ? init.At.clone() : new Pos(undefined, true),
			On: init?.On ?? (false as boolean),
			F: init?.F ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Key {
		return new Key(this, true)
	}

	public __goscriptAssign(source: Key): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		$.assignStruct(target.At, values.At)
		target.On = values.On
		target.F = values.F
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
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Rule {
		return new Rule(this, true)
	}

	public __goscriptAssign(source: Rule): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
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
	public get Scope(): Pos {
		return this._fields.Scope
	}

	public set Scope(value: Pos) {
		this._fields.Scope = value
	}

	public get Rule(): Rule | $.VarRef<Rule> | null {
		return this._fields.Rule
	}

	public set Rule(value: Rule | $.VarRef<Rule> | null) {
		this._fields.Rule = value
	}

	public _fields: {
		Scope: Pos
		Rule: Rule | $.VarRef<Rule> | null
	}

	constructor(init?: Partial<{Scope?: Pos, Rule?: Rule | $.VarRef<Rule> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Scope: init?.Scope ? init.Scope.clone() : new Pos(undefined, true),
			Rule: init?.Rule ?? (null! as Rule | $.VarRef<Rule> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ScopeRule {
		return new ScopeRule(this, true)
	}

	public __goscriptAssign(source: ScopeRule): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Scope, values.Scope)
		target.Rule = values.Rule
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

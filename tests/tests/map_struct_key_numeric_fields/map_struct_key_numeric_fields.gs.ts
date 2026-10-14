// Generated file based on map_struct_key_numeric_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Ln: number

	public declare Ch: number

	public _fields: {
		Ln: number
		Ch: number
	}

	constructor(init?: Partial<{Ln?: number, Ch?: number}>) {
		this._fields = {
			Ln: init?.Ln ?? (0 as number),
			Ch: init?.Ch ?? (0 as number)
		}
	}

	public clone(): Pos {
		return $.markAsStructValue(new Pos(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Ln", "Ch"])
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

	public _fields: {
		Name: string
		At: Pos
		On: boolean
		F: number
	}

	constructor(init?: Partial<{Name?: string, At?: Pos, On?: boolean, F?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			At: init?.At ? $.markAsStructValue($.cloneStructValue(init.At)) : $.markAsStructValue(new Pos()),
			On: init?.On ?? (false as boolean),
			F: init?.F ?? (0 as number)
		}
	}

	public clone(): Key {
		return $.markAsStructValue(new Key(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "At", "On", "F"])
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

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Rule {
		return $.markAsStructValue(new Rule(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name"])
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

	public _fields: {
		Scope: Pos
		Rule: Rule | $.VarRef<Rule> | null
	}

	constructor(init?: Partial<{Scope?: Pos, Rule?: Rule | $.VarRef<Rule> | null}>) {
		this._fields = {
			Scope: init?.Scope ? $.markAsStructValue($.cloneStructValue(init.Scope)) : $.markAsStructValue(new Pos()),
			Rule: init?.Rule ?? (null! as Rule | $.VarRef<Rule> | null)
		}
	}

	public clone(): ScopeRule {
		return $.markAsStructValue(new ScopeRule(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Scope", "Rule"])
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
	let m: globalThis.Map<Key, number> | null = $.makeMap<Key, number>([])
	for (let i = 0; i < 2000; i++) {
		$.mapSet(m, $.markAsStructValue(new Key({Name: "k", At: $.markAsStructValue(new Pos({Ln: i, Ch: i % 7})), On: (i % 2) == 0, F: i / 2})), i)
	}
	await $.println($.len(m), $.mapGet<Key, number, number>(m, $.markAsStructValue(new Key({Name: "k", At: $.markAsStructValue(new Pos({Ln: 10, Ch: 3})), On: true, F: 5})), 0)[0], $.mapGet<Key, number, number>(m, $.markAsStructValue(new Key({Name: "k", At: $.markAsStructValue(new Pos({Ln: 11, Ch: 4})), On: false, F: 5.5})), 0)[0])
	let [, ok] = $.mapGet<Key, number, number>(m, $.markAsStructValue(new Key({Name: "k", At: $.markAsStructValue(new Pos({Ln: 10, Ch: 3})), On: false, F: 5})), 0)
	await $.println(ok)
	$.deleteMapEntry(m, $.markAsStructValue(new Key({Name: "k", At: $.markAsStructValue(new Pos({Ln: 10, Ch: 3})), On: true, F: 5})))
	let __goscriptTuple0: any = $.mapGet<Key, number, number>(m, $.markAsStructValue(new Key({Name: "k", At: $.markAsStructValue(new Pos({Ln: 10, Ch: 3})), On: true, F: 5})), 0)
	ok = __goscriptTuple0[1]
	await $.println($.len(m), ok)
	let z: globalThis.Map<Pos, string> | null = $.makeMap<Pos, string>([[$.markAsStructValue(new Pos({Ln: 0, Ch: 0})), "zero"]])
	let negZero = 0.0
	negZero = -negZero
	let fz: globalThis.Map<number, number> | null = $.makeMap<number, number>([[0, 1]])
	await $.println($.mapGet<Pos, string, string>(z, $.markAsStructValue(new Pos()), "")[0], $.mapGet<number, number, number>(fz, negZero, 0)[0])

	let r1: Rule | $.VarRef<Rule> | null = new Rule({Name: "a"})
	let r2: Rule | $.VarRef<Rule> | null = new Rule({Name: "a"})
	let _set: globalThis.Map<ScopeRule, boolean> | null = $.makeMap<ScopeRule, boolean>([])
	for (let i = 0; i < 1000; i++) {
		$.mapSet(_set, $.markAsStructValue(new ScopeRule({Scope: $.markAsStructValue(new Pos({Ln: i, Ch: 0})), Rule: r1})), true)
	}
	$.pointerValue<Rule>(r1).Name = "changed"
	await $.println($.len(_set), $.mapGet<ScopeRule, boolean, boolean>(_set, $.markAsStructValue(new ScopeRule({Scope: $.markAsStructValue(new Pos({Ln: 5, Ch: 0})), Rule: r1})), false)[0], $.mapGet<ScopeRule, boolean, boolean>(_set, $.markAsStructValue(new ScopeRule({Scope: $.markAsStructValue(new Pos({Ln: 5, Ch: 0})), Rule: r2})), false)[0], $.mapGet<ScopeRule, boolean, boolean>(_set, $.markAsStructValue(new ScopeRule({Scope: $.markAsStructValue(new Pos({Ln: 5, Ch: 0})), Rule: null})), false)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

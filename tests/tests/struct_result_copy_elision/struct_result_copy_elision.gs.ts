// Generated file based on struct_result_copy_elision.go
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

export class Region {
	public get Start(): Pos {
		return this._fields.Start
	}

	public set Start(value: Pos) {
		this._fields.Start = value
	}

	public get End(): Pos {
		return this._fields.End
	}

	public set End(value: Pos) {
		this._fields.End = value
	}

	public _fields: {
		Start: Pos
		End: Pos
	}

	constructor(init?: Partial<{Start?: Pos, End?: Pos}>, __goscriptValue?: boolean) {
		this._fields = {
			Start: init?.Start ? init.Start.clone() : new Pos(undefined, true),
			End: init?.End ? init.End.clone() : new Pos(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Region {
		return new Region(this, true)
	}

	public __goscriptAssign(source: Region): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Start, values.Start)
		$.assignStruct(target.End, values.End)
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
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get pos(): Pos {
		return this._fields.pos
	}

	public set pos(value: Pos) {
		this._fields.pos = value
	}

	public _fields: {
		Name: string
		pos: Pos
	}

	constructor(init?: Partial<{Name?: string, pos?: Pos}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			pos: init?.pos ? init.pos.clone() : new Pos(undefined, true)
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
		$.assignStruct(target.pos, values.pos)
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
	public get a(): number {
		return this._fields.a
	}

	public set a(value: number) {
		this._fields.a = value
	}

	public get b(): number {
		return this._fields.b
	}

	public set b(value: number) {
		this._fields.b = value
	}

	public _fields: {
		a: number
		b: number
	}

	constructor(init?: Partial<{a?: number, b?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			a: init?.a ?? (0 as number),
			b: init?.b ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): key {
		return new key(this, true)
	}

	public __goscriptAssign(source: key): void {
		const target = this._fields
		const values = source._fields
		target.a = values.a
		target.b = values.b
	}

	static __typeInfo = $.registerStructType(
		"main.key",
		() => new key(),
		() => [],
		key,
		() => [{ name: "a", key: "a", type: /* @__PURE__ */ $.basicType("int") }, { name: "b", key: "b", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let global: Pos = new Pos(undefined, true)

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
	let p: $.VarRef<Pos> = $.varRef(new Pos(undefined, true))
	saved = p
	p.value.Line = 3
	return (p.value).clone()
}

export function namedDefer(): Pos {
	let p: Pos = new Pos(undefined, true)
	using __defer = new $.DisposableStack()
	__defer.defer(() => { ((): void => {
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
	return new Region({Start: new Pos({Line: l, Char: 1}, true), End: new Pos({Line: l, Char: 2}, true)}, true)
}

export function region(r: Region | $.VarRef<Region> | null): Region {
	return ($.pointerValue<Region>(r)).clone()
}

export function identity(__typeArgs: $.GenericTypeArgs | undefined, v: any): any {
	return $.copyElement(v)
}

export async function main(): globalThis.Promise<void> {
	let r: Rule | $.VarRef<Rule> | null = new Rule({Name: "r", pos: new Pos({Line: 1, Char: 2}, true)})
	let r$: Rule = r == null ? $.pointerTarget<Rule>(r) : (r as any).__isVarRef === true ? (r as any).value : (r as any).__goValue === undefined ? (r as any) : $.pointerTarget<Rule>(r)
	let p = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r))
	p.Line = 10
	await $.println((r$ as Rule).pos.Line, p.Line)

	let v = (r$ as Rule).ValuePos()
	v.Char = 20
	await $.println((r$ as Rule).pos.Char, v.Char)

	$.assignStruct(global, new Pos({Line: 5, Char: 6}, true))
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

	let src = $.varRef(new Region({Start: new Pos({Line: 1, Char: 1}, true)}, true))
	let cp = region(src)
	cp.Start.Line = 99
	await $.println(src.value.Start.Line, cp.Start.Line)

	let id = ((identity(__goscriptStatic0(), (src.value).clone())).clone() as Region)
	id.End.Char = 42
	await $.println(src.value.End.Char, id.End.Char)

	let arr: Pos[] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => new Pos(undefined, true)), /* @__PURE__ */ $.arrayType("main.Pos", 2))
	$.assignStruct(arr[0], (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r)))
	$.arrayIndex(arr, 0).Line = 11
	await $.println((r$ as Rule).pos.Line, $.arrayIndex(arr, 0).Line)

	let m: globalThis.Map<key, number> | null = $.makeMap<key, number>([])
	let k = new key({a: 1, b: 2}, true)
	$.mapSet(m, (k).clone(), 1)
	k.a = 5
	let [, ok] = $.mapGet<key, number, number>(m, k, 0)
	await $.println($.len(m), ok, $.mapGet<key, number, number>(m, new key({a: 1, b: 2}, true), 0)[0])
	k.a = 1
	await $.println($.mapGet<key, number, number>(m, k, 0)[0])
	$.deleteMapEntry(m, (k).clone())
	await $.println($.len(m))

	let m2: globalThis.Map<Pos, Region> | null = $.makeMap<Pos, Region>([])
	$.mapSet(m2, (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r)), makeRegion(1))
	let q = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as Rule).Pos() : Rule.prototype.Pos.call(r))
	let got = ($.mapGet<Pos, Region, Region>(m2, q, new Region(undefined, true))[0]).clone()
	got.Start.Line = 100
	await $.println($.mapGet<Pos, Region, Region>(m2, q, new Region(undefined, true))[0].Start.Line, got.Start.Line)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Region", zero: () => new Region(undefined, true) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

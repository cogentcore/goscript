// Generated file based on struct_borrowed_results.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type matcher = {
	match(scope: Region, depth: number): [boolean, Region, number]
}

$.registerInterfaceType(
	"main.matcher",
	null,
	[{ name: "match", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }, { type: "main.Region" }, { type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Lines = $.Slice<Region>

$.registerNamedType("main.Lines", /* @__PURE__ */ $.sliceType("main.Region"));

$.registerNamedValueType(
	"main.Lines",
	{at: (receiver: any, ...args: any[]) => (Lines_at as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("at", [["reg", "main.Region"]], ["main.Region"])]
);

$.registerNamedValueType(
	"*main.Lines",
	{at: (receiver: any, ...args: any[]) => (Lines_at as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("at", [["reg", "main.Region"]], ["main.Region"])]
);

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

	public bump(): void {
		let r: Region | $.VarRef<Region> | null = this;
		$.pointerValue<Region>(r).Start.Line++
	}

	public span(other: Region, __goscriptBorrow?: boolean): Region {
		const r = this;
		if (other.Start.Line > r.End.Line) {
			return (r).clone()
		}
		return (__goscriptBorrow === true ? other : (other).clone())
	}

	static __typeInfo = $.registerStructType(
		"main.Region",
		() => new Region(),
		() => [{ name: "bump", args: [], returns: [], pointerReceiver: true }, { name: "span", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.Region" }] }],
		Region,
		() => [{ name: "Start", key: "Start", type: "main.Pos" }, { name: "End", key: "End", type: "main.Pos" }]
	)
}

export class rule {
	public get off(): boolean {
		return this._fields.off
	}

	public set off(value: boolean) {
		this._fields.off = value
	}

	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		off: boolean
		name: string
	}

	constructor(init?: Partial<{off?: boolean, name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			off: init?.off ?? (false as boolean),
			name: init?.name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): rule {
		return new rule(this, true)
	}

	public __goscriptAssign(source: rule): void {
		const target = this._fields
		const values = source._fields
		target.off = values.off
		target.name = values.name
	}

	public group(scope: Region, depth: number, __goscriptBorrow?: boolean): [boolean, Region, number] {
		const r: rule | $.VarRef<rule> | null = this;
		if (depth > 10) {
			return [false, (__goscriptBorrow === true ? scope : (scope).clone()), 0]
		}
		return (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, depth + 1, __goscriptBorrow) : rule.prototype.match.call(r, scope, depth + 1, __goscriptBorrow))
	}

	public keep(scope: Region, __goscriptBorrow?: boolean): Region {
		const r: rule | $.VarRef<rule> | null = this;
		let [ok, nscope, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0, true) : rule.prototype.match.call(r, scope, 0, true))
		if (!ok) {
			return (__goscriptBorrow === true ? scope : (scope).clone())
		}
		return (nscope).clone()
	}

	public match(scope: Region, depth: number, __goscriptBorrow?: boolean): [boolean, Region, number] {
		const r: rule | $.VarRef<rule> | null = this;
		calls++
		if ($.pointerValue<rule>(r).off) {
			return [false, (__goscriptBorrow === true ? scope : (scope).clone()), 0]
		}
		if (depth > 3) {
			return [false, (__goscriptBorrow === true ? scope : (scope).clone()), depth]
		}
		if (scope.Start.Line == scope.End.Line) {
			return [true, new Region({Start: scope.Start, End: new Pos({Line: scope.End.Line, Char: scope.End.Char + 1}, true)}, true), depth]
		}
		return [true, (__goscriptBorrow === true ? scope : (scope).clone()), depth]
	}

	static __typeInfo = $.registerStructType(
		"main.rule",
		() => new rule(),
		() => [{ name: "group", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }, { type: "main.Region" }, { type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "keep", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.Region" }], pointerReceiver: true }, { name: "match", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }, { type: "main.Region" }, { type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		rule,
		() => [{ name: "off", key: "off", type: /* @__PURE__ */ $.basicType("bool") }, { name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class outer {
	public get rule(): rule | $.VarRef<rule> | null {
		return this._fields.rule
	}

	public set rule(value: rule | $.VarRef<rule> | null) {
		this._fields.rule = value
	}

	public get Region(): Region {
		return this._fields.Region
	}

	public set Region(value: Region) {
		this._fields.Region = value
	}

	public _fields: {
		rule: rule | $.VarRef<rule> | null
		Region: Region
	}

	constructor(init?: Partial<{rule?: rule | $.VarRef<rule> | null, Region?: Region}>, __goscriptValue?: boolean) {
		this._fields = {
			rule: init?.rule ?? (null! as rule | $.VarRef<rule> | null),
			Region: init?.Region ? init.Region.clone() : new Region(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(this, true)
	}

	public __goscriptAssign(source: outer): void {
		const target = this._fields
		const values = source._fields
		target.rule = values.rule
		$.assignStruct(target.Region, values.Region)
	}

	public group(scope: any, depth: any): any {
		return $.pointerValue<rule>(this.rule).group(scope, depth)
	}

	public keep(scope: any): any {
		return $.pointerValue<rule>(this.rule).keep(scope)
	}

	public match(scope: any, depth: any): any {
		return $.pointerValue<rule>(this.rule).match(scope, depth)
	}

	public bump(): any {
		return $.pointerValue<Region>(this.Region).bump()
	}

	public span(other: any): any {
		return $.pointerValue<Region>(this.Region).span(other)
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [{ name: "group", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }, { type: "main.Region" }, { type: /* @__PURE__ */ $.basicType("int") }] }, { name: "keep", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.Region" }] }, { name: "match", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }, { type: "main.Region" }, { type: /* @__PURE__ */ $.basicType("int") }] }, { name: "bump", args: [], returns: [], pointerReceiver: true }, { name: "span", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.Region" }] }],
		outer,
		() => [{ name: "rule", key: "rule", type: /* @__PURE__ */ $.pointerType("main.rule"), anonymous: true }, { name: "Region", key: "Region", type: "main.Region", anonymous: true }]
	)
}

export let calls: number = 0

export function __goscript_set_calls(__goscriptValue: number): void {
	calls = __goscriptValue
}

export function first(a: Region, __goscriptBorrow?: boolean): Region {
	if (a.Start.Line < 0) {
		return new Region(undefined, true)
	}
	return (__goscriptBorrow === true ? a : (a).clone())
}

export function Lines_at(l: Lines, reg: Region, __goscriptBorrow?: boolean): Region {
	if ($.sliceLen((l as Lines)) == 0) {
		return (__goscriptBorrow === true ? reg : (reg).clone())
	}
	return ($.arrayIndex(l!, 0)).clone()
}

export function reads(r: rule | $.VarRef<rule> | null, scope: Region): number {
	let [ok, nscope, depth] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0, true) : rule.prototype.match.call(r, scope, 0, true))
	let sum = (nscope.Start.Line + nscope.End.Char) + depth
	if (ok) {
		let [, again, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(nscope, 1, true) : rule.prototype.match.call(r, nscope, 1, true))
		sum += again.End.Line
	}
	let [, changed, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0) : rule.prototype.match.call(r, scope, 0))
	changed.Start.Line = 99
	sum += changed.Start.Line + scope.Start.Line
	for (let i = 0; i < 2; i++) {
		let [, inLoop, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, i, true) : rule.prototype.match.call(r, scope, i, true))
		sum += inLoop.Start.Char
	}
	return sum
}

export function grow(scope: Region): Region {
	let n = (scope).clone()
	n.End.Line++
	return n
}

export function twice(scope: Region): [Region, Region] {
	let n = (scope).clone()
	n.Start.Char++
	return [(n).clone(), (n).clone()]
}

export function withStart(scope: Region): [Region, Pos] {
	let n = (scope).clone()
	return [(n).clone(), (n.Start).clone()]
}

export function captured(scope: Region): [Region, (() => void) | null] {
	let n = (scope).clone()
	return [(n).clone(), $.functionValue(() => {
		n.Start.Line = 42
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))]
}

export function deferred(scope: Region): Region {
	let r: Region = new Region(undefined, true)
	using __defer = new $.DisposableStack()
	let n = (scope).clone()
	__defer.defer(() => { (() => {
		r.End.Char = 43
	})() })
	const __goscriptReturn1: Region = (n).clone()
	r = __goscriptReturn1
	__defer.dispose()
	return (r).clone()
	throw new globalThis.Error("goscript: unreachable return")
}

export function changedParam(scope: Region): Region {
	scope.Start.Line += 100
	return scope
}

export function pick(a: Region, n: number, __goscriptBorrow?: boolean): Region {
	if (n > 0) {
		return (__goscriptBorrow === true ? a : (a).clone())
	}
	return new Region(undefined, true)
}

export function aliasArg(__goscriptParam0: Region): number {
	let scope: $.VarRef<Region> = $.varRef(__goscriptParam0)
	let p = scope
	let got = pick(scope.value, 1)
	$.pointerValue<Region>(p).Start.Line = 77
	return got.Start.Line
}

export function methodArg(__goscriptParam1: Region): number {
	let scope: $.VarRef<Region> = $.varRef(__goscriptParam1)
	let got = pick(scope.value, 1)
	scope.value.bump()
	return got.Start.Line
}

export function aliasField(scope: Region): number {
	let x = (scope).clone()
	let p = $.fieldRef(x._fields, "Start")
	let got = pick(x, 1)
	$.pointerValue<Pos>(p).Line = 78
	return got.Start.Line
}

export function promoted(__goscriptParam2: outer, scope: Region): number {
	let o: $.VarRef<outer> = $.varRef(__goscriptParam2)
	let [, got, ] = $.pointerValue<rule>(o.value.rule).match(scope, 0, true)
	let sp = o.value.Region.span(scope, true)
	return got.Start.Line + sp.End.Line
}

export async function main(): globalThis.Promise<void> {
	let r = new rule({name: "r"})
	let scope = new Region({Start: new Pos({Line: 1, Char: 2}, true), End: new Pos({Line: 3, Char: 4}, true)}, true)

	// a result that is only read shares nothing that changes
	let [ok, nscope, depth] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0) : rule.prototype.match.call(r, scope, 0))
	await $.println("read:", ok, nscope.Start.Line, nscope.End.Char, depth)

	// a result that is changed must not change the argument
	let [, changed, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0) : rule.prototype.match.call(r, scope, 0))
	changed.Start.Line = 99
	await $.println("changed result, scope:", scope.Start.Line, changed.Start.Line)

	// an argument that changes after the call must not change the result
	let arg = (scope).clone()
	let [, held, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(arg, 0) : rule.prototype.match.call(r, arg, 0))
	arg.End.Char = 77
	await $.println("changed argument, result:", held.End.Char, arg.End.Char)

	// an argument changed in a loop around the call
	let loopArg = (scope).clone()
	let last: Region = new Region(undefined, true)
	for (let i = 0; i < 3; i++) {
		let [, got, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(loopArg, 0) : rule.prototype.match.call(r, loopArg, 0))
		if (i == 0) {
			last = $.assignStruct(last, got)
		}
		loopArg.Start.Char += 10
		await $.println("loop:", got.Start.Char, loopArg.Start.Char)
	}
	await $.println("loop last:", last.Start.Char)

	// discarded results
	void (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0, true) : rule.prototype.match.call(r, scope, 0, true));
	;(r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).match(scope, 0, true) : rule.prototype.match.call(r, scope, 0, true))

	// a returned call passes the request on
	let [gok, gscope, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).group(scope, 0) : rule.prototype.group.call(r, scope, 0))
	await $.println("group:", gok, gscope.Start.Line, gscope.End.Line)
	let [, gchanged, ] = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).group(scope, 0) : rule.prototype.group.call(r, scope, 0))
	gchanged.End.Line = 55
	await $.println("group changed, scope:", scope.End.Line, gchanged.End.Line)

	// a returned local copies
	let kept = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as rule).keep(scope) : rule.prototype.keep.call(r, scope))
	kept.Start.Char = 66
	await $.println("keep:", scope.Start.Char, kept.Start.Char)

	// interface and method value calls get copies
	let m: matcher | null = $.interfaceValue<matcher | null>(r, "*main.rule", /* @__PURE__ */ $.pointerType("main.rule"))
	let [, viaIface, ] = await (m !== null && (m as any).__isVarRef !== true && (m as any).__goValue === undefined ? (m as Exclude<matcher, null>) : $.pointerValue<Exclude<matcher, null>>(m)).match((scope).clone(), 0)
	viaIface.Start.Line = 11
	let fn: ((scope: Region, depth: number) => [boolean, Region, number] | globalThis.Promise<[boolean, Region, number]>) | null = $.functionValue(((__receiver) => (scope: Region, depth: number) => __receiver.match(scope, depth))($.pointerValue<rule>(r)), ({ kind: $.TypeKind.Function, params: ["main.Region", /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool"), "main.Region", /* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.(*rule).match-fm")
	let [, viaValue, ] = await fn!((scope).clone(), 0)
	viaValue.Start.Line = 12
	await $.println("indirect:", scope.Start.Line, viaIface.Start.Line, viaValue.Start.Line)

	// functions and methods of named non-struct types
	let f = first(scope)
	await $.println("first:", f.Start.Line)
	let cp = first(scope)
	cp.Start.Line = 13
	await $.println("first changed:", scope.Start.Line, cp.Start.Line)
	let lines: Lines = null! as Lines
	let at = Lines_at(lines, scope)
	at.End.Char = 14
	await $.println("at:", scope.End.Char, at.End.Char)

	// the same region read through a result of an off rule
	let off = new rule({off: true})
	let [, offScope, ] = (off !== null && (off as any).__isVarRef !== true && (off as any).__goValue === undefined ? ((off as any) as rule).match(scope, 0) : rule.prototype.match.call(off, scope, 0))
	await $.println("off:", $.structEqual(offScope, scope))
	scope.Start.Line = 21
	await $.println("off after change:", offScope.Start.Line, scope.Start.Line)
	let base = new Region({Start: new Pos({Line: 1, Char: 2}, true), End: new Pos({Line: 3, Char: 4}, true)}, true)
	let g = grow(base)
	g.Start.Line = 7
	await $.println("grow:", base.End.Line, g.End.Line, g.Start.Line)
	let [t1, t2] = twice(base)
	t1.End.Char = 50
	await $.println("twice:", t1.Start.Char, t2.Start.Char, t1.End.Char, t2.End.Char)
	let [ws, st] = withStart(base)
	ws.Start.Line = 60
	await $.println("withStart:", ws.Start.Line, st.Line)
	let [cr, _set] = captured(base)
	void (__goscriptAwait = _set!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("captured:", cr.Start.Line)
	await $.println("deferred:", deferred(base).End.Char, base.End.Char)
	let cp1 = changedParam((base).clone())
	let cp2 = changedParam((cp1).clone())
	await $.println("changedParam:", base.Start.Line, cp1.Start.Line, cp2.Start.Line)
	await $.println("aliasArg:", aliasArg((base).clone()), "methodArg:", methodArg((base).clone()), "aliasField:", aliasField(base))
	await $.println("promoted:", promoted(new outer({rule: r, Region: base}, true), base))
	await $.println("reads:", reads(r, new Region({Start: new Pos({Line: 1, Char: 2}, true), End: new Pos({Line: 3, Char: 4}, true)}, true)))
	await $.println("calls:", calls)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

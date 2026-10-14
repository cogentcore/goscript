// Generated file based on value_param_copy_elision.go
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

	public Later(): (() => number | globalThis.Promise<number>) | null {
		const r = this;
		return $.functionValue((): number => {
			return r.End.Char
		}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	}

	public Width(): number {
		const r = this;
		return r.End.Char - r.Start.Char
	}

	static __typeInfo = $.registerStructType(
		"main.Region",
		() => new Region(),
		() => [{ name: "Later", args: [], returns: [{ type: ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo) }] }, { name: "Width", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		Region,
		() => [{ name: "Start", key: "Start", type: "main.Pos" }, { name: "End", key: "End", type: "main.Pos" }]
	)
}

export class State {
	public get reg(): Region {
		return this._fields.reg
	}

	public set reg(value: Region) {
		this._fields.reg = value
	}

	public get n(): number {
		return this._fields.n
	}

	public set n(value: number) {
		this._fields.n = value
	}

	public _fields: {
		reg: Region
		n: number
	}

	constructor(init?: Partial<{reg?: Region, n?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			reg: init?.reg ? init.reg.clone() : new Region(undefined, true),
			n: init?.n ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): State {
		return new State(this, true)
	}

	public __goscriptAssign(source: State): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.reg, values.reg)
		target.n = values.n
	}

	public ["set"](c: number): void {
		let s: State | $.VarRef<State> | null = this;
		$.pointerValue<State>(s).reg.Start.Char = c
	}

	static __typeInfo = $.registerStructType(
		"main.State",
		() => new State(),
		() => [{ name: "set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		State,
		() => [{ name: "reg", key: "reg", type: "main.Region" }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function width(r: Region): number {
	return r.End.Char - r.Start.Char
}

export function mutate(r: Region): number {
	r.Start.Char = 100
	return r.Start.Char
}

export function readAfterStore(r: Region, s: State | $.VarRef<State> | null): number {
	$.pointerValue<State>(s).reg.Start.Char = 50
	return r.Start.Char
}

export function readAfterCall(r: Region, s: State | $.VarRef<State> | null): number {
	void (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? (s as unknown as State)["set"](60) : State.prototype.set.call(s, 60))
	return r.Start.Char
}

export function later(r: Region): (() => number | globalThis.Promise<number>) | null {
	return $.functionValue((): number => {
		return r.Start.Char
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
}

export function address(__goscriptParam0: Region): Region | $.VarRef<Region> | null {
	let r: $.VarRef<Region> = $.varRef(__goscriptParam0)
	return r
}

export function readAfterPointer(r: Region, p: Region | $.VarRef<Region> | null): number {
	$.pointerValue<Region>(p).Start.Char = 80
	return r.Start.Char
}

export let global: State = new State(undefined, true)

export function __goscript_set_global(__goscriptValue: State): void {
	$.assignStruct(global, __goscriptValue)
}

export function readGlobal(r: Region): number {
	global.reg.Start.Char = 70
	return r.Start.Char
}

export async function main(): globalThis.Promise<void> {
	let s: State | $.VarRef<State> | null = new State({reg: new Region({Start: new Pos({Line: 1, Char: 2}, true), End: new Pos({Line: 1, Char: 10}, true)}, true)})
	let s$: State = s == null ? $.pointerTarget<State>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<State>(s)
	await $.println(width((s$ as State).reg), (s$ as State).reg.Width())
	await $.println(mutate(((s$ as State).reg).clone()), (s$ as State).reg.Start.Char)
	await $.println(readAfterStore(((s$ as State).reg).clone(), s), (s$ as State).reg.Start.Char)
	await $.println(readAfterCall(((s$ as State).reg).clone(), s), (s$ as State).reg.Start.Char)
	let f: (() => number | globalThis.Promise<number>) | null = later(((s$ as State).reg).clone());
	;(s$ as State).reg.Start.Char = 3
	await $.println((__goscriptAwait = f!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (s$ as State).reg.Start.Char)
	let p: Region | $.VarRef<Region> | null = address(((s$ as State).reg).clone())
	$.pointerValue<Region>(p).Start.Char = 99
	await $.println((s$ as State).reg.Start.Char)
	global.reg.Start.Char = 4
	await $.println(readGlobal((global.reg).clone()), global.reg.Start.Char)
	let loc = ((s$ as State).reg).clone()
	await $.println(readAfterCall(loc, s), loc.Start.Char, (s$ as State).reg.Start.Char)
	let addr = $.varRef(((s$ as State).reg).clone())
	let ap: Region | $.VarRef<Region> | null = addr
	await $.println(readAfterPointer((addr.value).clone(), ap), addr.value.Start.Char)
	let g: (() => number | globalThis.Promise<number>) | null = $.markAsStructValue($.cloneStructValue((s$ as State).reg)).Later();
	;(s$ as State).reg.End.Char = 20
	await $.println((__goscriptAwait = g!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (s$ as State).reg.Width())
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

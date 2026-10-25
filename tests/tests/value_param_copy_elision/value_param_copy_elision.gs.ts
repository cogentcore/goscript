// Generated file based on value_param_copy_elision.go
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
	public declare reg: Region

	public declare n: number

	constructor(__goscriptValue?: boolean, reg$?: Region, n$?: number) {
		this.reg = reg$ ?? new Region(true)
		this.n = n$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): State {
		return new State(true, this.reg.clone(), this.n)
	}

	public __goscriptAssign(source: State): this {
		this.reg.__goscriptAssign(source.reg)
		this.n = source.n
		return this
	}

	public ["set"](c: number): void {
		const s: State | $.VarRef<State> | null = this;
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
	void (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as State)["set"](60) : State.prototype.set.call(s, 60))
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

export let global: State = new State(true)

export function __goscript_set_global(__goscriptValue: State): void {
	$.assignStruct(global, __goscriptValue)
}

export function readGlobal(r: Region): number {
	global.reg.Start.Char = 70
	return r.Start.Char
}

export async function main(): globalThis.Promise<void> {
	let s = new State(false, new Region(true, new Pos(true, 1, 2), new Pos(true, 1, 10)))
	let s$: State = s == null ? $.pointerTarget<State>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<State>(s)
	await $.println(width((s$ as State).reg), (s$ as State).reg.Width())
	await $.println(mutate(((s$ as State).reg).clone()), (s$ as State).reg.Start.Char)
	await $.println(readAfterStore(((s$ as State).reg).clone(), s), (s$ as State).reg.Start.Char)
	await $.println(readAfterCall(((s$ as State).reg).clone(), s), (s$ as State).reg.Start.Char)
	let f: (() => number | globalThis.Promise<number>) | null = later(((s$ as State).reg).clone());
	;(s$ as State).reg.Start.Char = 3
	await $.println((f!() as number), (s$ as State).reg.Start.Char)
	let p = address(((s$ as State).reg).clone())
	$.pointerValue<Region>(p).Start.Char = 99
	await $.println((s$ as State).reg.Start.Char)
	global.reg.Start.Char = 4
	await $.println(readGlobal((global.reg).clone()), global.reg.Start.Char)
	let loc = ((s$ as State).reg).clone()
	await $.println(readAfterCall(loc, s), loc.Start.Char, (s$ as State).reg.Start.Char)
	let addr = $.varRef(((s$ as State).reg).clone())
	let ap = addr
	await $.println(readAfterPointer((addr.value).clone(), ap), addr.value.Start.Char)
	let g: (() => number | globalThis.Promise<number>) | null = $.markAsStructValue($.cloneStructValue((s$ as State).reg)).Later();
	;(s$ as State).reg.End.Char = 20
	await $.println((g!() as number), (s$ as State).reg.Width())
}

if ($.isMainScript(import.meta)) {
	await main()
}

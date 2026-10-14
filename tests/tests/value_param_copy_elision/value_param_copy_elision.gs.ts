// Generated file based on value_param_copy_elision.go
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

	static {
		$.bindStructFields(this.prototype, ["Start", "End"])
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

	public _fields: {
		reg: Region
		n: number
	}

	constructor(init?: Partial<{reg?: Region, n?: number}>) {
		this._fields = {
			reg: init?.reg ? $.markAsStructValue($.cloneStructValue(init.reg)) : $.markAsStructValue(new Region()),
			n: init?.n ?? (0 as number)
		}
	}

	public clone(): State {
		return $.markAsStructValue(new State(this))
	}

	public ["set"](c: number): void {
		let s: State | $.VarRef<State> | null = this;
		$.pointerValue<State>(s).reg.Start.Char = c
	}

	static {
		$.bindStructFields(this.prototype, ["reg", "n"])
	}

	static __typeInfo = $.registerStructType(
		"main.State",
		() => new State(),
		() => [{ name: "set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
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
	State.prototype.set.call(s, 60)
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

export let global: State = $.markAsStructValue(new State())

export function __goscript_set_global(__goscriptValue: State): void {
	$.assignStruct(global, __goscriptValue)
}

export function readGlobal(r: Region): number {
	global.reg.Start.Char = 70
	return r.Start.Char
}

export async function main(): globalThis.Promise<void> {
	let s: State | $.VarRef<State> | null = new State({reg: $.markAsStructValue(new Region({Start: $.markAsStructValue(new Pos({Line: 1, Char: 2})), End: $.markAsStructValue(new Pos({Line: 1, Char: 10}))}))})
	await $.println(width($.pointerValue<State>(s).reg), $.pointerValue<State>(s).reg.Width())
	await $.println(mutate($.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg))), $.pointerValue<State>(s).reg.Start.Char)
	await $.println(readAfterStore($.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg)), s), $.pointerValue<State>(s).reg.Start.Char)
	await $.println(readAfterCall($.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg)), s), $.pointerValue<State>(s).reg.Start.Char)
	let f: (() => number | globalThis.Promise<number>) | null = later($.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg)))
	$.pointerValue<State>(s).reg.Start.Char = 3
	await $.println(await f!(), $.pointerValue<State>(s).reg.Start.Char)
	let p: Region | $.VarRef<Region> | null = address($.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg)))
	$.pointerValue<Region>(p).Start.Char = 99
	await $.println($.pointerValue<State>(s).reg.Start.Char)
	global.reg.Start.Char = 4
	await $.println(readGlobal($.markAsStructValue($.cloneStructValue(global.reg))), global.reg.Start.Char)
	let loc = $.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg))
	await $.println(readAfterCall(loc, s), loc.Start.Char, $.pointerValue<State>(s).reg.Start.Char)
	let addr = $.varRef($.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg)))
	let ap: Region | $.VarRef<Region> | null = addr
	await $.println(readAfterPointer($.markAsStructValue($.cloneStructValue(addr.value)), ap), addr.value.Start.Char)
	let g: (() => number | globalThis.Promise<number>) | null = $.markAsStructValue($.cloneStructValue($.pointerValue<State>(s).reg)).Later()
	$.pointerValue<State>(s).reg.End.Char = 20
	await $.println(await g!(), $.pointerValue<State>(s).reg.Width())
}

if ($.isMainScript(import.meta)) {
	await main()
}

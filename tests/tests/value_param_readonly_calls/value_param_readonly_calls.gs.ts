// Generated file based on value_param_readonly_calls.go
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

	public lineAfterBump(): number {
		const r = this;
		bump()
		return r.Start.Line
	}

	static __typeInfo = $.registerStructType(
		"main.Region",
		() => new Region(),
		() => [{ name: "lineAfterBump", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		Region,
		() => [{ name: "Start", key: "Start", type: "main.Pos" }, { name: "End", key: "End", type: "main.Pos" }]
	)
}

export class holder {
	public get r(): Region {
		return this._fields.r
	}

	public set r(value: Region) {
		this._fields.r = value
	}

	public _fields: {
		r: Region
	}

	constructor(init?: Partial<{r?: Region}>, __goscriptValue?: boolean) {
		this._fields = {
			r: init?.r ? init.r.clone() : new Region(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.r, values.r)
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "r", key: "r", type: "main.Region" }]
	)
}

export let g: Region = new Region(undefined, true)

export function __goscript_set_g(__goscriptValue: Region): void {
	$.assignStruct(g, __goscriptValue)
}

export let h: holder | $.VarRef<holder> | null = new holder()

export function __goscript_set_h(__goscriptValue: holder | $.VarRef<holder> | null): void {
	h = __goscriptValue
}

export let regions: $.Slice<Region> = $.arrayToSlice<Region>([new Region(undefined, true)])

export function __goscript_set_regions(__goscriptValue: $.Slice<Region>): void {
	regions = __goscriptValue
}

export function bump(): void {
	g.Start.Line = 9
}

export function bumpH(): void {
	$.pointerValue<holder>(h).r.Start.Line = 7
}

export function bumpElem(): void {
	$.arrayIndex(regions!, 0).Start.Line = 5
}

export function F(r: Region): number {
	bump()
	return r.Start.Line
}

export function FH(r: Region): number {
	bumpH()
	return r.Start.Line
}

export function FE(r: Region): number {
	bumpElem()
	return r.Start.Line
}

export function plain(r: Region): number {
	return r.Start.Line + r.End.Line
}

export async function main(): globalThis.Promise<void> {
	g.Start.Line = 1
	await $.println("F(g):", F((g).clone()))
	$.pointerValue<holder>(h).r.Start.Line = 2
	await $.println("FH(h.r):", FH(($.pointerValue<holder>(h).r).clone()))
	$.arrayIndex(regions!, 0).Start.Line = 3
	await $.println("FE(regions[0]):", FE(($.arrayIndex(regions!, 0)).clone()))
	g.Start.Line = 4
	await $.println("g.lineAfterBump():", $.markAsStructValue($.cloneStructValue(g)).lineAfterBump())
	await $.println("plain(g):", plain(g))
}

if ($.isMainScript(import.meta)) {
	await main()
}

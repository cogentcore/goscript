// Generated file based on value_param_readonly_calls.go
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
	public declare r: Region

	constructor(__goscriptValue?: boolean, r$?: Region) {
		this.r = r$ ?? new Region(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(true, this.r.clone())
	}

	public __goscriptAssign(source: holder): this {
		this.r.__goscriptAssign(source.r)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "r", key: "r", type: "main.Region" }]
	)
}

export let g: Region = new Region(true)

export function __goscript_set_g(__goscriptValue: Region): void {
	$.assignStruct(g, __goscriptValue)
}

export let h: holder | $.VarRef<holder> | null = new holder()

export function __goscript_set_h(__goscriptValue: holder | $.VarRef<holder> | null): void {
	h = __goscriptValue
}

export let regions: $.Slice<Region> = $.arrayToSlice<Region>([new Region(true)])

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
	$.plainSliceIndex(regions!, 0).Start.Line = 5
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
	$.plainSliceIndex(regions!, 0).Start.Line = 3
	await $.println("FE(regions[0]):", FE(($.plainSliceIndex(regions!, 0)).clone()))
	g.Start.Line = 4
	await $.println("g.lineAfterBump():", $.markAsStructValue($.cloneStructValue(g)).lineAfterBump())
	await $.println("plain(g):", plain(g))
}

if ($.isMainScript(import.meta)) {
	await main()
}

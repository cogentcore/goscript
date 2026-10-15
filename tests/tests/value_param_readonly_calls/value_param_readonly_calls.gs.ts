// Generated file based on value_param_readonly_calls.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Pos {
	public declare Line: number

	public declare Char: number

	constructor(init?: Partial<{Line?: number, Char?: number}>, __goscriptValue?: boolean) {
		this.Line = init?.Line ?? (0 as number)
		this.Char = init?.Char ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pos {
		return new Pos(this, true)
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

	constructor(init?: Partial<{Start?: Pos, End?: Pos}>, __goscriptValue?: boolean) {
		this.Start = init?.Start ? init.Start.clone() : new Pos(undefined, true)
		this.End = init?.End ? init.End.clone() : new Pos(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Region {
		return new Region(this, true)
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

	constructor(init?: Partial<{r?: Region}>, __goscriptValue?: boolean) {
		this.r = init?.r ? init.r.clone() : new Region(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
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

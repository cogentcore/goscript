// Generated file based on range_shadow_struct_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Match {
	public declare Size: number

	constructor(init?: Partial<{Size?: number}>, __goscriptValue?: boolean) {
		this.Size = init?.Size ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Match {
		return new Match(this, true)
	}

	public __goscriptAssign(source: Match): this {
		this.Size = source.Size
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Match",
		() => new Match(),
		() => [],
		Match,
		() => [{ name: "Size", key: "Size", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Matcher {
	public declare matches: $.Slice<Match>

	constructor(init?: Partial<{matches?: $.Slice<Match>}>, __goscriptValue?: boolean) {
		this.matches = init?.matches ?? (null! as $.Slice<Match>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Matcher {
		return new Matcher(this, true)
	}

	public __goscriptAssign(source: Matcher): this {
		this.matches = source.matches
		return this
	}

	public Blocks(): $.Slice<Match> {
		const m: Matcher | $.VarRef<Matcher> | null = this;
		return $.pointerValue<Matcher>(m).matches
	}

	public Total(): number {
		const m: Matcher | $.VarRef<Matcher> | null = this;
		let total = 0
		for (let __goscriptRangeTarget0 = (m !== null && (m as any).__isVarRef !== true && (m as any).__goValue === undefined ? ((m as any) as Matcher).Blocks() : Matcher.prototype.Blocks.call(m)), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let __goscriptRangeShadow0 = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Match)
			total += __goscriptRangeShadow0.Size
		}
		return total
	}

	static __typeInfo = $.registerStructType(
		"main.Matcher",
		() => new Matcher(),
		() => [{ name: "Blocks", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType("main.Match") }], pointerReceiver: true }, { name: "Total", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Matcher,
		() => [{ name: "matches", key: "matches", type: /* @__PURE__ */ $.sliceType("main.Match") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let m = new Matcher({matches: $.arrayToSlice<Match>([new Match({Size: 3}, true), new Match({Size: 4}, true)])})
	await $.println((m !== null && (m as any).__isVarRef !== true && (m as any).__goValue === undefined ? ((m as any) as Matcher).Total() : Matcher.prototype.Total.call(m)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

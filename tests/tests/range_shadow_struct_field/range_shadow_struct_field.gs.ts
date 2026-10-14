// Generated file based on range_shadow_struct_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Match {
	public get Size(): number {
		return this._fields.Size
	}

	public set Size(value: number) {
		this._fields.Size = value
	}

	public _fields: {
		Size: number
	}

	constructor(init?: Partial<{Size?: number}>) {
		this._fields = {
			Size: init?.Size ?? (0 as number)
		}
	}

	public clone(): Match {
		return $.markAsStructValue(new Match(this))
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
	public get matches(): $.Slice<Match> {
		return this._fields.matches
	}

	public set matches(value: $.Slice<Match>) {
		this._fields.matches = value
	}

	public _fields: {
		matches: $.Slice<Match>
	}

	constructor(init?: Partial<{matches?: $.Slice<Match>}>) {
		this._fields = {
			matches: init?.matches ?? (null! as $.Slice<Match>)
		}
	}

	public clone(): Matcher {
		return $.markAsStructValue(new Matcher(this))
	}

	public Blocks(): $.Slice<Match> {
		const m: Matcher | $.VarRef<Matcher> | null = this;
		return $.pointerValue<Matcher>(m).matches
	}

	public Total(): number {
		const m: Matcher | $.VarRef<Matcher> | null = this;
		let total = 0
		for (let __goscriptRangeTarget0 = Matcher.prototype.Blocks.call(m), __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
			let __goscriptRangeShadow0 = $.markAsStructValue($.cloneStructValue(__goscriptRangeTarget0![__rangeIndex]))
			total = total + (__goscriptRangeShadow0.Size)
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
	let m: Matcher | $.VarRef<Matcher> | null = new Matcher({matches: $.arrayToSlice<Match>([$.markAsStructValue(new Match({Size: 3})), $.markAsStructValue(new Match({Size: 4}))])})
	await $.println(Matcher.prototype.Total.call(m))
}

if ($.isMainScript(import.meta)) {
	await main()
}

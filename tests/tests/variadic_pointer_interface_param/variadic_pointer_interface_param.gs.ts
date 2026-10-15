// Generated file based on variadic_pointer_interface_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Expr = {
	Value(): number
}

$.registerInterfaceType(
	"main.Expr",
	null,
	[{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class lit {
	public declare n: number

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): lit {
		return new lit(this, true)
	}

	public __goscriptAssign(source: lit): this {
		this.n = source.n
		return this
	}

	public Value(): number {
		const l: lit | $.VarRef<lit> | null = this;
		return $.pointerValue<lit>(l).n
	}

	static __typeInfo = $.registerStructType(
		"main.lit",
		() => new lit(),
		() => [{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		lit,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function replace(to: Expr | null, exprs: $.Slice<$.VarRef<Expr | null> | null>): boolean {
	for (let __goscriptRangeTarget0 = exprs, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let expr = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as $.VarRef<Expr | null> | null)
		if ($.pointerValue<Expr | null>(expr) == null) {
			continue
		}
		expr!.value = to
		return true
	}
	return false
}

export async function main(): globalThis.Promise<void> {
	let expr: $.VarRef<Expr | null> = $.varRef($.interfaceValue<Expr | null>(new lit({n: 1}), "*main.lit", /* @__PURE__ */ $.pointerType("main.lit")))
	let next: Expr | null = $.interfaceValue<Expr | null>(new lit({n: 7}), "*main.lit", /* @__PURE__ */ $.pointerType("main.lit"))
	await $.println(replace(next, $.arrayToSlice<$.VarRef<Expr | null> | null>([expr])), (__goscriptAwait = $.pointerValue<Exclude<Expr, null>>(expr.value).Value(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

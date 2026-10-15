// Generated file based on box.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_cross_file_method_owner from "./cross_file_method_owner.gs.ts"
import "./cross_file_method_owner.gs.ts"

export type box = number

$.registerNamedValueType(
	"main.box",
	{base: (receiver: any, ...args: any[]) => (box_base as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), total: (receiver: any, ...args: any[]) => (__goscript_cross_file_method_owner.box_total as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("base", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("total", [], [/* @__PURE__ */ $.basicType("int")])]
);

$.registerNamedValueType(
	"*main.box",
	{base: (receiver: any, ...args: any[]) => (box_base as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), total: (receiver: any, ...args: any[]) => (__goscript_cross_file_method_owner.box_total as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("base", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("total", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class pile {
	public get step(): number {
		return this._fields.step
	}

	public set step(value: number) {
		this._fields.step = value
	}

	public _fields: {
		step: number
	}

	constructor(init?: Partial<{step?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			step: init?.step ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pile {
		return new pile(this, true)
	}

	public __goscriptAssign(source: pile): void {
		const target = this._fields
		const values = source._fields
		target.step = values.step
	}

	public drain(items: $.Slice<number>): number {
		const p: pile | $.VarRef<pile> | null = this;
		let sum = 0
		pile.prototype.each.call(p, $.functionValue(() => {
			let stack: $.Slice<number> = $.arrayToSlice<number>([])
			pile.prototype.each.call(p, $.functionValue(() => {
				stack = $.appendSlice(stack, items)
			}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
			while ($.sliceLen(stack) != 0) {
				let chunk: $.Slice<number> = $.goSlice(stack, $.max(0, $.sliceLen(stack) - $.pointerValue<pile>(p).step), undefined)
				for (let __goscriptRangeTarget0 = chunk, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
					let item = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number)
					sum += item
				}
				stack = $.goSlice(stack, undefined, $.sliceLen(stack) - $.sliceLen(chunk))
			}
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
		return sum
	}

	public each(fn: (() => void) | null): void {
		const p: pile | $.VarRef<pile> | null = this;
		fn!()
	}

	static __typeInfo = $.registerStructType(
		"main.pile",
		() => new pile(),
		() => [{ name: "drain", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "each", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		pile,
		() => [{ name: "step", key: "step", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function box_base(b: box): number {
	return b
}

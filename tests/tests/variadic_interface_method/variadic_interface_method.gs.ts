// Generated file based on variadic_interface_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/strings/index.js"

export type Basic = {
	Join(elem: $.Slice<string>): string
}

$.registerInterfaceType(
	"main.Basic",
	null,
	[{ name: "Join", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class PathJoiner {
	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): PathJoiner {
		return new PathJoiner(this, true)
	}

	public __goscriptAssign(source: PathJoiner): this {
		return this
	}

	public Join(elem: $.Slice<string>): string {
		const p = this;
		let result: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))
		for (let __goscriptRangeTarget0 = elem, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
			let e = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as string)
			if (i > 0) {
				result.value.WriteString("/")
			}
			result.value.WriteString(e)
		}
		return result.value.String()
	}

	static __typeInfo = $.registerStructType(
		"main.PathJoiner",
		() => new PathJoiner(),
		() => [{ name: "Join", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		PathJoiner,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let b: Basic | null = $.interfaceValue<Basic | null>(new PathJoiner(undefined, true), "main.PathJoiner", "main.PathJoiner")

	// Test with multiple arguments
	let result1 = (__goscriptAwait = (b !== null && (b as any).__isVarRef !== true && (b as any).__goValue === undefined ? (b as Exclude<Basic, null>) : $.pointerValue<Exclude<Basic, null>>(b)).Join($.arrayToSlice<string>(["path", "to", "file"])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("Result1:", result1)

	// Test with single argument
	let result2 = (__goscriptAwait = (b !== null && (b as any).__isVarRef !== true && (b as any).__goValue === undefined ? (b as Exclude<Basic, null>) : $.pointerValue<Exclude<Basic, null>>(b)).Join($.arrayToSlice<string>(["single"])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("Result2:", result2)

	// Test with no arguments
	let result3 = (__goscriptAwait = (b !== null && (b as any).__isVarRef !== true && (b as any).__goValue === undefined ? (b as Exclude<Basic, null>) : $.pointerValue<Exclude<Basic, null>>(b)).Join(null), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("Result3:", result3)

	// Test with slice expansion
	let parts = $.arrayToSlice<string>(["another", "path", "here"])
	let result4 = (__goscriptAwait = (b !== null && (b as any).__isVarRef !== true && (b as any).__goValue === undefined ? (b as Exclude<Basic, null>) : $.pointerValue<Exclude<Basic, null>>(b)).Join(parts), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await $.println("Result4:", result4)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on wide_one_shift.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type flags = bigint

$.registerNamedValueType(
	"main.flags",
	{has: (receiver: any, ...args: any[]) => (flags_has as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("has", [["f", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")])]
);

$.registerNamedValueType(
	"*main.flags",
	{has: (receiver: any, ...args: any[]) => (flags_has as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("has", [["f", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")])]
);

export function flags_has(fl: flags, f: bigint): boolean {
	return ($.int64And(fl, ($.int64Bit($.uintFromWide(f, 32))))) != 0n
}

export async function main(): globalThis.Promise<void> {
	// Masks of int64 for counts of each kind, up to the sign bit and past it.
	let counts = $.arrayToSlice<number>([0, 1, 31, 32, 53, 62, 63, 64, 65, 200])
	for (let __goscriptRangeTarget0 = counts, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let k = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number), 32)
		let m: bigint = $.int64Bit(k)
		await $.println("int64", k, m)
	}

	// Masks of uint64, with a bigint count.
	for (let __goscriptRangeTarget1 = $.arrayToSlice<bigint>([0n, 7n, 52n, 63n, 64n, 100n]), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let k = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as bigint)
		let m: bigint = $.uint64Bit(k)
		await $.println("uint64", k, m)
	}

	// A mask of the platform uint, and one used in a flag test.
	let k = 40
	let u: number = $.uint($.uint64Bit(k), 64)
	await $.println("uint", u)
	let fl = 1099511627784n
	await $.println("has", flags_has(fl, 3n), flags_has(fl, 4n), flags_has(fl, 40n), flags_has(fl, 63n))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on visit.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/interface_whole_program_package/visit", ["visit.Visitor", "visit.Fetcher"])

export type Visitor = {
	Visit(n: number): number
}

$.registerInterfaceType(
	"visit.Visitor",
	null,
	[{ name: "Visit", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export type Fetcher = {
	Fetch(): number | globalThis.Promise<number>
}

$.registerInterfaceType(
	"visit.Fetcher",
	null,
	[{ name: "Fetch", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export function Walk(v: Visitor | null, values: $.Slice<number>): number {
	let sum = 0
	for (let __goscriptRangeTarget0 = values, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let n = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number)
		sum += (v !== null && (v as any).__isVarRef !== true && (v as any).__goValue === undefined ? (v as Exclude<Visitor, null>) : $.pointerValue<Exclude<Visitor, null>>(v)).Visit(n)
	}
	return sum
}

export async function Fetch(f: Fetcher | null): globalThis.Promise<number> {
	return (__goscriptAwait = (f !== null && (f as any).__isVarRef !== true && (f as any).__goValue === undefined ? (f as Exclude<Fetcher, null>) : $.pointerValue<Exclude<Fetcher, null>>(f)).Fetch(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) * 2
}

var __goscriptAwait: any

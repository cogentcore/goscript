// Generated file based on named_generic_slice_variadic_spread.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Stack = $.Slice<any>

export type Names = $.Slice<string>

$.registerNamedType("main.Names", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

export type Text = $.Slice<string>

$.registerNamedType("main.Text", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

export function Stack_Push(st: $.VarRef<Stack> | null, __typeArgs: $.GenericTypeArgs | undefined, it: $.Slice<any>): void {
	st!.value = ($.appendSlice(($.pointerValue<Stack>(st) as Stack), it, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as any))) as Stack)
}

export function join(txts: $.Slice<Text>): number {
	let n = 0
	for (let __goscriptRangeTarget0 = txts, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let t = (__goscriptRangeTarget0![__rangeIndex] as Text)
		n = n + ($.len((t as Text)))
	}
	return n
}

export function count(names: $.Slice<string>): number {
	return $.len(names)
}

export async function main(): globalThis.Promise<void> {
	let st: $.VarRef<Stack> = $.varRef(($.makeSlice<Text>(0) as Stack))
	Stack_Push(st, {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.Text"), zero: () => null }}, $.arrayToSlice<Text>([($.arrayToSlice<string>(["a", "b"]) as Text), ($.arrayToSlice<string>(["c"]) as Text)]))
	await $.println("join:", join((st.value as $.Slice<Text>)))

	let names: Names = ($.arrayToSlice<string>(["x", "y", "z"]) as Names)
	await $.println("count:", count((names as $.Slice<string>)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on variadic_function_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errors from "@goscript/errors/index.js"
import "@goscript/errors/index.js"

export type Stack = $.Slice<any>

export type Names = $.Slice<string>

$.registerNamedType("main.Names", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

export type Text = $.Slice<string>

$.registerNamedType("main.Text", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

export async function TestFS(fsys: string, expected: $.Slice<string>): globalThis.Promise<$.GoError> {
	return testFS(fsys, expected)
}

export async function testFS(fsys: string, expected: $.Slice<string>): globalThis.Promise<$.GoError> {
	if ($.len(expected) == 0) {
		return errors.New("no expected values")
	}

	for (let __goscriptRangeTarget0 = expected, i = 0; i < $.len(__goscriptRangeTarget0); i++) {
		let exp = __goscriptRangeTarget0![i]
		await $.println($.concatString(($.concatString(($.concatString("Expected[", $.runeToString($.int(i + 48, 32)))), "]: ")), exp))
	}

	await $.println($.concatString("File system: ", fsys))
	return null
}

export function Stack_Push(st: $.VarRef<Stack> | null, __typeArgs: $.GenericTypeArgs | undefined, items: $.Slice<any>): void {
	st!.value = ($.appendSlice(($.pointerValue<Stack>(st) as Stack), items, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as any))) as Stack)
}

export function join(txts: $.Slice<Text>): number {
	let n = 0
	for (let __goscriptRangeTarget1 = txts, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget1); __rangeIndex++) {
		let t = (__goscriptRangeTarget1![__rangeIndex] as Text)
		n = n + ($.len((t as Text)))
	}
	return n
}

export function count(names: $.Slice<string>): number {
	return $.len(names)
}

export async function main(): globalThis.Promise<void> {
	let expected: $.Slice<string> = $.arrayToSlice<string>(["file1.txt", "file2.txt", "file3.txt"])

	// This is the problematic line - should generate spread syntax in TypeScript
	let err = await TestFS("myfs", expected)

	if (err != null) {
		await $.println($.concatString("Error: ", await $.pointerValue<Exclude<$.GoError, null>>(err).Error()))
	} else {
		await $.println("Success!")
	}

	// Named slices spread into variadic parameters of their element type.
	let st: $.VarRef<Stack> = $.varRef(($.makeSlice<Text>(0) as Stack))
	Stack_Push(st, __goscriptStatic0(), $.arrayToSlice<Text>([($.arrayToSlice<string>(["a", "b"]) as Text), ($.arrayToSlice<string>(["c"]) as Text)]))
	await $.println("join:", join((st.value as $.Slice<Text>)))

	let names: Names = ($.arrayToSlice<string>(["x", "y", "z"]) as Names)
	await $.println("count:", count((names as $.Slice<string>)))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.Text"), zero: () => null }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

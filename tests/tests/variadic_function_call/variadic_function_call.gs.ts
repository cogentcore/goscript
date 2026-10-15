// Generated file based on variadic_function_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"

export type Stack = $.Slice<any>

export type Names = $.Slice<string>

$.registerNamedType("main.Names", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

export type Text = $.Slice<string>

$.registerNamedType("main.Text", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

export type Handler = ((name: string) => [boolean, $.GoError] | globalThis.Promise<[boolean, $.GoError]>) | null

export async function TestFS(fsys: string, expected: $.Slice<string>): globalThis.Promise<$.GoError> {
	return testFS(fsys, expected)
}

export async function testFS(fsys: string, expected: $.Slice<string>): globalThis.Promise<$.GoError> {
	if ($.sliceLen(expected) == 0) {
		return errors.New("no expected values")
	}

	for (let __goscriptRangeTarget0 = expected, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let exp = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as string)
		await $.println("Expected[" + $.runeToString($.int(i + 48, 32)) + "]: " + exp)
	}

	await $.println("File system: " + fsys)
	return null
}

export function Stack_Push(st: $.VarRef<Stack> | null, __typeArgs: $.GenericTypeArgs | undefined, items: $.Slice<any>): void {
	st!.value = ($.appendSlice(($.pointerValue<Stack>(st) as Stack), items, $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as any))) as Stack)
}

export function join(txts: $.Slice<Text>): number {
	let n = 0
	for (let __goscriptRangeTarget1 = txts, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let t = ((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as Text) as Text)
		n += $.sliceLen((t as Text))
	}
	return n
}

export function count(names: $.Slice<string>): number {
	return $.sliceLen(names)
}

export function countHandlers(name: string, handlers: $.Slice<Handler | null>): number {
	let n = 0
	for (let __goscriptRangeTarget2 = handlers, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		let h = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as Handler | null)
		{
			let [ok, ] = (h!(name) as [boolean, $.GoError])
			if (ok) {
				n++
			}
		}
	}
	return n
}

export async function main(): globalThis.Promise<void> {
	let expected = $.arrayToSlice<string>(["file1.txt", "file2.txt", "file3.txt"])

	// This is the problematic line - should generate spread syntax in TypeScript
	let err = await TestFS("myfs", expected)

	if (err != null) {
		await $.println("Error: " + (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Success!")
	}

	// Named slices spread into variadic parameters of their element type.
	let st: $.VarRef<Stack> = $.varRef(($.makeSlice<Text>(0) as Stack))
	Stack_Push(st, __goscriptStatic0(), $.arrayToSlice<Text>([($.arrayToSlice<string>(["a", "b"]) as Text), ($.arrayToSlice<string>(["c"]) as Text)]))
	await $.println("join:", join((st.value as $.Slice<Text>)))

	let names = ($.arrayToSlice<string>(["x", "y", "z"]) as Names)
	await $.println("count:", count((names as $.Slice<string>)))

	// A conversion to a multi-result function type is one variadic argument.
	await $.println("handlers:", countHandlers("x", $.arrayToSlice<Handler | null>([$.namedFunction($.functionValue((name: string): [boolean, $.GoError] => {
		return [$.stringEqual(name, "x"), null]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool"), "error"] } as $.FunctionTypeInfo)), "main.Handler", ({ kind: $.TypeKind.Function, name: "main.Handler", params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool"), "error"] } as $.FunctionTypeInfo))])))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.Text"), zero: () => null }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

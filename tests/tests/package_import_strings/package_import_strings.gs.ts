// Generated file based on package_import_strings.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as strings from "@goscript/strings/index.js"

export async function main(): globalThis.Promise<void> {
	// This should trigger the unhandled make call error
	// strings.Builder uses make internally for its buffer
	let builder = $.varRef($.markAsStructValue(new strings.Builder()))
	builder.value.WriteString("Hello")
	builder.value.WriteString(" ")
	builder.value.WriteString("World")
	let [n, err] = builder.value.Write(new Uint8Array([33]))
	await $.println("Write:", n, err == null)

	let result = builder.value.String()
	await $.println("Result:", result)
	await printBuilderPointer(builder)
	await $.println("After pointer:", builder.value.String())

	// Also test direct make with strings.Builder
	let builderPtr = new strings.Builder()
	strings.Builder.prototype.WriteString.call($.pointerValue<strings.Builder>(builderPtr), "Direct make test")
	await $.println("Direct:", strings.Builder.prototype.String.call($.pointerValue<strings.Builder>(builderPtr)))
	await $.println("LastIndexByte:", strings.LastIndexByte("hello", 108))
	await $.println("LastIndex:", strings.LastIndex("hello", "l"))

	await splits()
}

export async function show(name: string, parts: $.Slice<string>): globalThis.Promise<void> {
	let line = name
	for (let __goscriptRangeTarget0 = parts, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let p = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		line += " [" + p + "]"
	}
	await $.println(line, $.sliceLen(parts))
}

export async function splits(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget1 = $.arrayToSlice<string>(["a,b", "a,", ",", "a,b,c", "ab", ""]), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let s = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as string)
		await show("SplitAfterN 2 " + s + ":", strings.SplitAfterN(s, ",", 2))
		await show("SplitAfter " + s + ":", strings.SplitAfter(s, ","))
		await show("SplitN 2 " + s + ":", strings.SplitN(s, ",", 2))
		await show("Split " + s + ":", strings.Split(s, ","))
	}
	await show("SplitN empty sep 2:", strings.SplitN("abc", "", 2))
	await show("SplitAfterN empty sep 2:", strings.SplitAfterN("abc", "", 2))
	await show("SplitN empty sep 5:", strings.SplitN("abc", "", 5))
	await show("Split empty sep:", strings.Split("abc", ""))
}

export async function printBuilderPointer(builder: strings.Builder | $.VarRef<strings.Builder> | null): globalThis.Promise<void> {
	await $.println("Pointer Len Before:", strings.Builder.prototype.Len.call($.pointerValue<strings.Builder>(builder)))
	strings.Builder.prototype.WriteString.call($.pointerValue<strings.Builder>(builder), " Pointer")
	await $.println("Pointer Len After:", strings.Builder.prototype.Len.call($.pointerValue<strings.Builder>(builder)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

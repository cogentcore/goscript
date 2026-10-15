// Generated file based on slice_type_assertion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let v: any = $.interfaceValue(new Uint8Array([7, 8, 9]) as $.Slice<number>, "[]byte", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")))
	let b = $.mustTypeAssert<$.Slice<number>>(v, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")))
	await $.println("byte slice:", $.sliceLen(b), $.arrayIndex(b!, 0), $.arrayIndex(b!, 2))
}

if ($.isMainScript(import.meta)) {
	await main()
}

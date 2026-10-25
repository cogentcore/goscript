// Generated file based on bool_slice_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let values = $.makeSlice<boolean>(3, undefined, "boolean")
	await $.println($.plainSliceIndex(values!, 0), $.plainSliceIndex(values!, 1), $.plainSliceIndex(values!, 2))
	$.sliceElems(values!)[$.sliceSlot(values!, 1)] = true
	await $.println($.plainSliceIndex(values!, 0), $.plainSliceIndex(values!, 1), $.plainSliceIndex(values!, 2))
}

if ($.isMainScript(import.meta)) {
	await main()
}

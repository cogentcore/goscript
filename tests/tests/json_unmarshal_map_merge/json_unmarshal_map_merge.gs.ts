// Generated file based on json_unmarshal_map_merge.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"
import "@goscript/encoding/json/index.js"

export async function main(): globalThis.Promise<void> {
	// Decoding an object into a non-nil map adds to the existing entries.
	let mp: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["a", 1], ["b", 2]]))
	let to: any = $.interfaceValue(mp, "*map[string]float32", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("float32"))))
	let err = json.Unmarshal(new Uint8Array([123, 34, 98, 34, 58, 53, 44, 34, 99, 34, 58, 51, 125]), to)
	await $.println(err == null, $.len(mp.value), $.mapGet<string, number, number>(mp.value, "a", 0)[0], $.mapGet<string, number, number>(mp.value, "b", 0)[0], $.mapGet<string, number, number>(mp.value, "c", 0)[0])

	let m2: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["x", 1]]))
	json.Unmarshal(new Uint8Array([123, 34, 121, 34, 58, 50, 125]), $.interfaceValue(m2, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))
	await $.println($.len(m2.value), $.mapGet<string, number, number>(m2.value, "x", 0)[0], $.mapGet<string, number, number>(m2.value, "y", 0)[0])

	let m3: $.VarRef<globalThis.Map<string, number> | null> = $.varRef(null! as globalThis.Map<string, number> | null)
	json.Unmarshal(new Uint8Array([123, 34, 122, 34, 58, 51, 125]), $.interfaceValue(m3, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))
	await $.println($.len(m3.value), $.mapGet<string, number, number>(m3.value, "z", 0)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

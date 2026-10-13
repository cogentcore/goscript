// Generated file based on package_import_fmt_slice_verbs.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/fmt/index.js"

export async function main(): globalThis.Promise<void> {
	await fmt.Printf("%q\n", $.interfaceValue($.arrayToSlice<string>(["a", "b c"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))))
	await fmt.Printf("%d\n", $.interfaceValue($.arrayToSlice<number>([1, 2, 3]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	await fmt.Printf("%x\n", $.interfaceValue($.arrayToSlice<number>([10, 255]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	await fmt.Printf("%.2f\n", $.interfaceValue($.arrayToSlice<number>([1.5, 2.25]), "[]float64", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("float64"))))
	await fmt.Printf("%t\n", $.interfaceValue($.arrayToSlice<boolean>([true, false]), "[]bool", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("bool"))))
	await fmt.Printf("%q\n", $.arrayValue(["x", "y"]))
	await fmt.Printf("%q\n", $.interfaceValue(new Uint8Array([104, 105]), "[]byte", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))))
	await fmt.Printf("%x\n", $.interfaceValue(new Uint8Array([104, 105]), "[]byte", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))))
	await fmt.Printf("%s\n", $.interfaceValue($.arrayToSlice<string>(["a", "b"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))))
	await fmt.Printf("%q\n", $.interfaceValue($.arrayToSlice<string>([]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

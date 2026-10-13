// Generated file based on dep2.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep2", ["dep2.Value"])

export type Value = {
	Value(): string
}

$.registerInterfaceType(
	"dep2.Value",
	null,
	[{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

// Generated file based on dep2.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/interface_embedded_import_methods/dep2", ["dep2.Value", "dep2.Result"])

export type Value = {
	Value(): string
}

$.registerInterfaceType(
	"dep2.Value",
	null,
	[{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type Result = {
	Result(): string
}

$.registerInterfaceType(
	"dep2.Result",
	null,
	[{ name: "Result", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

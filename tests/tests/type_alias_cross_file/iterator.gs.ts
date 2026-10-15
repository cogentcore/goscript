// Generated file based on iterator.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import type * as subpkg from "@goscript/github.com/s4wave/goscript/tests/tests/type_alias_cross_file/subpkg/index.js"
import type * as __goscript_alias from "./alias.gs.ts"

export type Reader = {
	Val(): __goscript_alias.Value
}

$.registerInterfaceType(
	"main.Reader",
	null,
	[{ name: "Val", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "subpkg.Value") }] }]
);

export function Read(r: Reader | null): __goscript_alias.Value {
	return ((r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as Exclude<Reader, null>) : $.pointerValue<Exclude<Reader, null>>(r)).Val() as __goscript_alias.Value)
}

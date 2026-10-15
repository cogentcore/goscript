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

export async function Read(r: Reader | null): globalThis.Promise<__goscript_alias.Value> {
	return (((__goscriptAwait = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as Exclude<Reader, null>) : $.pointerValue<Exclude<Reader, null>>(r)).Val(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as __goscript_alias.Value) as __goscript_alias.Value)
}

var __goscriptAwait: any

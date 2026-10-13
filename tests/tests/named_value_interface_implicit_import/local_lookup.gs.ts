// Generated file based on local_lookup.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_find_layers from "./find_layers.gs.ts"

import * as __goscript_layers from "./layers.gs.ts"
import "./find_layers.gs.ts"
import "./layers.gs.ts"

export function localLookup(): [$.GoError, boolean] {
	const __goscriptReturn0 = __goscript_find_layers.findLayers()
	return [$.namedValueInterfaceValue<$.GoError>(__goscriptReturn0[0], "main.layers", {Error: (receiver: any, ...args: any[]) => (__goscript_layers.layers_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.layers"), [$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]), __goscriptReturn0[1]]
	throw new globalThis.Error("goscript: unreachable return")
}

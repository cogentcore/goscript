// Generated file based on local_lookup.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_find_layers from "./find_layers.gs.ts"
import * as __goscript_layers from "./layers.gs.ts"
import "./layers.gs.ts"

export function localLookup(): [$.GoError, boolean] {
	const __goscriptReturn0 = __goscript_find_layers.findLayers()
	return [$.namedValueInterfaceValue<$.GoError>(__goscriptReturn0[0], "main.layers", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), __goscriptReturn0[1]]
	throw new globalThis.Error("goscript: unreachable return")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Error: (receiver: any) => (__goscript_layers.layers_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.layers"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])])
}

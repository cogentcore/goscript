// Generated file based on device.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_convert from "./convert.gs.ts"

import * as __goscript_descriptor from "./descriptor.gs.ts"
import "./convert.gs.ts"
import "./descriptor.gs.ts"

export async function create(d: __goscript_descriptor.descriptor | $.VarRef<__goscript_descriptor.descriptor> | null): globalThis.Promise<any> {
	return __goscript_convert.pointerToJS(__goscriptStatic0(), d)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.descriptor", zero: () => $.markAsStructValue(new __goscript_descriptor.descriptor()) }, P: { type: /* @__PURE__ */ $.pointerType("main.descriptor"), zero: () => null, methods: {toJS: (receiver: any, ...args: any[]) => $.pointerValue(receiver).toJS(...$.stripGenericTypeArgs(args))} }})
}

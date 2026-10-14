// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type StrOrBytes = any

$.registerInterfaceType(
	"main.StrOrBytes",
	null,
	[]
);

export function toStringString(__typeArgs: $.GenericTypeArgs | undefined, v: any): string {
	return $.genericBytesOrStringToString(v)
}

export function toStringBytes(__typeArgs: $.GenericTypeArgs | undefined, v: any): string {
	return $.genericBytesOrStringToString(v)
}

export function toStringGeneric(__typeArgs: $.GenericTypeArgs | undefined, v: any): string {
	return $.genericBytesOrStringToString(v)
}

export async function main(): globalThis.Promise<void> {
	// string-only
	await $.println(toStringString(__goscriptStatic0(), "hello"))

	// bytes-only
	await $.println(toStringBytes(__goscriptStatic1(), new Uint8Array([119, 111, 114, 108, 100]) as $.Slice<number>))

	// union: string
	await $.println(toStringGeneric(__goscriptStatic0(), "foo"))
	// union: []byte
	await $.println(toStringGeneric(__goscriptStatic1(), new Uint8Array([98, 97, 114]) as $.Slice<number>))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), zero: () => null }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

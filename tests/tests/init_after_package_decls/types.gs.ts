// Generated file based on types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript__type from "./type.gs.ts"
import * as __goscript_field from "./field.gs.ts"

export var Types: globalThis.Map<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null> | null

export function __goscript_init_Types(): void {
	if (((Types) as any) === undefined) {
		Types = $.makeMap<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null>([])
	}
}

export function __goscript_get_Types(): globalThis.Map<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null> | null {
	if (((Types) as any) === undefined) {
		__goscript_init_Types()
	}
	return Types
}

export function __goscript_set_Types(__goscriptValue: globalThis.Map<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null> | null): void {
	Types = __goscriptValue
}

export var Default: __goscript__type.Type | $.VarRef<__goscript__type.Type> | null

export function __goscript_init_Default(): void {
	if (((Default) as any) === undefined) {
		Default = newDefault()
	}
}

export function __goscript_get_Default(): __goscript__type.Type | $.VarRef<__goscript__type.Type> | null {
	if (((Default) as any) === undefined) {
		__goscript_init_Default()
	}
	return Default
}

export function __goscript_set_Default(__goscriptValue: __goscript__type.Type | $.VarRef<__goscript__type.Type> | null): void {
	Default = __goscriptValue
}

export var order: $.Slice<string>

export function __goscript_init_order(): void {
	if (((order) as any) === undefined) {
		order = null! as $.Slice<string>
	}
}

export function __goscript_get_order(): $.Slice<string> {
	if (((order) as any) === undefined) {
		__goscript_init_order()
	}
	return order
}

export function __goscript_set_order(__goscriptValue: $.Slice<string>): void {
	order = __goscriptValue
}

export function newDefault(): __goscript__type.Type | $.VarRef<__goscript__type.Type> | null {
	__goscript_set_order($.appendOne(__goscript_get_order(), "Default"))
	return new __goscript__type.Type({Name: "default", Fields: $.arrayToSlice<__goscript_field.Field>([new __goscript_field.Field({Name: "x"}, true)])})
}

export function addBuiltin(__typeArgs: $.GenericTypeArgs | undefined, name: string): void {
	let zero: any = $.genericZero(__typeArgs, "T", null)
	zero
	$.mapSet(__goscript_get_Types(), name, new __goscript__type.Type({Name: name}))
}

export function TypeByName(name: string): __goscript__type.Type | $.VarRef<__goscript__type.Type> | null {
	return $.mapGet<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null>(__goscript_get_Types(), name, null)[0]
}

function __goscriptInit0(): void {
	__goscript_set_order($.appendOne(__goscript_get_order(), "init types.go"))
	addBuiltin(__goscriptStatic0(), "int")
	addBuiltin(__goscriptStatic1(), "string")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

export { __goscriptInit0 }

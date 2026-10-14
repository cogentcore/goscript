// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript__type from "./type.gs.ts"

import * as __goscript_field from "./field.gs.ts"

import * as __goscript_types from "./types.gs.ts"

import * as __goscript_package_init from "./__goscript_package_init.gs.ts"
import "./type.gs.ts"
import "./field.gs.ts"
import "./types.gs.ts"

export var Later: string

export function __goscript_init_Later(): void {
	if (((Later) as any) === undefined) {
		Later = newLater()
	}
}

export function __goscript_get_Later(): string {
	if (((Later) as any) === undefined) {
		__goscript_init_Later()
	}
	return Later
}

export function __goscript_set_Later(__goscriptValue: string): void {
	Later = __goscriptValue
}

export function newLater(): string {
	__goscript_types.__goscript_set_order($.appendOne(__goscript_types.__goscript_get_order(), "Later"))
	return "later"
}

function __goscriptInit0(): void {
	__goscript_types.__goscript_set_order($.appendOne(__goscript_types.__goscript_get_order(), "init main.go"))
}

export async function main(): globalThis.Promise<void> {
	await $.println($.len(__goscript_types.__goscript_get_Types()), $.pointerValue<__goscript__type.Type>($.mapGet<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null>(__goscript_types.__goscript_get_Types(), "int", null)[0]).Name, $.pointerValue<__goscript__type.Type>($.mapGet<string, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null, __goscript__type.Type | $.VarRef<__goscript__type.Type> | null>(__goscript_types.__goscript_get_Types(), "string", null)[0]).Name)
	await $.println($.pointerValue<__goscript__type.Type>(__goscript_types.__goscript_get_Default()).Name, $.sliceLen(__goscript__type.Type.prototype.FieldNames.call(__goscript_types.__goscript_get_Default())), __goscript_get_Later())
	await $.println($.pointerValue<__goscript__type.Type>(new __goscript_field.Field({Name: "int"}, true).Owner()).Name)
	for (let __goscriptRangeTarget0 = __goscript_types.__goscript_get_order(), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let o = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		await $.println(o)
	}
}

export { __goscriptInit0 }

await __goscript_package_init.__goscript_package_init()

if ($.isMainScript(import.meta)) {
	await main()
}

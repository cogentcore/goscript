// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as levels from "@goscript/github.com/s4wave/goscript/tests/tests/init_address_of_lazy_var/levels/index.js"

import * as __goscript_vars from "./vars.gs.ts"
import "@goscript/github.com/s4wave/goscript/tests/tests/init_address_of_lazy_var/levels/index.js"
import "./vars.gs.ts"

export var UserPtr: $.VarRef<number> | null

export function __goscript_init_UserPtr(): void {
	if (((UserPtr) as any) === undefined) {
		UserPtr = __goscript_vars.UserLevel
	}
}

export function __goscript_get_UserPtr(): $.VarRef<number> | null {
	if (((UserPtr) as any) === undefined) {
		__goscript_init_UserPtr()
	}
	return UserPtr
}

export function __goscript_set_UserPtr(__goscriptValue: $.VarRef<number> | null): void {
	UserPtr = __goscriptValue
}

export var LevelPtr: $.VarRef<number> | null

export function __goscript_init_LevelPtr(): void {
	if (((LevelPtr) as any) === undefined) {
		LevelPtr = __goscript_vars.__goscript_get_Level()
	}
}

export function __goscript_get_LevelPtr(): $.VarRef<number> | null {
	if (((LevelPtr) as any) === undefined) {
		__goscript_init_LevelPtr()
	}
	return LevelPtr
}

export function __goscript_set_LevelPtr(__goscriptValue: $.VarRef<number> | null): void {
	LevelPtr = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	await $.println($.pointerValue<number>(__goscript_get_UserPtr()), __goscript_vars.UserLevel.value)
	__goscript_get_UserPtr()!.value = 5
	await $.println(__goscript_vars.UserLevel.value, $.pointerValue<number>(__goscript_get_UserPtr()))
	await $.println($.pointerValue<number>(__goscript_get_LevelPtr()), __goscript_vars.__goscript_get_Level().value)
	__goscript_vars.__goscript_set_Level(7)
	await $.println($.pointerValue<number>(__goscript_get_LevelPtr()))
	await $.println($.pointerValue<number>(ImportedPtr), levels.__goscript_get_UserLevel(), $.pointerValue<number>(levels.Ptr()))
	ImportedPtr!.value = 8
	await $.println(levels.__goscript_get_UserLevel(), $.pointerValue<number>(levels.Ptr()))
}

export let ImportedPtr: $.VarRef<number> | null = levels.__goscript_get_UserLevel()

export function __goscript_set_ImportedPtr(__goscriptValue: $.VarRef<number> | null): void {
	ImportedPtr = __goscriptValue
}

if ($.isMainScript(import.meta)) {
	await main()
}

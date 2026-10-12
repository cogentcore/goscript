// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript__default from "./default.gs.ts"
import "./default.gs.ts"

export type Level = number

export let Verbosity: $.VarRef<Level> = $.varRef(2)

export function __goscript_set_Verbosity(__goscriptValue: Level): void {
	Verbosity.value = __goscriptValue
}

export let Ptr: $.VarRef<Level> | null = Verbosity

export function __goscript_set_Ptr(__goscriptValue: $.VarRef<Level> | null): void {
	Ptr = __goscriptValue
}

export var UserLevel: $.VarRef<Level>

export function __goscript_init_UserLevel(): void {
	if (((UserLevel) as any) === undefined) {
		UserLevel = $.varRef(__goscript__default.__goscript_get_defaultLevel())
	}
}

export function __goscript_get_UserLevel(): $.VarRef<Level> {
	if (((UserLevel) as any) === undefined) {
		__goscript_init_UserLevel()
	}
	return UserLevel
}

export function __goscript_set_UserLevel(__goscriptValue: Level): void {
	__goscript_get_UserLevel().value = __goscriptValue
}

export function UserPtr(): $.VarRef<Level> | null {
	return UserLevel
}

export function Get(): Level {
	return $.pointerValue<Level>(Ptr)
}

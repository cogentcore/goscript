// Generated file based on levels.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export var UserLevel: $.VarRef<number>

export function __goscript_init_UserLevel(): void {
	if (((UserLevel) as any) === undefined) {
		UserLevel = $.varRef(defaultLevel)
	}
}

export function __goscript_get_UserLevel(): $.VarRef<number> {
	if (((UserLevel) as any) === undefined) {
		__goscript_init_UserLevel()
	}
	return UserLevel
}

export function __goscript_set_UserLevel(__goscriptValue: number): void {
	__goscript_get_UserLevel().value = __goscriptValue
}

export let defaultLevel: number = compute()

export function __goscript_set_defaultLevel(__goscriptValue: number): void {
	defaultLevel = __goscriptValue
}

export function compute(): number {
	return 4
}

export function Ptr(): $.VarRef<number> | null {
	return __goscript_get_UserLevel()
}

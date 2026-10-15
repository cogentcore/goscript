// Generated file based on default.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import type * as __goscript_dep from "./dep.gs.ts"

export var defaultLevel: __goscript_dep.Level

export function __goscript_init_defaultLevel(): void {
	if (((defaultLevel) as any) === undefined) {
		defaultLevel = 3
	}
}

export function __goscript_get_defaultLevel(): __goscript_dep.Level {
	if (((defaultLevel) as any) === undefined) {
		__goscript_init_defaultLevel()
	}
	return defaultLevel
}

export function __goscript_set_defaultLevel(__goscriptValue: __goscript_dep.Level): void {
	defaultLevel = __goscriptValue
}

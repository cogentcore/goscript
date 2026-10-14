// Generated file based on registry.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export let registered: globalThis.Map<string, boolean> | null = $.makeMap<string, boolean>([])

export function __goscript_set_registered(__goscriptValue: globalThis.Map<string, boolean> | null): void {
	registered = __goscriptValue
}

export function Register(name: string): void {
	$.mapSet(registered, name, true)
}

export function Registered(name: string): boolean {
	return $.mapGet<string, boolean, boolean>(registered, name, false)[0]
}

// Generated file based on vars.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export let UserLevel: $.VarRef<number> = $.varRef(await defaultLevel())

export function __goscript_set_UserLevel(__goscriptValue: number): void {
	UserLevel.value = __goscriptValue
}

export async function defaultLevel(): globalThis.Promise<number> {
	let ch: $.Channel<number> | null = $.makeChannel<number>(1, 0, "both")
	await $.chanSend(ch, 3)
	return await $.chanRecv(ch)
}

export var Level: $.VarRef<number>

export function __goscript_init_Level(): void {
	if (((Level) as any) === undefined) {
		Level = $.varRef(base + 1)
	}
}

export function __goscript_get_Level(): $.VarRef<number> {
	if (((Level) as any) === undefined) {
		__goscript_init_Level()
	}
	return Level
}

export function __goscript_set_Level(__goscriptValue: number): void {
	__goscript_get_Level().value = __goscriptValue
}

export let base: number = 10

export function __goscript_set_base(__goscriptValue: number): void {
	base = __goscriptValue
}

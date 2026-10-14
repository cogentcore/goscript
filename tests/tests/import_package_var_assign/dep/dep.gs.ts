// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript__default from "./default.gs.ts"
import "./default.gs.ts"

export type Level = number

export let Count: number = 1

export function __goscript_set_Count(__goscriptValue: number): void {
	Count = __goscriptValue
}

export let Hook: (() => $.GoError | globalThis.Promise<$.GoError>) | null = null! as (() => $.GoError | globalThis.Promise<$.GoError>) | null

export function __goscript_set_Hook(__goscriptValue: (() => $.GoError | globalThis.Promise<$.GoError>) | null): void {
	Hook = __goscriptValue
}

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

export function Current(): number {
	return Count
}

export async function Wait(): globalThis.Promise<$.GoError> {
	let ch: $.Channel<$.GoError> | null = $.makeChannel<$.GoError>(1, null! as $.GoError, "both")
	await $.chanSend(ch, null)
	return await $.chanRecv(ch)
}

export async function Run(): globalThis.Promise<$.GoError> {
	return Hook!()
}

export function Get(): Level {
	return $.pointerValue<Level>(Ptr)
}

export function UserPtr(): $.VarRef<Level> | null {
	return __goscript_get_UserLevel()
}

var __goscriptAwait: any

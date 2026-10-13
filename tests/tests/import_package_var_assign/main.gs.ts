// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/import_package_var_assign/dep/index.js"

import * as __goscript_vars from "./vars.gs.ts"

import * as __goscript_package_init from "./__goscript_package_init.gs.ts"
import "@goscript/github.com/s4wave/goscript/tests/tests/import_package_var_assign/dep/index.js"
import "./vars.gs.ts"

export var userPtr: $.VarRef<number> | null

export function __goscript_init_userPtr(): void {
	if (((userPtr) as any) === undefined) {
		userPtr = __goscript_vars.userLevel
	}
}

export function __goscript_get_userPtr(): $.VarRef<number> | null {
	if (((userPtr) as any) === undefined) {
		__goscript_init_userPtr()
	}
	return userPtr
}

export function __goscript_set_userPtr(__goscriptValue: $.VarRef<number> | null): void {
	userPtr = __goscriptValue
}

export var levelPtr: $.VarRef<number> | null

export function __goscript_init_levelPtr(): void {
	if (((levelPtr) as any) === undefined) {
		levelPtr = __goscript_vars.__goscript_get_level()
	}
}

export function __goscript_get_levelPtr(): $.VarRef<number> | null {
	if (((levelPtr) as any) === undefined) {
		__goscript_init_levelPtr()
	}
	return levelPtr
}

export function __goscript_set_levelPtr(__goscriptValue: $.VarRef<number> | null): void {
	levelPtr = __goscriptValue
}

export let importedPtr: $.VarRef<dep.Level> | null = dep.__goscript_get_UserLevel()

export function __goscript_set_importedPtr(__goscriptValue: $.VarRef<dep.Level> | null): void {
	importedPtr = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	dep.__goscript_set_Count(7)
	await $.println(dep.Current())
	dep.__goscript_set_Hook($.functionValue(async (): globalThis.Promise<$.GoError> => {
		return await dep.Wait()
	}, ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo)))
	{
		let err = await dep.Run()
		if (err != null) {
			await $.println("hook error")
			return
		}
	}
	await $.println("hook ok")

	// Read and write variables stored in a pointer box.
	if (dep.Verbosity.value <= 2) {
		await $.println("at most 2")
	}
	await $.println(dep.Verbosity.value + 1, $.int(dep.Verbosity.value))
	dep.__goscript_set_Verbosity(5)
	await $.println(dep.Get(), dep.Verbosity.value > 3)
	dep.__goscript_set_Verbosity(dep.Verbosity.value + 1)
	await $.println($.pointerValue<dep.Level>(dep.Ptr))
	let p: $.VarRef<dep.Level> | null = dep.Verbosity
	p!.value = 9
	await $.println(dep.Verbosity.value, dep.Get())
	if (dep.__goscript_get_UserLevel().value <= 3) {
		await $.println("user level", $.int(dep.__goscript_get_UserLevel().value), $.pointerValue<dep.Level>(dep.UserPtr()))
	}

	// Read and write lazy variables through package-level pointers.
	await $.println($.pointerValue<number>(__goscript_get_userPtr()), __goscript_vars.userLevel.value)
	__goscript_get_userPtr()!.value = 5
	await $.println(__goscript_vars.userLevel.value, $.pointerValue<number>(__goscript_get_userPtr()))
	await $.println($.pointerValue<number>(__goscript_get_levelPtr()), __goscript_vars.__goscript_get_level().value)
	__goscript_vars.__goscript_set_level(7)
	await $.println($.pointerValue<number>(__goscript_get_levelPtr()))
	importedPtr!.value = 8
	await $.println($.int(dep.__goscript_get_UserLevel().value), $.pointerValue<dep.Level>(dep.UserPtr()))
}

await __goscript_package_init.__goscript_package_init()

if ($.isMainScript(import.meta)) {
	await main()
}

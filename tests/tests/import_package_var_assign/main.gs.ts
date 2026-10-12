// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/import_package_var_assign/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/import_package_var_assign/dep/index.js"

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
}

if ($.isMainScript(import.meta)) {
	await main()
}

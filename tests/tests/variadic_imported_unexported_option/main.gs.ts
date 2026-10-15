// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as subpkg from "@goscript/github.com/s4wave/goscript/tests/tests/variadic_imported_unexported_option/subpkg/index.js"

export async function main(): globalThis.Promise<void> {
	let thing = subpkg.New($.arrayToSlice<subpkg.option | null>([subpkg.WithValue(7), subpkg.WithLabel("hi")]))
	let thing$: subpkg.Thing = thing == null ? $.pointerTarget<subpkg.Thing>(thing) : (thing as any).__isVarRef === true ? (thing as any).value : (thing as any).__goValue === undefined ? (thing as any) : $.pointerTarget<subpkg.Thing>(thing)
	await $.println((thing$ as subpkg.Thing).Value)
	await $.println((thing$ as subpkg.Thing).Label)
}

if ($.isMainScript(import.meta)) {
	await main()
}

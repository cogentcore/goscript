// Generated file based on rune_const_reference.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as subpkg from "@goscript/github.com/s4wave/goscript/tests/tests/rune_const_reference/subpkg/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/rune_const_reference/subpkg/index.js"

export async function main(): globalThis.Promise<void> {
	// Test importing rune constants from another package
	const separator: number = 47
	const newline: number = 10

	// This should use the variable name instead of evaluating to numeric literal
	await $.println("separator used in function:", useInFunction(47))
	await $.println("newline used in function:", useInFunction(10))
}

export function useInFunction(r: number): number {
	return $.int(((r + 1) | 0), 32)
}

if ($.isMainScript(import.meta)) {
	await main()
}

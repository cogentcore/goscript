// Generated file based on build_tags.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_build_tags_generic from "./build_tags_generic.gs.ts"

import * as __goscript_build_tags_js from "./build_tags_js.gs.ts"

import * as __goscript_build_tags_noasm from "./build_tags_noasm.gs.ts"

import * as __goscript_build_tags_purego from "./build_tags_purego.gs.ts"
import "./build_tags_generic.gs.ts"
import "./build_tags_js.gs.ts"
import "./build_tags_noasm.gs.ts"
import "./build_tags_purego.gs.ts"

export async function main(): globalThis.Promise<void> {
	await $.println("=== Build Tags Test ===")

	// Test that platform-specific files are handled correctly
	// This should only compile files with js/wasm build tags
	// and exclude files with other platform tags

	await __goscript_build_tags_js.testJSWasm()
	await __goscript_build_tags_generic.testGeneric()

	// goscript cannot run assembly, so it builds with the purego and noasm
	// tags, which select pure Go code in packages that also ship assembly.
	await __goscript_build_tags_noasm.testNoAsm()
	await __goscript_build_tags_purego.testPureGo()

	await $.println("=== End Build Tags Test ===")
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on __goscript_package_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as __goscript_file0 from "./main.gs.ts"

import * as __goscript_file1 from "./vars.gs.ts"

let initialized = false

export async function __goscript_package_init(): globalThis.Promise<void> {
	if (initialized) {
		return
	}
	initialized = true
	await __goscript_file0.__goscript_init_userPtr()
	await __goscript_file1.__goscript_init_level()
	await __goscript_file0.__goscript_init_levelPtr()
}

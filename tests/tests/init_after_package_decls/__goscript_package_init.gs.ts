// Generated file based on __goscript_package_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as __goscript_file0 from "./types.gs.ts"

import * as __goscript_file1 from "./main.gs.ts"

let initialized = false

export async function __goscript_package_init(): globalThis.Promise<void> {
	if (initialized) {
		return
	}
	initialized = true
	__goscript_file0.__goscript_init_order()
	__goscript_file0.__goscript_init_Types()
	__goscript_file1.__goscript_init_Later()
	__goscript_file0.__goscript_init_Default()
	__goscript_file1.__goscriptInit0()
	__goscript_file0.__goscriptInit0()
}

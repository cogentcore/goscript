// Generated file based on __goscript_package_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as __goscript_file0 from "./c.gs.ts"

let initialized = false

export async function __goscript_package_init(): globalThis.Promise<void> {
	if (initialized) {
		return
	}
	initialized = true
	__goscript_file0.__goscript_init_cTable()
	__goscript_file0.__goscript_init_cCopy()
}

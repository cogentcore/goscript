// Generated file based on load.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errors from "@goscript/errors/index.js"

import * as __goscript_package_var_error_name from "./package_var_error_name.gs.ts"
import "@goscript/errors/index.js"
import "./package_var_error_name.gs.ts"

export async function load(): globalThis.Promise<number> {
	let ch = $.makeChannel<number>(1, 0, "both")
	await $.chanSend(ch, 1)
	__goscript_package_var_error_name.__goscript_set_Error(errors.New("loaded"))
	return await $.chanRecv(ch)
}

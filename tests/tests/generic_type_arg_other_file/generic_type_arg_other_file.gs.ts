// Generated file based on generic_type_arg_other_file.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_descriptor from "./descriptor.gs.ts"

import * as __goscript_device from "./device.gs.ts"
import "./descriptor.gs.ts"
import "./device.gs.ts"

export async function main(): globalThis.Promise<void> {
	await $.println($.mustTypeAssert<string>(await __goscript_device.create(new __goscript_descriptor.descriptor({Label: "shader"})), /* @__PURE__ */ $.basicType("string")))
	await $.println(await __goscript_device.create(null) == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

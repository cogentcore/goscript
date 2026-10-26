// Generated file based on cross_file_struct_typeinfo_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_a from "./a.gs.ts"
import * as __goscript_b from "./b.gs.ts"
import * as __goscript_c from "./c.gs.ts"
import * as __goscript_package_init from "./__goscript_package_init.gs.ts"

export async function main(): globalThis.Promise<void> {
	let a = __goscript_a.makeA()
	let b = __goscript_b.makeB()
	await $.println("ok:", a.next == null, b.inner.next == null)
	await $.println("table:", __goscript_b.countC(), $.plainSliceIndex(__goscript_c.__goscript_get_cCopy()!, 1).inner.next == null)
}

await __goscript_package_init.__goscript_package_init()

if ($.isMainScript(import.meta)) {
	await main()
}

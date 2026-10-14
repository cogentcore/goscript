// Generated file based on package_import_hash_maphash_write_comparable_var.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as maphash from "@goscript/hash/maphash/index.js"
import "@goscript/hash/maphash/index.js"

export async function main(): globalThis.Promise<void> {
	let seed = $.markAsStructValue($.cloneStructValue(maphash.MakeSeed()))
	let a: $.VarRef<maphash.Hash> = $.varRef($.markAsStructValue(new maphash.Hash()))
	let b: $.VarRef<maphash.Hash> = $.varRef($.markAsStructValue(new maphash.Hash()))
	a.value.SetSeed($.markAsStructValue($.cloneStructValue(seed)))
	b.value.SetSeed($.markAsStructValue($.cloneStructValue(seed)))
	maphash.WriteComparable(a, 42)
	maphash.WriteComparable(b, 42)
	await $.println(a.value.Sum64() == b.value.Sum64())
	maphash.WriteComparable(b, "x")
	await $.println(a.value.Sum64() == b.value.Sum64())
}

if ($.isMainScript(import.meta)) {
	await main()
}

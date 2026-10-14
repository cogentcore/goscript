// Generated file based on generic_named_map_method_other_file.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as __goscript_trie from "./trie.gs.ts"
import "./trie.gs.ts"

export async function main(): globalThis.Promise<void> {
	let tr: __goscript_trie.trie = $.makeMap<number, string>()
	let __goscriptTuple0: any = __goscript_trie.trie_insert(tr, {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, V: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }}, 1, "a")
	let old = (__goscriptTuple0[0] as string)
	let n = __goscriptTuple0[1]
	await $.println($.stringEqual(old, ""), n)
	let __goscriptTuple1: any = __goscript_trie.trie_insert(tr, {[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, V: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }}, 1, "b")
	old = (__goscriptTuple1[0] as string)
	n = __goscriptTuple1[1]
	await $.println(old, n)
	let nm: __goscript_trie.names = $.makeMap<string, number>()
	__goscript_trie.names_add(nm, "x")
	await $.println(__goscript_trie.names_add(nm, "x"))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on generic_named_map_method_other_file.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_trie from "./trie.gs.ts"

export async function main(): globalThis.Promise<void> {
	let tr = $.makeMap<number, string>()
	let __goscriptTuple0: any = __goscript_trie.trie_insert(tr, __goscriptStatic0(), 1, "a")
	let old: string = (__goscriptTuple0[0] as string)
	let n: number = __goscriptTuple0[1]
	await $.println($.stringEqual(old, ""), n)
	let __goscriptTuple1: any = __goscript_trie.trie_insert(tr, __goscriptStatic0(), 1, "b")
	old = (__goscriptTuple1[0] as string)
	n = __goscriptTuple1[1]
	await $.println(old, n)
	let nm = $.makeMap<string, number>()
	__goscript_trie.names_add(nm, "x")
	await $.println(__goscript_trie.names_add(nm, "x"))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, V: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

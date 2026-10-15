// Generated file based on package_import_regexp.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as regexp from "@goscript/regexp/index.js"

export async function main(): globalThis.Promise<void> {
	let label = regexp.MustCompile("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$")
	let anchored = regexp.MustCompile("^a$")
	let suffix = regexp.MustCompile("a$")

	await $.println("label spacewave-web:", await (label !== null && (label as any).__isVarRef !== true && (label as any).__goValue === undefined ? ((label as any) as regexp.Regexp).MatchString("spacewave-web") : regexp.Regexp.prototype.MatchString.call(label, "spacewave-web")))
	await $.println("anchored a:", await (anchored !== null && (anchored as any).__isVarRef !== true && (anchored as any).__goValue === undefined ? ((anchored as any) as regexp.Regexp).MatchString("a") : regexp.Regexp.prototype.MatchString.call(anchored, "a")))
	await $.println("suffix ba:", await (suffix !== null && (suffix as any).__isVarRef !== true && (suffix as any).__goValue === undefined ? ((suffix as any) as regexp.Regexp).MatchString("ba") : regexp.Regexp.prototype.MatchString.call(suffix, "ba")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

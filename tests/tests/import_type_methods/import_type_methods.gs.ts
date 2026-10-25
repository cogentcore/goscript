// Generated file based on import_type_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errlist from "@goscript/github.com/s4wave/goscript/tests/tests/import_type_methods/errlist/index.js"

export class parser {
	public declare errors: errlist.ErrorList

	constructor(__goscriptValue?: boolean, errors$?: errlist.ErrorList) {
		this.errors = errors$ ?? (null! as errlist.ErrorList)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): parser {
		return new parser(true, this.errors)
	}

	public __goscriptAssign(source: parser): this {
		this.errors = source.errors
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.parser",
		() => new parser(),
		() => [],
		parser,
		() => [{ name: "errors", key: "errors", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "errlist.ErrorList") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let p: parser = new parser(true)
	p.errors = (errlist.ErrorList_Add(p.errors, "error") as errlist.ErrorList)
	await $.println($.plainSliceIndex(p.errors!, 0))
}

if ($.isMainScript(import.meta)) {
	await main()
}

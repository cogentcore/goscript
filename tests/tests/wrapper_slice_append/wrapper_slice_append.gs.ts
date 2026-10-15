// Generated file based on wrapper_slice_append.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errlist from "@goscript/github.com/s4wave/goscript/tests/tests/wrapper_slice_append/errlist/index.js"

export class parser {
	public declare errors: errlist.ErrorList

	public declare astruct: errlist.AStruct

	constructor(init?: Partial<{errors?: errlist.ErrorList, astruct?: errlist.AStruct}>, __goscriptValue?: boolean) {
		this.errors = init?.errors ?? (null! as errlist.ErrorList)
		this.astruct = init?.astruct ? init.astruct.clone() : new errlist.AStruct(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): parser {
		return new parser(this, true)
	}

	public __goscriptAssign(source: parser): this {
		this.errors = source.errors
		this.astruct.__goscriptAssign(source.astruct)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.parser",
		() => new parser(),
		() => [],
		parser,
		() => [{ name: "errors", key: "errors", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "errlist.ErrorList") }, { name: "astruct", key: "astruct", type: "errlist.AStruct" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let p: parser = new parser(undefined, true)
	// this Add method does not work:
	errlist.ErrorList_Add($.fieldRef(p, "errors"), "error")
	await $.println($.arrayIndex(p.errors!, 0))

	// but it does work for a struct type:
	p.astruct.Set("astruct")
	await $.println(p.astruct.Msg)
}

if ($.isMainScript(import.meta)) {
	await main()
}

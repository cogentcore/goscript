// Generated file based on wrapper_slice_append.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errlist from "@goscript/github.com/s4wave/goscript/tests/tests/wrapper_slice_append/errlist/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/wrapper_slice_append/errlist/index.js"

export class parser {
	public get errors(): errlist.ErrorList {
		return this._fields.errors
	}

	public set errors(value: errlist.ErrorList) {
		this._fields.errors = value
	}

	public get astruct(): errlist.AStruct {
		return this._fields.astruct
	}

	public set astruct(value: errlist.AStruct) {
		this._fields.astruct = value
	}

	public _fields: {
		errors: errlist.ErrorList
		astruct: errlist.AStruct
	}

	constructor(init?: Partial<{errors?: errlist.ErrorList, astruct?: errlist.AStruct}>, __goscriptValue?: boolean) {
		this._fields = {
			errors: init?.errors ?? (null! as errlist.ErrorList),
			astruct: init?.astruct ? init.astruct.clone() : new errlist.AStruct(undefined, true)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): parser {
		return new parser(this, true)
	}

	public __goscriptAssign(source: parser): void {
		const target = this._fields
		const values = source._fields
		target.errors = values.errors
		$.assignStruct(target.astruct, values.astruct)
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
	errlist.ErrorList_Add($.fieldRef(p._fields, "errors"), "error")
	await $.println($.arrayIndex(p.errors!, 0))

	// but it does work for a struct type:
	p.astruct.Set("astruct")
	await $.println(p.astruct.Msg)
}

if ($.isMainScript(import.meta)) {
	await main()
}

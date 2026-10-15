// Generated file based on memory.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class file {
	public declare name: string

	public declare data: $.Slice<number>

	constructor(__goscriptValue?: boolean, name$?: string, data$?: $.Slice<number>) {
		this.name = name$ ?? ""
		this.data = data$ ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): file {
		return new file(true, this.name, this.data)
	}

	public __goscriptAssign(source: file): this {
		this.name = source.name
		this.data = source.data
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.file",
		() => new file(),
		() => [],
		file,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

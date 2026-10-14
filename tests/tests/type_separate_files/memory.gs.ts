// Generated file based on memory.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class file {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public get data(): $.Slice<number> {
		return this._fields.data
	}

	public set data(value: $.Slice<number>) {
		this._fields.data = value
	}

	public _fields: {
		name: string
		data: $.Slice<number>
	}

	constructor(init?: Partial<{name?: string, data?: $.Slice<number>}>) {
		this._fields = {
			name: init?.name ?? ("" as string),
			data: init?.data ?? (null! as $.Slice<number>)
		}
	}

	public clone(): file {
		return $.markAsStructValue(new file(this))
	}

	static __typeInfo = $.registerStructType(
		"main.file",
		() => new file(),
		() => [],
		file,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

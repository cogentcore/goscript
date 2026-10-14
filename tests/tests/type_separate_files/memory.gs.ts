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

	constructor(init?: Partial<{name?: string, data?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string),
			data: init?.data ?? (null! as $.Slice<number>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): file {
		return new file(this, true)
	}

	public __goscriptAssign(source: file): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
		target.data = values.data
	}

	static __typeInfo = $.registerStructType(
		"main.file",
		() => new file(),
		() => [],
		file,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

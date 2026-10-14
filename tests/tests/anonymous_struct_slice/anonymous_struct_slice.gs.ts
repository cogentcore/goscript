// Generated file based on anonymous_struct_slice.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class namedItem {
	public get key(): string {
		return this._fields.key
	}

	public set key(value: string) {
		this._fields.key = value
	}

	public get data(): $.Slice<number> {
		return this._fields.data
	}

	public set data(value: $.Slice<number>) {
		this._fields.data = value
	}

	public _fields: {
		key: string
		data: $.Slice<number>
	}

	constructor(init?: Partial<{key?: string, data?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			key: init?.key ?? ("" as string),
			data: init?.data ?? (null! as $.Slice<number>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): namedItem {
		return new namedItem(this, true)
	}

	public __goscriptAssign(source: namedItem): void {
		const target = this._fields
		const values = source._fields
		target.key = values.key
		target.data = values.data
	}

	static __typeInfo = $.registerStructType(
		"main.namedItem",
		() => new namedItem(),
		() => [],
		namedItem,
		() => [{ name: "key", key: "key", type: /* @__PURE__ */ $.basicType("string") }, { name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = $.arrayToSlice<{"name": string, "input": string, "count": number}>([$.anonymousStructValue({name: "first", input: "alpha", count: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_slice" }), /* @__PURE__ */ $.structField("input", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_slice" }), /* @__PURE__ */ $.structField("count", /* @__PURE__ */ $.basicType("int"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_slice" })] }), $.anonymousStructValue({name: "second", input: "beta", count: 2}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_slice" }), /* @__PURE__ */ $.structField("input", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_slice" }), /* @__PURE__ */ $.structField("count", /* @__PURE__ */ $.basicType("int"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_slice" })] })]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let tt = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as {"name": string, "input": string, "count": number})))
		await $.println(tt.name, tt.input, tt.count)
	}

	let x = $.anonymousStructValue({Name: "third", Offsets: (null as $.Slice<number>), Count: 3}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Offsets", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), [1], 16, true), /* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [2], 40, true)] })
	x.Offsets = $.appendOne(x.Offsets, 5)
	await $.println(x.Name, $.arrayIndex(x.Offsets!, 0), x.Count)

	let __goscriptTuple0: any = buildNamedItems()
	let items: $.Slice<namedItem> = __goscriptTuple0[0]
	for (let __goscriptRangeTarget1 = $.goSlice(items, 1, undefined), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let item = ((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as namedItem)).clone()
		await $.println(item.key, $.sliceLen(item.data))
	}
}

export function buildNamedItems(): [$.Slice<namedItem>, boolean] {
	return [$.arrayToSlice<namedItem>([new namedItem({key: "skip", data: new Uint8Array([0]) as $.Slice<number>}, true), new namedItem({key: "keep", data: new Uint8Array([1, 2, 3]) as $.Slice<number>}, true)]), true]
}

if ($.isMainScript(import.meta)) {
	await main()
}

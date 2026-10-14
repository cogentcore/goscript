// Generated file based on generic_struct_slice_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as slices from "@goscript/slices/index.js"
import "@goscript/slices/index.js"

export class item {
	public get Text(): string {
		return this._fields.Text
	}

	public set Text(value: string) {
		this._fields.Text = value
	}

	public _fields: {
		Text: string
	}

	constructor(init?: Partial<{Text?: string}>) {
		this._fields = {
			Text: init?.Text ?? ("" as string)
		}
	}

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "Text", key: "Text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class arena {
	public get data(): $.Slice<any> {
		return this._fields.data
	}

	public set data(value: $.Slice<any>) {
		this._fields.data = value
	}

	public _fields: {
		data: $.Slice<any>
	}

	constructor(init?: Partial<{data?: $.Slice<any>}>) {
		this._fields = {
			data: init?.data ?? (null! as $.Slice<any>)
		}
	}

	public clone(): arena {
		return $.markAsStructValue(new arena(this))
	}

	public New(__typeArgs: $.GenericTypeArgs | undefined): any {
		let a: arena | $.VarRef<arena> | null = this;
		if ($.len($.pointerValue<arena>(a).data) == $.cap($.pointerValue<arena>(a).data)) {
			let nextSize = 1
			$.pointerValue<arena>(a).data = (slices.Grow(null, nextSize, () => ($.genericZero(__typeArgs, "T", null) as any)) as $.Slice<any>)
		}
		let index = $.len($.pointerValue<arena>(a).data)
		$.pointerValue<arena>(a).data = $.goSlice($.pointerValue<arena>(a).data, undefined, index + 1)
		return $.indexRef($.pointerValue<arena>(a).data!, index)
	}

	static __typeInfo = $.registerStructType(
		"main.arena",
		() => new arena(),
		() => [{ name: "New", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }) }], pointerReceiver: true }],
		arena,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a: $.VarRef<arena> = $.varRef($.markAsStructValue(new arena()))
	let value: item | $.VarRef<item> | null = (a.value.New(__goscriptStatic0()) as item | $.VarRef<item> | null)
	$.pointerValue<item>(value).Text = "ok"
	await $.println($.pointerValue<item>(value).Text)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.item", zero: () => $.markAsStructValue(new item()) }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

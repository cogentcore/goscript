// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let run: (() => void) | null = $.functionValue(async (): globalThis.Promise<void> => {
		class item {
			public get name(): string {
				return this._fields.name
			}

			public set name(value: string) {
				this._fields.name = value
			}

			public get count(): number {
				return this._fields.count
			}

			public set count(value: number) {
				this._fields.count = value
			}

			public _fields: {
				name: string
				count: number
			}

			constructor(init?: Partial<{name?: string, count?: number}>) {
				this._fields = {
					name: init?.name ?? ("" as string),
					count: init?.count ?? (0 as number)
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
				() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "count", key: "count", type: /* @__PURE__ */ $.basicType("int") }]
			)
		}

		let items: $.Slice<item> = $.arrayToSlice<item>([$.markAsStructValue(new item({name: "alpha", count: 1})), $.markAsStructValue(new item({name: "beta", count: 2}))])
		for (let __goscriptRangeTarget0 = items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let item = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as item)))
			await $.println(item.name, item.count)
		}
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))

	void (__goscriptAwait = run!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

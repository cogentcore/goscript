// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	let run = $.functionValue(async () => {
		class item {
			public declare name: string

			public declare count: number

			constructor(init?: Partial<{name?: string, count?: number}>, __goscriptValue?: boolean) {
				this.name = init?.name ?? ("" as string)
				this.count = init?.count ?? (0 as number)
				;(this as any)[$.structValueMarker] = __goscriptValue === true
			}

			public clone(): item {
				return new item(this, true)
			}

			public __goscriptAssign(source: item): this {
				this.name = source.name
				this.count = source.count
				return this
			}

			static __typeInfo = $.registerStructType(
				"main.item",
				() => new item(),
				() => [],
				item,
				() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "count", key: "count", type: /* @__PURE__ */ $.basicType("int") }]
			)
		}

		let items = $.arrayToSlice<item>([$.markAsStructValue(new item({name: "alpha", count: 1})), $.markAsStructValue(new item({name: "beta", count: 2}))])
		for (let __goscriptRangeTarget0 = items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let item = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as item)))
			await $.println(item.name, item.count)
		}
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))

	await run()
}

if ($.isMainScript(import.meta)) {
	await main()
}

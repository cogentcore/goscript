// Generated file based on map_builtin_name_collision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Map {
	public declare values: globalThis.Map<string, number> | null

	constructor(init?: Partial<{values?: globalThis.Map<string, number> | null}>, __goscriptValue?: boolean) {
		this.values = init?.values ?? (null! as globalThis.Map<string, number> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Map {
		return new Map(this, true)
	}

	public __goscriptAssign(source: Map): this {
		this.values = source.values
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Map",
		() => new Map(),
		() => [],
		Map,
		() => [{ name: "values", key: "values", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let m = new Map({values: $.makeMap<string, number>([["one", 1]])}, true)
	let [got, ok] = $.mapGet<string, number, number>(m.values, "one", 0)
	await $.println(got, ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on a.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as __goscript_b from "./b.gs.ts"
import * as __goscript_package_init from "./__goscript_package_init.gs.ts"

export class holder {
	public declare n: number

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): this {
		this.n = source.n
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export var seed: number

export function __goscript_init_seed(): void {
	if (((seed) as any) === undefined) {
		seed = 7
	}
}

export function __goscript_get_seed(): number {
	if (((seed) as any) === undefined) {
		__goscript_init_seed()
	}
	return seed
}

export function __goscript_set_seed(__goscriptValue: number): void {
	seed = __goscriptValue
}

export function useFirst(): number {
	return __goscript_b.__goscript_get_first().n
}

export async function main(): globalThis.Promise<void> {
	await $.println("main:", useFirst())
}

await __goscript_package_init.__goscript_package_init()

if ($.isMainScript(import.meta)) {
	await main()
}

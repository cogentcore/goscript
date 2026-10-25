// Generated file based on info.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class floatInfo {
	public declare mantbits: number

	public declare expbits: number

	constructor(__goscriptValue?: boolean, mantbits$?: number, expbits$?: number) {
		this.mantbits = mantbits$ ?? 0
		this.expbits = expbits$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): floatInfo {
		return new floatInfo(true, this.mantbits, this.expbits)
	}

	public __goscriptAssign(source: floatInfo): this {
		this.mantbits = source.mantbits
		this.expbits = source.expbits
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.floatInfo",
		() => new floatInfo(),
		() => [],
		floatInfo,
		() => [{ name: "mantbits", key: "mantbits", type: /* @__PURE__ */ $.basicType("int") }, { name: "expbits", key: "expbits", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let info: $.VarRef<floatInfo> = $.varRef(new floatInfo(true, 52, 11))

export function __goscript_set_info(__goscriptValue: floatInfo): void {
	$.assignStruct(info.value, __goscriptValue)
}

export function infoPtr(): floatInfo | $.VarRef<floatInfo> | null {
	return info
}

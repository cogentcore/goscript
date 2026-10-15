// Generated file based on info.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class floatInfo {
	public declare mantbits: number

	public declare expbits: number

	constructor(init?: Partial<{mantbits?: number, expbits?: number}>, __goscriptValue?: boolean) {
		this.mantbits = init?.mantbits ?? (0 as number)
		this.expbits = init?.expbits ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): floatInfo {
		return new floatInfo(this, true)
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

export let info: $.VarRef<floatInfo> = $.varRef(new floatInfo({mantbits: 52, expbits: 11}, true))

export function __goscript_set_info(__goscriptValue: floatInfo): void {
	$.assignStruct(info.value, __goscriptValue)
}

export function infoPtr(): floatInfo | $.VarRef<floatInfo> | null {
	return info
}

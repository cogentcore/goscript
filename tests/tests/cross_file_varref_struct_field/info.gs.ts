// Generated file based on info.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class floatInfo {
	public get mantbits(): number {
		return this._fields.mantbits
	}

	public set mantbits(value: number) {
		this._fields.mantbits = value
	}

	public get expbits(): number {
		return this._fields.expbits
	}

	public set expbits(value: number) {
		this._fields.expbits = value
	}

	public _fields: {
		mantbits: number
		expbits: number
	}

	constructor(init?: Partial<{mantbits?: number, expbits?: number}>) {
		this._fields = {
			mantbits: init?.mantbits ?? (0 as number),
			expbits: init?.expbits ?? (0 as number)
		}
	}

	public clone(): floatInfo {
		return $.markAsStructValue(new floatInfo(this))
	}

	static __typeInfo = $.registerStructType(
		"main.floatInfo",
		() => new floatInfo(),
		() => [],
		floatInfo,
		() => [{ name: "mantbits", key: "mantbits", type: /* @__PURE__ */ $.basicType("int") }, { name: "expbits", key: "expbits", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let info: $.VarRef<floatInfo> = $.varRef($.markAsStructValue(new floatInfo({mantbits: 52, expbits: 11})))

export function __goscript_set_info(__goscriptValue: floatInfo): void {
	$.assignStruct(info.value, __goscriptValue)
}

export function infoPtr(): floatInfo | $.VarRef<floatInfo> | null {
	return info
}

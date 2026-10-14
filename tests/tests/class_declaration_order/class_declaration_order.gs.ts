// Generated file based on class_declaration_order.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type named = {
	Name(): string
}

$.registerInterfaceType(
	"main.named",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class lateType {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): lateType {
		return new lateType(this, true)
	}

	public __goscriptAssign(source: lateType): void {
	}

	public Name(): string {
		return "late"
	}

	static __typeInfo = $.registerStructType(
		"main.lateType",
		() => new lateType(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		lateType,
		() => []
	)
}

export let defaultNamed: named | null = $.interfaceValue<named | null>(new lateType(), "*main.lateType", /* @__PURE__ */ $.pointerType("main.lateType"))

export function __goscript_set_defaultNamed(__goscriptValue: named | null): void {
	defaultNamed = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	await $.println((__goscriptAwait = $.pointerValue<Exclude<named, null>>(defaultNamed).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

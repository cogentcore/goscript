// Generated file based on type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as strings from "@goscript/strings/index.js"

import * as __goscript_helper from "./helper.gs.ts"

import * as __goscript_method from "./method.gs.ts"
import "@goscript/strings/index.js"
import "./helper.gs.ts"
import "./method.gs.ts"

export class label {
	public get value(): string {
		return this._fields.value
	}

	public set value(value: string) {
		this._fields.value = value
	}

	public _fields: {
		value: string
	}

	constructor(init?: Partial<{value?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): label {
		return new label(this, true)
	}

	public __goscriptAssign(source: label): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	public Format(): string {
		const l = this;
		let state: __goscript_helper.helperState | $.VarRef<__goscript_helper.helperState> | null = __goscript_helper.newHelperState()
		return $.concatString(strings.ToUpper(l.value), $.pointerValue<__goscript_helper.helperState>(state).text)
	}

	static __typeInfo = $.registerStructType(
		"main.label",
		() => new label(),
		() => [{ name: "Format", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		label,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let item = new label({value: "go"}, true)
	await $.println(item.Format())
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on helper.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class helperState {
	public declare text: string

	constructor(__goscriptValue?: boolean, text$?: string) {
		this.text = text$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): helperState {
		return new helperState(true, this.text)
	}

	public __goscriptAssign(source: helperState): this {
		this.text = source.text
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.helperState",
		() => new helperState(),
		() => [],
		helperState,
		() => [{ name: "text", key: "text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function newHelperState(): helperState | $.VarRef<helperState> | null {
	return (() => { const __goscriptLiteralField0 = suffix(); return new helperState(false, __goscriptLiteralField0) })()
}

export function suffix(): string {
	return "SCRIPT"
}

// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/import_unexported_inferred_type/dep", ["dep.hiddenError"])

export class hiddenError {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): hiddenError {
		return new hiddenError(this, true)
	}

	public __goscriptAssign(source: hiddenError): void {
	}

	public Error(): string {
		return "closed"
	}

	static __typeInfo = $.registerStructType(
		"dep.hiddenError",
		() => new hiddenError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		hiddenError,
		() => []
	)
}

export let ErrClosed: hiddenError = new hiddenError(undefined, true)

export function __goscript_set_ErrClosed(__goscriptValue: hiddenError): void {
	$.assignStruct(ErrClosed, __goscriptValue)
}

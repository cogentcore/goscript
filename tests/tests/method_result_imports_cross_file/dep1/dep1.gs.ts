// Generated file based on dep1.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep2 from "@goscript/github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep2/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep2/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep1", ["dep1.maker"])

export class maker {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): maker {
		return new maker(this, true)
	}

	public __goscriptAssign(source: maker): void {
	}

	public Value(): string {
		return "ok"
	}

	static __typeInfo = $.registerStructType(
		"dep1.maker",
		() => new maker(),
		() => [{ name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		maker,
		() => []
	)
}

export function Make(): dep2.Value | null {
	return $.interfaceValue<dep2.Value | null>(new maker(undefined, true), "dep1.maker", "dep1.maker")
}

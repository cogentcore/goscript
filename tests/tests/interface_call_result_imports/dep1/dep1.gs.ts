// Generated file based on dep1.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as dep2 from "@goscript/github.com/s4wave/goscript/tests/tests/interface_call_result_imports/dep2/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/interface_call_result_imports/dep2/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/interface_call_result_imports/dep1", ["dep1.maker"])

export class maker {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): maker {
		return new maker(true)
	}

	public __goscriptAssign(source: maker): this {
		return this
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
	return $.structInterfaceValue<dep2.Value | null>(new maker(true), "dep1.maker", "dep1.maker")
}

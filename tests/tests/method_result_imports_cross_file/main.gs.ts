// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as dep1 from "@goscript/github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep1/index.js"
import * as dep2 from "@goscript/github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep2/index.js"
import * as __goscript_method from "./method.gs.ts"
import "@goscript/github.com/s4wave/goscript/tests/tests/method_result_imports_cross_file/dep2/index.js"
import "./method.gs.ts"

export class Holder {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
	}

	public async Run(): globalThis.Promise<void> {
		let v = dep1.Make()
		await $.println((__goscriptAwait = (v !== null && (v as any).__isVarRef !== true && (v as any).__goValue === undefined ? (v as Exclude<dep2.Value, null>) : $.pointerValue<Exclude<dep2.Value, null>>(v)).Value(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [{ name: "Run", args: [], returns: [] }],
		Holder,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	await $.markAsStructValue($.cloneStructValue(new Holder(undefined, true))).Run()
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on json_simple.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"

export class Simple {
	public declare X: number

	constructor(__goscriptValue?: boolean, X$?: number) {
		this.X = X$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Simple {
		return new Simple(true, this.X)
	}

	public __goscriptAssign(source: Simple): this {
		this.X = source.X
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Simple",
		() => new Simple(),
		() => [],
		Simple,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int"), tag: "json:\"x\"" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = new Simple(true, 42)
	let __goscriptTuple0: any = (json.Marshal($.interfaceValue((s).clone(), "main.Simple", "main.Simple")) as [$.Slice<number>, $.GoError])
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("Error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Result:", $.bytesToString(b))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

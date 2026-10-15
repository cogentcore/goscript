// Generated file based on json_simple.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"
import "@goscript/encoding/json/index.js"

export class Simple {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public _fields: {
		X: number
	}

	constructor(init?: Partial<{X?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Simple {
		return new Simple(this, true)
	}

	public __goscriptAssign(source: Simple): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
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
	let s = new Simple({X: 42}, true)
	let __goscriptTuple0: any = json.Marshal($.interfaceValue((s).clone(), "main.Simple", "main.Simple"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("Error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Result:", $.bytesToString(b))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

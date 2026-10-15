// Generated file based on new_expression.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Number = number

export class Pair {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pair {
		return new Pair(true, this.Value)
	}

	public __goscriptAssign(source: Pair): this {
		this.Value = source.Value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Pair",
		() => new Pair(),
		() => [],
		Pair,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let untypedInt = $.varRef<number>(42)
	await $.println("untyped int:", $.pointerValue<number>(untypedInt))

	let untypedBool = $.varRef<boolean>(true)
	await $.println("untyped bool:", $.pointerValue<boolean>(untypedBool))

	let value = 7
	let typedValue = $.varRef<number>(value)
	await $.println("typed value:", $.pointerValue<number>(typedValue))

	let namedValue = 9
	let namedPointer = $.varRef<Number>(namedValue)
	await $.println("named value:", $.pointerValue<Number>(namedPointer))

	let pairPointer = $.varRef<Pair>(new Pair(true, 11))
	await $.println("struct value:", $.pointerValue<Pair>(pairPointer).Value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

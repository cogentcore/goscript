// Generated file based on new_expression.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Number = number

export class Pair {
	public get Value(): number {
		return this._fields.Value
	}

	public set Value(value: number) {
		this._fields.Value = value
	}

	public _fields: {
		Value: number
	}

	constructor(init?: Partial<{Value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Pair {
		return new Pair(this, true)
	}

	public __goscriptAssign(source: Pair): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
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
	let namedPointer: $.VarRef<Number> | null = $.varRef<Number>(namedValue)
	await $.println("named value:", $.pointerValue<Number>(namedPointer))

	let pairPointer: Pair | $.VarRef<Pair> | null = $.varRef<Pair>(new Pair({Value: 11}, true))
	await $.println("struct value:", $.pointerValue<Pair>(pairPointer).Value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

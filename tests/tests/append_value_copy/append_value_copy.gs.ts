// Generated file based on append_value_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class cell {
	// width is the number of buffered characters.
	public declare width: number

	constructor(__goscriptValue?: boolean, width$?: number) {
		this.width = width$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): cell {
		return new cell(true, this.width)
	}

	public __goscriptAssign(source: cell): this {
		this.width = source.width
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.cell",
		() => new cell(),
		() => [],
		cell,
		() => [{ name: "width", key: "width", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Resetting a reusable cell must leave appended entries intact.
	let current = $.varRef(new cell(true, 7))
	let cells = $.appendOne<cell>(null, (current.value).clone())
	current.value = current.value.__goscriptAssign(new cell(true))
	await $.println("cell:", $.arrayIndex(cells!, 0).width, current.value.width)

	// Arrays also copy at the argument boundary.
	let row = $.arrayValue([3, 4])
	let rows = $.appendOne<number[]>(null, $.cloneArrayValue(row, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)))
	row[0] = 9
	await $.println("array:", ($.arrayIndex(rows!, 0))[0], row[0])

	// Pointer elements retain their identity.
	let pointers = $.appendOne<cell | $.VarRef<cell> | null>(null, current, $.appendZeros.nil)
	current.value.width = 11
	await $.println("pointer:", $.pointerValue<cell>($.arrayIndex(pointers!, 0)).width)
}

if ($.isMainScript(import.meta)) {
	await main()
}

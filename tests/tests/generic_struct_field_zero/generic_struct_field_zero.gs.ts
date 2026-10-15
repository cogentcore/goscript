// Generated file based on generic_struct_field_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class box {
	public declare Value: any

	constructor(init?: Partial<{Value?: any}>, __goscriptValue?: boolean) {
		this.Value = init?.Value !== undefined ? $.copyElement(init.Value) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): this {
		this.Value = $.assignFieldValue(this.Value, source.Value, { kind: $.TypeKind.Interface, methods: [] })
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [],
		box,
		() => [{ name: "Value", key: "Value", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class point {
	public declare X: number

	constructor(init?: Partial<{X?: number}>, __goscriptValue?: boolean) {
		this.X = init?.X ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(this, true)
	}

	public __goscriptAssign(source: point): this {
		this.X = source.X
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [],
		point,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let intBox: box = $.markAsStructValue(new box({Value: 0}))
	await $.println("int", intBox.Value)

	let stringBox: box = $.markAsStructValue(new box({Value: ""}))
	await $.println("string", $.stringEqual(stringBox.Value, ""))

	let mapBox: box = $.markAsStructValue(new box({Value: null! as globalThis.Map<string, number> | null}))
	await $.println("map", mapBox.Value == null)

	let pointBox: box = $.markAsStructValue(new box({Value: new point(undefined, true)}))
	await $.println("struct", pointBox.Value.X)

	let explicit = $.markAsStructValue(new box({Value: 0}))
	await $.println("literal", explicit.Value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

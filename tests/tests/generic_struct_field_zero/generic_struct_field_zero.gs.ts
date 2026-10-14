// Generated file based on generic_struct_field_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class box {
	public get Value(): any {
		return this._fields.Value
	}

	public set Value(value: any) {
		this._fields.Value = value
	}

	public _fields: {
		Value: any
	}

	constructor(init?: Partial<{Value?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value !== undefined ? $.copyElement(init.Value) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): void {
		const target = this._fields
		const values = source._fields
		target.Value = $.assignFieldValue(target.Value, values.Value, { kind: $.TypeKind.Interface, methods: [] })
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

	public clone(): point {
		return new point(this, true)
	}

	public __goscriptAssign(source: point): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
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

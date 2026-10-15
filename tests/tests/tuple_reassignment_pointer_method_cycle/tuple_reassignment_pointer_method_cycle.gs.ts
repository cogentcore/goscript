// Generated file based on tuple_reassignment_pointer_method_cycle.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class box {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [],
		box,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class cursor {
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): cursor {
		return new cursor(this, true)
	}

	public __goscriptAssign(source: cursor): void {
	}

	public rotate(a: box | $.VarRef<box> | null, b: box | $.VarRef<box> | null, c: box | $.VarRef<box> | null): [box | $.VarRef<box> | null, box | $.VarRef<box> | null, box | $.VarRef<box> | null] {
		return [b, c, a]
	}

	static __typeInfo = $.registerStructType(
		"main.cursor",
		() => new cursor(),
		() => [{ name: "rotate", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.box") }, { type: /* @__PURE__ */ $.pointerType("main.box") }, { type: /* @__PURE__ */ $.pointerType("main.box") }], pointerReceiver: true }],
		cursor,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let __goscriptShadow0: cursor | $.VarRef<cursor> | null = new cursor()
	let x: box | $.VarRef<box> | null = new box({value: 1})
	let y: box | $.VarRef<box> | null = new box({value: 2})
	let z: box | $.VarRef<box> | null = new box({value: 3})

	for (let __rangeIndex = 0; __rangeIndex < 1; __rangeIndex++) {
		let __goscriptTuple0: any = (__goscriptShadow0 !== null && (__goscriptShadow0 as any).__isVarRef !== true && (__goscriptShadow0 as any).__goValue === undefined ? ((__goscriptShadow0 as any) as cursor).rotate(x, y, z) : cursor.prototype.rotate.call(__goscriptShadow0, x, y, z))
		x = __goscriptTuple0[0]
		y = __goscriptTuple0[1]
		z = __goscriptTuple0[2]
	}

	await $.println($.pointerValue<box>(x).value, $.pointerValue<box>(y).value, $.pointerValue<box>(z).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

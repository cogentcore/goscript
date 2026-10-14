// Generated file based on js_global_name_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Family = number

export type Number = number

export class Promise {
	public get value(): string {
		return this._fields.value
	}

	public set value(value: string) {
		this._fields.value = value
	}

	public _fields: {
		value: string
	}

	constructor(init?: Partial<{value?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Promise {
		return new Promise(this, true)
	}

	public __goscriptAssign(source: Promise): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	static __typeInfo = $.registerStructType(
		"main.Promise",
		() => new Promise(),
		() => [],
		Promise,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class point {
	public get x(): number {
		return this._fields.x
	}

	public set x(value: number) {
		this._fields.x = value
	}

	public get y(): number {
		return this._fields.y
	}

	public set y(value: number) {
		this._fields.y = value
	}

	public _fields: {
		x: number
		y: number
	}

	constructor(init?: Partial<{x?: number, y?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			x: init?.x ?? (0 as number),
			y: init?.y ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(this, true)
	}

	public __goscriptAssign(source: point): void {
		const target = this._fields
		const values = source._fields
		target.x = values.x
		target.y = values.y
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [],
		point,
		() => [{ name: "x", key: "x", type: /* @__PURE__ */ $.basicType("int") }, { name: "y", key: "y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export const Serif: Family = 0

export const Math: Family = 1

export function String(v: number): string {
	return "String"
}

export let Array: $.Slice<string> = $.arrayToSlice<string>(["Array"])

export function __goscript_set_Array(__goscriptValue: $.Slice<string>): void {
	Array = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let p = new Promise({value: "Promise"}, true)
	await $.println("names:", 1, 1.5, String(1), $.arrayIndex(Array!, 0), p.value)

	let a = 7
	let b = 2
	let w = $.int($.int(a, 32), 32)
	await $.println("multiply:", a * b, $.int(globalThis.Math.imul(w, $.int(b, 32)), 32))
	let u: number = 4000000000
	await $.println("unsigned multiply:", $.uint(globalThis.Math.imul(u, 3) >>> 0, 32))
	await $.println("divide:", globalThis.Math.trunc(a / b), globalThis.Math.trunc(-a / b))

	let r = 128512
	await $.println("rune string:", $.stringEqual($.runeToString(r), "😀"))

	let points: point[] = $.arrayValue(globalThis.Array.from({ length: 2 }, () => new point(undefined, true)), /* @__PURE__ */ $.arrayType("main.point", 2))
	$.arrayIndex(points, 1).x = 3
	await $.println("array:", $.arrayIndex(points, 1).x, $.arrayIndex(points, 0).y)

	let big: bigint = 1099511627776n
	let f: number = globalThis.Number(big)
	await $.println("int64 to float:", f == 1099511627776)
	let n: number = $.int($.int64Shr(big, 20n))
	await $.println("int64 to int:", n)
}

if ($.isMainScript(import.meta)) {
	await main()
}

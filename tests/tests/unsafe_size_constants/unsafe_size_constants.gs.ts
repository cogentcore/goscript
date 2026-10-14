// Generated file based on unsafe_size_constants.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export class Data {
	public get A(): number {
		return this._fields.A
	}

	public set A(value: number) {
		this._fields.A = value
	}

	public get B(): number {
		return this._fields.B
	}

	public set B(value: number) {
		this._fields.B = value
	}

	public get C(): number {
		return this._fields.C
	}

	public set C(value: number) {
		this._fields.C = value
	}

	public get D(): number {
		return this._fields.D
	}

	public set D(value: number) {
		this._fields.D = value
	}

	public _fields: {
		A: number
		B: number
		C: number
		D: number
	}

	constructor(init?: Partial<{A?: number, B?: number, C?: number, D?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? (0 as number),
			C: init?.C ?? (0 as number),
			D: init?.D ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Data {
		return new Data(this, true)
	}

	public __goscriptAssign(source: Data): void {
		const target = this._fields
		const values = source._fields
		target.A = values.A
		target.B = values.B
		target.C = values.C
		target.D = values.D
	}

	static __typeInfo = $.registerStructType(
		"main.Data",
		() => new Data(),
		() => [],
		Data,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("float32") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("float32") }, { name: "C", key: "C", type: /* @__PURE__ */ $.basicType("float32") }, { name: "D", key: "D", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export class Mixed {
	public get Flag(): boolean {
		return this._fields.Flag
	}

	public set Flag(value: boolean) {
		this._fields.Flag = value
	}

	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public get V(): number[] {
		return this._fields.V
	}

	public set V(value: number[]) {
		this._fields.V = value
	}

	public _fields: {
		Flag: boolean
		N: number
		V: number[]
	}

	constructor(init?: Partial<{Flag?: boolean, N?: number, V?: number[]}>, __goscriptValue?: boolean) {
		this._fields = {
			Flag: init?.Flag ?? (false as boolean),
			N: init?.N ?? (0 as number),
			V: init?.V !== undefined ? $.cloneArrayValue(init.V, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3)) : $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3))
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Mixed {
		return new Mixed(this, true)
	}

	public __goscriptAssign(source: Mixed): void {
		const target = this._fields
		const values = source._fields
		target.Flag = values.Flag
		target.N = values.N
		target.V = $.assignFieldValue(target.V, values.V, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3))
	}

	static __typeInfo = $.registerStructType(
		"main.Mixed",
		() => new Mixed(),
		() => [],
		Mixed,
		() => [{ name: "Flag", key: "Flag", type: /* @__PURE__ */ $.basicType("bool") }, { name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int32") }, { name: "V", key: "V", type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3) }]
	)
}

export const dataSize: number = 16

export async function main(): globalThis.Promise<void> {
	let m: Mixed = new Mixed(undefined, true)
	let n = 10
	await $.println("data size:", 16, 16)
	await $.println("bytes for 10:", 160)
	await $.println("bytes for n:", n * $.int(16), $.uint($.uint($.uint64Mul($.uint(n, 64), 20n), 64), 64))
	await $.println("offset sum:", $.int(8) + n, $.uint($.uint($.uint64Add(4n, $.uint(n, 64)), 64), 64))
	await $.println("float32 size:", 4, 4)
	await $.println("mixed size:", 20, 4)
	await $.println("mixed offsets:", 4, 8)
}

if ($.isMainScript(import.meta)) {
	await main()
}

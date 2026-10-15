// Generated file based on unsafe_size_constants.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export class Data {
	public declare A: number

	public declare B: number

	public declare C: number

	public declare D: number

	constructor(init?: Partial<{A?: number, B?: number, C?: number, D?: number}>, __goscriptValue?: boolean) {
		this.A = init?.A ?? (0 as number)
		this.B = init?.B ?? (0 as number)
		this.C = init?.C ?? (0 as number)
		this.D = init?.D ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Data {
		return new Data(this, true)
	}

	public __goscriptAssign(source: Data): this {
		this.A = source.A
		this.B = source.B
		this.C = source.C
		this.D = source.D
		return this
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
	public declare Flag: boolean

	public declare N: number

	public declare V: number[]

	constructor(init?: Partial<{Flag?: boolean, N?: number, V?: number[]}>, __goscriptValue?: boolean) {
		this.Flag = init?.Flag ?? (false as boolean)
		this.N = init?.N ?? (0 as number)
		this.V = init?.V !== undefined ? $.cloneArrayValue(init.V, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3)) : $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Mixed {
		return new Mixed(this, true)
	}

	public __goscriptAssign(source: Mixed): this {
		this.Flag = source.Flag
		this.N = source.N
		this.V = $.assignFieldValue(this.V, source.V, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3))
		return this
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

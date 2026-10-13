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

	public _fields: {
		A: number
		B: number
		C: number
		D: number
	}

	constructor(init?: Partial<{A?: number, B?: number, C?: number, D?: number}>) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? (0 as number),
			C: init?.C ?? (0 as number),
			D: init?.D ?? (0 as number)
		}
	}

	public clone(): Data {
		return $.markAsStructValue(new Data(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B", "C", "D"])
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

	public _fields: {
		Flag: boolean
		N: number
		V: number[]
	}

	constructor(init?: Partial<{Flag?: boolean, N?: number, V?: number[]}>) {
		this._fields = {
			Flag: init?.Flag ?? (false as boolean),
			N: init?.N ?? (0 as number),
			V: init?.V !== undefined ? $.cloneArrayValue(init.V, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3)) : $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 3))
		}
	}

	public clone(): Mixed {
		return $.markAsStructValue(new Mixed(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Flag", "N", "V"])
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
	let m: Mixed = $.markAsStructValue(new Mixed())
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

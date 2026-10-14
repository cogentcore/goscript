// Generated file based on math_rand_v2_chacha8.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as randv1 from "@goscript/math/rand/index.js"

import * as rand from "@goscript/math/rand/v2/index.js"
import "@goscript/math/rand/index.js"
import "@goscript/math/rand/v2/index.js"

export async function main(): globalThis.Promise<void> {
	let seed: Uint8Array = $.arrayValue(new Uint8Array(32))
	for (let __goscriptRangeTarget0 = seed, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		seed[i] = $.uint(i + 1, 8)
	}
	let r: rand.ChaCha8 | $.VarRef<rand.ChaCha8> | null = rand.NewChaCha8($.cloneArrayValue(seed, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32)))
	for (let i = 0; i < 8; i++) {
		await $.println((r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as unknown as rand.ChaCha8).Uint64() : rand.ChaCha8.prototype.Uint64.call(r)))
	}
	for (let i = 0; i < 124; i++) {
		void (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as unknown as rand.ChaCha8).Uint64() : rand.ChaCha8.prototype.Uint64.call(r))
	}
	for (let i = 0; i < 8; i++) {
		await $.println((r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as unknown as rand.ChaCha8).Uint64() : rand.ChaCha8.prototype.Uint64.call(r)))
	}
	let __goscriptTuple0: any = (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as unknown as rand.ChaCha8).MarshalBinary() : rand.ChaCha8.prototype.MarshalBinary.call(r))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		$.panic((err as any))
	}
	await $.println($.sliceLen(b))
	for (let __goscriptRangeTarget1 = b, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let v = $.uint((__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as number), 8)
		await $.println(v)
	}
	let r2: rand.ChaCha8 | $.VarRef<rand.ChaCha8> | null = rand.NewChaCha8($.cloneArrayValue(seed, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32)))
	{
		let __goscriptShadow0 = (r2 !== null && (r2 as any).__isVarRef !== true && (r2 as any).__goValue === undefined ? (r2 as unknown as rand.ChaCha8).UnmarshalBinary(b) : rand.ChaCha8.prototype.UnmarshalBinary.call(r2, b))
		if (__goscriptShadow0 != null) {
			$.panic((__goscriptShadow0 as any))
		}
	}
	for (let i = 0; i < 8; i++) {
		await $.println((r2 !== null && (r2 as any).__isVarRef !== true && (r2 as any).__goValue === undefined ? (r2 as unknown as rand.ChaCha8).Uint64() : rand.ChaCha8.prototype.Uint64.call(r2)))
	}
	let seed2 = $.cloneArrayValue(seed, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32))
	seed2[0] = 0xff
	void (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as unknown as rand.ChaCha8).Seed($.cloneArrayValue(seed2, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32))) : rand.ChaCha8.prototype.Seed.call(r, $.cloneArrayValue(seed2, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 32))))
	await $.println((r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? (r as unknown as rand.ChaCha8).Uint64() : rand.ChaCha8.prototype.Uint64.call(r)))

	await globalSources()
}

export async function globalSources(): globalThis.Promise<void> {
	let seen: globalThis.Map<bigint, boolean> | null = $.makeMap<bigint, boolean>([])
	let nonzero = 0
	let inRange = true
	for (let __rangeIndex = 0; __rangeIndex < 20; __rangeIndex++) {
		let n = await randv1.Int63()
		$.mapSet(seen, n, true)
		if (n != 0n) {
			nonzero++
		}
		let f = await randv1.Float64()
		let f32 = await randv1.Float32()
		if ((((f < 0) || (f >= 1)) || (f32 < 0)) || (f32 >= 1)) {
			inRange = false
		}
	}
	await $.println("v1 distinct:", $.len(seen) > 15, "nonzero:", nonzero > 15, "in range:", inRange)

	let seen2: globalThis.Map<bigint, boolean> | null = $.makeMap<bigint, boolean>([])
	for (let __rangeIndex = 0; __rangeIndex < 20; __rangeIndex++) {
		$.mapSet(seen2, await rand.Uint64(), true)
	}
	let n = await rand.IntN(10)
	await $.println("v2 distinct:", $.len(seen2) > 15, "intn in range:", (n >= 0) && (n < 10))
}

if ($.isMainScript(import.meta)) {
	await main()
}

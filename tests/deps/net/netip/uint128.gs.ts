// Generated file based on uint128.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bits from "@goscript/math/bits/index.js"
import "@goscript/math/bits/index.js"

$.registerTypePackagePath("net/netip", ["netip.uint128"])

export class uint128 {
	public declare hi: bigint

	public declare lo: bigint

	constructor(init?: Partial<{hi?: bigint, lo?: bigint}>, __goscriptValue?: boolean) {
		this.hi = init?.hi ?? (0n as bigint)
		this.lo = init?.lo ?? (0n as bigint)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): uint128 {
		return new uint128(this, true)
	}

	public __goscriptAssign(source: uint128): this {
		this.hi = source.hi
		this.lo = source.lo
		return this
	}

	public addOne(): uint128 {
		const u = this;
		let __goscriptTuple0: any = bits.Add64(u.lo, 1n, 0n)
		let lo = __goscriptTuple0[0]
		let carry = __goscriptTuple0[1]
		return new uint128({hi: $.uint64Add(u.hi, carry), lo: lo}, true)
	}

	public and(m: uint128): uint128 {
		const u = this;
		return new uint128({hi: $.uint64And(u.hi, m.hi), lo: $.uint64And(u.lo, m.lo)}, true)
	}

	public bitsClearedFrom(bit: number): uint128 {
		const u = this;
		return u.and(mask6($.int(bit)))
	}

	public bitsSetFrom(bit: number): uint128 {
		const u = this;
		return u.or(mask6($.int(bit)).not())
	}

	public halves(): ($.VarRef<bigint> | null)[] {
		const u: uint128 | $.VarRef<uint128> | null = this;
		const u$: uint128 = u == null ? $.pointerTarget<uint128>(u) : (u as any).__isVarRef === true ? (u as any).value : (u as any).__goValue === undefined ? (u as any) : $.pointerTarget<uint128>(u)
		return $.arrayValue([$.fieldRef((u$ as uint128), "hi"), $.fieldRef((u$ as uint128), "lo")])
	}

	public isZero(): boolean {
		const u = this;
		return ($.uint64Or(u.hi, u.lo)) == 0n
	}

	public not(): uint128 {
		const u = this;
		return new uint128({hi: $.uint64Xor(u.hi, -1n), lo: $.uint64Xor(u.lo, -1n)}, true)
	}

	public or(m: uint128): uint128 {
		const u = this;
		return new uint128({hi: $.uint64Or(u.hi, m.hi), lo: $.uint64Or(u.lo, m.lo)}, true)
	}

	public subOne(): uint128 {
		const u = this;
		let __goscriptTuple1: any = bits.Sub64(u.lo, 1n, 0n)
		let lo = __goscriptTuple1[0]
		let borrow = __goscriptTuple1[1]
		return new uint128({hi: $.uint64Sub(u.hi, borrow), lo: lo}, true)
	}

	public xor(m: uint128): uint128 {
		const u = this;
		return new uint128({hi: $.uint64Xor(u.hi, m.hi), lo: $.uint64Xor(u.lo, m.lo)}, true)
	}

	static __typeInfo = $.registerStructType(
		"netip.uint128",
		() => new uint128(),
		() => [{ name: "addOne", args: [], returns: [{ type: "netip.uint128" }] }, { name: "and", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.uint128" }] }, { name: "bitsClearedFrom", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.uint128" }] }, { name: "bitsSetFrom", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.uint128" }] }, { name: "halves", args: [], returns: [{ type: /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint64")), 2) }], pointerReceiver: true }, { name: "isZero", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "not", args: [], returns: [{ type: "netip.uint128" }] }, { name: "or", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.uint128" }] }, { name: "subOne", args: [], returns: [{ type: "netip.uint128" }] }, { name: "xor", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "netip.uint128" }] }],
		uint128,
		() => [{ name: "hi", key: "hi", type: /* @__PURE__ */ $.basicType("uint64") }, { name: "lo", key: "lo", type: /* @__PURE__ */ $.basicType("uint64") }]
	)
}

export function mask6(n: number): uint128 {
	return new uint128({hi: $.uint64Xor(($.uint64Shr(18446744073709551615n, n)), -1n), lo: $.uint64Shl(18446744073709551615n, (128 - n))}, true)
}

// Generated file based on unsafe_numeric_reinterpret.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as math from "@goscript/math/index.js"

import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/math/index.js"
import "@goscript/unsafe/index.js"

export function float32bits(__goscriptParam0: number): number {
	let f: $.VarRef<number> = $.varRef(__goscriptParam0)
	return $.uint($.unsafeNumericRef<number>(f, "float32", "uint32").value, 32)
}

export function float32frombits(__goscriptParam1: number): number {
	let b: $.VarRef<number> = $.varRef(__goscriptParam1)
	return $.unsafeNumericRef<number>(b, "uint32", "float32").value
}

export function float64bits(__goscriptParam2: number): bigint {
	let f: $.VarRef<number> = $.varRef(__goscriptParam2)
	return $.unsafeNumericRef<bigint>(f, "float64", "uint64").value
}

export function float64frombits(__goscriptParam3: bigint): number {
	let b: $.VarRef<bigint> = $.varRef(__goscriptParam3)
	return $.unsafeNumericRef<number>(b, "uint64", "float64").value
}

export async function main(): globalThis.Promise<void> {
	await $.println($.uint(float32bits(1.5), 32), $.uint(float32bits(1.5), 32) == $.uint(math.Float32bits(1.5), 32))
	await $.println(float32frombits(0x40490fdb) == math.Float32frombits(0x40490fdb))
	await $.println(float64bits(-2.5), float64bits(-2.5) == math.Float64bits(-2.5))
	await $.println(float64frombits(4614256656552045848n) == math.Pi)
	let i: $.VarRef<number> = $.varRef(-1)
	await $.println($.uint($.unsafeNumericRef<number>(i, "int32", "uint32").value, 32))
	let u: $.VarRef<bigint> = $.varRef(9223372036854775808n)
	await $.println($.unsafeNumericRef<bigint>(u, "uint64", "int64").value)

	// writing through the reinterpreted pointer updates the variable
	let g: $.VarRef<number> = $.varRef(1)
	$.unsafeNumericRef<number>(g, "float32", "uint32").value = 0x40000000
	await $.println(g.value == 2)
	class pair {
		public get f(): number {
			return this._fields.f
		}

		public set f(value: number) {
			this._fields.f = value
		}

		public _fields: {
			f: number
		}

		constructor(init?: Partial<{f?: number}>) {
			this._fields = {
				f: init?.f ?? (0 as number)
			}
		}

		public clone(): pair {
			return $.markAsStructValue(new pair(this))
		}

		static __typeInfo = $.registerStructType(
			"main.pair",
			() => new pair(),
			() => [],
			pair,
			() => [{ name: "f", key: "f", type: /* @__PURE__ */ $.basicType("float64") }]
		)
	}
	let p = $.markAsStructValue(new pair({f: 0.5}))
	await $.println($.unsafeNumericRef<bigint>($.fieldRef(p._fields, "f"), "float64", "uint64").value == math.Float64bits(0.5))
}

if ($.isMainScript(import.meta)) {
	await main()
}

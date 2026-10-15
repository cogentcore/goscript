// Generated file based on package_import_math_big_arith.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as constant from "@goscript/go/constant/index.js"
import * as token from "@goscript/go/token/index.js"
import * as big from "@goscript/math/big/index.js"
import "@goscript/go/token/index.js"

export async function main(): globalThis.Promise<void> {
	let y = 13835058055282163712n
	let b = big.Int.prototype.SetUint64.call(new big.Int(), y)
	await $.println("rsh", await big.Int.prototype.String.call(big.Int.prototype.Rsh.call(new big.Int(), b, 11)))
	await $.println("lsh", await big.Int.prototype.String.call(big.Int.prototype.Lsh.call(new big.Int(), b, 3)))
	await $.println("mul", await big.Int.prototype.String.call(await big.Int.prototype.Mul.call(new big.Int(), b, b)))
	let __goscriptTuple0: any = await big.Int.prototype.QuoRem.call(new big.Int(), await big.Int.prototype.Mul.call(new big.Int(), b, b), big.NewInt(12345n), new big.Int())
	let q: big.Int | $.VarRef<big.Int> | null = __goscriptTuple0[0]
	let r: big.Int | $.VarRef<big.Int> | null = __goscriptTuple0[1]
	await $.println("quorem", await (q !== null && (q as any).__isVarRef !== true && (q as any).__goValue === undefined ? ((q as any) as big.Int).String() : big.Int.prototype.String.call(q)), await (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as big.Int).String() : big.Int.prototype.String.call(r)))
	for (let __goscriptRangeTarget0 = $.arrayToSlice<string>(["1.5", "3.14159", "1e10", "1e-10", "0.1", "1e100", "2.5e-300", "1e400"]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let s = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		let __goscriptTuple1: any = await big.Float.prototype.SetString.call(new big.Float(), s)
		let f: big.Float | $.VarRef<big.Float> | null = __goscriptTuple1[0]
		let ok = __goscriptTuple1[1]
		await $.println(s, ok, await (f !== null && (f as any).__isVarRef !== true && (f as any).__goValue === undefined ? ((f as any) as big.Float).String() : big.Float.prototype.String.call(f)))
	}
	await $.println("newfloat", await big.Float.prototype.Text.call(await big.NewFloat(1.5), 103, 10), await big.Float.prototype.Text.call(await big.NewFloat(1.5), 98, 0))
	let m: $.VarRef<big.Float> = $.varRef(new big.Float(undefined, true))
	await m.value.Mul(await big.NewFloat(3), await big.NewFloat(7))
	await $.println("fmul", await m.value.String())
	await $.println("rat", await big.Rat.prototype.FloatString.call(await big.NewRat(3n, 2n), 5))
	let c = await constant.MakeFromLiteral("3.25e2", 6, 0)
	await $.println("const", (__goscriptAwait = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as Exclude<constant.Value, null>) : $.pointerValue<Exclude<constant.Value, null>>(c)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<constant.Value, null>>((await constant.BinaryOp(c, 14, constant.MakeInt64(3n)))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

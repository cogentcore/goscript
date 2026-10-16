// Generated file based on math_big_karatsuba.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as big from "@goscript/math/big/index.js"

export async function slowMul(a: big.Int | $.VarRef<big.Int> | null, b: big.Int | $.VarRef<big.Int> | null): globalThis.Promise<big.Int | $.VarRef<big.Int> | null> {
	let sum = new big.Int()
	let mask = big.NewInt(4294967295n)
	let rest = big.Int.prototype.Set.call(new big.Int(), b)
	let digit = new big.Int()
	for (let shift = 0; (rest !== null && (rest as any).__isVarRef !== true && (rest as any).__goValue === undefined ? ((rest as any) as big.Int).Sign() : big.Int.prototype.Sign.call(rest)) != 0; shift = $.uint($.uint64Add(shift, 32), 64)) {
		void (digit !== null && (digit as any).__isVarRef !== true && (digit as any).__goValue === undefined ? ((digit as any) as big.Int).And(rest, mask) : big.Int.prototype.And.call(digit, rest, mask))
		let term = await big.Int.prototype.Mul.call(new big.Int(), a, digit)
		big.Int.prototype.Add.call(sum, sum, (term !== null && (term as any).__isVarRef !== true && (term as any).__goValue === undefined ? ((term as any) as big.Int).Lsh(term, shift) : big.Int.prototype.Lsh.call(term, term, shift)))
		void (rest !== null && (rest as any).__isVarRef !== true && (rest as any).__goValue === undefined ? ((rest as any) as big.Int).Rsh(rest, 32) : big.Int.prototype.Rsh.call(rest, rest, 32))
	}
	return sum
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = $.arrayToSlice<number>([46, 100]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let k = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as number)
		let a = await big.Int.prototype.Exp.call(new big.Int(), big.NewInt(10n), big.NewInt($.int64(k * 19)), null)
		void (a !== null && (a as any).__isVarRef !== true && (a as any).__goValue === undefined ? ((a as any) as big.Int).Sub(a, big.NewInt(3n)) : big.Int.prototype.Sub.call(a, a, big.NewInt(3n)))
		let b = await big.Int.prototype.Exp.call(new big.Int(), big.NewInt(3n), big.NewInt($.int64(k * 40)), null)
		let fast = await big.Int.prototype.Mul.call(new big.Int(), a, b)
		await $.println(k, $.sliceLen((fast !== null && (fast as any).__isVarRef !== true && (fast as any).__goValue === undefined ? ((fast as any) as big.Int).Bits() : big.Int.prototype.Bits.call(fast))), (fast !== null && (fast as any).__isVarRef !== true && (fast as any).__goValue === undefined ? ((fast as any) as big.Int).Cmp(await slowMul(a, b)) : big.Int.prototype.Cmp.call(fast, await slowMul(a, b))))
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

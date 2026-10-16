package main

import "math/big"

// slowMul multiplies one 32 bit digit at a time, below the Karatsuba threshold.
func slowMul(a, b *big.Int) *big.Int {
	sum := new(big.Int)
	mask := big.NewInt(0xffffffff)
	rest := new(big.Int).Set(b)
	digit := new(big.Int)
	for shift := uint(0); rest.Sign() != 0; shift += 32 {
		digit.And(rest, mask)
		term := new(big.Int).Mul(a, digit)
		sum.Add(sum, term.Lsh(term, shift))
		rest.Rsh(rest, 32)
	}
	return sum
}

func main() {
	for _, k := range []int{46, 100} {
		a := new(big.Int).Exp(big.NewInt(10), big.NewInt(int64(k*19)), nil)
		a.Sub(a, big.NewInt(3))
		b := new(big.Int).Exp(big.NewInt(3), big.NewInt(int64(k*40)), nil)
		fast := new(big.Int).Mul(a, b)
		println(k, len(fast.Bits()), fast.Cmp(slowMul(a, b)))
	}
}

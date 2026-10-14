package main

import (
	"go/constant"
	"go/token"
	"math/big"
)

func main() {
	y := uint64(0xC000000000000000)
	b := new(big.Int).SetUint64(y)
	println("rsh", new(big.Int).Rsh(b, 11).String())
	println("lsh", new(big.Int).Lsh(b, 3).String())
	println("mul", new(big.Int).Mul(b, b).String())
	q, r := new(big.Int).QuoRem(new(big.Int).Mul(b, b), big.NewInt(12345), new(big.Int))
	println("quorem", q.String(), r.String())
	for _, s := range []string{"1.5", "3.14159", "1e10", "1e-10", "0.1", "1e100", "2.5e-300", "1e400"} {
		f, ok := new(big.Float).SetString(s)
		println(s, ok, f.String())
	}
	println("newfloat", big.NewFloat(1.5).Text('g', 10), big.NewFloat(1.5).Text('b', 0))
	var m big.Float
	m.Mul(big.NewFloat(3), big.NewFloat(7))
	println("fmul", m.String())
	println("rat", big.NewRat(3, 2).FloatString(5))
	c := constant.MakeFromLiteral("3.25e2", token.FLOAT, 0)
	println("const", c.String(), constant.BinaryOp(c, token.MUL, constant.MakeInt64(3)).String())
}

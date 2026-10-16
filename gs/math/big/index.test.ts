import { describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'
import { Sprintf } from '@goscript/fmt/index.js'
import { Float64bits, Float64frombits } from '@goscript/math/index.js'

import {
  Accuracy_String,
  ErrNaN,
  Float,
  Int,
  Jacobi,
  MaxBase,
  NewFloat,
  NewInt,
  NewRat,
  ParseFloat,
  Rat,
  ToNearestEven,
  ToZero,
  type RoundingMode,
} from './index.js'
import { vectors } from './testdata/vectors.js'

// The vectors are computed by Go's math/big (see gen.go). Each runs the
// operation named by its first field on the string arguments that follow and
// compares the string result with the last field.

const int = (s: string): Int => {
  const [z, ok] = new Int().SetString(s, 10)
  if (!ok || z === null) {
    throw new Error('bad integer ' + s)
  }
  return z
}

const float = (s: string, prec = 200): Float => {
  const [f, , err] = ParseFloat(s, 0, prec, ToNearestEven)
  if (f === null) {
    throw new Error('bad float ' + s + ': ' + err?.Error())
  }
  return f
}

const rat = (s: string): Rat => {
  const [r, ok] = new Rat().SetString(s)
  if (!ok || r === null) {
    throw new Error('bad rational ' + s)
  }
  return r
}

const hex = (b: Uint8Array): string =>
  Array.from(b, (c) => c.toString(16).padStart(2, '0')).join('')

const bits64 = (f: number): string =>
  Float64bits(f).toString(16).padStart(16, '0')

const bits32 = (f: number): string => {
  const view = new DataView(new ArrayBuffer(4))
  view.setFloat32(0, f)
  return view.getUint32(0).toString(16).padStart(8, '0')
}

const fromBits64 = (s: string): number => Float64frombits(BigInt('0x' + s))

const acc = (a: number): string => Accuracy_String(a)

// state summarizes a Float like gen.go's floatState.
const state = (f: Float): string => {
  const exp = f.MantExp(null)
  const decimal = exp > -100000 && exp < 100000 ? f.Text(103, -1) : '-'
  return f.Text(112, 0) + '|' + decimal + '|' + acc(f.Acc())
}

const fromBase = (a: string) => Number(a)

type Op = (a: string[]) => string | Promise<string>

const text = (z: Int | null): string => (z === null ? '<nil>' : z.String())

const intBinary =
  (
    name:
      | 'Add'
      | 'Sub'
      | 'Mul'
      | 'And'
      | 'Or'
      | 'Xor'
      | 'AndNot'
      | 'Quo'
      | 'Rem'
      | 'Div'
      | 'Mod',
  ): Op =>
  ([x, y]) =>
    new Int()[name](int(x), int(y)).String()

const floatBinary =
  (name: 'Add' | 'Sub' | 'Mul' | 'Quo'): Op =>
  ([x, y, prec, mode]) => {
    const z = new Float().SetPrec(fromBase(prec)).SetMode(fromBase(mode))
    return state(z[name](float(x), float(y)))
  }

const ratBinary =
  (name: 'Add' | 'Sub' | 'Mul' | 'Quo'): Op =>
  ([x, y]) =>
    new Rat()[name](rat(x), rat(y)).String()

const ops: Record<string, Op> = {
  'int.abs': ([x]) => new Int().Abs(int(x)).String(),
  'int.neg': ([x]) => new Int().Neg(int(x)).String(),
  'int.not': ([x]) => new Int().Not(int(x)).String(),
  'int.sign': ([x]) => String(int(x).Sign()),
  'int.bitlen': ([x]) => String(int(x).BitLen()),
  'int.tzb': ([x]) => String(int(x).TrailingZeroBits()),
  'int.int64': ([x]) => int(x).Int64().toString(),
  'int.uint64': ([x]) => int(x).Uint64().toString(),
  'int.isint64': ([x]) => String(int(x).IsInt64()),
  'int.isuint64': ([x]) => String(int(x).IsUint64()),
  'int.float64': ([x]) => {
    const [f, a] = int(x).Float64()
    return bits64(f) + '|' + acc(a)
  },
  'int.bytes': ([x]) => hex(int(x).Bytes()),
  'int.probablyprime': ([x]) => String(int(x).ProbablyPrime(20)),
  'int.sqrt': ([x]) => new Int().Sqrt(int(x)).String(),
  'int.text': ([x, base]) => int(x).Text(fromBase(base)),
  'int.lsh': ([x, n]) => new Int().Lsh(int(x), fromBase(n)).String(),
  'int.rsh': ([x, n]) => new Int().Rsh(int(x), fromBase(n)).String(),
  'int.bit': ([x, i]) => String(int(x).Bit(fromBase(i))),
  'int.setbit': ([x, i, b]) =>
    new Int().SetBit(int(x), fromBase(i), fromBase(b)).String(),
  'int.format': async ([verb, x]) => Sprintf(verb, int(x)),
  'int.add': intBinary('Add'),
  'int.sub': intBinary('Sub'),
  'int.mul': intBinary('Mul'),
  'int.and': intBinary('And'),
  'int.or': intBinary('Or'),
  'int.xor': intBinary('Xor'),
  'int.andnot': intBinary('AndNot'),
  'int.quo': intBinary('Quo'),
  'int.rem': intBinary('Rem'),
  'int.div': intBinary('Div'),
  'int.mod': intBinary('Mod'),
  'int.cmp': ([x, y]) => String(int(x).Cmp(int(y))),
  'int.cmpabs': ([x, y]) => String(int(x).CmpAbs(int(y))),
  // The cofactors are not unique, so check the Bezout identity instead.
  'int.gcd': ([a, b]) => {
    const x = new Int()
    const y = new Int()
    const g = new Int().GCD(x, y, int(a), int(b))
    const sum = new Int().Add(
      new Int().Mul(x, int(a)),
      new Int().Mul(y, int(b)),
    )
    expect(sum.String(), 'a*x + b*y').toBe(g.String())
    return g.String()
  },
  'int.quorem': ([x, y]) => {
    const [q, r] = new Int().QuoRem(int(x), int(y), new Int())
    return q.String() + '|' + r.String()
  },
  'int.divmod': ([x, y]) => {
    const [d, m] = new Int().DivMod(int(x), int(y), new Int())
    return d.String() + '|' + m.String()
  },
  'int.modinverse': ([g, n]) => {
    const z = new Int().ModInverse(int(g), int(n))
    return z === null ? 'nil' : z.String()
  },
  'int.jacobi': ([x, y]) => String(Jacobi(int(x), int(y))),
  'int.exp': ([x, y, m]) => text(new Int().Exp(int(x), int(y), int(m))),
  // A square root is not unique, so compare the square it must have.
  'int.modsqrt': ([x, p]) => {
    const r = new Int().ModSqrt(int(x), int(p))
    if (r === null) {
      return 'nil'
    }
    return new Int().Mod(new Int().Mul(r, r), int(p)).String()
  },
  'int.mulrange': ([a, b]) => new Int().MulRange(BigInt(a), BigInt(b)).String(),
  'int.binomial': ([n, k]) => new Int().Binomial(BigInt(n), BigInt(k)).String(),
  'int.setstring': ([s, base]) => {
    const [z, ok] = new Int().SetString(s, fromBase(base))
    return ok && z !== null ? z.String() : 'fail'
  },
  'int.json': ([x]) => new TextDecoder().decode(int(x).MarshalJSON()[0]),
  'int.gob': ([x]) => hex(int(x).GobEncode()[0]),

  'float.text': ([s, f, prec]) =>
    float(s).Text(f.charCodeAt(0), fromBase(prec)),
  'float.text1700': ([s, f, prec]) =>
    float(s, 1700).Text(f.charCodeAt(0), fromBase(prec)),
  'float.format': async ([verb, s]) => Sprintf(verb, float(s)),
  'float.float64': ([s]) => {
    const [f, a] = float(s).Float64()
    return bits64(f) + '|' + acc(a)
  },
  'float.float32': ([s]) => {
    const [f, a] = float(s).Float32()
    return bits32(f) + '|' + acc(a)
  },
  'float.int64': ([s]) => {
    const [i, a] = float(s).Int64()
    return i.toString() + '|' + acc(a)
  },
  'float.uint64': ([s]) => {
    const [u, a] = float(s).Uint64()
    return u.toString() + '|' + acc(a)
  },
  'float.int': ([s]) => {
    const [i, a] = float(s).Int(null)
    return text(i) + '|' + acc(a)
  },
  'float.rat': ([s]) => {
    const [r, a] = float(s).Rat(null)
    return (r === null ? '<nil>' : r.String()) + '|' + acc(a)
  },
  'float.isint': ([s]) => String(float(s).IsInt()),
  'float.minprec': ([s]) => String(float(s).MinPrec()),
  'float.sign': ([s]) => String(float(s).Sign()),
  'float.mantexp': ([s]) => {
    const m = new Float()
    const exp = float(s).MantExp(m)
    return exp + '|' + m.Text(112, 0)
  },
  'float.gob': ([s]) => hex(float(s).GobEncode()[0]),
  'float.marshaltext': ([s, prec]) =>
    new TextDecoder().decode(float(s, fromBase(prec)).MarshalText()[0]),
  'float.round': ([s, prec, mode]) => {
    const r = new Float()
      .SetMode(fromBase(mode))
      .SetPrec(fromBase(prec))
      .Set(float(s))
    return r.Text(112, 0) + '|' + acc(r.Acc())
  },
  'float.sqrt': ([s, prec, mode]) =>
    new Float()
      .SetMode(fromBase(mode))
      .SetPrec(fromBase(prec))
      .Sqrt(float(s))
      .Text(112, 0),
  'float.add': floatBinary('Add'),
  'float.sub': floatBinary('Sub'),
  'float.mul': floatBinary('Mul'),
  'float.quo': floatBinary('Quo'),
  'float.addmax': ([x, y]) => state(new Float().Add(float(x, 53), float(y))),
  'float.cmp': ([x, y]) => String(float(x).Cmp(float(y))),
  'float.parse': ([s, base, prec]) => {
    const [f, b, err] = ParseFloat(
      s,
      fromBase(base),
      fromBase(prec),
      ToNearestEven,
    )
    if (err !== null) {
      return 'err|' + err.Error()
    }
    return b + '|' + state(f!) + '|' + f!.Prec()
  },
  'float.setfloat64': ([bits]) =>
    state(new Float().SetFloat64(fromBits64(bits))),
  'float.setint': ([s]) => state(new Float().SetInt(int(s))),
  'float.setint30': ([s]) => state(new Float().SetPrec(30).SetInt(int(s))),

  'rat.string': ([x]) => rat(x).String(),
  'rat.ratstring': ([x]) => rat(x).RatString(),
  'rat.sign': ([x]) => String(rat(x).Sign()),
  'rat.isint': ([x]) => String(rat(x).IsInt()),
  'rat.num': ([x]) => rat(x).Num().String(),
  'rat.denom': ([x]) => rat(x).Denom().String(),
  'rat.neg': ([x]) => new Rat().Neg(rat(x)).String(),
  'rat.abs': ([x]) => new Rat().Abs(rat(x)).String(),
  'rat.inv': ([x]) => new Rat().Inv(rat(x)).String(),
  'rat.floatstring': ([x, prec]) => rat(x).FloatString(fromBase(prec)),
  'rat.float64': ([x]) => {
    const [f, exact] = rat(x).Float64()
    return bits64(f) + '|' + exact
  },
  'rat.float32': ([x]) => {
    const [f, exact] = rat(x).Float32()
    return bits32(f) + '|' + exact
  },
  'rat.floatprec': ([x]) => {
    const [n, exact] = rat(x).FloatPrec()
    return n + '|' + exact
  },
  'rat.gob': ([x]) => hex(rat(x).GobEncode()[0]),
  'rat.cmp': ([x, y]) => String(rat(x).Cmp(rat(y))),
  'rat.add': ratBinary('Add'),
  'rat.sub': ratBinary('Sub'),
  'rat.mul': ratBinary('Mul'),
  'rat.quo': ratBinary('Quo'),
  'rat.setstring': ([s]) => {
    const [r, ok] = new Rat().SetString(s)
    return ok && r !== null ? r.String() : 'fail'
  },
  'rat.setfloat64': ([bits]) => {
    const r = new Rat().SetFloat64(fromBits64(bits))
    return r === null ? 'nil' : r.String()
  },
}

describe('math/big against Go', () => {
  const byOp = new Map<string, string[][]>()
  for (const v of vectors) {
    byOp.set(v[0], [...(byOp.get(v[0]) ?? []), v.slice(1)])
  }

  it('has an implementation for every vector operation', () => {
    expect([...byOp.keys()].filter((op) => !(op in ops))).toEqual([])
  })

  for (const [op, cases] of byOp) {
    it(op, async () => {
      const failures: string[] = []
      for (const c of cases) {
        const want = c[c.length - 1]
        const args = c.slice(0, -1)
        let got: string
        try {
          got = await ops[op](args)
        } catch (e) {
          got = 'throws ' + String(e)
        }
        if (got !== want) {
          failures.push(`${op}(${args.join(', ')}) = ${got}, want ${want}`)
        }
      }
      expect(failures.slice(0, 5)).toEqual([])
    })
  }
})

describe('math/big Int', () => {
  it('is registered under its Go name', () => {
    expect($.getTypeByName('big.Int')).toBeDefined()
  })

  it('exposes MaxBase and NewInt', () => {
    expect(MaxBase).toBe(62)
    expect(NewInt(-5n).String()).toBe('-5')
  })

  // apd keeps a *Int's words in its own array and relies on Bits to write
  // the result of a big operation through the slice SetBits was given.
  it('writes results through the slice given to SetBits', () => {
    const backing: (number | bigint)[] = [0, 0, 0, 0]
    const z = new Int().SetBits($.goSlice(backing, 0, 1))
    z.SetString('340282366920938463463374607431768211455', 10)
    expect($.len(z.Bits())).toBe(2)
    expect(BigInt(backing[0])).toBe((1n << 64n) - 1n)
    expect(BigInt(backing[1])).toBe((1n << 64n) - 1n)
    z.Add(z, NewInt(1n))
    expect(z.String()).toBe('340282366920938463463374607431768211456')
    expect($.len(z.Bits())).toBe(3)
    expect(BigInt(backing[2])).toBe(1n)
  })

  it('reads the words SetBits was given', () => {
    const words: (number | bigint)[] = [5n, 7n]
    expect(new Int().SetBits(words).String()).toBe(
      ((7n << 64n) | 5n).toString(),
    )
  })
})

describe('math/big Float', () => {
  const panicOf = (fn: () => void): unknown => {
    try {
      fn()
    } catch (e) {
      return e
    }
    return undefined
  }

  const message = (e: unknown): string => {
    const v = $.panicValue(e)
    return v instanceof ErrNaN ? v.Error() : String(v)
  }

  it('panics with ErrNaN like Go', () => {
    const inf = new Float().SetInf(false)
    const ninf = new Float().SetInf(true)
    const zero = NewFloat(0)
    expect(message(panicOf(() => new Float().Add(inf, ninf)))).toBe(
      'addition of infinities with opposite signs',
    )
    expect(message(panicOf(() => new Float().Sub(inf, inf)))).toBe(
      'subtraction of infinities with equal signs',
    )
    expect(message(panicOf(() => new Float().Mul(zero, inf)))).toBe(
      'multiplication of zero with infinity',
    )
    expect(message(panicOf(() => new Float().Quo(zero, zero)))).toBe(
      'division of zero by zero or infinity by infinity',
    )
    expect(message(panicOf(() => new Float().Sqrt(NewFloat(-1))))).toBe(
      'square root of negative operand',
    )
    expect(message(panicOf(() => NewFloat(NaN)))).toBe('NewFloat(NaN)')
  })

  it('applies a rounding mode to an exact sum', () => {
    const z = new Float().SetPrec(10).SetMode(ToZero)
    z.Add(NewFloat(1), NewFloat(2 ** -20))
    expect(z.Text(103, -1)).toBe('1')
    expect(acc(z.Acc())).toBe('Below')
  })

  it('formats the string form with ten digits', () => {
    expect(NewFloat(1 / 3).String()).toBe('0.3333333333')
    expect(float('1e100').String()).toBe('1e+100')
  })

  it('round trips through text', () => {
    const x = float('3.14159265358979323846264338327950288', 120)
    const back = new Float().SetPrec(120)
    expect(back.UnmarshalText(x.MarshalText()[0] as never)).toBeNull()
    expect(back.Cmp(x)).toBe(0)
  })

  it('reports parse errors', () => {
    const [f, ok] = new Float().SetString('1.2.3')
    expect(f).toBeNull()
    expect(ok).toBe(false)
  })
})

describe('math/big Rat', () => {
  it('normalizes', () => {
    expect(NewRat(6n, -4n).String()).toBe('-3/2')
  })

  it('keeps references to the shared Int fields apart', () => {
    const r = NewRat(1n, 3n)
    const copy = new Rat().Set(r)
    copy.Add(copy, r)
    expect(copy.String()).toBe('2/3')
    expect(r.String()).toBe('1/3')
  })
})

describe('math/big modes', () => {
  it('names rounding modes', () => {
    const mode: RoundingMode = ToZero
    expect(mode).toBe(2)
  })
})

// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Package rand implements math/rand/v2 with its sources computing in 32-bit
// words, as the math/rand override does: Rand reads the uint64 values of the
// sources of this package as two words and makes bigints only for the
// methods that return 64-bit integers. Seeded sources produce exactly the
// values of Go's.

import * as $ from '@goscript/builtin/index.js'
import { fe, ke, re, we } from '@goscript/math/rand/exp.js'
import * as math from '@goscript/math/rand/math.js'
import { fn, kn, rn, wn } from '@goscript/math/rand/normal.js'

$.registerTypePackagePath('math/rand/v2', [
  'rand.Source',
  'rand.Rand',
  'rand.runtimeSource',
])

// A Source is a source of uniformly-distributed pseudo-random uint64 values
// in the range [0, 1<<64).
export type Source = {
  Uint64(): bigint
}

$.registerInterfaceType('rand.Source', null, [
  $.methodSignature('Uint64', [], [$.basicType('uint64')]),
])

// Powers of two, with reciprocals that scale exactly: multiplying is
// faster than dividing.
const two32 = 4294967296
const twoNeg16 = 1.52587890625e-5 // 2**-16
const twoNeg32 = 2.3283064365386963e-10 // 2**-32
const twoNeg53 = 1.1102230246251565e-16 // 2**-53
const twoNeg24 = 5.960464477539063e-8 // 2**-24

// nextWords is the method of the sources of this package that computes their
// next uint64 into words, without making a bigint.
export const nextWords = Symbol('math/rand/v2.nextWords')

// wordSource is a source of this package.
export type wordSource = { [nextWords](): void }

// words holds the low and high 32 bits of the last uint64 of a source; see
// the math/rand override for why a typed array. Its views make the bigint of
// a value in one read on the little-endian hosts that run JavaScript.
export const words = new Int32Array(2)
const wordsInt64 = new BigInt64Array(words.buffer)
const wordsUint64 = new BigUint64Array(words.buffer)

// mulLo holds the low 32 bits of the last product of mulHi32, and lowWords
// the two low words of the last 128-bit product of productHigh.
const mulLo = new Uint32Array(1)
const lowWords = new Uint32Array(2)

// mulHi32 returns the high 32 bits of the 64-bit product of two uint32s and
// stores the low ones in mulLo, computed in parts that doubles hold exactly.
function mulHi32(a: number, b: number): number {
  // a*b is hiPart*2**16 + loPart, each part below 2**48, and the scaling
  // by powers of two is exact.
  const loPart = (a & 0xffff) * b
  const hiPart = (a >>> 16) * b
  const hiTop = Math.floor(hiPart * twoNeg16)
  const mid = (hiPart - hiTop * 65536) * 65536 + loPart
  mulLo[0] = mid
  return hiTop + Math.floor(mid * twoNeg32)
}

// uint64Words sets words to the next value of r's source.
function uint64Words(r: Rand): void {
  // A source of this package computes words; others make a uint64.
  const src = r.src
  if (src !== null && (src as any)[nextWords] !== undefined) {
    ;(src as any as wordSource)[nextWords]()
    return
  }
  wordsUint64[0] = $.pointerValue<Exclude<Source, null>>(src).Uint64()
}

// uint64nWords returns r.uint64n(n) for a number n in [1, 2**53]: Lemire's
// method in words for n below 2**32, bigints above.
function uint64nWords(r: Rand, n: number): number {
  // A power of two masks the value.
  if (n > 0xffffffff) {
    return Number(uint64nBig(r, BigInt(n)))
  }
  uint64Words(r)
  if ((n & (n - 1)) === 0) {
    return (words[0] & (n - 1)) >>> 0
  }

  // The high 64 bits of the 128-bit product of the value and n are in
  // [0,n); low 64 bits below 2**64 % n are rejected.
  let hi = productHigh(n)
  if (lowWords[1] === 0 && lowWords[0] < n) {
    const thresh = Number(((1n << 64n) - BigInt(n)) % BigInt(n))
    while (lowWords[1] === 0 && lowWords[0] < thresh) {
      uint64Words(r)
      hi = productHigh(n)
    }
  }
  return hi
}

// productHigh returns the high 64 bits of the product of words and n, a
// uint32, which are below n, and stores the low ones in lowWords.
function productHigh(n: number): number {
  // words[1]*n*2**32 + words[0]*n, from the 64-bit products of the words.
  const aHi = mulHi32(words[0] >>> 0, n)
  lowWords[0] = mulLo[0]
  const bHi = mulHi32(words[1] >>> 0, n)
  const mid = mulLo[0] + aHi

  // The middle word carries into the high word.
  lowWords[1] = mid
  return bHi + (mid >= two32 ? 1 : 0)
}

// uint64nBig returns r.uint64n(n) for a bigint n.
function uint64nBig(r: Rand, n: bigint): bigint {
  // A small n takes the words path.
  if (n <= 0xffffffffn) {
    return BigInt(uint64nWords(r, Number(n)))
  }

  // A power of two masks the value.
  if ((n & (n - 1n)) === 0n) {
    return r.Uint64() & (n - 1n)
  }

  // Otherwise the high half of the 128-bit product, rejecting low halves
  // below 2**64 % n.
  let p = r.Uint64() * n
  if (BigInt.asUintN(64, p) < n) {
    const thresh = ((1n << 64n) - n) % n
    while (BigInt.asUintN(64, p) < thresh) {
      p = r.Uint64() * n
    }
  }
  return p >> 64n
}

// float64Of returns r.Float64().
function float64Of(r: Rand): number {
  // The low 53 bits, scaled.
  uint64Words(r)
  return ((words[1] & 0x1fffff) * two32 + (words[0] >>> 0)) * twoNeg53
}

// A Rand is a source of random numbers.
export class Rand {
  declare public src: Source | null

  constructor(
    init?: Partial<{ src?: Source | null }>,
    __goscriptValue?: boolean,
  ) {
    this.src = init?.src ?? null
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): Rand {
    return new Rand(this, true)
  }

  public __goscriptAssign(source: Rand): this {
    // The source is shared, as a pointer is.
    this.src = source.src
    return this
  }

  // Int64 returns a non-negative pseudo-random 63-bit integer as an int64.
  public Int64(): bigint {
    // The value without its sign bit.
    uint64Words($.pointerValue<Rand>(this))
    words[1] &= 0x7fffffff
    return wordsInt64[0]
  }

  // Uint32 returns a pseudo-random 32-bit value as a uint32.
  public Uint32(): number {
    // The high word.
    uint64Words($.pointerValue<Rand>(this))
    return words[1] >>> 0
  }

  // Uint64 returns a pseudo-random 64-bit value as a uint64.
  public Uint64(): bigint {
    // A source of this package makes its bigint from words.
    const r = $.pointerValue<Rand>(this)
    const src = r.src
    if (src !== null && (src as any)[nextWords] !== undefined) {
      ;(src as any as wordSource)[nextWords]()
      return wordsUint64[0]
    }
    return $.pointerValue<Exclude<Source, null>>(src).Uint64()
  }

  // Int32 returns a non-negative pseudo-random 31-bit integer as an int32.
  public Int32(): number {
    // The high 31 bits.
    uint64Words($.pointerValue<Rand>(this))
    return words[1] >>> 1
  }

  // Int returns a non-negative pseudo-random int.
  public Int(): number {
    // The value without its sign bit, rounded to a float64 above 2**53.
    uint64Words($.pointerValue<Rand>(this))
    return (words[1] & 0x7fffffff) * two32 + (words[0] >>> 0)
  }

  // Uint returns a pseudo-random uint.
  public Uint(): number {
    // The value, rounded to a float64 above 2**53.
    uint64Words($.pointerValue<Rand>(this))
    return (words[1] >>> 0) * two32 + (words[0] >>> 0)
  }

  // Int64N returns, as an int64, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n <= 0.
  public Int64N(n: bigint): bigint {
    // n must be positive.
    if (n <= 0n) {
      $.panic('invalid argument to Int64N')
    }
    return uint64nBig($.pointerValue<Rand>(this), n)
  }

  // Uint64N returns, as a uint64, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n == 0.
  public Uint64N(n: bigint): bigint {
    // n must be positive.
    if (n === 0n) {
      $.panic('invalid argument to Uint64N')
    }
    return uint64nBig($.pointerValue<Rand>(this), n)
  }

  // Int32N returns, as an int32, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n <= 0.
  public Int32N(n: number): number {
    // n must be positive.
    if (n <= 0) {
      $.panic('invalid argument to Int32N')
    }
    return uint64nWords($.pointerValue<Rand>(this), n)
  }

  // Uint32N returns, as a uint32, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n == 0.
  public Uint32N(n: number): number {
    // n must be positive.
    if (n === 0) {
      $.panic('invalid argument to Uint32N')
    }
    return uint64nWords($.pointerValue<Rand>(this), n)
  }

  // IntN returns, as an int, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n <= 0.
  public IntN(n: number): number {
    // n must be positive.
    if (n <= 0) {
      $.panic('invalid argument to IntN')
    }
    return uint64nWords($.pointerValue<Rand>(this), n)
  }

  // UintN returns, as a uint, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n == 0.
  public UintN(n: number): number {
    // n must be positive.
    if (n === 0) {
      $.panic('invalid argument to UintN')
    }
    return uint64nWords($.pointerValue<Rand>(this), n)
  }

  // N returns a pseudo-random number in the half-open interval [0,n). The
  // type parameter Int can be any integer type. It panics if n <= 0.
  public N<Int extends number | bigint>(n: Int): Int {
    // A 64-bit n is a bigint and the others are numbers; the result has the
    // type of n.
    if (n <= 0) {
      $.panic('invalid argument to N')
    }
    const r = $.pointerValue<Rand>(this)
    return (
      typeof n === 'bigint' ?
        uint64nBig(r, n)
      : uint64nWords(r, n)) as Int
  }

  // Float64 returns, as a float64, a pseudo-random number in the half-open
  // interval [0.0,1.0).
  public Float64(): number {
    return float64Of($.pointerValue<Rand>(this))
  }

  // Float32 returns, as a float32, a pseudo-random number in the half-open
  // interval [0.0,1.0).
  public Float32(): number {
    // The low 24 bits of the high word, scaled.
    uint64Words($.pointerValue<Rand>(this))
    return (words[1] & 0xffffff) * twoNeg24
  }

  // Perm returns, as a slice of n ints, a pseudo-random permutation of the
  // integers in the half-open interval [0,n).
  public Perm(n: number): $.Slice<number> {
    // Shuffle the identity permutation, as Go does.
    const r = $.pointerValue<Rand>(this)
    const p = $.makeSlice<number>(n, undefined, 'number')
    const elems = $.sliceElems(p)
    for (let i = 0; i < n; i++) {
      elems[i] = i
    }
    for (let i = n - 1; i > 0; i--) {
      const j = uint64nWords(r, i + 1)
      const t = elems[i]
      elems[i] = elems[j]
      elems[j] = t
    }
    return p
  }

  // Shuffle pseudo-randomizes the order of elements. n is the number of
  // elements. Shuffle panics if n < 0. swap swaps the elements with indexes
  // i and j.
  public Shuffle<R extends $.MaybePromise<void>>(
    n: number,
    swap: ((i: number, j: number) => R) | null,
  ): $.CallbackResult<R, void> {
    // Swap from the end, continuing asynchronously after a swap that
    // suspends.
    const r = $.pointerValue<Rand>(this)
    if (n < 0) {
      $.panic('invalid argument to Shuffle')
    }
    for (let i = n - 1; i > 0; i--) {
      const done = swap!(i, uint64nWords(r, i + 1))
      if (done instanceof Promise) {
        return shuffleAsync(r, i - 1, swap!, done) as $.CallbackResult<R, void>
      }
    }
    return undefined as $.CallbackResult<R, void>
  }

  // NormFloat64 returns a normally distributed float64 in the range
  // -math.MaxFloat64 through +math.MaxFloat64 inclusive, with standard
  // normal distribution (mean = 0, stddev = 1). To produce a different
  // normal distribution, callers can adjust the output using:
  //
  //	sample = NormFloat64() * desiredStdDev + desiredMean
  public NormFloat64(): number {
    // The ziggurat method of normal.go: the low word picks the point and
    // the high word the layer.
    const r = $.pointerValue<Rand>(this)
    for (;;) {
      uint64Words(r)
      const j = words[0]
      const i = words[1] & 0x7f
      const x = j * wn[i]
      if (Math.abs(j) < kn[i]) {
        return x
      }

      // The base layer samples the tail.
      if (i === 0) {
        return normalTail(r, j)
      }

      // Otherwise the point is accepted under the density.
      const y = Math.fround(
        fn[i] +
          Math.fround(
            Math.fround(float64Of(r)) * Math.fround(fn[i - 1] - fn[i]),
          ),
      )
      if (y < Math.fround(math.exp(-0.5 * x * x))) {
        return x
      }
    }
  }

  // ExpFloat64 returns an exponentially distributed float64 in the range
  // (0, +math.MaxFloat64] with an exponential distribution whose rate
  // parameter (lambda) is 1 and whose mean is 1/lambda (1). To produce a
  // distribution with a different rate parameter, callers can adjust the
  // output using:
  //
  //	sample = ExpFloat64() / desiredRateParameter
  public ExpFloat64(): number {
    // The ziggurat method of exp.go, like NormFloat64.
    const r = $.pointerValue<Rand>(this)
    for (;;) {
      uint64Words(r)
      const j = words[0] >>> 0
      const i = words[1] & 0xff
      const x = j * we[i]
      if (j < ke[i]) {
        return x
      }

      // The base layer samples the tail; others accept under the density.
      if (i === 0) {
        return re - math.log(float64Of(r))
      }
      const y = Math.fround(
        fe[i] +
          Math.fround(
            Math.fround(float64Of(r)) * Math.fround(fe[i - 1] - fe[i]),
          ),
      )
      if (y < Math.fround(math.exp(-x))) {
        return x
      }
    }
  }

  static __typeInfo = $.registerStructType(
    'rand.Rand',
    () => new Rand(),
    () => [
      $.methodSignature('ExpFloat64', [], [$.basicType('float64')], true),
      $.methodSignature('Float32', [], [$.basicType('float32')], true),
      $.methodSignature('Float64', [], [$.basicType('float64')], true),
      $.methodSignature('Int', [], [$.basicType('int')], true),
      $.methodSignature('Int32', [], [$.basicType('int32')], true),
      $.methodSignature(
        'Int32N',
        [['n', $.basicType('int32')]],
        [$.basicType('int32')],
        true,
      ),
      $.methodSignature('Int64', [], [$.basicType('int64')], true),
      $.methodSignature(
        'Int64N',
        [['n', $.basicType('int64')]],
        [$.basicType('int64')],
        true,
      ),
      $.methodSignature(
        'IntN',
        [['n', $.basicType('int')]],
        [$.basicType('int')],
        true,
      ),
      $.methodSignature(
        'N',
        [['n', { kind: $.TypeKind.Interface, methods: [] }]],
        [{ kind: $.TypeKind.Interface, methods: [] }],
        true,
      ),
      $.methodSignature('NormFloat64', [], [$.basicType('float64')], true),
      $.methodSignature(
        'Perm',
        [['n', $.basicType('int')]],
        [$.sliceType($.basicType('int'))],
        true,
      ),
      $.methodSignature(
        'Shuffle',
        [
          ['n', $.basicType('int')],
          [
            'swap',
            {
              kind: $.TypeKind.Function,
              params: [$.basicType('int'), $.basicType('int')],
              results: [],
            } as $.FunctionTypeInfo,
          ],
        ],
        [],
        true,
      ),
      $.methodSignature('Uint', [], [$.basicType('uint')], true),
      $.methodSignature('Uint32', [], [$.basicType('uint32')], true),
      $.methodSignature(
        'Uint32N',
        [['n', $.basicType('uint32')]],
        [$.basicType('uint32')],
        true,
      ),
      $.methodSignature('Uint64', [], [$.basicType('uint64')], true),
      $.methodSignature(
        'Uint64N',
        [['n', $.basicType('uint64')]],
        [$.basicType('uint64')],
        true,
      ),
      $.methodSignature(
        'UintN',
        [['n', $.basicType('uint')]],
        [$.basicType('uint')],
        true,
      ),
    ],
    Rand,
    () => [
      $.structField('src', 'rand.Source', [0], 0, false, {
        pkgPath: 'math/rand/v2',
      }),
    ],
  )
}

// New returns a new Rand that uses random values from src to generate other
// random values.
export function New(src: Source | null): Rand {
  return new Rand({ src })
}

// normalTail samples the tail of NormFloat64 beyond rn, on the side of the
// sign of j, by Marsaglia's method.
function normalTail(r: Rand, j: number): number {
  // Accept x when y*2 >= x*x for exponential x and y.
  for (;;) {
    const x = -math.log(float64Of(r)) * (1e12 / 3442619855899)
    const y = -math.log(float64Of(r))
    if (y + y >= x * x) {
      return j > 0 ? rn + x : -rn - x
    }
  }
}

// shuffleAsync finishes a Shuffle from i after a swap suspended.
async function shuffleAsync(
  r: Rand,
  i: number,
  swap: (i: number, j: number) => unknown,
  pending: Promise<unknown>,
): Promise<void> {
  await pending
  for (; i > 0; i--) {
    await swap(i, uint64nWords(r, i + 1))
  }
}

// runtimeSource is the source of the top-level functions: the runtime's
// ChaCha8 generator, randomly seeded.
export class runtimeSource {
  constructor(_init?: Partial<{}>, __goscriptValue?: boolean) {
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): runtimeSource {
    return new runtimeSource(undefined, true)
  }

  public __goscriptAssign(_source: runtimeSource): this {
    return this
  }

  public Uint64(): bigint {
    return $.runtimeRand()
  }

  public [nextWords](): void {
    // Two words of the runtime's generator, low first.
    words[0] = $.runtimeRandUint32()
    words[1] = $.runtimeRandUint32()
  }

  static __typeInfo = $.registerStructType(
    'rand.runtimeSource',
    () => new runtimeSource(),
    () => [$.methodSignature('Uint64', [], [$.basicType('uint64')], false)],
    runtimeSource,
    () => [],
  )
}

// globalRand is the Rand of the top-level functions.
const globalRand = new Rand({
  src: $.interfaceValue<Source>(
    new runtimeSource(undefined, true),
    'rand.runtimeSource',
    'rand.runtimeSource',
  ),
})

// Int64 returns a non-negative pseudo-random 63-bit integer as an int64 from
// the default Source.
export function Int64(): bigint {
  return globalRand.Int64()
}

// Uint32 returns a pseudo-random 32-bit value as a uint32 from the default
// Source.
export function Uint32(): number {
  return globalRand.Uint32()
}

// Uint64N returns, as a uint64, a pseudo-random number in the half-open
// interval [0,n) from the default Source. It panics if n == 0.
export function Uint64N(n: bigint): bigint {
  return globalRand.Uint64N(n)
}

// Uint32N returns, as a uint32, a pseudo-random number in the half-open
// interval [0,n) from the default Source. It panics if n == 0.
export function Uint32N(n: number): number {
  return globalRand.Uint32N(n)
}

// Uint64 returns a pseudo-random 64-bit value as a uint64 from the default
// Source.
export function Uint64(): bigint {
  return globalRand.Uint64()
}

// Int32 returns a non-negative pseudo-random 31-bit integer as an int32 from
// the default Source.
export function Int32(): number {
  return globalRand.Int32()
}

// Int returns a non-negative pseudo-random int from the default Source.
export function Int(): number {
  return globalRand.Int()
}

// Uint returns a pseudo-random uint from the default Source.
export function Uint(): number {
  return globalRand.Uint()
}

// Int64N returns, as an int64, a pseudo-random number in the half-open
// interval [0,n) from the default Source. It panics if n <= 0.
export function Int64N(n: bigint): bigint {
  return globalRand.Int64N(n)
}

// Int32N returns, as an int32, a pseudo-random number in the half-open
// interval [0,n) from the default Source. It panics if n <= 0.
export function Int32N(n: number): number {
  return globalRand.Int32N(n)
}

// IntN returns, as an int, a pseudo-random number in the half-open interval
// [0,n) from the default Source. It panics if n <= 0.
export function IntN(n: number): number {
  return globalRand.IntN(n)
}

// UintN returns, as a uint, a pseudo-random number in the half-open interval
// [0,n) from the default Source. It panics if n == 0.
export function UintN(n: number): number {
  return globalRand.UintN(n)
}

// N returns a pseudo-random number in the half-open interval [0,n) from the
// default Source. The type parameter Int can be any integer type. It panics
// if n <= 0.
export function N<Int extends number | bigint>(n: Int): Int {
  return globalRand.N(n)
}

// Float64 returns, as a float64, a pseudo-random number in the half-open
// interval [0.0,1.0) from the default Source.
export function Float64(): number {
  return globalRand.Float64()
}

// Float32 returns, as a float32, a pseudo-random number in the half-open
// interval [0.0,1.0) from the default Source.
export function Float32(): number {
  return globalRand.Float32()
}

// Perm returns, as a slice of n ints, a pseudo-random permutation of the
// integers in the half-open interval [0,n) from the default Source.
export function Perm(n: number): $.Slice<number> {
  return globalRand.Perm(n)
}

// Shuffle pseudo-randomizes the order of elements using the default Source.
// n is the number of elements. Shuffle panics if n < 0. swap swaps the
// elements with indexes i and j.
export function Shuffle<R extends $.MaybePromise<void>>(
  n: number,
  swap: ((i: number, j: number) => R) | null,
): $.CallbackResult<R, void> {
  return globalRand.Shuffle(n, swap)
}

// NormFloat64 returns a normally distributed float64 in the range
// [-math.MaxFloat64, +math.MaxFloat64] with standard normal distribution
// (mean = 0, stddev = 1) from the default Source.
export function NormFloat64(): number {
  return globalRand.NormFloat64()
}

// ExpFloat64 returns an exponentially distributed float64 in the range
// (0, +math.MaxFloat64] with an exponential distribution whose rate
// parameter (lambda) is 1 and whose mean is 1/lambda (1) from the default
// Source.
export function ExpFloat64(): number {
  return globalRand.ExpFloat64()
}

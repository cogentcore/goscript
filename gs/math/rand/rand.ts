// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Package rand implements math/rand with the sources of the Go package
// computing in 32-bit words: a JavaScript bigint holds int64 and uint64
// values, and the additive generator of rngSource as bigints costs about
// 75 ns a value in V8. Rand reads the values of its own sources as two words,
// and makes bigints only for the methods that return int64 or uint64. A
// seeded source produces exactly the values of Go's.

import * as $ from '@goscript/builtin/index.js'
import * as godebug from '@goscript/internal/godebug/index.js'
import * as math from './math.js'

import { fe, ke, re, we } from './exp.js'
import { fn, kn, rn, wn } from './normal.js'
import { rngCooked } from './rng.js'

$.registerTypePackagePath('math/rand', [
  'rand.Source',
  'rand.Source64',
  'rand.Rand',
  'rand.rngSource',
  'rand.runtimeSource',
  'rand.lockedSource',
])

// A Source represents a source of uniformly-distributed pseudo-random int64
// values in the range [0, 1<<63).
export type Source = {
  Int63(): bigint
  Seed(seed: bigint): void
}

$.registerInterfaceType('rand.Source', null, [
  $.methodSignature('Int63', [], [$.basicType('int64')]),
  $.methodSignature('Seed', [['seed', $.basicType('int64')]]),
])

// A Source64 is a Source that can also generate uniformly-distributed
// pseudo-random uint64 values in the range [0, 1<<64) directly.
export type Source64 = Source & {
  Uint64(): bigint
}

$.registerInterfaceType('rand.Source64', null, [
  $.methodSignature('Int63', [], [$.basicType('int64')]),
  $.methodSignature('Seed', [['seed', $.basicType('int64')]]),
  $.methodSignature('Uint64', [], [$.basicType('uint64')]),
])

const rngLen = 607
const rngTap = 273
const int32max = 2147483647

// Powers of two, with reciprocals that scale exactly: multiplying is
// faster than dividing.
const two32 = 4294967296
const twoNeg16 = 1.52587890625e-5 // 2**-16
const twoNeg32 = 2.3283064365386963e-10 // 2**-32
const twoNeg63 = 1.0842021724855044e-19 // 2**-63

// nextWords is the method of the sources of this package that computes their
// next uint64 into words, without making a bigint.
const nextWords = Symbol('math/rand.nextWords')

// wordSource is a source of this package.
type wordSource = { [nextWords](): void }

// isWordSource reports whether src is a source of this package.
function isWordSource(src: unknown): src is wordSource {
  return typeof src === 'object' && src !== null && nextWords in src
}

// words holds the low and high 32 bits of the last value computed by
// nextWords or int63Words. A typed array keeps them unboxed (module variables
// of int32 values beyond the small integers cost an allocation per store in
// V8), and its int64 and uint64 views make the bigint of a value in one read
// on the little-endian hosts that run JavaScript.
const words = new Int32Array(2)
const wordsInt64 = new BigInt64Array(words.buffer)
const wordsUint64 = new BigUint64Array(words.buffer)

// int63FromWords returns words, with the sign bit cleared, as an int64.
function int63FromWords(): bigint {
  // Clear the sign bit and read the words as one int64.
  words[1] &= 0x7fffffff
  return wordsInt64[0]
}

// uint64FromWords returns words as a uint64.
function uint64FromWords(): bigint {
  return wordsUint64[0]
}

// seedrand returns x*48271 % int32max by Schrage's method, as Go's does.
function seedrand(x: number): number {
  // hi*Q + lo is x, and A*lo and R*hi stay below 2**31.
  const hi = Math.trunc(x / 44488)
  const lo = x % 44488
  x = 48271 * lo - 3399 * hi
  if (x < 0) {
    x += int32max
  }
  return x
}

// rngSource is the additive lagged Fibonacci generator of NewSource (rng.go).
// vecLo and vecHi hold the low and high words of its 607 int64s.
export class rngSource {
  declare public tap: number

  declare public feed: number

  declare public vecLo: Int32Array

  declare public vecHi: Int32Array

  constructor(
    init?: Partial<{
      tap?: number
      feed?: number
      vecLo?: Int32Array
      vecHi?: Int32Array
    }>,
    __goscriptValue?: boolean,
  ) {
    // The register is copied, never shared.
    this.tap = init?.tap ?? 0
    this.feed = init?.feed ?? 0
    this.vecLo = new Int32Array(rngLen)
    this.vecHi = new Int32Array(rngLen)
    if (init?.vecLo !== undefined && init?.vecHi !== undefined) {
      this.vecLo.set(init.vecLo)
      this.vecHi.set(init.vecHi)
    }
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): rngSource {
    return new rngSource(this, true)
  }

  public __goscriptAssign(source: rngSource): this {
    // Copy the position and the register.
    this.tap = source.tap
    this.feed = source.feed
    this.vecLo.set(source.vecLo)
    this.vecHi.set(source.vecHi)
    return this
  }

  // Seed uses the provided seed value to initialize the generator to a
  // deterministic state.
  public Seed(seed: bigint): void {
    // Reduce the seed to a nonzero int32, as Go does.
    const rng = $.pointerValue<rngSource>(this)
    rng.tap = 0
    rng.feed = rngLen - rngTap
    let s = Number(seed % BigInt(int32max))
    if (s < 0) {
      s += int32max
    }
    if (s === 0) {
      s = 89482311
    }

    // Each value is (x1<<40) ^ (x2<<20) ^ x3 ^ rngCooked[i] of three
    // successive int31s of seedrand, after 20 discarded ones.
    let x = s
    for (let i = -20; i < rngLen; i++) {
      x = seedrand(x)
      if (i >= 0) {
        const x1 = x
        const x2 = (x = seedrand(x))
        x = seedrand(x)
        rng.vecLo[i] = (x2 << 20) ^ x ^ rngCooked[2 * i]
        rng.vecHi[i] = (x1 << 8) ^ (x2 >>> 12) ^ rngCooked[2 * i + 1]
      }
    }
  }

  // Int63 returns a non-negative pseudo-random 63-bit integer as an int64.
  public Int63(): bigint {
    // The next value without its sign bit.
    $.pointerValue<rngSource>(this)[nextWords]()
    return int63FromWords()
  }

  // Uint64 returns a non-negative pseudo-random 64-bit integer as a uint64.
  public Uint64(): bigint {
    // The next value as a bigint.
    $.pointerValue<rngSource>(this)[nextWords]()
    return uint64FromWords()
  }

  public [nextWords](): void {
    // Step the two positions back around the register.
    let tap = this.tap - 1
    if (tap < 0) {
      tap += rngLen
    }
    let feed = this.feed - 1
    if (feed < 0) {
      feed += rngLen
    }
    this.tap = tap
    this.feed = feed

    // vec[feed] += vec[tap], adding the high words with the carry out of
    // the low words, which wrapped when their sum is below an addend.
    const vecLo = this.vecLo
    const vecHi = this.vecHi
    const a = vecLo[feed]
    const lo = (a + vecLo[tap]) | 0
    const hi = (vecHi[feed] + vecHi[tap] + (lo >>> 0 < a >>> 0 ? 1 : 0)) | 0

    // The sum is the new register value and the result.
    vecLo[feed] = lo
    vecHi[feed] = hi
    words[0] = lo
    words[1] = hi
  }

  static __typeInfo = $.registerStructType(
    'rand.rngSource',
    () => new rngSource(),
    () => [
      $.methodSignature('Int63', [], [$.basicType('int64')], true),
      $.methodSignature('Seed', [['seed', $.basicType('int64')]], [], true),
      $.methodSignature('Uint64', [], [$.basicType('uint64')], true),
    ],
    rngSource,
    () => [
      $.structField('tap', $.basicType('int'), [0], 0, false, {
        pkgPath: 'math/rand',
      }),
      $.structField('feed', $.basicType('int'), [1], 8, false, {
        pkgPath: 'math/rand',
      }),
    ],
  )
}

// runtimeSource is the source of the global Rand: the runtime's ChaCha8
// generator, randomly seeded.
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

  public Int63(): bigint {
    return $.runtimeRand() & 0x7fffffffffffffffn
  }

  public Seed(_seed: bigint): void {
    $.panic('internal error: call to runtimeSource.Seed')
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
    () => [
      $.methodSignature('Int63', [], [$.basicType('int64')], true),
      $.methodSignature('Seed', [$.basicType('int64')], [], true),
      $.methodSignature('Uint64', [], [$.basicType('uint64')], true),
    ],
    runtimeSource,
    () => [],
  )
}

// lockedSource is the source of the global Rand after Seed: an rngSource.
// Go guards it with a mutex; here no method suspends, so none is needed.
export class lockedSource {
  declare public s: rngSource | null

  constructor(
    init?: Partial<{ s?: rngSource | null }>,
    __goscriptValue?: boolean,
  ) {
    this.s = init?.s ?? null
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): lockedSource {
    return new lockedSource(this, true)
  }

  public __goscriptAssign(source: lockedSource): this {
    // The copy shares the generator, as a copied pointer does.
    this.s = source.s
    return this
  }

  public Int63(): bigint {
    return $.pointerValue<rngSource>(
      $.pointerValue<lockedSource>(this).s,
    ).Int63()
  }

  public Uint64(): bigint {
    return $.pointerValue<rngSource>(
      $.pointerValue<lockedSource>(this).s,
    ).Uint64()
  }

  public Seed(seed: bigint): void {
    $.pointerValue<lockedSource>(this).seed(seed)
  }

  public [nextWords](): void {
    $.pointerValue<rngSource>(this.s)[nextWords]()
  }

  // seed seeds the rngSource, making it on first use.
  public seed(seed: bigint): void {
    if (this.s === null) {
      this.s = newSource(seed)
    } else {
      this.s.Seed(seed)
    }
  }

  static __typeInfo = $.registerStructType(
    'rand.lockedSource',
    () => new lockedSource(),
    () => [
      $.methodSignature('Int63', [], [['n', $.basicType('int64')]], true),
      $.methodSignature('Seed', [['seed', $.basicType('int64')]], [], true),
      $.methodSignature('Uint64', [], [['n', $.basicType('uint64')]], true),
    ],
    lockedSource,
    () => [
      $.structField('s', $.pointerType('rand.rngSource'), [1], 8, false, {
        pkgPath: 'math/rand',
      }),
    ],
  )
}

// NewSource returns a new pseudo-random Source seeded with the given value.
// Unlike the default Source used by top-level functions, this source is not
// safe for concurrent use by multiple goroutines.
export function NewSource(seed: bigint): Source | null {
  return $.interfaceValue<Source | null>(
    newSource(seed),
    '*rand.rngSource',
    $.pointerType('rand.rngSource'),
  )
}

// newSource returns a new rngSource seeded with seed.
function newSource(seed: bigint): rngSource {
  // Seed the register of a new source.
  const rng = new rngSource()
  rng.Seed(seed)
  return rng
}

// New returns a new Rand that uses random values from src to generate other
// random values.
export function New(src: Source | null): Rand {
  // A Source64 also makes the Uint64 values.
  const [s64] = $.typeAssertTuple<Source64 | null>(src, 'rand.Source64')
  return new Rand({ src, s64 })
}

// int63Words sets words to the next value of r.Int63() and returns its high
// word.
function int63Words(r: Rand): number {
  // A source of this package computes words; others make an int64.
  const src = r.src
  if (isWordSource(src)) {
    src[nextWords]()
    return (words[1] &= 0x7fffffff)
  }
  wordsInt64[0] = $.pointerValue<Exclude<Source, null>>(src).Int63()
  return words[1]
}

// uint32Of returns r.Uint32(), int64(r.Int63() >> 31).
function uint32Of(r: Rand): number {
  // Bits 31 to 62 of the value.
  const hi = int63Words(r)
  return ((hi << 1) | (words[0] >>> 31)) >>> 0
}

// float64Of returns float64(r.Int63()), which the sum rounds as the
// conversion does.
function float64Of(r: Rand): number {
  // The high word scaled plus the low word.
  const hi = int63Words(r)
  return hi * two32 + (words[0] >>> 0)
}

// mulLo holds the low 32 bits of the last product of mulHi32.
const mulLo = new Uint32Array(1)

// mulHi32 returns the high 32 bits of the 64-bit product of two uint32s and
// stores the low ones in mulLo, computed in parts that doubles hold exactly.
function mulHi32(a: number, b: number): number {
  // a*b is hiPart*2**16 + loPart, each part below 2**48.
  const loPart = (a & 0xffff) * b
  const hiPart = (a >>> 16) * b
  const hiTop = Math.floor(hiPart * twoNeg16)
  const mid = (hiPart - hiTop * 65536) * 65536 + loPart
  mulLo[0] = mid
  return hiTop + Math.floor(mid * twoNeg32)
}

// A Rand is a source of random numbers.
export class Rand {
  declare public src: Source | null

  declare public s64: Source64 | null

  declare public readVal: bigint

  declare public readPos: number

  constructor(
    init?: Partial<{
      src?: Source | null
      s64?: Source64 | null
      readVal?: bigint
      readPos?: number
    }>,
    __goscriptValue?: boolean,
  ) {
    this.src = init?.src ?? null
    this.s64 = init?.s64 ?? null
    this.readVal = init?.readVal ?? 0n
    this.readPos = init?.readPos ?? 0
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): Rand {
    return new Rand(this, true)
  }

  public __goscriptAssign(source: Rand): this {
    // Copy the fields; the sources are shared, as pointers are.
    this.src = source.src
    this.s64 = source.s64
    this.readVal = source.readVal
    this.readPos = source.readPos
    return this
  }

  // Seed uses the provided seed value to initialize the generator to a
  // deterministic state.
  public Seed(seed: bigint): void {
    // The global source after Seed resets the read position itself.
    const r = $.pointerValue<Rand>(this)
    if (r.src instanceof lockedSource) {
      r.src.seed(seed)
    } else {
      $.pointerValue<Exclude<Source, null>>(r.src).Seed(seed)
    }
    r.readPos = 0
  }

  // Int63 returns a non-negative pseudo-random 63-bit integer as an int64.
  public Int63(): bigint {
    // A source of this package makes its bigint from words.
    const r = $.pointerValue<Rand>(this)
    const src = r.src
    if (isWordSource(src)) {
      src[nextWords]()
      return int63FromWords()
    }
    return $.pointerValue<Exclude<Source, null>>(r.src).Int63()
  }

  // Uint32 returns a pseudo-random 32-bit value as a uint32.
  public Uint32(): number {
    return uint32Of($.pointerValue<Rand>(this))
  }

  // Uint64 returns a pseudo-random 64-bit value as a uint64.
  public Uint64(): bigint {
    // A Source64 makes the value; a source of this package as words.
    const r = $.pointerValue<Rand>(this)
    if (r.s64 !== null) {
      const src = r.s64
      if (isWordSource(src)) {
        src[nextWords]()
        return uint64FromWords()
      }
      return $.pointerValue<Exclude<Source64, null>>(r.s64).Uint64()
    }

    // Otherwise two Int63 values make it, as in Go.
    const a = r.Int63()
    const b = r.Int63()
    return BigInt.asUintN(64, (a >> 31n) | (b << 32n))
  }

  // Int31 returns a non-negative pseudo-random 31-bit integer as an int32.
  public Int31(): number {
    return int63Words($.pointerValue<Rand>(this))
  }

  // Int returns a non-negative pseudo-random int.
  public Int(): number {
    return float64Of($.pointerValue<Rand>(this))
  }

  // Int63n returns, as an int64, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n <= 0.
  public Int63n(n: bigint): bigint {
    // A power of two masks the value.
    const r = $.pointerValue<Rand>(this)
    if (n <= 0n) {
      $.panic('invalid argument to Int63n')
    }
    if ((n & (n - 1n)) === 0n) {
      return r.Int63() & (n - 1n)
    }

    // Otherwise values above the largest multiple of n are rejected.
    const max = (1n << 63n) - 1n - ((1n << 63n) % n)
    let v = r.Int63()
    while (v > max) {
      v = r.Int63()
    }
    return v % n
  }

  // Int31n returns, as an int32, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n <= 0.
  public Int31n(n: number): number {
    // A power of two masks the value.
    const r = $.pointerValue<Rand>(this)
    if (n <= 0) {
      $.panic('invalid argument to Int31n')
    }
    if ((n & (n - 1)) === 0) {
      return int63Words(r) & (n - 1)
    }

    // Otherwise values above the largest multiple of n are rejected.
    const max = 2147483647 - (2147483648 % n)
    let v = int63Words(r)
    while (v > max) {
      v = int63Words(r)
    }
    return v % n
  }

  // int31n returns, as an int32, a non-negative pseudo-random number in the
  // half-open interval [0,n), by Lemire's multiplication method. n must be
  // positive. Shuffle uses it.
  public int31n(n: number): number {
    // The high word of the product of a uint32 and n is in [0,n), with
    // low products below 2**32 % n rejected.
    let hi = mulHi32(uint32Of(this), n)
    if (mulLo[0] < n) {
      const thresh = ((-n >>> 0) % n) >>> 0
      while (mulLo[0] < thresh) {
        hi = mulHi32(uint32Of(this), n)
      }
    }
    return hi
  }

  // Intn returns, as an int, a non-negative pseudo-random number in the
  // half-open interval [0,n). It panics if n <= 0.
  public Intn(n: number): number {
    // An int32 n takes Int31n, a larger one Int63n.
    const r = $.pointerValue<Rand>(this)
    if (n <= 0) {
      $.panic('invalid argument to Intn')
    }
    if (n <= 2147483647) {
      return r.Int31n(n)
    }
    return Number(r.Int63n(BigInt(n)))
  }

  // Float64 returns, as a float64, a pseudo-random number in the half-open
  // interval [0.0,1.0).
  public Float64(): number {
    // Resample the rare value that rounds to 1.
    const r = $.pointerValue<Rand>(this)
    for (;;) {
      const f = float64Of(r) * twoNeg63
      if (f !== 1) {
        return f
      }
    }
  }

  // Float32 returns, as a float32, a pseudo-random number in the half-open
  // interval [0.0,1.0).
  public Float32(): number {
    // Resample the values that round to 1.
    const r = $.pointerValue<Rand>(this)
    for (;;) {
      const f = Math.fround(r.Float64())
      if (f !== 1) {
        return f
      }
    }
  }

  // Perm returns, as a slice of n ints, a pseudo-random permutation of the
  // integers in the half-open interval [0,n).
  public Perm(n: number): $.Slice<number> {
    // Insert each i at a random place, moving the value there to the end.
    const r = $.pointerValue<Rand>(this)
    const m = $.makeSlice<number>(n, undefined, 'number')
    const elems = $.sliceElems(m)
    for (let i = 0; i < n; i++) {
      const j = r.Intn(i + 1)
      elems[i] = elems[j]
      elems[j] = i
    }
    return m
  }

  // Shuffle pseudo-randomizes the order of elements using the default
  // Source. n is the number of elements. Shuffle panics if n < 0. swap swaps
  // the elements with indexes i and j.
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
      const done = swap!(i, shuffleIndex(r, i))
      if (done instanceof Promise) {
        return shuffleAsync(r, i - 1, swap!, done) as $.CallbackResult<R, void>
      }
    }
    return undefined as $.CallbackResult<R, void>
  }

  // Read generates len(p) random bytes and writes them into p. It always
  // returns len(p) and a nil error. Read should not be called concurrently
  // with any other Rand method.
  public Read(p: $.Slice<number>): [number, $.GoError] {
    // The read state is kept in the Rand.
    const r = $.pointerValue<Rand>(this)
    const readVal = $.varRef(r.readVal)
    const readPos = $.varRef(r.readPos)
    const src = r.src instanceof lockedSource ? r.src.s : r.src
    const result = read(p, src, readVal, readPos)
    r.readVal = readVal.value
    r.readPos = readPos.value
    return result
  }

  // NormFloat64 returns a normally distributed float64 in the range
  // [-math.MaxFloat64, +math.MaxFloat64] with standard normal distribution
  // (mean = 0, stddev = 1). To produce a different normal distribution,
  // callers can adjust the output using:
  //
  //	sample = NormFloat64() * desiredStdDev + desiredMean
  public NormFloat64(): number {
    // The ziggurat method of normal.go: a random layer and point, accepted
    // at once when it is under the layer below.
    const r = $.pointerValue<Rand>(this)
    for (;;) {
      const j = uint32Of(r) | 0
      const i = j & 0x7f
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
            Math.fround(r.Float64()) * Math.fround(fn[i - 1] - fn[i]),
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
      const j = uint32Of(r)
      const i = j & 0xff
      const x = j * we[i]
      if (j < ke[i]) {
        return x
      }

      // The base layer samples the tail; others accept under the density.
      if (i === 0) {
        return re - math.log(r.Float64())
      }
      const y = Math.fround(
        fe[i] +
          Math.fround(
            Math.fround(r.Float64()) * Math.fround(fe[i - 1] - fe[i]),
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
      $.methodSignature('Int31', [], [$.basicType('int32')], true),
      $.methodSignature(
        'Int31n',
        [['n', $.basicType('int32')]],
        [$.basicType('int32')],
        true,
      ),
      $.methodSignature('Int63', [], [$.basicType('int64')], true),
      $.methodSignature(
        'Int63n',
        [['n', $.basicType('int64')]],
        [$.basicType('int64')],
        true,
      ),
      $.methodSignature(
        'Intn',
        [['n', $.basicType('int')]],
        [$.basicType('int')],
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
        'Read',
        [['p', $.sliceType($.basicType('uint8'))]],
        [
          ['n', $.basicType('int')],
          ['err', 'error'],
        ],
        true,
      ),
      $.methodSignature('Seed', [['seed', $.basicType('int64')]], [], true),
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
      $.methodSignature('Uint32', [], [$.basicType('uint32')], true),
      $.methodSignature('Uint64', [], [$.basicType('uint64')], true),
    ],
    Rand,
    () => [
      $.structField('src', 'rand.Source', [0], 0, false, {
        pkgPath: 'math/rand',
      }),
      $.structField('s64', 'rand.Source64', [1], 16, false, {
        pkgPath: 'math/rand',
      }),
      $.structField('readVal', $.basicType('int64'), [2], 32, false, {
        pkgPath: 'math/rand',
      }),
      $.structField('readPos', $.basicType('int8'), [3], 40, false, {
        pkgPath: 'math/rand',
      }),
    ],
  )
}

// normalTail samples the tail of NormFloat64 beyond rn, on the side of the
// sign of j, by Marsaglia's method.
function normalTail(r: Rand, j: number): number {
  // Accept x when y*2 >= x*x for exponential x and y.
  for (;;) {
    const x = -math.log(r.Float64()) * (1e12 / 3442619855899)
    const y = -math.log(r.Float64())
    if (y + y >= x * x) {
      return j > 0 ? rn + x : -rn - x
    }
  }
}

// shuffleIndex returns the index Shuffle swaps with i.
function shuffleIndex(r: Rand, i: number): number {
  return i > 2147483646 ? Number(r.Int63n(BigInt(i + 1))) : r.int31n(i + 1)
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
    await swap(i, shuffleIndex(r, i))
  }
}

// read fills p with the bytes of Int63 values of src, low byte first, seven
// per value, continuing from the value and position of an earlier Read.
function read(
  p: $.Slice<number>,
  src: Source | rngSource | null,
  readVal: $.VarRef<bigint> | null,
  readPos: $.VarRef<number> | null,
): [number, $.GoError] {
  // Take a value every seven bytes.
  let pos = readPos!.value
  let val = readVal!.value
  const n = $.len(p)
  for (let k = 0; k < n; k++) {
    if (pos === 0) {
      val = $.pointerValue<Exclude<Source, null>>(src).Int63()
      pos = 7
    }
    $.sliceElems(p)[$.sliceSlot(p, k)] = Number(val & 0xffn)
    val >>= 8n
    pos--
  }

  // Keep the rest for the next Read.
  readPos!.value = pos
  readVal!.value = val
  return [n, null]
}

// globalRandGenerator is the Rand of the top-level functions, made on first
// use.
let globalRandGenerator: Rand | null = null

const randautoseed = godebug.New('randautoseed')
const randseednop = godebug.New('randseednop')

// lockedSourceValue returns a new lockedSource as a Source.
function lockedSourceValue(): Source {
  return $.interfaceValue<Source>(
    new lockedSource(),
    '*rand.lockedSource',
    $.pointerType('rand.lockedSource'),
  )
}

// globalRand returns the Rand of the top-level functions: randomly seeded,
// unless GODEBUG=randautoseed=0 seeds it with 1, as before Go 1.20.
function globalRand(): Rand {
  // The Rand is made once.
  if (globalRandGenerator !== null) {
    return globalRandGenerator
  }
  if ($.pointerValue(randautoseed).Value() === '0') {
    $.pointerValue(randautoseed).IncNonDefault()
    globalRandGenerator = New(lockedSourceValue())
    globalRandGenerator.Seed(1n)
  } else {
    const src = $.interfaceValue<Source64>(
      new runtimeSource(),
      '*rand.runtimeSource',
      $.pointerType('rand.runtimeSource'),
    )
    globalRandGenerator = new Rand({ src, s64: src })
  }
  return globalRandGenerator
}

// Seed uses the provided seed value to initialize the default Source to a
// deterministic state. As of Go 1.24 it is a no-op unless GODEBUG=randseednop=0.
//
// Deprecated: As of Go 1.20 there is no reason to call Seed with a random
// value. Programs that call Seed with a known value to get a specific
// sequence of results should use New(NewSource(seed)) to obtain a local
// random generator.
export function Seed(seed: bigint): void {
  // Seed changes nothing unless GODEBUG=randseednop=0.
  if ($.pointerValue(randseednop).Value() !== '0') {
    return
  }
  $.pointerValue(randseednop).IncNonDefault()

  // A seeded global source is seeded again; otherwise it is replaced.
  const orig = globalRandGenerator
  if (orig !== null && orig.src instanceof lockedSource) {
    orig.Seed(seed)
    return
  }
  globalRandGenerator = New(lockedSourceValue())
  globalRandGenerator.Seed(seed)
}

// Int63 returns a non-negative pseudo-random 63-bit integer as an int64 from
// the default Source.
export function Int63(): bigint {
  return globalRand().Int63()
}

// Uint32 returns a pseudo-random 32-bit value as a uint32 from the default
// Source.
export function Uint32(): number {
  return uint32Of(globalRand())
}

// Uint64 returns a pseudo-random 64-bit value as a uint64 from the default
// Source.
export function Uint64(): bigint {
  return globalRand().Uint64()
}

// Int31 returns a non-negative pseudo-random 31-bit integer as an int32 from
// the default Source.
export function Int31(): number {
  return globalRand().Int31()
}

// Int returns a non-negative pseudo-random int from the default Source.
export function Int(): number {
  return globalRand().Int()
}

// Int63n returns, as an int64, a non-negative pseudo-random number in the
// half-open interval [0,n) from the default Source. It panics if n <= 0.
export function Int63n(n: bigint): bigint {
  return globalRand().Int63n(n)
}

// Int31n returns, as an int32, a non-negative pseudo-random number in the
// half-open interval [0,n) from the default Source. It panics if n <= 0.
export function Int31n(n: number): number {
  return globalRand().Int31n(n)
}

// Intn returns, as an int, a non-negative pseudo-random number in the
// half-open interval [0,n) from the default Source. It panics if n <= 0.
export function Intn(n: number): number {
  return globalRand().Intn(n)
}

// Float64 returns, as a float64, a pseudo-random number in the half-open
// interval [0.0,1.0) from the default Source.
export function Float64(): number {
  return globalRand().Float64()
}

// Float32 returns, as a float32, a pseudo-random number in the half-open
// interval [0.0,1.0) from the default Source.
export function Float32(): number {
  return globalRand().Float32()
}

// Perm returns, as a slice of n ints, a pseudo-random permutation of the
// integers in the half-open interval [0,n) from the default Source.
export function Perm(n: number): $.Slice<number> {
  return globalRand().Perm(n)
}

// Shuffle pseudo-randomizes the order of elements using the default Source.
// n is the number of elements. Shuffle panics if n < 0. swap swaps the
// elements with indexes i and j.
export function Shuffle<R extends $.MaybePromise<void>>(
  n: number,
  swap: ((i: number, j: number) => R) | null,
): $.CallbackResult<R, void> {
  return globalRand().Shuffle(n, swap)
}

// Read generates len(p) random bytes from the default Source and writes them
// into p. It always returns len(p) and a nil error.
//
// Deprecated: For almost all use cases, crypto/rand.Read is more
// appropriate.
export function Read(p: $.Slice<number>): [number, $.GoError] {
  return globalRand().Read(p)
}

// NormFloat64 returns a normally distributed float64 in the range
// [-math.MaxFloat64, +math.MaxFloat64] with standard normal distribution
// (mean = 0, stddev = 1) from the default Source.
export function NormFloat64(): number {
  return globalRand().NormFloat64()
}

// ExpFloat64 returns an exponentially distributed float64 in the range
// (0, +math.MaxFloat64] with an exponential distribution whose rate
// parameter (lambda) is 1 and whose mean is 1/lambda (1) from the default
// Source.
export function ExpFloat64(): number {
  return globalRand().ExpFloat64()
}

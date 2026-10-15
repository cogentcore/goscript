// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// W.Hormann, G.Derflinger:
// "Rejection-Inversion to Generate Variates
// from Monotone Discrete Distributions"
// http://eeyore.wu-wien.ac.at/papers/96-04-04.wh-der.ps.gz

import * as $ from '@goscript/builtin/index.js'
import * as math from '@goscript/math/rand/math.js'

import { Rand } from './rand.js'

$.registerTypePackagePath('math/rand/v2', ['rand.Zipf'])

// A Zipf generates Zipf distributed variates.
export class Zipf {
  declare public r: Rand | $.VarRef<Rand> | null

  declare public imax: number

  declare public v: number

  declare public q: number

  declare public s: number

  declare public oneminusQ: number

  declare public oneminusQinv: number

  declare public hxm: number

  declare public hx0minusHxm: number

  constructor(
    init?: Partial<{
      r?: Rand | $.VarRef<Rand> | null
      imax?: number
      v?: number
      q?: number
      s?: number
      oneminusQ?: number
      oneminusQinv?: number
      hxm?: number
      hx0minusHxm?: number
    }>,
    __goscriptValue?: boolean,
  ) {
    this.r = init?.r ?? null
    this.imax = init?.imax ?? 0
    this.v = init?.v ?? 0
    this.q = init?.q ?? 0
    this.s = init?.s ?? 0
    this.oneminusQ = init?.oneminusQ ?? 0
    this.oneminusQinv = init?.oneminusQinv ?? 0
    this.hxm = init?.hxm ?? 0
    this.hx0minusHxm = init?.hx0minusHxm ?? 0
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): Zipf {
    return new Zipf(this, true)
  }

  public __goscriptAssign(source: Zipf): this {
    // The generator and the parameters.
    this.r = source.r
    this.imax = source.imax
    this.v = source.v
    this.q = source.q

    // The precomputed constants.
    this.s = source.s
    this.oneminusQ = source.oneminusQ
    this.oneminusQinv = source.oneminusQinv
    this.hxm = source.hxm
    this.hx0minusHxm = source.hx0minusHxm
    return this
  }

  public h(x: number): number {
    return math.exp(this.oneminusQ * math.log(this.v + x)) * this.oneminusQinv
  }

  public hinv(x: number): number {
    return math.exp(this.oneminusQinv * math.log(this.oneminusQ * x)) - this.v
  }

  // Uint64 returns a value drawn from the Zipf distribution described by the
  // Zipf object.
  public Uint64(): bigint {
    // Draw by rejection-inversion until a value is accepted.
    if (this === null) {
      $.panic('rand: nil Zipf')
    }
    const z = $.pointerValue<Zipf>(this)
    for (;;) {
      const r = $.pointerValue<Rand>(z.r).Float64()
      const ur = z.hxm + r * z.hx0minusHxm
      const x = z.hinv(ur)
      const k = Math.floor(x + 0.5)
      if (k - x <= z.s) {
        return $.uint64(k)
      }
      if (ur >= z.h(k + 0.5) - math.exp(-math.log(k + z.v) * z.q)) {
        return $.uint64(k)
      }
    }
  }

  static __typeInfo = $.registerStructType(
    'rand.Zipf',
    () => new Zipf(),
    () => [$.methodSignature('Uint64', [], [$.basicType('uint64')], true)],
    Zipf,
    () =>
      [
        'r',
        'imax',
        'v',
        'q',
        's',
        'oneminusQ',
        'oneminusQinv',
        'hxm',
        'hx0minusHxm',
      ].map((name, i) =>
        $.structField(
          name,
          i === 0 ? $.pointerType('rand.Rand') : $.basicType('float64'),
          [i],
          8 * i,
          false,
          { pkgPath: 'math/rand/v2' },
        ),
      ),
  )
}

// NewZipf returns a Zipf variate generator. The generator generates values
// k ∈ [0, imax] such that P(k) is proportional to (v + k) ** (-s).
// Requirements: s > 1 and v >= 1.
export function NewZipf(
  r: Rand | $.VarRef<Rand> | null,
  s: number,
  v: number,
  imax: bigint,
): Zipf | null {
  // The parameters must give a distribution.
  if (s <= 1.0 || v < 1) {
    return null
  }

  // Precompute the constants of the inversion.
  const z = new Zipf({ r, v, q: s, imax: Number(imax) })
  z.oneminusQ = 1.0 - z.q
  z.oneminusQinv = 1.0 / z.oneminusQ
  z.hxm = z.h(z.imax + 0.5)
  z.hx0minusHxm = z.h(0.5) - math.exp(math.log(z.v) * -z.q) - z.hxm
  z.s = 1 - z.hinv(z.h(1.5) - math.exp(-z.q * math.log(z.v + 1.0)))
  return z
}

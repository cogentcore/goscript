// Copyright 2023 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import * as $ from '@goscript/builtin/index.js'
import * as errors from '@goscript/errors/index.js'

import { nextWords, words } from './rand.js'

// Powers of two, with reciprocals that scale exactly: multiplying is
// faster than dividing.
const two32 = 4294967296
const twoNeg16 = 1.52587890625e-5 // 2**-16
const twoNeg32 = 2.3283064365386963e-10 // 2**-32

$.registerTypePackagePath('math/rand/v2', ['rand.PCG'])

// A PCG is a PCG generator with 128 bits of internal state. A zero PCG is
// equivalent to NewPCG(0, 0).
//
// state holds the words of its uint64s hi and lo, high word first:
// hi>>32, hi, lo>>32, lo.
export class PCG {
  declare public state: Uint32Array

  constructor(
    init?: Partial<{ hi?: bigint; lo?: bigint }>,
    __goscriptValue?: boolean,
  ) {
    this.state = new Uint32Array(4)
    this.hi = init?.hi ?? 0n
    this.lo = init?.lo ?? 0n
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  // hi and lo are the uint64 fields of Go's PCG, over state.
  get hi(): bigint {
    return (BigInt(this.state[0]) << 32n) | BigInt(this.state[1])
  }

  set hi(v: bigint) {
    // The high and low words of v.
    this.state[0] = Number((v >> 32n) & 0xffffffffn)
    this.state[1] = Number(v & 0xffffffffn)
  }

  get lo(): bigint {
    return (BigInt(this.state[2]) << 32n) | BigInt(this.state[3])
  }

  set lo(v: bigint) {
    // The high and low words of v.
    this.state[2] = Number((v >> 32n) & 0xffffffffn)
    this.state[3] = Number(v & 0xffffffffn)
  }

  public clone(): PCG {
    return new PCG(this, true)
  }

  public __goscriptAssign(source: PCG): this {
    // Copy the state words.
    this.state.set(source.state)
    return this
  }

  // Seed resets the PCG to behave the same way as NewPCG(seed1, seed2).
  public Seed(seed1: bigint, seed2: bigint): void {
    // The seeds are the state.
    const p = $.pointerValue<PCG>(this)
    p.hi = seed1
    p.lo = seed2
  }

  // AppendBinary implements the encoding.BinaryAppender interface.
  public AppendBinary(b: $.Bytes): [$.Bytes, $.GoError] {
    // "pcg:", then hi and lo big-endian.
    const p = $.pointerValue<PCG>(this)
    const out = new Uint8Array(20)
    out.set([0x70, 0x63, 0x67, 0x3a])
    const view = new DataView(out.buffer)
    for (let k = 0; k < 4; k++) {
      view.setUint32(4 + 4 * k, p.state[k])
    }
    return [$.appendSlice(b, out), null]
  }

  // MarshalBinary implements the encoding.BinaryMarshaler interface.
  public MarshalBinary(): [$.Bytes, $.GoError] {
    return this.AppendBinary($.makeSlice<number>(0, 20, 'byte'))
  }

  // UnmarshalBinary implements the encoding.BinaryUnmarshaler interface.
  public UnmarshalBinary(data: $.Bytes): $.GoError {
    // The encoding is "pcg:" and two big-endian uint64s.
    const p = $.pointerValue<PCG>(this)
    const bytes = $.bytesToUint8Array(data)
    if (
      bytes.length !== 20 ||
      $.bytesToString(bytes.subarray(0, 4)) !== 'pcg:'
    ) {
      return errUnmarshalPCG
    }
    const view = new DataView(bytes.buffer, bytes.byteOffset, 20)
    for (let k = 0; k < 4; k++) {
      p.state[k] = view.getUint32(4 + 4 * k)
    }
    return null
  }

  // Uint64 return a uniformly-distributed random uint64 value.
  public Uint64(): bigint {
    // The next value as a bigint.
    $.pointerValue<PCG>(this)[nextWords]()
    return (BigInt(words[1] >>> 0) << 32n) | BigInt(words[0] >>> 0)
  }

  public [nextWords](): void {
    // Advance the state, then hash hi by DXSM: hi ^= hi>>32,
    // hi *= cheapMul, hi ^= hi>>48, hi *= lo|1.
    const s = this.state
    this.next()
    const h1 = s[0]
    const h0 = (s[1] ^ h1) >>> 0
    mul64(h1, h0, 0xda942042, 0xe4dd58b5)
    mul64(
      words[1] >>> 0,
      (words[0] ^ (words[1] >>> 16)) >>> 0,
      s[2],
      (s[3] | 1) >>> 0,
    )
  }

  // next advances the state: state = state*mul + inc, modulo 2**128. With
  // the words of the state s3 (low) to s0 and those of mul m3 to m0, word k
  // of the product sums the products of the word pairs at k, and the 64-bit
  // ones below word 3 carry. The products are written out here: the calls
  // V8 does not inline pass and return their large integers as heap
  // numbers.
  public next(): void {
    // The low words: s3*m3, the 64-bit product.
    const s = this.state
    const s3 = s[3]
    const s2 = s[2]
    const s1 = s[1]
    let t = (s3 & 0xffff) * 0x9fccf645
    let u = (s3 >>> 16) * 0x9fccf645
    let uh = Math.floor(u * twoNeg16)
    let m = (u - uh * 65536) * 65536 + t

    // Word 0 with incLo's low word, and word 1 so far: the high word of
    // s3*m3 and the carry.
    const w0 = (m >>> 0) + 0xf767814f
    let w1 = uh + Math.floor(m * twoNeg32) + (w0 >= two32 ? 1 : 0)
    let w2 = 0

    // s3*m2.
    t = (s3 & 0xffff) * 0x4385df64
    u = (s3 >>> 16) * 0x4385df64
    uh = Math.floor(u * twoNeg16)
    m = (u - uh * 65536) * 65536 + t
    w1 += m >>> 0
    w2 += uh + Math.floor(m * twoNeg32)

    // s2*m3.
    t = (s2 & 0xffff) * 0x9fccf645
    u = (s2 >>> 16) * 0x9fccf645
    uh = Math.floor(u * twoNeg16)
    m = (u - uh * 65536) * 65536 + t
    w1 += (m >>> 0) + 0x14057b7e
    w2 += uh + Math.floor(m * twoNeg32)

    // Word 2 so far: the carry of word 1, the low words of s3*m1, s2*m2 and
    // s1*m3, and incHi's low word.
    w2 += Math.floor(w1 * twoNeg32) + 0x4c957f2d
    let w3 = 0

    // s3*m1.
    t = (s3 & 0xffff) * 0x1fc65da4
    u = (s3 >>> 16) * 0x1fc65da4
    uh = Math.floor(u * twoNeg16)
    m = (u - uh * 65536) * 65536 + t
    w2 += m >>> 0
    w3 += uh + Math.floor(m * twoNeg32)

    // s2*m2.
    t = (s2 & 0xffff) * 0x4385df64
    u = (s2 >>> 16) * 0x4385df64
    uh = Math.floor(u * twoNeg16)
    m = (u - uh * 65536) * 65536 + t
    w2 += m >>> 0
    w3 += uh + Math.floor(m * twoNeg32)

    // s1*m3.
    t = (s1 & 0xffff) * 0x9fccf645
    u = (s1 >>> 16) * 0x9fccf645
    uh = Math.floor(u * twoNeg16)
    m = (u - uh * 65536) * 65536 + t
    w2 += m >>> 0
    w3 += uh + Math.floor(m * twoNeg32)

    // Word 3: the carry, the low words of the products at 3 and incHi's
    // high word.
    w3 +=
      Math.floor(w2 * twoNeg32) +
      Math.imul(s3, 0x2360ed05) +
      Math.imul(s2, 0x1fc65da4) +
      Math.imul(s1, 0x4385df64) +
      Math.imul(s[0], 0x9fccf645) +
      0x5851f42d

    // The typed array keeps the low 32 bits of each word.
    s[3] = w0
    s[2] = w1
    s[1] = w2
    s[0] = w3
  }

  static __typeInfo = $.registerStructType(
    'rand.PCG',
    () => new PCG(),
    () => [
      $.methodSignature(
        'AppendBinary',
        [['b', $.sliceType($.basicType('uint8'))]],
        [$.sliceType($.basicType('uint8')), 'error'],
        true,
      ),
      $.methodSignature(
        'MarshalBinary',
        [],
        [$.sliceType($.basicType('uint8')), 'error'],
        true,
      ),
      $.methodSignature(
        'Seed',
        [
          ['seed1', $.basicType('uint64')],
          ['seed2', $.basicType('uint64')],
        ],
        [],
        true,
      ),
      $.methodSignature('Uint64', [], [$.basicType('uint64')], true),
      $.methodSignature(
        'UnmarshalBinary',
        [['data', $.sliceType($.basicType('uint8'))]],
        ['error'],
        true,
      ),
    ],
    PCG,
    () => [
      $.structField('hi', $.basicType('uint64'), [0], 0, false, {
        pkgPath: 'math/rand/v2',
      }),
      $.structField('lo', $.basicType('uint64'), [1], 8, false, {
        pkgPath: 'math/rand/v2',
      }),
    ],
  )
}

const errUnmarshalPCG = errors.New('invalid PCG encoding')

// NewPCG returns a new PCG seeded with the given values.
export function NewPCG(seed1: bigint, seed2: bigint): PCG {
  return new PCG({ hi: seed1, lo: seed2 })
}

// mul64 stores in words the low 64 bits of the product of the uint64s
// (a1, a0) and (b1, b0), given as words: a0*b0 and the low words of a0*b1
// and a1*b0.
function mul64(a1: number, a0: number, b1: number, b0: number): void {
  // a0*b0 = (a0>>16)*b0*2**16 + (a0&0xffff)*b0, exactly in doubles.
  const t = (a0 & 0xffff) * b0
  const u = (a0 >>> 16) * b0
  const uh = Math.floor(u * twoNeg16)
  const m = (u - uh * 65536) * 65536 + t
  const hi = uh + Math.floor(m * twoNeg32)
  words[0] = m
  words[1] = hi + Math.imul(a0, b1) + Math.imul(a1, b0)
}

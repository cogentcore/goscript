// Copyright 2023 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import * as $ from '@goscript/builtin/index.js'
import * as errors from '@goscript/errors/index.js'

import { nextWords, words } from './rand.js'

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
    // hi *= cheapMul, hi ^= hi>>48, hi *= lo|1, in 16-bit limbs.
    this.next()
    const s = this.state
    const h1 = s[0]
    const h0 = s[1] ^ h1
    mulWords(
      h0 & 0xffff,
      h0 >>> 16,
      h1 & 0xffff,
      h1 >>> 16,
      0x58b5,
      0xe4dd,
      0x2042,
      0xda94,
    )
    const g1 = words[1]
    const g0 = words[0]
    const lo = s[3] | 1
    mulWords(
      (g0 ^ (g1 >>> 16)) & 0xffff,
      g0 >>> 16,
      g1 & 0xffff,
      g1 >>> 16,
      lo & 0xffff,
      lo >>> 16,
      s[2] & 0xffff,
      s[2] >>> 16,
    )
  }

  // next advances the state: state = state*mul + inc, modulo 2**128, in
  // 16-bit limbs. Each product of two limbs fits in 32 bits, which
  // Math.imul computes exactly, so all the arithmetic stays in small
  // integers, which V8 keeps in registers; doubles and their conversions
  // were twice as slow. Limb k of the result sums the low halves of the
  // products of column k (the limbs i and j with i+j = k), the carry of
  // column k-1 (the high halves and the carry of the sum) and limb k of
  // inc. The top word sums the products of columns 6 and 7 whole, since
  // their bits above 128 drop.
  public next(): void {
    // The limbs of the state, low first.
    const s = this.state
    const x3 = s[3]
    const x2 = s[2]
    const x1 = s[1]
    const x0 = s[0]
    const l0 = x3 & 0xffff
    const l1 = x3 >>> 16
    const l2 = x2 & 0xffff

    // The other limbs.
    const l3 = x2 >>> 16
    const l4 = x1 & 0xffff
    const l5 = x1 >>> 16
    const l6 = x0 & 0xffff
    const l7 = x0 >>> 16

    // Column 0: the products of limbs i and 0-i, their low halves, and limb 0 of inc.
    const p00 = Math.imul(l0, 0xf645)
    const a0 = (p00 & 0xffff) + 0x814f
    let c = (p00 >>> 16) + (a0 >>> 16)

    // Column 1: the products of limbs i and 1-i, their low halves, the carry, and limb 1 of inc.
    const p10 = Math.imul(l0, 0x9fcc),
      p11 = Math.imul(l1, 0xf645)
    const a1 = (p10 & 0xffff) + (p11 & 0xffff) + c + 0xf767
    c = (p10 >>> 16) + (p11 >>> 16) + (a1 >>> 16)

    // Column 2: the products of limbs i and 2-i, their low halves, the carry, and limb 2 of inc.
    const p20 = Math.imul(l0, 0xdf64),
      p21 = Math.imul(l1, 0x9fcc),
      p22 = Math.imul(l2, 0xf645)
    const a2 = (p20 & 0xffff) + (p21 & 0xffff) + (p22 & 0xffff) + c + 0x7b7e
    c = (p20 >>> 16) + (p21 >>> 16) + (p22 >>> 16) + (a2 >>> 16)

    // Column 3: the products of limbs i and 3-i, their low halves, the carry, and limb 3 of inc.
    const p30 = Math.imul(l0, 0x4385),
      p31 = Math.imul(l1, 0xdf64),
      p32 = Math.imul(l2, 0x9fcc),
      p33 = Math.imul(l3, 0xf645)
    const a3 =
      (p30 & 0xffff) +
      (p31 & 0xffff) +
      (p32 & 0xffff) +
      (p33 & 0xffff) +
      c +
      0x1405
    c = (p30 >>> 16) + (p31 >>> 16) + (p32 >>> 16) + (p33 >>> 16) + (a3 >>> 16)

    // Column 4: the products of limbs i and 4-i, their low halves, the carry, and limb 4 of inc.
    const p40 = Math.imul(l0, 0x5da4),
      p41 = Math.imul(l1, 0x4385),
      p42 = Math.imul(l2, 0xdf64),
      p43 = Math.imul(l3, 0x9fcc),
      p44 = Math.imul(l4, 0xf645)
    const a4 =
      (p40 & 0xffff) +
      (p41 & 0xffff) +
      (p42 & 0xffff) +
      (p43 & 0xffff) +
      (p44 & 0xffff) +
      c +
      0x7f2d
    c =
      (p40 >>> 16) +
      (p41 >>> 16) +
      (p42 >>> 16) +
      (p43 >>> 16) +
      (p44 >>> 16) +
      (a4 >>> 16)

    // Column 5: the products of limbs i and 5-i, their low halves, the carry, and limb 5 of inc.
    const p50 = Math.imul(l0, 0x1fc6),
      p51 = Math.imul(l1, 0x5da4),
      p52 = Math.imul(l2, 0x4385),
      p53 = Math.imul(l3, 0xdf64),
      p54 = Math.imul(l4, 0x9fcc),
      p55 = Math.imul(l5, 0xf645)
    const a5 =
      (p50 & 0xffff) +
      (p51 & 0xffff) +
      (p52 & 0xffff) +
      (p53 & 0xffff) +
      (p54 & 0xffff) +
      (p55 & 0xffff) +
      c +
      0x4c95
    c =
      (p50 >>> 16) +
      (p51 >>> 16) +
      (p52 >>> 16) +
      (p53 >>> 16) +
      (p54 >>> 16) +
      (p55 >>> 16) +
      (a5 >>> 16)

    // The top word: the carry, the products of columns 6 and 7, whose bits
    // above 128 drop, and the top limbs of inc.
    const t6 =
      Math.imul(l0, 0xed05) +
      Math.imul(l1, 0x1fc6) +
      Math.imul(l2, 0x5da4) +
      Math.imul(l3, 0x4385) +
      Math.imul(l4, 0xdf64) +
      Math.imul(l5, 0x9fcc) +
      Math.imul(l6, 0xf645)
    const t7 =
      Math.imul(l0, 0x2360) +
      Math.imul(l1, 0xed05) +
      Math.imul(l2, 0x1fc6) +
      Math.imul(l3, 0x5da4) +
      Math.imul(l4, 0x4385) +
      Math.imul(l5, 0xdf64) +
      Math.imul(l6, 0x9fcc) +
      Math.imul(l7, 0xf645)

    // The typed array keeps the low 32 bits of each word.
    s[3] = (a0 & 0xffff) | (a1 << 16)
    s[2] = (a2 & 0xffff) | (a3 << 16)
    s[1] = (a4 & 0xffff) | (a5 << 16)
    s[0] = c + t6 + (t7 << 16) + 0x5851f42d
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

// mulWords stores in words the low 64 bits of the product of the uint64s
// with the 16-bit limbs a0 to a3 and b0 to b3, low first: the low word from
// columns 0 and 1, and the high word from the carry and the products of
// columns 2 and 3 whole, whose bits above 64 drop.
function mulWords(
  a0: number,
  a1: number,
  a2: number,
  a3: number,
  b0: number,
  b1: number,
  b2: number,
  b3: number,
): void {
  // Columns 0 and 1.
  const p00 = Math.imul(a0, b0)
  const p10 = Math.imul(a0, b1)
  const p11 = Math.imul(a1, b0)
  const m = (p00 >>> 16) + (p10 & 0xffff) + (p11 & 0xffff)
  const c = (p10 >>> 16) + (p11 >>> 16) + (m >>> 16)

  // Columns 2 and 3; the typed array keeps the low 32 bits.
  const t2 = Math.imul(a0, b2) + Math.imul(a1, b1) + Math.imul(a2, b0)
  const t3 =
    Math.imul(a0, b3) +
    Math.imul(a1, b2) +
    Math.imul(a2, b1) +
    Math.imul(a3, b0)
  words[0] = (p00 & 0xffff) | (m << 16)
  words[1] = c + t2 + (t3 << 16)
}

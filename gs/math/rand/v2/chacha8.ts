// Copyright 2023 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import * as $ from '@goscript/builtin/index.js'
import * as chacha8rand from '@goscript/internal/chacha8rand/index.js'
import * as errors from '@goscript/errors/index.js'

import { nextWords, words } from './rand.js'

$.registerTypePackagePath('math/rand/v2', ['rand.ChaCha8'])

// A ChaCha8 is a ChaCha8-based cryptographically strong random number
// generator.
export class ChaCha8 {
  declare public state: chacha8rand.State

  // The last bytes of the last uint64 of Read, which the next Read returns
  // first.
  declare public readBuf: Uint8Array

  declare public readLen: number

  constructor(
    init?: Partial<{
      state?: chacha8rand.State
      readBuf?: Uint8Array
      readLen?: number
    }>,
    __goscriptValue?: boolean,
  ) {
    this.state =
      init?.state !== undefined ? init.state.clone() : new chacha8rand.State()
    this.readBuf = new Uint8Array(8)
    if (init?.readBuf !== undefined) {
      this.readBuf.set(init.readBuf)
    }
    this.readLen = init?.readLen ?? 0
    ;(this as any)[$.structValueMarker] = __goscriptValue === true
  }

  public clone(): ChaCha8 {
    return new ChaCha8(this, true)
  }

  public __goscriptAssign(source: ChaCha8): this {
    // Copy the generator and the unread bytes.
    this.state.__goscriptAssign(source.state)
    this.readBuf.set(source.readBuf)
    this.readLen = source.readLen
    return this
  }

  // Seed resets the ChaCha8 to behave the same way as NewChaCha8(seed).
  public Seed(seed: Uint8Array): void {
    // A new stream, with no unread bytes.
    const c = $.pointerValue<ChaCha8>(this)
    c.state.Init(seed)
    c.readLen = 0
    c.readBuf.fill(0)
  }

  // Uint64 returns a uniformly distributed random uint64 value.
  public Uint64(): bigint {
    // The next value as a bigint.
    $.pointerValue<ChaCha8>(this)[nextWords]()
    return (BigInt(words[1] >>> 0) << 32n) | BigInt(words[0] >>> 0)
  }

  public [nextWords](): void {
    // Take the next uint64 of the buffer, refilling it when used up.
    const s = this.state
    if (s.i >= s.n) {
      s.Refill()
    }
    const k = 2 * (s.i & 31)
    s.i++
    words[0] = s.bufWords[k]
    words[1] = s.bufWords[k + 1]
  }

  // Read reads exactly len(p) bytes into p. It always returns len(p) and a
  // nil error.
  //
  // If calls to Read and Uint64 are interleaved, the order in which bits
  // are returned by the two is undefined, and Read may return bits generated
  // before the last call to Uint64.
  public Read(p: $.Bytes): [number, $.GoError] {
    // First the bytes left of the last uint64, then whole uint64s little
    // endian, keeping the rest of the last one.
    const c = $.pointerValue<ChaCha8>(this)
    const out = $.bytesToUint8Array(p)
    let n = 0
    if (c.readLen > 0) {
      n = Math.min(out.length, c.readLen)
      out.set(c.readBuf.subarray(8 - c.readLen, 8 - c.readLen + n))
      c.readLen -= n
    }

    // Whole uint64s.
    for (; out.length - n >= 8; n += 8) {
      c[nextWords]()
      writeWords(out, n)
    }

    // Part of one more, keeping its other bytes.
    if (n < out.length) {
      c[nextWords]()
      writeWords(c.readBuf, 0)
      const k = out.length - n
      out.set(c.readBuf.subarray(0, k), n)
      c.readLen = 8 - k
      n += k
    }
    return [n, null]
  }

  // UnmarshalBinary implements the encoding.BinaryUnmarshaler interface.
  public UnmarshalBinary(data: $.Bytes): $.GoError {
    // An optional "readbuf:" prefix holds the unread bytes of Read.
    const c = $.pointerValue<ChaCha8>(this)
    let bytes = $.bytesToUint8Array(data)
    if (
      bytes.length >= 8 &&
      $.bytesToString(bytes.subarray(0, 8)) === 'readbuf:'
    ) {
      bytes = bytes.subarray(8)
      if (bytes.length === 0 || bytes.length < 1 + bytes[0]) {
        return errors.New('invalid ChaCha8 Read buffer encoding')
      }
      const buf = bytes.subarray(1, 1 + bytes[0])
      if (buf.length > 8) {
        $.panic('runtime error: slice bounds out of range')
      }
      c.readBuf.set(buf, 8 - buf.length)
      c.readLen = buf.length
      bytes = bytes.subarray(1 + bytes[0])
    }
    return chacha8rand.Unmarshal(c.state, bytes)
  }

  // AppendBinary implements the encoding.BinaryAppender interface.
  public AppendBinary(b: $.Bytes): [$.Bytes, $.GoError] {
    // The unread bytes of Read, then the generator state.
    const c = $.pointerValue<ChaCha8>(this)
    if (c.readLen > 0) {
      b = $.appendSlice(b, $.stringToBytes('readbuf:'))
      b = $.append(b, c.readLen)
      b = $.appendSlice(b, c.readBuf.subarray(8 - c.readLen))
    }
    return [$.appendSlice(b, chacha8rand.Marshal(c.state)), null]
  }

  // MarshalBinary implements the encoding.BinaryMarshaler interface.
  public MarshalBinary(): [$.Bytes, $.GoError] {
    return this.AppendBinary($.makeSlice<number>(0, 64, 'byte'))
  }

  static __typeInfo = $.registerStructType(
    'rand.ChaCha8',
    () => new ChaCha8(),
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
        'Read',
        [['p', $.sliceType($.basicType('uint8'))]],
        [
          ['n', $.basicType('int')],
          ['err', 'error'],
        ],
        true,
      ),
      $.methodSignature(
        'Seed',
        [['seed', $.arrayType($.basicType('uint8'), 32)]],
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
    ChaCha8,
    () => [
      $.structField('state', 'chacha8rand.State', [0], 0, false, {
        pkgPath: 'math/rand/v2',
      }),
      $.structField(
        'readBuf',
        $.arrayType($.basicType('uint8'), 8),
        [1],
        304,
        false,
        {
          pkgPath: 'math/rand/v2',
        },
      ),
      $.structField('readLen', $.basicType('int'), [2], 312, false, {
        pkgPath: 'math/rand/v2',
      }),
    ],
  )
}

// writeWords stores words as a little-endian uint64 at b[at:].
function writeWords(b: Uint8Array, at: number): void {
  // Byte k of each word, low byte first.
  const lo = words[0]
  const hi = words[1]
  for (let k = 0; k < 4; k++) {
    b[at + k] = lo >>> (8 * k)
    b[at + 4 + k] = hi >>> (8 * k)
  }
}

// NewChaCha8 returns a new ChaCha8 seeded with the given seed.
export function NewChaCha8(seed: Uint8Array): ChaCha8 {
  // Seed the generator of a new ChaCha8.
  const c = new ChaCha8()
  c.state.Init(seed)
  return c
}

// Copyright 2023 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google LLC nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import * as $ from '@goscript/builtin/index.js'

import * as byteorder from '@goscript/internal/byteorder/index.js'

// Package chacha8rand implements a pseudorandom generator based on ChaCha8
// (https://c2sp.org/chacha8rand). Go implements its block function in
// assembly; this override uses the builtin chacha8Block, a port of the
// portable chacha8_generic.go in 32-bit arithmetic.

const ctrInc = 4
const ctrMax = 16
const chunk = 32
const reseed = 4

// State holds the state for a single random generator.
// It must be used from one goroutine at a time.
// If used by multiple goroutines at a time, the goroutines
// may see the same random values, but the code will not
// crash or cause out-of-bounds memory accesses.
//
// buf and seed are uint64 arrays over buffers that bufWords and seedWords
// view as uint32 words, which the builtin ChaCha8 block reads and writes.
export class State {
  declare public buf: BigUint64Array

  declare public seed: BigUint64Array

  declare public i: number

  declare public n: number

  declare public c: number

  declare public bufWords: Uint32Array

  declare public seedWords: Uint32Array

  constructor(
    init?: Partial<{
      buf?: ArrayLike<bigint>
      seed?: ArrayLike<bigint>
      i?: number
      n?: number
      c?: number
    }>,
  ) {
    // The arrays and their word views share one buffer each.
    this.buf = new BigUint64Array(chunk)
    this.seed = new BigUint64Array(4)
    this.bufWords = new Uint32Array(this.buf.buffer)
    this.seedWords = new Uint32Array(this.seed.buffer)

    // Copy the initial values.
    if (init?.buf !== undefined) {
      this.buf.set(init.buf)
    }
    if (init?.seed !== undefined) {
      this.seed.set(init.seed)
    }
    this.i = init?.i ?? 0
    this.n = init?.n ?? 0
    this.c = init?.c ?? 0
  }

  public clone(): State {
    // A copy has its own buffers.
    return $.markAsStructValue(new State(this))
  }

  public __goscriptAssign(source: State): this {
    // Copy the values into the buffers of this state.
    this.buf.set(source.buf)
    this.seed.set(source.seed)
    this.i = source.i
    this.n = source.n
    this.c = source.c
    return this
  }

  public Next(): [bigint, boolean] {
    // The values from i to n are unused.
    const state = $.pointerValue<State>(this)
    const i = state.i
    if (i >= state.n) {
      return [0n, false]
    }
    state.i = i + 1
    return [state.buf[i & 31], true]
  }

  public Init(seed: Uint8Array): void {
    State.prototype.Init64.call(this, [
      byteorder.LEUint64($.goSlice(seed, 0 * 8, undefined)),
      byteorder.LEUint64($.goSlice(seed, 1 * 8, undefined)),
      byteorder.LEUint64($.goSlice(seed, 2 * 8, undefined)),
      byteorder.LEUint64($.goSlice(seed, 3 * 8, undefined)),
    ])
  }

  public Init64(seed: ArrayLike<bigint>): void {
    // Compute the first blocks of the seed.
    const state = $.pointerValue<State>(this)
    state.seed.set(seed)
    $.chacha8Block(state.seedWords, 0, state.bufWords)
    state.c = 0
    state.i = 0
    state.n = chunk
  }

  public Refill(): void {
    // Advance the counter, taking a new seed from the end of the buffer
    // every ctrMax blocks.
    const state = $.pointerValue<State>(this)
    state.c += ctrInc
    if (state.c === ctrMax) {
      state.seed.set(state.buf.subarray(chunk - reseed))
      state.c = 0
    }

    // Compute the next blocks; the last ones before a reseed keep their
    // last reseed words for the seed.
    $.chacha8Block(state.seedWords, state.c, state.bufWords)
    state.i = 0
    state.n = chunk
    if (state.c === ctrMax - ctrInc) {
      state.n = chunk - reseed
    }
  }

  public Reseed(): void {
    const state = $.pointerValue<State>(this)
    const seed: bigint[] = Array.from({ length: 4 }, () => 0n)
    for (let i = 0; i < 4; i++) {
      for (;;) {
        const [x, ok] = state.Next()
        if (ok) {
          seed[i] = x
          break
        }
        state.Refill()
      }
    }
    state.Init64(seed)
  }

  static __typeInfo = $.registerStructType(
    'chacha8rand.State',
    () => new State(),
    [
      {
        name: 'Init',
        args: [
          {
            name: 'seed',
            type: {
              kind: $.TypeKind.Array,
              elemType: { kind: $.TypeKind.Basic, name: 'uint8' },
              length: 32,
            },
          },
        ],
        returns: [],
      },
      {
        name: 'Init64',
        args: [
          {
            name: 'seed',
            type: {
              kind: $.TypeKind.Array,
              elemType: { kind: $.TypeKind.Basic, name: 'uint64' },
              length: 4,
            },
          },
        ],
        returns: [],
      },
      {
        name: 'Next',
        args: [],
        returns: [
          { name: '_r0', type: { kind: $.TypeKind.Basic, name: 'uint64' } },
          { name: '_r1', type: 'bool' },
        ],
      },
      { name: 'Refill', args: [], returns: [] },
      { name: 'Reseed', args: [], returns: [] },
    ],
    State,
    [
      {
        name: 'buf',
        key: 'buf',
        type: {
          kind: $.TypeKind.Array,
          elemType: { kind: $.TypeKind.Basic, name: 'uint64' },
          length: 32,
        },
        pkgPath: 'internal/chacha8rand',
        index: [0],
        offset: 0,
        exported: false,
      },
      {
        name: 'seed',
        key: 'seed',
        type: {
          kind: $.TypeKind.Array,
          elemType: { kind: $.TypeKind.Basic, name: 'uint64' },
          length: 4,
        },
        pkgPath: 'internal/chacha8rand',
        index: [1],
        offset: 256,
        exported: false,
      },
      {
        name: 'i',
        key: 'i',
        type: { kind: $.TypeKind.Basic, name: 'uint32' },
        pkgPath: 'internal/chacha8rand',
        index: [2],
        offset: 288,
        exported: false,
      },
      {
        name: 'n',
        key: 'n',
        type: { kind: $.TypeKind.Basic, name: 'uint32' },
        pkgPath: 'internal/chacha8rand',
        index: [3],
        offset: 292,
        exported: false,
      },
      {
        name: 'c',
        key: 'c',
        type: { kind: $.TypeKind.Basic, name: 'uint32' },
        pkgPath: 'internal/chacha8rand',
        index: [4],
        offset: 296,
        exported: false,
      },
    ],
  )
}

export class errUnmarshalChaCha8 {
  public clone(): errUnmarshalChaCha8 {
    const cloned = new errUnmarshalChaCha8()
    return $.markAsStructValue(cloned)
  }

  public Error(): string {
    return 'invalid ChaCha8 encoding'
  }

  static __typeInfo = $.registerStructType(
    'chacha8rand.errUnmarshalChaCha8',
    () => new errUnmarshalChaCha8(),
    [
      {
        name: 'Error',
        args: [],
        returns: [
          { name: '_r0', type: { kind: $.TypeKind.Basic, name: 'string' } },
        ],
      },
    ],
    errUnmarshalChaCha8,
    [],
  )
}

// Marshal marshals the state into a byte slice.
// Marshal and Unmarshal are functions, not methods,
// so that they will not be linked into the runtime
// when it uses the State struct, since the runtime
// does not need these.
export function Marshal(s: State | $.VarRef<State> | null): $.Slice<number> {
  const state = $.pointerValue<State>(s)
  const data: $.Slice<number> = $.makeSlice<number>(6 * 8, undefined, 'byte')
  $.copy(data, 'chacha8:')
  const used = (state.c / ctrInc) * chunk + state.i
  byteorder.BEPutUint64($.goSlice(data, 1 * 8, undefined), used)
  for (let i = 0; i < 4; i++) {
    byteorder.LEPutUint64(
      $.goSlice(data, (2 + i) * 8, undefined),
      state.seed[i],
    )
  }
  return data
}

// Unmarshal unmarshals the state from a byte slice.
export function Unmarshal(
  s: State | $.VarRef<State> | null,
  data: $.Slice<number>,
): $.GoError {
  // The encoding is the "chacha8:" tag, the count of used values and the
  // seed.
  const state = $.pointerValue<State>(s)
  if (
    $.len(data) !== 6 * 8 ||
    !$.stringEqual($.bytesToString($.goSlice(data, undefined, 8)), 'chacha8:')
  ) {
    return $.interfaceValue<$.GoError>(
      new errUnmarshalChaCha8(),
      '*chacha8rand.errUnmarshalChaCha8',
      { kind: $.TypeKind.Pointer, elemType: 'chacha8rand.errUnmarshalChaCha8' },
    )
  }

  // The count must leave values before the next reseed.
  const used = byteorder.BEUint64($.goSlice(data, 1 * 8, undefined))
  if (used > (ctrMax / ctrInc) * chunk - reseed) {
    return $.interfaceValue<$.GoError>(
      new errUnmarshalChaCha8(),
      '*chacha8rand.errUnmarshalChaCha8',
      { kind: $.TypeKind.Pointer, elemType: 'chacha8rand.errUnmarshalChaCha8' },
    )
  }

  // Restore the seed and recompute the blocks that held the next value.
  const usedNum = $.uint(used, 32)
  for (let i = 0; i < 4; i++) {
    state.seed[i] = byteorder.LEUint64($.goSlice(data, (2 + i) * 8, undefined))
  }
  state.c = ctrInc * Math.trunc(usedNum / chunk)
  $.chacha8Block(state.seedWords, state.c, state.bufWords)

  // Continue from the next value; the last blocks before a reseed keep
  // their reseed words.
  state.i = usedNum % chunk
  state.n = chunk
  if (state.c === ctrMax - ctrInc) {
    state.n = chunk - reseed
  }
  return null
}

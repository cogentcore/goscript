import { describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'

import { Float64, SliceOf, Uint8, Value } from './index.js'
import { BasicType } from './type.js'

const uint8Type = new BasicType(Uint8, 'uint8', 1)
const float64Type = new BasicType(Float64, 'float64', 8)

describe('Value construction', () => {
  it('keeps an empty byte slice valid', () => {
    const v = new Value(new Uint8Array(0), SliceOf(uint8Type))
    expect(v.IsValid()).toBe(true)
    expect(v.Len()).toBe(0)
  })

  it('treats an empty object as the zero Value', () => {
    expect(new Value({}, SliceOf(uint8Type)).IsValid()).toBe(false)
  })

  it('clones a large slice Value in constant time', () => {
    const n = 1_000_000
    const v = new Value(
      $.makeSlice<number>(n, n, 'number'),
      SliceOf(float64Type),
    )
    const start = performance.now()
    for (let i = 0; i < 1000; i++) {
      v.clone()
    }
    // Listing the keys of the slice on each clone takes seconds.
    expect(performance.now() - start).toBeLessThan(500)
    expect(v.Index(n - 1).Float()).toBe(0)
  })
})

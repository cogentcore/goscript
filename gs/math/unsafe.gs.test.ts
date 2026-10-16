import { describe, it, expect } from 'vitest'
import {
  Float32bits,
  Float32frombits,
  Float64bits,
  Float64frombits,
} from './unsafe.gs.js'

describe('Float32bits', () => {
  it('should return the IEEE 754 bits of floats', () => {
    expect(Float32bits(1)).toBe(0x3f800000)
    expect(Float32bits(-2)).toBe(0xc0000000)
    expect(Float32bits(0)).toBe(0)
    expect(Float32bits(-0)).toBe(0x80000000)
    expect(Float32bits(Number.POSITIVE_INFINITY)).toBe(0x7f800000)
    expect(Float32bits(1e-45)).toBe(1)
  })

  it('should round trip with Float32frombits', () => {
    for (const b of [0, 1, 0x3f800000, 0x80000000, 0x7f7fffff, 0xff800000]) {
      expect(Float32bits(Float32frombits(b))).toBe(b)
    }
    expect(Object.is(Float32frombits(0x80000000), -0)).toBe(true)
    expect(Number.isNaN(Float32frombits(0x7fc00000))).toBe(true)
  })
})

describe('Float64bits', () => {
  it('should return the IEEE 754 bits of floats', () => {
    expect(Float64bits(1)).toBe(0x3ff0000000000000n)
    expect(Float64bits(-0)).toBe(0x8000000000000000n)
    expect(Float64bits(Number.NEGATIVE_INFINITY)).toBe(0xfff0000000000000n)
    expect(Float64bits(5e-324)).toBe(1n)
  })

  it('should round trip with Float64frombits', () => {
    for (const b of [
      0n,
      1n,
      0x3ff0000000000000n,
      0x8000000000000000n,
      0x7fefffffffffffffn,
    ]) {
      expect(Float64bits(Float64frombits(b))).toBe(b)
    }
    expect(Float64frombits(-1n)).toBeNaN()
    expect(Float64frombits(0x3ff0000000000000n + (1n << 64n))).toBe(1)
  })
})

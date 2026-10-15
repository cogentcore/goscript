import { describe, expect, it } from 'vitest'

import { chacha8Block, runtimeRand, runtimeRandUint32 } from './rand.js'

describe('chacha8Block', () => {
  it('matches the first words of the native Go ChaCha8 stream', () => {
    // The seed is the bytes 1 to 32; Go's first two uint64s are
    // 1321726231891648469 and 7633913885951459254.
    const seed = new Uint32Array(new Uint8Array(32).map((_, i) => i + 1).buffer)
    const out = new Uint32Array(64)
    chacha8Block(seed, 0, out)
    const wide = new BigUint64Array(out.buffer)
    expect(wide[0]).toBe(1321726231891648469n)
    expect(wide[1]).toBe(7633913885951459254n)
    expect(wide[31]).toBe(7435345417750366512n)
  })
})

describe('runtimeRand', () => {
  it('returns distinct 64-bit values across reseeds', () => {
    // 1000 values use eight blocks, so two reseeds.
    const seen = new Set<bigint>()
    for (let i = 0; i < 1000; i++) {
      const x = runtimeRand()
      expect(x >= 0n && x < 1n << 64n).toBe(true)
      seen.add(x)
    }
    expect(seen.size).toBe(1000)
  })

  it('mixes with 32-bit words', () => {
    // An odd word position skips to the next aligned uint64.
    const a = runtimeRandUint32()
    expect(Number.isInteger(a) && a >= 0 && a < 2 ** 32).toBe(true)
    const x = runtimeRand()
    expect(x >= 0n).toBe(true)
    let ones = 0
    for (let i = 0; i < 4096; i++) {
      ones += runtimeRandUint32() & 1
    }
    expect(ones > 1800 && ones < 2300).toBe(true)
  })
})

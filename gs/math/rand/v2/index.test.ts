import { describe, expect, it } from 'vitest'

import * as rand from './index.js'

describe('math/rand/v2', () => {
  it('matches the values of Go for PCG', () => {
    // Go: rand.New(rand.NewPCG(1, 42)) draws these first.
    const r = rand.New(rand.NewPCG(1n, 42n))
    expect(r.Int64()).toBe(980775777411032964n)
    expect(r.Uint32()).toBe(2229863641)
    expect(r.Uint64()).toBe(1624184529377034895n)
    expect(r.Int32()).toBe(896504425)
    expect(r.IntN(10)).toBe(3)
    expect(r.Int32N(100)).toBe(0)
    expect(r.Uint64N(1n << 40n)).toBe(1048854116703n)
  })

  it('matches the values of Go for ChaCha8', () => {
    // Go: the seed holds 1 + i at byte i.
    const seed = new Uint8Array(32).map((_, i) => 1 + i)
    const r = rand.New(rand.NewChaCha8(seed))
    expect(r.Int64()).toBe(1321726231891648469n)
    expect(r.Uint32()).toBe(1777409083)
    expect(r.Uint64()).toBe(8828777078258939905n)
  })

  it('returns N in the type of n', () => {
    const r = rand.New(rand.NewPCG(1n, 2n))
    expect(typeof r.N(10)).toBe('number')
    expect(typeof r.N(10n)).toBe('bigint')
  })
})

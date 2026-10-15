import { describe, expect, it } from 'vitest'

import * as rand from './index.js'

describe('math/rand', () => {
  it('matches the values of Go for a seeded source', () => {
    // Go: rand.New(rand.NewSource(0)) draws these first.
    const r = rand.New(rand.NewSource(0n))
    expect(r.Int63()).toBe(8717895732742165505n)
    expect(r.Uint32()).toBe(1052117029)
    expect(r.Uint64()).toBe(6050128673802995827n)
    expect(r.Int31()).toBe(116702506)
    expect(r.Intn(10)).toBe(5)
    expect(r.Int31n(100)).toBe(96)
    expect(r.Float64()).toBe(0.19243860967493215)
  })

  it('draws in range from the global source', () => {
    for (let i = 0; i < 1000; i++) {
      const f = rand.Float64()
      expect(f >= 0 && f < 1).toBe(true)
      const n = rand.Intn(7)
      expect(n >= 0 && n < 7).toBe(true)
    }
  })

  it('continues a Shuffle asynchronously after a swap that suspends', async () => {
    const r = rand.New(rand.NewSource(1n))
    const s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const done = r.Shuffle(s.length, async (i: number, j: number) => {
      await Promise.resolve()
      ;[s[i], s[j]] = [s[j], s[i]]
    })
    expect(done).toBeInstanceOf(Promise)
    await done
    expect([...s].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})

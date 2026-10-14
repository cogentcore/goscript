import { describe, expect, it } from 'vitest'

import { syncFunction, syncResult } from './index.js'

describe('syncResult', () => {
  it('returns a synchronous result', () => {
    expect(syncResult(3)).toBe(3)
  })

  it('throws when the function value suspended', () => {
    expect(() => syncResult(Promise.resolve(3))).toThrow(
      'function value suspended in a synchronous context',
    )
  })
})

describe('syncFunction', () => {
  it('returns the synchronous results of a function value', () => {
    const add = syncFunction(
      (a: number, b: number): number | Promise<number> => a + b,
    )
    expect(add!(1, 2)).toBe(3)
  })

  it('keeps a nil function value', () => {
    expect(syncFunction(null)).toBeNull()
  })

  it('throws when the function value suspends', () => {
    const suspend = syncFunction(async (): Promise<number> => 3)
    expect(() => suspend!()).toThrow(
      'function value suspended in a synchronous context',
    )
  })
})

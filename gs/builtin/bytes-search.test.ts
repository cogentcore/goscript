import { describe, expect, it } from 'vitest'

import {
  bytesCount,
  bytesIndexByte,
  bytesIndexOf,
  bytesLastIndexByte,
  bytesLastIndexOf,
} from './builtin.js'
import { goSlice, stringToBytes } from './slice.js'

describe('byte search', () => {
  // Windows of a larger backing array must be searched in place, relative to
  // their own start, without seeing the bytes outside the window.
  const backing = stringToBytes('xxab,cd,ab,efxx')
  const windows = [
    stringToBytes('ab,cd,ab,ef'),
    goSlice(backing, 2, 13),
    goSlice(Array.from(backing) as any, 2, 13),
  ]

  it.each(windows.map((w, i) => [i, w]))('searches window %i', (_i, w) => {
    // Subsequence searches are relative to the window, not the backing array.
    expect(bytesIndexOf(w as any, stringToBytes('ab'))).toBe(0)
    expect(bytesIndexOf(w as any, stringToBytes('cd,'))).toBe(3)
    expect(bytesIndexOf(w as any, stringToBytes('xx'))).toBe(-1)
    expect(bytesIndexOf(w as any, stringToBytes(','))).toBe(2)
    expect(bytesIndexOf(w as any, stringToBytes(''))).toBe(0)

    // The last match is found from the end of the window.
    expect(bytesLastIndexOf(w as any, stringToBytes('ab'))).toBe(6)
    expect(bytesLastIndexOf(w as any, stringToBytes('xx'))).toBe(-1)

    // Single byte searches ignore the bytes around the window.
    expect(bytesIndexByte(w as any, 'f'.charCodeAt(0))).toBe(10)
    expect(bytesIndexByte(w as any, 'x'.charCodeAt(0))).toBe(-1)
    expect(bytesLastIndexByte(w as any, ','.charCodeAt(0))).toBe(8)
    expect(bytesLastIndexByte(w as any, 'x'.charCodeAt(0))).toBe(-1)

    // Counting covers the window only.
    expect(bytesCount(w as any, stringToBytes(','))).toBe(3)
    expect(bytesCount(w as any, stringToBytes('ab'))).toBe(2)
    expect(bytesCount(w as any, stringToBytes(''))).toBe(12)
  })
})

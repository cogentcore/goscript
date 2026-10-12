import { describe, it, expect } from 'vitest'
import * as $ from '../builtin/index.js'
import * as unsafe from './unsafe.js'

describe('unsafe package', () => {
  it('should throw error for Alignof', () => {
    expect(() => unsafe.Alignof({})).toThrow(
      'unsafe.Alignof is not supported in JavaScript/TypeScript',
    )
  })

  it('should throw error for Offsetof', () => {
    expect(() => unsafe.Offsetof({})).toThrow(
      'unsafe.Offsetof is not supported in JavaScript/TypeScript',
    )
  })

  it('should throw error for Sizeof', () => {
    expect(() => unsafe.Sizeof({})).toThrow(
      'unsafe.Sizeof is not supported in JavaScript/TypeScript',
    )
  })

  it('should throw error for Add', () => {
    expect(() => unsafe.Add(null, 1)).toThrow(
      'unsafe.Add is not supported in JavaScript/TypeScript',
    )
  })

  it('should throw error for Slice', () => {
    expect(() => unsafe.Slice(null, 1)).toThrow(
      'unsafe.Slice is not supported in JavaScript/TypeScript',
    )
  })

  it('round-trips SliceData through Slice sharing the backing array', () => {
    const s = $.arrayToSlice<number>([1, 2, 3])
    const view = unsafe.Slice<number>(unsafe.SliceData(s), 2n)
    expect($.len(view)).toBe(2)
    view![0] = 9
    expect(s![0]).toBe(9)
    expect(unsafe.SliceData(null)).toBe(null)
    expect(unsafe.Slice(null, 0)).toBe(null)
  })

  it('round-trips StringData and SliceData through String', () => {
    expect(unsafe.String(unsafe.StringData('héllo'), 6n)).toBe('héllo')
    expect(unsafe.String(unsafe.StringData('héllo'), 3)).toBe('hé')
    const b = $.stringToBytes('bytes')
    expect(unsafe.String(unsafe.SliceData(b), 4)).toBe('byte')
    expect(unsafe.String(null, 0)).toBe('')
  })

  it('should throw error for String', () => {
    expect(() => unsafe.String(null, 1)).toThrow(
      'unsafe.String is not supported in JavaScript/TypeScript',
    )
  })

  it('round-trips StringData through Slice as UTF-8 bytes', () => {
    const ptr = unsafe.StringData('你')

    expect(Array.from(unsafe.Slice(ptr, 3))).toEqual([0xe4, 0xbd, 0xa0])
  })

  it('should export IntegerType as number type', () => {
    // IntegerType is just a type alias, so we can't test it directly
    // But we can verify it's exported and can be used as a type
    const value: unsafe.IntegerType = 42
    const wide: unsafe.IntegerType = 42n
    expect(typeof value).toBe('number')
    expect(typeof wide).toBe('bigint')
  })

  it('should export ArbitraryType and Pointer types', () => {
    // These are type aliases, so we can't test them directly
    // But we can verify they can be used as types
    const arbitrary: unsafe.ArbitraryType = 'anything'
    const pointer: unsafe.Pointer = null
    expect(arbitrary).toBe('anything')
    expect(pointer).toBe(null)
  })
})

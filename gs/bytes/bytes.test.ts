import * as $ from '@goscript/builtin/index.js'
import {
  Clone,
  Equal,
  IndexAny,
  IndexFunc,
  Replace,
  Runes,
  Trim,
} from './index.js'
import { describe, expect, test } from 'vitest'

const rep = (s: string, old: string, n: string, count: number): string =>
  $.bytesToString(
    Replace(
      $.stringToBytes(s),
      $.stringToBytes(old),
      $.stringToBytes(n),
      count,
    ),
  )

describe('bytes', () => {
  test('Runes decodes ASCII, multibyte and invalid UTF-8', () => {
    // Go: bytes.Runes([]byte("a\xffé世\xf0\x9f\x98\x80b\xe4")) =>
    // ['a', RuneError, 'é', '世', '😀', 'b', RuneError].
    const b = new Uint8Array([
      0x61, 0xff, 0xc3, 0xa9, 0xe4, 0xb8, 0x96, 0xf0, 0x9f, 0x98, 0x80, 0x62,
      0xe4,
    ])
    expect(Array.from(Runes(b) as number[])).toEqual([
      0x61, 0xfffd, 0xe9, 0x4e16, 0x1f600, 0x62, 0xfffd,
    ])
    expect(Array.from(Runes($.goSlice(b, 2, 7)) as number[])).toEqual([
      0xe9, 0x4e16,
    ])
  })

  test('Replace with empty old appends the untouched remainder', () => {
    // Go: bytes.Replace([]byte("abc"), []byte(""), []byte("-"), 2) => "-a-bc".
    expect(rep('abc', '', '-', 2)).toBe('-a-bc')
    expect(rep('abc', '', '-', -1)).toBe('-a-b-c-')
    expect(rep('aaa', 'a', 'b', -1)).toBe('bbb')
  })

  test('cutsets and char sets match runes by their UTF-8 bytes', () => {
    const e = $.goString('é')
    const s = $.stringToBytes($.goString('éaé'))
    expect($.bytesToString(Trim(s, e))).toBe('a')
    expect(IndexAny($.stringToBytes($.goString('aé')), e)).toBe(1)
  })

  test('Equal treats nil and empty byte slices as equivalent', () => {
    expect(Equal(null, new Uint8Array(0))).toBe(true)
    expect(Equal(new Uint8Array(0), null)).toBe(true)
  })

  test('Clone preserves nil and gives non-nil bytes independent storage', () => {
    expect(Clone(null)).toBeNull()

    const empty = Clone(new Uint8Array(0))
    expect(empty).not.toBeNull()
    expect($.len(empty)).toBe(0)

    const source = $.stringToBytes('abc')
    const cloned = Clone(source)
    if (cloned === null) {
      throw new Error('Clone returned nil for non-nil input')
    }

    expect($.bytesToString(cloned)).toBe('abc')

    source[0] = 0x7a
    expect($.bytesToString(source)).toBe('zbc')
    expect($.bytesToString(cloned)).toBe('abc')

    $.sliceElems(cloned)[$.sliceSlot(cloned, 1)] = 0x79
    expect($.bytesToString(cloned)).toBe('ayc')
    expect($.bytesToString(source)).toBe('zbc')
  })

  test('IndexFunc accepts generated async-shaped callbacks', () => {
    const predicate: (r: number) => boolean | Promise<boolean> = (r) =>
      r === 0x62

    expect(IndexFunc($.stringToBytes('abc'), predicate)).toBe(1)
  })

  test('IndexFunc rejects actual async callback results', () => {
    expect(() =>
      IndexFunc($.stringToBytes('abc'), async (r) => r === 0x62),
    ).toThrow('bytes: asynchronous callback result is not supported')
  })
})

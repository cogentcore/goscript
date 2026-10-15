import * as $ from '@goscript/builtin/index.js'
import { Buffer, NewBuffer, NewBufferString } from './index.js'
import { describe, expect, test } from 'vitest'

describe('bytes.Buffer', () => {
  test('WriteByte stores bytes in place and Bytes sees all of them', () => {
    // Writes cross the first allocation and a later growth.
    const b = new Buffer()
    let want = ''
    for (let i = 0; i < 300; i++) {
      const c = 97 + (i % 26)
      b.WriteByte(c)
      want += String.fromCharCode(c)
      expect(b.Len()).toBe(i + 1)
    }
    expect(b.String()).toBe(want)
    expect($.bytesToString(b.Bytes())).toBe(want)
  })

  test('Bytes aliases the contents until the next write', () => {
    // A change through Bytes is read back, and later writes append.
    const b = NewBufferString('abc')
    const p = b.Bytes()
    p![0] = 120
    b.WriteByte(100)
    b.WriteString('ef')
    expect(b.String()).toBe('xbcdef')
    expect(b.Cap()).toBeGreaterThanOrEqual(6)
  })

  test('a buffer with spare capacity writes into the slice it was given', () => {
    // NewBuffer(buf[:0]) of a slice with capacity writes into buf.
    const backing = $.makeSlice<number>(8, 8, 'byte')
    const b = NewBuffer($.goSlice(backing, 0, 0))
    b.WriteByte(65)
    b.WriteByte(66)
    b.Write($.stringToBytes('CD'))
    expect($.bytesToString($.goSlice(backing, 0, 4))).toBe('ABCD')
    expect(b.Cap()).toBe(8)
    expect(b.Available()).toBe(4)
  })

  test('Truncate, Reset, ReadByte and UnreadByte after in-place writes', () => {
    // The length of the contents follows every operation.
    const b = new Buffer()
    b.WriteString('hello')
    b.WriteByte(33)
    b.Truncate(4)
    expect(b.String()).toBe('hell')
    const [c] = b.ReadByte()
    expect(c).toBe(104)
    expect(b.UnreadByte()).toBe(null)
    b.WriteByte(111)
    expect(b.String()).toBe('hello')
    b.Reset()
    b.WriteByte(122)
    expect(b.String()).toBe('z')
    expect(b.Len()).toBe(1)
  })

  test('clone copies the contents view', () => {
    // A clone reads the same bytes as the original at the time of the copy.
    const b = new Buffer()
    b.WriteString('ab')
    b.WriteByte(99)
    const c = b.clone()
    expect(c.String()).toBe('abc')
    expect(c.Len()).toBe(3)
  })
})

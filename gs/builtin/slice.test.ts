import { arrayIndex, sliceElems, sliceSlot, windowSlot } from './slice.js'
import { describe, expect, it, vi } from 'vitest'

import { makeMap, mapGet, mapSet } from './map.js'
import {
  append,
  appendSlice,
  appendZero,
  appendZeros,
  arrayToSlice,
  byteSliceHint,
  bytesFromHex,
  bytesToString,
  copy,
  copyByteRanges,
  goSlice,
  sliceRange,
  indexString,
  jsString,
  goString,
  rangeString,
  stringRunes,
  bytesToString,
  indexByteString,
  len,
  makeSlice,
  runeToString,
  runesToString,
  sliceString,
  stringCompare,
  stringEqual,
  stringLen,
  stringToBytes,
} from './slice.js'
import { markAsStructValue } from './type.js'

describe('loop slice windows', () => {
  it('offsets checked indexes into the backing array of a window', () => {
    const base = [1, 2, 3, 4, 5]
    const window = sliceRange(goSlice(base, 1, 4))
    expect(window.backing[windowSlot(window, 0)]).toBe(2)
    expect(window.backing[windowSlot(window, 2)]).toBe(4)
    expect(() => windowSlot(window, 3)).toThrow(
      'index out of range [3] with length 3',
    )
    expect(() => windowSlot(window, -1)).toThrow('index out of range [-1]')
    expect(() => windowSlot(sliceRange(null), 0)).toThrow(
      'index out of range [0] with length 0',
    )
  })
})

describe('byte range copies', () => {
  it('copies overlapping views of the same buffer with memmove semantics', () => {
    const bytes = new Uint8Array([1, 2, 3, 4, 5])
    const src = bytes.subarray(0, 4)
    const dst = bytes.subarray(1)

    expect(copyByteRanges(dst, 0, undefined, src, 0, undefined)).toBe(4)
    expect(Array.from(bytes)).toEqual([1, 1, 2, 3, 4])
    expect(copyByteRanges(bytes, 0, 4, bytes, 1, 5)).toBe(4)
    expect(Array.from(bytes)).toEqual([1, 2, 3, 4, 4])
  })

  it('uses metadata capacity while preserving omitted high bounds', () => {
    const bytes = new Uint8Array([1, 2, 3, 4, 5, 6])
    const dst = goSlice(bytes, 1, 2, 5)
    const src = new Uint8Array([7, 8, 9])

    expect(copyByteRanges(dst, 1, 4, src, 0, undefined)).toBe(3)
    expect(Array.from(bytes)).toEqual([1, 2, 7, 8, 9, 6])
    expect(copyByteRanges(dst, undefined, undefined, src, 0, 3)).toBe(1)
    expect(Array.from(bytes)).toEqual([1, 7, 7, 8, 9, 6])
  })

  it('validates both ranges before writing, including nil destinations', () => {
    const dst = new Uint8Array([1, 2])
    const src = new Uint8Array([3])

    expect(() => copyByteRanges(dst, 0, 2, src, 0, 2)).toThrow()
    expect(Array.from(dst)).toEqual([1, 2])
    expect(() => copyByteRanges(null, 0, 0, src, 0, 2)).toThrow()
    expect(copyByteRanges(null, 0, 0, src, 0, 1)).toBe(0)
  })

  it('preserves Array-backed byte slice aliases', () => {
    const backing = [1, 2, 3, 4, 5]
    const dst = goSlice(backing, 1, 4)
    const src = goSlice(backing, 0, 3)

    expect(copyByteRanges(dst, 0, 3, src, 0, 3)).toBe(3)
    expect(backing).toEqual([1, 1, 2, 3, 5])
  })
})

describe('compiler byte constants', () => {
  it('indexes encoded constants by byte with Go bounds checks', () => {
    expect(indexByteString('\x00\xff\x07\xe4\xbd\xa0', 1)).toBe(255)
    expect(indexByteString('\x00\xff\x07\xe4\xbd\xa0', 2)).toBe(7)
    expect(indexByteString('\x00\xff\x07\xe4\xbd\xa0', 4)).toBe(189)
    expect(() => indexByteString('a', -1)).toThrow()
    expect(() => indexByteString('a', 1)).toThrow()
  })

  it('decodes compact hexadecimal byte arrays', () => {
    expect(bytesFromHex('00ff8041')).toEqual(new Uint8Array([0, 255, 128, 65]))
  })
})

describe('rune to string encoding (Go string(rune) semantics)', () => {
  it('preserves astral-plane runes above U+FFFF', () => {
    // U+1F600 grinning face; fromCharCode would have truncated to a broken unit.
    expect(jsString(runeToString(0x1f600))).toBe('😀')
    expect(jsString(runeToString(0x1f600)).codePointAt(0)).toBe(0x1f600)
    expect(runeToString(0x597d)).toBe(goString('好'))
  })

  it('maps invalid and surrogate runes to U+FFFD, never throwing', () => {
    expect(jsString(runeToString(-1))).toBe('�')
    expect(jsString(runeToString(0x110000))).toBe('�')
    expect(jsString(runeToString(0xd800))).toBe('�')
  })

  it('encodes a rune slice with astral planes intact', () => {
    expect(jsString(runesToString([0x48, 0x69, 0x1f600]))).toBe('Hi😀')
    expect(runesToString([])).toBe('')
  })
})

describe('destination-independent byte specialization', () => {
  it('byte-specializes appendSlice onto a nil []byte via the hint', () => {
    const src = new Uint8Array([10, 20, 30])
    const out = appendSlice(null, src, byteSliceHint)
    expect(out).toBeInstanceOf(Uint8Array)
    expect(Array.from(out as Uint8Array)).toEqual([10, 20, 30])
  })

  it('byte-specializes a Slice<number> source appended onto nil', () => {
    const src = arrayToSlice<number>([1, 2, 3])
    const out = appendSlice(null, src, byteSliceHint)
    expect(out).toBeInstanceOf(Uint8Array)
    expect(Array.from(out as Uint8Array)).toEqual([1, 2, 3])
  })

  it('byte-specializes the dAtA[i:j] sub-slice idiom onto nil', () => {
    const dAtA = new Uint8Array([10, 20, 30, 40, 50])
    const out = appendSlice(null, dAtA.subarray(1, 4), byteSliceHint)
    expect(out).toBeInstanceOf(Uint8Array)
    expect(Array.from(out as Uint8Array)).toEqual([20, 30, 40])
  })

  it('byte-specializes the variadic append form onto nil', () => {
    const out = append(null, 65, 66, 67, byteSliceHint)
    expect(out).toBeInstanceOf(Uint8Array)
    expect(Array.from(out as Uint8Array)).toEqual([65, 66, 67])
  })

  it('reallocates an empty generic array destination into a Uint8Array', () => {
    const out = append([] as number[], 7, 8, byteSliceHint)
    expect(out).toBeInstanceOf(Uint8Array)
    expect(Array.from(out as Uint8Array)).toEqual([7, 8])
  })

  it('keeps a pre-made byte buffer specialized across [:0] reuse', () => {
    const buf = makeSlice<number>(0, 2, 'byte')
    const out = appendSlice(buf, new Uint8Array([1, 2, 3, 4]), byteSliceHint)
    expect(out).toBeInstanceOf(Uint8Array)
    expect(Array.from(out as Uint8Array)).toEqual([1, 2, 3, 4])
  })

  it('preserves spare generic byte backing across appendSlice', () => {
    const dst = makeSlice<number>(0, 64)
    const alias = append(dst, 0, 0, 0)
    const out = appendSlice(dst, new Uint8Array([11, 22, 33]), byteSliceHint)

    expect(Array.from(out as number[])).toEqual([11, 22, 33])
    expect(Array.from(alias as number[])).toEqual([11, 22, 33])
  })

  it('leaves non-byte appends generic and hint-free', () => {
    const out = append([] as string[], 'a', 'b')
    expect(out).not.toBeInstanceOf(Uint8Array)
    expect(Array.from(out as string[])).toEqual(['a', 'b'])
  })
})

describe('append spare capacity', () => {
  class Item {
    value = 0
  }

  it('zero-initializes primitive elements exposed by reslicing', () => {
    let values = append<number>(null, 1)
    values = append(values, 2)
    values = append(values, 3)

    expect(arrayIndex(goSlice(values, undefined, 4), 3)).toBe(0)
  })

  it('zero-initializes struct elements exposed by reslicing', () => {
    const zeroHint = appendZero(() => markAsStructValue(new Item()))
    let values = append<Item>(null, markAsStructValue(new Item()), zeroHint)
    values = append(values, markAsStructValue(new Item()), zeroHint)
    values = append(values, markAsStructValue(new Item()), zeroHint)

    const zero = arrayIndex(goSlice(values, undefined, 4), 3)
    expect(zero).toBeInstanceOf(Item)
    expect(zero.value).toBe(0)
  })

  it('creates independent struct zeros for every spare slot', () => {
    const zeroHint = appendZero(() => markAsStructValue(new Item()))
    let values = append<Item>(null, markAsStructValue(new Item()), zeroHint)
    for (let i = 0; i < 4; i++) {
      values = append(values, markAsStructValue(new Item()), zeroHint)
    }

    const expanded = goSlice(values, undefined, 8)
    arrayIndex(expanded, 5).value = 7
    expect(arrayIndex(expanded, 6).value).toBe(0)
    expect(arrayIndex(expanded, 5)).not.toBe(arrayIndex(expanded, 6))
  })

  it('zero-initializes appendSlice spare capacity from a static hint', () => {
    const dynamic = markAsStructValue(new Item())
    const source: (Item | null)[] = [dynamic]
    let values = appendSlice<Item | null>(null, source, appendZeros.nil)
    values = appendSlice(values, source, appendZeros.nil)
    values = appendSlice(values, source, appendZeros.nil)

    expect(arrayIndex(goSlice(values, undefined, 4), 3)).toBeNull()
  })

  it('copies struct elements when append reallocates or spreads a slice', () => {
    class Cell {
      n: number
      constructor(n: number) {
        this.n = n
      }
      clone(): Cell {
        return markAsStructValue(new Cell(this.n))
      }
    }
    const cell = (n: number) => markAsStructValue(new Cell(n))
    const source = [cell(1)]

    const appended = append(source, cell(2))
    arrayIndex(appended, 0).n = 9
    expect(source[0].n).toBe(1)

    const spread = appendSlice(null, source)
    arrayIndex(spread, 0).n = 8
    expect(source[0].n).toBe(1)
  })

  it('snapshots an overlapping variadic append before writing', () => {
    const source = makeSlice<number>(2, 4, 'number')
    sliceElems(source)[sliceSlot(source, 0)] = 1
    sliceElems(source)[sliceSlot(source, 1)] = 2

    const out = appendSlice(goSlice(source, 0, 1), source)

    expect([
      arrayIndex(out, 0),
      arrayIndex(out, 1),
      arrayIndex(out, 2),
    ]).toEqual([1, 1, 2])
  })

  it('uses the static interface zero instead of the dynamic element type', () => {
    const dynamic = markAsStructValue(new Item())
    let values = append<Item | null>(null, dynamic, appendZeros.nil)
    values = append(values, dynamic, appendZeros.nil)
    values = append(values, dynamic, appendZeros.nil)

    expect(arrayIndex(goSlice(values, undefined, 4), 3)).toBeNull()
  })
})

describe('builtin string byte representation', () => {
  it('reads ASCII lengths and bytes without encoding temporary arrays', () => {
    const value = String.fromCharCode(
      ...Array.from({ length: 128 }, (_, i) => i),
    )
    const encode = vi.spyOn(TextEncoder.prototype, 'encode')
    try {
      expect(stringLen('')).toBe(0)
      expect(len(value)).toBe(128)
      for (let i = 0; i < value.length; i++) {
        expect(indexString(value, i)).toBe(i)
      }
      expect(encode).not.toHaveBeenCalled()
    } finally {
      encode.mockRestore()
    }
  })

  it.each(['aé🙂z', '你好', '\ud800', '\udc00', 'a\u2028', 'a\u2029'])(
    'keeps UTF-8 byte reads for %j',
    (text) => {
      const value = goString(text)
      const bytes = new TextEncoder().encode(text)
      expect(stringLen(value)).toBe(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        expect(indexString(value, i)).toBe(bytes[i])
      }
    },
  )

  it('keeps binary string bytes and independent conversion buffers', () => {
    const bytes = new Uint8Array([0, 255, 128, 65])
    for (const value of [bytesToString(bytes), bytesToString(bytes.slice())]) {
      expect(stringLen(value)).toBe(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        expect(indexString(value, i)).toBe(bytes[i])
      }
      stringToBytes(value).fill(0)
      expect(stringToBytes(value)).toEqual(bytes)
    }
    const ascii = 'abc'
    stringToBytes(ascii).fill(0)
    expect(indexString(ascii, 0)).toBe(97)
  })

  it('holds invalid bytes so native string operations see the bytes', () => {
    const prefix = new TextEncoder().encode('block:')
    const key = bytesToString(new Uint8Array([...prefix, 1, 0xff, 0x80]))
    expect(key.startsWith('block:')).toBe(true)
    expect(stringLen(key)).toBe(9)
    expect(indexString(key, 7)).toBe(0xff)
    expect(key < 'gcroot').toBe(true)

    // A rune split into two strings joins back into the same bytes.
    const euro = goString('€')
    const head = sliceString(euro, 0, 1)
    expect(stringLen(head)).toBe(1)
    expect(head + sliceString(euro, 1)).toBe(euro)
  })

  it('represents Go strings by their UTF-8 bytes', () => {
    for (const text of ['a'.repeat(40), 'é'.repeat(20), 'x'.repeat(39) + 'é']) {
      const value = goString(text)
      const bytes = new TextEncoder().encode(text)
      expect(stringLen(value)).toBe(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        expect(indexString(value, i)).toBe(bytes[i])
      }
      expect(stringToBytes(sliceString(value, 2, 10))).toEqual(
        bytes.subarray(2, 10),
      )
      expect(jsString(value)).toBe(text)
    }
  })

  it('ranges over runes with their UTF-8 byte offsets', () => {
    for (const value of [
      '',
      'abc',
      'aé🙂z€',
      '你好',
      'x\ud800y',
      '\udc00',
      'a\ud83d',
    ]) {
      const want: Array<[number, number]> = []
      let offset = 0
      for (const char of value) {
        const r = char.codePointAt(0) || 0
        // A lone surrogate is encoded as U+FFFD.
        want.push([offset, r >= 0xd800 && r <= 0xdfff ? 0xfffd : r])
        offset += new TextEncoder().encode(char).length
      }
      expect(rangeString(goString(value))).toEqual(want)
      const got: Array<[number, number]> = []
      for (const runes = stringRunes(goString(value)); runes.next(); ) {
        got.push([runes.index, runes.rune])
      }
      expect(got).toEqual(want)
    }

    // A byte string (invalid UTF-8) steps through its bytes.
    const bytes = bytesToString(new Uint8Array([0x61, 0xff, 0xc3, 0xa9, 0x62]))
    const got: Array<[number, number]> = []
    for (const runes = stringRunes(bytes); runes.next(); ) {
      got.push([runes.index, runes.rune])
    }
    expect(got).toEqual(rangeString(bytes))
    expect(got).toEqual([
      [0, 0x61],
      [1, 0xfffd],
      [2, 0xe9],
      [4, 0x62],
    ])
  })

  it('preserves byte-index bounds and non-integer access behavior', () => {
    for (const value of ['', 'abc', 'é']) {
      expect(() => indexString(value, -1)).toThrow('index out of range [-1]')
      const length = stringLen(value)
      expect(() => indexString(value, length)).toThrow(
        `index out of range [${length}] with length ${length}`,
      )
      expect(indexString(value, NaN)).toBeUndefined()
    }
    expect(indexString('abc', 0.5)).toBeUndefined()
  })

  it('appends large byte slices without JavaScript argument spreading', () => {
    const dst = new Uint8Array(0)
    const src = new Uint8Array(200_000)
    src[0] = 7
    src[src.length - 1] = 9

    const out = appendSlice(dst, src)

    expect(out.length).toBe(src.length)
    expect(out[0]).toBe(7)
    expect(out[out.length - 1]).toBe(9)
  })

  it('round-trips non-UTF-8 byte strings without external provenance', () => {
    const original = new Uint8Array([0, 255, 128, 65, 66])
    const str = bytesToString(original)

    expect(Array.from(stringToBytes(str))).toEqual(Array.from(original))
    expect(len(str)).toBe(original.length)
    expect(indexString(str, 1)).toBe(255)
    expect(Array.from(stringToBytes(sliceString(str, 1, 4)))).toEqual([
      255, 128, 65,
    ])
  })

  it('copies UTF-8 strings by bytes', () => {
    const dst = new Uint8Array(3)

    expect(copy(dst, goString('你'))).toBe(3)
    expect(Array.from(dst)).toEqual([0xe4, 0xbd, 0xa0])
  })

  it('compares byte-backed string aliases by bytes', () => {
    const peerID = new Uint8Array([0, 255, 65])

    expect(stringEqual(peerID, bytesToString(peerID))).toBe(true)
    expect(stringEqual(peerID, '')).toBe(false)
    expect(stringEqual(new Uint8Array(0), '')).toBe(true)
  })

  it('matches byte-backed strings as map keys', () => {
    const raw = new Uint8Array([10, 36, 8, 1, 18, 32, 222, 187])
    const key = bytesToString(raw)
    const m = makeMap<string, string>()

    mapSet(m, key, 'cached')

    expect(mapGet(m, bytesToString(raw), '')).toEqual(['cached', true])
  })

  it('orders byte-backed strings by Go string bytes', () => {
    expect(
      stringCompare(new Uint8Array([0, 255]), new Uint8Array([1])),
    ).toBeLessThan(0)
    expect(
      stringCompare(new Uint8Array([1]), new Uint8Array([0, 255])),
    ).toBeGreaterThan(0)
    expect(
      stringCompare(new Uint8Array([1, 2]), new Uint8Array([1, 2, 0])),
    ).toBeLessThan(0)
    expect(
      stringCompare(
        bytesToString(new Uint8Array([255])),
        new Uint8Array([255]),
      ),
    ).toBe(0)
  })
})

import { afterEach, describe, expect, test, vi } from 'vitest'

import * as $ from '@goscript/builtin/index.js'
import * as bytes from '@goscript/bytes/index.js'
import * as io from '@goscript/io/index.js'

import {
  BestCompression,
  BestSpeed,
  DefaultCompression,
  ErrHeader,
  HuffmanOnly,
  NewReader,
  NewWriter,
  NewWriterLevel,
  NoCompression,
} from './index.js'

describe('compress/gzip override', () => {
  test('exports flate compression level constants', () => {
    expect(NoCompression).toBe(0)
    expect(BestSpeed).toBe(1)
    expect(BestCompression).toBe(9)
    expect(DefaultCompression).toBe(-1)
    expect(HuffmanOnly).toBe(-2)
  })

  test('rejects invalid compression levels', () => {
    const buf = $.markAsStructValue(new bytes.Buffer())

    expect(NewWriterLevel(buf, HuffmanOnly)[1]).toBeNull()
    expect(NewWriterLevel(buf, BestCompression)[1]).toBeNull()
    expect(NewWriterLevel(buf, HuffmanOnly - 1)[1]?.Error()).toBe(
      'gzip: invalid compression level: -3',
    )
    expect(NewWriterLevel(buf, BestCompression + 1)[1]?.Error()).toBe(
      'gzip: invalid compression level: 10',
    )
  })

  test('round trips bytes through writer and reader', async () => {
    const input = $.stringToBytes('hello gzip world')
    const buf = $.markAsStructValue(new bytes.Buffer())
    const writer = NewWriter(buf)

    const [written, writeErr] = await writer.Write(input)
    expect(writeErr).toBeNull()
    expect(written).toBe(input.length)
    expect(await writer.Close()).toBeNull()

    const [reader, readerErr] = await NewReader(bytes.NewReader(buf.Bytes()))
    expect(readerErr).toBeNull()
    expect(reader).not.toBeNull()

    const [out, readErr] = await io.ReadAll(reader!)
    expect(readErr).toBeNull()
    expect($.bytesToString(out)).toBe('hello gzip world')
  })

  test('writes header names in Latin-1 and reads them back as UTF-8', async () => {
    // A name with a non-ASCII Latin-1 rune is one byte per rune in the header.
    const name = $.goString('café')
    const buf = $.markAsStructValue(new bytes.Buffer())
    const writer = NewWriter(buf)
    writer.Name = name
    writer.Comment = $.goString('ñ')
    expect((await writer.Write($.stringToBytes('x')))[1]).toBeNull()
    expect(await writer.Close()).toBeNull()
    const data = buf.Bytes()!
    const header = $.bytesToUint8Array(data).subarray(10, 17)
    expect(Array.from(header)).toEqual([0x63, 0x61, 0x66, 0xe9, 0, 0xf1, 0])

    // Reading the header decodes the Latin-1 bytes to the same Go strings.
    const [reader, readerErr] = await NewReader(bytes.NewReader(data))
    expect(readerErr).toBeNull()
    expect(reader!.Name).toBe(name)
    expect(reader!.Comment).toBe($.goString('ñ'))
  })

  test('rejects header names that are not Latin-1', async () => {
    // A rune beyond Latin-1 or an invalid UTF-8 byte fails the write.
    for (const name of [$.goString('€'), $.bytesToString(new Uint8Array([0xe9]))]) {
      const writer = NewWriter($.markAsStructValue(new bytes.Buffer()))
      writer.Name = name
      const [, err] = await writer.Write($.stringToBytes('x'))
      expect(err?.Error()).toBe('gzip.Write: non-Latin-1 header string')
    }
  })

  test('reader collects bulk input in chunks', async () => {
    const input = $.makeSlice<number>(128 * 1024, undefined, 'byte')
    let state = 0x12345678
    for (let idx = 0; idx < input.length; idx++) {
      state ^= state << 13
      state ^= state >>> 17
      state ^= state << 5
      $.sliceElems(input)[$.sliceSlot(input, idx)] = state & 0xff
    }

    const compressed = $.markAsStructValue(new bytes.Buffer())
    const writer = NewWriter(compressed)
    expect((await writer.Write(input))[1]).toBeNull()
    expect(await writer.Close()).toBeNull()

    const source = bytes.NewReader(compressed.Bytes())
    let readCalls = 0
    const observedReader = {
      Read(p: $.Bytes): [number, $.GoError] {
        readCalls++
        return source.Read(p)
      },
    }

    const [reader, readerErr] = await NewReader(observedReader as io.Reader)
    expect(readerErr).toBeNull()
    const [out, readErr] = await io.ReadAll(reader!)
    expect(readErr).toBeNull()
    expect($.bytesToUint8Array(out)).toEqual($.bytesToUint8Array(input))
    expect(readCalls).toBeLessThanOrEqual(6)
  })

  test('reader reset accepts async generated readers', async () => {
    const compressed = $.markAsStructValue(new bytes.Buffer())
    const writer = NewWriter(compressed)
    expect((await writer.Write($.stringToBytes('async gzip source')))[1]).toBeNull()
    expect(await writer.Close()).toBeNull()

    const source = bytes.NewReader(compressed.Bytes())
    const asyncReader = {
      async Read(p: $.Bytes): Promise<[number, $.GoError]> {
        await Promise.resolve()
        return source.Read(p)
      },
    }

    const [reader, readerErr] = await NewReader(asyncReader as io.Reader)
    expect(readerErr).toBeNull()
    const [out, readErr] = await io.ReadAll(reader!)
    expect(readErr).toBeNull()
    expect($.bytesToString(out)).toBe('async gzip source')
  })

  test('invalid gzip bytes return ErrHeader', async () => {
    const [reader, err] = await NewReader(bytes.NewReader($.stringToBytes('plain invalid header')))
    expect(reader).toBeNull()
    expect(err).toBe(ErrHeader)
  })

  describe('portable incremental codec', () => {
    afterEach(() => vi.unstubAllGlobals())

    test('round trips owned writer bytes through an async reader', async () => {
      vi.stubGlobal('process', { ...process, getBuiltinModule: undefined })
      const input = new Uint8Array(128 * 1024 + 2)
      let state = 0x12345678
      for (let index = 0; index < input.length; index++) {
        state ^= state << 13
        state ^= state >>> 17
        state ^= state << 5
        input[index] = state & 0xff
      }
      const payload = input.subarray(1, -1)
      const expected = payload.slice()
      const compressed = $.markAsStructValue(new bytes.Buffer())
      const writer = NewWriter(compressed)
      expect((await writer.Write(payload))).toEqual([payload.length, null])
      payload.fill(0)
      expect(await writer.Close()).toBeNull()

      const source = bytes.NewReader(compressed.Bytes())
      const [reader, readerErr] = await NewReader({
        async Read(p: $.Bytes): Promise<[number, $.GoError]> {
          return source.Read(p)
        },
      })
      expect(readerErr).toBeNull()
      const [output, readErr] = await io.ReadAll(reader!)
      expect(readErr).toBeNull()
      expect($.bytesToUint8Array(output)).toEqual(expected)
    })

    test('reports invalid headers consistently without native codec support', async () => {
      vi.stubGlobal('process', { ...process, getBuiltinModule: undefined })
      const [reader, readerErr] = await NewReader(
        bytes.NewReader($.stringToBytes('plain invalid header')),
      )
      expect(reader).toBeNull()
      expect(readerErr).toBe(ErrHeader)
    })
  })
})

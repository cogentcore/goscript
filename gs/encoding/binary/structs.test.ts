import { describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'

import {
  BigEndian,
  Decode,
  Encode,
  LittleEndian,
  Size,
  type ByteOrder,
} from './index.js'
import {
  closureStructPlan,
  generatedStructPlan,
  type layoutShape,
  type structShape,
} from './structs.js'

// vec4Info and vertexInfo describe GPU-like structs: a nested struct, a
// float32 array, 32-bit integers and a blank padding field, plus the other
// fixed-size kinds.
const f32 = { kind: $.TypeKind.Basic, name: 'float32' } as const
const vec4Info: $.StructTypeInfo = {
  kind: $.TypeKind.Struct,
  name: 'Vec4',
  methods: [],
  fields: ['X', 'Y', 'Z', 'W'].map((name) => ({ name, key: name, type: f32 })),
}
const vertexInfo: $.StructTypeInfo = {
  kind: $.TypeKind.Struct,
  name: 'Vertex',
  methods: [],
  fields: [
    {
      name: 'M',
      key: 'M',
      type: { kind: $.TypeKind.Array, length: 20, elemType: f32 },
    },
    { name: 'Color', key: 'Color', type: vec4Info },
    { name: 'I', key: 'I', type: { kind: $.TypeKind.Basic, name: 'int32' } },
    { name: 'U', key: 'U', type: { kind: $.TypeKind.Basic, name: 'uint32' } },
    { name: 'B', key: 'B', type: { kind: $.TypeKind.Basic, name: 'bool' } },
    { name: 'S', key: 'S', type: { kind: $.TypeKind.Basic, name: 'int16' } },
    { name: 'L', key: 'L', type: { kind: $.TypeKind.Basic, name: 'int64' } },
    { name: 'D', key: 'D', type: { kind: $.TypeKind.Basic, name: 'float64' } },
    {
      name: 'C',
      key: 'C',
      type: { kind: $.TypeKind.Basic, name: 'complex64' },
    },
    {
      name: '_',
      key: '_blank9',
      type: {
        kind: $.TypeKind.Array,
        length: 3,
        elemType: { kind: $.TypeKind.Basic, name: 'uint8' },
      },
    },
  ],
}

// vertexSize is the encoded size of a vertex: no padding but the blank field.
const vertexSize = 80 + 16 + 4 + 4 + 1 + 2 + 8 + 8 + 8 + 3

type vertex = {
  M: number[]
  Color: { X: number; Y: number; Z: number; W: number }
  I: number
  U: number
  B: boolean
  S: number
  L: bigint
  D: number
  C: { real: number; imag: number }
  _blank9: number[]
}

function newVertex(i: number): vertex {
  return {
    M: Array.from({ length: 20 }, (_, k) => Math.fround(i + k / 4)),
    Color: { X: i, Y: -i, Z: 0.5, W: 1 },
    I: -i,
    U: 0xffffffff - i,
    B: i % 2 === 1,
    S: -300 - i,
    L: -(2n ** 40n) - BigInt(i),
    D: i / 3,
    C: { real: 1.5, imag: -i },
    _blank9: [7, 7, 7],
  }
}

function zeroVertex(): vertex {
  return {
    M: Array.from({ length: 20 }, () => 0),
    Color: { X: 0, Y: 0, Z: 0, W: 0 },
    I: 0,
    U: 0,
    B: false,
    S: 0,
    L: 0n,
    D: 0,
    C: { real: 0, imag: 0 },
    _blank9: [0, 0, 0],
  }
}

// expectedBytes encodes a vertex field by field with a DataView.
function expectedBytes(v: vertex, little: boolean): number[] {
  const view = new DataView(new ArrayBuffer(vertexSize))
  v.M.forEach((m, k) => view.setFloat32(4 * k, m, little))
  ;[v.Color.X, v.Color.Y, v.Color.Z, v.Color.W].forEach((c, k) =>
    view.setFloat32(80 + 4 * k, c, little),
  )
  view.setInt32(96, v.I, little)
  view.setUint32(100, v.U, little)
  view.setUint8(104, v.B ? 1 : 0)
  view.setInt16(105, v.S, little)
  view.setBigInt64(107, v.L, little)
  view.setFloat64(115, v.D, little)
  view.setFloat32(123, v.C.real, little)
  view.setFloat32(127, v.C.imag, little)
  return Array.from(new Uint8Array(view.buffer))
}

function vertexSlice(values: vertex[]): unknown {
  return $.namedValueInterfaceValue<unknown>(
    $.arrayToSlice(values),
    '[]Vertex',
    {},
    { kind: $.TypeKind.Slice, elemType: vertexInfo },
  )
}

describe('encoding/binary slices of structs', () => {
  it('sizes, encodes and decodes a slice of structs in both orders', () => {
    for (const order of [LittleEndian, BigEndian]) {
      const little = order === LittleEndian
      const values = [newVertex(1), newVertex(2), newVertex(3)]
      expect(Size(vertexSlice(values))).toBe(3 * vertexSize)

      // Encoding writes zeros for the blank field.
      const buf = $.makeSlice<number>(3 * vertexSize + 2, undefined, 'byte')
      $.bytesToUint8Array(buf).fill(9)
      expect(Encode(buf, order, vertexSlice(values))).toEqual([
        3 * vertexSize,
        null,
      ])
      const want = values.flatMap((v) => expectedBytes(v, little))
      const got = Array.from($.bytesToUint8Array(buf))
      expect(got.slice(0, 3 * vertexSize)).toEqual(want)
      expect(got.slice(3 * vertexSize)).toEqual([9, 9])

      // Decoding fills the structs in place and leaves blank fields.
      const out = [zeroVertex(), zeroVertex(), zeroVertex()]
      const nested = out[1].Color
      expect(Decode(buf, order, vertexSlice(out))).toEqual([
        3 * vertexSize,
        null,
      ])
      expect(out[1].Color).toBe(nested)
      const blank = (v: vertex) => ({ ...v, _blank9: [0, 0, 0] })
      expect(out.map(blank)).toEqual(values.map(blank))
    }
  })

  it('encodes a window of a slice of structs', () => {
    const values = [newVertex(1), newVertex(2), newVertex(3), newVertex(4)]
    const window = $.goSlice($.arrayToSlice(values), 1, 3)
    const boxed = $.namedValueInterfaceValue<unknown>(
      window,
      '[]Vertex',
      {},
      {
        kind: $.TypeKind.Slice,
        elemType: vertexInfo,
      },
    )
    const buf = $.makeSlice<number>(2 * vertexSize, undefined, 'byte')
    expect(Encode(buf, LittleEndian, boxed)).toEqual([2 * vertexSize, null])
    expect(Array.from($.bytesToUint8Array(buf))).toEqual([
      ...expectedBytes(values[1], true),
      ...expectedBytes(values[2], true),
    ])
  })

  it('gives the same bytes from generated and closure plans', () => {
    // The bytes encoding/binary writes are the reference.
    const values = [newVertex(5), newVertex(6)]
    const buf = $.makeSlice<number>(2 * vertexSize, undefined, 'byte')
    Encode(buf, LittleEndian, vertexSlice(values))
    const want = Array.from($.bytesToUint8Array(buf))

    // Both plans of the vertex shape encode them and decode them back.
    const shape = vertexShapeOf()
    for (const plan of [
      generatedStructPlan(shape)!,
      closureStructPlan(shape),
    ]) {
      const view = new DataView(new ArrayBuffer(2 * vertexSize))
      plan.encode(view, 0, values, 0, 2, true)
      expect(Array.from(new Uint8Array(view.buffer))).toEqual(want)
      const out = [zeroVertex(), zeroVertex()]
      plan.decode(view, 0, out, 0, 2, true)
      expect(out.map((v) => v.M)).toEqual(values.map((v) => v.M))
      expect(out.map((v) => v.L)).toEqual(values.map((v) => v.L))
    }
  })

  it('encodes and decodes structs field by field in another byte order', () => {
    // A ByteOrder of its own type writes through its methods.
    const order: ByteOrder = {
      Uint16: (b) => LittleEndian.Uint16(b),
      Uint32: (b) => LittleEndian.Uint32(b),
      Uint64: (b) => LittleEndian.Uint64(b),
      PutUint16: (b, v) => LittleEndian.PutUint16(b, v),
      PutUint32: (b, v) => LittleEndian.PutUint32(b, v),
      PutUint64: (b, v) => LittleEndian.PutUint64(b, v),
      String: () => 'custom',
    }
    const values = [newVertex(1), newVertex(2)]
    const buf = $.makeSlice<number>(2 * vertexSize, undefined, 'byte')
    $.bytesToUint8Array(buf).fill(9)
    expect(Encode(buf, order, vertexSlice(values))).toEqual([
      2 * vertexSize,
      null,
    ])
    expect(Array.from($.bytesToUint8Array(buf))).toEqual(
      values.flatMap((v) => expectedBytes(v, true)),
    )

    // Decoding leaves the blank field.
    const out = [zeroVertex(), zeroVertex()]
    expect(Decode(buf, order, vertexSlice(out))).toEqual([2 * vertexSize, null])
    expect(out[1].M).toEqual(values[1].M)
    expect(out[1].Color).toEqual(values[1].Color)
    expect(out[1]._blank9).toEqual([0, 0, 0])
  })

  it('encodes and decodes structs of 32-bit fields through words', () => {
    // A GPU-like struct: a long and a nested array of words, 32-bit integers
    // at their limits, a complex64 and blank padding.
    const u32 = { kind: $.TypeKind.Basic, name: 'uint32' } as const
    const info: $.StructTypeInfo = {
      kind: $.TypeKind.Struct,
      name: 'Words',
      methods: [],
      fields: [
        {
          name: 'M',
          key: 'M',
          type: { kind: $.TypeKind.Array, length: 20, elemType: f32 },
        },
        { name: 'Color', key: 'Color', type: vec4Info },
        {
          name: 'I',
          key: 'I',
          type: { kind: $.TypeKind.Basic, name: 'int32' },
        },
        { name: 'U', key: 'U', type: u32 },
        {
          name: 'C',
          key: 'C',
          type: { kind: $.TypeKind.Basic, name: 'complex64' },
        },
        {
          name: '_',
          key: '_blank5',
          type: { kind: $.TypeKind.Array, length: 2, elemType: u32 },
        },
      ],
    }
    const size = 80 + 16 + 4 + 4 + 8 + 8
    const make = (i: number) => ({
      M: Array.from({ length: 20 }, (_, k) => Math.fround(k - i / 3)),
      Color: { X: i, Y: 0.25, Z: -i, W: 1 },
      I: -0x80000000 + i,
      U: 0xffffffff - i,
      C: { real: Math.fround(i / 7), imag: -1 },
      _blank5: [5, 5],
    })
    const values = [make(1), make(2), make(3)]
    const boxed = (v: unknown[]) =>
      $.namedValueInterfaceValue<unknown>(
        $.arrayToSlice(v),
        '[]Words',
        {},
        {
          kind: $.TypeKind.Slice,
          elemType: info,
        },
      )

    // expected encodes a struct with a DataView.
    const expected = (v: ReturnType<typeof make>, little: boolean) => {
      const view = new DataView(new ArrayBuffer(size))
      const floats = [...v.M, v.Color.X, v.Color.Y, v.Color.Z, v.Color.W]
      floats.forEach((f, k) => view.setFloat32(4 * k, f, little))
      view.setInt32(96, v.I, little)
      view.setUint32(100, v.U, little)
      view.setFloat32(104, v.C.real, little)
      view.setFloat32(108, v.C.imag, little)
      return Array.from(new Uint8Array(view.buffer))
    }

    // Aligned little-endian bytes go through words; unaligned bytes and
    // big-endian order through the DataView; all give the same bytes.
    for (const [order, offset] of [
      [LittleEndian, 0],
      [LittleEndian, 1],
      [BigEndian, 0],
    ] as const) {
      const buf = $.makeSlice<number>(offset + 3 * size, undefined, 'byte')
      $.bytesToUint8Array(buf).fill(9)
      const window = $.goSlice(buf, offset)
      expect(Encode(window, order, boxed(values))).toEqual([3 * size, null])
      const want = values.flatMap((v) => expected(v, order === LittleEndian))
      expect(Array.from($.bytesToUint8Array(window))).toEqual(want)

      // Decoding gives the structs back but their blank fields.
      const out = [make(0), make(0), make(0)]
      out.forEach((v) => (v._blank5 = [0, 0]))
      expect(Decode(window, order, boxed(out))).toEqual([3 * size, null])
      expect(out).toEqual(values.map((v) => ({ ...v, _blank5: [0, 0] })))
    }
  })

  it('sizes an empty slice of structs', () => {
    expect(Size(vertexSlice([]))).toBe(0)
  })
})

// vertexShapeOf returns the shape encoding/binary describes the vertex with.
function vertexShapeOf(): structShape {
  const scalar = (kind: string) => ({ tag: 'scalar', kind }) as const
  const floats = (count: number) =>
    ({ tag: 'array', elem: scalar('float32'), count }) as const
  const field = (key: string, shape: layoutShape, blank = false) => ({
    key,
    blank,
    shape,
  })
  return {
    tag: 'struct',
    fields: [
      field('M', floats(20)),
      field('Color', {
        tag: 'struct',
        fields: ['X', 'Y', 'Z', 'W'].map((k) => field(k, scalar('float32'))),
      }),
      field('I', scalar('int32')),
      field('U', scalar('uint32')),
      field('B', scalar('bool')),
      field('S', scalar('int16')),
      field('L', scalar('int64')),
      field('D', scalar('float64')),
      field('C', { tag: 'complex', elem: 'float32' }),
      field('_blank9', { tag: 'array', elem: scalar('uint8'), count: 3 }, true),
    ],
  }
}

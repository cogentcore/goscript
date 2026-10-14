import * as $ from '@goscript/builtin/index.js'

export function LittleEndian(): boolean {
  return true
}

export function BEUint16(b: $.Bytes): number {
  return ($.arrayIndex(b!, 0) << 8) | $.arrayIndex(b!, 1)
}

export function BEUint32(b: $.Bytes): number {
  return (
    ((($.arrayIndex(b!, 0) << 24) >>> 0) |
      ($.arrayIndex(b!, 1) << 16) |
      ($.arrayIndex(b!, 2) << 8) |
      $.arrayIndex(b!, 3)) >>>
    0
  )
}

export function BEUint64(b: $.Bytes): bigint {
  return BigInt.asUintN(
    64,
    (BigInt($.arrayIndex(b!, 0)) << 56n) |
      (BigInt($.arrayIndex(b!, 1)) << 48n) |
      (BigInt($.arrayIndex(b!, 2)) << 40n) |
      (BigInt($.arrayIndex(b!, 3)) << 32n) |
      (BigInt($.arrayIndex(b!, 4)) << 24n) |
      (BigInt($.arrayIndex(b!, 5)) << 16n) |
      (BigInt($.arrayIndex(b!, 6)) << 8n) |
      BigInt($.arrayIndex(b!, 7)),
  )
}

export function LEUint16(b: $.Bytes): number {
  return $.arrayIndex(b!, 0) | ($.arrayIndex(b!, 1) << 8)
}

export function LEUint32(b: $.Bytes): number {
  return (
    ($.arrayIndex(b!, 0) |
      ($.arrayIndex(b!, 1) << 8) |
      ($.arrayIndex(b!, 2) << 16) |
      ($.arrayIndex(b!, 3) << 24)) >>>
    0
  )
}

export function LEUint64(b: $.Bytes): bigint {
  return BigInt.asUintN(
    64,
    BigInt($.arrayIndex(b!, 0)) |
      (BigInt($.arrayIndex(b!, 1)) << 8n) |
      (BigInt($.arrayIndex(b!, 2)) << 16n) |
      (BigInt($.arrayIndex(b!, 3)) << 24n) |
      (BigInt($.arrayIndex(b!, 4)) << 32n) |
      (BigInt($.arrayIndex(b!, 5)) << 40n) |
      (BigInt($.arrayIndex(b!, 6)) << 48n) |
      (BigInt($.arrayIndex(b!, 7)) << 56n),
  )
}

export function BEPutUint16(b: $.Bytes, v: number): void {
  $.sliceElems(b!)[$.sliceSlot(b!, 0)] = (v >> 8) & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 1)] = v & 0xff
}

export function BEPutUint32(b: $.Bytes, v: number): void {
  $.sliceElems(b!)[$.sliceSlot(b!, 0)] = (v >> 24) & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 1)] = (v >> 16) & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 2)] = (v >> 8) & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 3)] = v & 0xff
}

export function BEPutUint64(b: $.Bytes, v: bigint | number): void {
  const x = BigInt(v) & ((1n << 64n) - 1n)
  $.sliceElems(b!)[$.sliceSlot(b!, 0)] = Number((x >> 56n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 1)] = Number((x >> 48n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 2)] = Number((x >> 40n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 3)] = Number((x >> 32n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 4)] = Number((x >> 24n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 5)] = Number((x >> 16n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 6)] = Number((x >> 8n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 7)] = Number(x & 0xffn)
}

export function LEPutUint16(b: $.Bytes, v: number): void {
  $.sliceElems(b!)[$.sliceSlot(b!, 0)] = v & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 1)] = (v >> 8) & 0xff
}

export function LEPutUint32(b: $.Bytes, v: number): void {
  $.sliceElems(b!)[$.sliceSlot(b!, 0)] = v & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 1)] = (v >> 8) & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 2)] = (v >> 16) & 0xff
  $.sliceElems(b!)[$.sliceSlot(b!, 3)] = (v >> 24) & 0xff
}

export function LEPutUint64(b: $.Bytes, v: bigint | number): void {
  const x = BigInt(v) & ((1n << 64n) - 1n)
  $.sliceElems(b!)[$.sliceSlot(b!, 0)] = Number(x & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 1)] = Number((x >> 8n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 2)] = Number((x >> 16n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 3)] = Number((x >> 24n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 4)] = Number((x >> 32n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 5)] = Number((x >> 40n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 6)] = Number((x >> 48n) & 0xffn)
  $.sliceElems(b!)[$.sliceSlot(b!, 7)] = Number((x >> 56n) & 0xffn)
}

export function BEAppendUint16(b: $.Bytes | null, v: number): $.Bytes {
  return $.append(b, (v >> 8) & 0xff, v & 0xff) as $.Bytes
}

export function BEAppendUint32(b: $.Bytes | null, v: number): $.Bytes {
  return $.append(
    b,
    (v >> 24) & 0xff,
    (v >> 16) & 0xff,
    (v >> 8) & 0xff,
    v & 0xff,
  ) as $.Bytes
}

export function BEAppendUint64(b: $.Bytes | null, v: bigint | number): $.Bytes {
  const x = BigInt(v) & ((1n << 64n) - 1n)
  return $.append(
    b,
    Number((x >> 56n) & 0xffn),
    Number((x >> 48n) & 0xffn),
    Number((x >> 40n) & 0xffn),
    Number((x >> 32n) & 0xffn),
    Number((x >> 24n) & 0xffn),
    Number((x >> 16n) & 0xffn),
    Number((x >> 8n) & 0xffn),
    Number(x & 0xffn),
  ) as $.Bytes
}

export function LEAppendUint16(b: $.Bytes | null, v: number): $.Bytes {
  return $.append(b, v & 0xff, (v >> 8) & 0xff) as $.Bytes
}

export function LEAppendUint32(b: $.Bytes | null, v: number): $.Bytes {
  return $.append(
    b,
    v & 0xff,
    (v >> 8) & 0xff,
    (v >> 16) & 0xff,
    (v >> 24) & 0xff,
  ) as $.Bytes
}

export function LEAppendUint64(b: $.Bytes | null, v: bigint | number): $.Bytes {
  const x = BigInt(v) & ((1n << 64n) - 1n)
  return $.append(
    b,
    Number(x & 0xffn),
    Number((x >> 8n) & 0xffn),
    Number((x >> 16n) & 0xffn),
    Number((x >> 24n) & 0xffn),
    Number((x >> 32n) & 0xffn),
    Number((x >> 40n) & 0xffn),
    Number((x >> 48n) & 0xffn),
    Number((x >> 56n) & 0xffn),
  ) as $.Bytes
}

// Package utf8 implements functions and constants to support text encoded in UTF-8.

import * as $ from '@goscript/builtin/index.js'

// RuneError is the "error" Rune or "Unicode replacement character".
export const RuneError = 0xfffd

// RuneSelf is the maximum rune value that can be represented as a single byte.
export const RuneSelf = 0x80

// MaxRune is the maximum valid Unicode code point.
export const MaxRune = 0x10ffff

// UTFMax is the maximum number of bytes of a UTF-8 encoded Unicode character.
export const UTFMax = 4

// AppendRune appends the UTF-8 encoding of r to the end of p and returns the extended buffer.
export function AppendRune(p: $.Bytes, r: number): Uint8Array {
  const bytes = $.normalizeBytes(p)
  const temp = new Uint8Array(UTFMax)
  const n = EncodeRune(temp, r)
  const result = new Uint8Array(bytes.length + n)
  result.set(bytes)
  result.set(temp.slice(0, n), bytes.length)
  return result
}

// DecodeLastRune unpacks the last UTF-8 encoding in p and returns the rune and its width in bytes.
export function DecodeLastRune(p: $.Bytes): [number, number] {
  return decodeLastRune($.bytesToUint8Array(p))
}

// decodeLastRune implements DecodeLastRune as in Go: it backs up to the
// start of the last rune and decodes it, or returns RuneError with width 1.
function decodeLastRune(bytes: Uint8Array): [number, number] {
  const end = bytes.length
  if (end === 0) {
    return [RuneError, 0]
  }
  let start = end - 1
  if (bytes[start] < RuneSelf) {
    return [bytes[start], 1]
  }
  const lim = Math.max(end - UTFMax, 0)
  for (start--; start >= lim; start--) {
    if (RuneStart(bytes[start])) {
      break
    }
  }
  if (start < 0) {
    start = 0
  }
  const [r, size] = $.decodeRune(bytes.subarray(start, end))
  if (start + size !== end) {
    return [RuneError, 1]
  }
  return [r, size]
}

// DecodeLastRuneInString is like DecodeLastRune but its input is a string.
export function DecodeLastRuneInString(s: string): [number, number] {
  return decodeLastRune($.stringToBytes(s))
}

// DecodeRune unpacks the first UTF-8 encoding in p and returns the rune and its width in bytes.
export function DecodeRune(p: $.Bytes): [number, number] {
  return $.decodeRune($.bytesToUint8Array(p))
}

// DecodeRuneInString is like DecodeRune but its input is a string.
// Also accepts Bytes for Go's []byte to string conversion pattern.
export function DecodeRuneInString(s: string | $.Bytes): [number, number] {
  if (typeof s === 'string' && !$.isByteString(s)) {
    if (s.length === 0) {
      return [RuneError, 0]
    }
    const codePoint = s.codePointAt(0)!
    if (codePoint < RuneSelf) {
      return [codePoint, 1]
    }
    return [codePoint, RuneLen(codePoint)]
  }
  return $.decodeRune($.stringToBytes(s))
}

// EncodeRune writes into p (which must be large enough) the UTF-8 encoding of the rune.
export function EncodeRune(p: Uint8Array | $.Slice<number>, r: number): number {
  if (p === null) return 0

  if (!ValidRune(r)) {
    r = RuneError
  }

  const str = String.fromCodePoint(r)
  const encoder = new TextEncoder()
  const encoded = encoder.encode(str)

  // Handle both Uint8Array and Slice types
  if (p instanceof Uint8Array) {
    for (let i = 0; i < Math.min(encoded.length, p.length); i++) {
      p[i] = encoded[i]
    }
    return Math.min(encoded.length, p.length)
  } else {
    // Handle Slice<number>
    const len = $.len(p!)
    for (let i = 0; i < Math.min(encoded.length, len); i++) {
      ;(p as $.Slice<number>)![i] = encoded[i]
    }
    return Math.min(encoded.length, len)
  }
}

// FullRune reports whether the bytes in p begin with a full UTF-8 encoding of a rune.
// An invalid encoding is considered a full rune, since it converts to a
// width-1 error rune.
export function FullRune(p: $.Bytes): boolean {
  return fullRune($.bytesToUint8Array(p))
}

// fullRune implements FullRune as in Go: only a prefix of a valid encoding
// that is shorter than the encoding's size is not a full rune.
function fullRune(bytes: Uint8Array): boolean {
  const n = bytes.length
  if (n === 0) {
    return false
  }
  const b0 = bytes[0]
  let size = 1
  let lo = 0x80
  let hi = 0xbf
  if (b0 >= 0xc2 && b0 <= 0xdf) {
    size = 2
  } else if (b0 >= 0xe0 && b0 <= 0xef) {
    size = 3
    if (b0 === 0xe0) lo = 0xa0
    else if (b0 === 0xed) hi = 0x9f
  } else if (b0 >= 0xf0 && b0 <= 0xf4) {
    size = 4
    if (b0 === 0xf0) lo = 0x90
    else if (b0 === 0xf4) hi = 0x8f
  }
  if (n >= size) {
    return true
  }
  if (n > 1 && (bytes[1] < lo || bytes[1] > hi)) {
    return true
  }
  if (n > 2 && (bytes[2] < 0x80 || bytes[2] > 0xbf)) {
    return true
  }
  return false
}

// FullRuneInString is like FullRune but its input is a string.
export function FullRuneInString(s: string): boolean {
  return fullRune($.stringToBytes(s))
}

// RuneCount returns the number of runes in p.
export function RuneCount(p: $.Bytes): number {
  return runeCount($.bytesToUint8Array(p))
}

// runeCount counts runes as in Go, where each invalid byte is one rune.
function runeCount(bytes: Uint8Array): number {
  let n = 0
  for (let i = 0; i < bytes.length; n++) {
    i += $.decodeRune(bytes, i)[1]
  }
  return n
}

// RuneCountInString is like RuneCount but its input is a string.
export function RuneCountInString(s: string): number {
  if (!$.isByteString(s)) {
    return [...s].length
  }
  return runeCount($.stringToBytes(s))
}

// RuneLen returns the number of bytes required to encode the rune.
export function RuneLen(r: number): number {
  if (!ValidRune(r)) {
    return -1
  }

  if (r < RuneSelf) {
    return 1
  }

  const str = String.fromCodePoint(r)
  const encoder = new TextEncoder()
  return encoder.encode(str).length
}

// RuneStart reports whether the byte could be the first byte of an encoded, possibly invalid rune.
export function RuneStart(b: number): boolean {
  return (b & 0xc0) !== 0x80
}

// Valid reports whether p consists entirely of valid UTF-8-encoded runes.
export function Valid(p: $.Bytes): boolean {
  return valid($.bytesToUint8Array(p))
}

// valid reports whether every rune of bytes decodes without error.
function valid(bytes: Uint8Array): boolean {
  for (let i = 0; i < bytes.length; ) {
    const [r, size] = $.decodeRune(bytes, i)
    if (r === RuneError && size === 1) {
      return false
    }
    i += size
  }
  return true
}

// ValidRune reports whether r can be legally encoded as UTF-8.
export function ValidRune(r: number): boolean {
  return r >= 0 && r <= MaxRune && !(r >= 0xd800 && r <= 0xdfff)
}

// ValidString reports whether s consists entirely of valid UTF-8-encoded runes.
export function ValidString(s: string): boolean {
  if (!$.isByteString(s)) {
    return true
  }
  return valid($.stringToBytes(s))
}

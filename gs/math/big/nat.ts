// Helpers shared by Int, Rat, and Float: the magnitude of a number is a
// non-negative JavaScript BigInt, and a Word slice is its little-endian
// 64-bit encoding.

import * as $ from '@goscript/builtin/index.js'
import type { ScanState, State } from '@goscript/fmt/index.js'
import { EOF } from '@goscript/io/index.js'

import { MaxBase, type Word } from './mode.js'

const maxSafe = BigInt(Number.MAX_SAFE_INTEGER)
const wordMask = (1n << 64n) - 1n

const errNoDigits = $.newError('number has no digits')
const errInvalSep = $.newError("'_' must separate successive digits")

export function abs(v: bigint): bigint {
  return v < 0n ? -v : v
}

// toWord returns the Word value of a 64-bit magnitude.
function toWord(w: bigint): Word {
  return w <= maxSafe ? Number(w) : w
}

// wordsOf returns the little-endian words of v, which must not be negative.
export function wordsOf(v: bigint): Word[] {
  // Words below 2**53 are numbers; larger ones are read off the hex digits.
  if (v <= maxSafe) {
    return v === 0n ? [] : [Number(v)]
  }
  const hex = v.toString(16)
  const words: Word[] = []
  for (let end = hex.length; end > 0; end -= 16) {
    words.push(toWord(BigInt('0x' + hex.slice(Math.max(0, end - 16), end))))
  }
  return words
}

// fromWords returns the value of the little-endian words.
export function fromWords(words: Word[]): bigint {
  // Join the words, least significant first.
  if (words.length === 0) {
    return 0n
  }
  if (words.length === 1) {
    return BigInt(words[0])
  }
  if (words.length === 2) {
    return (BigInt(words[1]) << 64n) | BigInt(words[0])
  }
  let hex = ''
  for (let i = words.length - 1; i >= 0; i--) {
    hex += BigInt(words[i]).toString(16).padStart(16, '0')
  }
  return BigInt('0x' + hex)
}

// low64 returns the least significant 64 bits of v, which must not be negative.
export function low64(v: bigint): bigint {
  return v & wordMask
}

// bitLen returns the length of v in bits, for v >= 0.
export function bitLen(v: bigint): number {
  if (v === 0n) {
    return 0
  }
  const hex = v.toString(16)
  return (hex.length - 1) * 4 + 32 - Math.clz32(parseInt(hex[0], 16))
}

// trailingZeroBits returns the number of consecutive least significant zero
// bits of v, for v > 0.
export function trailingZeroBits(v: bigint): number {
  // Count the zero bits below the lowest set bit from the hex digits.
  const hex = v.toString(16)
  let i = hex.length - 1
  while (hex[i] === '0') {
    i--
  }
  const digit = parseInt(hex[i], 16)
  return (hex.length - 1 - i) * 4 + (31 - Math.clz32(digit & -digit))
}

// isqrt returns the floor of the square root of v, for v >= 0.
export function isqrt(v: bigint): bigint {
  if (v < 2n) {
    return v
  }
  let r = 1n << BigInt((bitLen(v) + 1) >> 1)
  for (;;) {
    const n = (r + v / r) >> 1n
    if (n >= r) {
      return r
    }
    r = n
  }
}

// modPow returns b**e mod m, for e >= 0 and m > 0.
export function modPow(b: bigint, e: bigint, m: bigint): bigint {
  let result = 1n % m
  b %= m
  for (; e > 0n; e >>= 1n) {
    if (e & 1n) {
      result = (result * b) % m
    }
    b = (b * b) % m
  }
  return result
}

const digits62 =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// utoa returns the representation of v in the given base, for v >= 0.
export function utoa(v: bigint, base: number): string {
  // Bases up to 36 have native formatting; above it the digits include
  // upper case letters.
  if (base < 2 || base > MaxBase) {
    $.panic('invalid base')
  }
  if (base <= 36) {
    return v.toString(base)
  }
  if (v === 0n) {
    return '0'
  }
  const b = BigInt(base)
  let s = ''
  for (; v > 0n; v /= b) {
    s = digits62[Number(v % b)] + s
  }
  return s
}

// ByteReader is the source of a scan, an io.ByteScanner. read returns the next
// byte, or -1 with err set at the end of the input or on an error.
export interface ByteReader {
  err: $.GoError | null
  read(): number
  unread(): void
}

// StringReader reads the bytes of a string, as Go's strings.Reader does: a
// string with non-ASCII text reads as its UTF-8 bytes.
export class StringReader implements ByteReader {
  public err: $.GoError | null = null
  private pos = 0
  private readonly s: string

  constructor(s: string) {
    this.s =
      /[^\0-\x7f]/.test(s) ?
        Array.from(new TextEncoder().encode(s), (b) =>
          String.fromCharCode(b),
        ).join('')
      : s
  }

  public read(): number {
    if (this.pos >= this.s.length) {
      this.err = EOF
      return -1
    }
    return this.s.charCodeAt(this.pos++)
  }

  public unread(): void {
    this.pos--
  }

  // consumed reports whether the whole string has been read.
  public consumed(): boolean {
    return this.pos >= this.s.length
  }
}

interface ScanResult {
  mant: bigint
  base: number
  count: number
  err: $.GoError | null
}

// scanNat scans an unsigned number, as (big.nat).scan does: the longest
// prefix of r that is a number in the given base (0 or 2 through MaxBase; 0
// selects the base by the prefix and allows '_'). With fracOk, a '.' may
// separate a fraction, and count is the negated number of fraction digits.
export function scanNat(
  r: ByteReader,
  base: number,
  fracOk: boolean,
): ScanResult {
  // Reject a base the scan does not support.
  const baseOk =
    base === 0 ||
    (!fracOk && base >= 2 && base <= MaxBase) ||
    (fracOk && (base === 2 || base === 8 || base === 10 || base === 16))
  if (!baseOk) {
    $.panic('invalid number base ' + base)
  }

  // Scanning state: the previous character class tells where a separator
  // may follow.
  const zero = 48 // '0'
  let prev = 46 // '.'
  let invalSep = false
  let count = 0
  let ch = r.read()

  // A base of 0 reads the base from a 0b, 0o or 0x prefix, and 0 alone is a
  // decimal digit.
  let b = base
  let prefix = 0
  if (base === 0) {
    b = 10
    if (ch === zero) {
      prev = zero
      count = 1
      ch = r.read()
      if (ch >= 0) {
        switch (ch) {
          case 98: // 'b'
          case 66: // 'B'
            b = 2
            prefix = 98
            break
          case 111: // 'o'
          case 79: // 'O'
            b = 8
            prefix = 111
            break
          case 120: // 'x'
          case 88: // 'X'
            b = 16
            prefix = 120
            break
          default:
            if (!fracOk) {
              b = 8
              prefix = zero
            }
        }
        if (prefix !== 0) {
          // The prefix is not counted.
          count = 0
          if (prefix !== zero) {
            ch = r.read()
          }
        }
      }
    }
  }

  // Digits accumulate in a number until it holds the most that fits in 53
  // bits, and then fold into the mantissa.
  let chunk = 1
  let n = 0
  while (chunk * b <= Number.MAX_SAFE_INTEGER) {
    chunk *= b
    n++
  }

  // Scan the digits, folding each full chunk into the mantissa.
  const chunkBig = BigInt(chunk)
  let mant = 0n
  let di = 0
  let i = 0
  let dp = -1
  while (ch >= 0) {
    if (ch === 46 && fracOk) {
      fracOk = false
      if (prev === 95) {
        invalSep = true
      }
      prev = 46
      dp = count
    } else if (ch === 95 && base === 0) {
      if (prev !== zero) {
        invalSep = true
      }
      prev = 95
    } else {
      let d1: number
      if (ch >= 48 && ch <= 57) {
        d1 = ch - 48
      } else if (ch >= 97 && ch <= 122) {
        d1 = ch - 97 + 10
      } else if (ch >= 65 && ch <= 90) {
        d1 = ch - 65 + (b <= 36 ? 10 : 36)
      } else {
        d1 = MaxBase + 1
      }
      if (d1 >= b) {
        // ch does not belong to the number anymore.
        r.unread()
        break
      }
      prev = zero
      count++

      di = di * b + d1
      i++
      if (i === n) {
        mant = mant * chunkBig + BigInt(di)
        di = 0
        i = 0
      }
    }
    ch = r.read()
  }

  // Report a read error, or a separator that does not sit between digits.
  let err: $.GoError | null = null
  if (ch < 0 && r.err !== EOF) {
    err = r.err
  }
  if (err === null && (invalSep || prev === 95)) {
    err = errInvalSep
  }

  // A number with no digits is an error, unless a lone 0 prefix was read.
  if (count === 0) {
    if (prefix === zero) {
      return { mant: 0n, base: 10, count: 1, err }
    }
    err = errNoDigits
  }

  // Fold the digits left in the chunk and count the fraction digits.
  if (i > 0) {
    mant = mant * BigInt(b ** i) + BigInt(di)
  }
  if (dp >= 0) {
    count = dp - count
  }
  return { mant, base: b, count, err }
}

// scanSign reads an optional sign, returning whether the number is negative,
// or the error that ended the input.
export function scanSign(r: ByteReader): [boolean, $.GoError | null] {
  // An optional sign; anything else is left to the number.
  const ch = r.read()
  if (ch < 0) {
    return [false, r.err]
  }
  if (ch === 45) {
    return [true, null]
  }
  if (ch !== 43) {
    r.unread()
  }
  return [false, null]
}

const int64Min = -(1n << 63n)
const int64Max = (1n << 63n) - 1n

// scanExponent scans an optional exponent: 'e' or 'E' for a decimal exponent
// and, with base2ok, 'p' or 'P' for a binary one, followed by a signed
// decimal number. The exponent is 0 and the base 10 when r holds no exponent.
// With sepOk the digits may be separated by '_'.
export function scanExponent(
  r: ByteReader,
  base2ok: boolean,
  sepOk: boolean,
): [bigint, number, $.GoError | null] {
  // An empty input has no exponent.
  let ch = r.read()
  if (ch < 0) {
    return [0n, 10, r.err === EOF ? null : r.err]
  }

  // Choose the exponent base from its marker.
  let base = 10
  if (ch === 112 || ch === 80) {
    if (!base2ok) {
      r.unread()
      return [0n, 10, null]
    }
    base = 2
  } else if (ch !== 101 && ch !== 69) {
    r.unread()
    return [0n, 10, null]
  }

  // Read the optional sign of the exponent.
  let digits = ''
  ch = r.read()
  if (ch === 43 || ch === 45) {
    if (ch === 45) {
      digits = '-'
    }
    ch = r.read()
  }

  // Collect the decimal digits, allowing separators between them.
  let prev = 46 // '.'
  let invalSep = false
  let hasDigits = false
  while (ch >= 0) {
    if (ch >= 48 && ch <= 57) {
      digits += String.fromCharCode(ch)
      prev = 48
      hasDigits = true
    } else if (ch === 95 && sepOk) {
      if (prev !== 48) {
        invalSep = true
      }
      prev = 95
    } else {
      r.unread()
      break
    }
    ch = r.read()
  }

  // Parse the digits as an int64 and report any scan error.
  let err: $.GoError | null = null
  if (ch < 0 && r.err !== EOF) {
    err = r.err
  }
  if (err === null && !hasDigits) {
    err = errNoDigits
  }
  let exp = 0n
  if (err === null) {
    exp = BigInt(digits)
    if (exp < int64Min || exp > int64Max) {
      exp = 0n
      err = $.newError(
        'strconv.ParseInt: parsing "' + digits + '": value out of range',
      )
    }
  }
  if (err === null && (invalSep || prev === 95)) {
    err = errInvalSep
  }
  return [exp, base, err]
}

// gcd returns the greatest common divisor of a and b, for a, b >= 0.
export function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    ;[a, b] = [b, a % b]
  }
  return a
}

// bytesOf returns the big-endian bytes of v, which must not be negative.
export function bytesOf(v: bigint): Uint8Array {
  // Zero has no bytes.
  if (v === 0n) {
    return new Uint8Array(0)
  }

  // Pad the hex digits to whole bytes and read them pairwise.
  let hex = v.toString(16)
  if (hex.length % 2 === 1) {
    hex = '0' + hex
  }
  const out = new Uint8Array(hex.length / 2)
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(2 * i, 2 * i + 2), 16)
  }
  return out
}

// valueOfBytes returns the number with the given big-endian bytes.
export function valueOfBytes(buf: $.Slice<number>): bigint {
  const bytes = $.bytesToUint8Array(buf)
  let hex = ''
  for (const b of bytes) {
    hex += b.toString(16).padStart(2, '0')
  }
  return hex === '' ? 0n : BigInt('0x' + hex)
}

// quoteText returns text as a quoted string, for the %q of an error message.
export function quoteText(text: $.Slice<number>): string {
  return JSON.stringify($.bytesToString(text))
}

// writeString writes text to the state of a Format call.
export function writeString(s: State, text: string): void {
  s.Write($.stringToBytes(text))
}

// ScanReader adapts the state of a fmt scan to the bytes of a number.
export class ScanReader implements ByteReader {
  public err: $.GoError | null = null

  constructor(private readonly s: ScanState) {}

  public read(): number {
    const [ch, size, err] = this.s.ReadRune()
    if (err !== null) {
      this.err = err
      return -1
    }
    if (size !== 1) {
      this.err = $.newError('invalid rune U+' + ch.toString(16).toUpperCase())
      return -1
    }
    return ch
  }

  public unread(): void {
    this.s.UnreadRune()
  }
}

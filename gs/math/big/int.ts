import * as $ from '@goscript/builtin/index.js'
import type { ScanState, State } from '@goscript/fmt/index.js'

import {
  Above,
  Below,
  Ceil,
  Exact,
  Floor,
  Round,
  Trunc,
  type Accuracy,
  type RoundingMode,
  type Word,
} from './mode.js'
import {
  abs,
  bitLen,
  bytesOf,
  fromWords,
  isqrt,
  low64,
  modPow,
  quoteText,
  scanNat,
  ScanReader,
  scanSign,
  StringReader,
  trailingZeroBits,
  utoa,
  valueOfBytes,
  wordsOf,
  writeString,
  type ByteReader,
} from './nat.js'
import { jacobi, probablyPrime } from './prime.js'

const divisionByZero = 'division by zero'

// IntRef is a *Int argument: the compiler passes the address of a variable
// as a variable reference.
export type IntRef = Int | $.VarRef<Int> | null

// intOf returns the Int a pointer argument points to, and panics on nil.
export function intOf(x: IntRef): Int {
  return $.pointerValue<Int>(x)
}

// euclid returns the quotient and the non-negative remainder of x / y.
function euclid(x: bigint, y: bigint): [bigint, bigint] {
  // Truncated division leaves a remainder with the sign of x; move it into
  // [0, |y|) and adjust the quotient to match.
  if (y === 0n) {
    $.panic(divisionByZero)
  }
  let q = x / y
  let r = x % y
  if (r < 0n) {
    if (y > 0n) {
      q -= 1n
      r += y
    } else {
      q += 1n
      r -= y
    }
  }
  return [q, r]
}

// gcd returns g = GCD(a, b) and the cofactors x and y with a*x + b*y = g, with
// the cofactors of math/big's Int.GCD. The cofactors are those of Euclid's
// algorithm on |a| and |b|; a zero input selects the trivial cofactors.
function gcd(a: bigint, b: bigint): [bigint, bigint, bigint] {
  // A zero operand makes the other the divisor, with cofactors of its sign.
  if (a === 0n || b === 0n) {
    const g = abs(a === 0n ? b : a)
    return [
      g,
      a === 0n ? 0n
      : a < 0n ? -1n
      : 1n,
      b === 0n ? 0n
      : b < 0n ? -1n
      : 1n,
    ]
  }

  // Run Euclid's algorithm on the magnitudes, larger first, tracking the
  // cofactor of the first operand.
  let A = abs(a)
  let B = abs(b)
  let ua = 1n
  let ub = 0n
  if (A < B) {
    ;[A, B] = [B, A]
    ;[ua, ub] = [ub, ua]
  }
  while (B !== 0n) {
    const q = A / B
    ;[A, B] = [B, A - q * B]
    ;[ua, ub] = [ub, ua - q * ub]
  }

  // Give the cofactor of a its sign and solve for the cofactor of b.
  const x = a < 0n ? -ua : ua
  const y = (A - abs(a) * ua) / b
  return [A, x, y]
}

// modInverse returns the inverse of g modulo |n|, or null if there is none.
function modInverse(g: bigint, n: bigint): bigint | null {
  // Reduce g into [0, n) and invert it through the extended GCD cofactor.
  n = abs(n)
  if (g < 0n) {
    g = euclid(g, n)[1]
  }
  const [d, x] = gcd(g, n)
  if (d !== 1n) {
    return null
  }
  return x < 0n ? x + n : x
}

// An Int represents a signed multi-precision integer. The zero value for an
// Int represents the value 0.
//
// The value is a JavaScript bigint; the words of Bits and SetBits are derived
// from it. Bits writes the words into the slice SetBits last stored when they
// fit, so that a caller which points an Int at its own storage with SetBits
// finds a result of the same size there, as with Go's math/big.
export class Int {
  public _v: bigint = 0n

  // _bits is the slice SetBits stored, and the storage Bits reuses.
  private _bits: $.Slice<Word> | null = null

  // _dirty reports that _v has changed since the words were last written to
  // _bits.
  private _dirty: boolean = false

  // __typeInfo registers Int with the runtime type system (see below).
  static __typeInfo: $.StructTypeInfo

  constructor(_init?: Partial<{}>, _isArrayElement?: boolean) {}

  public clone(): Int {
    return new Int().__goscriptAssign(this)
  }

  public __goscriptAssign(src: Int): Int {
    this._v = intOf(src)._v
    this._bits = null
    this._dirty = true
    return this
  }

  // neg is the sign of the value. apd reads and sets it through unsafe.
  public get neg(): boolean {
    return this._v < 0n
  }

  public set neg(neg: boolean) {
    this._v = neg ? -abs(this._v) : abs(this._v)
  }

  public put(v: bigint): Int {
    this._v = v
    this._dirty = true
    return this
  }

  // Sign returns -1 for x < 0, 0 for x == 0, and +1 for x > 0.
  public Sign(): number {
    const v = this._v
    return (
      v === 0n ? 0
      : v < 0n ? -1
      : 1
    )
  }

  // SetInt64 sets z to x and returns z.
  public SetInt64(x: bigint): Int {
    this.put(BigInt.asIntN(64, x))
    return this
  }

  // SetUint64 sets z to x and returns z.
  public SetUint64(x: number | bigint): Int {
    this.put(BigInt.asUintN(64, BigInt(x)))
    return this
  }

  // Set sets z to x and returns z.
  public Set(x: IntRef): Int {
    this.put(intOf(x)._v)
    return this
  }

  // Bits provides raw (unchecked but fast) access to the absolute value of x
  // as a little-endian Word slice.
  public Bits(): $.Slice<Word> {
    // Hand out the cached slice while it fits, refreshed after a write;
    // otherwise cache a new one.
    const words = wordsOf(abs(this._v))
    if (this._bits !== null && $.cap(this._bits) >= words.length) {
      if (this._dirty) {
        this._bits = $.goSlice(this._bits, 0, words.length)
        $.copy(this._bits, words)
        this._dirty = false
      }
      return this._bits
    }
    this._bits = words.length === 0 ? null : $.arrayToSlice(words)
    this._dirty = false
    return this._bits
  }

  // SetBits provides raw (unchecked but fast) access to z by setting its value
  // to abs, interpreted as a little-endian Word slice, and returning z.
  public SetBits(abs: $.Slice<Word>): Int {
    // Trim the leading zero words and adopt the slice as the backing array.
    let n = $.len(abs)
    while (n > 0 && Number($.arrayIndex(abs, n - 1)) === 0) {
      n--
    }
    const words: Word[] = []
    for (let i = 0; i < n; i++) {
      words.push($.arrayIndex(abs, i))
    }
    this._v = fromWords(words)
    this._bits = abs === null ? null : $.goSlice(abs, 0, n)
    this._dirty = false
    return this
  }

  // Abs sets z to |x| (the absolute value of x) and returns z.
  public Abs(x: IntRef): Int {
    this.put(abs(intOf(x)._v))
    return this
  }

  // Neg sets z to -x and returns z.
  public Neg(x: IntRef): Int {
    this.put(-intOf(x)._v)
    return this
  }

  // Add sets z to the sum x+y and returns z.
  public Add(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v + intOf(y)._v)
    return this
  }

  // Sub sets z to the difference x-y and returns z.
  public Sub(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v - intOf(y)._v)
    return this
  }

  // Mul sets z to the product x*y and returns z.
  public Mul(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v * intOf(y)._v)
    return this
  }

  // MulRange sets z to the product of all integers in the range [a, b]
  // inclusively and returns z. If a > b (empty range), the result is 1.
  public MulRange(a: bigint, b: bigint): Int {
    let v = 1n
    if (a <= b) {
      if (a <= 0n && b >= 0n) {
        v = 0n
      } else {
        for (let i = a; i <= b; i++) {
          v *= i
        }
      }
    }
    this.put(v)
    return this
  }

  // Binomial sets z to the binomial coefficient C(n, k) and returns z.
  public Binomial(n: bigint, k: bigint): Int {
    // Zero outside 0 <= k <= n; otherwise divide two range products, using
    // the smaller of k and n-k.
    if (k < 0n || k > n) {
      return this.SetInt64(0n)
    }
    if (k > n - k) {
      k = n - k
    }
    const a = new Int().MulRange(n - k + 1n, n)
    const b = new Int().MulRange(1n, k)
    return this.Quo(a, b)
  }

  // Quo sets z to the quotient x/y for y != 0 and returns z. Quo implements
  // truncated division (like Go).
  public Quo(x: IntRef, y: IntRef): Int {
    const d = intOf(y)._v
    if (d === 0n) {
      $.panic(divisionByZero)
    }
    this.put(intOf(x)._v / d)
    return this
  }

  // Rem sets z to the remainder x%y for y != 0 and returns z. Rem implements
  // truncated modulus (like Go).
  public Rem(x: IntRef, y: IntRef): Int {
    const d = intOf(y)._v
    if (d === 0n) {
      $.panic(divisionByZero)
    }
    this.put(intOf(x)._v % d)
    return this
  }

  // QuoRem sets z to the quotient x/y and r to the remainder x%y and returns
  // the pair (z, r) for y != 0.
  public QuoRem(x: IntRef, y: IntRef, r: IntRef): [Int, Int] {
    // Truncate the quotient and write the remainder through r.
    const a = intOf(x)._v
    const d = intOf(y)._v
    if (d === 0n) {
      $.panic(divisionByZero)
    }
    this.put(a / d)
    intOf(r).put(a % d)
    return [this, intOf(r)]
  }

  // Div sets z to the quotient x/y for y != 0 and returns z. Div implements
  // Euclidean division.
  public Div(x: IntRef, y: IntRef): Int {
    this.put(euclid(intOf(x)._v, intOf(y)._v)[0])
    return this
  }

  // Mod sets z to the modulus x%y for y != 0 and returns z. Mod implements
  // Euclidean modulus.
  public Mod(x: IntRef, y: IntRef): Int {
    this.put(euclid(intOf(x)._v, intOf(y)._v)[1])
    return this
  }

  // DivMod sets z to the quotient x div y and m to the modulus x mod y and
  // returns the pair (z, m) for y != 0. DivMod implements Euclidean division
  // and modulus.
  public DivMod(x: IntRef, y: IntRef, m: IntRef): [Int, Int] {
    const [q, r] = euclid(intOf(x)._v, intOf(y)._v)
    this.put(q)
    intOf(m).put(r)
    return [this, intOf(m)]
  }

  // Divide computes the integer quotient q = f(x/y) and the remainder
  // r = x - y*q, where f is described by the rounding mode, which must be one
  // of Trunc, Floor, Round, or Ceil. Divide sets z to q, updates r if r != nil,
  // and returns the pair (z, r). Unlike math/big, z cannot be nil.
  public Divide(
    x: IntRef,
    y: IntRef,
    r: IntRef,
    mode: RoundingMode,
  ): [Int, Int | null] {
    // Read the operands and reject a zero divisor.
    const a = intOf(x)._v
    const d = intOf(y)._v
    if (d === 0n) {
      $.panic(divisionByZero)
    }

    // Truncate, then adjust the quotient by the mode when the division is
    // inexact.
    let q = a / d
    const rem = a % d
    if (rem !== 0n) {
      const neg = a < 0n !== d < 0n
      switch (mode) {
        case Trunc:
          break
        case Floor:
          if (neg) {
            q -= 1n
          }
          break
        case Ceil:
          if (!neg) {
            q += 1n
          }
          break
        case Round: {
          const twice = 2n * abs(rem)
          const dd = abs(d)
          if (twice > dd || (twice === dd && (q & 1n) !== 0n)) {
            q += neg ? -1n : 1n
          }
          break
        }
        default:
          $.panic('unsupported rounding mode')
      }
    }

    // Store the quotient and the remainder it implies.
    this.put(q)
    if (r === null) {
      return [this, null]
    }
    intOf(r).put(a - d * q)
    return [this, intOf(r)]
  }

  // Cmp compares x and y and returns -1 if x < y, 0 if x == y, and +1 if
  // x > y.
  public Cmp(y: IntRef): number {
    const a = this._v
    const b = intOf(y)._v
    return (
      a < b ? -1
      : a > b ? 1
      : 0
    )
  }

  // CmpAbs compares the absolute values of x and y.
  public CmpAbs(y: IntRef): number {
    const a = abs(this._v)
    const b = abs(intOf(y)._v)
    return (
      a < b ? -1
      : a > b ? 1
      : 0
    )
  }

  // Int64 returns the int64 representation of x. If x cannot be represented in
  // an int64, the result is undefined.
  public Int64(): bigint {
    return BigInt.asIntN(64, this._v)
  }

  // Uint64 returns the uint64 representation of x. If x cannot be represented
  // in a uint64, the result is undefined.
  public Uint64(): bigint {
    return low64(abs(this._v))
  }

  // IsInt64 reports whether x can be represented as an int64.
  public IsInt64(): boolean {
    const v = this._v
    return v === BigInt.asIntN(64, v)
  }

  // IsUint64 reports whether x can be represented as a uint64.
  public IsUint64(): boolean {
    const v = this._v
    return v === BigInt.asUintN(64, v)
  }

  // Float64 returns the float64 value nearest x, and an indication of any
  // rounding that occurred.
  public Float64(): [number, Accuracy] {
    // Convert through Number and compare its exact value with v to report
    // the direction of the rounding.
    const v = this._v
    const f = Number(v)
    if (!Number.isFinite(f)) {
      return [f, v < 0n ? Below : Above]
    }
    const exact = BigInt(f)
    return [
      f,
      exact === v ? Exact
      : exact > v ? Above
      : Below,
    ]
  }

  // BitLen returns the length of the absolute value of x in bits. The bit
  // length of 0 is 0.
  public BitLen(): number {
    return bitLen(abs(this._v))
  }

  // TrailingZeroBits returns the number of consecutive least significant zero
  // bits of |x|.
  public TrailingZeroBits(): number {
    const v = abs(this._v)
    return v === 0n ? 0 : trailingZeroBits(v)
  }

  // Exp sets z = x**y mod |m| (i.e. the sign of m is ignored), and returns z.
  // If m == nil or m == 0, z = x**y unless y <= 0 then z = 1. If m != 0,
  // y < 0, and x and m are not relatively prime, z is unchanged and nil is
  // returned.
  public Exp(x: IntRef, y: IntRef, m: IntRef): Int | null {
    // Read the operands; a nil modulus means no reduction.
    const xv = intOf(x)._v
    const yv = intOf(y)._v
    const mod = m === null ? 0n : abs(intOf(m)._v)

    // A negative exponent inverts the base modulo m, and has no result
    // without m.
    let base = abs(xv)
    if (yv < 0n) {
      if (mod === 0n) {
        return this.SetInt64(1n)
      }
      const inverse = modInverse(xv, mod)
      if (inverse === null) {
        return null
      }
      base = inverse
    }

    // Raise the base to the magnitude of the exponent, reduced when there is
    // a modulus.
    const e = abs(yv)
    let r: bigint
    if (mod === 0n) {
      r = base ** e
    } else {
      r = modPow(base, e, mod)
    }

    // A negative base with an odd exponent negates the result, within the
    // modulus when there is one.
    const neg = r > 0n && xv < 0n && (e & 1n) === 1n
    if (neg && mod !== 0n) {
      r = mod - r
    } else if (neg) {
      r = -r
    }
    this.put(r)
    return this
  }

  // GCD sets z to the greatest common divisor of a and b and returns z. a and
  // b may be positive, zero or negative; the result is always non-negative.
  // If x or y are not nil, GCD sets their value such that z = a*x + b*y.
  public GCD(x: IntRef, y: IntRef, a: IntRef, b: IntRef): Int {
    // Compute the divisor and store the cofactors the caller asked for.
    const [g, cx, cy] = gcd(intOf(a)._v, intOf(b)._v)
    if (x !== null) {
      intOf(x).put(cx)
    }
    if (y !== null) {
      intOf(y).put(cy)
    }
    this.put(g)
    return this
  }

  // ModInverse sets z to the multiplicative inverse of g in the ring ℤ/nℤ and
  // returns z. If g and n are not relatively prime, g has no multiplicative
  // inverse in the ring ℤ/nℤ. In this case, z is unchanged and the return
  // value is nil. If n == 0, a division-by-zero run-time panic occurs.
  public ModInverse(g: IntRef, n: IntRef): Int | null {
    const inverse = modInverse(intOf(g)._v, intOf(n)._v)
    if (inverse === null) {
      return null
    }
    this.put(inverse)
    return this
  }

  // ModSqrt sets z to a square root of x mod p if such a square root exists,
  // and returns z. The modulus p must be an odd prime. If x is not a square
  // mod p, ModSqrt leaves z unchanged and returns nil. If the modulus p is not
  // an odd prime, the function panics or returns an incorrect result.
  public ModSqrt(x: IntRef, p: IntRef): Int | null {
    // A non-residue has no root, and zero is its own root.
    const xv = intOf(x)._v
    const pv = intOf(p)._v
    switch (jacobiOf(xv, pv)) {
      case -1:
        return null
      case 0:
        return this.SetInt64(0n)
    }

    // Reduce x into [0, p) and pick the algorithm by the residue of p.
    const xm = xv < 0n || xv >= pv ? euclid(xv, pv)[1] : xv
    let r: bigint
    if (pv % 4n === 3n) {
      r = modPow(xm, (pv + 1n) >> 2n, pv)
    } else if (pv % 8n === 5n) {
      r = modSqrt5Mod8Prime(xm, pv)
    } else {
      r = modSqrtTonelliShanks(xm, pv)
    }
    this.put(r)
    return this
  }

  // Lsh sets z = x << n and returns z.
  public Lsh(x: IntRef, n: number): Int {
    this.put(intOf(x)._v << BigInt(n))
    return this
  }

  // Rsh sets z = x >> n and returns z.
  public Rsh(x: IntRef, n: number): Int {
    this.put(intOf(x)._v >> BigInt(n))
    return this
  }

  // Bit returns the value of the i'th bit of x. That is, it returns
  // (x>>i)&1. The bit index i must be >= 0.
  public Bit(i: number): number {
    if (i < 0) {
      $.panic('negative bit index')
    }
    return Number((this._v >> BigInt(i)) & 1n)
  }

  // SetBit sets z to x, with x's i'th bit set to b (0 or 1) and returns z.
  public SetBit(x: IntRef, i: number, b: number): Int {
    // Check the index and the bit, then set or clear the bit of x.
    if (i < 0) {
      $.panic('negative bit index')
    }
    if (b !== 0 && b !== 1) {
      $.panic('set bit is not 0 or 1')
    }
    const mask = 1n << BigInt(i)
    const v = intOf(x)._v
    this.put(b === 1 ? v | mask : v & ~mask)
    return this
  }

  // And sets z = x & y and returns z.
  public And(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v & intOf(y)._v)
    return this
  }

  // AndNot sets z = x &^ y and returns z.
  public AndNot(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v & ~intOf(y)._v)
    return this
  }

  // Or sets z = x | y and returns z.
  public Or(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v | intOf(y)._v)
    return this
  }

  // Xor sets z = x ^ y and returns z.
  public Xor(x: IntRef, y: IntRef): Int {
    this.put(intOf(x)._v ^ intOf(y)._v)
    return this
  }

  // Not sets z = ^x and returns z.
  public Not(x: IntRef): Int {
    this.put(~intOf(x)._v)
    return this
  }

  // Sqrt sets z to ⌊√x⌋, the largest integer such that z² ≤ x, and returns z.
  // It panics if x is negative.
  public Sqrt(x: IntRef): Int {
    const v = intOf(x)._v
    if (v < 0n) {
      $.panic('square root of negative number')
    }
    this.put(isqrt(v))
    return this
  }

  // ProbablyPrime reports whether x is probably prime, applying the
  // Miller-Rabin test with n pseudorandomly chosen bases as well as a
  // Baillie-PSW test. The bases are fixed, not pseudorandom.
  public ProbablyPrime(n: number): boolean {
    if (n < 0) {
      $.panic('negative n for ProbablyPrime')
    }
    return probablyPrime(this._v, n)
  }

  // Rand sets z to a pseudo-random number in [0, n) and returns z. rnd is a
  // *rand.Rand, of which Rand uses Uint32.
  public Rand(rnd: { Uint32(): number }, n: IntRef): Int {
    // A limit of zero or less gives zero.
    const limit = intOf(n)._v
    if (limit <= 0n) {
      this.put(0n)
      return this
    }

    // Each word comes from two draws, the low half first, and the excess
    // bits of the top word are masked off.
    const bits = bitLen(limit)
    const mask = (1n << BigInt(bits)) - 1n
    for (;;) {
      let v = 0n
      for (let i = 0; i < Math.ceil(bits / 64); i++) {
        const lo = BigInt(rnd.Uint32())
        const hi = BigInt(rnd.Uint32())
        v |= (lo | (hi << 32n)) << BigInt(64 * i)
      }
      v &= mask
      if (v < limit) {
        this.put(v)
        return this
      }
    }
  }

  // Bytes returns the absolute value of x as a big-endian byte slice.
  public Bytes(): Uint8Array {
    return bytesOf(abs(this._v))
  }

  // SetBytes interprets buf as the bytes of a big-endian unsigned integer, sets
  // z to that value, and returns z.
  public SetBytes(buf: $.Slice<number>): Int {
    this.put(valueOfBytes(buf))
    return this
  }

  // FillBytes sets buf to the absolute value of x, storing it as a zero-extended
  // big-endian byte slice, and returns buf. If the absolute value of x does
  // not fit in buf, FillBytes will panic.
  public FillBytes(buf: $.Slice<number>): $.Slice<number> {
    // Right-align the magnitude in the buffer, padded with zeros on the left.
    const bytes = bytesOf(abs(this._v))
    const n = $.len(buf)
    if (bytes.length > n) {
      $.panic('math/big: buffer too small to fit value')
    }
    const out = new Uint8Array(n)
    out.set(bytes, n - bytes.length)
    $.copy(buf, out)
    return buf
  }

  // SetString sets z to the value of s, interpreted in the given base, and
  // returns z and a boolean indicating success. The entire string, not just a
  // prefix, must be valid for success. If SetString fails, the value of z is
  // undefined but the returned value is nil.
  public SetString(s: string, base: number): [Int | null, boolean] {
    const r = new StringReader(s)
    const [z] = scanInt(this, r, base)
    if (z === null || !r.consumed()) {
      return [null, false]
    }
    return [this, true]
  }

  // Text returns the string representation of x in the given base. Base must be
  // between 2 and 62, inclusive. The result uses the lower-case letters 'a' to
  // 'z' for digit values 10 to 35, and the upper-case letters 'A' to 'Z' for
  // digit values 36 to 61. No prefix (such as "0x") is added to the string. If
  // x is a nil pointer it returns "<nil>".
  public Text(base: number): string {
    return textOf(this, base)
  }

  // Append appends the string representation of x, as returned by x.Text(base),
  // to buf and returns the extended buffer.
  public Append(buf: $.Slice<number>, base: number): $.Slice<number> {
    return $.appendSlice(buf, $.stringToBytes(textOf(this, base)))
  }

  // String returns the decimal representation of x as generated by
  // x.Text(10).
  public String(): string {
    return textOf(this, 10)
  }

  // Format implements fmt.Formatter. It accepts the formats 'b' (binary), 'o'
  // (octal with 0 prefix), 'O' (octal with 0o prefix), 'd' (decimal), 'x'
  // (lowercase hexadecimal), and 'X' (uppercase hexadecimal). Also supported
  // are the full suite of package fmt's format flags for integral types,
  // including '+' and ' ' for sign control, '#' for leading zero in octal and
  // for hexadecimal, a leading "0x" or "0X" for "%#x" and "%#X" respectively,
  // specification of minimum digits precision, output field width, space or
  // zero padding, and '-' for left or right justification.
  public Format(s: State, ch: number): void {
    // Choose the base of the verb; any other verb prints an error.
    let base: number
    switch (ch) {
      case 98: // 'b'
        base = 2
        break
      case 111: // 'o'
      case 79: // 'O'
        base = 8
        break
      case 100: // 'd'
      case 115: // 's'
      case 118: // 'v'
        base = 10
        break
      case 120: // 'x'
      case 88: // 'X'
        base = 16
        break
      default:
        writeString(
          s,
          '%!' +
            String.fromCodePoint(ch) +
            '(big.Int=' +
            textOf(this, 10) +
            ')',
        )
        return
    }
    const x = this._v
    let sign = ''
    if (x < 0n) {
      sign = '-'
    } else if (s.Flag(43)) {
      sign = '+'
    } else if (s.Flag(32)) {
      sign = ' '
    }

    // The # flag adds the base prefix.
    let prefix = ''
    if (s.Flag(35)) {
      switch (ch) {
        case 98:
          prefix = '0b'
          break
        case 111:
          prefix = '0'
          break
        case 120:
          prefix = '0x'
          break
        case 88:
          prefix = '0X'
          break
      }
    }
    if (ch === 79) {
      prefix = '0o'
    }

    // Digits of the magnitude, in upper case for %X.
    let digits = utoa(abs(x), base)
    if (ch === 88) {
      digits = digits.toUpperCase()
    }

    // Padding: spaces either side of the number, and zeros after the sign
    // and prefix.
    let left = 0 // spaces to the left of the digits for right justification
    let zeros = 0 // zeros as the left-most digits
    let right = 0 // spaces to the right of the digits for left justification

    // A precision sets the minimum digits; zero digits of zero print nothing.
    const [precision, precisionSet] = s.Precision()
    if (precisionSet) {
      if (digits.length < precision) {
        zeros = precision - digits.length
      } else if (digits === '0' && precision === 0) {
        return
      }
    }

    // A width pads with spaces on the left, on the right with -, or with
    // zeros with 0 and no precision.
    const length = sign.length + prefix.length + zeros + digits.length
    const [width, widthSet] = s.Width()
    if (widthSet && length < width) {
      const d = width - length
      if (s.Flag(45)) {
        right = d
      } else if (s.Flag(48) && !precisionSet) {
        zeros = d
      } else {
        left = d
      }
    }

    // Write the sign, prefix and digits with their padding.
    writeString(
      s,
      ' '.repeat(left) +
        sign +
        prefix +
        '0'.repeat(zeros) +
        digits +
        ' '.repeat(right),
    )
  }

  // Scan is a support routine for fmt.Scanner; it sets z to the value of the
  // scanned number. It accepts the formats 'b' (binary), 'o' (octal), 'd'
  // (decimal), 'x' (lowercase hexadecimal), and 'X' (uppercase hexadecimal).
  public Scan(s: ScanState, ch: number): $.GoError | null {
    s.SkipSpace()
    let base = 0
    switch (ch) {
      case 98:
        base = 2
        break
      case 111:
        base = 8
        break
      case 100:
        base = 10
        break
      case 120:
      case 88:
        base = 16
        break
      case 115:
      case 118:
        break
      default:
        return $.newError('Int.Scan: invalid verb')
    }
    return scanInt(this, new ScanReader(s), base)[2]
  }

  // AppendText implements the encoding.TextAppender interface.
  public AppendText(b: $.Slice<number>): [$.Slice<number>, $.GoError | null] {
    return [$.appendSlice(b, $.stringToBytes(textOf(this, 10))), null]
  }

  // MarshalText implements the encoding.TextMarshaler interface.
  public MarshalText(): [Uint8Array, $.GoError | null] {
    return [$.stringToBytes(textOf(this, 10)), null]
  }

  // UnmarshalText implements the encoding.TextUnmarshaler interface.
  public UnmarshalText(text: $.Slice<number>): $.GoError | null {
    const [z] = this.SetString($.bytesToString(text), 0)
    if (z === null) {
      return $.newError(
        'math/big: cannot unmarshal ' + quoteText(text) + ' into a *big.Int',
      )
    }
    return null
  }

  // MarshalJSON implements the json.Marshaler interface.
  public MarshalJSON(): [Uint8Array, $.GoError | null] {
    return [$.stringToBytes(textOf(this, 10)), null]
  }

  // UnmarshalJSON implements the json.Unmarshaler interface.
  public UnmarshalJSON(text: $.Slice<number>): $.GoError | null {
    if ($.bytesToString(text) === 'null') {
      return null
    }
    return this.UnmarshalText(text)
  }

  // GobEncode implements the gob.GobEncoder interface.
  public GobEncode(): [Uint8Array, $.GoError | null] {
    // Encode the version and sign in the first byte, then the big-endian
    // magnitude.
    const v = this._v
    const mag = bytesOf(abs(v))
    const buf = new Uint8Array(1 + mag.length)
    buf[0] = (intGobVersion << 1) | (v < 0n ? 1 : 0)
    buf.set(mag, 1)
    return [buf, null]
  }

  // GobDecode implements the gob.GobDecoder interface.
  public GobDecode(buf: $.Slice<number>): $.GoError | null {
    // An empty encoding is zero; otherwise check the version, then read the
    // sign and the magnitude.
    const bytes = $.bytesToUint8Array(buf)
    if (bytes.length === 0) {
      this.put(0n)
      return null
    }
    const b = bytes[0]
    if (b >> 1 !== intGobVersion) {
      return $.newError(
        'Int.GobDecode: encoding version ' + (b >> 1) + ' not supported',
      )
    }
    const mag = valueOfBytes(bytes.subarray(1))
    this.put((b & 1) !== 0 ? -mag : mag)
    return null
  }
}

Int.__typeInfo = $.registerStructType('big.Int', new Int(), [], Int)

const intGobVersion = 1

// NewInt allocates and returns a new Int set to x.
export function NewInt(x: bigint): Int {
  return new Int().SetInt64(x)
}

// Jacobi returns the Jacobi symbol (x/y), either +1, -1, or 0. The y argument
// must be an odd integer.
export function Jacobi(x: IntRef, y: IntRef): number {
  return jacobiOf(intOf(x)._v, intOf(y)._v)
}

function jacobiOf(x: bigint, y: bigint): number {
  if (y === 0n || (y & 1n) === 0n) {
    $.panic(
      'big: invalid 2nd argument to Int.Jacobi: need odd integer but got ' +
        y.toString(),
    )
  }
  return jacobi(x, y)
}

function textOf(x: Int, base: number): string {
  const v = x._v
  return (v < 0n ? '-' : '') + utoa(abs(v), base)
}

// scanInt reads a signed number from r into z, as (*Int).scan does, and
// returns z, the base the number was read in, and any error. On an error z is
// nil, and the magnitude read so far is left in z.
function scanInt(
  z: Int,
  r: ByteReader,
  base: number,
): [Int | null, number, $.GoError | null] {
  // Read the sign and the magnitude; an error leaves the magnitude read so
  // far in z.
  const [neg, signErr] = scanSign(r)
  if (signErr !== null) {
    return [null, 0, signErr]
  }
  const res = scanNat(r, base, false)
  if (res.err !== null) {
    z.put(z.neg ? -res.mant : res.mant)
    return [null, res.base, res.err]
  }
  z.put(neg ? -res.mant : res.mant)
  return [z, res.base, null]
}

function modSqrt5Mod8Prime(x: bigint, p: bigint): bigint {
  // Compute the root with Atkin's algorithm.
  const e = p >> 3n
  const tx = x << 1n
  const alpha = modPow(tx, e, p)
  let beta = euclid(alpha * alpha, p)[1]
  beta = euclid(beta * tx, p)[1]
  beta = beta - 1n
  beta = euclid(beta * x, p)[1]
  return euclid(beta * alpha, p)[1]
}

function modSqrtTonelliShanks(x: bigint, p: bigint): bigint {
  // Write p-1 as s * 2**e with s odd.
  let s = p - 1n
  const e = trailingZeroBits(s)
  s >>= BigInt(e)

  // Find a quadratic non-residue n.
  let n = 2n
  while (jacobi(n, p) !== -1) {
    n += 1n
  }

  // Tonelli-Shanks: reduce the order of b in steps until b is 1, when y is
  // the root.
  let y = modPow(x, (s + 1n) >> 1n, p)
  let b = modPow(x, s, p)
  let g = modPow(n, s, p)
  let r = e
  for (;;) {
    let m = 0
    let t = b
    while (t !== 1n) {
      t = (t * t) % p
      m++
    }
    if (m === 0) {
      return y
    }

    t = modPow(g, 1n << BigInt(r - m - 1), p)
    g = (t * t) % p
    y = (y * t) % p
    b = (b * g) % p
    r = m
  }
}

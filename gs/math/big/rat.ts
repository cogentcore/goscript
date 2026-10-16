import * as $ from '@goscript/builtin/index.js'
import type { ScanState } from '@goscript/fmt/index.js'
import { Float64bits, Ldexp } from '@goscript/math/index.js'

import { Int, intOf, type IntRef } from './int.js'
import {
  abs,
  bitLen,
  bytesOf,
  gcd,
  scanExponent,
  scanNat,
  scanSign,
  StringReader,
  trailingZeroBits,
  valueOfBytes,
} from './nat.js'

const divisionByZero = 'division by zero'
const ratGobVersion = 1

// RatRef is a *Rat argument: the compiler passes the address of a variable as
// a variable reference.
export type RatRef = Rat | $.VarRef<Rat> | null

// ratOf returns the Rat a pointer argument points to, and panics on nil.
export function ratOf(x: RatRef): Rat {
  return $.pointerValue<Rat>(x)
}

// quotToFloat returns the non-negative float with a mantissa of msize bits and
// an exponent of esize bits nearest to the quotient a/b, using round-to-even in
// halfway cases, and whether it is exact. The result is a float64 that holds
// the float exactly. The quotient must be in lowest terms and b non-zero.
function quotToFloat(
  a: bigint,
  b: bigint,
  msize: number,
  esize: number,
): [number, boolean] {
  const msize1 = msize + 1 // including the implicit 1
  const msize2 = msize1 + 1
  const ebias = 2 ** (esize - 1) - 1
  const emin = 1 - ebias

  const alen = bitLen(a)
  if (alen === 0) {
    return [0, true]
  }

  // Shift a or b so that the quotient is in [1<<msize1, 1<<(msize2+1)): two or
  // three bits more than the mantissa. The low bit is the rounding bit, and the
  // optional high one is shifted away below.
  let exp = alen - bitLen(b)
  let a2 = a
  let b2 = b
  const shift = msize2 - exp
  if (shift > 0) {
    a2 <<= BigInt(shift)
  } else if (shift < 0) {
    b2 <<= BigInt(-shift)
  }

  let mantissa = a2 / b2
  let haveRem = a2 % b2 !== 0n

  // If the quotient did not fit in msize2 bits, divide by b2<<1 instead.
  if (mantissa >> BigInt(msize2) === 1n) {
    if ((mantissa & 1n) === 1n) {
      haveRem = true
    }
    mantissa >>= 1n
    exp++
  }

  if (emin - msize <= exp && exp <= emin) {
    // Denormal: lose shift bits of precision.
    const lost = BigInt(emin - (exp - 1))
    haveRem = haveRem || (mantissa & ((1n << lost) - 1n)) !== 0n
    mantissa >>= lost
    exp = 2 - ebias
  }

  // Round using round-half-to-even.
  let exact = !haveRem
  if ((mantissa & 1n) !== 0n) {
    exact = false
    if (haveRem || (mantissa & 2n) !== 0n) {
      mantissa++
      if (mantissa >= 1n << BigInt(msize2)) {
        // Complete rollover, 11...1 => 100...0.
        mantissa >>= 1n
        exp++
      }
    }
  }
  mantissa >>= 1n // discard the rounding bit

  const f = Ldexp(Number(mantissa), exp - msize1)
  if (!Number.isFinite(f)) {
    exact = false
  }
  return [f, exact]
}

// A Rat represents a quotient a/b of arbitrary precision. The zero value for a
// Rat represents the value 0.
//
// The numerator and the denominator are Ints, which Num and Denom hand out.
// A denominator of 0 stands for 1, as in Go's math/big: the zero value works
// without initialization.
export class Rat {
  public _a: Int = new Int()
  public _b: Int = new Int()

  // __typeInfo registers Rat with the runtime type system (see below).
  static __typeInfo: $.StructTypeInfo

  constructor(_init?: Partial<{}>, _isArrayElement?: boolean) {}

  public clone(): Rat {
    return new Rat().__goscriptAssign(this)
  }

  public __goscriptAssign(src: Rat): Rat {
    const x = ratOf(src)
    this._a.put(x._a._v)
    this._b.put(x._b._v)
    return this
  }

  // num and den are the numerator, and the denominator with the zero value
  // read as 1.
  public get num(): bigint {
    return this._a._v
  }

  public get den(): bigint {
    return this._b._v === 0n ? 1n : this._b._v
  }

  // setQuo sets the value to n/d for d != 0 in lowest terms.
  public setQuo(n: bigint, d: bigint): Rat {
    if (d < 0n) {
      n = -n
      d = -d
    }
    if (n === 0n) {
      d = 1n
    } else {
      const g = gcd(abs(n), d)
      if (g !== 1n) {
        n /= g
        d /= g
      }
    }
    this._a.put(n)
    this._b.put(d)
    return this
  }

  // SetFloat64 sets z to exactly f and returns z. If f is not finite,
  // SetFloat64 returns nil.
  public SetFloat64(f: number): Rat | null {
    const bits = Float64bits(f)
    const biased = Number((bits >> 52n) & 0x7ffn)
    let mantissa = bits & ((1n << 52n) - 1n)
    let exp: number
    switch (biased) {
      case 0x7ff: // non-finite
        return null
      case 0: // denormal
        exp = -1022
        break
      default: // normal
        mantissa |= 1n << 52n
        exp = biased - 1023
    }

    const shift = 52 - exp
    const n = f < 0 ? -mantissa : mantissa
    return ratOf(this).setQuo(
      shift > 0 ? n : n << BigInt(-shift),
      shift > 0 ? 1n << BigInt(shift) : 1n,
    )
  }

  // Float32 returns the nearest float32 value for x and a bool indicating
  // whether f represents x exactly. If the magnitude of x is too large to be
  // represented by a float32, f is an infinity and exact is false. The sign of
  // f always matches the sign of x, even if f == 0.
  public Float32(): [number, boolean] {
    const x = ratOf(this)
    const [f, exact] = quotToFloat(abs(x.num), x.den, 23, 8)
    return [x.num < 0n ? -Math.fround(f) : Math.fround(f), exact]
  }

  // Float64 returns the nearest float64 value for x and a bool indicating
  // whether f represents x exactly. If the magnitude of x is too large to be
  // represented by a float64, f is an infinity and exact is false. The sign of
  // f always matches the sign of x, even if f == 0.
  public Float64(): [number, boolean] {
    const x = ratOf(this)
    const [f, exact] = quotToFloat(abs(x.num), x.den, 52, 11)
    return [x.num < 0n ? -f : f, exact]
  }

  // SetFrac sets z to a/b and returns z. If b == 0, SetFrac panics.
  public SetFrac(a: IntRef, b: IntRef): Rat {
    const d = intOf(b)._v
    if (d === 0n) {
      $.panic(divisionByZero)
    }
    return ratOf(this).setQuo(intOf(a)._v, d)
  }

  // SetFrac64 sets z to a/b and returns z. If b == 0, SetFrac64 panics.
  public SetFrac64(a: bigint, b: bigint): Rat {
    if (b === 0n) {
      $.panic(divisionByZero)
    }
    return ratOf(this).setQuo(BigInt.asIntN(64, a), BigInt.asIntN(64, b))
  }

  // SetInt sets z to x (by making a copy of x) and returns z.
  public SetInt(x: IntRef): Rat {
    return ratOf(this).setInteger(intOf(x)._v)
  }

  // SetInt64 sets z to x and returns z.
  public SetInt64(x: bigint): Rat {
    return ratOf(this).setInteger(BigInt.asIntN(64, BigInt(x)))
  }

  // SetUint64 sets z to x and returns z.
  public SetUint64(x: number | bigint): Rat {
    return ratOf(this).setInteger(BigInt.asUintN(64, BigInt(x)))
  }

  private setInteger(n: bigint): Rat {
    this._a.put(n)
    this._b.put(1n)
    return this
  }

  // Set sets z to x (by making a copy of x) and returns z.
  public Set(x: RatRef): Rat {
    const z = ratOf(this)
    const y = ratOf(x)
    return z.setInteger(y.num).setDen(y.den)
  }

  private setDen(d: bigint): Rat {
    this._b.put(d)
    return this
  }

  // Abs sets z to |x| (the absolute value of x) and returns z.
  public Abs(x: RatRef): Rat {
    const y = ratOf(x)
    return ratOf(this).setInteger(abs(y.num)).setDen(y.den)
  }

  // Neg sets z to -x and returns z.
  public Neg(x: RatRef): Rat {
    const y = ratOf(x)
    return ratOf(this).setInteger(-y.num).setDen(y.den)
  }

  // Inv sets z to 1/x and returns z. If x == 0, Inv panics.
  public Inv(x: RatRef): Rat {
    const y = ratOf(x)
    if (y.num === 0n) {
      $.panic(divisionByZero)
    }
    return ratOf(this)
      .setInteger(y.num < 0n ? -y.den : y.den)
      .setDen(abs(y.num))
  }

  // Sign returns:
  //
  //	-1 if x <  0
  //	 0 if x == 0
  //	+1 if x >  0
  public Sign(): number {
    return ratOf(this)._a.Sign()
  }

  // IsInt reports whether the denominator of x is 1.
  public IsInt(): boolean {
    return ratOf(this).den === 1n
  }

  // Num returns the numerator of x; it may be <= 0. The result is a reference
  // to x's numerator; it may change if a new value is assigned to x, and vice
  // versa. The sign of the numerator corresponds to the sign of x.
  public Num(): Int {
    return ratOf(this)._a
  }

  // Denom returns the denominator of x; it is always > 0. The result is a
  // reference to x's denominator, unless x is an uninitialized (zero value)
  // Rat, in which case the result is a new Int of value 1. If the result is a
  // reference to x's denominator it may change if a new value is assigned to
  // x, and vice versa.
  public Denom(): Int {
    const x = ratOf(this)
    return x._b._v === 0n ? new Int().SetInt64(1n) : x._b
  }

  // Cmp compares x and y and returns:
  //
  //	-1 if x <  y
  //	 0 if x == y
  //	+1 if x >  y
  public Cmp(y: RatRef): number {
    const x = ratOf(this)
    const q = ratOf(y)
    const l = x.num * q.den
    const r = q.num * x.den
    return (
      l < r ? -1
      : l > r ? 1
      : 0
    )
  }

  // Add sets z to the sum x+y and returns z.
  public Add(x: RatRef, y: RatRef): Rat {
    const p = ratOf(x)
    const q = ratOf(y)
    return ratOf(this).setQuo(p.num * q.den + q.num * p.den, p.den * q.den)
  }

  // Sub sets z to the difference x-y and returns z.
  public Sub(x: RatRef, y: RatRef): Rat {
    const p = ratOf(x)
    const q = ratOf(y)
    return ratOf(this).setQuo(p.num * q.den - q.num * p.den, p.den * q.den)
  }

  // Mul sets z to the product x*y and returns z.
  public Mul(x: RatRef, y: RatRef): Rat {
    const p = ratOf(x)
    const q = ratOf(y)
    return ratOf(this).setQuo(p.num * q.num, p.den * q.den)
  }

  // Quo sets z to the quotient x/y and returns z. If y == 0, Quo panics.
  public Quo(x: RatRef, y: RatRef): Rat {
    const p = ratOf(x)
    const q = ratOf(y)
    if (q.num === 0n) {
      $.panic(divisionByZero)
    }
    return ratOf(this).setQuo(p.num * q.den, q.num * p.den)
  }

  // Scan is a support routine for fmt.Scanner. It accepts the formats 'e',
  // 'E', 'f', 'F', 'g', 'G', and 'v'. All formats are equivalent.
  public Scan(s: ScanState, ch: number): $.GoError | null {
    const [tok, err] = s.Token(true, (c: number) =>
      '+-/0123456789.eE'.includes(String.fromCodePoint(c)),
    )
    if (err !== null) {
      return err
    }
    if (!'efgEFGv'.includes(String.fromCodePoint(ch))) {
      return $.newError('Rat.Scan: invalid verb')
    }
    if (ratOf(this).SetString($.bytesToString(tok))[0] === null) {
      return $.newError('Rat.Scan: invalid syntax')
    }
    return null
  }

  // SetString sets z to the value of s and returns z and a boolean indicating
  // success. s can be given as a (possibly signed) fraction "a/b", or as a
  // floating-point number optionally followed by an exponent. The parts may
  // use the prefixes of Int.SetString with base 0, except that a leading "0"
  // of a floating-point number is decimal. A hexadecimal floating-point number
  // takes a "p" exponent, and the others an "e" exponent. If the exponent's
  // absolute value is too large, the operation may fail. The entire string, not
  // just a prefix, must be valid for success. If the operation failed, the
  // value of z is undefined but the returned value is nil.
  public SetString(s: string): [Rat | null, boolean] {
    const z = ratOf(this)
    if (s.length === 0) {
      return [null, false]
    }

    const sep = s.indexOf('/')
    if (sep >= 0) {
      const [num] = new Int().SetString(s.slice(0, sep), 0)
      if (num === null) {
        return [null, false]
      }
      const r = new StringReader(s.slice(sep + 1))
      const den = scanNat(r, 0, false)
      if (den.err !== null || !r.consumed() || den.mant === 0n) {
        return [null, false]
      }
      return [z.setQuo(num._v, den.mant), true]
    }

    const r = new StringReader(s)
    const [neg, signErr] = scanSign(r)
    if (signErr !== null) {
      return [null, false]
    }

    const mant = scanNat(r, 0, true)
    if (mant.err !== null) {
      return [null, false]
    }
    const [exp, ebase, expErr] = scanExponent(r, true, true)
    if (expErr !== null || !r.consumed()) {
      return [null, false]
    }

    if (mant.mant === 0n) {
      return [z.setQuo(0n, 1n), true]
    }

    // The value is mant * 2**exp2 * 5**exp5, since 10**e == 5**e * 2**e.
    let exp2 = 0n
    let exp5 = 0n
    if (mant.count < 0) {
      const d = BigInt(mant.count)
      switch (mant.base) {
        case 10:
          exp5 = d
          exp2 = d
          break
        case 2:
          exp2 = d
          break
        case 8:
          exp2 = d * 3n // octal digits are 3 bits each
          break
        case 16:
          exp2 = d * 4n // hexadecimal digits are 4 bits each
          break
        default:
          $.panic('unexpected mantissa base')
      }
    }
    switch (ebase) {
      case 10:
        exp5 += exp
        exp2 += exp
        break
      case 2:
        exp2 += exp
        break
      default:
        $.panic('unexpected exponent base')
    }

    let n = mant.mant
    let d = 1n
    if (exp5 !== 0n) {
      const k = abs(exp5)
      if (k > 1000000n) {
        return [null, false] // avoid excessively large exponents
      }
      if (exp5 > 0n) {
        n *= 5n ** k
      } else {
        d = 5n ** k
      }
    }

    if (exp2 < -10000000n || exp2 > 10000000n) {
      return [null, false] // avoid excessively large exponents
    }
    if (exp2 > 0n) {
      n <<= exp2
    } else if (exp2 < 0n) {
      d <<= -exp2
    }

    return [z.setQuo(neg ? -n : n, d), true]
  }

  // String returns a string representation of x in the form "a/b" (even if b
  // == 1).
  public String(): string {
    const x = ratOf(this)
    return x.num.toString() + '/' + x.den.toString()
  }

  // RatString returns a string representation of x in the form "a/b" if b != 1,
  // and in the form "a" if b == 1.
  public RatString(): string {
    const x = ratOf(this)
    return x.IsInt() ? x.num.toString() : x.String()
  }

  // FloatString returns a string representation of x in decimal form with prec
  // digits of precision after the radix point. The last digit is rounded to
  // nearest, with halves rounded away from zero.
  public FloatString(prec: number): string {
    const x = ratOf(this)
    if (x.IsInt()) {
      return x.num.toString() + (prec > 0 ? '.' + '0'.repeat(prec) : '')
    }

    // The integer part, and the remainder scaled by 10**prec and rounded.
    const den = x.den
    let q = abs(x.num) / den
    const p = prec > 0 ? 10n ** BigInt(prec) : 1n
    const scaled = (abs(x.num) % den) * p
    let r = scaled / den
    if (den <= (scaled % den) * 2n) {
      // Round up.
      r++
      if (r >= p) {
        q++
        r -= p
      }
    }

    let s = (x.num < 0n ? '-' : '') + q.toString()
    if (prec > 0) {
      s += '.' + r.toString().padStart(prec, '0')
    }
    return s
  }

  // FloatPrec returns the number n of non-repeating digits immediately
  // following the decimal point of the decimal representation of x. The boolean
  // result indicates whether a decimal representation of x with that number of
  // fractional digits is exact, in other words, whether x is a finite decimal.
  public FloatPrec(): [number, boolean] {
    // The denominator is 2**p2 * 5**p5 * q; x is a finite decimal exactly
    // when q is 1.
    let q = ratOf(this).den
    const p2 = trailingZeroBits(q)
    q >>= BigInt(p2)

    const fp = 13 // f == 5**fp
    const tab: bigint[] = [] // tab[i] == 5**(fp*2**i)
    for (let f = 1220703125n; q % f === 0n; f *= f) {
      tab.push(f)
    }

    let p5 = 0
    for (let i = tab.length - 1; i >= 0; i--) {
      if (q % tab[i] === 0n) {
        p5 += fp * 2 ** i
        q /= tab[i]
      }
    }
    for (; q % 5n === 0n; q /= 5n) {
      p5++
    }

    return [Math.max(p2, p5), q === 1n]
  }

  // GobEncode implements the gob.GobEncoder interface.
  public GobEncode(): [Uint8Array, $.GoError | null] {
    const x = ratOf(this)
    const a = bytesOf(abs(x.num))
    const b = bytesOf(x._b._v)
    const buf = new Uint8Array(1 + 4 + a.length + b.length)
    buf[0] = (ratGobVersion << 1) | (x.num < 0n ? 1 : 0)
    new DataView(buf.buffer).setUint32(1, a.length)
    buf.set(a, 5)
    buf.set(b, 5 + a.length)
    return [buf, null]
  }

  // GobDecode implements the gob.GobDecoder interface.
  public GobDecode(buf: $.Slice<number>): $.GoError | null {
    const z = ratOf(this)
    const bytes = $.bytesToUint8Array(buf)
    if (bytes.length === 0) {
      z._a.put(0n)
      z._b.put(0n)
      return null
    }
    if (bytes.length < 5) {
      return $.newError('Rat.GobDecode: buffer too small')
    }
    const b = bytes[0]
    if (b >> 1 !== ratGobVersion) {
      return $.newError(
        'Rat.GobDecode: encoding version ' + (b >> 1) + ' not supported',
      )
    }
    const i = 5 + new DataView(bytes.buffer, bytes.byteOffset).getUint32(1)
    if (bytes.length < i) {
      return $.newError('Rat.GobDecode: buffer too small')
    }
    const a = valueOfBytes(bytes.subarray(5, i))
    z._a.put((b & 1) !== 0 ? -a : a)
    z._b.put(valueOfBytes(bytes.subarray(i)))
    return null
  }

  // AppendText implements the encoding.TextAppender interface.
  public AppendText(b: $.Slice<number>): [$.Slice<number>, $.GoError | null] {
    return [$.appendSlice(b, $.stringToBytes(ratOf(this).RatString())), null]
  }

  // MarshalText implements the encoding.TextMarshaler interface.
  public MarshalText(): [Uint8Array, $.GoError | null] {
    return [$.stringToBytes(ratOf(this).RatString()), null]
  }

  // UnmarshalText implements the encoding.TextUnmarshaler interface.
  public UnmarshalText(text: $.Slice<number>): $.GoError | null {
    if (ratOf(this).SetString($.bytesToString(text))[0] === null) {
      return $.newError(
        'math/big: cannot unmarshal "' +
          $.bytesToString(text) +
          '" into a *big.Rat',
      )
    }
    return null
  }
}

Rat.__typeInfo = $.registerStructType('big.Rat', new Rat(), [], Rat)

// NewRat creates a new Rat with numerator a and denominator b.
export function NewRat(a: bigint, b: bigint): Rat {
  return new Rat().SetFrac64(a, b)
}

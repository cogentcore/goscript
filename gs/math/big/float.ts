import * as $ from '@goscript/builtin/index.js'
import type { ScanState, State } from '@goscript/fmt/index.js'
import { Float64bits, Ldexp } from '@goscript/math/index.js'

import { Int, intOf, type IntRef } from './int.js'
import {
  Above,
  type Accuracy,
  AwayFromZero,
  Below,
  Exact,
  MaxExp,
  MaxPrec,
  MinExp,
  type RoundingMode,
  ToNearestAway,
  ToNearestEven,
  ToNegativeInf,
  ToPositiveInf,
  ToZero,
} from './mode.js'
import {
  abs,
  bitLen,
  quoteText,
  ScanReader,
  scanExponent,
  scanNat,
  scanSign,
  StringReader,
  trailingZeroBits,
  valueOfBytes,
  writeString,
  type ByteReader,
} from './nat.js'
import { Rat, ratOf, type RatRef } from './rat.js'

// A Float is a multi-precision floating-point number
// 0 or ±0.mant × 2**exp, where mant is a binary fraction in [0.5, 1) held to
// a whole number of 64-bit words, as in Go's math/big. The mantissa is a
// bigint whose bit length is a multiple of 64 with the top bit set, and 0 for
// a number that is not finite. Rounding to the precision follows Go's, so
// results agree to the last bit.

const formZero = 0
const formFinite = 1
const formInf = 2

const floatGobVersion = 1

// FloatRef is a *Float argument: the compiler passes the address of a variable
// as a variable reference.
export type FloatRef = Float | $.VarRef<Float> | null

// floatOf returns the Float a pointer argument points to, and panics on nil.
export function floatOf(x: FloatRef): Float {
  return $.pointerValue<Float>(x)
}

// An ErrNaN panic is raised by a Float operation that would lead to a NaN
// under IEEE 754 rules. An ErrNaN implements the error interface.
export class ErrNaN {
  public msg: string

  constructor(init?: Partial<{ msg: string }>) {
    this.msg = init?.msg ?? ''
  }

  public clone(): ErrNaN {
    return new ErrNaN({ msg: this.msg })
  }

  public Error(): string {
    return this.msg
  }

  static __typeInfo = $.registerStructType(
    'big.ErrNaN',
    new ErrNaN(),
    [
      {
        name: 'Error',
        args: [],
        returns: [{ type: { kind: $.TypeKind.Basic, name: 'string' } }],
      },
    ],
    ErrNaN,
    [
      {
        name: 'msg',
        key: 'msg',
        type: { kind: $.TypeKind.Basic, name: 'string' },
      },
    ],
  )
}

function makeAcc(above: boolean): Accuracy {
  return above ? Above : Below
}

// words returns the number of 64-bit words that hold bits bits.
function words(bits: number): number {
  return Math.ceil(bits / 64)
}

// fnorm pads m, which must be positive, on the right to a whole number of
// words with the top bit of the top word set, and returns it and the number of
// bits it shifted.
function fnorm(m: bigint): [bigint, number] {
  const bits = bitLen(m)
  const s = words(bits) * 64 - bits
  return [m << BigInt(s), s]
}

// mantExp returns the exponent of the least significant bit of x's mantissa.
function lsbExp(x: Float): number {
  return x._exp - bitLen(x._mant)
}

// top64 returns the 64 most significant bits of the mantissa of a finite x.
function top64(x: Float): bigint {
  return x._mant >> BigInt(bitLen(x._mant) - 64)
}

export class Float {
  public _prec = 0
  public _mode: RoundingMode = ToNearestEven
  public _acc: Accuracy = Exact
  public _form = formZero
  public _neg = false
  public _mant = 0n
  public _exp = 0

  // __typeInfo registers Float with the runtime type system (see below).
  static __typeInfo: $.StructTypeInfo

  constructor(_init?: Partial<{}>, _isArrayElement?: boolean) {}

  public clone(): Float {
    return new Float().__goscriptAssign(this)
  }

  public __goscriptAssign(src: Float): Float {
    const x = floatOf(src)
    this._prec = x._prec
    this._mode = x._mode
    this._acc = x._acc
    this._form = x._form
    this._neg = x._neg
    this._mant = x._mant
    this._exp = x._exp
    return this
  }

  // SetPrec sets z's precision to prec and returns the (possibly) rounded value
  // of z. Rounding occurs according to z's rounding mode if the mantissa cannot
  // be represented in prec bits without loss of precision. SetPrec(0) maps all
  // finite values to ±0; infinite values remain unchanged. If prec > MaxPrec,
  // it is set to MaxPrec.
  public SetPrec(prec: number): Float {
    const z = floatOf(this)
    z._acc = Exact
    if (prec === 0) {
      z._prec = 0
      if (z._form === formFinite) {
        z._acc = makeAcc(z._neg)
        z._form = formZero
      }
      return z
    }
    if (prec > MaxPrec) {
      prec = MaxPrec
    }
    const old = z._prec
    z._prec = prec
    if (z._prec < old) {
      z.round(0)
    }
    return z
  }

  // SetMode sets z's rounding mode to mode and returns an exact z. z remains
  // unchanged otherwise. z.SetMode(z.Mode()) is a cheap way to set z's
  // accuracy to Exact.
  public SetMode(mode: RoundingMode): Float {
    const z = floatOf(this)
    z._mode = mode
    z._acc = Exact
    return z
  }

  // Prec returns the mantissa precision of x in bits. The result may be 0 for
  // |x| == 0 and |x| == Inf.
  public Prec(): number {
    return floatOf(this)._prec
  }

  // MinPrec returns the minimum precision required to represent x exactly
  // (i.e., the smallest prec before x.SetPrec(prec) would start rounding x).
  // The result is 0 for |x| == 0 and |x| == Inf.
  public MinPrec(): number {
    const x = floatOf(this)
    if (x._form !== formFinite) {
      return 0
    }
    return bitLen(x._mant) - trailingZeroBits(x._mant)
  }

  // Mode returns the rounding mode of x.
  public Mode(): RoundingMode {
    return floatOf(this)._mode
  }

  // Acc returns the accuracy of x produced by the most recent operation, unless
  // explicitly documented otherwise by that operation.
  public Acc(): Accuracy {
    return floatOf(this)._acc
  }

  // Sign returns:
  //
  //	-1 if x <   0
  //	 0 if x is ±0
  //	+1 if x >   0
  public Sign(): number {
    const x = floatOf(this)
    if (x._form === formZero) {
      return 0
    }
    return x._neg ? -1 : 1
  }

  // MantExp breaks x into its mantissa and exponent components and returns the
  // exponent. If a non-nil mant argument is provided its value is set to the
  // mantissa of x, with the same precision and rounding mode as x. The
  // components satisfy x == mant × 2**exp, with 0.5 <= |mant| < 1.0.
  // Calling MantExp with a nil argument is an efficient way to get the
  // exponent of the receiver.
  public MantExp(mant: FloatRef): number {
    const x = floatOf(this)
    const exp = x._form === formFinite ? x._exp : 0
    if (mant !== null) {
      const m = floatOf(mant).Copy(x)
      if (m._form === formFinite) {
        m._exp = 0
      }
    }
    return exp
  }

  // setExpAndRound sets the exponent of the finite z to exp and rounds z, with
  // sbit the sticky bit of any bits already discarded. A zero or infinity
  // results when exp is out of range.
  private setExpAndRound(exp: number, sbit: number): void {
    if (exp < MinExp) {
      this._acc = makeAcc(this._neg)
      this._form = formZero
      return
    }
    if (exp > MaxExp) {
      this._acc = makeAcc(!this._neg)
      this._form = formInf
      return
    }
    this._form = formFinite
    this._exp = exp
    this.round(sbit)
  }

  // SetMantExp sets z to mant × 2**exp and returns z. The result z has the same
  // precision and rounding mode as mant. SetMantExp is an inverse of MantExp but
  // does not require 0.5 <= |mant| < 1.0. Specifically, for a given x of type
  // *Float, SetMantExp relates to MantExp as follows:
  //
  //	mant := new(Float)
  //	new(Float).SetMantExp(mant, x.MantExp(mant)).Cmp(x) == 0
  //
  // Special cases are:
  //
  //	z.SetMantExp(±0, exp) = ±0
  //	z.SetMantExp(±Inf, exp) = ±Inf
  //
  // z and mant may be the same in which case z's exponent is set to exp.
  public SetMantExp(mant: FloatRef, exp: number): Float {
    const z = floatOf(this).Copy(mant)
    if (z._form === formFinite) {
      z.setExpAndRound(z._exp + exp, 0)
    }
    return z
  }

  // Signbit reports whether x is negative or negative zero.
  public Signbit(): boolean {
    return floatOf(this)._neg
  }

  // IsInf reports whether x is +Inf or -Inf.
  public IsInf(): boolean {
    return floatOf(this)._form === formInf
  }

  // IsInt reports whether x is an integer. ±Inf values are not integers.
  public IsInt(): boolean {
    const x = floatOf(this)
    if (x._form !== formFinite) {
      return x._form === formZero
    }
    // x._exp <= 0 means 0.5 <= |x| < 1: not an integer.
    if (x._exp <= 0) {
      return false
    }
    // x is an integer if there are no fractional mantissa bits.
    return x._prec <= x._exp || x.MinPrec() <= x._exp
  }

  // round rounds z according to z._mode to z._prec bits and sets z's accuracy
  // to reflect the rounding error. sbit must be 0 or 1 and summarizes any
  // "sticky bit" information one might have before calling round. z's mantissa
  // must be normalized (with the msb set) or empty.
  private round(sbit: number): void {
    this._acc = Exact
    if (this._form !== formFinite) {
      return
    }

    const bits = bitLen(this._mant)
    if (bits <= this._prec) {
      return
    }

    // Rounding is based on two bits: the rounding bit (rbit) and the sticky bit
    // (sbit). The rbit is the bit immediately before the least-significant
    // bit that remains after rounding; the sbit says whether any of the bits
    // below the rbit are set.
    const r = bits - this._prec - 1
    const rbit = Number((this._mant >> BigInt(r)) & 1n)
    if (sbit === 0 && (rbit === 0 || this._mode === ToNearestEven)) {
      sbit = (this._mant & ((1n << BigInt(r)) - 1n)) !== 0n ? 1 : 0
    }

    // Cut off the words that are not needed.
    const n = words(this._prec)
    if (bits > 64 * n) {
      this._mant >>= BigInt(bits - 64 * n)
    }

    // The least significant bit that remains is at position ntz.
    const ntz = BigInt(64 * n - this._prec)
    const lsb = 1n << ntz
    if ((rbit | sbit) !== 0) {
      let inc: boolean
      switch (this._mode) {
        case ToNegativeInf:
          inc = this._neg
          break
        case ToZero:
          inc = false
          break
        case ToNearestEven:
          inc = rbit !== 0 && (sbit !== 0 || (this._mant & lsb) !== 0n)
          break
        case ToNearestAway:
          inc = rbit !== 0
          break
        case AwayFromZero:
          inc = true
          break
        case ToPositiveInf:
          inc = !this._neg
          break
        default:
          $.panic('unreachable')
      }

      // A positive number is rounded Above when it is incremented, a negative
      // number Below.
      this._acc = makeAcc(inc !== this._neg)
      if (inc) {
        this._mant += lsb
        if (bitLen(this._mant) > 64 * n) {
          // The mantissa overflowed to 1.000...0: halve it and double the
          // exponent.
          if (this._exp >= MaxExp) {
            this._form = formInf
            return
          }
          this._exp++
          this._mant >>= 1n
        }
      }
    }

    // Zero out the unused low bits.
    this._mant &= ~(lsb - 1n)
  }

  private setBits64(neg: boolean, x: bigint): Float {
    if (this._prec === 0) {
      this._prec = 64
    }
    this._acc = Exact
    this._neg = neg
    if (x === 0n) {
      this._form = formZero
      return this
    }
    const bits = bitLen(x)
    this._form = formFinite
    this._mant = x << BigInt(64 - bits)
    this._exp = bits
    if (this._prec < 64) {
      this.round(0)
    }
    return this
  }

  // SetUint64 sets z to the (possibly rounded) value of x and returns z. If z's
  // precision is 0, it is changed to 64 (and rounding will have no effect).
  public SetUint64(x: bigint): Float {
    return floatOf(this).setBits64(false, x)
  }

  // SetInt64 sets z to the (possibly rounded) value of x and returns z. If z's
  // precision is 0, it is changed to 64 (and rounding will have no effect).
  public SetInt64(x: bigint): Float {
    return floatOf(this).setBits64(x < 0n, abs(x))
  }

  // SetFloat64 sets z to the (possibly rounded) value of x and returns z. If z's
  // precision is 0, it is changed to 53 (and rounding will have no effect).
  // SetFloat64 panics with ErrNaN if x is a NaN. Note that z is not modified in
  // that case.
  public SetFloat64(x: number): Float {
    const z = floatOf(this)
    if (z._prec === 0) {
      z._prec = 53
    }
    if (Number.isNaN(x)) {
      $.panic(new ErrNaN({ msg: 'Float.SetFloat64(NaN)' }))
    }
    z._acc = Exact
    const bits = Float64bits(x)
    z._neg = bits >> 63n !== 0n // handle -0, -Inf correctly
    if (x === 0) {
      z._form = formZero
      return z
    }
    if (!Number.isFinite(x)) {
      z._form = formInf
      return z
    }
    z._form = formFinite
    const biased = Number((bits >> 52n) & 0x7ffn)
    let frac = bits & ((1n << 52n) - 1n)
    if (biased !== 0) {
      frac |= 1n << 52n
    }
    const e = biased === 0 ? -1074 : biased - 1075 // x == frac × 2**e
    const n = bitLen(frac)
    z._mant = frac << BigInt(64 - n)
    z._exp = n + e
    if (z._prec < 53) {
      z.round(0)
    }
    return z
  }

  // setBigInt sets z to the (possibly rounded) value of the integer x.
  private setBigInt(x: bigint): Float {
    const mag = abs(x)
    const bits = bitLen(mag)
    if (this._prec === 0) {
      this._prec = Math.max(bits, 64)
    }
    this._acc = Exact
    this._neg = x < 0n
    if (x === 0n) {
      this._form = formZero
      return this
    }
    this._mant = fnorm(mag)[0]
    this.setExpAndRound(bits, 0)
    return this
  }

  // SetInt sets z to the (possibly rounded) value of x and returns z. If z's
  // precision is 0, it is changed to the larger of x.BitLen() or 64 (and
  // rounding will have no effect).
  public SetInt(x: IntRef): Float {
    return floatOf(this).setBigInt(intOf(x)._v)
  }

  // SetRat sets z to the (possibly rounded) value of x and returns z. If z's
  // precision is 0, it is changed to the largest of a.BitLen(), b.BitLen(), or
  // 64; with x = a/b.
  public SetRat(x: RatRef): Float {
    const z = floatOf(this)
    const r = ratOf(x)
    if (r.den === 1n) {
      return z.setBigInt(r.num)
    }
    const a = new Float().setBigInt(r.num)
    const b = new Float().setBigInt(r.den)
    if (z._prec === 0) {
      z._prec = Math.max(a._prec, b._prec)
    }
    return z.Quo(a, b)
  }

  // SetInf sets z to the infinite Float -Inf if signbit is set, or +Inf if
  // signbit is not set, and returns z. The precision of z is unchanged and the
  // result is always Exact.
  public SetInf(signbit: boolean): Float {
    const z = floatOf(this)
    z._acc = Exact
    z._form = formInf
    z._neg = signbit
    return z
  }

  // Set sets z to the (possibly rounded) value of x and returns z. If z's
  // precision is 0, it is changed to the precision of x before setting z (and
  // rounding will have no effect). Rounding is performed according to z's
  // precision and rounding mode, but z's accuracy is not computed. Specifically,
  // the result of z.Acc() is undefined.
  public Set(x: FloatRef): Float {
    const z = floatOf(this)
    const f = floatOf(x)
    z._acc = Exact
    if (z !== f) {
      z._form = f._form
      z._neg = f._neg
      if (f._form === formFinite) {
        z._exp = f._exp
        z._mant = f._mant
      }
      if (z._prec === 0) {
        z._prec = f._prec
      } else if (z._prec < f._prec) {
        z.round(0)
      }
    }
    return z
  }

  // Copy sets z to x, with the same precision, rounding mode, and accuracy as
  // x, and returns z. x is not changed even if z and x are the same.
  public Copy(x: FloatRef): Float {
    const z = floatOf(this)
    const f = floatOf(x)
    if (z !== f) {
      z._prec = f._prec
      z._mode = f._mode
      z._acc = f._acc
      z._form = f._form
      z._neg = f._neg
      if (z._form === formFinite) {
        z._mant = f._mant
        z._exp = f._exp
      }
    }
    return z
  }

  // Uint64 returns the unsigned integer resulting from truncating x towards
  // zero. If 0 <= x <= math.MaxUint64, the result is Exact if x is an integer
  // (and Below otherwise). The result is (0, Above) for x < 0, and
  // (math.MaxUint64, Below) for x > math.MaxUint64.
  public Uint64(): [bigint, Accuracy] {
    const x = floatOf(this)
    switch (x._form) {
      case formFinite:
        if (x._neg) {
          return [0n, Above]
        }
        // 0 < x < +Inf
        if (x._exp <= 0) {
          // 0 < x < 1
          return [0n, Below]
        }
        // 1 <= x < Inf
        if (x._exp <= 64) {
          // u = trunc(x) fits into a uint64
          const u = top64(x) >> BigInt(64 - x._exp)
          if (x.MinPrec() <= 64) {
            return [u, Exact]
          }
          return [u, Below] // x truncated
        }
        // x is too large
        return [(1n << 64n) - 1n, Below]
      case formZero:
        return [0n, Exact]
      default:
        if (x._neg) {
          return [0n, Above]
        }
        return [(1n << 64n) - 1n, Below]
    }
  }

  // Int64 returns the integer resulting from truncating x towards zero. If
  // math.MinInt64 <= x <= math.MaxInt64, the result is Exact if x is an integer
  // (and Below or Above for x < 0 or x > 0, respectively, otherwise). The result
  // is (math.MinInt64, Above) for x < math.MinInt64, and (math.MaxInt64, Below)
  // for x > math.MaxInt64.
  public Int64(): [bigint, Accuracy] {
    const x = floatOf(this)
    switch (x._form) {
      case formFinite: {
        // 0 < |x| < +Inf
        let acc = makeAcc(x._neg)
        if (x._exp <= 0) {
          // 0 < |x| < 1
          return [0n, acc]
        }
        // x._exp > 0

        // 1 <= |x| < +Inf
        if (x._exp <= 63) {
          // i = trunc(x) fits into an int64
          let i = top64(x) >> BigInt(64 - x._exp)
          if (x._neg) {
            i = -i
          }
          if (x.MinPrec() <= x._exp) {
            return [i, Exact]
          }
          return [i, acc] // x truncated
        }
        if (x._neg) {
          // check for special case x == math.MinInt64 (i.e., x == -(0.5 << 64))
          if (x._exp === 64 && x.MinPrec() === 1) {
            acc = Exact
          }
          return [-(1n << 63n), acc]
        }
        // x is too large
        return [(1n << 63n) - 1n, Below]
      }
      case formZero:
        return [0n, Exact]
      default:
        if (x._neg) {
          return [-(1n << 63n), Above]
        }
        return [(1n << 63n) - 1n, Below]
    }
  }

  // Float32 returns the float32 value nearest to x. If x is too small to be
  // represented by a float32 (|x| < math.SmallestNonzeroFloat32), the result is
  // (0, Below) or (-0, Above), respectively, depending on the sign of x. If x is
  // too large to be represented by a float32 (|x| > math.MaxFloat32), the result
  // is (+Inf, Above) or (-Inf, Below), depending on the sign of x.
  public Float32(): [number, Accuracy] {
    return floatOf(this).toFloat(23, 8)
  }

  // Float64 returns the float64 value nearest to x. If x is too small to be
  // represented by a float64 (|x| < math.SmallestNonzeroFloat64), the result is
  // (0, Below) or (-0, Above), respectively, depending on the sign of x. If x is
  // too large to be represented by a float64 (|x| > math.MaxFloat64), the result
  // is (+Inf, Above) or (-Inf, Below), depending on the sign of x.
  public Float64(): [number, Accuracy] {
    return floatOf(this).toFloat(52, 11)
  }

  // toFloat returns the float with a mantissa of mbits bits (excluding the
  // implicit one) and an exponent of ebits bits nearest to x. The result is a
  // float64 that holds the float exactly.
  private toFloat(mbits: number, ebits: number): [number, Accuracy] {
    const x = this
    switch (x._form) {
      case formFinite: {
        const bias = 2 ** (ebits - 1) - 1
        const emin = 1 - bias
        const emax = bias
        const smallest = 2 ** (emin - mbits) // the smallest denormal

        let e = x._exp - 1 // exponent for normal mantissa m with 1.0 <= m < 2.0
        let p = mbits + 1 // precision of normal float
        if (e < emin) {
          // The float is denormal; the precision shrinks with the exponent.
          p = mbits + 1 - emin + e
          if (
            p < 0 ||
            (p === 0 && trailingZeroBits(x._mant) === bitLen(x._mant) - 1)
          ) {
            // underflow to ±0
            return x._neg ? [-0, Above] : [0, Below]
          }
          if (p === 0) {
            // round to ±smallest denormal
            return x._neg ? [-smallest, Below] : [smallest, Above]
          }
        }

        // round
        const r = new Float()
        r._prec = p
        r.Set(x)
        e = r._exp - 1

        // Rounding may have caused r to overflow to ±Inf (rounding never causes
        // underflows to 0).
        if (r._form === formInf || e > emax) {
          return x._neg ? [-Infinity, Below] : [Infinity, Above]
        }
        // e <= emax

        // Determine the number of bits of the result: a denormal has fewer.
        if (e < emin) {
          p = mbits + 1 - emin + e
        } else {
          p = mbits + 1
        }
        const mant = r._mant >> BigInt(bitLen(r._mant) - p)
        const f = Ldexp(Number(mant), r._exp - p)
        return [x._neg ? -f : f, r._acc]
      }
      case formZero:
        return [x._neg ? -0 : 0, Exact]
      default:
        return [x._neg ? -Infinity : Infinity, Exact]
    }
  }

  // Int returns the result of truncating x towards zero; or its approximation
  // if x is an infinity. The result is Exact if x.IsInt(); otherwise it is Below
  // for x > 0, and Above for x < 0. If a non-nil *Int argument z is provided, Int
  // stores the result in z instead of allocating a new Int. If x is an infinity,
  // the result is nil and the accuracy is Below or Above, depending on the
  // sign.
  public Int(z: IntRef): [Int | null, Accuracy] {
    const x = floatOf(this)
    let r: Int | null = z === null ? null : intOf(z)
    if (r === null && x._form <= formFinite) {
      r = new Int()
    }
    switch (x._form) {
      case formFinite: {
        // 0 < |x| < +Inf
        let acc = makeAcc(x._neg)
        if (x._exp <= 0) {
          // 0 < |x| < 1
          return [r!.SetInt64(0n), acc]
        }
        // x._exp > 0

        // 1 <= |x| < +Inf
        // determine minimum required precision for x
        if (x.MinPrec() <= x._exp) {
          acc = Exact
        }
        // shift mantissa as needed
        const allBits = bitLen(x._mant)
        const shift = BigInt(Math.abs(x._exp - allBits))
        const mag = x._exp > allBits ? x._mant << shift : x._mant >> shift
        r!.put(x._neg ? -mag : mag)
        return [r, acc]
      }
      case formZero:
        return [r!.SetInt64(0n), Exact]
      default:
        return [null, makeAcc(x._neg)]
    }
  }

  // Rat returns the rational number corresponding to x; or nil if x is an
  // infinity. The result is Exact if x is not an Inf. If a non-nil *Rat argument
  // z is provided, Rat stores the result in z instead of allocating a new Rat.
  public Rat(z: RatRef): [Rat | null, Accuracy] {
    const x = floatOf(this)
    let r: Rat | null = z === null ? null : ratOf(z)
    if (r === null && x._form <= formFinite) {
      r = new Rat()
    }
    switch (x._form) {
      case formFinite: {
        // 0 < |x| < +Inf
        const allBits = bitLen(x._mant)
        const n = x._neg ? -x._mant : x._mant
        if (x._exp > allBits) {
          return [r!.setQuo(n << BigInt(x._exp - allBits), 1n), Exact]
        }
        return [
          r!.setQuo(n, 1n << BigInt(Math.max(allBits - x._exp, 0))),
          Exact,
        ]
      }
      case formZero:
        return [r!.SetInt64(0n), Exact]
      default:
        return [null, makeAcc(x._neg)]
    }
  }

  // Abs sets z to the (possibly rounded) value |x| (the absolute value of x)
  // and returns z.
  public Abs(x: FloatRef): Float {
    const z = floatOf(this).Set(x)
    z._neg = false
    return z
  }

  // Neg sets z to the (possibly rounded) value of x with its sign negated, and
  // returns z.
  public Neg(x: FloatRef): Float {
    const z = floatOf(this).Set(x)
    z._neg = !z._neg
    return z
  }

  // uadd sets z to the rounded sum |x| + |y|, ignoring the signs of x and y. x
  // and y must not be 0 or Inf.
  private uadd(x: Float, y: Float): void {
    const ex = lsbExp(x)
    const ey = lsbExp(y)
    let m: bigint
    let e: number
    if (ex < ey) {
      m = x._mant + (y._mant << BigInt(ey - ex))
      e = ex
    } else {
      m = (x._mant << BigInt(ex - ey)) + y._mant
      e = ey
    }
    const [mant, s] = fnorm(m)
    this._mant = mant
    this.setExpAndRound(e + bitLen(mant) - s, 0)
  }

  // usub sets z to the rounded difference |x| - |y|, ignoring the signs of x and
  // y. x and y must not be 0 or Inf. |x| must not be less than |y|.
  private usub(x: Float, y: Float): void {
    const ex = lsbExp(x)
    const ey = lsbExp(y)
    let m: bigint
    let e: number
    if (ex < ey) {
      m = x._mant - (y._mant << BigInt(ey - ex))
      e = ex
    } else {
      m = (x._mant << BigInt(ex - ey)) - y._mant
      e = ey
    }
    if (m === 0n) {
      this._acc = Exact
      this._form = formZero
      this._neg = false
      return
    }
    const [mant, s] = fnorm(m)
    this._mant = mant
    this.setExpAndRound(e + bitLen(mant) - s, 0)
  }

  // umul sets z to the rounded product |x| × |y|, ignoring the signs of x and y.
  // x and y must not be 0 or Inf.
  private umul(x: Float, y: Float): void {
    const [mant, s] = fnorm(x._mant * y._mant)
    this._mant = mant
    this.setExpAndRound(x._exp + y._exp - s, 0)
  }

  // uquo sets z to the rounded quotient |x| / |y|, ignoring the signs of x and
  // y. x and y must not be 0 or Inf.
  private uquo(x: Float, y: Float): void {
    const lx = words(bitLen(x._mant))
    const ly = words(bitLen(y._mant))

    // The quotient needs prec + 1 bits plus a word of slack: scale x up so that
    // it has at least n words more than y.
    const n = Math.floor(this._prec / 64) + 1
    const d1 = n - lx + ly
    const xadj = d1 > 0 ? x._mant << BigInt(64 * d1) : x._mant
    const d = words(bitLen(xadj)) - ly

    const q = xadj / y._mant
    const r = xadj % y._mant
    const [mant, s] = fnorm(q)
    this._mant = mant
    const e = x._exp - y._exp - (d - words(bitLen(q))) * 64
    this.setExpAndRound(e - s, r !== 0n ? 1 : 0)
  }

  // ucmp returns -1, 0, or +1, depending on whether |x| < |y|, |x| == |y|, or
  // |x| > |y|. x and y must not be 0 or Inf.
  private ucmp(y: Float): number {
    const x = this
    if (x._exp !== y._exp) {
      return x._exp < y._exp ? -1 : 1
    }
    // Compare the mantissas as fractions: the shorter one is padded with zeros.
    let xm = x._mant
    let ym = y._mant
    const xb = bitLen(xm)
    const yb = bitLen(ym)
    if (xb < yb) {
      xm <<= BigInt(yb - xb)
    } else {
      ym <<= BigInt(xb - yb)
    }
    return (
      xm < ym ? -1
      : xm > ym ? 1
      : 0
    )
  }

  // Add sets z to the rounded sum x+y and returns z. If z's precision is 0, it is
  // changed to the larger of x's or y's precision before the operation. Rounding
  // is performed according to z's precision and rounding mode; and z's accuracy
  // reports the result error relative to the exact (not rounded) result. Add
  // panics with ErrNaN if x and y are infinities with opposite signs. The value
  // of z is undefined in that case.
  public Add(x: FloatRef, y: FloatRef): Float {
    const z = floatOf(this)
    const a = floatOf(x)
    const b = floatOf(y)
    if (z._prec === 0) {
      z._prec = Math.max(a._prec, b._prec)
    }

    if (a._form === formFinite && b._form === formFinite) {
      // x + y (common case)

      // Below we set z._neg = x._neg, and when z aliases y this will change the
      // y operand's sign. This is fine, because if an operand aliases the
      // receiver it'll be overwritten, but we still need its sign in the
      // subtraction case below.
      const yneg = b._neg
      z._neg = a._neg
      if (a._neg === yneg) {
        // x + y == x + y
        // (-x) + (-y) == -(x + y)
        z.uadd(a, b)
      } else if (a.ucmp(b) > 0) {
        // x + (-y) == x - y == -(y - x)
        // (-x) + y == y - x == -(x - y)
        z.usub(a, b)
      } else {
        z._neg = !z._neg
        z.usub(b, a)
      }
      if (
        z._form === formZero &&
        z._mode === ToNegativeInf &&
        z._acc === Exact
      ) {
        z._neg = true
      }
      return z
    }

    if (a._form === formInf && b._form === formInf && a._neg !== b._neg) {
      // +Inf + -Inf
      // -Inf + +Inf
      // value of z is undefined but make sure it's valid
      z._acc = Exact
      z._form = formZero
      z._neg = false
      $.panic(new ErrNaN({ msg: 'addition of infinities with opposite signs' }))
    }

    if (a._form === formZero && b._form === formZero) {
      // ±0 + ±0
      z._acc = Exact
      z._form = formZero
      z._neg = a._neg && b._neg // -0 + -0 == -0
      return z
    }

    if (a._form === formInf || b._form === formZero) {
      // ±Inf + y
      // x + ±0
      return z.Set(a)
    }

    // ±0 + y
    // x + ±Inf
    return z.Set(b)
  }

  // Sub sets z to the rounded difference x-y and returns z. Precision, rounding,
  // and accuracy reporting are as for Add. Sub panics with ErrNaN if x and y are
  // infinities with equal signs. The value of z is undefined in that case.
  public Sub(x: FloatRef, y: FloatRef): Float {
    const z = floatOf(this)
    const a = floatOf(x)
    const b = floatOf(y)
    if (z._prec === 0) {
      z._prec = Math.max(a._prec, b._prec)
    }

    if (a._form === formFinite && b._form === formFinite) {
      // x - y (common case)
      const yneg = b._neg
      z._neg = a._neg
      if (a._neg !== yneg) {
        // x - (-y) == x + y
        // (-x) - y == -(x + y)
        z.uadd(a, b)
      } else if (a.ucmp(b) > 0) {
        // x - y == x - y
        // (-x) - (-y) == -(x - y)
        z.usub(a, b)
      } else {
        // x - y == -(y - x)
        // (-x) - (-y) == y - x == -(x - y)
        z._neg = !z._neg
        z.usub(b, a)
      }
      if (
        z._form === formZero &&
        z._mode === ToNegativeInf &&
        z._acc === Exact
      ) {
        z._neg = true
      }
      return z
    }

    if (a._form === formInf && b._form === formInf && a._neg === b._neg) {
      // +Inf - +Inf
      // -Inf - -Inf
      // value of z is undefined but make sure it's valid
      z._acc = Exact
      z._form = formZero
      z._neg = false
      $.panic(new ErrNaN({ msg: 'subtraction of infinities with equal signs' }))
    }

    if (a._form === formZero && b._form === formZero) {
      // ±0 - ±0
      z._acc = Exact
      z._form = formZero
      z._neg = a._neg && !b._neg // -0 - +0 == -0
      return z
    }

    if (a._form === formInf || b._form === formZero) {
      // ±Inf - y
      // x - ±0
      return z.Set(a)
    }

    // ±0 - y
    // x - ±Inf
    return z.Neg(b)
  }

  // Mul sets z to the rounded product x*y and returns z. Precision, rounding, and
  // accuracy reporting are as for Add. Mul panics with ErrNaN if one operand is
  // zero and the other operand an infinity. The value of z is undefined in that
  // case.
  public Mul(x: FloatRef, y: FloatRef): Float {
    const z = floatOf(this)
    const a = floatOf(x)
    const b = floatOf(y)
    if (z._prec === 0) {
      z._prec = Math.max(a._prec, b._prec)
    }

    z._neg = a._neg !== b._neg

    if (a._form === formFinite && b._form === formFinite) {
      // x * y (common case)
      z.umul(a, b)
      return z
    }

    z._acc = Exact
    if (
      (a._form === formZero && b._form === formInf) ||
      (a._form === formInf && b._form === formZero)
    ) {
      // ±0 * ±Inf
      // ±Inf * ±0
      // value of z is undefined but make sure it's valid
      z._form = formZero
      z._neg = false
      $.panic(new ErrNaN({ msg: 'multiplication of zero with infinity' }))
    }

    if (a._form === formInf || b._form === formInf) {
      // ±Inf * y
      // x * ±Inf
      z._form = formInf
      return z
    }

    // ±0 * y
    // x * ±0
    z._form = formZero
    return z
  }

  // Quo sets z to the rounded quotient x/y and returns z. Precision, rounding,
  // and accuracy reporting are as for Add. Quo panics with ErrNaN if both
  // operands are zero or infinities. The value of z is undefined in that case.
  public Quo(x: FloatRef, y: FloatRef): Float {
    const z = floatOf(this)
    const a = floatOf(x)
    const b = floatOf(y)
    if (z._prec === 0) {
      z._prec = Math.max(a._prec, b._prec)
    }

    z._neg = a._neg !== b._neg

    if (a._form === formFinite && b._form === formFinite) {
      // x / y (common case)
      z.uquo(a, b)
      return z
    }

    z._acc = Exact
    if (
      (a._form === formZero && b._form === formZero) ||
      (a._form === formInf && b._form === formInf)
    ) {
      // ±0 / ±0
      // ±Inf / ±Inf
      // value of z is undefined but make sure it's valid
      z._form = formZero
      z._neg = false
      $.panic(
        new ErrNaN({ msg: 'division of zero by zero or infinity by infinity' }),
      )
    }

    if (a._form === formZero || b._form === formInf) {
      // ±0 / y
      // x / ±Inf
      z._form = formZero
      return z
    }

    // x / ±0
    // ±Inf / y
    z._form = formInf
    return z
  }

  // Cmp compares x and y and returns:
  //
  //	-1 if x <  y
  //	 0 if x == y (incl. -0 == 0, -Inf == -Inf, and +Inf == +Inf)
  //	+1 if x >  y
  public Cmp(y: FloatRef): number {
    const x = floatOf(this)
    const b = floatOf(y)
    const mx = x.ord()
    const my = b.ord()
    if (mx !== my) {
      return mx < my ? -1 : 1
    }
    // mx == my
    switch (mx) {
      case -1:
        return b.ucmp(x)
      case 1:
        return x.ucmp(b)
    }
    return 0
  }

  // ord classifies x and returns:
  //
  //	-2 if -Inf == x
  //	-1 if -Inf < x < 0
  //	 0 if x == 0 (signed or unsigned)
  //	+1 if 0 < x < +Inf
  //	+2 if x == +Inf
  private ord(): number {
    let m: number
    switch (this._form) {
      case formFinite:
        m = 1
        break
      case formZero:
        return 0
      default:
        m = 2
    }
    return this._neg ? -m : m
  }

  // Sqrt sets z to the rounded square root of x, and returns it. If z's
  // precision is 0, it is changed to x's precision before the operation.
  // Rounding is performed according to z's precision and rounding mode, but z's
  // accuracy is not computed. Specifically, the result of z.Acc() is undefined.
  //
  // The function panics if z < 0. The value of z is undefined in that case.
  public Sqrt(x: FloatRef): Float {
    const z = floatOf(this)
    const f = floatOf(x)
    if (z._prec === 0) {
      z._prec = f._prec
    }

    if (f.Sign() === -1) {
      $.panic(new ErrNaN({ msg: 'square root of negative operand' }))
    }

    // Handle ±0 and +Inf.
    if (f._form !== formFinite) {
      z._acc = Exact
      z._form = f._form
      z._neg = f._neg // IEEE754-2008 requires √±0 = ±0
      return z
    }

    // Reduce to the mantissa in [0.25, 1): √x = √m × 2**(b/2) with b even.
    const prec = z._prec
    const b = f.MantExp(z)
    z._prec = prec

    switch (b % 2) {
      case 1:
        z._exp++
        break
      case -1:
        z._exp--
        break
    }
    // 0.25 <= z < 2.0

    // Solving 1/x² - z = 0 avoids Quo calls and is faster, especially for high
    // precisions.
    z.sqrtInverse(z)

    // Re-attach halved exponent.
    return z.SetMantExp(z, Math.trunc(b / 2))
  }

  // Compute √x (to z.prec precision) by solving 1/t² - x = 0 for t (using
  // Newton's method), and then inverting.
  private sqrtInverse(x: Float): void {
    const u = new Float()
    const v = new Float()
    const three = NewFloat(3)
    const ng = (t: Float): Float => {
      u._prec = t._prec
      v._prec = t._prec
      u.Mul(t, t) // u = t²
      u.Mul(x, u) //   = xt²
      v.Sub(three, u) // v = 3 - xt²
      u.Mul(t, v) // u = t(3 - xt²)
      u._exp-- //   = ½t(3 - xt²)
      return t.Set(u)
    }

    const [xf] = x.Float64()
    let sqi = new Float()
    sqi.SetFloat64(1 / Math.sqrt(xf))
    for (const prec = this._prec + 32; sqi._prec < prec; ) {
      sqi._prec *= 2
      sqi = ng(sqi)
    }
    // sqi = 1/√x

    // x/√x = √x
    this.Mul(x, sqi)
  }

  // Text converts the floating-point number x to a string according to the given
  // format and precision prec. The format is one of:
  //
  //	'e'	-d.dddde±dd, decimal exponent, at least two (possibly 0) exponent digits
  //	'E'	-d.ddddE±dd, decimal exponent, at least two (possibly 0) exponent digits
  //	'f'	-ddddd.dddd, no exponent
  //	'g'	like 'e' for large exponents, like 'f' otherwise
  //	'G'	like 'E' for large exponents, like 'f' otherwise
  //	'x'	-0xd.dddddp±dd, hexadecimal mantissa, decimal power of two exponent
  //	'p'	-0x.dddp±dd, hexadecimal mantissa, decimal power of two exponent (non-standard)
  //	'b'	-ddddddp±dd, decimal mantissa, decimal power of two exponent (non-standard)
  //
  // For the power-of-two exponent formats, the mantissa is printed in normalized
  // form. Format 'x' uses a hexadecimal mantissa in the range [1, 2), and format
  // 'p' uses one in the range [0.5, 1). Format 'b' uses a decimal integer
  // mantissa with prec bits.
  //
  // The precision prec controls the number of digits (excluding the exponent)
  // printed by the 'e', 'E', 'f', 'g', 'G', and 'x' formats. For 'e', 'E', 'f',
  // and 'x', it is the number of digits after the decimal point. For 'g' and 'G'
  // it is the total number of digits. A negative precision selects the smallest
  // number of decimal digits necessary to identify the value x uniquely using x.Prec()
  // mantissa bits. The prec value is ignored for the 'b' and 'p' formats.
  public Text(format: number, prec: number): string {
    return appendFloat(floatOf(this), format, prec)
  }

  // String formats x like x.Text('g', 10). (String must be called explicitly,
  // Float.Format does not support %s verb.)
  public String(): string {
    return appendFloat(floatOf(this), 103, 10)
  }

  // Append appends to buf the string form of the floating-point number x, as
  // generated by x.Text, and returns the extended buffer.
  public Append(
    buf: $.Slice<number>,
    fmt: number,
    prec: number,
  ): $.Slice<number> {
    return $.appendSlice(
      buf,
      $.stringToBytes(appendFloat(floatOf(this), fmt, prec)),
    )
  }

  // Format implements fmt.Formatter. It accepts all the regular formats for
  // floating-point numbers ('b', 'e', 'E', 'f', 'F', 'g', 'G', 'x') as well as
  // 'p' and 'v'. See (*Float).Text for the interpretation of 'p'. The 'v' format
  // is handled like 'g'. Format also supports specification of the minimum
  // precision in digits, the output field width, as well as the format flags
  // '+' and ' ' for sign control, '0' for space padding, and '-' for left or
  // right justification. See the fmt package for details.
  public Format(s: State, format: number): void {
    const x = floatOf(this)
    let [prec, hasPrec] = s.Precision()
    if (!hasPrec) {
      prec = 6 // default precision for 'e', 'f'
    }

    switch (format) {
      case 101: // 'e'
      case 69: // 'E'
      case 102: // 'f'
      case 98: // 'b'
      case 112: // 'p'
      case 120: // 'x'
        break
      case 70: // 'F'
        format = 102 // 'f'
        break
      case 118: // 'v'
        format = 103 // 'g'
      // fallthrough
      case 103: // 'g'
      case 71: // 'G'
        if (!hasPrec) {
          prec = -1 // default precision for 'g', 'G'
        }
        break
      default:
        writeString(
          s,
          '%!' +
            String.fromCodePoint(format) +
            '(*big.Float=' +
            x.String() +
            ')',
        )
        return
    }
    let buf = appendFloat(x, format, prec)
    if (buf.length === 0) {
      buf = '?' // should never happen, but don't crash
    }
    // len(buf) > 0

    let sign = ''
    switch (true) {
      case buf[0] === '-':
        sign = '-'
        buf = buf.slice(1)
        break
      case buf[0] === '+':
        // +Inf
        sign = '+'
        if (s.Flag(32)) {
          sign = ' '
        }
        buf = buf.slice(1)
        break
      case s.Flag(43):
        sign = '+'
        break
      case s.Flag(32):
        sign = ' '
        break
    }

    let padding = 0
    const [width, hasWidth] = s.Width()
    if (hasWidth && width > sign.length + buf.length) {
      padding = width - sign.length - buf.length
    }

    switch (true) {
      case s.Flag(48) && !x.IsInf():
        // 0-padding on left
        writeString(s, sign + '0'.repeat(padding) + buf)
        break
      case s.Flag(45):
        // padding on right
        writeString(s, sign + buf + ' '.repeat(padding))
        break
      default:
        // padding on left
        writeString(s, ' '.repeat(padding) + sign + buf)
    }
  }

  // SetString sets z to the value of s and returns z and a boolean indicating
  // success. s must be a floating-point number of the same format as accepted
  // by Parse, with base argument 0. The entire string (not just a prefix) must
  // be valid for success. If the operation failed, the value of z is undefined
  // but the returned value is nil.
  public SetString(s: string): [Float | null, boolean] {
    const [f, , err] = floatOf(this).Parse(s, 0)
    if (err === null) {
      return [f, true]
    }
    return [null, false]
  }

  // scan reads a floating-point number from r in the given base into z and
  // returns z, the base the mantissa was read in, and any error.
  private scan(
    r: ByteReader,
    base: number,
  ): [Float | null, number, $.GoError | null] {
    const z = this
    const prec = z._prec === 0 ? 64 : z._prec

    // A reasonable value in case of an error.
    z._form = formZero

    // sign
    const [neg, signErr] = scanSign(r)
    z._neg = neg
    if (signErr !== null) {
      return [null, 0, signErr]
    }

    // mantissa
    const res = scanNat(r, base, true)
    if (res.err !== null) {
      return [null, res.base, res.err]
    }
    const b = res.base

    // exponent
    const [exp, ebase, expErr] = scanExponent(r, true, base === 0)
    if (expErr !== null) {
      return [null, b, expErr]
    }

    // special-case 0
    if (res.mant === 0n) {
      z._prec = prec
      z._acc = Exact
      z._form = formZero
      return [z, b, null]
    }
    // len(z.mant) > 0

    // The mantissa may have a radix point (fcount <= 0) and there may be a
    // nonzero exponent (exp != 0). The actual value is: mant × 2**exp2 × 5**exp5.
    // exp2 is the binary exponent of the normalized mantissa; exp5 collects the
    // decimal exponent that remains to be applied by multiplication.
    let exp2 = BigInt(bitLen(res.mant))
    let exp5 = 0n

    if (res.count < 0) {
      // The mantissa has a radix point ddd.dddd; adjust the exponent for it.
      const d = BigInt(res.count)
      switch (b) {
        case 10:
          exp5 = d
          exp2 += d // 10**e == 5**e * 2**e
          break
        case 2:
          exp2 += d
          break
        case 8:
          exp2 += d * 3n // octal digits are 3 bits each
          break
        case 16:
          exp2 += d * 4n // hexadecimal digits are 4 bits each
          break
        default:
          $.panic('unexpected mantissa base')
      }
    }

    switch (ebase) {
      case 10:
        exp5 += exp
        exp2 += exp // 10**e == 5**e * 2**e
        break
      case 2:
        exp2 += exp
        break
      default:
        $.panic('unexpected exponent base')
    }

    // Set the value, rounding if necessary, now that the exponent is known.
    if (exp2 < BigInt(MinExp) || exp2 > BigInt(MaxExp)) {
      return [null, b, $.newError('exponent overflow')]
    }
    z._mant = fnorm(res.mant)[0]
    z._prec = prec
    z._form = formFinite
    z._exp = Number(exp2)

    if (exp5 === 0n) {
      // no decimal exponent contribution
      z.round(0)
      return [z, b, null]
    }
    // exp5 != 0

    // apply 5**exp5
    const p = new Float().SetPrec(z.Prec() + 64) // use more bits for p
    if (exp5 < 0n) {
      z.Quo(z, p.pow5(-exp5))
    } else {
      z.Mul(z, p.pow5(exp5))
    }
    return [z, b, null]
  }

  // pow5 sets z to 5**n and returns z. n must not be negative.
  private pow5(n: bigint): Float {
    const m = BigInt(pow5tab.length - 1)
    if (n <= m) {
      return this.SetUint64(pow5tab[Number(n)])
    }
    // n > m

    this.SetUint64(pow5tab[Number(m)])
    n -= m

    // use more bits for f than for z
    const f = new Float().SetPrec(this.Prec() + 64).SetUint64(5n)

    for (; n > 0n; n >>= 1n) {
      if ((n & 1n) !== 0n) {
        this.Mul(this, f)
      }
      f.Mul(f, f)
    }
    return this
  }

  // Parse parses s which must contain a text representation of a floating-point
  // number with a mantissa in the given conversion base (the exponent is always
  // a decimal number), or a string representing an infinite value.
  //
  // For base 0, an underscore character “_” may appear between a base prefix and
  // an adjacent digit, and between successive digits; such underscores do not
  // change the value of the number, or the returned digit count. Incorrect
  // placement of underscores is reported as an error if there are no other
  // errors. If base != 0, underscores are not recognized and thus terminate
  // scanning like any other character that is not a valid radix point or digit.
  //
  // It sets z to the (possibly rounded) value of the corresponding floating-
  // point value, and returns z, the actual base b, and an error err, if any.
  // The entire string (not just a prefix) must be consumed for success. If z's
  // precision is 0, it is changed to 64 before rounding takes effect. The number
  // must be of the form:
  //
  //	number    = [ sign ] ( float | "inf" | "Inf" ) .
  //	sign      = "+" | "-" .
  //	float     = ( mantissa | prefix pmantissa ) [ exponent ] .
  //	prefix    = "0" [ "b" | "B" | "o" | "O" | "x" | "X" ] .
  //	mantissa  = digits "." [ digits ] | digits | "." digits .
  //	pmantissa = [ "_" ] digits "." [ digits ] | [ "_" ] digits | "." digits .
  //	exponent  = ( "e" | "E" | "p" | "P" ) [ sign ] digits .
  //	digits    = digit { [ "_" ] digit } .
  //	digit     = "0" ... "9" | "a" ... "z" | "A" ... "Z" .
  //
  // The base argument must be 0, 2, 8, 10, or 16. Providing an invalid base
  // argument will lead to a run-time panic.
  //
  // For base 0, the number prefix determines the actual base: A prefix of “0b”
  // or “0B” selects base 2, “0o” or “0O” selects base 8, and “0x” or “0X”
  // selects base 16. Otherwise, the actual base is 10 and no prefix is accepted.
  // The octal prefix "0" is not supported (a leading "0" is simply considered a
  // "0").
  //
  // A "p" or "P" exponent indicates a base 2 (rather than base 10) exponent; for
  // instance, "0x1.fffffffffffffp1023" (using base 0) represents the maximum
  // float64 value. For hexadecimal mantissae, the exponent character must be one
  // of 'p' or 'P', if there is an exponent; otherwise it will be considered part
  // of the mantissa (e.g., "0x1.fffffffffffffp1023" is parsed with base 16, but
  // "0x1.e" is the mantissa 0x1.e).
  //
  // The returned *Float f is nil and the value of z is valid but not defined if
  // an error is reported.
  public Parse(
    s: string,
    base: number,
  ): [Float | null, number, $.GoError | null] {
    const z = floatOf(this)
    // scan doesn't handle ±Inf
    if (s === 'Inf' || s === 'inf') {
      return [z.SetInf(false), 0, null]
    }
    if (
      s.length === 4 &&
      (s[0] === '+' || s[0] === '-') &&
      (s.slice(1) === 'Inf' || s.slice(1) === 'inf')
    ) {
      return [z.SetInf(s[0] === '-'), 0, null]
    }

    const r = new StringReader(s)
    const res = z.scan(r, base)
    if (res[2] !== null) {
      return res
    }
    // entire string must have been consumed
    const ch = r.read()
    if (ch >= 0) {
      return [
        res[0],
        res[1],
        $.newError('expected end of string, found ' + quoteByte(ch)),
      ]
    }
    if (r.err !== null && r.err.Error() !== 'EOF') {
      return [res[0], res[1], r.err]
    }
    return res
  }

  // Scan is a support routine for fmt.Scanner; it sets z to the value of the
  // scanned number. It accepts formats whose verbs are supported by
  // fmt.Fscan for floating point values, which are:
  // 'b' (binary), 'e', 'E', 'f', 'F', 'g' and 'G'.
  // Scan doesn't handle ±Inf.
  public Scan(s: ScanState, _ch: number): $.GoError | null {
    s.SkipSpace()
    return floatOf(this).scan(new ScanReader(s), 0)[2]
  }

  // GobEncode implements the gob.GobEncoder interface. The Float value and all
  // its attributes (precision, rounding mode, accuracy) are marshaled.
  public GobEncode(): [Uint8Array, $.GoError | null] {
    const x = floatOf(this)
    // sz is version + mode|acc|form|neg (3+2+2+1 bit) + prec
    let n = 0 // number of mantissa words
    if (x._form === formFinite) {
      // The required mantissa length in words for the given precision.
      n = Math.min(words(x._prec), words(bitLen(x._mant)))
    }
    const buf = new Uint8Array(6 + (x._form === formFinite ? 4 + 8 * n : 0))
    const view = new DataView(buf.buffer)
    buf[0] = floatGobVersion
    let b =
      ((x._mode & 7) << 5) | (((x._acc + 1) & 3) << 3) | ((x._form & 3) << 1)
    if (x._neg) {
      b |= 1
    }
    buf[1] = b
    view.setUint32(2, x._prec)
    if (x._form === formFinite) {
      view.setUint32(6, x._exp >>> 0)
      // cut off unused trailing words
      let m = x._mant >> BigInt(bitLen(x._mant) - 64 * n)
      for (let i = 10 + 8 * n - 1; i >= 10; i--) {
        buf[i] = Number(m & 0xffn)
        m >>= 8n
      }
    }
    return [buf, null]
  }

  // GobDecode implements the gob.GobDecoder interface. The result is rounded per
  // the precision and rounding mode of z unless z's precision is 0, in which
  // case z is set exactly to the decoded value.
  public GobDecode(buf: $.Slice<number>): $.GoError | null {
    const z = floatOf(this)
    const bytes = $.bytesToUint8Array(buf)
    if (bytes.length === 0) {
      // Other side sent a nil or default value.
      z.__goscriptAssign(new Float())
      return null
    }
    if (bytes.length < 6) {
      return $.newError('Float.GobDecode: buffer too small')
    }
    if (bytes[0] !== floatGobVersion) {
      return $.newError(
        'Float.GobDecode: encoding version ' + bytes[0] + ' not supported',
      )
    }

    const oldPrec = z._prec
    const oldMode = z._mode

    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.length)
    const b = bytes[1]
    z._mode = (b >> 5) & 7
    z._acc = ((b >> 3) & 3) - 1
    z._form = (b >> 1) & 3
    z._neg = (b & 1) !== 0
    z._prec = view.getUint32(2)

    if (z._form === formFinite) {
      if (bytes.length < 10) {
        return $.newError(
          'Float.GobDecode: buffer too small for finite form float',
        )
      }
      z._exp = view.getInt32(6)
      z._mant = valueOfBytes(bytes.subarray(10))
    }

    if (oldPrec !== 0) {
      z._mode = oldMode
      z.SetPrec(oldPrec)
    }

    const msg = z.validate()
    if (msg !== '') {
      return $.newError('Float.GobDecode: ' + msg)
    }
    return null
  }

  // validate returns a description of how a finite z is malformed, or an empty
  // string.
  private validate(): string {
    if (this._form !== formFinite) {
      return ''
    }
    if (this._mant === 0n) {
      return 'nonzero finite number with empty mantissa'
    }
    const bits = bitLen(this._mant)
    if (bits % 64 !== 0) {
      const top = this._mant >> BigInt(64 * (words(bits) - 1))
      return (
        'msb not set in last word 0x' +
        top.toString(16) +
        ' of ' +
        appendFloat(this, 112, 0)
      )
    }
    if (this._prec === 0) {
      return 'zero precision finite number'
    }
    return ''
  }

  // AppendText implements the encoding.TextAppender interface. Only the Float
  // value is marshaled (in the 'g' format with the smallest number of digits
  // that is needed to identify the value uniquely), not its precision or
  // accuracy.
  public AppendText(b: $.Slice<number>): [$.Slice<number>, $.GoError | null] {
    return [
      $.appendSlice(b, $.stringToBytes(appendFloat(floatOf(this), 103, -1))),
      null,
    ]
  }

  // MarshalText implements the encoding.TextMarshaler interface.
  public MarshalText(): [Uint8Array, $.GoError | null] {
    return [$.stringToBytes(appendFloat(floatOf(this), 103, -1)), null]
  }

  // UnmarshalText implements the encoding.TextUnmarshaler interface. The result
  // is rounded per the precision and rounding mode of z. If z's precision is 0,
  // it is changed to 64 before rounding takes effect.
  public UnmarshalText(text: $.Slice<number>): $.GoError | null {
    const [, , err] = floatOf(this).Parse($.bytesToString(text), 0)
    if (err !== null) {
      return $.newError(
        'math/big: cannot unmarshal ' +
          quoteText(text) +
          ' into a *big.Float (' +
          err.Error() +
          ')',
      )
    }
    return null
  }
}

Float.__typeInfo = $.registerStructType('big.Float', new Float(), [], Float)

// NewFloat allocates and returns a new Float set to x, with precision 53 and
// rounding mode ToNearestEven. NewFloat panics with ErrNaN if x is a NaN.
export function NewFloat(x: number): Float {
  if (Number.isNaN(x)) {
    $.panic(new ErrNaN({ msg: 'NewFloat(NaN)' }))
  }
  return new Float().SetFloat64(x)
}

// ParseFloat is like f.Parse(s, base) with f set to the given precision and
// rounding mode.
export function ParseFloat(
  s: string,
  base: number,
  prec: number,
  mode: RoundingMode,
): [Float | null, number, $.GoError | null] {
  return new Float().SetPrec(prec).SetMode(mode).Parse(s, base)
}

// float64 power of 5 table: pow5tab[i] == 5**i for the exponents that fit a
// uint64.
const pow5tab = Array.from({ length: 28 }, (_, i) => 5n ** BigInt(i))

// quoteByte formats a byte as a Go character literal, as %q does.
function quoteByte(ch: number): string {
  switch (ch) {
    case 7:
      return "'\\a'"
    case 8:
      return "'\\b'"
    case 9:
      return "'\\t'"
    case 10:
      return "'\\n'"
    case 11:
      return "'\\v'"
    case 12:
      return "'\\f'"
    case 13:
      return "'\\r'"
    case 39:
      return "'\\''"
    case 92:
      return "'\\\\'"
  }
  if (ch < 32 || ch === 127) {
    return "'\\x" + ch.toString(16).padStart(2, '0') + "'"
  }
  if (ch >= 128 && ch <= 160) {
    return "'\\u" + ch.toString(16).padStart(4, '0') + "'"
  }
  return "'" + String.fromCharCode(ch) + "'"
}

// A decimal represents an unsigned floating-point number in decimal
// representation. The value of a non-zero decimal d is d.mant × 10**(d.exp -
// len(d.mant)), where mant holds the decimal digits without trailing zeros. A
// zero decimal has an empty mant.
class Decimal {
  public mant = ''
  public exp = 0

  // at returns the digit at index i, or '0' beyond the digits.
  public at(i: number): string {
    return i >= 0 && i < this.mant.length ? this.mant[i] : '0'
  }

  // init initializes x to the decimal representation of m × 2**shift.
  public init(m: bigint, shift: number): void {
    if (m === 0n) {
      this.mant = ''
      this.exp = 0
      return
    }

    // Remove the trailing zero bits that a negative shift would need decimal
    // digits for.
    if (shift < 0) {
      const s = Math.min(-shift, trailingZeroBits(m))
      m >>= BigInt(s)
      shift += s
    }

    // m × 2**shift is the integer m << shift, or the fraction
    // m × 5**-shift / 10**-shift.
    let digits: string
    if (shift >= 0) {
      digits = (m << BigInt(shift)).toString()
      this.exp = digits.length
    } else {
      digits = (m * 5n ** BigInt(-shift)).toString()
      this.exp = digits.length + shift
    }
    this.mant = digits.replace(/0+$/, '')
  }

  // shouldRoundUp reports if x should be rounded up if shortened to n digits.
  // n must be a valid index for x.mant.
  private shouldRoundUp(n: number): boolean {
    if (this.mant[n] === '5' && n + 1 === this.mant.length) {
      // exactly halfway - round to even
      return n > 0 && (Number(this.mant[n - 1]) & 1) !== 0
    }
    // not halfway - digit tells all (x.mant has no trailing zeros)
    return this.mant[n] >= '5'
  }

  // round sets x to (at most) n mantissa digits by rounding it to the nearest
  // even value with n (or fewer) mantissa digits. If n < 0 or x remains
  // unchanged, round does nothing.
  public round(n: number): void {
    if (n < 0 || n >= this.mant.length) {
      return // nothing to do
    }

    if (this.shouldRoundUp(n)) {
      this.roundUp(n)
    } else {
      this.roundDown(n)
    }
  }

  // roundUp sets x to (at most) n mantissa digits by rounding it up.
  public roundUp(n: number): void {
    if (n < 0 || n >= this.mant.length) {
      return // nothing to do
    }
    // 0 <= n < len(x.mant)

    // find first digit < '9'
    while (n > 0 && this.mant[n - 1] >= '9') {
      n--
    }

    if (n === 0) {
      // all digits are '9's => round up to '1' and update exponent
      this.mant = '1'
      this.exp++
      return
    }

    // n > 0 && x.mant[n-1] < '9'
    this.mant =
      this.mant.slice(0, n - 1) +
      String.fromCharCode(this.mant.charCodeAt(n - 1) + 1)
  }

  // roundDown sets x to (at most) n mantissa digits by rounding it down.
  public roundDown(n: number): void {
    if (n < 0 || n >= this.mant.length) {
      return // nothing to do
    }
    this.mant = this.mant.slice(0, n).replace(/0+$/, '')
    if (this.mant === '') {
      this.exp = 0
    }
  }
}

// roundShortest rounds d (= x) to the shortest number of digits that
// uniquely identifies x at the precision of x, going between the decimal
// representations of the nearest neighbors.
function roundShortest(d: Decimal, x: Float): void {
  // If used correctly, decimal rounding is only needed for finite x.
  if (d.mant.length === 0) {
    return
  }

  // 1) Compute normalized mantissa mant and exponent exp for x such that the
  // lsb of mant corresponds to 1/2 ulp for the precision of x (i.e., for mant
  // we want x.prec + 1 bits).
  let mant = x._mant
  let exp = x._exp - bitLen(mant)
  const s = bitLen(mant) - (x._prec + 1)
  if (s < 0) {
    mant <<= BigInt(-s)
  } else if (s > 0) {
    mant >>= BigInt(s)
  }
  exp += s
  // x = mant * 2**exp with lsb(mant) == 1/2 ulp of x
  // half an ulp of x is 2**(exp-1)

  // 2) Compute lower bound by subtracting 1/2 ulp.
  const lower = new Decimal()
  lower.init(mant - 1n, exp)

  // 3) Compute upper bound by adding 1/2 ulp.
  const upper = new Decimal()
  upper.init(mant + 1n, exp)

  // The upper and lower bounds are possible outputs only if the original
  // mantissa is even, so that ToNearestEven rounding would round to the
  // original mantissa. Otherwise, the bounds are excluded.
  const inclusive = (mant & 2n) === 0n // test bit 1 since original mantissa was shifted by 1

  // Now we can figure out the minimum number of digits required. Walk along
  // until d has distinguished itself from upper and lower.
  for (let i = 0; i < d.mant.length; i++) {
    const m = d.mant[i]
    const l = lower.at(i)
    const u = upper.at(i)

    // Okay to round down (truncate) if lower has a different digit or if lower
    // is inclusive and is exactly the result of rounding down (i.e., and we
    // have reached the final digit of lower).
    const okdown = l !== m || (inclusive && i + 1 === lower.mant.length)

    // Okay to round up if upper has a different digit and either upper is
    // inclusive or upper is bigger than the result of rounding up.
    const okup =
      m !== u &&
      (inclusive ||
        m.charCodeAt(0) + 1 < u.charCodeAt(0) ||
        i + 1 < upper.mant.length ||
        (i >= upper.mant.length && m < '9'))

    // If it's okay to do either, then round to the nearest one. If it's okay
    // to do only one, do it.
    if (okdown && okup) {
      d.round(i + 1)
      return
    }
    if (okdown) {
      d.roundDown(i + 1)
      return
    }
    if (okup) {
      d.roundUp(i + 1)
      return
    }
  }
}

// appendFloat formats x like (*Float).Append.
function appendFloat(x: Float, fmt: number, prec: number): string {
  // sign
  let buf = ''
  if (x._neg) {
    buf += '-'
  }

  // Inf
  if (x._form === formInf) {
    if (!x._neg) {
      buf += '+'
    }
    return buf + 'Inf'
  }

  // pick off easy formats
  switch (fmt) {
    case 98: // 'b'
      return buf + fmtB(x)
    case 112: // 'p'
      return buf + fmtP(x)
    case 120: // 'x'
      return buf + fmtX(x, prec)
  }

  // Algorithm:
  //   1) convert Float to multiprecision decimal
  //   2) round to desired precision
  //   3) read digits out and format

  // 1) convert Float to multiprecision decimal
  const d = new Decimal() // == 0.0
  if (x._form === formFinite) {
    // x != 0
    d.init(x._mant, x._exp - bitLen(x._mant))
  }

  // 2) round to desired precision
  let shortest = false
  if (prec < 0) {
    shortest = true
    roundShortest(d, x)
    // Precision for shortest representation mode.
    switch (fmt) {
      case 101: // 'e'
      case 69: // 'E'
        prec = d.mant.length - 1
        break
      case 102: // 'f'
        prec = Math.max(d.mant.length - d.exp, 0)
        break
      case 103: // 'g'
      case 71: // 'G'
        prec = d.mant.length
        break
    }
  } else {
    // round appropriately
    switch (fmt) {
      case 101: // 'e'
      case 69: // 'E'
        // one digit before and number of digits after decimal point
        d.round(1 + prec)
        break
      case 102: // 'f'
        // number of digits before and after decimal point
        d.round(d.exp + prec)
        break
      case 103: // 'g'
      case 71: // 'G'
        if (prec === 0) {
          prec = 1
        }
        d.round(prec)
        break
    }
  }

  // 3) read digits out and format
  switch (fmt) {
    case 101: // 'e'
    case 69: // 'E'
      return buf + fmtE(fmt, prec, d)
    case 102: // 'f'
      return buf + fmtF(prec, d)
    case 103: // 'g'
    case 71: {
      // 'G'
      // trim trailing fractional zeros in %e format
      let eprec = prec
      if (eprec > d.mant.length && d.mant.length >= d.exp) {
        eprec = d.mant.length
      }
      // %e is used if the exponent from the conversion is less than -4 or
      // greater than or equal to the precision. If precision was the shortest
      // possible, use precision 6 for this decision.
      if (shortest) {
        eprec = 6
      }
      const exp = d.exp - 1
      if (exp < -4 || exp >= eprec) {
        if (prec > d.mant.length) {
          prec = d.mant.length
        }
        return buf + fmtE(fmt - 2, prec - 1, d)
      }
      if (prec > d.exp) {
        prec = d.mant.length
      }
      return buf + fmtF(Math.max(prec - d.exp, 0), d)
    }
  }

  // unknown format
  if (x._neg) {
    buf = buf.slice(0, -1) // sign was added prematurely - remove it again
  }
  return buf + '%' + String.fromCharCode(fmt)
}

// fmtE formats d in %e format with prec digits after the decimal point, using
// the exponent letter fmt.
function fmtE(fmt: number, prec: number, d: Decimal): string {
  // first digit
  let buf = d.mant.length > 0 ? d.mant[0] : '0'

  // .moredigits
  if (prec > 0) {
    buf += '.'
    let i = 1
    const m = Math.min(d.mant.length, prec + 1)
    if (i < m) {
      buf += d.mant.slice(i, m)
      i = m
    }
    for (; i <= prec; i++) {
      buf += '0'
    }
  }

  // e±
  buf += String.fromCharCode(fmt)
  let exp = 0
  if (d.mant.length > 0) {
    exp = d.exp - 1 // -1 because first digit was printed before '.'
  }
  if (exp < 0) {
    buf += '-'
    exp = -exp
  } else {
    buf += '+'
  }

  // dd...d
  if (exp < 10) {
    buf += '0' // at least 2 exponent digits
  }
  return buf + exp
}

// fmtF formats d in %f format with prec digits after the decimal point.
function fmtF(prec: number, d: Decimal): string {
  // integer, padded with zeros as needed
  let buf: string
  if (d.exp > 0) {
    const m = Math.min(d.mant.length, d.exp)
    buf = d.mant.slice(0, m) + '0'.repeat(d.exp - m)
  } else {
    buf = '0'
  }

  // fraction
  if (prec > 0) {
    buf += '.'
    for (let i = 0; i < prec; i++) {
      buf += d.at(d.exp + i)
    }
  }
  return buf
}

// fmtB formats x in the "p" format with a decimal mantissa of x._prec bits.
function fmtB(x: Float): string {
  if (x._form === formZero) {
    return '0'
  }

  // adjust mantissa to use exactly x.prec bits
  let m = x._mant
  const w = bitLen(m)
  if (w < x._prec) {
    m <<= BigInt(x._prec - w)
  } else if (w > x._prec) {
    m >>= BigInt(w - x._prec)
  }

  const e = x._exp - x._prec
  return m.toString() + 'p' + (e >= 0 ? '+' : '') + e
}

// fmtX formats x in the "%x" hexadecimal format with prec digits after the
// point.
function fmtX(x: Float, prec: number): string {
  if (x._form === formZero) {
    let buf = '0x0'
    if (prec > 0) {
      buf += '.' + '0'.repeat(prec)
    }
    return buf + 'p+00'
  }

  // round mantissa to n bits
  let n: number
  if (prec < 0) {
    n = 1 + Math.floor((x.MinPrec() - 1 + 3) / 4) * 4 // round MinPrec up to 1 mod 4
  } else {
    n = 1 + 4 * prec
  }
  // n%4 == 1
  const r = new Float().SetPrec(n).SetMode(x._mode).Set(x)

  // adjust mantissa to use exactly n bits
  let m = r._mant
  const w = bitLen(m)
  if (w < n) {
    m <<= BigInt(n - w)
  } else if (w > n) {
    m >>= BigInt(w - n)
  }
  let exp = r._exp - 1

  const hm = m.toString(16)

  // 1.xxx hexadecimal mantissa
  let buf = '0x1'
  if (hm.length > 1) {
    buf += '.' + hm.slice(1)
  }

  // p±
  buf += 'p'
  if (exp >= 0) {
    buf += '+'
  } else {
    exp = -exp
    buf += '-'
  }

  // dd...d
  if (exp < 10) {
    buf += '0' // at least 2 exponent digits
  }
  return buf + exp
}

// fmtP formats x in the "p" format: a hexadecimal fraction in [0.5, 1) and a
// decimal power of two.
function fmtP(x: Float): string {
  if (x._form === formZero) {
    return '0'
  }
  return (
    '0x.' +
    x._mant.toString(16).replace(/0+$/, '') +
    'p' +
    (x._exp >= 0 ? '+' : '') +
    x._exp
  )
}

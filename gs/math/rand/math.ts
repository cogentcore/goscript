// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// The ports of the portable Go implementations of math.Log (log.go) and
// math.Exp (exp.go) that NormFloat64 and ExpFloat64 use, for the values of
// Go: the JavaScript Math.log and Math.exp, behind GoScript's math package,
// differ from them in the last bit for some arguments, which changes the
// tails of the distributions.

// wordView reads the exponent of a float64 for log.
const wordView = new DataView(new ArrayBuffer(8))

// log returns the natural logarithm of x.
export function log(x: number): number {
  // NaN, +Inf, negative values and 0 have special results.
  if (Number.isNaN(x) || x === Infinity) {
    return x
  }
  if (x < 0) {
    return NaN
  }
  if (x === 0) {
    return -Infinity
  }

  // Reduce x to f1 * 2**ki with f1 in [sqrt(2)/2, sqrt(2)).
  let [f1, ki] = frexp(x)
  if (f1 < Math.SQRT2 / 2) {
    f1 *= 2
    ki--
  }
  const f = f1 - 1
  const k = ki

  // log(1+f) by the polynomial of log.go.
  const s = f / (2 + f)
  const s2 = s * s
  const s4 = s2 * s2
  const t1 =
    s2 *
    (6.66666666666673513e-1 +
      s4 *
        (2.857142874366239149e-1 +
          s4 * (1.818357216161805012e-1 + s4 * 1.479819860511658591e-1)))
  const t2 =
    s4 *
    (3.999999999940941908e-1 +
      s4 * (2.222219843214978396e-1 + s4 * 1.531383769920937332e-1))

  // Combine with k*ln(2) in two parts.
  const R = t1 + t2
  const hfsq = 0.5 * f * f
  return (
    k * 6.9314718036912381649e-1 -
    (hfsq - (s * (hfsq + R) + k * 1.90821492927058770002e-10) - f)
  )
}

// frexp returns the fraction in [0.5, 1) and the exponent of a finite
// nonzero x.
function frexp(x: number): [number, number] {
  // A subnormal is scaled into the normal range first.
  let shift = 0
  if (Math.abs(x) < 2.2250738585072014e-308) {
    x *= 2 ** 52
    shift = -52
  }

  // Replace the exponent bits by those of 0.5.
  wordView.setFloat64(0, x)
  const hi = wordView.getUint32(0)
  const exp = ((hi >>> 20) & 0x7ff) - 1022 + shift
  wordView.setUint32(0, (hi & 0x800fffff) | (1022 << 20))
  return [wordView.getFloat64(0), exp]
}

// exp returns e**x.
export function exp(x: number): number {
  // NaN, overflow, underflow and values near zero have special results.
  if (Number.isNaN(x)) {
    return x
  }
  if (x > 7.09782712893383973096e2) {
    return Infinity
  }
  if (x < -7.4513321910194110842e2) {
    return 0
  }
  if (-(2 ** -28) < x && x < 2 ** -28) {
    return 1 + x
  }

  // Reduce x to hi - lo + k*ln(2), rounding k to the nearest integer.
  const log2e = 1.442695040888963387
  const k = x < 0 ? Math.trunc(log2e * x - 0.5) : Math.trunc(log2e * x + 0.5)
  const hi = x - k * 6.9314718036912381649e-1
  const lo = k * 1.90821492927058770002e-10

  // exp(hi - lo) by the polynomial of exp.go, scaled by 2**k.
  const r = hi - lo
  const t = r * r
  const c =
    r -
    t *
      (1.66666666666666657415e-1 +
        t *
          (-2.77777777770155933842e-3 +
            t *
              (6.61375632143793436117e-5 +
                t *
                  (-1.6533902205465251539e-6 + t * 4.13813679705723846039e-8))))
  const y = 1 - (lo - (r * c) / (2 - c) - hi)
  return ldexp(y, k)
}

// ldexp returns y * 2**k, in two steps when 2**k alone would overflow or
// underflow.
function ldexp(y: number, k: number): number {
  // Scale in two halves when 2**k is not a normal float64.
  if (k > 1023 || k < -1022) {
    const half = Math.trunc(k / 2)
    return y * 2 ** half * 2 ** (k - half)
  }
  return y * 2 ** k
}

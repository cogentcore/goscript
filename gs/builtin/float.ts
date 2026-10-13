// formatFloat formats a finite or non-finite float in the decimal formats of
// Go's strconv.FormatFloat ('e', 'E', 'f', 'g' and 'G'). A negative prec uses
// the smallest number of digits that represent the value exactly at bitSize
// precision (32 or 64), so a float32 value prints as in Go, such as 3.14
// instead of the 3.140000104904175 of its float64 representation.
export function formatFloat(
  f: number,
  fmt: string,
  prec: number,
  bitSize: number,
): string {
  if (bitSize === 32) {
    f = Math.fround(f)
  }
  if (Number.isNaN(f)) {
    return 'NaN'
  }
  if (f === Infinity) {
    return '+Inf'
  }
  if (f === -Infinity) {
    return '-Inf'
  }
  const neg = f < 0 || Object.is(f, -0)
  const sign = neg ? '-' : ''
  const a = Math.abs(f)
  const shortest = prec < 0
  const lower = fmt.toLowerCase()

  if (lower === 'f' && !shortest) {
    if (a < 1e21) {
      return sign + a.toFixed(Math.min(prec, 100))
    }
    // a is an integer, which toFixed would print in exponent form.
    return sign + BigInt(a).toString() + (prec > 0 ? '.' + '0'.repeat(prec) : '')
  }

  let digs: Digits
  if (shortest) {
    digs = shortestDigits(a, bitSize)
  } else if (lower === 'e') {
    digs = exponentDigits(a, Math.min(prec, 100), false)
  } else {
    // 'g' with prec significant digits, without trailing zeros.
    digs = exponentDigits(a, Math.min(Math.max(prec, 1), 101) - 1, true)
  }

  if (shortest) {
    switch (lower) {
      case 'e':
        prec = Math.max(digs.d.length - 1, 0)
        break
      case 'f':
        prec = Math.max(digs.d.length - digs.dp, 0)
        break
      case 'g':
        prec = digs.d.length
        break
    }
  }

  switch (lower) {
    case 'e':
      return sign + fmtE(digs, prec, fmt === 'E' ? 'E' : 'e')
    case 'f':
      return sign + fmtF(digs, prec)
    default: {
      // 'g' and 'G' use %e for large and small exponents, as in Go.
      let eprec = prec
      if (eprec > digs.d.length && digs.d.length >= digs.dp) {
        eprec = digs.d.length
      }
      if (shortest) {
        eprec = 6
      }
      const exp = digs.dp - 1
      if (exp < -4 || exp >= eprec) {
        if (prec > digs.d.length) {
          prec = digs.d.length
        }
        return sign + fmtE(digs, prec - 1, fmt === 'G' ? 'E' : 'e')
      }
      if (prec > digs.dp) {
        prec = digs.d.length
      }
      return sign + fmtF(digs, Math.max(prec - digs.dp, 0))
    }
  }
}

// Digits are the decimal digits d of a non-negative value 0.d * 10^dp,
// with d empty for zero.
interface Digits {
  d: string
  dp: number
}

// exponentDigits returns the digits of a rounded to fracDigits+1 significant
// digits, or the shortest digits that convert back to a as a float64 if
// fracDigits is undefined, optionally without trailing zeros.
function exponentDigits(
  a: number,
  fracDigits: number | undefined,
  trim: boolean,
): Digits {
  if (a === 0) {
    return { d: '', dp: 0 }
  }
  const [mantissa, exponent] = a.toExponential(fracDigits).split('e')
  let d = mantissa.replace('.', '')
  if (trim) {
    d = d.replace(/0+$/, '')
  }
  return { d, dp: Number(exponent) + 1 }
}

// shortestDigits returns the fewest digits that convert back to a at the
// given bit size.
function shortestDigits(a: number, bitSize: number): Digits {
  if (a === 0) {
    return { d: '', dp: 0 }
  }
  if (bitSize !== 32) {
    return exponentDigits(a, undefined, true)
  }
  for (let p = 0; p < 9; p++) {
    if (Math.fround(Number(a.toExponential(p))) === a) {
      return exponentDigits(a, p, true)
    }
  }
  return exponentDigits(a, 8, true)
}

// fmtE formats digits as d.ddde±dd with prec fraction digits.
function fmtE(digs: Digits, prec: number, e: string): string {
  let s = digs.d.length === 0 ? '0' : digs.d[0]
  if (prec > 0) {
    s += '.' + digs.d.slice(1, prec + 1).padEnd(prec, '0')
  }
  const exp = digs.d.length === 0 ? 0 : digs.dp - 1
  const expAbs = Math.abs(exp)
  return s + e + (exp < 0 ? '-' : '+') + String(expAbs).padStart(2, '0')
}

// fmtF formats digits as ddd.ddd with prec fraction digits.
function fmtF(digs: Digits, prec: number): string {
  let s: string
  if (digs.dp > 0) {
    s = digs.d.slice(0, digs.dp).padEnd(digs.dp, '0')
  } else {
    s = '0'
  }
  if (prec > 0) {
    s += '.'
    for (let i = 1; i <= prec; i++) {
      const j = digs.dp + i - 1
      s += j >= 0 && j < digs.d.length ? digs.d[j] : '0'
    }
  }
  return s
}

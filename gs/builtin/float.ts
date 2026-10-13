// formatFloat formats a float in the decimal formats of Go's
// strconv.FormatFloat ('e', 'E', 'f', 'g' and 'G'). A negative prec uses the
// smallest number of digits that represent the value exactly at bitSize
// precision (32 or 64), so a float32 value prints as in Go, such as 3.14
// instead of the 3.140000104904175 of its float64 representation. A
// non-negative prec rounds the exact value half to even, as Go does.
export function formatFloat(
  f: number,
  fmt: string,
  prec: number,
  bitSize: number,
): string {
  // Round to the precision of bitSize and handle the non-finite values.
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

  // Compute the digits of the magnitude, rounded to prec, or the shortest
  // digits with prec set to their length in the format.
  const sign = f < 0 || Object.is(f, -0) ? '-' : ''
  const a = Math.abs(f)
  const shortest = prec < 0
  const lower = fmt.toLowerCase()
  let digs: Digits
  if (shortest) {
    digs = shortestDigits(a, bitSize)
    switch (lower) {
      case 'e':
        prec = Math.max(digs.d.length - 1, 0)
        break
      case 'f':
        prec = Math.max(digs.d.length - digs.dp, 0)
        break
      default:
        prec = digs.d.length
    }
  } else {
    digs = exactDigits(a)
    switch (lower) {
      case 'e':
        digs = roundDigits(digs, prec + 1)
        break
      case 'f':
        digs = roundDigits(digs, digs.dp + prec)
        break
      default:
        if (prec === 0) {
          prec = 1
        }
        digs = roundDigits(digs, prec)
    }
  }

  // Lay out the digits in the format.
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
// without trailing zeros, and with d empty for zero.
interface Digits {
  d: string
  dp: number
}

// float64View reads the IEEE 754 bits of a float64.
const float64View = new DataView(new ArrayBuffer(8))

// exactDigits returns every digit of the finite non-negative value a. A
// float64 is mant * 2^exp, which is mant * 5^-exp / 10^-exp for a negative
// exp, so its decimal expansion always terminates.
function exactDigits(a: number): Digits {
  if (a === 0) {
    return { d: '', dp: 0 }
  }

  // Split a into its integer mantissa and binary exponent.
  float64View.setFloat64(0, a)
  const hi = float64View.getUint32(0)
  const lo = float64View.getUint32(4)
  let mant = (BigInt(hi & 0xfffff) << 32n) | BigInt(lo)
  let exp = (hi >>> 20) & 0x7ff
  if (exp === 0) {
    exp = 1
  } else {
    mant |= 1n << 52n
  }
  exp -= 1023 + 52

  // Expand the mantissa in decimal.
  if (exp >= 0) {
    const d = (mant << BigInt(exp)).toString()
    return { d: d.replace(/0+$/, ''), dp: d.length }
  }
  const d = (mant * 5n ** BigInt(-exp)).toString()
  return { d: d.replace(/0+$/, ''), dp: d.length + exp }
}

// roundDigits rounds digs to nd digits, half to even, as Go's decimal.Round
// does. A negative nd leaves digs unchanged.
function roundDigits(digs: Digits, nd: number): Digits {
  const { d, dp } = digs
  if (nd < 0 || nd >= d.length) {
    return digs
  }

  // Truncate below half, and at a tie with an even last digit. d has no
  // trailing zeros, so a 5 followed by more digits is above half.
  const next = d.charCodeAt(nd) - 48
  const tie = next === 5 && nd + 1 === d.length
  const odd = nd > 0 && (d.charCodeAt(nd - 1) - 48) % 2 === 1
  if (next < 5 || (tie && !odd)) {
    return { d: d.slice(0, nd).replace(/0+$/, ''), dp }
  }

  // Round up, carrying through trailing nines.
  let i = nd - 1
  while (i >= 0 && d[i] === '9') {
    i--
  }
  if (i < 0) {
    return { d: '1', dp: dp + 1 }
  }
  return { d: d.slice(0, i) + String.fromCharCode(d.charCodeAt(i) + 1), dp }
}

// shortestDigits returns the fewest digits that convert back to a at the
// given bit size.
function shortestDigits(a: number, bitSize: number): Digits {
  if (a === 0) {
    return { d: '', dp: 0 }
  }
  if (bitSize !== 32) {
    // toExponential without an argument prints the shortest float64 digits.
    return parseExponential(a.toExponential())
  }
  for (let p = 0; p < 8; p++) {
    const s = a.toExponential(p)
    if (Math.fround(Number(s)) === a) {
      return parseExponential(s)
    }
  }
  return parseExponential(a.toExponential(8))
}

// parseExponential returns the digits of a d.ddde±x string.
function parseExponential(s: string): Digits {
  const [mantissa, exponent] = s.split('e')
  const d = mantissa.replace('.', '').replace(/0+$/, '')
  return { d, dp: Number(exponent) + 1 }
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
  let s = digs.dp > 0 ? digs.d.slice(0, digs.dp).padEnd(digs.dp, '0') : '0'
  if (prec > 0) {
    s += '.'
    for (let i = 1; i <= prec; i++) {
      const j = digs.dp + i - 1
      s += j >= 0 && j < digs.d.length ? digs.d[j] : '0'
    }
  }
  return s
}

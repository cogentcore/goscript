import { describe, expect, it } from 'vitest'
import { formatFloat } from './float.js'

describe('formatFloat', () => {
  it('formats like Go strconv.FormatFloat', () => {
    const cases: [number, string, number, number, string][] = [
      [3.14, 'g', -1, 64, '3.14'],
      [Math.fround(3.14), 'g', -1, 32, '3.14'],
      [Math.fround(3.14), 'g', -1, 64, '3.140000104904175'],
      [Math.fround(0.1) + Math.fround(0.2), 'g', -1, 32, '0.3'],
      [1e6, 'g', -1, 64, '1e+06'],
      [123456, 'g', -1, 64, '123456'],
      [0.0001, 'g', -1, 64, '0.0001'],
      [0.00001, 'g', -1, 64, '1e-05'],
      [1e21, 'g', -1, 64, '1e+21'],
      [0, 'g', -1, 64, '0'],
      [-0, 'g', -1, 64, '-0'],
      [-2.5, 'g', -1, 64, '-2.5'],
      [3.14159, 'f', 2, 64, '3.14'],
      [3.14, 'f', -1, 64, '3.14'],
      [1e6, 'f', -1, 64, '1000000'],
      [1.5, 'e', -1, 64, '1.5e+00'],
      [1234.5678, 'e', 2, 64, '1.23e+03'],
      [1234.5678, 'E', 3, 64, '1.235E+03'],
      [0, 'e', 2, 64, '0.00e+00'],
      [1.0, 'g', 3, 64, '1'],
      [1234.5678, 'g', 3, 64, '1.23e+03'],
      [0.000012345, 'G', 2, 64, '1.2E-05'],
      [100, 'g', 3, 64, '100'],
      [1e22, 'f', 1, 64, '10000000000000000000000.0'],
      [Number.NaN, 'g', -1, 64, 'NaN'],
      [-Infinity, 'f', 2, 64, '-Inf'],
    ]
    for (const [f, fmt, prec, bits, want] of cases) {
      expect(formatFloat(f, fmt, prec, bits), `${f} ${fmt} ${prec} ${bits}`).toBe(want)
    }
  })
})

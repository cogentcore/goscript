import * as $ from '@goscript/builtin/index.js'

import { bitLen, isqrt, modPow, trailingZeroBits } from './nat.js'

// jacobi returns the Jacobi symbol (x/y), which is 0, 1, or -1. The caller
// guarantees that y is odd.
export function jacobi(x: bigint, y: bigint): number {
  // Reduce to a positive denominator: (x/-y) is -(x/y) only when x < 0.
  let a = x
  let b = y
  let j = 1
  if (b < 0n) {
    if (a < 0n) {
      j = -1
    }
    b = -b
  }

  // Apply quadratic reciprocity until the denominator reaches 1.
  for (;;) {
    if (b === 1n) {
      return j
    }
    if (a === 0n) {
      return 0
    }
    a = ((a % b) + b) % b
    if (a === 0n) {
      return 0
    }

    // Factors of 2 in a.
    const s = trailingZeroBits(a)
    if ((s & 1) !== 0) {
      const bmod8 = b & 7n
      if (bmod8 === 3n || bmod8 === 5n) {
        j = -j
      }
    }
    const c = a >> BigInt(s)

    // Swap the numerator and the denominator.
    if ((b & 3n) === 3n && (c & 3n) === 3n) {
      j = -j
    }
    a = b
    b = c
  }
}

const primeBitMask =
  (1n << 2n) |
  (1n << 3n) |
  (1n << 5n) |
  (1n << 7n) |
  (1n << 11n) |
  (1n << 13n) |
  (1n << 17n) |
  (1n << 19n) |
  (1n << 23n) |
  (1n << 29n) |
  (1n << 31n) |
  (1n << 37n) |
  (1n << 41n) |
  (1n << 43n) |
  (1n << 47n) |
  (1n << 53n) |
  (1n << 59n) |
  (1n << 61n)

const smallPrimes = [
  3n,
  5n,
  7n,
  11n,
  13n,
  17n,
  19n,
  23n,
  29n,
  31n,
  37n,
  41n,
  43n,
  47n,
  53n,
]

// millerRabin runs reps rounds of the Miller-Rabin test on the odd number n
// >= 65. The last round uses the base 2 and the others use fixed bases, so
// the result is deterministic.
function millerRabin(n: bigint, reps: number): boolean {
  // Write n-1 as q * 2**k with q odd.
  const nm1 = n - 1n
  const k = trailingZeroBits(nm1)
  const q = nm1 >> BigInt(k)
  const nm3 = nm1 - 2n

  // Test each base: n is composite unless some square of base**q reaches -1.
  next: for (let i = 0; i < reps; i++) {
    const base =
      i === reps - 1 ? 2n : ((BigInt(i + 1) * 0x9e3779b97f4a7c15n) % nm3) + 2n
    let y = modPow(base, q, n)
    if (y === 1n || y === nm1) {
      continue
    }
    for (let j = 1; j < k; j++) {
      y = (y * y) % n
      if (y === nm1) {
        continue next
      }
      if (y === 1n) {
        return false
      }
    }
    return false
  }
  return true
}

// lucas runs the strong Lucas probable prime test with Selfridge's parameter
// selection on n.
function lucas(n: bigint): boolean {
  // Settle n <= 2 and even n, which have no Lucas parameters.
  if (n <= 1n) {
    return false
  }
  if ((n & 1n) === 0n) {
    return n === 2n
  }

  // Find the first p with (p*p-4 / n) = -1.
  let p = 3n
  for (; ; p++) {
    if (p > 10000n) {
      $.panic(
        'math/big: internal error: cannot find (D/n) = -1 for ' + n.toString(),
      )
    }
    const j = jacobi(p * p - 4n, n)
    if (j === -1) {
      break
    }
    if (j === 0) {
      return n === p + 2n
    }
    if (p === 40n) {
      // Rule out perfect squares, which have no such p.
      const t = isqrt(n)
      if (t * t === n) {
        return false
      }
    }
  }

  // Write n+1 as s * 2**r with s odd.
  const r = trailingZeroBits(n + 1n)
  const s = (n + 1n) >> BigInt(r)
  const nm2 = n - 2n

  // Compute V_s and V_(s+1) of the Lucas sequence with Q = 1 mod n, from the
  // top bit of s down.
  let vk = 2n
  let vk1 = p
  for (let i = bitLen(s); i >= 0; i--) {
    if ((s >> BigInt(i)) & 1n) {
      vk = (vk * vk1 + n - p) % n
      vk1 = (vk1 * vk1 + nm2) % n
    } else {
      vk1 = (vk * vk1 + n - p) % n
      vk = (vk * vk + nm2) % n
    }
  }

  // Accept n when V_s is +-2 and V_(s+1) satisfies the strong congruence.
  if (vk === 2n || vk === nm2) {
    let t1 = vk * p
    let t2 = vk1 << 1n
    if (t1 < t2) {
      ;[t1, t2] = [t2, t1]
    }
    if ((t1 - t2) % n === 0n) {
      return true
    }
  }

  // Square V up to r-1 times looking for V_(s*2**t) = 0 mod n; reaching 2
  // first rules n out.
  for (let t = 0; t < r - 1; t++) {
    if (vk === 0n) {
      return true
    }
    if (vk === 2n) {
      return false
    }
    vk = (((vk * vk - 2n) % n) + n) % n
  }
  return false
}

// probablyPrime reports whether x is prime with a negligible chance of error:
// it runs n+1 rounds of Miller-Rabin and a strong Lucas test, which is exact
// for every number below 2**64.
export function probablyPrime(x: bigint, n: number): boolean {
  // Answer small and even x from the prime bitmask and parity.
  if (x <= 0n) {
    return false
  }
  if (x < 64n) {
    return ((primeBitMask >> x) & 1n) !== 0n
  }
  if ((x & 1n) === 0n) {
    return false
  }

  // Cheaply reject multiples of small primes, then run the probabilistic tests.
  for (const p of smallPrimes) {
    if (x % p === 0n) {
      return false
    }
  }
  return millerRabin(x, n + 1) && lucas(x)
}

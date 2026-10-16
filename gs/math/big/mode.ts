// MaxBase is the largest number base accepted for string conversions.
export const MaxBase = 62

// Exponent and precision limits of a Float.
export const MaxExp = 2147483647
export const MinExp = -2147483648
export const MaxPrec = 4294967295

// Word is a single digit of a multi-precision unsigned integer. The Go
// package has 64-bit words on the targets GoScript supports; a value above
// 2**53 is a bigint, as for every uint.
export type Word = number | bigint

export const wordBits = 64

// Accuracy describes the rounding error produced by the most recent operation
// that generated a Float value, relative to the exact value.
export type Accuracy = number

export const Below: Accuracy = -1
export const Exact: Accuracy = 0
export const Above: Accuracy = 1

export function Accuracy_String(a: Accuracy): string {
  switch (a) {
    case Below:
      return 'Below'
    case Exact:
      return 'Exact'
    case Above:
      return 'Above'
  }
  return 'Accuracy(' + a + ')'
}

// RoundingMode determines how a Float value is rounded to the desired
// precision, and how an integer quotient is adjusted by Int.Divide.
export type RoundingMode = number

export const ToNearestEven: RoundingMode = 0
export const ToNearestAway: RoundingMode = 1
export const ToZero: RoundingMode = 2
export const AwayFromZero: RoundingMode = 3
export const ToNegativeInf: RoundingMode = 4
export const ToPositiveInf: RoundingMode = 5

// Division modes of Int.Divide.
export const Trunc = ToZero
export const Floor = ToNegativeInf
export const Round = ToNearestEven
export const Ceil = ToPositiveInf

const roundingModeNames = [
  'ToNearestEven',
  'ToNearestAway',
  'ToZero',
  'AwayFromZero',
  'ToNegativeInf',
  'ToPositiveInf',
]

export function RoundingMode_String(m: RoundingMode): string {
  return roundingModeNames[m] ?? 'RoundingMode(' + m + ')'
}

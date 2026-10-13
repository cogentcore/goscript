import * as $ from "@goscript/builtin/index.js";

// Helper type for slice metadata
interface SliceMetadata<T> {
  backing: T[]
  offset: number
  length: number
  capacity: number
}

type LessFunc<R = $.MaybePromise<boolean>> = (i: number, j: number) => R

function setInSlice<T>(slice: $.Slice<T>, i: number, value: T): void {
  if (!slice) return

  if (Array.isArray(slice) || slice instanceof Uint8Array) {
    ;(slice as any)[i] = value
  } else if (typeof slice === 'object' && '__meta__' in slice) {
    const meta = (slice as any).__meta__ as SliceMetadata<T>
    meta.backing[meta.offset + i] = value
  }
}

// sortIndexRange merge sorts indices[lo:hi], yielding each less result.
function* sortIndexRange(
  indices: number[],
  lo: number,
  hi: number,
  less: LessFunc,
): $.CallbackRun<void> {
  // Insertion sort a short range.
  if (hi - lo <= 16) {
    for (let i = lo + 1; i < hi; i++) {
      const value = indices[i]
      let j = i
      while (j > lo && (yield less(value, indices[j - 1]))) {
        indices[j] = indices[j - 1]
        j--
      }
      indices[j] = value
    }
    return
  }

  // Sort both halves, then merge them, taking the left on ties.
  const mid = lo + Math.floor((hi - lo) / 2)
  yield* sortIndexRange(indices, lo, mid, less)
  yield* sortIndexRange(indices, mid, hi, less)
  const merged: number[] = []
  let left = lo
  let right = mid
  while (left < mid && right < hi) {
    if (yield less(indices[right], indices[left])) {
      merged.push(indices[right])
      right++
    } else {
      merged.push(indices[left])
      left++
    }
  }
  merged.push(...indices.slice(left, mid), ...indices.slice(right, hi))
  for (let i = 0; i < merged.length; i++) {
    indices[lo + i] = merged[i]
  }
}

// sliceOf returns the slice in x, which is a Go interface value holding a
// slice, possibly boxed as a named slice type with methods.
function sliceOf(x: unknown): $.Slice<unknown> {
  return ($.isNamedValueBox(x) ? x.__goValue : x) as $.Slice<unknown>
}

// Slice sorts the slice x given the provided less function. The sort is
// stable, so SliceStable shares it.
export function Slice<R extends $.MaybePromise<boolean>>(
  x: unknown,
  less: LessFunc<R>,
): $.CallbackResult<R, void> {
  return $.runCallbacks(
    (function* () {
      const s = sliceOf(x)
      if (!s) return

      const indices = Array.from({ length: $.len(s) }, (_, i) => i)
      yield* sortIndexRange(indices, 0, indices.length, less)
      const sorted = indices.map((index) => $.index(s, index))
      for (let i = 0; i < sorted.length; i++) {
        setInSlice(s, i, sorted[i])
      }
    })(),
  )
}

// SliceIsSorted reports whether the slice x is sorted according to the provided less function
export function SliceIsSorted<R extends $.MaybePromise<boolean>>(
  x: unknown,
  less: LessFunc<R>,
): $.CallbackResult<R, boolean> {
  return $.runCallbacks(
    (function* () {
      const s = sliceOf(x)
      if (!s) return true

      for (let i = $.len(s) - 1; i > 0; i--) {
        if (yield less(i, i - 1)) {
          return false
        }
      }
      return true
    })(),
  )
}

// SliceStable sorts the slice x while keeping the original order of equal elements
export function SliceStable<R extends $.MaybePromise<boolean>>(
  x: unknown,
  less: LessFunc<R>,
): $.CallbackResult<R, void> {
  return Slice(x, less)
}

import * as $ from '@goscript/builtin/index.js'

import { compareStrings, lessFloat64 } from './order.js'
import { SearchFloat64s, SearchInts, SearchStrings } from './search.gs.js'

// Interface defines the methods required for sorting.
// Less and Swap may be async: a Go type implementing sort.Interface can do
// async work (e.g. block I/O) in Swap/Less, which transpiles to an async
// method. Sort/Stable/IsSorted await these.
export interface Interface {
  Len(): number | Promise<number>
  Less(i: number, j: number): boolean | Promise<boolean>
  Swap(i: number, j: number): void | Promise<void>
}

// Helper type for slice metadata
interface SliceMetadata<T> {
  backing: T[]
  offset: number
  length: number
  capacity: number
}

// IntSlice attaches the methods of Interface to []int, sorting in
// increasing order. As for other named slice types, the methods are
// functions taking the slice as the receiver.
export type IntSlice = $.Slice<number>

export function IntSlice_Len(x: IntSlice): number {
  return $.len(x)
}

export function IntSlice_Less(x: IntSlice, i: number, j: number): boolean {
  return ($.index(x, i) as number) < ($.index(x, j) as number)
}

export function IntSlice_Swap(x: IntSlice, i: number, j: number): void {
  swapInSlice(x, i, j)
}

export function IntSlice_Search(p: IntSlice, x: number): number {
  return SearchInts(p, x)
}

export function IntSlice_Sort(x: IntSlice): void {
  Ints(x)
}

// Float64Slice attaches the methods of Interface to []float64, sorting in
// increasing order, with not-a-number values ordered before other values.
export type Float64Slice = $.Slice<number>

export function Float64Slice_Len(x: Float64Slice): number {
  return $.len(x)
}

export function Float64Slice_Less(
  x: Float64Slice,
  i: number,
  j: number,
): boolean {
  return lessFloat64($.index(x, i) as number, $.index(x, j) as number)
}

export function Float64Slice_Swap(x: Float64Slice, i: number, j: number): void {
  swapInSlice(x, i, j)
}

export function Float64Slice_Search(p: Float64Slice, x: number): number {
  return SearchFloat64s(p, x)
}

export function Float64Slice_Sort(x: Float64Slice): void {
  Float64s(x)
}

// StringSlice attaches the methods of Interface to []string, sorting in
// increasing order.
export type StringSlice = $.Slice<string>

export function StringSlice_Len(x: StringSlice): number {
  return $.len(x)
}

export function StringSlice_Less(
  x: StringSlice,
  i: number,
  j: number,
): boolean {
  return compareStrings($.index(x, i) as string, $.index(x, j) as string) < 0
}

export function StringSlice_Swap(x: StringSlice, i: number, j: number): void {
  swapInSlice(x, i, j)
}

export function StringSlice_Search(p: StringSlice, x: string): number {
  return SearchStrings(p, x)
}

export function StringSlice_Sort(x: StringSlice): void {
  Strings(x)
}

// Sort sorts data in ascending order as determined by the Less method.
// It returns a promise only when a method of data does, so an async
// sort.Interface implementer sorts correctly; the data is fully ordered
// before that promise resolves.
export function Sort(data: Interface | null): void | Promise<void> {
  const sortData = $.pointerValue(data)
  // Use a simple insertion sort for now - can be optimized later. It runs
  // synchronously until a method of data returns a promise, and then
  // continues asynchronously from there.
  const n = sortData.Len()
  if (n instanceof Promise) {
    return n.then((count: number) => insertionSortAsync(sortData, count, 1, 1, null))
  }
  for (let i = 1; i < n; i++) {
    for (let j = i; j > 0; j--) {
      const less = sortData.Less(j, j - 1)
      if (less instanceof Promise) {
        return insertionSortAsync(sortData, n, i, j, less)
      }
      if (!less) {
        break
      }
      const swapped = sortData.Swap(j, j - 1)
      if (swapped instanceof Promise) {
        return swapped.then(() => insertionSortAsync(sortData, n, i, j - 1, null))
      }
    }
  }
}

// insertionSortAsync continues Sort at element i, position j, after a method
// of data returned a promise. less is the pending result of Less(j, j-1), or
// null when the comparison at j is still to be made.
async function insertionSortAsync(
  sortData: Interface,
  n: number,
  i: number,
  j: number,
  less: Promise<boolean> | null,
): Promise<void> {
  for (; i < n; i++, j = i) {
    for (; j > 0; j--) {
      const isLess = less !== null ? await less : await sortData.Less(j, j - 1)
      less = null
      if (!isLess) {
        break
      }
      await sortData.Swap(j, j - 1)
    }
  }
}

// Stable sorts data while keeping the original order of equal elements
export function Stable(data: Interface | null): void | Promise<void> {
  // For simplicity, use the same sort - can be improved later
  return Sort(data)
}

// IsSorted reports whether data is sorted
export function IsSorted(data: Interface | null): boolean | Promise<boolean> {
  const sortData = $.pointerValue(data)
  const n = sortData.Len()
  if (n instanceof Promise) {
    return n.then((count: number) => isSortedAsync(sortData, count - 1, null))
  }
  for (let i = n - 1; i > 0; i--) {
    const less = sortData.Less(i, i - 1)
    if (less instanceof Promise) {
      return isSortedAsync(sortData, i, less)
    }
    if (less) {
      return false
    }
  }
  return true
}

// isSortedAsync continues IsSorted at element i after Less returned a
// promise, which less holds, or null when the comparison at i is still to
// be made.
async function isSortedAsync(
  sortData: Interface,
  i: number,
  less: Promise<boolean> | null,
): Promise<boolean> {
  for (; i > 0; i--) {
    const isLess = less !== null ? await less : await sortData.Less(i, i - 1)
    less = null
    if (isLess) {
      return false
    }
  }
  return true
}

// Reverse returns the reverse order for data.
export function Reverse(data: Interface | null): Interface {
  const sortData = $.pointerValue(data)
  return {
    Len: () => sortData.Len(),
    Less: (i: number, j: number) => sortData.Less(j, i),
    Swap: (i: number, j: number) => sortData.Swap(i, j)
  }
}

// sortInSlice sorts the elements of slice in place with the given comparison.
function sortInSlice<T>(slice: $.Slice<T>, compare: (a: T, b: T) => number): void {
  const n = $.len(slice)
  if (n < 2) return
  const values: T[] = []
  for (let i = 0; i < n; i++) {
    values.push($.index(slice, i) as T)
  }
  values.sort(compare)
  if ($.isArrayOrGoSlice(slice)) {
    for (let i = 0; i < n; i++) {
      $.sliceElems(slice)[$.sliceSlot(slice, i)] = values[i]
    }
  } else if (slice && typeof slice === 'object' && '__meta__' in slice) {
    const meta = (slice as any).__meta__ as SliceMetadata<T>
    for (let i = 0; i < n; i++) {
      meta.backing[meta.offset + i] = values[i]
    }
  }
}

// Helper function to swap elements in a slice
function swapInSlice<T>(slice: $.Slice<T>, i: number, j: number): void {
  if (!slice) return
  
  const temp = $.index(slice, i)
  if ($.isArrayOrGoSlice(slice)) {
    const val_j = $.index(slice, j)
    const val_i = temp
    $.sliceElems(slice)[$.sliceSlot(slice, i)] = val_j as T
    $.sliceElems(slice)[$.sliceSlot(slice, j)] = val_i as T
  } else if (typeof slice === 'object' && '__meta__' in slice) {
    const meta = (slice as any).__meta__ as SliceMetadata<T>
    const backing = meta.backing
    backing[meta.offset + i] = $.index(slice, j) as T
    backing[meta.offset + j] = temp as T
  }
}

// Ints sorts a slice of ints in increasing order.
export function Ints(x: $.Slice<number>): void {
  sortInSlice(x, (a, b) => a - b)
}

// IntsAreSorted reports whether the slice x is sorted in increasing order.
export function IntsAreSorted(x: $.Slice<number>): boolean {
  if (!x) return true
  
  const n = $.len(x)
  for (let i = n - 1; i > 0; i--) {
    if (($.index(x, i) as number) < ($.index(x, i - 1) as number)) {
      return false
    }
  }
  return true
}

// Float64s sorts a slice of float64s in increasing order.
// Not-a-number values are ordered before other values.
export function Float64s(x: $.Slice<number>): void {
  sortInSlice(x, (a, b) =>
    lessFloat64(a, b) ? -1
    : lessFloat64(b, a) ? 1
    : 0,
  )
}

// Float64sAreSorted reports whether the slice x is sorted in increasing order.
export function Float64sAreSorted(x: $.Slice<number>): boolean {
  if (!x) return true
  
  const n = $.len(x)
  for (let i = n - 1; i > 0; i--) {
    if (lessFloat64($.index(x, i) as number, $.index(x, i - 1) as number)) {
      return false
    }
  }
  return true
}

// Strings sorts a slice of strings in increasing order.
export function Strings(x: $.Slice<string>): void {
  sortInSlice(x, compareStrings)
}

// StringsAreSorted reports whether the slice x is sorted in increasing order.
export function StringsAreSorted(x: $.Slice<string>): boolean {
  if (!x) return true
  
  const n = $.len(x)
  for (let i = n - 1; i > 0; i--) {
    if (
      compareStrings($.index(x, i) as string, $.index(x, i - 1) as string) < 0
    ) {
      return false
    }
  }
  return true
}

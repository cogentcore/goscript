import { ReflectValue } from './types.js'

// Swapper returns a function that swaps the elements in the provided slice.
// Swapper panics if the provided interface is not a slice.
export function Swapper(slice: ReflectValue): (i: number, j: number) => void {
  // A slice is a JavaScript array, or a window on its backing array.
  let backing: { [index: number]: unknown } | null = null
  let offset = 0
  let length = 0
  if (Array.isArray(slice)) {
    backing = slice
    length = slice.length
  } else if (ArrayBuffer.isView(slice)) {
    // A typed slice is a view of exactly its elements.
    backing = slice as { [index: number]: unknown }
    length = (slice as ArrayLike<unknown>).length
  } else if (slice && typeof slice === 'object' && '__meta__' in slice) {
    const meta = (
      slice as {
        __meta__?: { backing?: unknown[]; offset: number; length: number }
      }
    ).__meta__
    if (meta && meta.backing) {
      backing = meta.backing
      offset = meta.offset
      length = meta.length
    }
  }

  // Any other value has nothing to swap.
  if (!backing) {
    return () => {}
  }

  // Fast path for slices of size 0 and 1. Nothing to swap.
  switch (length) {
    case 0:
      return (_i: number, _j: number): void => {
        throw new Error('reflect: slice index out of range')
      }
    case 1:
      return (i: number, j: number): void => {
        if (i !== 0 || j !== 0) {
          throw new Error('reflect: slice index out of range')
        }
      }
  }

  // The swapper exchanges elements of the window in its backing array.
  const array = backing
  return (i: number, j: number) => {
    if (i >= 0 && j >= 0 && i < length && j < length) {
      const temp = array[offset + i]
      array[offset + i] = array[offset + j]
      array[offset + j] = temp
    }
  }
}

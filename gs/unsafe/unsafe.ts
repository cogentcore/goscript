// Package unsafe provides facilities for low-level programming including operations
// that violate the type system. Most operations are not supported in JavaScript/TypeScript
// and will throw errors when used.

import * as $ from '../builtin/index.js'

const stringDataPointer = Symbol('stringDataPointer')
const sliceDataPointer = Symbol('sliceDataPointer')

interface StringDataPointer {
  [stringDataPointer]: true
  value: string
}

// SliceDataPointer is the pointer returned by SliceData, which refers to the
// whole slice so that Slice can return a view sharing its backing array.
interface SliceDataPointer {
  [sliceDataPointer]: true
  slice: $.Slice<unknown> | Uint8Array
}

function isStringDataPointer(ptr: Pointer): ptr is StringDataPointer {
  return typeof ptr === 'object' && ptr !== null && stringDataPointer in ptr
}

function isSliceDataPointer(ptr: Pointer): ptr is SliceDataPointer {
  return typeof ptr === 'object' && ptr !== null && sliceDataPointer in ptr
}

// isASCII reports whether s has one byte per character.
function isASCII(s: string): boolean {
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) >= 0x80) {
      return false
    }
  }
  return true
}

// lengthOf converts an IntegerType length, which is a bigint for 64-bit
// integer types, to a number.
function lengthOf(len: IntegerType): number {
  return typeof len === 'bigint' ? Number(len) : len
}

// ArbitraryType is a shorthand for an arbitrary Go type; it is not a real type.
export type ArbitraryType = unknown

// Pointer is a pointer type but a Pointer value may not be dereferenced.
export type Pointer = unknown

// IntegerType is a shorthand for an integer type; it is not a real type.
// 64-bit integer types are represented as bigint.
export type IntegerType = number | bigint

// Alignof returns the alignment of the (type of the) variable in bytes
// This operation is not meaningful in JavaScript/TypeScript.
export function Alignof(_variable: ArbitraryType): number {
  throw new Error(
    'unsafe.Alignof is not supported in JavaScript/TypeScript: memory alignment is not a meaningful concept in JavaScript',
  )
}

// Offsetof returns the field offset in bytes relative to the struct's address
// This operation is not meaningful in JavaScript/TypeScript.
export function Offsetof(_selector: ArbitraryType): number {
  throw new Error(
    'unsafe.Offsetof is not supported in JavaScript/TypeScript: memory layout and field offsets are not meaningful concepts in JavaScript',
  )
}

// Sizeof returns the size of the (type of the) variable in bytes
// This operation is not meaningful in JavaScript/TypeScript.
export function Sizeof(_variable: ArbitraryType): number {
  throw new Error(
    'unsafe.Sizeof is not supported in JavaScript/TypeScript: memory size is not a meaningful concept in JavaScript',
  )
}

// Add adds len to ptr and returns the updated pointer
// Pointer arithmetic is not supported in JavaScript/TypeScript.
export function Add(_ptr: Pointer, _len: IntegerType): Pointer {
  throw new Error(
    'unsafe.Add is not supported in JavaScript/TypeScript: pointer arithmetic is not available in JavaScript',
  )
}

// Slice returns a slice of len elements for a pointer produced by SliceData,
// sharing its backing array, or the bytes of a pointer produced by StringData.
export function Slice<T = number>(ptr: Pointer, len: IntegerType): $.Slice<T> {
  const n = lengthOf(len)
  if (isSliceDataPointer(ptr)) {
    return $.goSlice(ptr.slice as $.Slice<T>, 0, n)
  }
  if (isStringDataPointer(ptr)) {
    return $.goSlice($.stringToBytes(ptr.value), 0, n) as $.Slice<T>
  }
  if (ptr === null && n === 0) {
    return null
  }
  throw new Error(
    'unsafe.Slice is not supported in JavaScript/TypeScript: direct memory access is not available in JavaScript',
  )
}

// SliceData returns a pointer to the underlying array of the slice,
// which Slice and String can read. It returns nil for a nil slice.
export function SliceData(slice: $.Slice<unknown> | Uint8Array): Pointer {
  if (slice === null) {
    return null
  }
  return { [sliceDataPointer]: true, slice } satisfies SliceDataPointer
}

// String returns a string of len bytes for a pointer produced by StringData,
// or by SliceData for a byte slice.
export function String(ptr: Pointer, len: IntegerType): string {
  const n = lengthOf(len)
  if (isStringDataPointer(ptr)) {
    if (n === ptr.value.length && isASCII(ptr.value)) {
      return ptr.value
    }
    return $.bytesToString($.stringToBytes(ptr.value).subarray(0, n))
  }
  if (isSliceDataPointer(ptr)) {
    return $.bytesToString(
      $.goSlice(ptr.slice as $.Slice<number>, 0, n) as $.Slice<number>,
    )
  }
  if (ptr === null && n === 0) {
    return ''
  }
  throw new Error(
    'unsafe.String is not supported in JavaScript/TypeScript: direct memory access is not available in JavaScript',
  )
}

// StringData returns a pointer that Slice and String can read as UTF-8 bytes.
export function StringData(str: string): Pointer {
  return { [stringDataPointer]: true, value: str } satisfies StringDataPointer
}

// Pointer converts a value to an unsafe.Pointer for atomic operations
// In JavaScript/TypeScript, this is just a pass-through function.
export function Pointer(value: unknown): Pointer {
  return value
}

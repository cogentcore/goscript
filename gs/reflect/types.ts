// Common types used throughout the reflect module
import * as $ from '@goscript/builtin/index.js'
import type { StringHeaderData } from '@goscript/builtin/index.js'

// uintptr Basic Go types that need TypeScript equivalents.
export type uintptr = number

// UnsafePointer Define a proper type-safe Pointer type.
export interface UnsafePointer {
  readonly __unsafePointerBrand: unique symbol
  value: unknown
}

export type Pointer = UnsafePointer | null

export type ReflectFunc = (...args: unknown[]) => unknown

// ReflectValue Define the possible JavaScript values that can be reflected.
export type ReflectValue =
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | symbol
  | ReflectFunc
  | object
  | unknown[]
  | Map<unknown, unknown>
  | Set<unknown>
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array

// Import Type and Kind from the main type module
import { Type, Kind, Value, Kind_String, ChanDir } from './type.js'

type StructFieldInit = Partial<StructField>

// StructField Struct field representation.
export class StructField {
  public Name: string = ''
  public PkgPath: string = ''
  public Type: Type | null = null
  public Tag: StructTag = ''
  public Offset: uintptr = 0
  public Index: $.Slice<number> = null
  public Anonymous: boolean = false

  constructor(init?: StructFieldInit) {
    if (init) {
      Object.assign(this, init)
    }
  }

  public clone(): StructField {
    return new StructField({
      Name: this.Name,
      PkgPath: this.PkgPath,
      Type: this.Type,
      Tag: this.Tag,
      Offset: this.Offset,
      Index: $.arrayToSlice($.asArray(this.Index)),
      Anonymous: this.Anonymous,
    })
  }

  public IsExported(): boolean {
    return this.PkgPath === ''
  }
}

// StructTag is the tag string in a struct field, as in Go.
export type StructTag = string

// StructTag_Get returns the value associated with key in the tag string.
// If there is no such key in the tag, Get returns the empty string.
export function StructTag_Get(tag: StructTag, key: string): string {
  return StructTag_Lookup(tag, key)[0]
}

// StructTag_Lookup returns the value associated with key in the tag string,
// and whether the key is present, parsing the conventional format of
// space-separated key:"value" pairs with quoted values as in Go.
export function StructTag_Lookup(
  tag: StructTag,
  key: string,
): [string, boolean] {
  let rest = tag ?? ''
  while (rest !== '') {
    // Skip leading space.
    let i = 0
    while (i < rest.length && rest[i] === ' ') {
      i++
    }
    rest = rest.slice(i)
    if (rest === '') {
      break
    }

    // Scan to colon. A space, a quote or a control character is a syntax
    // error. Strictly speaking, control chars include the range [0x7f,
    // 0x9f], not just [0x00, 0x1f], but in practice, we ignore the
    // multi-byte control characters as it is simpler to inspect the tag's
    // bytes than the tag's runes.
    i = 0
    while (
      i < rest.length &&
      rest.charCodeAt(i) > 0x20 &&
      rest[i] !== ':' &&
      rest[i] !== '"' &&
      rest.charCodeAt(i) !== 0x7f
    ) {
      i++
    }
    if (
      i === 0 ||
      i + 1 >= rest.length ||
      rest[i] !== ':' ||
      rest[i + 1] !== '"'
    ) {
      break
    }
    const name = rest.slice(0, i)
    rest = rest.slice(i + 1)

    // Scan quoted string to find value.
    i = 1
    while (i < rest.length && rest[i] !== '"') {
      if (rest[i] === '\\') {
        i++
      }
      i++
    }
    if (i >= rest.length) {
      break
    }
    const quoted = rest.slice(0, i + 1)
    rest = rest.slice(i + 1)

    if (key === name) {
      try {
        return [JSON.parse(quoted) as string, true]
      } catch {
        break
      }
    }
  }
  return ['', false]
}

export class Method {
  public Name = ''
  public PkgPath = ''
  public Type: Type | null = null
  // Func is the method as a function taking the receiver first; it is the
  // zero Value for an interface type.
  public Func!: Value
  public Index = 0

  constructor(init?: Partial<Method>) {
    if (init) {
      Object.assign(this, init)
    }
  }

  // IsExported reports whether the method is exported.
  public IsExported(): boolean {
    return this.PkgPath === ''
  }

  // clone copies the method, as Go copies a Method struct value.
  public clone(): Method {
    return new Method(this)
  }
}

// Channel type for reflection.
export interface Channel<T = unknown> {
  readonly __channelBrand: unique symbol
  direction: ChanDir
  elementType: Type
  buffer: T[]
  closed: boolean
}

// SelectCase Select case for channel operations.
export class SelectCase {
  public Dir!: SelectDir
  public Chan?: Value // Value representing a channel - optional since default cases don't need it
  public Send?: Value // Value to send (if Dir is SendDir) - optional since only needed for send cases

  constructor(init?: Partial<SelectCase>) {
    if (init) {
      Object.assign(this, init)
    }
  }

  // clone copies the case, as Go copies a SelectCase struct value.
  public clone(): SelectCase {
    return new SelectCase({
      Dir: this.Dir,
      Chan: this.Chan?.clone(),
      Send: this.Send?.clone(),
    })
  }
}

// SelectDir Select direction constants - SelectDir is just an int in Go.
export type SelectDir = number

export const SelectSend: SelectDir = 1
export const SelectRecv: SelectDir = 2
export const SelectDefault: SelectDir = 3

export class SliceHeader {
  public Data: uintptr | StringHeaderData | null = 0
  public Len = 0
  public Cap = 0

  constructor(init?: Partial<SliceHeader>) {
    if (init) {
      Object.assign(this, init)
    }
  }

  // clone copies the header, as Go copies a SliceHeader struct value.
  public clone(): SliceHeader {
    return new SliceHeader(this)
  }
}

export class StringHeader {
  public Data: uintptr | StringHeaderData = 0
  public Len = 0

  constructor(init?: Partial<StringHeader>) {
    if (init) {
      Object.assign(this, init)
    }
  }

  // clone copies the header, as Go copies a StringHeader struct value.
  public clone(): StringHeader {
    return new StringHeader(this)
  }
}

// MapIter Map iterator with proper typing
// Key() and Value() return reflect.Value to match Go's reflect.MapIter.
export interface MapIter<K = unknown, V = unknown> {
  map: Map<K, V>
  iterator: Iterator<[K, V]>
  current: IteratorResult<[K, V]> | null
  Key(): Value
  Value(): Value
  Next(): boolean
  Reset(m: Map<K, V>): void
}

// bitVector Bit vector for tracking pointers.
export class bitVector {
  private bits: number[] = []

  Set(index: number): void {
    const wordIndex = Math.floor(index / 32)
    const bitIndex = index % 32
    while (this.bits.length <= wordIndex) {
      this.bits.push(0)
    }
    this.bits[wordIndex] |= 1 << bitIndex
  }

  Get(index: number): boolean {
    const wordIndex = Math.floor(index / 32)
    const bitIndex = index % 32
    if (wordIndex >= this.bits.length) {
      return false
    }
    return (this.bits[wordIndex] & (1 << bitIndex)) !== 0
  }
}

// ValueError Value error type.
export class ValueError extends Error {
  public Kind: Kind
  public Method: string

  constructor(init: { Kind: Kind; Method: string }) {
    super(
      `reflect: call of reflect.Value.${init.Method} on ${Kind_String(init.Kind)} Value`,
    )
    this.Kind = init.Kind
    this.Method = init.Method
    this.name = 'ValueError'
  }
}

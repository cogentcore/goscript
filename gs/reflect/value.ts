import * as $ from '@goscript/builtin/index.js'
import {
  Array,
  Bool,
  Float32,
  Float64,
  Int,
  Int16,
  Int32,
  Int64,
  Int8,
  Map,
  PointerTo,
  Ptr,
  Slice,
  SliceOf,
  Struct,
  String,
  Type,
  Uint,
  Uint16,
  Uint32,
  Uint64,
  Uint8,
  Uintptr,
  Value,
  Chan,
  BasicType,
  Invalid,
  structFieldStorageKey,
  typeInfoFromReflectType,
} from './type.js'
import {
  Pointer,
  ReflectValue,
  SelectCase,
  SelectRecv,
  SelectDefault,
} from './types.js'

interface ChannelObject {
  _sendQueue?: unknown[]
  send?: (value: unknown) => void
}

// Zero returns a Value representing the zero value for the specified type.
export function Zero(typ: Type | null): Value {
  if (typ === null) {
    return new Value() // Return invalid value for null type
  }
  return new Value(zeroReflectValue(typ), typ)
}

function zeroReflectValue(typ: Type): ReflectValue {
  switch (typ.Kind()) {
    case Bool:
      return false
    case Int:
    case Int8:
    case Int16:
    case Int32:
    case Uint:
    case Uint8:
    case Uint16:
    case Uint32:
    case Float32:
    case Float64:
      return 0
    case Int64:
    case Uint64:
    case Uintptr:
      return 0n
    case String:
      return ''
    case Slice:
    case Array:
      return []
    case Struct: {
      const typeInfo = $.getTypeByName(typ.String())
      if (typeInfo && $.isStructTypeInfo(typeInfo) && typeInfo.ctor) {
        return $.markAsStructValue(new typeInfo.ctor()) as ReflectValue
      }
      return newStructValue(typ)
    }
    default:
      return null
  }
}

function newStructValue(typ: Type): ReflectValue {
  type StructValueInstance = {
    _fields: Record<string, ReflectValue>
  }

  const initFields = (value: StructValueInstance): void => {
    for (let i = 0; i < typ.NumField(); i++) {
      const field = typ.Field(i)
      const key = structFieldStorageKey(typ, i)
      value._fields[key] = zeroReflectValue(field.Type)
      Object.defineProperty(value, key, {
        enumerable: true,
        configurable: true,
        get: () => value._fields[key],
        set: (next: unknown) => {
          value._fields[key] = next as ReflectValue
        },
      })
    }
  }

  const StructValue = class {
    public _fields: Record<string, ReflectValue> = {}

    public clone(): unknown {
      const cloned = new StructValue()
      initFields(cloned)
      for (const key of Object.keys(this._fields)) {
        cloned._fields[key] = this._fields[key]
      }
      return cloned
    }
  }
  Object.defineProperty(StructValue, '__reflectType', { value: typ })
  Object.defineProperty(StructValue, '__typeInfo', {
    value: typeInfoFromReflectType(typ),
  })

  const value = new StructValue()
  initFields(value)
  return value
}

// Copy copies the contents of src to dst until either dst has been filled
// or src has been exhausted. It returns the number of elements copied. Like
// the copy builtin, it copies within the slices' lengths, and src may be a
// string when dst is a byte slice.
export function Copy(dst: Value, src: Value): number {
  return $.copy(dst.value as $.Slice<unknown>, src.value as $.Slice<unknown>)
}

// Indirect returns the value that v points to.
export function Indirect(v: Value): Value {
  if (v.Kind() === Ptr) {
    if (v.IsNil()) {
      return new Value()
    }
    return v.Elem()
  }
  return v
}

// New returns a Value representing a pointer to a new zero value for the specified type.
export function New(typ: Type | null): Value {
  if (typ === null) {
    return new Value() // Return invalid value for null type
  }
  const ptrType = PointerTo(typ)
  return new Value($.varRef(zeroReflectValue(typ)), ptrType)
}

// NewAt returns a Value representing a pointer to the value at p.
export function NewAt(typ: Type | null, p: Pointer | unknown): Value {
  if (typ === null) {
    return new Value()
  }
  const ptrType = PointerTo(typ)
  const pointer = ownedPointerHandleFromPointerArg(p)
  if (pointer !== undefined) {
    return new Value(
      $.ownedPointerRef(pointer) as $.VarRef<ReflectValue>,
      ptrType,
    )
  }
  throw new Error('reflect.NewAt requires a GoScript-owned pointer')
}

export function SliceAt(
  typ: Type | null,
  p: Pointer | unknown,
  n: number,
): Value {
  if (typ === null) {
    return new Value()
  }
  if (n < 0) {
    throw new Error('reflect.SliceAt: negative length')
  }
  if (p === null && n === 0) {
    return new Value(null, SliceOf(typ))
  }
  const pointer = ownedPointerHandleFromPointerArg(p)
  if (pointer === undefined) {
    throw new Error('reflect.SliceAt requires a GoScript-owned pointer')
  }
  const slice = $.sliceFromOwnedPointer(pointer, n)
  return new Value(slice as ReflectValue, SliceOf(typ))
}

function ownedPointerHandleFromPointerArg(
  p: unknown,
): $.OwnedPointerHandle<ReflectValue> | undefined {
  if ($.isOwnedPointerHandle(p)) {
    return p as $.OwnedPointerHandle<ReflectValue>
  }
  if ($.isVarRef(p)) {
    return $.ownedPointerFromRef(p as $.VarRef<ReflectValue>) as
      | $.OwnedPointerHandle<ReflectValue>
      | undefined
  }
  return undefined
}

// MakeSlice returns a Value representing a new slice with the specified type, length, and capacity.
export function MakeSlice(typ: Type | null, len: number, _cap: number): Value {
  if (typ === null || typ.Kind() !== Slice) {
    throw new Error('reflect.MakeSlice of non-slice type')
  }

  // Create a slice with the specified length, filled with zero values.
  const elemType = typ.Elem()
  if (!elemType) {
    throw new Error('slice type missing element type')
  }
  const array = new globalThis.Array(len).fill(Zero(elemType).value)
  return new Value(array, typ)
}

// MakeMap returns a Value representing a new map with the specified type.
export function MakeMap(typ: Type | null): Value {
  if (typ === null || typ.Kind() !== Map) {
    throw new Error('reflect.MakeMap of non-map type')
  }

  const map = new globalThis.Map()
  return new Value(map, typ)
}

export function MakeMapWithSize(typ: Type | null, _n: number): Value {
  return MakeMap(typ)
}

// Append appends the values x to a slice and returns the resulting slice.
export function Append(s: Value, x: Value): Value {
  if (s.Kind() !== Slice) {
    throw new Error('reflect.Append of non-slice')
  }
  return new Value(
    $.append(s.value as $.Slice<unknown>, x.value) as ReflectValue,
    s.Type(),
  )
}

export function AppendSlice(s: Value, t: Value): Value {
  if (s.Kind() !== Slice || t.Kind() !== Slice) {
    throw new Error('reflect.AppendSlice of non-slice')
  }
  const right = $.asArray(t.value as $.Slice<unknown>)
  return new Value(
    $.append(s.value as $.Slice<unknown>, ...right) as ReflectValue,
    s.Type(),
  )
}

// MakeChan returns a Value representing a new channel with the specified type.
export function MakeChan(typ: Type, buffer: number): Value {
  // Only a channel type with an element type qualifies.
  if (typ.Kind() !== Chan) {
    throw new Error('reflect.MakeChan of non-chan type')
  }
  const elemType = typ.Elem()
  if (!elemType) {
    throw new Error('channel type missing element type')
  }

  // A receive from a closed channel yields the element's zero value.
  const channel = $.makeChannel(buffer, Zero(elemType).value)
  return new Value(channel, typ)
}

// Select executes a select operation on the provided cases.
// It returns the index of the chosen case, the received value (if applicable), and whether the receive was successful.
export function Select(cases: $.Slice<SelectCase>): [number, Value, boolean] {
  // Extract the backing array from the GoScript slice
  let selectCases: SelectCase[] = []

  if (cases && typeof cases === 'object') {
    if ('__meta__' in cases) {
      // This is a GoScript SliceProxy, extract the backing array
      const meta = (
        cases as {
          __meta__?: {
            backing?: SelectCase[]
            offset?: number
            length?: number
          }
        }
      ).__meta__
      if (meta && meta.backing) {
        const offset = meta.offset ?? 0
        const length = meta.length ?? meta.backing.length
        selectCases = meta.backing.slice(offset, offset + length)
      }
    } else if (globalThis.Array.isArray(cases)) {
      // This is a plain array (optimized case where offset=0 and length=capacity)
      selectCases = cases as SelectCase[]
    }
  }

  // Check for ready channels (channels with queued values)
  for (let i = 0; i < selectCases.length; i++) {
    const selectCase = selectCases[i]
    if (selectCase.Dir.valueOf() === SelectRecv.valueOf() && selectCase.Chan) {
      const channelValue = selectCase.Chan
      const channelObj = (channelValue as { value: unknown })
        .value as ChannelObject

      // Check if there are queued values to receive
      if (
        channelObj &&
        channelObj._sendQueue &&
        channelObj._sendQueue.length > 0
      ) {
        const receivedValue = channelObj._sendQueue.shift() as ReflectValue // Remove from queue
        const elemType = channelValue.Type().Elem()
        if (elemType) {
          const recvVal = new Value(receivedValue, elemType)
          return [i, recvVal, true]
        }
      }
    }
  }

  // Look for default case if no channels are ready
  for (let i = 0; i < selectCases.length; i++) {
    const selectCase = selectCases[i]
    if (selectCase.Dir.valueOf() === SelectDefault.valueOf()) {
      // Default case is immediately available
      return [i, new Value(null, new BasicType(Invalid, 'invalid')), false]
    }
  }

  // If no channels are ready and no default case, return first case as fallback
  if (selectCases.length > 0) {
    const firstCase = selectCases[0]
    if (firstCase.Dir.valueOf() === SelectRecv.valueOf() && firstCase.Chan) {
      // Simulate receiving a zero value
      const elemType = firstCase.Chan.Type().Elem()
      if (elemType) {
        const zeroVal = Zero(elemType)
        return [0, zeroVal, true]
      }
    }
    return [0, new Value(null, new BasicType(Invalid, 'invalid')), false]
  }

  // Fallback
  return [0, new Value(null, new BasicType(Invalid, 'invalid')), false]
}

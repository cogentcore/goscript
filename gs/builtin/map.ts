import { comparableEqual } from './builtin.js'
import { GoBinaryString, stringEqual, stringMapKey } from './slice.js'
import {
  canonicalPointerIdentity,
  isStructTypeInfo,
  resolveTypeInfo,
  structFieldRuntimeKey,
  TypeKind,
  type TypeInfo,
} from './type.js'

// GoMap indexes Go string representations by their canonical byte value and
// structs whose fields are all strings by their canonical field values.
// Pointer-key maps use backing identity without inspecting their targets.
// Iteration retains the original key; object and struct equality stays in the
// shared comparison path below. Keys without an indexed representation
// allocate no secondary index and fall back to the shared comparison scan.
class GoMap<K, V> extends Map<K, V> {
  readonly pointerKeys: boolean
  private pointerIndex?: Map<object, K>
  private stringKeys?: Map<string, K>
  private structKeys?: Map<string, K[]>

  constructor(keyType?: TypeInfo | string) {
    super()
    const info = resolveTypeInfo(keyType)
    this.pointerKeys = info?.kind === TypeKind.Pointer
  }

  override set(key: K, value: V): this {
    if (this.pointerKeys) {
      key = this.storedKey(key)
      if (typeof key === 'object' && key !== null) {
        this.pointerIndex ??= new Map<object, K>()
        this.pointerIndex.set(canonicalPointerIdentity(key), key)
      }
    } else if (isGoStringKey(key)) {
      const canonical = stringMapKey(key)
      this.stringKeys ??= new Map<string, K>()
      key = this.stringKeys.get(canonical) ?? key
      this.stringKeys.set(canonical, key)
    } else {
      const stored = this.structEntry(key)
      if (stored !== undefined) {
        key = stored
      } else {
        this.addStructKey(key)
      }
    }
    return super.set(key, value)
  }

  override get(key: K): V | undefined {
    return super.get(this.storedKey(key))
  }

  override has(key: K): boolean {
    return super.has(this.storedKey(key))
  }

  override delete(key: K): boolean {
    const stored = this.storedKey(key)
    if (this.pointerKeys) {
      if (typeof key === 'object' && key !== null)
        this.pointerIndex?.delete(canonicalPointerIdentity(key))
    } else if (isGoStringKey(key)) this.stringKeys?.delete(stringMapKey(key))
    else this.removeStructKey(stored)
    return super.delete(stored)
  }

  override clear(): void {
    this.pointerIndex?.clear()
    this.stringKeys?.clear()
    this.structKeys?.clear()
    super.clear()
  }

  // structEntry returns the stored key equal to key under Go struct
  // equality, or undefined when the index holds no matching candidate. The
  // bucket only narrows candidates; comparableEqual stays the equality
  // authority, so same-field structs of different types stay distinct.
  private structEntry(key: K): K | undefined {
    const canonical = structMapKey(key)
    if (canonical === undefined) return undefined
    const bucket = this.structKeys?.get(canonical)
    if (bucket === undefined) return undefined
    for (const member of bucket) {
      if (comparableEqual(member, key)) return member
    }
    return undefined
  }

  private storedKey(key: K): K {
    if (this.pointerKeys) {
      return typeof key === 'object' && key !== null ?
          (this.pointerIndex?.get(canonicalPointerIdentity(key)) ?? key)
        : key
    }
    if (isGoStringKey(key)) {
      return this.stringKeys?.get(stringMapKey(key)) ?? key
    }
    return this.structEntry(key) ?? key
  }

  private addStructKey(key: K): void {
    const canonical = structMapKey(key)
    if (canonical === undefined) return
    this.structKeys ??= new Map<string, K[]>()
    const bucket = this.structKeys.get(canonical)
    if (bucket === undefined) {
      this.structKeys.set(canonical, [key])
    } else {
      bucket.push(key)
    }
  }

  private removeStructKey(stored: K): void {
    const canonical = structMapKey(stored)
    if (canonical === undefined) return
    const bucket = this.structKeys?.get(canonical)
    if (bucket === undefined) return
    const remaining = bucket.filter((member) => member !== stored)
    if (remaining.length === 0) {
      this.structKeys!.delete(canonical)
    } else {
      this.structKeys!.set(canonical, remaining)
    }
  }
}

// makeMap receives pointer or generic key metadata from the compiler; other
// key types use Go value equality and the available value indexes.
export function makeMap<K, V>(
  entries?: Iterable<readonly [K, V]>,
  keyType?: TypeInfo | string,
): Map<K, V> {
  const map = new GoMap<K, V>(keyType)
  if (entries) for (const [key, value] of entries) mapSet(map, key, value)
  return map
}

// mapGet returns the value and presence without confusing stored undefined with a miss.
export function mapGet<K, V, D>(
  map: Map<K, V> | null,
  key: K,
  defaultValue: D,
): [V, true] | [D, false] {
  const entry = findMapEntry(map, key)
  if (entry.found) {
    return [entry.value, true]
  } else {
    return [defaultValue, false]
  }
}

// mapSet preserves the existing equal key when replacing its value.
export const mapSet = <K, V>(map: Map<K, V> | null, key: K, value: V): void => {
  if (!map) {
    throw new Error('assign to nil map')
  }
  const entry = findMapEntry(map, key)
  map.set(entry.found ? entry.key : key, value)
}

// deleteMapEntry removes a key using Go value equality.
export const deleteMapEntry = <K, V>(map: Map<K, V> | null, key: K): void => {
  const entry = findMapEntry(map, key)
  if (entry.found) {
    map!.delete(entry.key)
  }
}

// mapHas reports membership using Go value equality.
export const mapHas = <K, V>(map: Map<K, V> | null, key: K): boolean => {
  return findMapEntry(map, key).found
}

function findMapEntry<K, V>(
  map: Map<K, V> | null,
  key: K,
): { found: false } | { found: true; key: K; value: V } {
  if (!map) {
    return { found: false }
  }
  if (map.has(key)) {
    return { found: true, key, value: map.get(key)! }
  }
  if (map instanceof GoMap && map.pointerKeys) return { found: false }
  if (isGoStringKey(key)) {
    if (map instanceof GoMap) return { found: false }
    for (const [candidate, value] of map.entries()) {
      if (
        isGoStringKey(candidate) &&
        stringEqual(candidate as string, key as string)
      ) {
        return { found: true, key: candidate, value }
      }
    }
    return { found: false }
  }
  if (key === null || (typeof key !== 'object' && typeof key !== 'function')) {
    return { found: false }
  }
  if (map instanceof GoMap && structMapKey(key) !== undefined) {
    return { found: false }
  }
  for (const [candidate, value] of map.entries()) {
    if (candidate !== key && comparableEqual(candidate, key)) {
      return { found: true, key: candidate, value }
    }
  }
  return { found: false }
}

function isGoStringKey(value: unknown): value is string | GoBinaryString {
  return typeof value === 'string' || value instanceof GoBinaryString
}

// structMapKey returns the canonical index key for a struct whose fields are
// all strings, numbers, booleans, pointers or such structs, or undefined for
// any other value. The canonical form narrows candidates by field names and
// values, and pointers by their identity, since what they point to may
// change. comparableEqual still decides identity, type, and field equality
// within a bucket. Keys with other fields, such as interfaces, remain on the
// comparison scan.
function structMapKey(key: unknown): string | undefined {
  if (typeof key !== 'object' || key === null) return undefined
  const fields = (key as { _fields?: unknown })._fields
  if (typeof fields !== 'object' || fields === null || Array.isArray(fields)) {
    return undefined
  }
  const kinds = structFieldKinds(key)
  const names = Object.keys(fields)
  const parts: string[] = []
  for (const name of names.sort()) {
    const value = structMapKeyField(
      (fields as Record<string, unknown>)[name],
      kinds?.get(name),
    )
    if (value === undefined) return undefined
    parts.push(`${name.length}:${name}${value.length}:${value}`)
  }
  return parts.join('')
}

// structFieldKinds returns the kind of each field of a struct value by its
// runtime key, from the type info of its class, or undefined without one.
function structFieldKinds(value: object): Map<string, TypeKind> | undefined {
  const ctor = (value as { constructor?: { __typeInfo?: TypeInfo } })
    .constructor
  const info = resolveTypeInfo(ctor?.__typeInfo)
  if (info === undefined || !isStructTypeInfo(info)) return undefined
  let kinds = structFieldKindCache.get(info)
  if (kinds === undefined) {
    kinds = new Map()
    for (const field of info.fields) {
      const kind = resolveTypeInfo(field.type)?.kind
      if (kind !== undefined) kinds.set(structFieldRuntimeKey(field), kind)
    }
    structFieldKindCache.set(info, kinds)
  }
  return kinds
}

const structFieldKindCache = new WeakMap<object, Map<string, TypeKind>>()

// pointerKeyIDs numbers the pointers in struct map keys by identity.
const pointerKeyIDs = new WeakMap<object, number>()
let nextPointerKeyID = 1

// structMapKeyField returns the index text of a struct key field of the
// given kind: a string, number, boolean, pointer or nested struct, or
// undefined for any other field, which leaves the key unindexed.
function structMapKeyField(
  value: unknown,
  kind: TypeKind | undefined,
): string | undefined {
  if (isGoStringKey(value)) return 's' + stringMapKey(value)
  switch (typeof value) {
    case 'number':
      return 'n' + String(value)
    case 'bigint':
      return 'n' + value.toString()
    case 'boolean':
      return value ? 't' : 'f'
  }
  if (kind === TypeKind.Pointer) {
    if (value === null || value === undefined) return 'p0'
    if (typeof value !== 'object') return undefined
    const identity = canonicalPointerIdentity(value)
    let id = pointerKeyIDs.get(identity)
    if (id === undefined) {
      id = nextPointerKeyID++
      pointerKeyIDs.set(identity, id)
    }
    return 'p' + id
  }
  if (kind !== TypeKind.Struct) return undefined
  const nested = structMapKey(value)
  return nested === undefined ? undefined : 'r' + nested
}

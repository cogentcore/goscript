import { Type, Value, TypeOf } from './type.js'
import type { ReflectValue } from './types.js'

export { MapOf } from './type.js'

/**
 * MapIter is an iterator for ranging over a map, as in Go's reflect.MapIter.
 * It starts before the first entry; each call to Next advances it.
 * Key and Value return reflect.Values of the map's key and element types.
 * @template K - The type of keys in the map
 * @template V - The type of values in the map
 */
export class MapIter<K = unknown, V = unknown> {
  public iterator: Iterator<[K, V]>
  public current: IteratorResult<[K, V]> | null = null

  constructor(
    public map: Map<K, V>,
    public typ: Type | null = null,
  ) {
    this.iterator = map.entries()
  }

  public Next(): boolean {
    this.current = this.iterator.next()
    return !this.current.done
  }

  public Key(): Value {
    if (this.current === null || this.current.done) {
      throw new Error('MapIter.Key called on exhausted iterator')
    }
    const rawKey = this.current.value[0] as ReflectValue
    return new Value(rawKey, this.typ?.Key() ?? TypeOf(rawKey))
  }

  public Value(): Value {
    if (this.current === null || this.current.done) {
      throw new Error('MapIter.Value called on exhausted iterator')
    }
    const rawVal = this.current.value[1] as ReflectValue
    return new Value(rawVal, this.typ?.Elem() ?? TypeOf(rawVal))
  }

  // Reset modifies iter to iterate over v, which must be a map value or the
  // zero Value, as in Go.
  public Reset(v: Value): void {
    if (!v.IsValid()) {
      this.map = new globalThis.Map()
      this.typ = null
    } else {
      const m = v.Interface() as Map<K, V> | null
      this.map = m ?? new globalThis.Map()
      this.typ = v.Type()
    }
    this.iterator = this.map.entries()
    this.current = null
  }
}

// MakeMap Helper functions for map operations.
export function MakeMap(typ: Type): Value {
  const map = new Map()
  return new Value(map, typ)
}

export function MakeMapWithSize(typ: Type, _n: number): Value {
  // JavaScript Map doesn't have initial size, so we ignore n
  return MakeMap(typ)
}

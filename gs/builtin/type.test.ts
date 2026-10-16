import { describe, expect, it } from 'vitest'

import {
  basicInterfaceValue,
  basicType,
  methodSignature,
  registerInterfaceType,
  registerStructType,
  type MethodSignature,
  type StructFieldInfo,
  is,
  type MapTypeInfo,
  pointerType,
  type SliceTypeInfo,
  typeAssert,
  TypeKind,
  typeSwitch,
} from './type.js'

// map[string]any
const mapStringAny: MapTypeInfo = {
  kind: TypeKind.Map,
  keyType: { kind: TypeKind.Basic, name: 'string' },
  elemType: { kind: TypeKind.Interface, methods: [] },
}

// []any
const sliceAny: SliceTypeInfo = {
  kind: TypeKind.Slice,
  elemType: { kind: TypeKind.Interface, methods: [] },
}

describe('a Go slice is never a map (structural type matching)', () => {
  it('is(): a plain array does not match map[string]any', () => {
    expect(is([1, 2, 3], mapStringAny)).toBe(false)
  })

  it('is(): a plain array matches []any', () => {
    expect(is([1, 2, 3], sliceAny)).toBe(true)
  })

  it('typeAssert(): a plain array fails a map[string]any assertion', () => {
    const { ok } = typeAssert([1, 2, 3], mapStringAny)
    expect(ok).toBe(false)
  })

  it('typeAssert(): a plain array succeeds a []any assertion', () => {
    const { ok, value } = typeAssert<number[]>([1, 2, 3], sliceAny)
    expect(ok).toBe(true)
    expect(value).toEqual([1, 2, 3])
  })

  it('a Uint8Array (the runtime byte-slice representation) does not match map[string]any', () => {
    const bytes = new Uint8Array([1, 2, 3])
    expect(is(bytes, mapStringAny)).toBe(false)
    expect(typeAssert(bytes, mapStringAny).ok).toBe(false)
  })

  it('typeSwitch(): an []any value takes the slice case, not an earlier map[string]any case', () => {
    // Mirrors a Go type switch that lists `case map[string]any:` before
    // `case []any:` — the ordering that exposed the bug, since the map
    // case is tried first and must correctly reject the array.
    const result = typeSwitch(
      [1, 2, 3],
      [
        { types: [mapStringAny], body: () => 'map' },
        { types: [sliceAny], body: () => 'slice' },
      ],
      () => 'default',
    )
    expect(result).toBe('slice')
  })

  it('an empty array (or Uint8Array) does not vacuously match an empty-map fast path', () => {
    // matchesMapType/typeAssert's map branch special-cases zero entries as
    // "matches any map type"; an empty slice/byte-slice must not hit that
    // path either — Object.entries() of an empty Uint8Array is also empty.
    expect(is([], mapStringAny)).toBe(false)
    expect(is([], sliceAny)).toBe(true)
    expect(is(new Uint8Array(0), mapStringAny)).toBe(false)
  })
})

describe('compact basic descriptors', () => {
  it('preserves named type identity without sharing mutable descriptors', () => {
    const first = basicType('uint64', 'main.Counter')
    const second = basicType('uint64', 'main.Counter')
    expect(first).toEqual({
      kind: TypeKind.Basic,
      name: 'uint64',
      typeName: 'main.Counter',
    })
    first.name = 'changed'
    expect(second.name).toBe('uint64')
    expect(basicType('string')).toEqual({
      kind: TypeKind.Basic,
      name: 'string',
    })
  })
})

describe('deferred struct metadata', () => {
  it('initializes fields and methods independently once when inspected', () => {
    let methodReads = 0
    let fieldReads = 0
    class Sample {}
    const methods: MethodSignature[] = [
      methodSignature(
        'Read',
        [basicType('int'), ['offset', 'main.Offset']],
        ['error', ['n', basicType('int')]],
      ),
      methodSignature('Close'),
    ]
    const fields: StructFieldInfo[] = [
      { name: 'Value', type: basicType('int') },
    ]
    const info = registerStructType(
      'test.DeferredSample',
      () => new Sample(),
      () => {
        methodReads++
        return methods
      },
      Sample,
      () => {
        fieldReads++
        return fields
      },
    )
    expect([methodReads, fieldReads]).toEqual([0, 0])
    expect(info.methods).toBe(methods)
    expect(info.methods).toBe(methods)
    expect(info.methods).toEqual([
      {
        name: 'Read',
        args: [
          { name: '_p0', type: basicType('int') },
          { name: 'offset', type: 'main.Offset' },
        ],
        returns: [
          { name: '_r0', type: 'error' },
          { name: 'n', type: basicType('int') },
        ],
      },
      { name: 'Close', args: [], returns: [] },
    ])
    expect([methodReads, fieldReads]).toEqual([1, 0])
    expect(info.fields).toBe(fields)
    expect(info.fields).toBe(fields)
    expect([methodReads, fieldReads]).toEqual([1, 1])
    info.fields = []
    expect(info.fields).toEqual([])
    expect(fieldReads).toBe(1)
  })
})

describe('interface assertions of classes that share a Go type name', () => {
  it('checks each class against the interface', () => {
    // Values boxed in generic code can carry the name of a type parameter.
    class Named {
      Name(): string {
        return 'named'
      }
    }
    class Plain {}
    registerStructType(
      'test.SharedNameNamed',
      () => new Named(),
      () => [methodSignature('Name', [], [basicType('string')])],
      Named,
      () => [],
    )
    registerStructType(
      'test.SharedNamePlain',
      () => new Plain(),
      () => [],
      Plain,
      () => [],
    )
    const namer = {
      kind: TypeKind.Interface,
      methods: [methodSignature('Name', [], [basicType('string')])],
    } as const
    const named = Object.defineProperty(new Named(), '__goType', {
      value: '*T',
    })
    const plain = Object.defineProperty(new Plain(), '__goType', {
      value: '*T',
    })

    // The answers stay right as the classes alternate.
    for (let i = 0; i < 3; i++) {
      expect(is(named, namer)).toBe(true)
      expect(is(plain, namer)).toBe(false)
    }
  })
})

describe('assertions of boxed values to types named by strings', () => {
  it('give the same results when repeated, for each class of a type name', () => {
    // Two classes boxed with the same type name and info, as in generic code.
    class Speaker {
      Speak(): string {
        return 'hi'
      }
    }
    class Mute {}
    registerInterfaceType('test.CachedSpeaker', null, [
      methodSignature('Speak', [], [basicType('string')]),
    ])
    const speaker = new Speaker()
    const mute = new Mute()
    for (const value of [speaker, mute]) {
      Object.defineProperty(value, '__goType', { value: '*T' })
      Object.defineProperty(value, '__goTypeInfo', { value: '*T' })
    }

    // The answers stay right as the classes alternate.
    for (let i = 0; i < 3; i++) {
      expect(typeAssert(speaker, 'test.CachedSpeaker')).toEqual({
        value: speaker,
        ok: true,
      })
      expect(typeAssert(mute, 'test.CachedSpeaker').ok).toBe(false)
    }
  })

  it('return a new zero value for each failed assertion', () => {
    // A failed assertion to a struct type yields its zero value.
    class Point {
      X = 0
    }
    class Other {}
    registerStructType(
      'test.CachedPoint',
      () => new Point(),
      () => [],
      Point,
      () => [{ name: 'X', type: basicType('int') }],
    )
    const other = Object.assign(new Other(), {
      __goType: 'test.CachedOther',
      __goTypeInfo: 'test.CachedOther',
    })
    const first = typeAssert<Point>(other, 'test.CachedPoint')
    const second = typeAssert<Point>(other, 'test.CachedPoint')
    expect([first.ok, second.ok]).toEqual([false, false])
    expect(first.value).not.toBe(second.value)
  })
})

describe('assertions of boxed pointers to pointer descriptors', () => {
  it('match the pointer to the same named type only', () => {
    // Two struct types, as go/types has Alias and Basic.
    class Alias {}
    class Basic {}
    registerStructType('test.PtrAlias', () => new Alias(), [], Alias)
    registerStructType('test.PtrBasic', () => new Basic(), [], Basic)
    const basic = new Basic()
    const boxed = {
      __goType: '*test.PtrBasic',
      __goTypeInfo: pointerType('test.PtrBasic'),
      __goValue: basic,
    }

    // Each assertion takes a new descriptor, as generated code makes them.
    expect(typeAssert(boxed, pointerType('test.PtrBasic'))).toEqual({
      value: basic,
      ok: true,
    })
    expect(typeAssert(boxed, pointerType('test.PtrAlias'))).toEqual({
      value: null,
      ok: false,
    })
    expect(typeAssert(boxed, pointerType('test.PtrUnregistered')).ok).toBe(
      false,
    )
  })
})

describe('boxes of basic values', () => {
  it('share a prototype and keep their value and type', () => {
    const a = basicInterfaceValue(1.5, 'float32')
    const b = basicInterfaceValue(2, 'float32')
    expect(Object.getPrototypeOf(a)).toBe(Object.getPrototypeOf(b))
    expect(+a).toBe(1.5)
    expect(String(b)).toBe('2')
    expect(typeAssert(a, basicType('float32'))).toEqual({ value: 1.5, ok: true })
    expect(typeAssert(a, basicType('float64')).ok).toBe(false)
  })
})

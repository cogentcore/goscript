import { describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'
import * as bytes from '@goscript/bytes/index.js'
import * as io from '@goscript/io/index.js'

import {
  Compact,
  HTMLEscape,
  Indent,
  InvalidUTF8Error,
  InvalidUnmarshalError,
  MarshalerError,
  Marshal,
  MarshalIndent,
  NewDecoder,
  type Decoder,
  NewEncoder,
  Number_Float64,
  Number_Int64,
  Number_MarshalJSONTo,
  Number_String,
  Number_UnmarshalJSONFrom,
  RawMessage_MarshalJSON,
  RawMessage_UnmarshalJSON,
  SyntaxError as JSONSyntaxError,
  UnmarshalFieldError,
  Unmarshal,
  UnmarshalTypeError,
  UnsupportedTypeError,
  UnsupportedValueError,
  Valid,
  type Marshaler,
  type Unmarshaler,
} from './index.js'

class Person {
  public Name = ''
  public Age = 0
  public Active = false

  static __typeInfo = $.registerStructType(
    'test.Person',
    new Person(),
    [],
    Person,
    [
      {
        name: 'Name',
        key: 'Name',
        type: { kind: $.TypeKind.Basic, name: 'string' },
        tag: 'json:"name"',
      },
      {
        name: 'Age',
        key: 'Age',
        type: { kind: $.TypeKind.Basic, name: 'int' },
        tag: 'json:"age"',
      },
      {
        name: 'Active',
        key: 'Active',
        type: { kind: $.TypeKind.Basic, name: 'bool' },
        tag: 'json:"active"',
      },
    ],
  )
}

class FieldAlias {
  public Name = ''

  static __typeInfo = $.registerStructType(
    'test.FieldAlias',
    new FieldAlias(),
    [],
    FieldAlias,
    [
      {
        name: 'FullName',
        key: 'Name',
        type: { kind: $.TypeKind.Basic, name: 'string' },
      },
    ],
  )
}

class OmitEmptyStruct {
  public Name = ''
  public Age = 0
  public Tags = []
  public Data = new Uint8Array(0)

  static __typeInfo = $.registerStructType(
    'test.OmitEmptyStruct',
    new OmitEmptyStruct(),
    [],
    OmitEmptyStruct,
    [
      {
        name: 'Name',
        key: 'Name',
        type: { kind: $.TypeKind.Basic, name: 'string' },
        tag: 'json:"name,omitempty"',
      },
      {
        name: 'Age',
        key: 'Age',
        type: { kind: $.TypeKind.Basic, name: 'int' },
        tag: 'json:"age,omitempty"',
      },
      {
        name: 'Tags',
        key: 'Tags',
        type: {
          kind: $.TypeKind.Slice,
          elemType: { kind: $.TypeKind.Basic, name: 'string' },
        },
        tag: 'json:"tags,omitempty"',
      },
      {
        name: 'Data',
        key: 'Data',
        type: {
          kind: $.TypeKind.Slice,
          elemType: { kind: $.TypeKind.Basic, name: 'uint8' },
        },
        tag: 'json:"data,omitempty"',
      },
    ],
  )
}
class Ref {
  public Name = ''

  static __typeInfo: $.StructTypeInfo
}

Ref.__typeInfo = $.registerStructType('test.Ref', new Ref(), [], Ref, [
  {
    name: 'Name',
    key: 'Name',
    type: { kind: $.TypeKind.Basic, name: 'string' },
    tag: 'json:"name"',
  },
])

class Container {
  public Contexts = null

  static __typeInfo = $.registerStructType(
    'test.Container',
    new Container(),
    [],
    Container,
    [
      {
        name: 'Contexts',
        key: 'Contexts',
        type: {
          kind: $.TypeKind.Map,
          elemType: { kind: $.TypeKind.Slice, elemType: 'test.Ref' },
        },
        tag: 'json:"contexts"',
      },
    ],
  )
}

class Property {
  public Type = ''

  static __typeInfo = $.registerStructType(
    'test.Property',
    new Property(),
    [],
    Property,
    [
      {
        name: 'Type',
        key: 'Type',
        type: { kind: $.TypeKind.Basic, name: 'string' },
        tag: 'json:"type"',
      },
    ],
  )
}

class Schema {
  public Properties = null
  public Items = null

  static __typeInfo = $.registerStructType(
    'test.Schema',
    new Schema(),
    [],
    Schema,
    [
      {
        name: 'Properties',
        key: 'Properties',
        type: {
          kind: $.TypeKind.Map,
          elemType: { kind: $.TypeKind.Pointer, elemType: 'test.Property' },
        },
        tag: 'json:"properties"',
      },
      {
        name: 'Items',
        key: 'Items',
        type: { kind: $.TypeKind.Pointer, elemType: 'test.Property' },
        tag: 'json:"items"',
      },
    ],
  )
}

class OmitEmptyRefStruct {
  public Ptr = null
  public PtrNilIface = null
  public Any = null
  public Count = 0n

  static __typeInfo = $.registerStructType(
    'test.OmitEmptyRefStruct',
    new OmitEmptyRefStruct(),
    [],
    OmitEmptyRefStruct,
    [
      {
        name: 'Ptr',
        key: 'Ptr',
        type: {
          kind: $.TypeKind.Pointer,
          elemType: { kind: $.TypeKind.Basic, name: 'int' },
        },
        tag: 'json:"ptr,omitempty"',
      },
      {
        name: 'PtrNilIface',
        key: 'PtrNilIface',
        type: {
          kind: $.TypeKind.Pointer,
          elemType: { kind: $.TypeKind.Interface },
        },
        tag: 'json:"ptrNilIface,omitempty"',
      },
      {
        name: 'Any',
        key: 'Any',
        type: { kind: $.TypeKind.Interface },
        tag: 'json:"any,omitempty"',
      },
      {
        name: 'Count',
        key: 'Count',
        type: { kind: $.TypeKind.Basic, name: 'int64' },
        tag: 'json:"count,omitempty"',
      },
    ],
  )
}

class HookPointee {
  public Text = ''
  public Marker = ''

  UnmarshalJSON(data: $.Slice<number>): $.GoError {
    this.Text = $.bytesToString(data)
    return null
  }

  static __typeInfo = $.registerStructType(
    'test.HookPointee',
    new HookPointee(),
    [],
    HookPointee,
    [],
  )
}

class HookHolder {
  public Hook = null

  static __typeInfo = $.registerStructType(
    'test.HookHolder',
    new HookHolder(),
    [],
    HookHolder,
    [
      {
        name: 'Hook',
        key: 'Hook',
        type: { kind: $.TypeKind.Pointer, elemType: 'test.HookPointee' },
        tag: 'json:"hook"',
      },
    ],
  )
}

class Holder {
  public Value = null

  static __typeInfo = $.registerStructType(
    'test.Holder',
    new Holder(),
    [],
    Holder,
    [
      {
        name: 'Value',
        key: 'Value',
        type: { kind: $.TypeKind.Interface, methods: [] },
        tag: 'json:"value"',
      },
    ],
  )
}

describe('encoding/json override', () => {
  it('registers the Unmarshaler interface shape', () => {
    class CustomMarshaler implements Marshaler {
      MarshalJSON(): [$.Slice<number>, $.GoError] {
        return [$.stringToBytes('{"ok":true}'), null]
      }
    }

    class CustomUnmarshaler implements Unmarshaler {
      UnmarshalJSON(_data: $.Slice<number>): $.GoError {
        return null
      }
    }

    const [, marshalOK] = $.typeAssertTuple<Marshaler>(
      new CustomMarshaler(),
      'json.Marshaler',
    )
    const [value, ok] = $.typeAssertTuple<Unmarshaler>(
      new CustomUnmarshaler(),
      'json.Unmarshaler',
    )

    expect(marshalOK).toBe(true)
    expect(ok).toBe(true)
    expect(value.UnmarshalJSON($.stringToBytes('{}'))).toBeNull()
  })

  it('registers the SyntaxError zero value without making an Error at import', () => {
    // The registration holds a factory, so loading the package makes no Error.
    const info = $.getTypeByName('json.SyntaxError') as { zeroValue?: unknown }
    expect(typeof info.zeroValue).toBe('function')

    // The factory still makes a zero SyntaxError.
    const zero = (info.zeroValue as () => unknown)()
    expect(zero).toBeInstanceOf(JSONSyntaxError)
    expect((zero as InstanceType<typeof JSONSyntaxError>).Offset).toBe(0)
  })

  it('exposes JSON error structs as Go errors', () => {
    for (const err of [
      new JSONSyntaxError(),
      new InvalidUTF8Error({ S: 'bad' }),
      new InvalidUnmarshalError(),
      new MarshalerError({ Err: $.newError('bad marshal') }),
      new UnmarshalFieldError({ Key: 'field' }),
      new UnmarshalTypeError({ Value: 'string' }),
      new UnsupportedTypeError(),
      new UnsupportedValueError({ Str: 'NaN' }),
    ]) {
      expect(err.Error()).toBe(err.message)
    }
  })

  it('marshals struct fields through json tags', () => {
    const person = new Person()
    person.Name = 'Alice'
    person.Age = 30
    person.Active = true

    const [data, err] = Marshal(person)

    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe(
      '{"name":"Alice","age":30,"active":true}',
    )
  })

  it('uses descriptor names separately from storage keys', () => {
    const alias = new FieldAlias()
    alias.Name = 'Ada'

    const [data, err] = Marshal(alias)
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"FullName":"Ada"}')

    const target = $.varRef(new FieldAlias())
    expect(
      Unmarshal($.stringToBytes('{"FullName":"Grace"}'), target),
    ).toBeNull()
    expect(target.value.Name).toBe('Grace')
  })

  it('omits zero-valued fields tagged omitempty on marshal', () => {
    const zero = new OmitEmptyStruct()
    const [zeroData, zeroErr] = Marshal(zero)
    expect(zeroErr).toBeNull()
    expect($.bytesToString(zeroData)).toBe('{}')

    const filled = new OmitEmptyStruct()
    filled.Name = 'Ada'
    filled.Age = 30
    filled.Tags = ['x']
    filled.Data = $.stringToBytes('x')
    const [data, err] = Marshal(filled)
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe(
      '{"name":"Ada","age":30,"tags":["x"],"data":"eA=="}',
    )
  })

  it('omits nil pointers/interfaces but keeps non-nil ones holding a zero value', () => {
    const zero = new OmitEmptyRefStruct()
    const [zeroData, zeroErr] = Marshal(zero)
    expect(zeroErr).toBeNull()
    expect($.bytesToString(zeroData)).toBe('{}')

    // Non-nil wrappers are not empty: omit only when the pointer/interface
    // itself is nil, not when the pointed or dynamic value is zero or nil.
    const filled = new OmitEmptyRefStruct()
    filled.Ptr = $.varRef(0)
    filled.PtrNilIface = $.varRef(null)
    filled.Any = 0
    const [data, err] = Marshal(filled)
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"ptr":0,"ptrNilIface":null,"any":0}')
  })

  it('treats a zero bigint as empty for omitempty', () => {
    const zero = new OmitEmptyRefStruct()
    const [zeroData, zeroErr] = Marshal(zero)
    expect(zeroErr).toBeNull()
    expect($.bytesToString(zeroData)).toBe('{}')

    const nonZero = new OmitEmptyRefStruct()
    nonZero.Count = 5n
    const [data, err] = Marshal(nonZero)
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"count":5}')

    // A non-nil interface holding a zero bigint is still non-empty.
    const boxedZero = new OmitEmptyRefStruct()
    boxedZero.Any = 0n
    const [boxedData, boxedErr] = Marshal(boxedZero)
    expect(boxedErr).toBeNull()
    expect($.bytesToString(boxedData)).toBe('{"any":0}')
  })

  it('unwraps a boxed interface{} value before marshaling instead of leaking its wrapper', () => {
    // A value of a named/defined type stored in an interface{} is boxed by
    // the runtime as { __goType, __goValue, ... } so it can carry methods.
    // Marshal must serialize the underlying value, not the wrapper.
    const namedInt = $.namedValueInterfaceValue<unknown>(42, 'test.Status', {})
    const [data, err] = Marshal(namedInt)
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('42')

    const namedString = $.namedValueInterfaceValue<unknown>(
      'active',
      'test.Status',
      {},
    )
    const holder = new FieldAlias()
    Reflect.set(holder, 'Name', namedString)
    const [holderData, holderErr] = Marshal(holder)
    expect(holderErr).toBeNull()
    expect($.bytesToString(holderData)).toBe('{"FullName":"active"}')
  })

  it('does not mistake an ordinary object with a __goValue key for a box', () => {
    // Only the runtime's actual boxed shape (string __goType plus __goValue,
    // see isNamedValueBox in gs/builtin/type.ts) may be unwrapped. A plain JS
    // object that merely has a __goValue property is legal Marshal input and
    // must serialize as-is.
    const [data, err] = Marshal({ __goValue: 5 })
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"__goValue":5}')
  })

  it('rejects unsupported values and invalid unmarshal targets', () => {
    const [nanData, nanErr] = Marshal(Number.NaN)
    expect(nanData).toBeNull()
    expect(nanErr).toBeInstanceOf(UnsupportedValueError)

    const [htmlData, htmlErr] = Marshal(new Map([['text', '<tag>&']]))
    expect(htmlErr).toBeNull()
    expect($.bytesToString(htmlData)).toBe(
      '{"text":"\\u003ctag\\u003e\\u0026"}',
    )

    expect(Unmarshal($.stringToBytes('{}'), null)).toBeInstanceOf(
      InvalidUnmarshalError,
    )
    expect(Unmarshal($.stringToBytes('{}'), 1)).toBeInstanceOf(
      InvalidUnmarshalError,
    )
  })

  it('uses custom marshal and unmarshal hooks', () => {
    class CustomJSON implements Marshaler, Unmarshaler {
      public Text = ''

      MarshalJSON(): [$.Slice<number>, $.GoError] {
        return [$.stringToBytes('{"hook":true}'), null]
      }

      UnmarshalJSON(data: $.Slice<number>): $.GoError {
        this.Text = $.bytesToString(data)
        return null
      }
    }

    class RawEnvelope {
      public Raw = $.stringToBytes('{"embedded":true}')

      static __typeInfo = $.registerStructType(
        'test.RawEnvelope',
        new RawEnvelope(),
        [],
        RawEnvelope,
        [
          {
            name: 'Raw',
            key: 'Raw',
            type: 'json.RawMessage',
            tag: 'json:"raw"',
          },
        ],
      )
    }

    class Envelope {
      public Person = new Person()
      public Data = new Uint8Array(0)
      public Raw = new Uint8Array(0)
      public Hook = new CustomJSON()

      static __typeInfo = $.registerStructType(
        'test.Envelope',
        new Envelope(),
        [],
        Envelope,
        [
          {
            name: 'Person',
            key: 'Person',
            type: { kind: $.TypeKind.Struct, name: 'test.Person' },
            tag: 'json:"person"',
          },
          {
            name: 'Data',
            key: 'Data',
            type: {
              kind: $.TypeKind.Slice,
              elemType: { kind: $.TypeKind.Basic, name: 'uint8' },
            },
            tag: 'json:"data"',
          },
          {
            name: 'Raw',
            key: 'Raw',
            type: {
              kind: $.TypeKind.Slice,
              elemType: { kind: $.TypeKind.Basic, name: 'uint8' },
              typeName: 'json.RawMessage',
            },
            tag: 'json:"raw"',
          },
          {
            name: 'Hook',
            key: 'Hook',
            type: { kind: $.TypeKind.Struct, name: 'test.CustomJSON' },
            tag: 'json:"hook"',
          },
        ],
      )
    }

    const [data, err] = Marshal(new CustomJSON())
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"hook":true}')

    const [indented, indentErr] = MarshalIndent(new CustomJSON(), '', '  ')
    expect(indentErr).toBeNull()
    expect($.bytesToString(indented)).toBe('{\n  "hook": true\n}')

    const target = $.varRef(new CustomJSON())
    expect(Unmarshal($.stringToBytes('{"input":1}'), target)).toBeNull()
    expect(target.value.Text).toBe('{"input":1}')

    const raw = $.namedValueInterfaceValue<unknown>(
      $.stringToBytes('{"raw":true}'),
      'json.RawMessage',
      { MarshalJSON: RawMessage_MarshalJSON },
    )
    const [rawData, rawErr] = Marshal(raw)
    expect(rawErr).toBeNull()
    expect($.bytesToString(rawData)).toBe('{"raw":true}')

    const [byteData, byteErr] = Marshal($.stringToBytes('x'))
    expect(byteErr).toBeNull()
    expect($.bytesToString(byteData)).toBe('"eA=="')

    const [rawEnvelopeData, rawEnvelopeErr] = Marshal(new RawEnvelope())
    expect(rawEnvelopeErr).toBeNull()
    expect($.bytesToString(rawEnvelopeData)).toBe('{"raw":{"embedded":true}}')

    const rawEnvelopeTarget = $.varRef(new RawEnvelope())
    expect(
      Unmarshal($.stringToBytes('{"raw":{"next":1}}'), rawEnvelopeTarget),
    ).toBeNull()
    expect($.bytesToString(rawEnvelopeTarget.value.Raw)).toBe('{"next":1}')

    const byteTarget = $.varRef(new Uint8Array(0))
    expect(Unmarshal($.stringToBytes('"eA=="'), byteTarget)).toBeNull()
    expect($.bytesToString(byteTarget.value)).toBe('x')

    const envelope = $.varRef(new Envelope())
    expect(
      Unmarshal(
        $.stringToBytes(
          '{"person":{"name":"Eve","age":31},"data":"eA==","raw":{"keep":true},"hook":{"nested":true}}',
        ),
        envelope,
      ),
    ).toBeNull()
    expect(envelope.value.Person.Name).toBe('Eve')
    expect(envelope.value.Person.Age).toBe(31)
    expect($.bytesToString(envelope.value.Data)).toBe('x')
    expect($.bytesToString(envelope.value.Raw)).toBe('{"keep":true}')
    expect(envelope.value.Hook.Text).toBe('{"nested":true}')

    const [envelopeData, envelopeErr] = Marshal(envelope.value)
    expect(envelopeErr).toBeNull()
    expect($.bytesToString(envelopeData)).toContain('"raw":{"keep":true}')
  })

  it('marshals indented JSON with a line prefix', () => {
    const person = new Person()
    person.Name = 'Alice'
    person.Age = 30
    person.Active = true

    const [data, err] = MarshalIndent(person, '> ', '  ')

    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe(
      '{\n>   "name": "Alice",\n>   "age": 30,\n>   "active": true\n> }',
    )
  })

  it('unmarshals into struct and map pointers', () => {
    const person = $.varRef(new Person())
    const personErr = Unmarshal(
      $.stringToBytes('{"name":"Bob","age":25,"active":false}'),
      person,
    )

    expect(personErr).toBeNull()
    expect(person.value.Name).toBe('Bob')
    expect(person.value.Age).toBe(25)
    expect(person.value.Active).toBe(false)

    const mapRef: $.VarRef<Map<string, unknown> | null> = $.varRef(null)
    const mapErr = Unmarshal(
      $.stringToBytes('{"name":"Carol","age":22,"active":true}'),
      mapRef,
    )

    expect(mapErr).toBeNull()
    expect(mapRef.value?.get('name')).toBe('Carol')
    expect(mapRef.value?.get('age')).toBe(22)
    expect(mapRef.value?.get('active')).toBe(true)
  })

  it('decodes a map[string][]Struct field into real struct instances, not plain objects/arrays', () => {
    const target = $.varRef(new Container())
    const err = Unmarshal(
      $.stringToBytes('{"contexts":{"a":[{"name":"x"},{"name":"y"}]}}'),
      target,
    )

    expect(err).toBeNull()
    const contexts = target.value.Contexts
    expect(contexts).toBeInstanceOf(Map)
    const refs = contexts?.get('a')
    expect(refs).toHaveLength(2)
    expect(refs?.[0].Name).toBe('x')
    expect(refs?.[1].Name).toBe('y')
  })

  it('decodes array elements inside an interface{}-typed field into Maps, not plain objects', () => {
    const target = $.varRef(new Holder())
    const err = Unmarshal(
      $.stringToBytes('{"value":[{"x":1},{"y":2}]}'),
      target,
    )

    expect(err).toBeNull()
    const value = target.value.Value as unknown[]
    expect(Array.isArray(value)).toBe(true)
    expect(value[0]).toBeInstanceOf(Map)
    expect((value[0] as Map<string, unknown>).get('x')).toBe(1)
    expect((value[1] as Map<string, unknown>).get('y')).toBe(2)
  })

  it('decodes pointer-to-struct map values and fields into real struct instances', () => {
    const target = $.varRef(new Schema())
    const err = Unmarshal(
      $.stringToBytes(
        '{"properties":{"width":{"type":"number"}},"items":{"type":"string"}}',
      ),
      target,
    )

    expect(err).toBeNull()
    const properties = target.value.Properties
    expect(properties?.get('width')?.Type).toBe('number')
    expect(target.value.Items?.Type).toBe('string')
  })

  it('allocates a nil pointer-to-struct field and invokes UnmarshalJSON on it, instead of decoding it field-by-field', () => {
    const target = $.varRef(new HookHolder())
    const err = Unmarshal($.stringToBytes('{"hook":{"nested":true}}'), target)

    expect(err).toBeNull()
    expect(target.value.Hook).toBeInstanceOf(HookPointee)
    expect(target.value.Hook?.Text).toBe('{"nested":true}')
  })

  it('invokes UnmarshalJSON on a non-nil pointer-to-struct field in place, instead of replacing it with a freshly decoded instance', () => {
    const holder = new HookHolder()
    const existing = new HookPointee()
    existing.Marker = 'orig'
    holder.Hook = existing

    const target = $.varRef(holder)
    const err = Unmarshal($.stringToBytes('{"hook":{"nested":true}}'), target)

    expect(err).toBeNull()
    // Go's encoding/json decodes into the existing pointee via its
    // UnmarshalJSON hook, it never discards it for a fresh replacement.
    expect(target.value.Hook).toBe(existing)
    expect(target.value.Hook?.Marker).toBe('orig')
    expect(target.value.Hook?.Text).toBe('{"nested":true}')
  })

  it('decodes pointer-to-struct values as unmarked pointees, matching *Struct not Struct by value', () => {
    const target = $.varRef(new Schema())
    const err = Unmarshal(
      $.stringToBytes(
        '{"properties":{"width":{"type":"number"}},"items":{"type":"string"}}',
      ),
      target,
    )
    expect(err).toBeNull()

    const propertyType = $.getTypeByName('test.Property') as $.TypeInfo
    const propertyPointerType: $.TypeInfo = {
      kind: $.TypeKind.Pointer,
      elemType: propertyType,
    }

    // A *Property field/map-value must match *Property (pointer), not
    // Property (value): the runtime distinguishes pointer vs. value structs
    // with a marker, and getting this wrong breaks Go type
    // assertions/switches and pointer-receiver method-set checks on
    // JSON-decoded values.
    const items = target.value.Items
    expect($.is(items, propertyPointerType)).toBe(true)
    expect($.is(items, propertyType)).toBe(false)

    const width = target.value.Properties?.get('width')
    expect($.is(width, propertyPointerType)).toBe(true)
    expect($.is(width, propertyType)).toBe(false)
  })

  it('preserves pointer element types when parsing a top-level __goType spelling', () => {
    // Regression: parsing a __goType spelling used to strip every leading
    // '*' while recursing into nested element types, collapsing
    // map[string]*test.Property's element type down to test.Property and
    // losing pointer-vs-value semantics for the decoded elements.
    const target = $.varRef<Map<string, Property | null> | null>(new Map())
    target.__goType = '*map[string]*test.Property'
    expect(
      Unmarshal($.stringToBytes('{"width":{"type":"number"}}'), target),
    ).toBeNull()

    const propertyType = $.getTypeByName('test.Property') as $.TypeInfo
    const propertyPointerType: $.TypeInfo = {
      kind: $.TypeKind.Pointer,
      elemType: propertyType,
    }
    const width = target.value?.get('width')
    expect(width?.Type).toBe('number')
    expect($.is(width, propertyPointerType)).toBe(true)
    expect($.is(width, propertyType)).toBe(false)
  })

  it('honors json tags on anonymous (inline, unnamed) struct targets', () => {
    // The runtime boxes an Unmarshal target with no struct-field metadata of
    // its own (an inline, unnamed struct type) with its type spelling via
    // __goType, e.g. for:
    //   var loose struct {
    //       Name string `json:"name"`
    //       Age  int    `json:"age"`
    //   }
    //   json.Unmarshal(data, &loose)
    const target = $.varRef<{ Name: string; Age: number }>({
      Name: '',
      Age: 0,
    })
    target.__goType =
      '*struct{Name string "json:\\"name\\""; Age int "json:\\"age\\""}'

    const err = Unmarshal($.stringToBytes('{"name":"Ada","age":30}'), target)
    expect(err).toBeNull()
    expect(target.value.Name).toBe('Ada')
    expect(target.value.Age).toBe(30)
  })

  it('ignores unexported fields on anonymous struct targets even with json tags', () => {
    const target = $.varRef<{ name: string; Age: number }>({
      name: 'keep',
      Age: 0,
    })
    target.__goType =
      '*struct{name string "json:\\"name\\""; Age int "json:\\"age\\""}'

    const err = Unmarshal($.stringToBytes('{"name":"Ada","age":30}'), target)
    expect(err).toBeNull()
    expect(target.value).toEqual({ name: 'keep', Age: 30 })
  })

  it('rejects unknown fields that only match unexported anonymous struct fields', () => {
    const target = $.varRef<{ name: string; Age: number }>({
      name: 'keep',
      Age: 0,
    })
    target.__goType =
      '*struct{name string "json:\\"name\\""; Age int "json:\\"age\\""}'

    const strictReader = bytes.NewBufferString('{"name":"Ada","age":30}')!
    const strictDecoder = NewDecoder(strictReader)
    strictDecoder.DisallowUnknownFields()

    expect(strictDecoder.Decode(target)?.Error()).toBe(
      'json: unknown field "name"',
    )
  })

  it('honors json tags on an anonymous struct used as a map element type', () => {
    // Same mechanism as the top-level case above, reached through
    // decodeValueForType for a map[string]struct{...} spelling, e.g.:
    //   var loose map[string]struct {
    //       Name string `json:"name"`
    //   }
    //   json.Unmarshal(data, &loose)
    const target = $.varRef<Map<string, { Name: string }> | null>(null)
    target.__goType = '*map[string]struct{Name string "json:\\"name\\""}'

    const err = Unmarshal($.stringToBytes('{"a":{"name":"Ada"}}'), target)
    expect(err).toBeNull()
    expect(target.value?.get('a')).toEqual({ Name: 'Ada' })
  })

  it('decodes a top-level pointer-to-struct var as an unmarked struct pointee', () => {
    // `var p *test.Property; json.Unmarshal(data, &p)`: &p's own Go type is
    // **test.Property (one star from p already being a pointer, one from
    // &p); unmarshalTargetGoType strips only the outermost address-of star,
    // leaving *test.Property, so this must go through the same Pointer
    // handling as a pointer-typed field/element (see decodeValueForType's
    // Pointer branch) rather than falling through to the untyped decode.
    const target = $.varRef<Property | null>(null)
    target.__goType = '**test.Property'

    const err = Unmarshal($.stringToBytes('{"type":"string"}'), target)
    expect(err).toBeNull()
    expect(target.value?.Type).toBe('string')

    const propertyType = $.getTypeByName('test.Property') as $.TypeInfo
    const propertyPointerType: $.TypeInfo = {
      kind: $.TypeKind.Pointer,
      elemType: propertyType,
    }
    expect($.is(target.value, propertyPointerType)).toBe(true)
    expect($.is(target.value, propertyType)).toBe(false)
  })

  it('honors disallowUnknownFields on anonymous struct targets', () => {
    const target = $.varRef<{ Name: string }>({ Name: '' })
    target.__goType = '*struct{Name string "json:\\"name\\""}'

    const strictReader = bytes.NewBufferString('{"name":"Ada","extra":true}')!
    const strictDecoder = NewDecoder(strictReader)
    strictDecoder.DisallowUnknownFields()

    expect(strictDecoder.Decode(target)?.Error()).toBe(
      'json: unknown field "extra"',
    )
  })

  it('constructs a by-value named-struct field inside an anonymous struct target', () => {
    // An anonymous struct's own fields start unset (the target object
    // starts as {}), unlike a registered struct's fields, which are
    // pre-initialized to a zero-value instance. A by-value named-struct
    // field (Inner test.Property, no pointer) therefore has no pre-existing
    // instance for the generic decode path to populate into and must be
    // constructed directly.
    const target = $.varRef<{ Inner: Property | undefined }>({
      Inner: undefined,
    })
    target.__goType = '*struct{Inner test.Property "json:\\"inner\\""}'

    const err = Unmarshal(
      $.stringToBytes('{"inner":{"type":"string"}}'),
      target,
    )
    expect(err).toBeNull()
    expect(target.value.Inner).toBeInstanceOf(Property)
    expect(target.value.Inner?.Type).toBe('string')

    const propertyType = $.getTypeByName('test.Property') as $.TypeInfo
    // A by-value struct field must match Property (value), not *Property.
    expect($.is(target.value.Inner, propertyType)).toBe(true)
  })

  it('decodes a nested anonymous struct field, not a generic Map', () => {
    // A field whose own type is itself an inline struct{...} (e.g.
    //   struct {
    //       Inner struct {
    //           Name string `json:"name"`
    //       } `json:"inner"`
    //   }
    // ) has no registered TypeInfo of its own: resolveTypeInfo(field.type)
    // returns null for it, same as any other anonymous struct descriptor.
    // Without routing it through decodeValueForType, it fell through to the
    // generic interface{} decode and came back as a Map keyed by the JSON
    // tag ("name") instead of the anonymous struct representation keyed by
    // the Go field name ("Name").
    const target = $.varRef<{ Inner: { Name: string } | undefined }>({
      Inner: undefined,
    })
    target.__goType =
      '*struct{Inner struct{Name string "json:\\"name\\""} "json:\\"inner\\""}'

    const err = Unmarshal($.stringToBytes('{"inner":{"name":"Ada"}}'), target)
    expect(err).toBeNull()
    expect(target.value.Inner).toEqual({ Name: 'Ada' })
  })

  it('decodes a pointer-to-anonymous-struct field, not a generic Map', () => {
    // Same gap as above, one level of indirection further: a
    // *struct{...} field.
    const target = $.varRef<{ Inner: { Name: string } | null | undefined }>({
      Inner: undefined,
    })
    target.__goType =
      '*struct{Inner *struct{Name string "json:\\"name\\""} "json:\\"inner\\""}'

    const err = Unmarshal($.stringToBytes('{"inner":{"name":"Ada"}}'), target)
    expect(err).toBeNull()
    expect(target.value.Inner).toEqual({ Name: 'Ada' })
  })

  it('honors disallowUnknownFields on a nested anonymous struct field', () => {
    const target = $.varRef<{ Inner: { Name: string } | undefined }>({
      Inner: undefined,
    })
    target.__goType =
      '*struct{Inner struct{Name string "json:\\"name\\""} "json:\\"inner\\""}'

    const strictReader = bytes.NewBufferString(
      '{"inner":{"name":"Ada","extra":true}}',
    )!
    const strictDecoder = NewDecoder(strictReader)
    strictDecoder.DisallowUnknownFields()

    expect(strictDecoder.Decode(target)?.Error()).toBe(
      'json: unknown field "extra"',
    )
  })
  it('decodes strings as UTF-8 bytes, including \\u escapes', () => {
    const target = $.varRef<Map<string, string> | null>(new Map())
    target.__goType = '*map[string]string'
    const input = $.goString(
      '{"raw":"héllo","esc":"h\\u00e9llo","pair":"\\ud83d\\ude00","bad":"\\ud800x"}',
    )
    expect(Unmarshal($.stringToBytes(input), target)).toBeNull()
    expect(target.value!.get('raw')).toBe($.goString('héllo'))
    expect(target.value!.get('esc')).toBe($.goString('héllo'))
    expect(target.value!.get('pair')).toBe($.goString('😀'))
    expect(target.value!.get('bad')).toBe($.goString('\ufffdx'))
  })

  it('decodes json.RawMessage as a map and slice element type', () => {
    // The runtime boxes Unmarshal's `any` target with its Go type spelling
    // (__goType) at the call site; simulate that here the way $.interfaceValue
    // would for `var m map[string]json.RawMessage; json.Unmarshal(data, &m)`.
    const mapTarget = $.varRef<Map<string, Uint8Array> | null>(new Map())
    mapTarget.__goType = '*map[string]json.RawMessage'
    expect(
      Unmarshal($.stringToBytes('{"a":{"x":1},"b":[1,2,3]}'), mapTarget),
    ).toBeNull()
    expect($.bytesToString(mapTarget.value!.get('a')!)).toBe('{"x":1}')
    expect($.bytesToString(mapTarget.value!.get('b')!)).toBe('[1,2,3]')

    const sliceTarget = $.varRef<Uint8Array[]>([])
    sliceTarget.__goType = '*[]json.RawMessage'
    expect(
      Unmarshal($.stringToBytes('[{"x":1},"raw"]'), sliceTarget),
    ).toBeNull()
    expect($.bytesToString(sliceTarget.value[0])).toBe('{"x":1}')
    expect($.bytesToString(sliceTarget.value[1])).toBe('"raw"')
  })

  it('decodes jsontext.Value, the Go 1.27 spelling of json.RawMessage', () => {
    // With encoding/json v2 (the default since Go 1.27), json.RawMessage is
    // an alias for jsontext.Value, so the target carries that spelling.
    const mapTarget = $.varRef<Map<string, Uint8Array> | null>(new Map())
    mapTarget.__goType = '*map[string]jsontext.Value'
    expect(
      Unmarshal($.stringToBytes('{"a":[{"x":1},2],"b":"raw"}'), mapTarget),
    ).toBeNull()
    expect($.bytesToString(mapTarget.value!.get('a')!)).toBe('[{"x":1},2]')
    expect($.bytesToString(mapTarget.value!.get('b')!)).toBe('"raw"')

    // A slice of raw values keeps each element's text.
    const sliceTarget = $.varRef<Uint8Array[]>([])
    sliceTarget.__goType = '*[]jsontext.Value'
    expect(
      Unmarshal($.stringToBytes('[{"x":1},"raw"]'), sliceTarget),
    ).toBeNull()
    expect($.bytesToString(sliceTarget.value[0])).toBe('{"x":1}')
    expect($.bytesToString(sliceTarget.value[1])).toBe('"raw"')
  })

  it('encodes JSON to an io.Writer with newline, indentation, and HTML escaping', () => {
    const chunks: string[] = []
    const writer = {
      Write(p: $.Bytes): [number, $.GoError] {
        chunks.push($.bytesToString(p))
        return [$.len(p), null]
      },
    }

    const encoder = NewEncoder(writer)
    expect(encoder.Encode(new Map([['text', '<tag>&']]))).toBeNull()
    encoder.SetEscapeHTML(false)
    encoder.SetIndent('', '  ')
    expect(encoder.Encode(new Map([['text', '<tag>&']]))).toBeNull()

    expect(chunks).toEqual([
      '{"text":"\\u003ctag\\u003e\\u0026"}\n',
      '{\n  "text": "<tag>&"\n}\n',
    ])
  })

  it('awaits a MarshalJSON that suspends in Encoder.Encode and Marshal', async () => {
    class AsyncJSON implements Marshaler {
      constructor(public text: string) {}

      async MarshalJSON(): Promise<[$.Slice<number>, $.GoError]> {
        await Promise.resolve()
        return [$.stringToBytes(JSON.stringify(this.text)), null]
      }
    }

    const chunks: string[] = []
    const writer = {
      Write(p: $.Bytes): [number, $.GoError] {
        chunks.push($.bytesToString(p))
        return [$.len(p), null]
      },
    }
    const value = new Map<string, unknown>([
      ['a', new AsyncJSON('x')],
      ['b', [new AsyncJSON('y'), 1]],
    ])
    expect(await NewEncoder(writer).Encode(value)).toBeNull()
    expect(chunks).toEqual(['{"a":"x","b":["y",1]}\n'])

    // A synchronous value is still encoded without suspending.
    expect(NewEncoder(writer).Encode(new Map([['c', 1]]))).toBeNull()

    // Marshal returns a Promise when a MarshalJSON suspends; the compiler
    // awaits it in a program with an async MarshalJSON method.
    const marshaled = Marshal(value)
    expect(marshaled).toBeInstanceOf(Promise)
    const [data, err] = await marshaled
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"a":"x","b":["y",1]}')

    // A synchronous value is still marshaled without suspending.
    expect($.bytesToString(Marshal(new Map([['c', 1]]))[0])).toBe('{"c":1}')
  })

  it('awaits an UnmarshalJSON that suspends in Unmarshal', async () => {
    class AsyncTarget implements Unmarshaler {
      public text = ''

      async UnmarshalJSON(data: $.Slice<number>): Promise<$.GoError> {
        await Promise.resolve()
        this.text = JSON.parse($.bytesToString(data)) as string
        return this.text === 'bad' ? $.newError('bad text') : null
      }
    }

    const target = new AsyncTarget()
    const result = Unmarshal($.stringToBytes('"hello"'), target)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toBeNull()
    expect(target.text).toBe('hello')

    const err = await Unmarshal($.stringToBytes('"bad"'), new AsyncTarget())
    expect(err?.Error()).toBe('bad text')
  })

  it('validates, compacts, indents, and escapes JSON bytes', () => {
    expect(Valid($.stringToBytes('{"ok":true}'))).toBe(true)
    expect(Valid($.stringToBytes('{'))).toBe(false)

    const compact = new bytes.Buffer()
    expect(Compact(compact, $.stringToBytes('{ "ok" : true }'))).toBeNull()
    expect(compact.String()).toBe('{"ok":true}')

    const indented = new bytes.Buffer()
    expect(
      Indent(indented, $.stringToBytes('{"ok":true}'), '> ', '  '),
    ).toBeNull()
    expect(indented.String()).toBe('{\n>   "ok": true\n> }')

    const escaped = new bytes.Buffer()
    HTMLEscape(escaped, $.stringToBytes('"<tag>&"'))
    expect(escaped.String()).toBe('"\\u003ctag\\u003e\\u0026"')
  })

  it('preserves number and string literal spelling through Compact and Indent', () => {
    const compact = new bytes.Buffer()
    expect(
      Compact(
        compact,
        $.stringToBytes('{"n": 1e+00, "big": 9007199254740993, "s": "abc"}'),
      ),
    ).toBeNull()
    expect(compact.String()).toBe(
      '{"n":1e+00,"big":9007199254740993,"s":"abc"}',
    )

    const compact2 = new bytes.Buffer()
    expect(Compact(compact2, $.stringToBytes('{"n":1e+00}'))).toBeNull()
    expect(compact2.String()).toBe('{"n":1e+00}')

    const indented = new bytes.Buffer()
    expect(
      Indent(indented, $.stringToBytes('{"a":1,"b":[2,3],"e":{}}'), '', '  '),
    ).toBeNull()
    expect(indented.String()).toBe(
      '{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ],\n  "e": {}\n}',
    )

    // Go's Indent copies trailing whitespace after the value verbatim.
    const trailing = new bytes.Buffer()
    expect(Indent(trailing, $.stringToBytes('{"a":1}\n'), '', '  ')).toBeNull()
    expect(trailing.String()).toBe('{\n  "a": 1\n}\n')
  })

  it('keeps exact source literals for UseNumber beyond float64 precision', () => {
    const reader = bytes.NewBufferString('{"big":9007199254740993,"f":1e+00}')!
    const decoder = NewDecoder(reader)
    decoder.UseNumber()
    const target = $.varRef<Map<string, unknown> | null>(null)

    expect(decoder.Decode(target)).toBeNull()
    expect(target.value?.get('big')).toMatchObject({
      __goType: 'json.Number',
      __goValue: '9007199254740993',
    })
    expect(target.value?.get('f')).toMatchObject({
      __goType: 'json.Number',
      __goValue: '1e+00',
    })
  })

  it('returns a SyntaxError with the Go byte offset for malformed input', () => {
    const cases: Array<[string, number]> = [
      ['[1,]', 4],
      ['{"a":}', 6],
      ['[1 2]', 4],
      ['truex', 5],
      ['123abc', 4],
    ]
    for (const [input, offset] of cases) {
      const target = $.varRef<unknown>(null)
      const err = Unmarshal($.stringToBytes(input), target)
      expect(err).toBeInstanceOf(JSONSyntaxError)
      expect((err as InstanceType<typeof JSONSyntaxError>).Offset).toBe(offset)
    }
  })

  it('decodes one value per Decode and buffers the rest of the stream', () => {
    const decoder = NewDecoder(bytes.NewBufferString('1 2')!)
    const first = $.varRef<unknown>(null)
    const second = $.varRef<unknown>(null)

    expect(decoder.Decode(first)).toBeNull()
    expect(first.value).toBe(1)
    expect(decoder.Decode(second)).toBeNull()
    expect(second.value).toBe(2)
    expect(decoder.Decode($.varRef<unknown>(null))?.Error()).toBe('EOF')
  })

  it('streams delimiters and values through Token and reports More', () => {
    // Tokens from a synchronous reader are returned synchronously, with
    // delimiters and numbers boxed with their Go types.
    const token = (d: Decoder): [unknown, $.GoError] =>
      d.Token() as [unknown, $.GoError]
    const unbox = (t: unknown): unknown =>
      $.isNamedValueBox(t) ? t.__goValue : t
    const goType = (t: unknown): string | undefined =>
      $.isNamedValueBox(t) ? t.__goType : undefined

    const tokens = NewDecoder(bytes.NewBufferString('[1]')!)
    const open = token(tokens)
    expect([unbox(open[0]), open[1]]).toEqual(['['.charCodeAt(0), null])
    expect(goType(open[0])).toBe('json.Delim')
    const one = token(tokens)
    expect([unbox(one[0]), one[1]]).toEqual([1, null])
    expect(goType(one[0])).toBe('float64')
    const close = token(tokens)
    expect([unbox(close[0]), close[1]]).toEqual([']'.charCodeAt(0), null])
    expect(token(tokens)[1]?.Error()).toBe('EOF')

    const more = NewDecoder(bytes.NewBufferString('[1,2]')!)
    more.Token() // consume [
    expect(more.More()).toBe(true)
    more.Token() // 1
    expect(more.More()).toBe(true)
    more.Token() // 2
    expect(more.More()).toBe(false)
  })

  it('reads values from an asynchronous reader in chunks', async () => {
    const chunks = ['{"name":"Da', 'na","age":2', '8} ']
    let reads = 0
    const reader = {
      Read: async (p: $.Bytes): Promise<[number, $.GoError]> => {
        reads++
        const chunk = chunks.shift()
        if (chunk === undefined) {
          return [0, io.EOF]
        }
        const data = $.stringToBytes(chunk)
        const n = $.copy(p, data)
        return [n, null]
      },
    }
    const decoder = NewDecoder(reader)
    const target = $.varRef(new Person())
    expect(await decoder.Decode(target)).toBeNull()
    expect(target.value.Name).toBe('Dana')
    expect(target.value.Age).toBe(28)
    expect(await decoder.Decode(target)).toBe(io.EOF)
    expect(reads).toBe(4)
  })

  it('returns a complete value without waiting for more input', async () => {
    // The reader sends one object, then blocks forever, as an idle stream does.
    let sent = false
    const reader = {
      Read: (p: $.Bytes): Promise<[number, $.GoError]> => {
        if (sent) {
          return new Promise(() => {})
        }
        sent = true
        return Promise.resolve([$.copy(p, $.stringToBytes('{"age":3}')), null])
      },
    }
    const target = $.varRef(new Person())
    expect(await NewDecoder(reader).Decode(target)).toBeNull()
    expect(target.value.Age).toBe(3)
  })

  it('reads a large value in small chunks in linear time', async () => {
    // Each read gives 1 KiB of a 4 MiB string in an array; parsing the
    // value again after each read would take minutes.
    const text = '["' + 'ab\\"'.repeat(1 << 20) + '"]'
    const data = $.stringToBytes(text)
    let off = 0
    let reads = 0
    const reader = {
      Read: async (p: $.Bytes): Promise<[number, $.GoError]> => {
        reads++
        if (off >= $.len(data)) {
          return [0, io.EOF]
        }
        const n = $.copy(
          p,
          $.goSlice(data, off, Math.min(off + 1024, $.len(data))),
        )
        off += n
        return [n, null]
      },
    }
    const target = $.varRef<unknown>(null)
    const start = performance.now()
    expect(await NewDecoder(reader).Decode(target)).toBeNull()
    expect(performance.now() - start).toBeLessThan(2000)
    expect((target.value as unknown[])[0]).toBe('ab"'.repeat(1 << 20))
    expect(reads).toBe(Math.ceil($.len(data) / 1024))
  })

  it('finds the end of a value across escapes split between reads', async () => {
    // The escaped quote is split between two reads, and then the reader
    // blocks forever, so the value must end where it does.
    const chunks = ['["a\\', '"b"]']
    const reader = {
      Read: (p: $.Bytes): Promise<[number, $.GoError]> => {
        const chunk = chunks.shift()
        if (chunk === undefined) {
          return new Promise(() => {})
        }
        return Promise.resolve([$.copy(p, $.stringToBytes(chunk)), null])
      },
    }
    const target = $.varRef<unknown>(null)
    expect(await NewDecoder(reader).Decode(target)).toBeNull()
    expect(target.value).toEqual(['a"b'])
  })

  it('reports a syntax error in a value that has not ended', async () => {
    // The reader blocks forever after the malformed start of an array.
    let sent = false
    const reader = {
      Read: (p: $.Bytes): Promise<[number, $.GoError]> => {
        if (sent) {
          return new Promise(() => {})
        }
        sent = true
        return Promise.resolve([$.copy(p, $.stringToBytes('[1,x,')), null])
      },
    }
    const err = await NewDecoder(reader).Decode($.varRef<unknown>(null))
    expect(err).toBeInstanceOf(JSONSyntaxError)
  })

  it('marshals a RawMessage field without normalizing its token spelling', () => {
    class RawHolder {
      public R = $.stringToBytes('1e+00')

      static __typeInfo = $.registerStructType(
        'test.RawHolder',
        new RawHolder(),
        [],
        RawHolder,
        [{ name: 'R', key: 'R', type: 'json.RawMessage', tag: 'json:"r"' }],
      )
    }

    const [data, err] = Marshal(new RawHolder())
    expect(err).toBeNull()
    expect($.bytesToString(data)).toBe('{"r":1e+00}')
  })

  it('decodes from readers and exposes raw message and number helpers', () => {
    const reader = bytes.NewBufferString('{"name":"Dana","age":28}')!
    const decoder = NewDecoder(reader)
    const target = $.varRef(new Person())

    expect(decoder.Decode(target)).toBeNull()
    expect(target.value.Name).toBe('Dana')
    expect(target.value.Age).toBe(28)
    expect(decoder.InputOffset()).toBeGreaterThan(0n)

    const raw = $.stringToBytes('{"raw":true}')
    const [marshaled, marshalErr] = RawMessage_MarshalJSON(raw)
    expect(marshalErr).toBeNull()
    expect($.bytesToString(marshaled)).toBe('{"raw":true}')

    const rawRef = $.varRef<$.Bytes>(null)
    expect(
      RawMessage_UnmarshalJSON(rawRef, $.stringToBytes('[1,2]')),
    ).toBeNull()
    expect($.bytesToString(rawRef.value)).toBe('[1,2]')

    expect(Number_String('42')).toBe('42')
    expect(Number_Int64('42')).toEqual([42n, null])
    expect(Number_Int64('9007199254740993')).toEqual([9007199254740993n, null])
    expect(Number_Float64('3.5')).toEqual([3.5, null])
    expect(Number.isNaN(Number_Float64('NaN')[0])).toBe(true)
    expect(Number_Float64('-Inf')).toEqual([-Infinity, null])
    expect(Number_Float64('1x')[1]?.Error()).toContain('invalid syntax')
    expect(Number_Float64('1e999')[1]?.Error()).toContain('value out of range')
    expect(Number_Int64('9223372036854775808')).toEqual([
      9223372036854775807n,
      expect.objectContaining({
        Error: expect.any(Function),
      }),
    ])
    expect(Number_Int64('9223372036854775808')[1]?.Error()).toContain(
      'value out of range',
    )
  })

  it('marshals and unmarshals Number through jsontext', () => {
    // MarshalJSONTo writes the literal, and 0 for an empty Number.
    const written: string[] = []
    const enc = {
      WriteValue(value: $.Bytes): $.GoError {
        written.push($.bytesToString(value))
        return null
      },
    }
    expect(Number_MarshalJSONTo('12.5', enc)).toBeNull()
    expect(Number_MarshalJSONTo('', enc)).toBeNull()
    expect(written).toEqual(['12.5', '0'])
    expect(Number_MarshalJSONTo('1x', enc)?.Error()).toContain('invalid syntax')

    // UnmarshalJSONFrom reads a literal, a quoted number, or null.
    const decode = (text: string) => {
      const n = $.varRef('7')
      const err = Number_UnmarshalJSONFrom(n, {
        ReadValue: (): [$.Bytes, $.GoError] => [$.stringToBytes(text), null],
      })
      return [n.value, err?.Error() ?? null]
    }
    expect(decode('-3e2')).toEqual(['-3e2', null])
    expect(decode('"42"')).toEqual(['42', null])
    expect(decode('null')).toEqual(['', null])
    expect(decode('"x"')[1]).toContain('invalid syntax')
    expect(decode('true')[1]).toContain('json.Number')
  })

  it('applies decoder UseNumber and DisallowUnknownFields options', () => {
    const numberReader = bytes.NewBufferString('{"n":12}')!
    const numberDecoder = NewDecoder(numberReader)
    numberDecoder.UseNumber()
    const numberTarget = $.varRef<Map<string, unknown> | null>(null)

    expect(numberDecoder.Decode(numberTarget)).toBeNull()
    expect(numberTarget.value?.get('n')).toMatchObject({
      __goType: 'json.Number',
      __goValue: '12',
    })

    const strictReader = bytes.NewBufferString('{"name":"Ada","extra":true}')!
    const strictDecoder = NewDecoder(strictReader)
    strictDecoder.DisallowUnknownFields()
    const strictTarget = $.varRef(new Person())

    expect(strictDecoder.Decode(strictTarget)?.Error()).toBe(
      'json: unknown field "extra"',
    )
  })
})

// Encoders and decoders of runs of fixed-size structs, built once per struct
// type. GoScript holds a struct as an object with one property per field, so
// the generic shape walk in index.ts costs a dispatch and a byte slice per
// field. A plan reads or writes every field of every struct with a DataView in
// one loop, which is what makes slices of structs (GPU vertex, uniform and
// compute data) cheap to encode.

// layoutShape is the part of the binShape of index.ts that a plan reads.
export type layoutShape =
  | { tag: 'scalar'; kind: string }
  | { tag: 'complex'; elem: 'float32' | 'float64' }
  | { tag: 'array'; elem: layoutShape; count: number }
  | { tag: 'struct'; fields: layoutField[] }

// layoutField is a struct field: its storage key, whether it is a blank (_)
// field, which Go writes as zeros and skips on read, and its shape.
export type layoutField = { key: string; blank?: boolean; shape: layoutShape }

// structShape is the shape of one struct type.
export type structShape = { tag: 'struct'; fields: layoutField[] }

// runCodec encodes or decodes n structs, the elements of elems from start on,
// at byte offset at of view, the first byte of each struct size bytes after
// the previous one.
type runCodec = (
  view: DataView,
  at: number,
  elems: unknown[],
  start: number,
  n: number,
  little: boolean,
) => void

// structPlan encodes and decodes runs of one struct type.
export interface structPlan {
  size: number
  encode: runCodec
  decode: runCodec
}

// scalarAccess names the DataView methods of a fixed-size scalar kind and its
// width in bytes.
type scalarAccess = { width: number; set: string; get: string }

const scalarAccessors: Record<string, scalarAccess> = {
  bool: { width: 1, set: 'setUint8', get: 'getUint8' },
  int8: { width: 1, set: 'setInt8', get: 'getInt8' },
  uint8: { width: 1, set: 'setUint8', get: 'getUint8' },
  int16: { width: 2, set: 'setInt16', get: 'getInt16' },
  uint16: { width: 2, set: 'setUint16', get: 'getUint16' },
  int32: { width: 4, set: 'setInt32', get: 'getInt32' },
  uint32: { width: 4, set: 'setUint32', get: 'getUint32' },
  int64: { width: 8, set: 'setBigInt64', get: 'getBigInt64' },
  uint64: { width: 8, set: 'setBigUint64', get: 'getBigUint64' },
  float32: { width: 4, set: 'setFloat32', get: 'getFloat32' },
  float64: { width: 8, set: 'setFloat64', get: 'getFloat64' },
}

// unrolledArrayLength is the longest array whose elements a generated plan
// writes one statement each; longer arrays loop.
const unrolledArrayLength = 16

// plans caches the plan of each struct shape. index.ts keeps one shape per
// struct type, so this holds one plan per type.
const plans = new WeakMap<structShape, structPlan>()

// structPlanFor returns the plan of the given struct shape, built on first
// use: generated code when the page allows it, closures otherwise.
export function structPlanFor(shape: structShape): structPlan {
  let plan = plans.get(shape)
  if (plan === undefined) {
    plan = generatedStructPlan(shape) ?? closureStructPlan(shape)
    plans.set(shape, plan)
  }
  return plan
}

// layoutSize returns the number of bytes encoding/binary writes for shape.
export function layoutSize(shape: layoutShape): number {
  switch (shape.tag) {
    case 'scalar':
      return scalarAccessors[shape.kind].width
    case 'complex':
      return shape.elem === 'float32' ? 8 : 16
    case 'array':
      return layoutSize(shape.elem) * shape.count
    case 'struct': {
      let total = 0
      for (const field of shape.fields) {
        total += layoutSize(field.shape)
      }
      return total
    }
  }
}

// generatedStructPlan compiles the plan of shape into JavaScript functions, or
// returns null when the Content Security Policy of the page forbids it.
export function generatedStructPlan(shape: structShape): structPlan | null {
  // A page whose policy disallows eval throws an EvalError here.
  const params = ['view', 'at', 'elems', 'start', 'n', 'little']
  try {
    const encode = new Function(...params, runBody(shape, 'encode'))
    const decode = new Function(...params, runBody(shape, 'decode'))
    return {
      size: layoutSize(shape),
      encode: encode as runCodec,
      decode: decode as runCodec,
    }
  } catch {
    return null
  }
}

// nativeLittleEndian reports whether typed arrays hold their elements in
// little-endian order, as they do on every common platform.
const nativeLittleEndian = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1

// runBody returns the body of the function that encodes or decodes a run of
// structs of shape, every field inline in one loop over the structs.
function runBody(shape: structShape, mode: 'encode' | 'decode'): string {
  // Any struct goes through the DataView.
  const size = layoutSize(shape)
  const bytes = new generator(dataViewAccess)
  const byteLoop = loopBody(bytes, shape, mode, 'at + i * ' + size)
  if (!wordLayout(shape)) {
    return byteLoop
  }

  // A struct of 32-bit fields, as GPU structs are, goes through typed arrays
  // of words when the order is native and the bytes are aligned.
  const words = new generator(wordAccess)
  const wordLoop = loopBody(words, shape, mode, 'i * ' + size / 4)
  const offset = 'view.byteOffset + at'
  const arrays = [...words.arrays].map(
    (name) =>
      `const ${name} = new ${wordArrayTypes[name]}(view.buffer, ${offset}, n * ${size / 4})`,
  )
  return [
    `if (little === ${nativeLittleEndian} && (${offset}) % 4 === 0) {`,
    ...arrays,
    wordLoop,
    'return',
    '}',
    byteLoop,
  ].join('\n')
}

// loopBody returns the loop that encodes or decodes each struct v of the run
// at offset o, given by the expression offset of i.
function loopBody(
  gen: generator,
  shape: structShape,
  mode: 'encode' | 'decode',
  offset: string,
): string {
  const body =
    mode === 'encode' ?
      gen.encode(shape, 'v', 'o', 0)
    : gen.decode(shape, 'v', 'o', 0)
  return [
    'for (let i = 0; i < n; i++) {',
    'const v = elems[start + i]',
    `const o = ${offset}`,
    ...body,
    '}',
  ].join('\n')
}

// wordLayout reports whether every field of shape is a 32-bit scalar, or a
// blank field of whole words, so that typed arrays of words can hold it.
function wordLayout(shape: layoutShape): boolean {
  switch (shape.tag) {
    case 'scalar':
      return wordArrays[shape.kind] !== undefined
    case 'complex':
      return shape.elem === 'float32'
    case 'array':
      return wordLayout(shape.elem)
    case 'struct':
      return shape.fields.every((field) =>
        field.blank ?
          layoutSize(field.shape) % 4 === 0
        : wordLayout(field.shape),
      )
  }
}

// memoryAccess is how generated code reads and writes a scalar: through the
// DataView at byte offsets, or through typed arrays at word offsets.
interface memoryAccess {
  // unit is the number of bytes of one step of an offset.
  unit: number
  store(kind: string, value: string, at: string, gen: generator): string
  load(kind: string, at: string, gen: generator): string
  zero(at: string, width: number, gen: generator): string
}

// dataViewAccess reads and writes scalars through the DataView, which
// converts numbers to the width of the setter, wrapping integers.
const dataViewAccess: memoryAccess = {
  unit: 1,
  store: (kind, value, at) => {
    let converted = value
    if (kind === 'bool') {
      converted = `(${value} ? 1 : 0)`
    } else if (kind === 'int64' || kind === 'uint64') {
      converted = `BigInt(${value})`
    }
    return `view.${scalarAccessors[kind].set}(${at}, ${converted}, little)`
  },
  load: (kind, at) => {
    const read = `view.${scalarAccessors[kind].get}(${at}, little)`
    return kind === 'bool' ? `${read} !== 0` : read
  },
  zero: (at, width) =>
    `for (let z = 0; z < ${width}; z++) view.setUint8(${at} + z, 0)`,
}

// wordArrays names the typed array of each 32-bit kind in generated code,
// and wordArrayTypes the type of each.
const wordArrays: Record<string, string> = {
  float32: 'f32',
  int32: 'i32',
  uint32: 'u32',
}
const wordArrayTypes: Record<string, string> = {
  f32: 'Float32Array',
  i32: 'Int32Array',
  u32: 'Uint32Array',
}

// wordAccess reads and writes 32-bit scalars through typed arrays, which
// convert numbers as the DataView does.
const wordAccess: memoryAccess = {
  unit: 4,
  store: (kind, value, at, gen) => `${gen.array(kind)}[${at}] = ${value}`,
  load: (kind, at, gen) => `${gen.array(kind)}[${at}]`,
  zero: (at, width, gen) =>
    `for (let z = 0; z < ${width / 4}; z++) ${gen.array('uint32')}[${at} + z] = 0`,
}

// generator produces the statements of a generated plan, numbering their
// local variables and noting the typed arrays they use.
class generator {
  private count = 0
  public arrays = new Set<string>()

  constructor(private access: memoryAccess) {}

  // name returns a new local variable name.
  private name(prefix: string): string {
    this.count++
    return prefix + this.count
  }

  // array returns the typed array of 32-bit kind.
  public array(kind: string): string {
    const name = wordArrays[kind]
    this.arrays.add(name)
    return name
  }

  // at returns the expression of the offset delta bytes past base.
  private at(base: string, delta: number): string {
    const steps = delta / this.access.unit
    return steps === 0 ? base : `${base} + ${steps}`
  }

  // encode returns the statements that write value, of the given shape,
  // delta bytes past offset base.
  public encode(
    shape: layoutShape,
    value: string,
    base: string,
    delta: number,
  ): string[] {
    const at = this.at(base, delta)
    switch (shape.tag) {
      case 'scalar':
        return [this.access.store(shape.kind, value, at, this)]
      case 'complex': {
        const c = this.name('c')
        const imag = this.at(base, delta + layoutSize(shape) / 2)
        return [
          `const ${c} = ${value}`,
          this.access.store(shape.elem, `${c}.real`, at, this),
          this.access.store(shape.elem, `${c}.imag`, imag, this),
        ]
      }
      case 'array':
        return this.elements(shape, value, base, delta, 'encode')
      case 'struct':
        return this.encodeFields(shape, value, base, delta)
    }
  }

  // encodeFields returns the statements that write the fields of a struct in
  // order, and zeros for its blank fields.
  private encodeFields(
    shape: structShape,
    value: string,
    base: string,
    delta: number,
  ): string[] {
    const s = this.name('s')
    const out = [`const ${s} = ${value}`]
    let offset = delta
    for (const field of shape.fields) {
      const width = layoutSize(field.shape)
      const fieldValue = propertyAccess(s, field.key)
      out.push(
        ...(field.blank ?
          [this.access.zero(this.at(base, offset), width, this)]
        : this.encode(field.shape, fieldValue, base, offset)),
      )
      offset += width
    }
    return out
  }

  // decode returns the statements that read the value of the given shape,
  // delta bytes past offset base, into target, an assignable expression.
  // Arrays and structs are filled in place, as the value they replace
  // belongs to the struct or slice that holds it.
  public decode(
    shape: layoutShape,
    target: string,
    base: string,
    delta: number,
  ): string[] {
    const at = this.at(base, delta)
    switch (shape.tag) {
      case 'scalar':
        return [`${target} = ${this.access.load(shape.kind, at, this)}`]
      case 'complex': {
        const imag = this.at(base, delta + layoutSize(shape) / 2)
        const real = this.access.load(shape.elem, at, this)
        return [
          `${target} = { real: ${real}, imag: ${this.access.load(shape.elem, imag, this)} }`,
        ]
      }
      case 'array':
        return this.elements(shape, target, base, delta, 'decode')
      case 'struct':
        return this.decodeFields(shape, target, base, delta)
    }
  }

  // decodeFields returns the statements that read the fields of a struct
  // into it, skipping its blank fields.
  private decodeFields(
    shape: structShape,
    target: string,
    base: string,
    delta: number,
  ): string[] {
    const s = this.name('s')
    const out = [`const ${s} = ${target}`]
    let offset = delta
    for (const field of shape.fields) {
      if (!field.blank) {
        const fieldTarget = propertyAccess(s, field.key)
        out.push(...this.decode(field.shape, fieldTarget, base, offset))
      }
      offset += layoutSize(field.shape)
    }
    return out
  }

  // elements returns the statements that encode or decode the elements of
  // an array, one after the other.
  private elements(
    shape: { elem: layoutShape; count: number },
    array: string,
    base: string,
    delta: number,
    mode: 'encode' | 'decode',
  ): string[] {
    // Short arrays get the statements of each element.
    const a = this.name('a')
    const width = layoutSize(shape.elem)
    const out = [`const ${a} = ${array}`]
    const element = (k: string, b: string, d: number) =>
      mode === 'encode' ?
        this.encode(shape.elem, `${a}[${k}]`, b, d)
      : this.decode(shape.elem, `${a}[${k}]`, b, d)
    if (shape.count <= unrolledArrayLength) {
      for (let k = 0; k < shape.count; k++) {
        out.push(...element(String(k), base, delta + k * width))
      }
      return out
    }

    // Longer arrays loop over their elements.
    const k = this.name('k')
    const o = this.name('o')
    out.push(
      `for (let ${k} = 0; ${k} < ${shape.count}; ${k}++) {`,
      `const ${o} = ${this.at(base, delta)} + ${k} * ${width / this.access.unit}`,
      ...element(k, o, 0),
      '}',
    )
    return out
  }
}

// propertyAccess returns the expression that reads property key of value.
function propertyAccess(value: string, key: string): string {
  return `${value}[${JSON.stringify(key)}]`
}

// valueCodec writes the value at byte offset at of view, or reads a value
// from there into the given holder at key.
type valueWriter = (
  view: DataView,
  at: number,
  value: any,
  little: boolean,
) => void
type valueReader = (
  view: DataView,
  at: number,
  holder: any,
  key: string | number,
  little: boolean,
) => void

// closureStructPlan builds the plan of shape from closures, for pages that do
// not allow generated code. It is several times slower than the generated
// plan but still avoids the generic shape walk.
export function closureStructPlan(shape: structShape): structPlan {
  // The struct closures do one struct; the plan loops over the run.
  const size = layoutSize(shape)
  const write = writerFor(shape)
  const read = readerFor(shape)
  return {
    size,
    encode: (view, at, elems, start, n, little) => {
      for (let i = 0; i < n; i++) {
        write(view, at + i * size, elems[start + i], little)
      }
    },
    decode: (view, at, elems, start, n, little) => {
      for (let i = 0; i < n; i++) {
        read(view, at + i * size, elems, start + i, little)
      }
    },
  }
}

// writerFor returns the closure that writes a value of shape.
function writerFor(shape: layoutShape): valueWriter {
  switch (shape.tag) {
    case 'scalar':
      return scalarWriter(shape.kind)
    case 'complex': {
      const part = scalarWriter(shape.elem)
      const width = scalarAccessors[shape.elem].width
      return (view, at, value, little) => {
        part(view, at, value.real, little)
        part(view, at + width, value.imag, little)
      }
    }
    case 'array': {
      const elem = writerFor(shape.elem)
      const width = layoutSize(shape.elem)
      const count = shape.count
      return (view, at, value, little) => {
        for (let k = 0; k < count; k++) {
          elem(view, at + k * width, value[k], little)
        }
      }
    }
    case 'struct':
      return structWriter(shape)
  }
}

// structWriter returns the closure that writes the fields of a struct, and
// zeros for its blank fields.
function structWriter(shape: structShape): valueWriter {
  // Each field becomes a writer at its offset in the struct.
  const fields: { key: string; offset: number; write: valueWriter }[] = []
  let offset = 0
  for (const field of shape.fields) {
    const width = layoutSize(field.shape)
    const write = field.blank ? zeroWriter(width) : writerFor(field.shape)
    fields.push({ key: field.key, offset, write })
    offset += width
  }

  // The struct writer runs the field writers in order.
  return (view, at, value, little) => {
    for (const field of fields) {
      field.write(view, at + field.offset, value[field.key], little)
    }
  }
}

// zeroWriter returns the closure that writes width zero bytes.
function zeroWriter(width: number): valueWriter {
  return (view, at) => {
    for (let z = 0; z < width; z++) {
      view.setUint8(at + z, 0)
    }
  }
}

// scalarWriter returns the closure that writes a scalar of kind.
function scalarWriter(kind: string): valueWriter {
  const set = scalarAccessors[kind].set
  if (kind === 'bool') {
    return (view, at, value) => view.setUint8(at, value ? 1 : 0)
  }
  if (kind === 'int64' || kind === 'uint64') {
    return (view, at, value, little) =>
      (view as any)[set](at, BigInt(value), little)
  }
  return (view, at, value, little) => (view as any)[set](at, value, little)
}

// readerFor returns the closure that reads a value of shape into holder at
// key, filling arrays and structs in place.
function readerFor(shape: layoutShape): valueReader {
  switch (shape.tag) {
    case 'scalar':
      return scalarReader(shape.kind)
    case 'complex': {
      const get = scalarAccessors[shape.elem].get
      const width = scalarAccessors[shape.elem].width
      return (view, at, holder, key, little) => {
        const real = (view as any)[get](at, little)
        holder[key] = { real, imag: (view as any)[get](at + width, little) }
      }
    }
    case 'array': {
      const elem = readerFor(shape.elem)
      const width = layoutSize(shape.elem)
      const count = shape.count
      return (view, at, holder, key, little) => {
        const array = holder[key]
        for (let k = 0; k < count; k++) {
          elem(view, at + k * width, array, k, little)
        }
      }
    }
    case 'struct':
      return structReader(shape)
  }
}

// structReader returns the closure that reads the fields of a struct into it,
// skipping its blank fields.
function structReader(shape: structShape): valueReader {
  // Each field that is not blank becomes a reader at its offset.
  const fields: { key: string; offset: number; read: valueReader }[] = []
  let offset = 0
  for (const field of shape.fields) {
    if (!field.blank) {
      fields.push({ key: field.key, offset, read: readerFor(field.shape) })
    }
    offset += layoutSize(field.shape)
  }

  // The struct reader runs the field readers in order on the struct.
  return (view, at, holder, key, little) => {
    const value = holder[key]
    for (const field of fields) {
      field.read(view, at + field.offset, value, field.key, little)
    }
  }
}

// scalarReader returns the closure that reads a scalar of kind.
function scalarReader(kind: string): valueReader {
  const get = scalarAccessors[kind].get
  if (kind === 'bool') {
    return (view, at, holder, key) => {
      holder[key] = view.getUint8(at) !== 0
    }
  }
  return (view, at, holder, key, little) => {
    holder[key] = (view as any)[get](at, little)
  }
}

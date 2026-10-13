// Handwritten TypeScript implementation of Go's fmt package
// Optimized for JavaScript runtime and simplified for common use cases

import * as $ from '@goscript/builtin/index.js'
import { writeHostStdoutText } from '@goscript/builtin/hostio.js'
import {
  Array as ArrayKind,
  PointerTo,
  Slice as SliceKind,
  Struct,
  TypeOf,
  Value,
} from '@goscript/reflect/type.js'

// Stringer Basic interfaces.
export interface Stringer {
  String(): string
}

export interface GoStringer {
  GoString(): string
}

export interface Formatter {
  Format(f: State, verb: number): void
}

export interface State {
  Flag(c: number): boolean
  Precision(): [number, boolean]
  Width(): [number, boolean]
  Write(b: $.Bytes): [number, $.GoError | null]
}

// formatInt renders an integer value in the given radix, applying Go's # flag
// (0x/0X/0 base prefix) and +/space sign flags. The sign precedes the prefix,
// matching fmt's "%+#x" ordering.
function formatInt(
  value: unknown,
  radix: number,
  flags: string,
  upper: boolean,
): string {
  let primitive = value
  if (value !== null && typeof value === 'object' && '__goValue' in value) {
    primitive = value.__goValue
  }
  const neg =
    typeof primitive === 'bigint' ? primitive < 0n : Number(primitive) < 0
  let digits =
    typeof primitive === 'bigint' ?
      (neg ? -primitive : primitive).toString(radix)
    : Math.abs(Math.trunc(Number(primitive))).toString(radix)
  if (upper) {
    digits = digits.toUpperCase()
  }
  let prefix = ''
  if (flags.includes('#')) {
    if (radix === 16) {
      prefix = upper ? '0X' : '0x'
    } else if (radix === 8 && !digits.startsWith('0')) {
      prefix = '0'
    }
  }
  let sign = ''
  if (neg) {
    sign = '-'
  } else if (flags.includes('+')) {
    sign = '+'
  } else if (flags.includes(' ')) {
    sign = ' '
  }
  return sign + prefix + digits
}

// formatHexBytes formats a byte slice or the bytes of a string in hexadecimal
// for %x and %X, two digits per byte, with the space and # flags as in Go.
function formatHexBytes(
  value: Uint8Array | string,
  flags: string,
  upper: boolean,
): string {
  // Read the bytes and the prefix and spacing the flags ask for.
  const bytes =
    typeof value === 'string' ? new TextEncoder().encode(value) : value
  const prefix =
    flags.includes('#') ?
      upper ? '0X'
      : '0x'
    : ''
  const space = flags.includes(' ')

  // Write two digits per byte, prefixing each spaced byte or only the first.
  let result = ''
  for (let i = 0; i < bytes.length; i++) {
    if (space && i > 0) {
      result += ' '
    }
    if (prefix !== '' && (space || i === 0)) {
      result += prefix
    }
    const hex = bytes[i].toString(16).padStart(2, '0')
    result += upper ? hex.toUpperCase() : hex
  }
  return result
}

// Simple printf-style formatting implementation for verbs that cannot
// produce async results (numbers, runes, booleans). Value formatting that can
// consult Error/String/GoString goes through formatValueMaybe instead.
function formatValue(value: any, verb: string, flags = ''): string {
  if (value === null || value === undefined) {
    return '<nil>'
  }

  switch (verb) {
    case 'd': // decimal integer
      return formatInt(value, 10, flags, false)
    case 'f': // decimal point, no exponent
      return Number(value).toString()
    case 's': // string
      if (typeof value === 'string') return value
      if (value instanceof Uint8Array) return $.bytesToString(value)
      return String(defaultFormatMaybe(value))
    case 't': // boolean
      return value ? 'true' : 'false'
    case 'T': // type (approximate Go names for primitives we need)
      if (hasGoTypeName(value)) return value.__goType
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'int' : 'float64'
      }
      if (typeof value === 'boolean') return 'bool'
      if (typeof value === 'string') return 'string'
      return typeof value
    case 'c': // character (Unicode code point)
      // Go's %c encodes the rune as a Unicode character; fromCharCode truncates
      // any code point above U+FFFF and mangles surrogates. runeToString owns
      // the Go string(rune) rule (astral intact, invalid -> U+FFFD, no throw).
      return $.runeToString(Number(value))
    case 'x': // hexadecimal lowercase
      if (value instanceof Uint8Array || typeof value === 'string') {
        return formatHexBytes(value, flags, false)
      }
      return formatInt(value, 16, flags, false)
    case 'X': // hexadecimal uppercase
      if (value instanceof Uint8Array || typeof value === 'string') {
        return formatHexBytes(value, flags, true)
      }
      return formatInt(value, 16, flags, true)
    case 'o': // octal
      return formatInt(value, 8, flags, false)
    case 'b': // binary
      return formatInt(value, 2, flags, false)
    case 'e': // scientific notation lowercase
      return Number(value).toExponential()
    case 'E': // scientific notation uppercase
      return Number(value).toExponential().toUpperCase()
    case 'g': // %e for large exponents, %f otherwise
      return Number(value).toPrecision()
    case 'G': // %E for large exponents, %F otherwise
      return Number(value).toPrecision().toUpperCase()
    case 'q': // quoted string / rune
      if (typeof value === 'number' && Number.isInteger(value)) {
        // emulate quoted rune; runeToString avoids fromCodePoint throwing on
        // invalid code points and maps them to U+FFFD as Go's %q does.
        return JSON.stringify($.runeToString(value))
      }
      if (value instanceof Uint8Array) {
        return JSON.stringify($.bytesToString(value))
      }
      return JSON.stringify(String(value))
    case 'p': {
      return formatPointer(value)
    }
    default:
      return String(value)
  }
}

function hasGoTypeName(value: unknown): value is { __goType: string } {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as { __goType?: unknown }).__goType === 'string'
  )
}

// hasGoString reports whether value implements the GoStringer interface. Go
// invokes GoString only for the %#v verb, never for %v, %s, or Sprint.
function hasGoString(value: unknown): value is { GoString: () => string } {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as { GoString?: unknown }).GoString === 'function'
  )
}

type MaybeString = string | PromiseLike<string>

function isPromiseLike<T = unknown>(value: unknown): value is PromiseLike<T> {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof (value as { then?: unknown }).then === 'function'
  )
}

function toMaybeString(value: unknown): MaybeString {
  if (isPromiseLike(value)) {
    return value.then((resolved) => String(resolved))
  }
  return String(value)
}

function joinMaybe(
  parts: MaybeString[],
  separator: string,
  prefix = '',
  suffix = '',
): MaybeString {
  if (parts.some(isPromiseLike)) {
    return Promise.all(parts.map((part) => Promise.resolve(part))).then(
      (resolved) => `${prefix}${resolved.join(separator)}${suffix}`,
    )
  }
  return `${prefix}${(parts as string[]).join(separator)}${suffix}`
}

/** formatPointer renders a stable runtime address without inspecting the pointee. */
function formatPointer(value: any): string {
  const pointer = new Value(value, PointerTo(TypeOf(value)))
  return '0x' + pointer.Pointer().toString(16)
}

/** defaultFormatMaybe renders Go values without exposing their runtime storage. */
function defaultFormatMaybe(
  value: any,
  flags = '',
  depth = 0,
  typeInfo?: $.TypeInfo | string,
  allowMethods = true,
): MaybeString {
  if (value === null || value === undefined) return '<nil>'
  if ($.isTypedNilValue(value)) return '<nil>'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'string')
    return flags.includes('#') ? JSON.stringify(value) : value
  if (typeof value === 'number' || typeof value === 'bigint') {
    return value.toString()
  }
  if (Array.isArray(value))
    return joinMaybe(
      value.map((item) => defaultFormatMaybe(item, flags, depth + 1)),
      ' ',
      '[',
      ']',
    )
  if (typeof value === 'object') {
    // Go consults methods on exported fields, with GoString reserved for %#v.
    const methodValue = $.isVarRef(value) ? value.value : value
    if (allowMethods && flags.includes('#') && hasGoString(methodValue)) {
      return toMaybeString(methodValue.GoString())
    }
    if (
      allowMethods &&
      !flags.includes('#') &&
      typeof methodValue?.Error === 'function'
    ) {
      try {
        return toMaybeString(methodValue.Error())
      } catch {
        // Ignore error by continuing to next case.
      }
    }
    if (
      allowMethods &&
      !flags.includes('#') &&
      typeof methodValue?.String === 'function'
    ) {
      try {
        return toMaybeString(methodValue.String())
      } catch {
        // Ignore error by continuing to next case.
      }
    }
    const declared =
      typeof typeInfo === 'string' ? $.getTypeByName(typeInfo) : typeInfo
    const descriptor =
      (declared?.kind === $.TypeKind.Interface ? undefined : declared) ??
      value.__goTypeInfo ??
      value.constructor?.__typeInfo
    const info =
      typeof descriptor === 'string' ? $.getTypeByName(descriptor) : descriptor
    if ($.isVarRef(value) || info?.kind === $.TypeKind.Pointer) {
      const pointee =
        $.isVarRef(value) ? value.value : (value.__goValue ?? value)
      const elementDescriptor =
        info?.kind === $.TypeKind.Pointer ? info.elemType : undefined
      const element =
        typeof elementDescriptor === 'string' ?
          $.getTypeByName(elementDescriptor)
        : elementDescriptor
      if (
        depth === 0 &&
        pointee !== null &&
        typeof pointee === 'object' &&
        (element?.kind === $.TypeKind.Struct ||
          element?.kind === $.TypeKind.Array ||
          element?.kind === $.TypeKind.Slice ||
          (element === undefined &&
            [Struct, ArrayKind, SliceKind].includes(TypeOf(pointee).Kind())))
      ) {
        return joinMaybe(
          [
            defaultFormatMaybe(
              pointee,
              flags,
              depth + 1,
              element ?? pointee.constructor?.__typeInfo,
              allowMethods,
            ),
          ],
          '',
          '&',
        )
      }
      return formatPointer(value)
    }
    if (value instanceof Uint8Array) {
      const bytes = globalThis.Array.from(value)
      if (flags.includes('#')) {
        const hex = bytes.map((b) => '0x' + b.toString(16))
        return `[]byte{${hex.join(', ')}}`
      }
      return `[${bytes.join(' ')}]`
    }
    if ('__goValue' in value) {
      return defaultFormatMaybe(
        value.__goValue,
        flags,
        depth,
        typeInfo,
        allowMethods,
      )
    }
    if (
      info?.kind === $.TypeKind.Struct ||
      (value._fields &&
        typeof value._fields === 'object' &&
        !Array.isArray(value._fields)) ||
      value.constructor === Object
    ) {
      const fields: $.StructFieldInfo[] =
        info?.kind === $.TypeKind.Struct ?
          info.fields
        : Object.keys(value._fields ?? value).map((name) => ({
            name,
            key: name,
            type: $.basicType('unknown'),
          }))
      const storage = value._fields ?? value
      const parts = fields.map((field) => {
        const formatted = defaultFormatMaybe(
          storage[$.structFieldRuntimeKey(field)],
          flags,
          depth + 1,
          field.type,
          allowMethods && (field.exported ?? /^\p{Lu}/u.test(field.name)),
        )
        const prefix =
          flags.includes('+') || flags.includes('#') ? field.name + ':' : ''
        return joinMaybe([formatted], '', prefix)
      })
      const name = flags.includes('#') ? (info?.name ?? '') : ''
      return joinMaybe(parts, flags.includes('#') ? ', ' : ' ', name + '{', '}')
    }
    // Basic Map/Set rendering
    if (value instanceof Map) {
      const parts: MaybeString[] = []
      for (const [k, v] of (value as Map<any, any>).entries()) {
        const key = defaultFormatMaybe(k, flags, depth + 1)
        const elem = defaultFormatMaybe(v, flags, depth + 1)
        if (isPromiseLike(key) || isPromiseLike(elem)) {
          parts.push(
            Promise.all([Promise.resolve(key), Promise.resolve(elem)]).then(
              ([resolvedKey, resolvedElem]) => `${resolvedKey}:${resolvedElem}`,
            ),
          )
        } else {
          parts.push(`${key}:${elem}`)
        }
      }
      return joinMaybe(parts, ' ', '{', '}')
    }
    if (value instanceof Set) {
      const parts: MaybeString[] = []
      for (const v of (value as Set<any>).values()) {
        parts.push(defaultFormatMaybe(v, flags, depth + 1))
      }
      return joinMaybe(parts, ' ', '[', ']')
    }
    // Default object representation
    if (
      (value as any).constructor?.name &&
      (value as any).constructor.name !== 'Object'
    ) {
      const parts = Object.entries(value as Record<string, any>).map(
        ([k, v]) => {
          const formatted = defaultFormatMaybe(v, flags, depth + 1)
          if (isPromiseLike(formatted)) {
            return formatted.then((resolved) => `${k}:${resolved}`)
          }
          return `${k}:${formatted}`
        },
      )
      return joinMaybe(parts, ' ', '{', '}')
    }
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

function formatValueMaybe(value: any, verb: string, flags = ''): MaybeString {
  switch (verb) {
    case 'v':
      if (flags.includes('#') && hasGoString(value)) {
        return toMaybeString(value.GoString())
      }
      return defaultFormatMaybe(value, flags)
    case 'w':
      return defaultFormatMaybe(value)
    case 's':
      if (typeof value === 'string') return value
      if (value instanceof Uint8Array) return $.bytesToString(value)
      return defaultFormatMaybe(value)
    default:
      return formatValue(value, verb, flags)
  }
}

function applyFormatOptions(
  formatted: MaybeString,
  arg: any,
  verb: string,
  flags: string,
  width: string,
  precision: string,
): MaybeString {
  const apply = (text: string): string => {
    let result = text
    if (width && !precision) {
      const w = parseInt(width)
      if (flags.includes('-')) {
        result = result.padEnd(w)
      } else {
        result = result.padStart(w, flags.includes('0') ? '0' : ' ')
      }
    } else if (precision && (verb === 'f' || verb === 'e' || verb === 'g')) {
      const p = parseInt(precision)
      const num = Number(arg)
      if (verb === 'f') {
        result = num.toFixed(p)
      } else if (verb === 'e') {
        result = num.toExponential(p)
      } else if (verb === 'g') {
        result = num.toPrecision(p)
      }

      if (width) {
        const w = parseInt(width)
        if (flags.includes('-')) {
          result = result.padEnd(w)
        } else {
          result = result.padStart(w)
        }
      }
    }
    return result
  }
  if (isPromiseLike(formatted)) {
    return formatted.then(apply)
  }
  return apply(formatted)
}

function parseFormatMaybe(format: string, args: any[]): MaybeString {
  const parts: MaybeString[] = []
  let argIndex = 0

  for (let i = 0; i < format.length; i++) {
    if (format[i] === '%') {
      if (i + 1 < format.length) {
        const nextChar = format[i + 1]
        if (nextChar === '%') {
          parts.push('%')
          i++ // skip the next %
          continue
        }

        // Parse format specifier
        let j = i + 1
        let width = ''
        let precision = ''
        let flags = ''

        // Parse flags (-, +, #, 0, space)
        while (j < format.length && '+-# 0'.includes(format[j])) {
          flags += format[j]
          j++
        }

        // Parse width
        while (j < format.length && format[j] >= '0' && format[j] <= '9') {
          width += format[j]
          j++
        }

        // Parse precision
        if (j < format.length && format[j] === '.') {
          j++
          while (j < format.length && format[j] >= '0' && format[j] <= '9') {
            precision += format[j]
            j++
          }
        }

        // Get the verb
        if (j < format.length) {
          const verb = format[j]

          if (argIndex < args.length) {
            const arg = args[argIndex]
            let formatted: MaybeString | null = formatWithStateMaybe(
              arg,
              verb,
              flags,
              width,
              precision,
            )
            if (formatted === null) {
              formatted = formatValueMaybe(arg, verb, flags)
            }

            parts.push(
              applyFormatOptions(formatted, arg, verb, flags, width, precision),
            )
            argIndex++
          } else {
            parts.push(`%!${verb}(MISSING)`)
          }

          i = j
        } else {
          parts.push(format[i])
        }
      } else {
        parts.push(format[i])
      }
    } else {
      parts.push(format[i])
    }
  }

  return joinMaybe(parts, '')
}

function formatWithStateMaybe(
  value: any,
  verb: string,
  flags: string,
  width: string,
  precision: string,
): MaybeString | null {
  if (!value || typeof value.Format !== 'function' || value.Format.length < 2) {
    return null
  }

  let out = ''
  const state: State = {
    Flag(c: number): boolean {
      return flags.includes(String.fromCharCode(c))
    },
    Precision(): [number, boolean] {
      return precision === '' ? [0, false] : [parseInt(precision), true]
    },
    Width(): [number, boolean] {
      return width === '' ? [0, false] : [parseInt(width), true]
    },
    Write(b: $.Bytes): [number, $.GoError | null] {
      const text = $.bytesToString(b)
      out += text
      return [text.length, null]
    },
  }

  const result = value.Format(state, verb.codePointAt(0) ?? 0)
  if (isPromiseLike(result)) {
    return result.then(() => out)
  }
  return out
}

// Global stdout simulation for Print functions
let stdout = {
  write: (data: string) => {
    writeHostStdoutText(data)
  },
}

// Print functions.
//
// Operands may implement Error/String/GoString asynchronously (a transpiled
// Go method that awaits), so every operand renders through the Maybe pipeline
// and these functions resolve before writing or returning text.

// sprintOperands renders operands with Go's Print spacing rule: a space is
// added between operands only when neither side is a string.
async function sprintOperands(a: any[]): Promise<string> {
  let out = ''
  for (let i = 0; i < a.length; i++) {
    if (i > 0) {
      const prevIsString = typeof a[i - 1] === 'string'
      const currIsString = typeof a[i] === 'string'
      if (!prevIsString && !currIsString) out += ' '
    }
    out += await defaultFormatMaybe(a[i])
  }
  return out
}

// sprintlnOperands renders operands with Go's Println rule: always
// space-separated, terminated by a newline.
async function sprintlnOperands(a: any[]): Promise<string> {
  const parts = await Promise.all(
    a.map((operand) => Promise.resolve(defaultFormatMaybe(operand))),
  )
  return parts.join(' ') + '\n'
}

export async function Print(...a: any[]): Promise<[number, $.GoError | null]> {
  const out = await sprintOperands(a)
  stdout.write(out)
  return [out.length, null]
}

export async function Printf(
  format: string,
  ...a: any[]
): Promise<[number, $.GoError | null]> {
  const result = await parseFormatMaybe(format, a)
  stdout.write(result)
  return [result.length, null]
}

export async function Println(
  ...a: any[]
): Promise<[number, $.GoError | null]> {
  const result = await sprintlnOperands(a)
  stdout.write(result)
  return [result.length, null]
}

// Sprint functions (return strings)
export async function Sprint(...a: any[]): Promise<string> {
  return sprintOperands(a)
}

export async function Sprintf(format: string, ...a: any[]): Promise<string> {
  return parseFormatMaybe(format, a)
}

export async function Sprintln(...a: any[]): Promise<string> {
  return sprintlnOperands(a)
}

async function writeToWriter(
  w: any,
  out: string,
): Promise<[number, $.GoError | null]> {
  if (w && w.Write) {
    return await w.Write(new TextEncoder().encode(out))
  }
  return [0, $.newError('Writer does not implement Write method')]
}

// Fprint functions (write to Writer)
export async function Fprint(
  w: any,
  ...a: any[]
): Promise<[number, $.GoError | null]> {
  // Same spacing as Print
  const out = await sprintOperands(a)
  return await writeToWriter(w, out)
}

export async function Fprintf(
  w: any,
  format: string,
  ...a: any[]
): Promise<[number, $.GoError | null]> {
  const result = await parseFormatMaybe(format, a)
  return await writeToWriter(w, result)
}

export async function Fprintln(
  w: any,
  ...a: any[]
): Promise<[number, $.GoError | null]> {
  // Same behavior as Println
  const result = await sprintlnOperands(a)
  return await writeToWriter(w, result)
}

// Append functions (append to byte slice)
export async function Append(b: $.Bytes, ...a: any[]): Promise<$.Bytes> {
  const result = await sprintOperands(a)
  return appendText(b, result)
}

export async function Appendf(
  b: $.Bytes,
  format: string,
  ...a: any[]
): Promise<$.Bytes> {
  const result = await parseFormatMaybe(format, a)
  return appendText(b, result)
}

export async function Appendln(b: $.Bytes, ...a: any[]): Promise<$.Bytes> {
  const result = await sprintlnOperands(a)
  return appendText(b, result)
}

function appendText(b: $.Bytes, result: string): $.Bytes {
  const encoded = new TextEncoder().encode(result)
  const base = $.bytesToUint8Array(b)
  const newArray = new Uint8Array(base.length + encoded.length)
  newArray.set(base)
  newArray.set(encoded, base.length)
  return newArray
}

// Errorf Error creation
//
// Errorf stays a synchronous Go API: it returns the error immediately and
// resolves operand text lazily when Error is called, so protobuf-generated
// sync methods can keep using it while async Error/String operands still
// render through the MaybePromise convention.
export function Errorf(format: string, ...a: any[]): any {
  const err: Exclude<$.GoError, null> = {
    Error: (): string | PromiseLike<string> => parseFormatMaybe(format, a),
  }
  // %w operands are wrapped: the result must Unwrap to them so errors.Is/As can
  // walk the chain. One %w unwraps to a single error; multiple %w (Go 1.20+)
  // unwrap to an []error, matching the depth-first traversal in errors.Is.
  const wrapped = errorfWrappedArgs(format, a)
  if (wrapped.length === 1) {
    ;(err as any).Unwrap = (): $.GoError => wrapped[0]
  } else if (wrapped.length > 1) {
    ;(err as any).Unwrap = (): $.GoError[] => wrapped
  }
  return err
}

// errorfWrappedArgs returns the error operands consumed by %w verbs, in order.
// It walks the format string with the same flag/width/precision/verb skip and
// the same positional arg consumption as parseFormat, so the operand a %w binds
// to here is exactly the one it formatted in the message.
function errorfWrappedArgs(format: string, args: any[]): $.GoError[] {
  const wrapped: $.GoError[] = []
  let argIndex = 0
  for (let i = 0; i < format.length; i++) {
    if (format[i] !== '%' || i + 1 >= format.length) {
      continue
    }
    if (format[i + 1] === '%') {
      i++
      continue
    }
    let j = i + 1
    while (j < format.length && '+-# 0'.includes(format[j])) j++
    while (j < format.length && format[j] >= '0' && format[j] <= '9') j++
    if (j < format.length && format[j] === '.') {
      j++
      while (j < format.length && format[j] >= '0' && format[j] <= '9') j++
    }
    if (j < format.length) {
      if (argIndex < args.length) {
        if (format[j] === 'w') {
          wrapped.push(args[argIndex] as $.GoError)
        }
        argIndex++
      }
      i = j
    }
  }
  return wrapped
}

// FormatString - simplified implementation.
export function FormatString(state: State, verb: number): string {
  let result = '%'

  // Add flags
  if (state.Flag(32)) result += ' ' // space
  if (state.Flag(43)) result += '+' // plus
  if (state.Flag(45)) result += '-' // minus
  if (state.Flag(35)) result += '#' // hash
  if (state.Flag(48)) result += '0' // zero

  // Add width
  const [width, hasWidth] = state.Width()
  if (hasWidth) {
    result += width.toString()
  }

  // Add precision
  const [precision, hasPrecision] = state.Precision()
  if (hasPrecision) {
    result += '.' + precision.toString()
  }

  // Add verb
  result += String.fromCharCode(verb)

  return result
}

// Scanning functions - stubbed for now.
export function Scan(..._a: any[]): [number, $.GoError | null] {
  // TODO: Implement scanning from stdin
  return [0, $.newError('Scan not implemented')]
}

export function Scanf(
  _format: string,
  ..._a: any[]
): [number, $.GoError | null] {
  // TODO: Implement formatted scanning from stdin
  return [0, $.newError('Scanf not implemented')]
}

export function Scanln(..._a: any[]): [number, $.GoError | null] {
  // TODO: Implement line scanning from stdin
  return [0, $.newError('Scanln not implemented')]
}

export function Sscan(str: string, ...a: any[]): [number, $.GoError | null] {
  const sc = new stringScanner(str)
  let n = 0
  for (const target of a) {
    sc.skipSpace(true)
    const err = sc.scanOne(target, 'v', 0, true)
    if (err !== null) {
      return [n, err]
    }
    n++
  }
  return [n, null]
}

export function Sscanf(
  str: string,
  format: string,
  ...a: any[]
): [number, $.GoError | null] {
  const sc = new stringScanner(str)
  let n = 0
  let arg = 0
  for (let i = 0; i < format.length; ) {
    const ch = format[i]
    if (ch !== '%') {
      if (isScanSpace(ch)) {
        // A run of spaces in the format matches zero or more spaces in the
        // input, and a newline in the format must match one in the input.
        let newlines = 0
        while (i < format.length && isScanSpace(format[i])) {
          if (format[i] === '\n') newlines++
          i++
        }
        sc.skipSpace(false)
        for (; newlines > 0; newlines--) {
          if (sc.peek() !== '\n') {
            return [n, $.newError('newline in format does not match input')]
          }
          sc.pos++
          sc.skipSpace(false)
        }
        continue
      }
      if (sc.peek() !== ch) {
        return [n, $.newError('input does not match format')]
      }
      sc.pos++
      i++
      continue
    }
    i++
    let width = 0
    while (i < format.length && format[i] >= '0' && format[i] <= '9') {
      width = width * 10 + (format.charCodeAt(i) - 48)
      i++
    }
    const verb = format[i++]
    if (verb === undefined) {
      return [n, $.newError('too few operands for format')]
    }
    if (verb === '%') {
      sc.skipSpace(false)
      if (sc.peek() !== '%') {
        return [n, $.newError('missing literal %')]
      }
      sc.pos++
      continue
    }
    if (arg >= a.length) {
      return [n, $.newError(`too few operands for format '%${verb}'`)]
    }
    if (verb !== 'c') {
      sc.skipSpace(false)
    }
    const err = sc.scanOne(a[arg++], verb, width, false)
    if (err !== null) {
      return [n, err]
    }
    n++
  }
  if (arg < a.length) {
    return [n, $.newError(`too many operands`)]
  }
  return [n, null]
}

function isScanSpace(ch: string | undefined): boolean {
  return ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n'
}

// scanIntKinds maps the integer kinds to their bit sizes and signedness.
const scanIntKinds: Record<string, [number, boolean]> = {
  int: [64, true],
  int8: [8, true],
  int16: [16, true],
  int32: [32, true],
  rune: [32, true],
  int64: [64, true],
  uint: [64, false],
  uint8: [8, false],
  byte: [8, false],
  uint16: [16, false],
  uint32: [32, false],
  uint64: [64, false],
  uintptr: [64, false],
}

// stringScanner scans values from a string, as for Sscan and Sscanf.
class stringScanner {
  public pos = 0

  constructor(private readonly str: string) {}

  peek(): string | undefined {
    return this.str[this.pos]
  }

  // skipSpace skips spaces, and newlines too when newlines is true.
  skipSpace(newlines: boolean): void {
    while (this.pos < this.str.length) {
      const ch = this.str[this.pos]
      if (ch === '\n' && !newlines) {
        return
      }
      if (!isScanSpace(ch)) {
        return
      }
      this.pos++
    }
  }

  // token returns the longest prefix of at most width characters (or of any
  // length when width is 0) whose characters satisfy accept.
  token(width: number, accept: (ch: string, index: number) => boolean): string {
    const start = this.pos
    while (
      this.pos < this.str.length &&
      (width === 0 || this.pos - start < width) &&
      accept(this.str[this.pos], this.pos - start)
    ) {
      this.pos++
    }
    return this.str.slice(start, this.pos)
  }

  // scanOne scans a value for the verb into target, which is a pointer.
  scanOne(
    target: any,
    verb: string,
    width: number,
    newlineIsSpace: boolean,
  ): $.GoError | null {
    const dest = scanDestination(target)
    if (dest === null) {
      return $.newError("can't scan type: not a pointer")
    }
    if (this.pos >= this.str.length) {
      return $.newError('unexpected EOF')
    }
    if (!newlineIsSpace && this.peek() === '\n' && verb !== 'c') {
      return $.newError('unexpected newline')
    }
    const kind = dest.kind
    if (kind !== undefined && kind in scanIntKinds) {
      return this.scanInt(dest.ref, verb, width, scanIntKinds[kind])
    }
    if (kind === 'float32' || kind === 'float64') {
      const tok = this.token(
        width,
        (ch, i) =>
          /[0-9.eEpP_xX]/.test(ch) ||
          ((ch === '+' || ch === '-') &&
            (i === 0 || /[eEpP]/.test(this.str[this.pos - 1]))),
      )
      const value = Number(tok.replace(/_/g, ''))
      if (tok === '' || Number.isNaN(value)) {
        return $.newError(
          'strconv.ParseFloat: parsing ' +
            JSON.stringify(tok) +
            ': invalid syntax',
        )
      }
      dest.ref.value = kind === 'float32' ? Math.fround(value) : value
      return null
    }
    if (kind === 'bool') {
      const tok = this.token(width, (ch) => /[a-zA-Z0-9]/.test(ch))
      const value =
        /^(1|t|T|true|TRUE|True)$/.test(tok) ? true
        : /^(0|f|F|false|FALSE|False)$/.test(tok) ? false
        : undefined
      if (value === undefined) {
        return $.newError('syntax error scanning boolean')
      }
      dest.ref.value = value
      return null
    }
    if (kind === 'string') {
      const tok =
        verb === 'c' ?
          this.token(1, () => true)
        : this.token(width, (ch) => !isScanSpace(ch))
      dest.ref.value = tok
      return null
    }
    return $.newError(`can't scan type: ${dest.typeName}`)
  }

  scanInt(
    ref: $.VarRef<any>,
    verb: string,
    width: number,
    [bits, signed]: [number, boolean],
  ): $.GoError | null {
    if (verb === 'c') {
      const ch = this.token(1, () => true)
      ref.value =
        bits === 64 && !isNumberBacked(ref) ?
          BigInt(ch.codePointAt(0)!)
        : ch.codePointAt(0)!
      return null
    }
    let base =
      verb === 'x' || verb === 'X' ? 16
      : verb === 'o' ? 8
      : verb === 'b' ? 2
      : 10
    const start = this.pos
    let sign = ''
    if (this.peek() === '+' || this.peek() === '-') {
      sign = this.str[this.pos++]
    }
    if (verb === 'v' && this.peek() === '0') {
      const prefix = this.str[this.pos + 1]?.toLowerCase()
      if (prefix === 'x' || prefix === 'b' || prefix === 'o') {
        base =
          prefix === 'x' ? 16
          : prefix === 'b' ? 2
          : 8
        this.pos += 2
      }
    }
    const remaining = width === 0 ? 0 : Math.max(width - (this.pos - start), 0)
    if (width !== 0 && remaining === 0) {
      return $.newError('expected integer')
    }
    const digits = this.token(remaining, (ch) => {
      const d = parseInt(ch, 36)
      return ch !== '_' && !Number.isNaN(d) && d < base
    })
    if (digits === '') {
      this.pos = start
      return $.newError('expected integer')
    }
    let value: bigint
    try {
      value = BigInt(
        (base === 16 ? '0x'
        : base === 8 ? '0o'
        : base === 2 ? '0b'
        : '') + digits,
      )
    } catch {
      return $.newError('expected integer')
    }
    if (sign === '-') {
      if (!signed) {
        return $.newError('expected integer')
      }
      value = -value
    }
    const limit = 1n << BigInt(signed ? bits - 1 : bits)
    if (
      (signed && (value >= limit || value < -limit)) ||
      (!signed && value >= limit)
    ) {
      return $.newError(
        'integer overflow on token ' + this.str.slice(start, this.pos),
      )
    }
    ref.value = bits === 64 && !isNumberBacked(ref) ? value : Number(value)
    return null
  }
}

// isNumberBacked reports whether the 64-bit integer variable ref holds a
// number, as int and uint do, rather than a bigint.
function isNumberBacked(ref: $.VarRef<any>): boolean {
  return typeof ref.value === 'number'
}

// scanDestination returns the variable that a scan argument points to and
// the name of its basic type, when known.
function scanDestination(
  target: any,
): { ref: $.VarRef<any>; kind: string | undefined; typeName: string } | null {
  const ref =
    $.isVarRef(target) ? target
    : (
      target != null &&
      typeof target === 'object' &&
      $.isVarRef(target.__goValue)
    ) ?
      target.__goValue
    : null
  if (ref == null) {
    return null
  }
  const typeName: string = target.__goType ?? ''
  const info = target.__goTypeInfo
  let elem = info && typeof info === 'object' ? info.elemType : undefined
  let kind: string | undefined =
    elem && typeof elem === 'object' && elem.kind === $.TypeKind.Basic ?
      elem.name
    : undefined
  if (kind === undefined && typeName.startsWith('*')) {
    const name = typeName.slice(1)
    if (name in scanIntKinds || /^(float32|float64|bool|string)$/.test(name)) {
      kind = name
    }
  }
  if (kind === undefined) {
    // Infer the kind from the current value of the variable.
    switch (typeof ref.value) {
      case 'number':
        kind = Number.isInteger(ref.value) ? 'int' : 'float64'
        break
      case 'bigint':
        kind = 'int64'
        break
      case 'string':
        kind = 'string'
        break
      case 'boolean':
        kind = 'bool'
        break
    }
  }
  return { ref, kind, typeName }
}

export function Sscanln(str: string, ...a: any[]): [number, $.GoError | null] {
  const sc = new stringScanner(str)
  let n = 0
  for (const target of a) {
    sc.skipSpace(false)
    const err = sc.scanOne(target, 'v', 0, false)
    if (err !== null) {
      return [n, err]
    }
    n++
  }
  sc.skipSpace(false)
  if (sc.pos < str.length && sc.peek() !== '\n') {
    return [n, $.newError('expected newline')]
  }
  return [n, null]
}

export function Fscan(_r: any, ..._a: any[]): [number, $.GoError | null] {
  // TODO: Implement scanning from Reader
  return [0, $.newError('Fscan not implemented')]
}

export function Fscanf(
  _r: any,
  _format: string,
  ..._a: any[]
): [number, $.GoError | null] {
  // TODO: Implement formatted scanning from Reader
  return [0, $.newError('Fscanf not implemented')]
}

export function Fscanln(_r: any, ..._a: any[]): [number, $.GoError | null] {
  // TODO: Implement line scanning from Reader
  return [0, $.newError('Fscanln not implemented')]
}

// Scanner and ScanState interfaces - stubbed.
export interface Scanner {
  Scan(state: ScanState, verb: number): $.GoError | null
}

export interface ScanState {
  ReadRune(): [number, number, $.GoError | null]
  UnreadRune(): $.GoError | null
  SkipSpace(): void
  Token(
    skipSpace: boolean,
    f: (r: number) => boolean,
  ): [Uint8Array, $.GoError | null]
  Width(): [number, boolean]
  Read(buf: $.Bytes): [number, $.GoError | null]
}

import * as $ from '@goscript/builtin/index.js'
import * as context from '@goscript/context/index.js'
import * as errors from '@goscript/errors/index.js'
import * as io from '@goscript/io/index.js'

type WriterArg = io.Writer | $.VarRef<io.Writer> | null | undefined

const unsupportedProfileError = errors.New(
  'runtime/pprof: profiles are unsupported in GoScript',
)

export class Profile {
  public name: string
  private values = new Map<unknown, true>()
  private builtIn: boolean

  constructor(name = '', builtIn = false) {
    this.name = name
    this.builtIn = builtIn
  }

  public Name(): string {
    return this.name
  }

  public Count(): number {
    return this.builtIn && this.name !== '' ? 1 : this.values.size
  }

  public Add(value: unknown, _skip: number): void {
    if (this.name === '') {
      throw new Error('pprof: use of uninitialized Profile')
    }
    if (this.builtIn) {
      throw new Error(`pprof: Add called on built-in Profile ${this.name}`)
    }
    if (this.values.has(value)) {
      throw new Error('pprof: Profile.Add of duplicate value')
    }
    this.values.set(value, true)
  }

  public Remove(value: unknown): void {
    this.values.delete(value)
  }

  public WriteTo(_w: WriterArg, _debug: number): $.GoError {
    return unsupportedProfileError
  }
}

export function Lookup(name: string): Profile | null {
  switch (name) {
    case 'heap':
    case 'allocs':
    case 'goroutine':
    case 'threadcreate':
    case 'block':
    case 'mutex':
      return new Profile(name, true)
    default:
      return customProfiles.get(name) ?? null
  }
}

export function Profiles(): $.Slice<Profile | null> {
  return $.arrayToSlice([
    new Profile('allocs', true),
    new Profile('block', true),
    new Profile('goroutine', true),
    new Profile('heap', true),
    new Profile('mutex', true),
    new Profile('threadcreate', true),
    ...Array.from(customProfiles.values()),
  ])
}

export function NewProfile(name: string): Profile {
  if (name === '') {
    throw new Error('pprof: NewProfile with empty name')
  }
  if (Lookup(name) != null) {
    throw new Error(`pprof: NewProfile name already in use: ${name}`)
  }
  const profile = new Profile(name)
  customProfiles.set(name, profile)
  return profile
}

export function StartCPUProfile(w: WriterArg): $.GoError {
  const writer = writerFromArg(w)
  if (writer == null) {
    return errors.New('runtime/pprof: nil profile writer')
  }
  return unsupportedProfileError
}

export function StopCPUProfile(): void {}

export function WriteHeapProfile(w: WriterArg): $.GoError {
  if (writerFromArg(w) == null) {
    return errors.New('runtime/pprof: nil profile writer')
  }
  return unsupportedProfileError
}

export function SetGoroutineLabels(_ctx: context.Context): void {}

// LabelSet is a set of profiler labels, sorted by key with one value per key.
export class LabelSet {
  public list: Array<[string, string]>

  constructor(list: Array<[string, string]> = []) {
    this.list = list
  }

  public clone(): LabelSet {
    return $.markAsStructValue(new LabelSet(this.list))
  }

  public __goscriptAssign(source: LabelSet): this {
    this.list = source.list
    return this
  }
}

// Labels takes an even number of strings as key, value pairs; a later value
// replaces an earlier one with the same key.
export function Labels(...args: string[]): LabelSet {
  if (args.length % 2 === 1) {
    throw new Error('uneven number of arguments to pprof.Labels')
  }
  const labels = new Map<string, string>()
  for (let i = 0; i < args.length; i += 2) {
    labels.set(args[i], args[i + 1])
  }
  return sortedLabelSet(labels)
}

// WithLabels returns a context carrying the context's labels merged with
// labels, where labels wins on a shared key.
export function WithLabels(
  ctx: context.Context,
  labels: LabelSet,
): context.Context {
  const merged = new Map(contextLabels(ctx).list)
  for (const [key, value] of labels.list) {
    merged.set(key, value)
  }
  return context.WithValue(ctx, labelContextKey, sortedLabelSet(merged))
}

export function Label(ctx: context.Context, key: string): [string, boolean] {
  const found = contextLabels(ctx).list.find(([k]) => k === key)
  return found === undefined ? ['', false] : [found[1], true]
}

// ForLabels calls f with each label in ctx in key order until f returns false.
export function ForLabels<R extends $.MaybePromise<boolean>>(
  ctx: context.Context,
  f: ((key: string, value: string) => R) | null,
): $.CallbackResult<R, void> {
  const list = contextLabels(ctx).list
  return $.runCallbacks(
    (function* () {
      for (const [key, value] of list) {
        if (!(yield f!(key, value))) {
          return
        }
      }
    })(),
  )
}

// Do calls f with a copy of ctx carrying labels and returns f's promise when
// f suspends. GoScript has no profiler, so the labels are visible only
// through Label and ForLabels.
export function Do<R extends void | globalThis.Promise<void>>(
  ctx: context.Context,
  labels: LabelSet,
  f: ((ctx: context.Context) => R) | null,
): R {
  return f!(WithLabels(ctx, labels))
}

// labelContextKey is the context key holding a context's LabelSet.
const labelContextKey = {}

function contextLabels(ctx: context.Context): LabelSet {
  return (ctx?.Value(labelContextKey) as LabelSet | null) ?? emptyLabelSet
}

function sortedLabelSet(labels: Map<string, string>): LabelSet {
  const list = Array.from(labels).sort(([a], [b]) =>
    a < b ? -1
    : a > b ? 1
    : 0,
  )
  return $.markAsStructValue(new LabelSet(list))
}

const emptyLabelSet = new LabelSet()

function writerFromArg(w: WriterArg): io.Writer | null {
  return $.pointerValueOrNil(w)
}

const customProfiles = new Map<string, Profile>()

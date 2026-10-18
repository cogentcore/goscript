// GoPanic carries a Go panic value as it unwinds the JavaScript call stack. A
// deferred recover() reads its value and sets recovered; an unrecovered GoPanic
// surfaces as a thrown error whose message is "panic: <value>", matching Go's
// crash output.
//
// The value's Error() method may be async (a transpiled Go method that
// awaits), so the constructor renders what it can synchronously and replaces
// the message as soon as the microtask queue delivers the resolved text.
// Observers that read .message after an await boundary see the final text.
export class GoPanic extends Error {
  recovered = false

  constructor(public readonly value: unknown) {
    const text = formatPanicValue(value)
    super(typeof text === 'string' ? `panic: ${text}` : 'panic:')
    if (typeof text !== 'string') {
      void Promise.resolve(text).then((resolved) => {
        ;(this as { message: string }).message = `panic: ${resolved}`
      })
    }
  }
}

// activeRecoverPanic is set only while a defer stack is disposing the exact
// GoPanic caught by that frame; recover() outside that dynamic scope returns
// nil, so unrelated async panics cannot be recovered by another task. No other
// runtime state refers to a GoPanic, so a panic that JavaScript code catches
// without a Go recover is collected with everything its stack trace retains.
let activeRecoverPanic: GoPanic | null = null

export function withRecoveringPanic<T>(err: unknown, fn: () => T): T {
  const previous = activeRecoverPanic
  activeRecoverPanic = err instanceof GoPanic ? err : null
  try {
    return fn()
  } finally {
    activeRecoverPanic = previous
  }
}

// RuntimeError is the value carried by a panic from a Go runtime fault: index
// out of range, slice bounds out of range, integer divide by zero, or nil
// pointer dereference. It implements the Go error interface (Error()), so a
// recovered runtime panic exposes the same shape as Go's runtime.Error.
export class RuntimeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RuntimeError'
  }

  Error(): string {
    return this.message
  }
}

/**
 * panic Implementation of Go's built-in panic function.
 * @param args Arguments passed to panic
 */
export function panic(...args: unknown[]): never {
  const value = args.length === 1 ? args[0] : args
  throw new GoPanic(value)
}

// notImplemented panics for a Go export that its override package does not
// implement. The compiler declares each such export as a stub that calls it,
// so a program that refers to one loads, and fails only when it calls it.
export function notImplemented(name: string): never {
  panic(`goscript: ${name} is not implemented`)
}

// runtimePanic raises a Go runtime panic carrying a RuntimeError with the given
// Go-formatted message (for example "runtime error: index out of range [5] with
// length 3"). Every runtime fault routes through here so recover() observes a
// GoPanic whose value is a runtime.Error, matching Go.
export function runtimePanic(message: string): never {
  throw new GoPanic(new RuntimeError(message))
}

export function panicValue(value: unknown): unknown {
  if (value instanceof GoPanic) {
    return value.value
  }
  return value
}

// panicMessage formats a thrown value as Go reports an unrecovered panic. A
// JavaScript error reports its message, not its empty field list.
export async function panicMessage(err: unknown): Promise<string> {
  const value = err instanceof GoPanic ? err.value : err
  return 'panic: ' + (await formatPanicValue(value))
}

function formatPanicValue(value: unknown): string | PromiseLike<string> {
  if (isThenableText(value)) {
    return value
  }
  if (value instanceof Error) {
    return value.message
  }
  if (
    value !== null &&
    typeof value === 'object' &&
    'Error' in value &&
    typeof (value as { Error?: unknown }).Error === 'function'
  ) {
    return (value as { Error(): string | PromiseLike<string> }).Error()
  }
  return String(value)
}

function isThenableText(value: unknown): value is PromiseLike<string> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as { then?: unknown }).then === 'function'
  )
}

// recover stops the panic currently unwinding this defer stack and returns its
// value. It returns nil when no defer stack is unwinding a panic, so unrelated
// async panics cannot be recovered by a normal-return defer in another task.
export function recover(): any {
  const goPanic = activeRecoverPanic
  if (goPanic === null || goPanic.recovered) {
    return null
  }
  goPanic.recovered = true
  return goPanic.value
}

// recovered reports whether err is a GoPanic that a deferred recover() consumed.
// The catch block generated for a
// defer+recover function calls this: true means swallow the panic and return the
// function's named results; false means rethrow so an outer frame can recover or
// the program crashes with the Go panic message.
export function recovered(err: unknown): boolean {
  return err instanceof GoPanic && err.recovered
}

// MaybePromise is the result of a Go function value, which suspends by
// returning a promise.
export type MaybePromise<T> = T | globalThis.Promise<T>

// CallbackResult is a result of type V settled the way a callback result of
// type R is: a promise when R is one, so a synchronous callback keeps its
// caller synchronous.
export type CallbackResult<R, V> =
  R extends globalThis.Promise<unknown> ? globalThis.Promise<V> : V

// CallbackRun is a function body returning V that yields each callback
// result and receives it back settled.
export type CallbackRun<V> = Generator<unknown, V, any>

// awaitedResult types a promise as its result, for an override whose Go
// signature is synchronous but which suspends in a program the compiler
// awaits it in, per its asyncMethods or asyncWhenMethods metadata.
export function awaitedResult<T>(promise: globalThis.Promise<T>): T {
  return promise as T
}

/**
 * runCallbacks drives run, handing each yielded result of callbacks returning
 * R back. It stays synchronous while the callbacks do and continues
 * asynchronously from the first promise, so it returns a promise only when a
 * callback returned one.
 */
export function runCallbacks<R, V>(run: CallbackRun<V>): CallbackResult<R, V> {
  let step = run.next()
  while (!step.done) {
    if (step.value instanceof Promise) {
      return finishCallbacks(run, step.value) as CallbackResult<R, V>
    }
    step = run.next(step.value)
  }
  return step.value as CallbackResult<R, V>
}

// finishCallbacks drives run from a pending callback result to its end.
async function finishCallbacks<V>(
  run: CallbackRun<V>,
  pending: globalThis.Promise<unknown>,
): globalThis.Promise<V> {
  let step = run.next(await pending)
  while (!step.done) {
    step = run.next(await step.value)
  }
  return step.value
}

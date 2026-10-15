// TypeScript implementation of Go's iter package
// This provides iterator types and functions

import * as $ from '@goscript/builtin/index.js'

export type YieldResult = boolean | globalThis.Promise<boolean>

// Seq is an iterator over sequences of individual values.
export type Seq<V> = (
  _yield: ((value: V) => YieldResult) | null,
) => void | globalThis.Promise<void>

// Seq2 is an iterator over sequences of pairs of values.
export type Seq2<K, V> = (
  _yield: ((key: K, value: V) => YieldResult) | null,
) => void | globalThis.Promise<void>

// PullSeq is a sequence that yields the values of T at a time.
type PullSeq<T extends unknown[]> = (
  _yield: ((...values: T) => YieldResult) | null,
) => void | globalThis.Promise<void>

// PullWaiter is a next or stop call waiting for the sequence to yield values
// or to return (null), or for the panic it raised.
interface PullWaiter<T> {
  resolve: (values: T | null) => void
  reject: (err: unknown) => void
}

// PullCoroutine runs a push iterator as a coroutine, as Go's iter.Pull does.
//
// The sequence runs only while a next or stop call waits for it. Its yield
// callback hands the values to the waiting next call and suspends the
// sequence until the following call resumes it, with true for next and false
// for stop. So the sequence never runs ahead, which an infinite sequence
// needs, and stop returns after the sequence and its defers finish.
//
// next and stop return promises, and yield returns one while the sequence is
// suspended. Override metadata (suspendingValues in meta.json) makes the
// compiler await calls through these values, including the yield calls in
// the bodies of the sequences passed to Pull.
class PullCoroutine<T extends unknown[]> {
  // done is set once the sequence returned or panicked, or stop was called.
  private done = false
  // started is set once the sequence was called.
  private started = false
  // yieldNext is set while a next call waits for values.
  private yieldNext = false
  // waiter is the next or stop call waiting for the sequence.
  private waiter: PullWaiter<T> | null = null
  // resume continues the sequence suspended in yield.
  private resume: ((more: boolean) => void) | null = null
  // failure holds a panic of the sequence that no call waited for.
  private failure: { err: unknown } | null = null

  constructor(private readonly seq: PullSeq<T> | null) {}

  // yield hands values to the waiting next call and suspends the sequence
  // until the following call of next or stop.
  readonly yield = (...values: T): YieldResult => {
    // A yield after stop reports the end; one without a waiting next panics.
    if (this.done) {
      return false
    }
    if (!this.yieldNext) {
      $.panic('iter.Pull: yield called again before next')
    }

    // Wake the next call, and suspend until a later call resumes.
    this.yieldNext = false
    const waiter = this.waiter!
    this.waiter = null
    return new Promise<boolean>((resume) => {
      this.resume = resume
      waiter.resolve(values)
    })
  }

  // next returns the following values of the sequence, or null at its end.
  async next(): Promise<T | null> {
    // An ended sequence returns nothing more.
    if (this.done) {
      this.throwFailure()
      return null
    }
    if (this.yieldNext) {
      $.panic('iter.Pull: next called again before yield')
    }

    // Run the sequence until it yields or returns.
    this.yieldNext = true
    return this.switchTo(true)
  }

  // stop ends the iteration: a suspended yield returns false, and the
  // sequence runs to its end. A sequence never started is not called.
  async stop(): Promise<void> {
    if (this.done) {
      this.throwFailure()
      return
    }
    this.done = true
    if (this.started) {
      await this.switchTo(false)
    }
  }

  // switchTo resumes the suspended sequence with more, or starts it, and
  // returns what it yields next.
  private switchTo(more: boolean): Promise<T | null> {
    // The caller waits for the sequence.
    const result = new Promise<T | null>((resolve, reject) => {
      this.waiter = { resolve, reject }
    })

    // The sequence continues from its yield, or from its start.
    const resume = this.resume
    this.resume = null
    if (resume) {
      resume(more)
    } else {
      this.start()
    }
    return result
  }

  // start calls the sequence, which finishes when its result settles.
  private start(): void {
    // Calling a nil sequence panics as calling a nil func does.
    this.started = true
    let result: void | globalThis.Promise<void>
    try {
      if (this.seq === null) {
        $.runtimePanic(
          'runtime error: invalid memory address or nil pointer dereference',
        )
      }
      result = this.seq(this.yield)
    } catch (err) {
      this.finish(err, true)
      return
    }

    // An async sequence finishes when its promise settles.
    if (result instanceof Promise) {
      result.then(
        () => this.finish(null, false),
        (err: unknown) => this.finish(err, true),
      )
      return
    }
    this.finish(null, false)
  }

  // finish ends the iteration and passes the end, or the panic, to the
  // waiting call. A panic no call waits for is raised by the next call.
  private finish(err: unknown, failed: boolean): void {
    // Later calls see the end.
    this.done = true
    this.yieldNext = false
    const waiter = this.waiter
    this.waiter = null

    // The waiting call returns or panics.
    if (!failed) {
      waiter?.resolve(null)
    } else if (waiter) {
      waiter.reject(err)
    } else {
      this.failure = { err }
    }
  }

  // throwFailure raises a panic of the sequence that no call waited for.
  private throwFailure(): void {
    const failure = this.failure
    this.failure = null
    if (failure) {
      throw failure.err
    }
  }
}

// pullArgs splits the arguments of Pull and Pull2: the compiler passes the
// descriptor of the type arguments before the sequence (typeArgFunctions in
// meta.json), but a call through a function value passes only the sequence.
function pullArgs<S>(args: unknown[]): [$.GenericTypeArgs | undefined, S] {
  if (args.length > 1) {
    return [args[0] as $.GenericTypeArgs | undefined, args[1] as S]
  }
  return [undefined, args[0] as S]
}

// Pull converts the push-style iterator sequence seq into a pull-style
// iterator accessed by the two functions next and stop.
//
// next returns the next value in the sequence and true, or the zero value of V
// and false at the end of the sequence or after stop. stop ends the
// iteration; seq's yield then returns false, and stop returns once seq
// returned. A panic in seq propagates to the caller of next or stop. Calls of
// next and stop must not be concurrent.
export function Pull<V>(
  typeArgs: $.GenericTypeArgs | undefined,
  seq: Seq<V> | null,
): [() => globalThis.Promise<[V, boolean]>, () => globalThis.Promise<void>]
export function Pull<V>(
  seq: Seq<V> | null,
): [() => globalThis.Promise<[V, boolean]>, () => globalThis.Promise<void>]
export function Pull<V>(
  ...args: unknown[]
): [() => globalThis.Promise<[V, boolean]>, () => globalThis.Promise<void>] {
  // The sequence runs as a coroutine of single values.
  const [typeArgs, seq] = pullArgs<Seq<V> | null>(args)
  const co = new PullCoroutine<[V]>(seq)

  // next returns a value with true, or the zero value with false.
  const next = async (): globalThis.Promise<[V, boolean]> => {
    const values = await co.next()
    if (values === null) {
      return [$.genericZero(typeArgs, 'V', null as V), false]
    }
    return [values[0], true]
  }
  return [next, () => co.stop()]
}

// Pull2 converts the push-style iterator sequence seq into a pull-style
// iterator accessed by the two functions next and stop, as Pull does for
// sequences of pairs.
export function Pull2<K, V>(
  typeArgs: $.GenericTypeArgs | undefined,
  seq: Seq2<K, V> | null,
): [() => globalThis.Promise<[K, V, boolean]>, () => globalThis.Promise<void>]
export function Pull2<K, V>(
  seq: Seq2<K, V> | null,
): [() => globalThis.Promise<[K, V, boolean]>, () => globalThis.Promise<void>]
export function Pull2<K, V>(
  ...args: unknown[]
): [() => globalThis.Promise<[K, V, boolean]>, () => globalThis.Promise<void>] {
  // The sequence runs as a coroutine of pairs.
  const [typeArgs, seq] = pullArgs<Seq2<K, V> | null>(args)
  const co = new PullCoroutine<[K, V]>(seq)

  // next returns a pair with true, or the zero values with false.
  const next = async (): globalThis.Promise<[K, V, boolean]> => {
    const values = await co.next()
    if (values === null) {
      const key = $.genericZero(typeArgs, 'K', null as K)
      return [key, $.genericZero(typeArgs, 'V', null as V), false]
    }
    return [values[0], values[1], true]
  }
  return [next, () => co.stop()]
}

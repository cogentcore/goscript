import { describe, expect, it } from 'vitest'

import { callOverrideMethod, int64Div, pointerValue } from './builtin.js'
import { varRef } from './varRef.js'
import {
  GoPanic,
  notImplemented,
  RuntimeError,
  panic,
  panicValue,
  recover,
  recovered,
  runtimePanic,
} from './panic.js'
import { makeChannel } from './channel.js'
import { mapSet } from './map.js'
import { goSlice, index, makeSlice } from './slice.js'
import { DisposableStack } from './defer.js'


// captureThrow returns whatever value the callback throws, or undefined if it
// did not throw. Go panics surface as a thrown GoPanic in the transpiled
// runtime, so tests assert on the caught value's shape. Catching here models a
// program-exit boundary that fully consumes the panic, so it drains the in-flight
// stack to keep cases independent.
function captureThrow(fn: () => unknown): unknown {
  try {
    fn()
  } catch (e) {
    if (e instanceof GoPanic) {
      e.recovered = true
      recovered(e)
    }
    return e
  }
  return undefined
}

describe('runtime panics route through GoPanic', () => {
  it('runtimePanic throws a GoPanic carrying a RuntimeError', () => {
    const caught = captureThrow(() => runtimePanic('runtime error: boom'))

    expect(caught).toBeInstanceOf(GoPanic)
    const value = (caught as GoPanic).value
    expect(value).toBeInstanceOf(RuntimeError)
    // The recovered value implements the Go error interface.
    expect((value as RuntimeError).Error()).toBe('runtime error: boom')
    // The unrecovered crash text matches Go's "panic: <value>" shape.
    expect((caught as GoPanic).message).toBe('panic: runtime error: boom')
  })

  it('integer divide by zero panics with the Go message', () => {
    const caught = captureThrow(() => int64Div(1n, 0n))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'runtime error: integer divide by zero',
    )
  })

  it('nil pointer dereference panics with the Go message', () => {
    const caught = captureThrow(() => pointerValue(null))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'runtime error: invalid memory address or nil pointer dereference',
    )
  })

  it('index out of range panics with the Go message', () => {
    const caught = captureThrow(() => index(new Uint8Array([1, 2, 3]), 5))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'runtime error: index out of range [5] with length 3',
    )
  })

  it('slice bounds out of range panics with the Go message', () => {
    const caught = captureThrow(() => goSlice([1, 2, 3], 2, 1))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'runtime error: slice bounds out of range [2:1]',
    )
  })

  it('makeslice with negative capacity panics with the Go message', () => {
    const caught = captureThrow(() => makeSlice<number>(1, -1))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'runtime error: makeslice: cap out of range',
    )
  })

  it('makechan with negative size panics with the Go message', () => {
    const caught = captureThrow(() => makeChannel(-1, 0, 'both'))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'makechan: size out of range',
    )
  })

  it('assignment to a nil map panics with the Go message', () => {
    const caught = captureThrow(() => mapSet(null, 'k', 1))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'assignment to entry in nil map',
    )
  })

  it('close of a closed channel panics with the Go message', () => {
    const ch = makeChannel(0, 0, 'both')
    ch.close()
    const caught = captureThrow(() => ch.close())

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'close of closed channel',
    )
  })

  it('send on a closed channel panics with the Go message', async () => {
    const ch = makeChannel(1, 0, 'both')
    ch.close()
    const caught = await ch.send(1).then(
      () => undefined,
      (e: unknown) => e,
    )

    expect(caught).toBeInstanceOf(GoPanic)
    expect(((caught as GoPanic).value as RuntimeError).Error()).toBe(
      'send on closed channel',
    )
    recovered(caught as GoPanic)
  })

  it('panic carries an arbitrary value that panicValue unwraps', () => {
    const caught = captureThrow(() => panic('boom'))

    expect(caught).toBeInstanceOf(GoPanic)
    expect(panicValue(caught)).toBe('boom')
    // panicValue passes non-panic values through unchanged.
    expect(panicValue('plain')).toBe('plain')
  })
})

describe('recover consumes the in-flight panic', () => {
  // runWithRecover mirrors the code generated for a Go func that defers a
  // function calling recover(): the deferreds run during stack unwinding (here,
  // directly in the catch before recovered() is consulted), then recovered()
  // decides whether the panic is swallowed or rethrown.
  function runWithRecover(
    body: () => void,
    deferred: () => void,
  ): { rethrew: unknown; finished: boolean } {
    const stack = new DisposableStack()
    stack.defer(deferred)
    try {
      body()
    } catch (e) {
      stack.disposePanic(e)
      if (!recovered(e)) {
        // This frame is the outermost boundary in the test. In a real program an
        // unrecovered panic propagates to the entrypoint and crashes the
        // process, leaving nothing in flight; drain it here to model that exit
        // so later cases start with an empty stack.
        if (e instanceof GoPanic) {
          e.recovered = true
          recovered(e)
        }
        return { rethrew: e, finished: false }
      }
    }
    return { rethrew: undefined, finished: true }
  }

  it('recover returns the panic value and swallows the panic', () => {
    let seen: unknown = 'unset'
    const outcome = runWithRecover(
      () => panic('boom'),
      () => {
        seen = recover()
      },
    )

    expect(seen).toBe('boom')
    expect(outcome.finished).toBe(true)
    expect(outcome.rethrew).toBeUndefined()
  })

  it('a deferred that does not recover lets the panic propagate', () => {
    const outcome = runWithRecover(
      () => panic('boom'),
      () => {
        // no recover() call
      },
    )

    expect(outcome.finished).toBe(false)
    expect(outcome.rethrew).toBeInstanceOf(GoPanic)
    expect((outcome.rethrew as GoPanic).value).toBe('boom')
  })

  it('recover returns nil when no panic is in flight', () => {
    expect(recover()).toBeNull()
  })

  it('recover returns nil a second time within the same panic', () => {
    let first: unknown = 'unset'
    let second: unknown = 'unset'
    runWithRecover(
      () => panic('once'),
      () => {
        first = recover()
        second = recover()
      },
    )

    expect(first).toBe('once')
    expect(second).toBeNull()
  })

  it('recovers a runtime fault as its RuntimeError value', () => {
    let seen: unknown = 'unset'
    runWithRecover(
      () => int64Div(1n, 0n),
      () => {
        seen = recover()
      },
    )

    expect(seen).toBeInstanceOf(RuntimeError)
    expect((seen as RuntimeError).Error()).toBe(
      'runtime error: integer divide by zero',
    )
  })

  it('normal defer disposal cannot recover an unrelated panic', () => {
    let seen: unknown = 'unset'
    try {
      panic('other task')
    } catch (e) {
      const stack = new DisposableStack()
      stack.defer(() => {
        seen = recover()
      })
      stack.dispose()
      if (e instanceof GoPanic) {
        e.recovered = true
        recovered(e)
      }
    }

    expect(seen).toBeNull()
  })

  it('panic defer disposal recovers while unwinding', () => {
    let seen: unknown = 'unset'
    const stack = new DisposableStack()
    stack.defer(() => {
      seen = recover()
    })

    try {
      panic('boom')
    } catch (e) {
      stack.disposePanic(e)
      expect(recovered(e)).toBe(true)
    }

    expect(seen).toBe('boom')
    expect(recover()).toBeNull()
  })
})

describe('override stubs', () => {
  it('panics with the name of a Go export that is not implemented', () => {
    const err = captureThrow(() => notImplemented('runtime.MemProfile'))

    expect(err).toBeInstanceOf(GoPanic)
    expect((err as GoPanic).value).toBe(
      'goscript: runtime.MemProfile is not implemented',
    )
  })

  it('calls the method of an override class value or reference', () => {
    class Case {
      constructor(private readonly suffix: string) {}
      Upper(s: string): string {
        return s.toUpperCase() + this.suffix
      }
    }
    const value = new Case('!')

    expect(callOverrideMethod(value, 'Upper', 'lib.Case.Upper', ['a'])).toBe(
      'A!',
    )
    expect(
      callOverrideMethod(varRef(value), 'Upper', 'lib.Case.Upper', ['b']),
    ).toBe('B!')
    const err = captureThrow(() =>
      callOverrideMethod(value, 'lower', 'lib.Case.lower', []),
    )
    expect((err as GoPanic).value).toBe(
      'goscript: lib.Case.lower is not implemented',
    )
  })
})

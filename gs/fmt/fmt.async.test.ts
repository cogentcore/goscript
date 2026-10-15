import { describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'
import * as fmt from './fmt.js'
import { Sprint, Sprintf } from './fmt.js'

// asyncError returns an error whose Error() transpiles from a Go method that
// awaits, so calling it yields a Promise.
function asyncError(message: string): $.GoError {
  return {
    Error: async () => message,
  } as unknown as $.GoError
}

function syncError(message: string): $.GoError {
  return $.newError(message)
}

describe('fmt with async Error operands', () => {
  it('Sprintf renders the resolved Error text for %v', async () => {
    expect(await Sprintf('%v', asyncError('boom'))).toBe('boom')
  })

  it('Sprint renders the resolved Error text', async () => {
    expect(await Sprint('prefix-', asyncError('boom'))).toBe('prefix-boom')
  })

  it('Sprintf returns synchronous Error operands as a plain string', () => {
    // The compiler calls Sprintf without await in a program whose Error,
    // String, Format and GoString methods are all sync, so a sync operand
    // must render without a Promise.
    expect(Sprintf('%v', syncError('sync boom'))).toBe('sync boom')
    expect(Sprint('a', 1, 2, 'b')).toBe('a1 2b')
    expect(fmt.Sprintln('x', 3)).toBe('x 3\n')
    expect(
      $.bytesToString(fmt.Appendf($.stringToBytes('n='), '%d', 4) as $.Bytes),
    ).toBe('n=4')
  })

  it('print functions return a Promise only for an async operand', async () => {
    const pending = Sprintf('%v and %v', syncError('a'), asyncError('b'))
    expect(pending).toBeInstanceOf(Promise)
    expect(await pending).toBe('a and b')
    expect(await fmt.Sprintln(asyncError('c'))).toBe('c\n')
  })

  it('Sprintf renders an async Error operand through %w formatting', async () => {
    expect(await Sprintf('%w', asyncError('root'))).toBe('root')
  })

  it('Errorf returns synchronously and resolves async operand text lazily', async () => {
    const err = fmt.Errorf('wrap: %v', asyncError('lazy root'))

    // Go's Errorf returns the error immediately; the returned value is not a
    // Promise even when an operand renders asynchronously.
    expect(typeof err.then).not.toBe('function')

    // Callers awaiting Error() get the fully rendered text.
    expect(await err!.Error()).toBe('wrap: lazy root')
    // The rendered error is distinct per call and unwraps nothing here.
    expect((err as any).Unwrap).toBeUndefined()
  })

  it('Errorf of synchronous operands yields synchronous Error text', () => {
    const err = fmt.Errorf('code %d: %s', 7, 'plain')

    const text = err!.Error()
    expect(typeof text).toBe('string')
    expect(text as string).toBe('code 7: plain')
  })
})

import * as $ from '@goscript/builtin/index.js'
import * as testing from '@goscript/testing/index.js'

// A bubble needs a scheduler that knows when every goroutine in it is durably
// blocked, both for Wait and to advance the bubble's fake clock. Goroutines
// run as JavaScript tasks with no such scheduler, so Test skips its test
// rather than run it on the real clock.

// Test skips t: goscript cannot run f in a bubble.
export function Test(
  t: testing.T | $.VarRef<testing.T> | null,
  _f: testing.TestFunc | null,
): void {
  $.pointerValue(t).Skip(
    'testing/synctest: goscript has no goroutine scheduler to run a bubble',
  )
}

// Wait panics: no goroutine runs in a bubble under goscript.
export function Wait(): void {
  $.panic('goroutine is not in a bubble')
}

export * from './stubs.gs.js'

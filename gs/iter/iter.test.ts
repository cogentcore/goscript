import { describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'

import { Pull, Pull2, type Seq, type YieldResult } from './index.js'

// typeArgs is the descriptor the compiler passes to Pull for V = int.
const typeArgs: $.GenericTypeArgs = {
  [$.genericTypeArgsMarker]: $.genericTypeArgsBrand,
  V: { type: 'int', zero: () => 0 },
}

// awaitYield awaits a yield result as compiled code does.
async function awaitYield(result: YieldResult): Promise<boolean> {
  return result instanceof Promise ? await result : result
}

// counter returns a compiled-style sequence of 0 through n-1 that records
// each step in log.
function counter(n: number, log: string[]): Seq<number> {
  return async (yieldFn) => {
    try {
      for (let i = 0; i < n; i++) {
        log.push(`yield ${i}`)
        if (!(await awaitYield(yieldFn!(i)))) {
          log.push('stopped')
          return
        }
      }
    } finally {
      log.push('defer')
    }
  }
}

describe('iter.Pull', () => {
  it('returns each value, then the zero value and false', async () => {
    const [next, stop] = Pull(typeArgs, counter(2, []))
    expect(await next()).toEqual([0, true])
    expect(await next()).toEqual([1, true])
    expect(await next()).toEqual([0, false])
    expect(await next()).toEqual([0, false])
    await stop()
    expect(await next()).toEqual([0, false])
  })

  it('runs the sequence only as far as next asks', async () => {
    const log: string[] = []
    const [next, stop] = Pull(typeArgs, counter(5, log))
    expect(log).toEqual([])
    await next()
    expect(log).toEqual(['yield 0'])
    await next()
    expect(log).toEqual(['yield 0', 'yield 1'])
    await stop()
    expect(log).toEqual(['yield 0', 'yield 1', 'stopped', 'defer'])
  })

  it('does not call a sequence stopped before the first next', async () => {
    const log: string[] = []
    const [next, stop] = Pull(typeArgs, counter(5, log))
    await stop()
    expect(await next()).toEqual([0, false])
    expect(log).toEqual([])
  })

  it('pulls from an endless sequence', async () => {
    const [next, stop] = Pull<number>(async (yieldFn) => {
      for (let i = 0; ; i++) {
        if (!(await awaitYield(yieldFn!(i)))) {
          return
        }
      }
    })
    const values: number[] = []
    for (let i = 0; i < 4; i++) {
      values.push((await next())[0])
    }
    await stop()
    expect(values).toEqual([0, 1, 2, 3])
  })

  it('propagates a panic of the sequence to next and then ends', async () => {
    const [next] = Pull<number>(typeArgs, async (yieldFn) => {
      await awaitYield(yieldFn!(1))
      $.panic('seq failed')
    })
    expect(await next()).toEqual([1, true])
    await expect(next()).rejects.toMatchObject({ value: 'seq failed' })
    expect(await next()).toEqual([0, false])
  })

  it('propagates a panic during stop to stop', async () => {
    const [next, stop] = Pull<number>(async (yieldFn) => {
      await awaitYield(yieldFn!(1))
      $.panic('cleanup failed')
    })
    await next()
    await expect(stop()).rejects.toMatchObject({ value: 'cleanup failed' })
    await stop()
  })

  it('panics on next of a nil sequence', async () => {
    const [next] = Pull<number>(typeArgs, null)
    await expect(next()).rejects.toBeInstanceOf($.GoPanic)
    expect(await next()).toEqual([0, false])
  })

  it('reports a sequence that yields without awaiting', async () => {
    const [next] = Pull<number>((yieldFn) => {
      yieldFn!(1)
      yieldFn!(2)
    })
    expect(await next()).toEqual([1, true])
    await expect(next()).rejects.toMatchObject({
      value: 'iter.Pull: yield called again before next',
    })
  })

  it('runs a synchronous sequence that ends without yielding', async () => {
    const [next] = Pull<number>(typeArgs, () => {})
    expect(await next()).toEqual([0, false])
  })
})

describe('iter.Pull2', () => {
  it('returns pairs, then zero values and false', async () => {
    const pairArgs: $.GenericTypeArgs = {
      [$.genericTypeArgsMarker]: $.genericTypeArgsBrand,
      K: { type: 'string', zero: () => '' },
      V: { type: 'int', zero: () => 0 },
    }
    const [next, stop] = Pull2<string, number>(pairArgs, async (yieldFn) => {
      for (const [k, v] of [
        ['a', 1],
        ['b', 2],
      ] as const) {
        if (!(await awaitYield(yieldFn!(k, v)))) {
          return
        }
      }
    })
    expect(await next()).toEqual(['a', 1, true])
    expect(await next()).toEqual(['b', 2, true])
    expect(await next()).toEqual(['', 0, false])
    await stop()
  })
})

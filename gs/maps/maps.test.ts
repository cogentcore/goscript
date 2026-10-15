import { describe, expect, it } from 'vitest'

import {
  Clone,
  Collect,
  DeleteFunc,
  Equal,
  EqualFunc,
  Insert,
  Values,
} from './index.js'

describe('maps overrides', () => {
  it('accept nilable comparable keys', () => {
    const source = new Map<object | null, number>()
    const key = { name: 'type' }
    source.set(null, 1)
    source.set(key, 2)

    const cloned = Clone(source)
    expect(cloned?.get(null)).toBe(1)
    expect(cloned?.get(key)).toBe(2)

    const values: number[] = []
    Values(cloned)((value) => {
      values.push(value)
      return true
    })
    expect(values.sort()).toEqual([1, 2])
  })

  it('treat a nil map as empty', () => {
    DeleteFunc<string, number>(null, () => true)
    expect(Equal<string, number>(null, new Map())).toBe(true)
    expect(EqualFunc<string, number, number>(null, null, () => false)).toBe(
      true,
    )
    expect(Equal<string, number>(null, new Map([['a', 1]]))).toBe(false)
  })
})

describe('maps collectors of async sequences', () => {
  // pairsAsync yields a and b and waits for each yield, as a sequence that
  // iter.Pull2 also pulls does.
  const pairsAsync = async (
    yieldPair:
      | ((key: string, value: number) => boolean | Promise<boolean>)
      | null,
  ) => {
    for (const [key, value] of [
      ['a', 1],
      ['b', 2],
    ] as const) {
      const more = yieldPair!(key, value)
      if (!(more instanceof Promise ? await more : more)) {
        return
      }
    }
  }

  it('wait for the sequence in Collect and Insert', async () => {
    const collected = Collect(pairsAsync)
    expect(collected).toBeInstanceOf(Promise)
    const m = await collected
    expect(Array.from(m.entries())).toEqual([
      ['a', 1],
      ['b', 2],
    ])
    const target = new Map<string, number>([['c', 3]])
    await Insert(target, pairsAsync)
    expect(target.size).toBe(3)
  })
})

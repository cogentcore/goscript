import { describe, expect, it } from 'vitest'

import { goFunc, goFunctionName, namedFunction } from './type.js'

describe('Go function names', () => {
  it('keeps the recorded Go name through a typed function wrapper', () => {
    function SettingsWindow(): void {}
    const fn = goFunc(SettingsWindow, 'example.com/core.SettingsWindow')
    const typed = namedFunction(fn, 'example.com/core.Handler')

    expect(typed).not.toBe(fn)
    expect(goFunctionName(typed)).toBe('example.com/core.SettingsWindow')
  })

  it('falls back to the JavaScript name without the bound prefix', () => {
    function helper(): void {}
    expect(goFunctionName(helper.bind(null).bind(null))).toBe('helper')
    expect(goFunctionName(42)).toBe('')
  })
})

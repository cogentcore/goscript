import { afterEach, describe, expect, it, vi } from 'vitest'

import { Clearenv, Environ, Getenv, Setenv, Unsetenv } from './env.js'

describe('syscall env without a host environment', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('keeps the environment in memory', () => {
    vi.stubGlobal('process', undefined)

    expect(Setenv('HOME', '/home/me')).toBeNull()
    expect(Getenv('HOME')).toEqual(['/home/me', true])
    expect(Environ()).toContain('HOME=/home/me')

    expect(Unsetenv('HOME')).toBeNull()
    expect(Getenv('HOME')).toEqual(['', false])

    Setenv('A', '1')
    Clearenv()
    expect(Getenv('A')).toEqual(['', false])
  })
})

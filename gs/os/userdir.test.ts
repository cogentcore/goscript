import { describe, expect, it } from 'vitest'

import { Setenv, Unsetenv } from './env.gs.js'
import {
  TempDir,
  UserCacheDir,
  UserConfigDir,
  UserHomeDir,
} from './file_constants_js.gs.js'

describe('os user directories', () => {
  it('use HOME and TMPDIR from Setenv when the environment is kept in memory', () => {
    const originalProcess = (globalThis as { process?: unknown }).process
    try {
      // With no process, as in a browser, the environment is kept in memory.
      ;(globalThis as { process?: unknown }).process = undefined
      expect(Setenv('HOME', '/home/me')).toBeNull()
      expect(Setenv('TMPDIR', '/home/me/tmp')).toBeNull()

      expect(UserHomeDir()).toEqual(['/home/me', null])
      expect(UserCacheDir()).toEqual(['/home/me/.cache', null])
      expect(UserConfigDir()).toEqual(['/home/me/.config', null])
      expect(TempDir()).toBe('/home/me/tmp')
      expect(Unsetenv('HOME')).toBeNull()
      expect(Unsetenv('TMPDIR')).toBeNull()
    } finally {
      ;(globalThis as { process?: unknown }).process = originalProcess
    }
  })
})

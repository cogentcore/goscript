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
      // The empty XDG variables hide the host's, so the directories derive
      // from HOME.
      ;(globalThis as { process?: unknown }).process = undefined
      const env = {
        HOME: '/home/me',
        TMPDIR: '/home/me/tmp',
        XDG_CACHE_HOME: '',
        XDG_CONFIG_HOME: '',
      }
      for (const [key, value] of Object.entries(env)) {
        expect(Setenv(key, value)).toBeNull()
      }

      expect(UserHomeDir()).toEqual(['/home/me', null])
      expect(UserCacheDir()).toEqual(['/home/me/.cache', null])
      expect(UserConfigDir()).toEqual(['/home/me/.config', null])
      expect(TempDir()).toBe('/home/me/tmp')
      for (const key of Object.keys(env)) {
        expect(Unsetenv(key)).toBeNull()
      }
    } finally {
      ;(globalThis as { process?: unknown }).process = originalProcess
    }
  })
})

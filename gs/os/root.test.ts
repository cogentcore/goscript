import {
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'
import * as time from '@goscript/time/index.js'

import { ErrInvalid } from './error.gs.js'
import { OpenRoot } from './root_js.gs.js'

const tempRoots: string[] = []

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true })
  }
})

function makeTempRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'goscript-os-root-'))
  tempRoots.push(root)
  return root
}

describe('os.Root path operations', () => {
  it('changes file times inside the root', async () => {
    const dir = makeTempRoot()
    writeFileSync(join(dir, 'a.txt'), 'a')
    const [root, openErr] = await OpenRoot(dir)
    expect(openErr).toBeNull()

    const mtime = time.Unix(1577934245n, 0n)
    expect(await root!.Chtimes('a.txt', mtime, mtime)).toBeNull()
    expect(statSync(join(dir, 'a.txt')).mtime.getTime()).toBe(1577934245000)

    // A zero time leaves that file time unchanged.
    const atime = time.Unix(1609470245n, 0n)
    expect(await root!.Chtimes('a.txt', atime, new time.Time())).toBeNull()
    const st = statSync(join(dir, 'a.txt'))
    expect(st.atime.getTime()).toBe(1609470245000)
    expect(st.mtime.getTime()).toBe(1577934245000)
  })

  it('writes, renames and reads files inside the root', async () => {
    const dir = makeTempRoot()
    const [root] = await OpenRoot(dir)

    expect(await root!.MkdirAll('x/y', 0o755)).toBeNull()
    expect(
      await root!.WriteFile('x/y/a.txt', $.stringToBytes('hello'), 0o644),
    ).toBeNull()
    expect(await root!.Rename('x/y/a.txt', 'x/b.txt')).toBeNull()
    expect(readFileSync(join(dir, 'x/b.txt'), 'utf8')).toBe('hello')
    const [data, readErr] = await root!.ReadFile('x/b.txt')
    expect(readErr).toBeNull()
    expect($.bytesToString(data)).toBe('hello')
    expect(await root!.RemoveAll('x')).toBeNull()
  })

  it('rejects names that leave the root', async () => {
    const [root] = await OpenRoot(makeTempRoot())

    const now = time.Now()
    expect(await root!.Chtimes('../a.txt', now, now)).toBe(ErrInvalid)
    expect(await root!.Rename('a.txt', '/tmp/a.txt')).toBe(ErrInvalid)
  })
})

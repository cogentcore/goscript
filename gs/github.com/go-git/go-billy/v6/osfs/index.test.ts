import * as $ from '@goscript/builtin/index.js'
import * as os from '@goscript/os/index.js'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { FromRoot, New } from './index.js'

const roots: string[] = []

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { force: true, recursive: true })
  }
})

function tempRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'goscript-billy-osfs-'))
  roots.push(root)
  return root
}

describe('go-billy osfs override', () => {
  it('writes through to the host directory used by os.DirFS', async () => {
    const root = tempRoot()
    const fsys = New(root)

    const [file, openErr] = await fsys.OpenFile(
      'README.md',
      os.O_WRONLY | os.O_CREATE | os.O_TRUNC,
      0o666,
    )
    expect(openErr).toBeNull()
    const [n, writeErr] = await file!.Write($.stringToBytes('hello\n'))
    expect(writeErr).toBeNull()
    expect(n).toBe(6)
    expect(await file!.Close()).toBeNull()

    expect(readFileSync(join(root, 'README.md'), 'utf8')).toBe('hello\n')
  })

  it('wraps a caller-managed os.Root', async () => {
    const root = tempRoot()
    const [openedRoot, openErr] = await os.OpenRoot(root)
    expect(openErr).toBeNull()

    const [fsys, fromErr] = FromRoot(openedRoot)
    expect(fromErr).toBeNull()
    const [file, createErr] = await fsys!.Create('from-root.txt')
    expect(createErr).toBeNull()
    const [, writeErr] = await file!.Write($.stringToBytes('from root'))
    expect(writeErr).toBeNull()
    expect(await file!.Close()).toBeNull()
    expect(await openedRoot!.Close()).toBeNull()

    expect(readFileSync(join(root, 'from-root.txt'), 'utf8')).toBe('from root')
  })

  it('rejects a nil os.Root', async () => {
    const [fsys, err] = FromRoot(null)

    expect(fsys).toBeNull()
    expect(err?.Error()).toBe('root must not be nil')
  })

  it('keeps chrooted writes under the child host directory', async () => {
    const root = tempRoot()
    const fsys = New(root)
    const [child, chrootErr] = fsys.Chroot('sub')
    expect(chrootErr).toBeNull()

    const [file, openErr] = await child!.Create('nested/file.txt')
    expect(openErr).toBeNull()
    const [, writeErr] = await file!.Write($.stringToBytes('child'))
    expect(writeErr).toBeNull()
    expect(await file!.Close()).toBeNull()

    expect(readFileSync(join(root, 'sub', 'nested', 'file.txt'), 'utf8')).toBe(
      'child',
    )
  })

  it('rejects parent traversal outside the base directory', async () => {
    const root = tempRoot()
    const fsys = New(root)

    const [file, err] = await fsys.Open('../escape.txt')

    expect(file).toBeNull()
    expect(err).not.toBeNull()
  })

  it('accepts absolute paths inside the base directory', async () => {
    const root = tempRoot()
    const fsys = New(root)
    const absolute = join(root, 'inside.txt')

    const [file, openErr] = await fsys.Create(absolute)
    expect(openErr).toBeNull()
    const [, writeErr] = await file!.Write($.stringToBytes('inside'))
    expect(writeErr).toBeNull()
    expect(await file!.Close()).toBeNull()

    expect(readFileSync(absolute, 'utf8')).toBe('inside')
  })

  it('rejects absolute paths outside the base directory', async () => {
    const root = tempRoot()
    const outside = tempRoot()
    const fsys = New(root)

    const [file, err] = await fsys.Create(join(outside, 'outside.txt'))

    expect(file).toBeNull()
    expect(err).not.toBeNull()
  })

  it('reads host directory entries', async () => {
    const root = tempRoot()
    writeFileSync(join(root, 'one.txt'), 'one')
    writeFileSync(join(root, 'two.txt'), 'two')
    const fsys = New(root)

    const [entries, err] = await fsys.ReadDir('.')

    expect(err).toBeNull()
    expect(
      Array.from(entries ?? [])
        .map((entry) => entry.Name())
        .sort(),
    ).toEqual(['one.txt', 'two.txt'])
  })
})

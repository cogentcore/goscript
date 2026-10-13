import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import * as fs from '@goscript/io/fs/index.js'
import * as io from '@goscript/io/index.js'

import { ReadDir } from './dir.gs.js'
import { Open } from './file_js.gs.js'

const tempRoots: string[] = []

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true })
  }
})

function makeTempRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'goscript-os-readdir-'))
  tempRoots.push(root)
  return root
}

describe('os file directory reads', () => {
  it('reads host directory entries through os.File', () => {
    const root = makeTempRoot()
    writeFileSync(join(root, 'a.txt'), 'a')
    writeFileSync(join(root, 'b.txt'), 'b')

    const [dir, openErr] = Open(root)
    expect(openErr).toBeNull()
    expect(dir).not.toBeNull()
    const [entries, readErr] = dir!.ReadDir(-1)
    expect(readErr).toBeNull()
    expect(entries?.map((entry) => entry!.Name()).sort()).toEqual([
      'a.txt',
      'b.txt',
    ])
    expect(dir!.Close()).toBeNull()
  })

  it('returns EOF after positive-count directory reads are exhausted', () => {
    const root = makeTempRoot()
    writeFileSync(join(root, 'a.txt'), 'a')

    const [dir] = Open(root)
    const [first, firstErr] = dir!.Readdirnames(1)
    expect(firstErr).toBeNull()
    expect(first).toHaveLength(1)

    const [second, secondErr] = dir!.Readdirnames(1)
    expect(second).toBeNull()
    expect(secondErr).toBe(io.EOF)
    expect(dir!.Close()).toBeNull()
  })

  it('reports each entry mode from os.ReadDir', () => {
    const root = makeTempRoot()
    writeFileSync(join(root, 'run'), 'a', { mode: 0o755 })
    symlinkSync('run', join(root, 'link'))

    const [entries, readErr] = ReadDir(root)
    expect(readErr).toBeNull()
    const modes = entries?.map((entry) => {
      const [info, infoErr] = entry!.Info()
      expect(infoErr).toBeNull()
      return [entry!.Name(), info!.Mode()]
    })
    // A symlink's permission bits differ between hosts, so check only its type.
    expect(modes?.[0]?.[0]).toBe('link')
    expect(Number(modes?.[0]?.[1]) & fs.ModeSymlink).not.toBe(0)
    expect(modes?.[1]).toEqual(['run', 0o755])
  })
})

import * as $ from '@goscript/builtin/index.js'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cloneStructValue, markAsStructValue } from '@goscript/builtin/index.js'
import { EOF } from '@goscript/io/index.js'
import { ReadDir, ReadFile, Stat } from '@goscript/io/fs/index.js'

import { FS } from './index.js'

describe('embed.FS', () => {
  it('clones embedded files as Go struct values', () => {
    const original = markAsStructValue(
      new FS(new Map([['config-set.bin', new Uint8Array([1, 2, 3])]])),
    )

    const cloned = cloneStructValue(original)
    const [data, err] = cloned.ReadFile('config-set.bin')

    expect(err).toBeNull()
    expect(Array.from(data)).toEqual([1, 2, 3])
  })

  it('supports io/fs read, stat, and directory APIs', async () => {
    const fsys = markAsStructValue(
      new FS(
        new Map([
          ['config-set.bin', new Uint8Array([1, 2, 3])],
          ['assets/config.json', new Uint8Array([4])],
        ]),
      ),
    )

    const [data, readErr] = await ReadFile(fsys, 'config-set.bin')
    expect(readErr).toBeNull()
    expect(Array.from(data)).toEqual([1, 2, 3])
    $.sliceElems(data)[$.sliceSlot(data, 0)] = 9
    const [dataAgain, readAgainErr] = await ReadFile(fsys, 'config-set.bin')
    expect(readAgainErr).toBeNull()
    expect(Array.from(dataAgain)).toEqual([1, 2, 3])

    const [rootEntries, rootErr] = await ReadDir(fsys, '.')
    expect(rootErr).toBeNull()
    expect(rootEntries!.map((entry) => entry!.Name())).toEqual([
      'assets',
      'config-set.bin',
    ])

    const [assetInfo, statErr] = await Stat(fsys, 'assets')
    expect(statErr).toBeNull()
    expect(assetInfo!.IsDir()).toBe(true)

    const [assetEntries, assetErr] = await ReadDir(fsys, 'assets')
    expect(assetErr).toBeNull()
    expect(assetEntries!.map((entry) => entry!.Name())).toEqual(['config.json'])
  })

  it('supports Open file reads and directory iteration', () => {
    const fsys = markAsStructValue(
      new FS(
        new Map([
          ['config-set.bin', new Uint8Array([1, 2, 3])],
          ['assets/config.json', new Uint8Array([4])],
        ]),
      ),
    )

    const [file, openErr] = fsys.Open('config-set.bin')
    expect(openErr).toBeNull()
    const buffer = new Uint8Array(2)
    const [firstRead, firstErr] = file!.Read(buffer)
    expect(firstErr).toBeNull()
    expect(firstRead).toBe(2)
    expect(Array.from(buffer)).toEqual([1, 2])
    const [secondRead, secondErr] = file!.Read(buffer)
    expect(secondErr).toBeNull()
    expect(secondRead).toBe(1)
    expect(Array.from(buffer)).toEqual([3, 2])
    const [eofRead, eofErr] = file!.Read(buffer)
    expect(eofRead).toBe(0)
    expect(eofErr).toBe(EOF)

    const [dir, dirOpenErr] = fsys.Open('.')
    expect(dirOpenErr).toBeNull()
    const [entries, readDirErr] = dir!.ReadDir(1)
    expect(readDirErr).toBeNull()
    expect(entries!.map((entry) => entry!.Name())).toEqual(['assets'])
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('lists external files and reads them from a file URL', async () => {
    // The external file is read from the host filesystem when it is opened.
    const dir = mkdtempSync(join(tmpdir(), 'embed-'))
    writeFileSync(join(dir, 'big.png'), new Uint8Array([7, 8, 9]))
    const url = pathToFileURL(join(dir, 'big.png')).href
    const fsys = markAsStructValue(
      new FS(new Map([['media/a.txt', new Uint8Array([1])]]), [
        ['media/big.png', 3, url],
      ]),
    )

    // Its name and size are known without reading it.
    const [entries, dirErr] = await ReadDir(fsys, 'media')
    expect(dirErr).toBeNull()
    expect(entries!.map((entry) => entry!.Name())).toEqual(['a.txt', 'big.png'])
    const [info, statErr] = await Stat(fsys, 'media/big.png')
    expect(statErr).toBeNull()
    expect(info!.Size()).toBe(3n)

    const [data, readErr] = await ReadFile(fsys, 'media/big.png')
    expect(readErr).toBeNull()
    expect(Array.from(data)).toEqual([7, 8, 9])
  })

  it('fetches external files once and reports failed fetches', async () => {
    // Each fetch answers with the bytes of its URL, or fails for a missing file.
    const fetch = vi.fn(async (url: string) =>
      url.endsWith('missing.png') ?
        new Response('', { status: 404, statusText: 'Not Found' })
      : new Response(new Uint8Array([5, 6])),
    )
    vi.stubGlobal('fetch', fetch)
    const fsys = markAsStructValue(
      new FS(new Map(), [
        ['big.png', 2, 'https://example.test/@embed/big.png'],
        ['missing.png', 2, 'https://example.test/@embed/missing.png'],
      ]),
    )

    // Opening fetches the file, after which reads are synchronous.
    const [file, openErr] = await fsys.Open('big.png')
    expect(openErr).toBeNull()
    const buffer = new Uint8Array(4)
    expect(file!.Read(buffer)).toEqual([2, null])
    expect(fsys.ReadFile('big.png')).toEqual([new Uint8Array([5, 6]), null])
    expect(cloneStructValue(fsys).ReadFile('big.png')).toEqual([
      new Uint8Array([5, 6]),
      null,
    ])
    expect(fetch).toHaveBeenCalledTimes(1)

    // A failed fetch is a PathError, and the next read fetches again.
    const [, err] = await fsys.ReadFile('missing.png')
    expect(err?.Error()).toBe(
      'read missing.png: embed: loading missing.png: Error: 404 Not Found',
    )
    await fsys.ReadFile('missing.png')
    expect(fetch).toHaveBeenCalledTimes(3)
  })
})

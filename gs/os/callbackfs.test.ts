import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import * as $ from '@goscript/builtin/index.js'
import * as io from '@goscript/io/index.js'

import { callbackFSSetwd } from './callbackfs.js'
import { ReadDir } from './dir.gs.js'
import {
  Chdir,
  Create,
  Mkdir,
  MkdirAll,
  Open,
  OpenFile,
  ReadFile,
  RemoveAll,
  Rename,
  WriteFile,
} from './file_js.gs.js'
import { IsNotExist } from './error.gs.js'
import { O_APPEND, O_WRONLY } from './file_constants_js.gs.js'
import { Remove } from './file_unix_js.gs.js'
import { Getwd } from './getwd_js.gs.js'
import { Stat } from './stat_js.gs.js'
import { resetHostRuntimeForTests } from './types_js.gs.js'

type memNode = { dir: boolean; data: Uint8Array; mode: number; mtimeMs: number }
type callback = (err: unknown, ...results: unknown[]) => void

const constants = {
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  O_CREAT: 0o100,
  O_EXCL: 0o200,
  O_TRUNC: 0o1000,
  O_APPEND: 0o2000,
}

// memCallbackFS returns an in-memory filesystem with the callback API of
// Node.js that Go's js/wasm port uses, completing each call asynchronously.
function memCallbackFS() {
  const nodes = new Map<string, memNode>([
    ['/', { dir: true, data: new Uint8Array(0), mode: 0o755, mtimeMs: 0 }],
  ])
  const fds = new Map<number, string>()
  let nextFD = 10
  const fail = (cb: callback, code: string) =>
    queueMicrotask(() => cb({ message: code, code }))
  const done = (cb: callback, ...results: unknown[]) =>
    queueMicrotask(() => cb(null, ...results))
  const parent = (path: string) => path.slice(0, path.lastIndexOf('/')) || '/'
  const stat = (node: memNode) => ({
    isDirectory: () => node.dir,
    isSymbolicLink: () => false,
    mode: node.mode | (node.dir ? 0o40000 : 0o100000),
    mtimeMs: node.mtimeMs,
    size: node.data.length,
  })
  return {
    nodes,
    fds,
    constants,
    open(path: string, flags: number, mode: number, cb: callback) {
      let node = nodes.get(path)
      if (node && flags & constants.O_CREAT && flags & constants.O_EXCL) {
        return fail(cb, 'EEXIST')
      }
      if (!node) {
        if (!(flags & constants.O_CREAT)) {
          return fail(cb, 'ENOENT')
        }
        if (!nodes.get(parent(path))?.dir) {
          return fail(cb, 'ENOENT')
        }
        node = { dir: false, data: new Uint8Array(0), mode, mtimeMs: 1000 }
        nodes.set(path, node)
      }
      if (flags & constants.O_TRUNC) {
        node.data = new Uint8Array(0)
      }
      const fd = nextFD++
      fds.set(fd, path)
      done(cb, fd)
    },
    close(fd: number, cb: callback) {
      if (!fds.delete(fd)) {
        return fail(cb, 'EBADF')
      }
      done(cb)
    },
    read(
      fd: number,
      buf: Uint8Array,
      offset: number,
      length: number,
      position: number | null,
      cb: callback,
    ) {
      const node = nodes.get(fds.get(fd) ?? '')
      if (!node) {
        return fail(cb, 'EBADF')
      }
      const start = position ?? 0
      const chunk = node.data.subarray(start, start + length)
      buf.set(chunk, offset)
      done(cb, chunk.length, buf)
    },
    write(
      fd: number,
      buf: Uint8Array,
      offset: number,
      length: number,
      position: number | null,
      cb: callback,
    ) {
      const node = nodes.get(fds.get(fd) ?? '')
      if (!node) {
        return fail(cb, 'EBADF')
      }
      const start = position ?? node.data.length
      const end = Math.max(node.data.length, start + length)
      const data = new Uint8Array(end)
      data.set(node.data)
      data.set(buf.subarray(offset, offset + length), start)
      node.data = data
      done(cb, length, buf)
    },
    fstat(fd: number, cb: callback) {
      const node = nodes.get(fds.get(fd) ?? '')
      return node ? done(cb, stat(node)) : fail(cb, 'EBADF')
    },
    stat(path: string, cb: callback) {
      const node = nodes.get(path)
      return node ? done(cb, stat(node)) : fail(cb, 'ENOENT')
    },
    lstat(path: string, cb: callback) {
      const node = nodes.get(path)
      return node ? done(cb, stat(node)) : fail(cb, 'ENOENT')
    },
    mkdir(path: string, mode: number, cb: callback) {
      if (nodes.has(path)) {
        return fail(cb, 'EEXIST')
      }
      if (!nodes.get(parent(path))?.dir) {
        return fail(cb, 'ENOENT')
      }
      nodes.set(path, { dir: true, data: new Uint8Array(0), mode, mtimeMs: 0 })
      done(cb)
    },
    readdir(path: string, cb: callback) {
      if (!nodes.get(path)?.dir) {
        return fail(cb, 'ENOTDIR')
      }
      const prefix = path === '/' ? '/' : path + '/'
      const names = [...nodes.keys()]
        .filter((p) => p !== path && p.startsWith(prefix))
        .map((p) => p.slice(prefix.length))
        .filter((name) => !name.includes('/'))
      done(cb, names)
    },
    unlink(path: string, cb: callback) {
      const node = nodes.get(path)
      if (!node) {
        return fail(cb, 'ENOENT')
      }
      if (node.dir) {
        return fail(cb, 'EISDIR')
      }
      nodes.delete(path)
      done(cb)
    },
    rmdir(path: string, cb: callback) {
      if (!nodes.get(path)?.dir) {
        return fail(cb, 'ENOTDIR')
      }
      nodes.delete(path)
      done(cb)
    },
    rename(from: string, to: string, cb: callback) {
      const node = nodes.get(from)
      if (!node) {
        return fail(cb, 'ENOENT')
      }
      nodes.delete(from)
      nodes.set(to, node)
      done(cb)
    },
  }
}

const originalDeno = (globalThis as any).Deno
const originalProcess = (globalThis as any).process
const originalFS = (globalThis as any).fs
let memFS: ReturnType<typeof memCallbackFS>

beforeEach(() => {
  delete (globalThis as any).Deno
  delete (globalThis as any).process
  memFS = memCallbackFS()
  ;(globalThis as any).fs = memFS
  resetHostRuntimeForTests()
  callbackFSSetwd('/')
})

afterEach(() => {
  if (originalDeno !== undefined) {
    ;(globalThis as any).Deno = originalDeno
  }
  if (originalProcess !== undefined) {
    ;(globalThis as any).process = originalProcess
  }
  if (originalFS === undefined) {
    delete (globalThis as any).fs
  } else {
    ;(globalThis as any).fs = originalFS
  }
  resetHostRuntimeForTests()
})

describe('os on a callback filesystem', () => {
  it('writes, reads and stats files', async () => {
    expect(await MkdirAll('/home/me/docs', 0o755)).toBeNull()
    expect(
      await WriteFile('/home/me/docs/a.txt', $.stringToBytes('hello'), 0o644),
    ).toBeNull()

    const [data, readErr] = await ReadFile('/home/me/docs/a.txt')
    expect(readErr).toBeNull()
    expect($.bytesToString(data)).toBe('hello')

    const [info, statErr] = await Stat('/home/me/docs/a.txt')
    expect(statErr).toBeNull()
    expect(info!.Name()).toBe('a.txt')
    expect(info!.Size()).toBe(5n)
    expect(info!.IsDir()).toBe(false)
    expect(memFS.fds.size).toBe(0)
  })

  it('tracks the file position for reads, writes and seeks', async () => {
    const [f, err] = await Create('/f.txt')
    expect(err).toBeNull()
    expect(await f!.Write($.stringToBytes('abc'))).toEqual([3, null])
    expect(await f!.WriteString('def')).toEqual([3, null])
    expect(await f!.Seek(1n, io.SeekStart)).toEqual([1n, null])

    const buf = new Uint8Array(2)
    expect(await f!.Read(buf)).toEqual([2, null])
    expect($.bytesToString(buf)).toBe('bc')
    expect(await f!.Seek(-1n, io.SeekEnd)).toEqual([5n, null])
    expect(await f!.Read(buf)).toEqual([1, null])
    expect(buf[0]).toBe('f'.charCodeAt(0))
    expect(await f!.Read(buf)).toEqual([0, io.EOF])
    expect(await f!.Close()).toBeNull()
  })

  it('appends with O_APPEND', async () => {
    expect(
      await WriteFile('/log.txt', $.stringToBytes('one\n'), 0o644),
    ).toBeNull()
    const [f, err] = await OpenFile('/log.txt', O_WRONLY | O_APPEND, 0)
    expect(err).toBeNull()
    expect(await f!.Write($.stringToBytes('two\n'))).toEqual([4, null])
    expect(await f!.Close()).toBeNull()

    const [data] = await ReadFile('/log.txt')
    expect($.bytesToString(data)).toBe('one\ntwo\n')
  })

  it('lists, renames and removes directory entries', async () => {
    expect(await Mkdir('/dir', 0o755)).toBeNull()
    expect(await WriteFile('/dir/b', $.stringToBytes('b'), 0o644)).toBeNull()
    expect(await WriteFile('/dir/a', $.stringToBytes('a'), 0o644)).toBeNull()
    expect(await Mkdir('/dir/sub', 0o755)).toBeNull()

    const [entries, err] = await ReadDir('/dir')
    expect(err).toBeNull()
    expect($.asArray(entries).map((e) => e!.Name())).toEqual(['a', 'b', 'sub'])
    expect($.asArray(entries).map((e) => e!.IsDir())).toEqual([
      false,
      false,
      true,
    ])

    const [dir] = await Open('/dir')
    const [names, namesErr] = await dir!.Readdirnames(-1)
    expect(namesErr).toBeNull()
    expect($.asArray(names).sort()).toEqual(['a', 'b', 'sub'])
    expect(await dir!.Close()).toBeNull()

    expect(await Rename('/dir/a', '/dir/c')).toBeNull()
    expect(await Remove('/dir/b')).toBeNull()
    expect(await Remove('/dir/sub')).toBeNull()
    const [after] = await ReadDir('/dir')
    expect($.asArray(after).map((e) => e!.Name())).toEqual(['c'])

    expect(await RemoveAll('/dir')).toBeNull()
    expect(memFS.nodes.has('/dir')).toBe(false)
    expect(await RemoveAll('/missing')).toBeNull()
  })

  it('resolves relative paths against the working directory', async () => {
    expect(await MkdirAll('/home/me', 0o755)).toBeNull()
    expect(await Chdir('/home/me')).toBeNull()
    expect(Getwd()).toEqual(['/home/me', null])

    expect(await WriteFile('notes.txt', $.stringToBytes('x'), 0o644)).toBeNull()
    expect(memFS.nodes.has('/home/me/notes.txt')).toBe(true)
    const [data] = await ReadFile('./notes.txt')
    expect($.bytesToString(data)).toBe('x')
  })

  it('maps callback error codes to io/fs errors', async () => {
    const [, err] = await Open('/missing.txt')
    expect(IsNotExist(err)).toBe(true)
    expect(await Mkdir('/', 0o755)).not.toBeNull()
  })
})

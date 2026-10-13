// Callback filesystem host provider.
//
// os uses the synchronous filesystem of Node.js or Deno when there is one.
// Otherwise, as in a browser, it uses a filesystem with the callback API of
// Node.js on the fs global: the API that Go's js/wasm port calls through the
// fs object that wasm_exec.js installs. JavaScript code, or Go code compiled
// with goscript (such as a filesystem over IndexedDB that sets functions on
// the fs global with syscall/js), can provide it. Every operation on it
// completes asynchronously, which is why the os functions and File methods
// that access files are async.

import { getHostRuntime } from '@goscript/builtin/hostio.js'

// CallbackFS is a filesystem with the callback API of Node.js, where each
// function takes a final callback(err, ...results). Its functions are looked
// up by name when called, so a provider may install them after os loads.
export type CallbackFS = {
  constants?: Record<string, number>
  [name: string]: unknown
}

// CallbackStat is the stat object that a callback filesystem returns.
export type CallbackStat = {
  isDirectory(): boolean
  isSymbolicLink?(): boolean
  mode?: number
  mtime?: Date | null
  mtimeMs?: number
  size?: number
}

// getCallbackFS returns the callback filesystem on the fs global, or null
// when the host has a synchronous filesystem or there is no fs global.
// It is looked up on each call, since a program installs it at run time.
export function getCallbackFS(): CallbackFS | null {
  const runtime = getHostRuntime()
  if (runtime.nodeFS !== null || runtime.deno !== null) {
    return null
  }
  const fsObj = (globalThis as { fs?: unknown }).fs
  if (fsObj === null || typeof fsObj !== 'object') {
    return null
  }
  const cbfs = fsObj as CallbackFS
  return typeof cbfs.open === 'function' ? cbfs : null
}

// callbackFSError is an error from a callback filesystem with a Node.js
// error code, which os maps to the matching io/fs error.
class callbackFSError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message)
  }
}

// callbackFSCall calls the named function of the filesystem with the given
// arguments and resolves to the first result passed to its callback, or
// rejects with the error passed to it.
export function callbackFSCall(
  cbfs: CallbackFS,
  name: string,
  ...args: unknown[]
): Promise<unknown> {
  const fn = cbfs[name]
  if (typeof fn !== 'function') {
    return Promise.reject(
      new callbackFSError(`fs.${name} is not implemented`, 'ENOSYS'),
    )
  }
  return new Promise((resolve, reject) => {
    ;(fn as (...fnArgs: unknown[]) => void).call(
      cbfs,
      ...args,
      (err: unknown, ...results: unknown[]) => {
        if (err !== null && err !== undefined && err !== false) {
          reject(callbackErrorValue(err))
          return
        }
        resolve(results[0])
      },
    )
  })
}

// callbackErrorValue converts the error passed to a callback, which may be
// a plain object with message and code properties, to an Error with a code.
function callbackErrorValue(err: unknown): unknown {
  if (err instanceof Error) {
    return err
  }
  if (typeof err === 'object' && err !== null) {
    const message = Reflect.get(err, 'message')
    const code = Reflect.get(err, 'code')
    return new callbackFSError(
      typeof message === 'string' ? message : String(err),
      typeof code === 'string' ? code : '',
    )
  }
  return new callbackFSError(String(err), '')
}

let callbackWorkingDir = '/'

// callbackFSGetwd returns the working directory used to resolve relative
// paths on a callback filesystem, which has no working directory of its own.
export function callbackFSGetwd(): string {
  return callbackWorkingDir
}

// callbackFSSetwd sets the working directory used to resolve relative paths
// on a callback filesystem.
export function callbackFSSetwd(dir: string): void {
  callbackWorkingDir = callbackFSPath(dir)
}

// callbackFSPath returns the absolute, cleaned form of the given path, which
// is relative to the working directory when it does not start with a slash.
export function callbackFSPath(path: string): string {
  const full =
    path.startsWith('/') ? path : (
      callbackWorkingDir.replace(/\/+$/, '') + '/' + path
    )
  const parts: string[] = []
  for (const part of full.split('/')) {
    if (part === '' || part === '.') {
      continue
    }
    if (part === '..') {
      parts.pop()
      continue
    }
    parts.push(part)
  }
  return '/' + parts.join('/')
}

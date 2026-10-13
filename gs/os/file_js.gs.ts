import * as $ from "@goscript/builtin/index.js";
import { ErrExist, ErrInvalid, ErrUnimplemented } from "./error.gs.js";
import { File } from "./types_js.gs.js";
import { callbackFSErr, callbackFSResult, getDeno, getNodeFS, newHostError } from "./types_js.gs.js";
import { callbackFSSetwd, getCallbackFS } from "./callbackfs.js";
import { O_CREATE, O_RDONLY, O_RDWR, O_TRUNC, O_WRONLY } from "./file_constants_js.gs.js";
import { Link as linkPath, openFileNolog, readlink, Remove as removePath, rename as renamePath, Symlink as symlinkPath, Truncate as truncatePath } from "./file_unix_js.gs.js";
import { Lstat as lstatPath, Stat as statPath } from "./stat_js.gs.js";
import { ValidPath } from "@goscript/io/fs/index.js"

import * as errors from "@goscript/errors/index.js"
import * as fs from "@goscript/io/fs/index.js"
import * as io from "@goscript/io/index.js"

export function Open(name: string): Promise<[File | null, $.GoError]> {
  return OpenFile(name, O_RDONLY, 0)
}

export function Create(name: string): Promise<[File | null, $.GoError]> {
  return OpenFile(name, O_RDWR | O_CREATE | O_TRUNC, 0o666)
}

export function OpenFile(name: string, flag: number, perm: number): Promise<[File | null, $.GoError]> {
  return openFileNolog(name, flag, perm)
}

export async function ReadFile(name: string): Promise<[$.Bytes, $.GoError]> {
  const denoObj = getDeno()
  if (denoObj?.readFileSync) {
    try {
      return [denoObj.readFileSync(name), null]
    } catch (err) {
      return [null, newHostError(err)]
    }
  }
  const nodeFS = getNodeFS()
  if (nodeFS?.readFileSync) {
    try {
      return [nodeFS.readFileSync(name), null]
    } catch (err) {
      return [null, newHostError(err)]
    }
  }
  if (getCallbackFS() !== null) {
    return readFileCallback(name)
  }
  return [null, ErrUnimplemented]
}

export async function WriteFile(name: string, data: $.Bytes, perm: number): Promise<$.GoError> {
  const buf = $.bytesToUint8Array(data)
  const denoObj = getDeno()
  if (denoObj?.writeFileSync) {
    try {
      denoObj.writeFileSync(name, buf, { mode: perm })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  const nodeFS = getNodeFS()
  if (nodeFS?.writeFileSync) {
    try {
      nodeFS.writeFileSync(name, buf, { mode: perm })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  if (getCallbackFS() !== null) {
    return writeFileCallback(name, buf, perm)
  }
  return ErrUnimplemented
}

export async function Mkdir(name: string, perm: number): Promise<$.GoError> {
  const denoObj = getDeno()
  if (denoObj?.mkdirSync) {
    try {
      denoObj.mkdirSync(name, { mode: perm })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  const nodeFS = getNodeFS()
  if (nodeFS?.mkdirSync) {
    try {
      nodeFS.mkdirSync(name, { mode: perm })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  if (getCallbackFS() !== null) {
    return callbackFSErr("mkdir", name, perm)
  }
  return ErrUnimplemented
}

export async function MkdirAll(path: string, perm: number): Promise<$.GoError> {
  const denoObj = getDeno()
  if (denoObj?.mkdirSync) {
    try {
      denoObj.mkdirSync(path, { mode: perm, recursive: true })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  const nodeFS = getNodeFS()
  if (nodeFS?.mkdirSync) {
    try {
      nodeFS.mkdirSync(path, { mode: perm, recursive: true })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  if (getCallbackFS() !== null) {
    return mkdirAllCallback(path, perm)
  }
  return ErrUnimplemented
}

export function Remove(name: string): Promise<$.GoError> {
  return removePath(name)
}

export async function RemoveAll(path: string): Promise<$.GoError> {
  const denoObj = getDeno()
  if (denoObj?.removeSync) {
    try {
      denoObj.removeSync(path, { recursive: true })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  const nodeFS = getNodeFS()
  if (nodeFS?.rmSync) {
    try {
      nodeFS.rmSync(path, { force: true, recursive: true })
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  if (getCallbackFS() !== null) {
    return removeAllCallback(path)
  }
  return ErrUnimplemented
}

export async function Chdir(dir: string): Promise<$.GoError> {
  const denoObj = getDeno()
  if (denoObj?.chdir) {
    try {
      denoObj.chdir(dir)
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  const processObj = (globalThis as any).process
  if (processObj?.chdir) {
    try {
      processObj.chdir(dir)
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  if (getCallbackFS() !== null) {
    const [info, err] = await statPath(dir)
    if (err !== null) {
      return err
    }
    if (!info!.IsDir()) {
      return ErrInvalid
    }
    callbackFSSetwd(dir)
    return null
  }
  return ErrUnimplemented
}

export async function Chmod(name: string, mode: number): Promise<$.GoError> {
  const denoObj = getDeno()
  if (denoObj?.chmodSync) {
    try {
      denoObj.chmodSync(name, mode)
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  const nodeFS = getNodeFS()
  if (nodeFS?.chmodSync) {
    try {
      nodeFS.chmodSync(name, mode)
      return null
    } catch (err) {
      return newHostError(err)
    }
  }
  if (getCallbackFS() !== null) {
    return callbackFSErr("chmod", name, mode)
  }
  return ErrUnimplemented
}

export function Rename(oldpath: string, newpath: string): Promise<$.GoError> {
  return renamePath(oldpath, newpath)
}

export function Stat(name: string): Promise<[fs.FileInfo, $.GoError]> {
  return statPath(name)
}

export function Lstat(name: string): Promise<[fs.FileInfo, $.GoError]> {
  return lstatPath(name)
}

export function Link(oldname: string, newname: string): Promise<$.GoError> {
  return linkPath(oldname, newname)
}

export function Symlink(oldname: string, newname: string): Promise<$.GoError> {
  return symlinkPath(oldname, newname)
}

export function Readlink(name: string): Promise<[string, $.GoError]> {
  return readlink(name)
}

export function Truncate(name: string, size: bigint): Promise<$.GoError> {
  return truncatePath(name, size)
}

export function DirFS(dir: string): fs.FS {
  return new hostFS({ root: dir })
}

class hostFS {
  public root: string

  constructor(init?: Partial<{ root?: string }>) {
    this.root = init?.root ?? "."
  }

  public Open(name: string): Promise<[File | null, $.GoError]> {
    if (!ValidPath(name)) {
      return Promise.resolve([null, ErrInvalid])
    }
    const fullPath = name === "." ? this.root : this.root.replace(/\/+$/, "") + "/" + name
    return Open(fullPath)
  }
}

// readFileCallback reads the named file from the callback filesystem, as
// Go's js/wasm port does: it opens the file and reads it to the end.
async function readFileCallback(name: string): Promise<[$.Bytes, $.GoError]> {
  const [f, err] = await openFileNolog(name, O_RDONLY, 0)
  if (err !== null) {
    return [null, err]
  }
  const chunks: Uint8Array[] = []
  let size = 0
  let readErr: $.GoError = null
  for (;;) {
    const chunk = new Uint8Array(32 * 1024)
    const [n, rerr] = await f!.Read(chunk)
    if (n > 0) {
      chunks.push(chunk.subarray(0, n))
      size += n
    }
    if (rerr !== null) {
      if (rerr !== io.EOF) {
        readErr = rerr
      }
      break
    }
    if (n === 0) {
      break
    }
  }
  await f!.Close()
  if (readErr !== null) {
    return [null, readErr]
  }
  const data = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    data.set(chunk, offset)
    offset += chunk.length
  }
  return [data, null]
}

// writeFileCallback writes data to the named file on the callback
// filesystem, creating or truncating it.
async function writeFileCallback(name: string, data: Uint8Array, perm: number): Promise<$.GoError> {
  const [f, err] = await openFileNolog(name, O_WRONLY | O_CREATE | O_TRUNC, perm)
  if (err !== null) {
    return err
  }
  const [, werr] = await f!.Write(data)
  const cerr = await f!.Close()
  return werr ?? cerr
}

// mkdirAllCallback creates the directory path and any missing parents on
// the callback filesystem, which Go's js/wasm port does one level at a time.
async function mkdirAllCallback(path: string, perm: number): Promise<$.GoError> {
  const [info, err] = await statPath(path)
  if (err === null) {
    return info!.IsDir() ? null : ErrExist
  }
  const slash = path.replace(/\/+$/, "").lastIndexOf("/")
  if (slash > 0) {
    const perr = await mkdirAllCallback(path.slice(0, slash), perm)
    if (perr !== null) {
      return perr
    }
  }
  const merr = await callbackFSErr("mkdir", path, perm)
  if (merr !== null) {
    const [info2, err2] = await lstatPath(path)
    if (err2 === null && info2!.IsDir()) {
      return null
    }
  }
  return merr
}

// removeAllCallback removes path and any children it contains from the
// callback filesystem, ignoring a path that does not exist.
async function removeAllCallback(path: string): Promise<$.GoError> {
  const [info, err] = await lstatPath(path)
  if (err !== null) {
    return errors.Is(err, fs.ErrNotExist) ? null : err
  }
  if (info!.IsDir()) {
    const [names, rerr] = await callbackFSResult("readdir", path)
    if (rerr !== null) {
      return rerr
    }
    for (const name of names as string[]) {
      const cerr = await removeAllCallback(path.replace(/\/+$/, "") + "/" + name)
      if (cerr !== null) {
        return cerr
      }
    }
    return callbackFSErr("rmdir", path)
  }
  return callbackFSErr("unlink", path)
}

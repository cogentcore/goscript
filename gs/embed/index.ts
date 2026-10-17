import * as $ from '@goscript/builtin/index.js'
import * as io from '@goscript/io/index.js'
import * as fs from '@goscript/io/fs/index.js'
import * as time from '@goscript/time/index.js'

// ExternalFile is an embedded file that the compiler wrote as a separate file
// (goscript compile --external-embed), as its path, its size and the URL
// of its contents.
export type ExternalFile = [path: string, size: number, url: string]

// externalFile holds the contents of an external file once they are loaded.
// The loads of its FS value and its copies share it.
class externalFile {
  data: Uint8Array | null = null
  private loading: Promise<Uint8Array> | null = null

  constructor(
    readonly size: number,
    readonly url: string,
  ) {}

  // load returns the contents, which it fetches on the first call: from the
  // host filesystem for a file URL, else with fetch, so a page loads them
  // from beside its script. The bytes are only returned once they are loaded.
  load(): io.Awaitable<Uint8Array> {
    if (this.data !== null) {
      return this.data
    }
    const nodeFS = $.getHostRuntime().nodeFS
    if (this.url.startsWith('file:') && nodeFS?.readFileSync) {
      this.data = new Uint8Array(nodeFS.readFileSync(fileURLPath(this.url)))
      return this.data
    }
    this.loading ??= fetchBytes(this.url).then(
      (data) => (this.data = data),
      (err) => {
        this.loading = null
        throw err
      },
    )
    return this.loading
  }
}

// fetchBytes fetches the bytes at url.
async function fetchBytes(url: string): Promise<Uint8Array> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  return new Uint8Array(await response.arrayBuffer())
}

// fileURLPath returns the host path of a file URL.
function fileURLPath(url: string): string {
  const pathname = decodeURIComponent(new URL(url).pathname)
  return /^\/[A-Za-z]:/.test(pathname) ? pathname.slice(1) : pathname
}

// entry is the contents of an embedded file, inline or external.
type entry = Uint8Array | externalFile

export class FS {
  private files: Map<string, entry>

  // The inline files are given by path, and the external files are listed
  // after them.
  constructor(files?: Map<string, entry>, external?: ExternalFile[]) {
    this.files = files ?? new Map()
    for (const [path, size, url] of external ?? []) {
      this.files.set(path, new externalFile(size, url))
    }
  }

  // clone shares the files, which an FS never changes and copies when it
  // returns their bytes, as a Go FS value shares them.
  clone(): FS {
    return $.markAsStructValue(new FS(this.files))
  }

  Open(name: string): io.Awaitable<[fs.File, $.GoError]> {
    const err = validatePath('open', name)
    if (err != null) {
      return [null, err]
    }
    const data = this.files.get(name)
    if (data !== undefined) {
      return loaded(data, 'open', name, null, (b) => new openFile(name, b))
    }
    const entries = this.dirEntries(name)
    if (entries === null) {
      return [null, pathError('open', name, fs.ErrNotExist)]
    }
    return [new openDir(name, entries), null]
  }

  ReadDir(name: string): [$.Slice<fs.DirEntry>, $.GoError] {
    const err = validatePath('read', name)
    if (err != null) {
      return [null, err]
    }
    const entries = this.dirEntries(name)
    if (entries === null) {
      return [null, pathError('read', name, fs.ErrNotExist)]
    }
    return [entries, null]
  }

  ReadFile(name: string): io.Awaitable<[Uint8Array, $.GoError]> {
    const err = validatePath('read', name)
    if (err != null) {
      return [new Uint8Array(0), err]
    }
    const data = this.files.get(name)
    if (data === undefined) {
      const err = this.dirExists(name) ? fs.ErrInvalid : fs.ErrNotExist
      return [new Uint8Array(0), pathError('read', name, err)]
    }
    return loaded(data, 'read', name, new Uint8Array(0), (b) => b.slice())
  }

  Stat(name: string): [fs.FileInfo, $.GoError] {
    const err = validatePath('stat', name)
    if (err != null) {
      return [null, err]
    }
    const data = this.files.get(name)
    if (data !== undefined) {
      return [new embedFileInfo(baseName(name), entrySize(data), 0o444), null]
    }
    if (!this.dirExists(name)) {
      return [null, pathError('stat', name, fs.ErrNotExist)]
    }
    return [new embedFileInfo(baseName(name), 0, fs.ModeDir | 0o555), null]
  }

  private dirEntries(name: string): fs.DirEntry[] | null {
    if (!this.dirExists(name)) {
      return null
    }
    const prefix = name === '.' ? '' : name + '/'
    const entries = new Map<string, fs.DirEntry>()
    for (const [filePath, data] of this.files) {
      if (prefix !== '' && !filePath.startsWith(prefix)) {
        continue
      }
      const rest = prefix === '' ? filePath : filePath.slice(prefix.length)
      if (rest === '') {
        continue
      }
      const slash = rest.indexOf('/')
      const childName = slash === -1 ? rest : rest.slice(0, slash)
      if (entries.has(childName)) {
        continue
      }
      const isDir = slash !== -1
      const info =
        isDir ?
          new embedFileInfo(childName, 0, fs.ModeDir | 0o555)
        : new embedFileInfo(childName, entrySize(data), 0o444)
      entries.set(childName, new embedDirEntry(info))
    }
    return Array.from(entries.values()).sort((a, b) =>
      $.stringCompare(a!.Name(), b!.Name()),
    )
  }

  // FS is registered with the runtime type system; the compiler gives its
  // method signatures, for reflection.
  static __typeInfo = $.registerStructType('embed.FS', new FS(), [], FS)

  private dirExists(name: string): boolean {
    if (name === '.') {
      return true
    }
    const prefix = name + '/'
    for (const path of this.files.keys()) {
      if (path.startsWith(prefix)) {
        return true
      }
    }
    return false
  }
}

// entrySize returns the size of the contents of a file.
function entrySize(data: entry): number {
  return data instanceof externalFile ? data.size : data.byteLength
}

// loaded returns the result of use with the contents of a file, once they
// are loaded, or zero and the error of a failed load for operation op on name.
function loaded<T>(
  data: entry,
  op: string,
  name: string,
  zero: T,
  use: (bytes: Uint8Array) => T,
): io.Awaitable<[T, $.GoError]> {
  // Inline and loaded contents are used now.
  const bytes = data instanceof externalFile ? data.load() : data
  if (!io.isAsync(bytes)) {
    return [use(bytes), null]
  }

  // Otherwise the result waits for the load.
  return Promise.resolve(bytes).then(
    (bytes): [T, $.GoError] => [use(bytes), null],
    (err): [T, $.GoError] => [
      zero,
      pathError(op, name, $.newError(`embed: loading ${name}: ${err}`)),
    ],
  )
}

// openFile is an open regular file, which implements io.Seeker and
// io.ReaderAt, as in Go.
class openFile {
  private offset = 0

  constructor(
    private readonly name: string,
    private readonly data: Uint8Array,
  ) {}

  Close(): $.GoError {
    return null
  }

  Read(buffer: Uint8Array): [number, $.GoError] {
    if (this.offset >= this.data.byteLength) {
      return [0, io.EOF]
    }
    const n = Math.min(buffer.byteLength, this.data.byteLength - this.offset)
    buffer.set(this.data.subarray(this.offset, this.offset + n))
    this.offset += n
    return [n, null]
  }

  ReadAt(buffer: Uint8Array, offset: bigint): [number, $.GoError] {
    if (offset < 0n || offset > BigInt(this.data.byteLength)) {
      return [0, pathError('read', this.name, fs.ErrInvalid)]
    }
    const start = Number(offset)
    const n = Math.min(buffer.byteLength, this.data.byteLength - start)
    buffer.set(this.data.subarray(start, start + n))
    return [n, n < buffer.byteLength ? io.EOF : null]
  }

  Seek(offset: bigint, whence: number): [bigint, $.GoError] {
    switch (whence) {
      case io.SeekCurrent:
        offset += BigInt(this.offset)
        break
      case io.SeekEnd:
        offset += BigInt(this.data.byteLength)
        break
    }
    if (offset < 0n || offset > BigInt(this.data.byteLength)) {
      return [0n, pathError('seek', this.name, fs.ErrInvalid)]
    }
    this.offset = Number(offset)
    return [offset, null]
  }

  Stat(): [fs.FileInfo, $.GoError] {
    return [
      new embedFileInfo(baseName(this.name), this.data.byteLength, 0o444),
      null,
    ]
  }
}

// openDir is an open directory.
class openDir {
  private offset = 0

  constructor(
    private readonly name: string,
    private readonly entries: fs.DirEntry[],
  ) {}

  Close(): $.GoError {
    return null
  }

  Read(_buffer: Uint8Array): [number, $.GoError] {
    return [0, pathError('read', this.name, fs.ErrInvalid)]
  }

  ReadDir(n: number): [$.Slice<fs.DirEntry>, $.GoError] {
    if (n <= 0) {
      const entries = this.entries.slice(this.offset)
      this.offset = this.entries.length
      return [entries, null]
    }
    if (this.offset >= this.entries.length) {
      return [[], io.EOF]
    }
    const entries = this.entries.slice(this.offset, this.offset + n)
    this.offset += entries.length
    return [entries, null]
  }

  Stat(): [fs.FileInfo, $.GoError] {
    return [new embedFileInfo(baseName(this.name), 0, fs.ModeDir | 0o555), null]
  }
}

class embedFileInfo {
  constructor(
    private readonly name: string,
    private readonly size: number,
    private readonly mode: fs.FileMode,
  ) {}

  IsDir(): boolean {
    return fs.FileMode_IsDir(this.mode)
  }

  ModTime(): time.Time {
    return new time.Time()
  }

  Mode(): fs.FileMode {
    return this.mode
  }

  Name(): string {
    return this.name
  }

  Size(): bigint {
    return BigInt(this.size)
  }

  Sys(): null {
    return null
  }
}

class embedDirEntry {
  constructor(private readonly info: fs.FileInfo) {}

  Info(): [fs.FileInfo, $.GoError] {
    return [this.info, null]
  }

  IsDir(): boolean {
    return this.info!.IsDir()
  }

  Name(): string {
    return this.info!.Name()
  }

  Type(): fs.FileMode {
    return fs.fileModeType(this.info!.Mode())
  }
}

function validatePath(op: string, name: string): $.GoError {
  if (!fs.ValidPath(name)) {
    return pathError(op, name, fs.ErrInvalid)
  }
  return null
}

function pathError(op: string, name: string, err: $.GoError): $.GoError {
  return new fs.PathError({ Op: op, Path: name, Err: err })
}

function baseName(name: string): string {
  const idx = name.lastIndexOf('/')
  if (idx === -1) {
    return name
  }
  return name.slice(idx + 1)
}

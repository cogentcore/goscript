import * as $ from '@goscript/builtin/index.js'
import * as io from '@goscript/io/index.js'
import * as fs from '@goscript/io/fs/index.js'
import * as time from '@goscript/time/index.js'

export class FS {
  private files: Map<string, Uint8Array>

  constructor(files?: Map<string, Uint8Array>) {
    this.files = files ?? new Map()
  }

  clone(): FS {
    const files = new Map<string, Uint8Array>()
    for (const [name, data] of this.files) {
      files.set(name, data.slice())
    }
    return $.markAsStructValue(new FS(files))
  }

  Open(name: string): [fs.File, $.GoError] {
    const err = validatePath('open', name)
    if (err != null) {
      return [null, err]
    }
    const data = this.files.get(name)
    if (data !== undefined) {
      return [new embedDataFile(name, data), null]
    }
    const entries = this.dirEntries(name)
    if (entries === null) {
      return [null, pathError('open', name, fs.ErrNotExist)]
    }
    return [new embedFile(name, null, entries), null]
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

  ReadFile(name: string): [Uint8Array, $.GoError] {
    const err = validatePath('read', name)
    if (err != null) {
      return [new Uint8Array(0), err]
    }
    const data = this.files.get(name)
    if (data === undefined) {
      const err = this.dirExists(name) ? fs.ErrInvalid : fs.ErrNotExist
      return [new Uint8Array(0), pathError('read', name, err)]
    }
    return [data.slice(), null]
  }

  Stat(name: string): [fs.FileInfo, $.GoError] {
    const err = validatePath('stat', name)
    if (err != null) {
      return [null, err]
    }
    const data = this.files.get(name)
    if (data !== undefined) {
      return [new embedFileInfo(baseName(name), data.byteLength, 0o444), null]
    }
    if (!this.dirExists(name)) {
      return [null, pathError('stat', name, fs.ErrNotExist)]
    }
    return [new embedFileInfo(baseName(name), 0, fs.ModeDir | 0o555), null]
  }

  private dirEntries(name: string): $.Slice<fs.DirEntry> | null {
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
        : new embedFileInfo(childName, data.byteLength, 0o444)
      entries.set(childName, new embedDirEntry(info))
    }
    return Array.from(entries.values()).sort((a, b) =>
      a!.Name().localeCompare(b!.Name()),
    )
  }

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

class embedFile {
  protected position = 0
  private dirOffset = 0

  constructor(
    protected readonly fileName: string,
    private readonly data: Uint8Array | null,
    private readonly entries: $.Slice<fs.DirEntry> = [],
  ) {}

  Close(): $.GoError {
    return null
  }

  Read(buffer: Uint8Array): [number, $.GoError] {
    if (this.data === null) {
      return [0, pathError('read', this.fileName, fs.ErrInvalid)]
    }
    if (this.position >= this.data.byteLength) {
      return [0, io.EOF]
    }
    const n = Math.min(buffer.byteLength, this.data.byteLength - this.position)
    buffer.set(this.data.subarray(this.position, this.position + n))
    this.position += n
    return [n, null]
  }

  ReadDir(n: number): [$.Slice<fs.DirEntry>, $.GoError] {
    if (this.data !== null) {
      return [null, pathError('readdir', this.fileName, fs.ErrInvalid)]
    }
    const allEntries = this.entries ?? []
    if (n <= 0) {
      const entries = allEntries.slice(this.dirOffset)
      this.dirOffset = allEntries.length
      return [entries, null]
    }
    if (this.dirOffset >= allEntries.length) {
      return [[], io.EOF]
    }
    const entries = allEntries.slice(this.dirOffset, this.dirOffset + n)
    this.dirOffset += entries.length
    return [entries, null]
  }

  Stat(): [fs.FileInfo, $.GoError] {
    if (this.data === null) {
      return [
        new embedFileInfo(baseName(this.fileName), 0, fs.ModeDir | 0o555),
        null,
      ]
    }
    return [
      new embedFileInfo(baseName(this.fileName), this.data.byteLength, 0o444),
      null,
    ]
  }
}

// embedDataFile is an open regular file, which also implements io.Seeker
// and io.ReaderAt, as in Go.
class embedDataFile extends embedFile {
  constructor(
    name: string,
    private readonly fileData: Uint8Array,
  ) {
    super(name, fileData)
  }

  Seek(offset: bigint, whence: number): [bigint, $.GoError] {
    switch (whence) {
      case io.SeekCurrent:
        offset += BigInt(this.position)
        break
      case io.SeekEnd:
        offset += BigInt(this.fileData.byteLength)
        break
    }
    if (offset < 0n || offset > BigInt(this.fileData.byteLength)) {
      return [0n, pathError('seek', this.fileName, fs.ErrInvalid)]
    }
    this.position = Number(offset)
    return [offset, null]
  }

  ReadAt(buffer: Uint8Array, offset: bigint): [number, $.GoError] {
    if (offset < 0n || offset > BigInt(this.fileData.byteLength)) {
      return [0, pathError('read', this.fileName, fs.ErrInvalid)]
    }
    const start = Number(offset)
    const n = Math.min(buffer.byteLength, this.fileData.byteLength - start)
    buffer.set(this.fileData.subarray(start, start + n))
    if (n < buffer.byteLength) {
      return [n, io.EOF]
    }
    return [n, null]
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

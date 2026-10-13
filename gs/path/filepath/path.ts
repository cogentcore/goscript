// Package filepath implements utility routines for manipulating filename paths
// in a way compatible with the target operating system-defined file paths.
import * as $ from '@goscript/builtin/index.js'
import { getCurrentWorkingDirectory } from '@goscript/builtin/hostio.js'
import type { DirEntry, FileInfo } from '@goscript/io/fs/fs.js'
import { ModeSymlink, ValidPath } from '@goscript/io/fs/fs.js'
import { FileInfoToDirEntry } from '@goscript/io/fs/readdir.js'
import { SkipAll, SkipDir } from '@goscript/io/fs/walk.js'
import { Lstat, ReadDir, Readlink } from '@goscript/os/index.js'

type JoinElement = string | $.Slice<string>

function normalizeJoinElements(elem: JoinElement[]): string[] {
  if (elem.length === 1 && typeof elem[0] !== 'string') {
    const slice = elem[0]
    const parts: string[] = []
    for (let i = 0; i < $.len(slice); i++) {
      parts.push(slice![i])
    }
    return parts
  }
  return elem as string[]
}

// Separator Path separator constants.
export const Separator = $.stringToRune('/')
export const ListSeparator = $.stringToRune(':')

// SkipDir and SkipAll are the io/fs values, as in Go.
export { SkipAll, SkipDir }

// Base returns the last element of path.
// Trailing path separators are removed before extracting the last element.
// If the path is empty, Base returns ".".
// If the path consists entirely of separators, Base returns a single separator.
export function Base(path: string): string {
  if (path === '') {
    return '.'
  }

  // Strip trailing slashes
  path = path.replace(/\/+$/, '')

  if (path === '') {
    return '/'
  }

  // Find the last slash
  const i = path.lastIndexOf('/')
  if (i >= 0) {
    return path.substring(i + 1)
  }

  return path
}

// Dir returns all but the last element of path, typically the path's directory.
// After dropping the final element, Dir calls Clean on the path and trailing
// slashes are removed. If the path is empty, Dir returns ".".
// If the path consists entirely of separators, Dir returns a single separator.
export function Dir(path: string): string {
  if (path === '') {
    return '.'
  }

  // Strip trailing slashes
  path = path.replace(/\/+$/, '')

  if (path === '') {
    return '/'
  }

  // Find the last slash
  const i = path.lastIndexOf('/')
  if (i >= 0) {
    const dir = path.substring(0, i)
    return Clean(dir === '' ? '/' : dir)
  }

  return '.'
}

// Ext returns the file name extension used by path.
// The extension is the suffix beginning at the final dot
// in the final element of path; it is empty if there is no dot.
export function Ext(path: string): string {
  const base = Base(path)

  // Handle special case: if the base starts with a dot and has no other dots,
  // it's a hidden file with no extension
  if (base.startsWith('.') && base.indexOf('.', 1) === -1) {
    return ''
  }

  const i = base.lastIndexOf('.')
  if (i >= 0) {
    return base.substring(i)
  }
  return ''
}

// Clean returns the shortest path name equivalent to path
// by purely lexical processing.
export function Clean(path: string): string {
  if (path === '') {
    return '.'
  }

  const isAbs = path.startsWith('/')
  const segments = path
    .split('/')
    .filter((segment) => segment !== '' && segment !== '.')
  const result: string[] = []

  for (const segment of segments) {
    if (segment === '..') {
      if (result.length > 0 && result[result.length - 1] !== '..') {
        result.pop()
      } else if (!isAbs) {
        result.push('..')
      }
    } else {
      result.push(segment)
    }
  }

  let cleaned = result.join('/')
  if (isAbs) {
    cleaned = '/' + cleaned
  }

  return (
    cleaned === '' ?
      isAbs ? '/'
      : '.'
    : cleaned
  )
}

// Join joins any number of path elements into a single path,
// separating them with an OS specific Separator. Empty elements
// are ignored. The result is Cleaned. However, if the argument
// list is empty or all its elements are empty, Join returns
// an empty string.
export function Join(...elem: JoinElement[]): string {
  const partsArg = normalizeJoinElements(elem)
  // Join all elements from the first non-empty one onward, then Clean. A later
  // absolute element does not discard earlier elements (Go joins the suffix and
  // lets Clean collapse the resulting double separators).
  for (let i = 0; i < partsArg.length; i++) {
    if (partsArg[i] !== '') {
      return Clean(partsArg.slice(i).join('/'))
    }
  }
  return ''
}

// Split splits path immediately following the final Separator,
// separating it into a directory and file name component.
// If there is no Separator in path, Split returns an empty dir
// and file set to path. The returned values have the property
// that path = dir+file.
export function Split(path: string): [string, string] {
  const i = path.lastIndexOf('/')
  if (i < 0) {
    return ['', path]
  }
  return [path.substring(0, i + 1), path.substring(i + 1)]
}

// IsAbs reports whether the path is absolute.
export function IsAbs(path: string): boolean {
  return path.startsWith('/')
}

// ToSlash returns the result of replacing each separator character
// in path with a slash ('/') character. Multiple separators are
// replaced by multiple slashes.
export function ToSlash(path: string): string {
  // On Unix-like systems (including our JS environment), the separator is already '/'
  // so backslashes are just regular characters and should not be converted
  // This matches Go's behavior on Unix systems
  return path
}

// FromSlash returns the result of replacing each slash ('/') character
// in path with a separator character. Multiple slashes are replaced
// by multiple separators.
export function FromSlash(path: string): string {
  // On Unix-like systems (including our JS environment), separator is '/'
  // so no conversion needed
  return path
}

// VolumeName returns leading volume name.
// Given "C:\foo\bar" it returns "C:" on Windows.
// Given "\\host\share\foo" it returns "\\host\share".
// On other systems, it returns "".
export function VolumeName(_path: string): string {
  // In our JS environment, we don't have volume names
  return ''
}

// IsLocal reports whether path, using lexical analysis only,
// has all of these properties:
//   - is within the subtree rooted at the directory in which path is evaluated
//   - is not an absolute path
//   - is not empty
//   - on Windows, is not a reserved name such as "NUL".
export function IsLocal(path: string): boolean {
  if (path === '' || IsAbs(path)) {
    return false
  }

  // Check for .. components that would escape
  const segments = path.split('/')
  let depth = 0

  for (const segment of segments) {
    if (segment === '..') {
      depth--
      if (depth < 0) {
        return false
      }
    } else if (segment !== '.' && segment !== '') {
      depth++
    }
  }

  return true
}

// SplitList splits a list of paths joined by the OS-specific ListSeparator,
// usually found in PATH or GOPATH environment variables.
// Unlike strings.Split, SplitList returns an empty slice when passed an empty string.
export function SplitList(path: string): string[] {
  if (path === '') {
    return []
  }
  return path.split(String.fromCharCode(ListSeparator))
}

// HasPrefix tests whether the path p begins with prefix.
export function HasPrefix(p: string, prefix: string): boolean {
  if (prefix === '') {
    return true
  }

  // Normalize both paths
  const normalP = Clean(p)
  const normalPrefix = Clean(prefix)

  if (normalP === normalPrefix) {
    return true
  }

  // Check if p starts with prefix followed by a separator
  if (normalP.startsWith(normalPrefix)) {
    const remaining = normalP.substring(normalPrefix.length)
    return remaining.startsWith('/')
  }

  return false
}

// Abs returns an absolute representation of path. If the path is not absolute
// it is joined with the current working directory to turn it into an absolute
// path, then Cleaned. This mirrors Go's filepath.Abs, which calls os.Getwd for
// relative inputs rather than fabricating a root.
export function Abs(path: string): [string, $.GoError] {
  if (IsAbs(path)) {
    return [Clean(path), null]
  }
  const wd = getCurrentWorkingDirectory()
  if (wd === null) {
    return ['', $.newError('filepath: cannot determine working directory')]
  }
  return [Join(wd, path), null]
}

export function Rel(basepath: string, targpath: string): [string, $.GoError] {
  const base = Clean(basepath)
  const targ = Clean(targpath)
  if (targ === base) {
    return ['.', null]
  }

  const b = base === '.' ? '' : base
  const t = targ === '.' ? '' : targ
  const baseSlashed = b.length > 0 && b[0] === '/'
  const targSlashed = t.length > 0 && t[0] === '/'
  if (baseSlashed !== targSlashed) {
    return [
      '',
      $.newError(`Rel: can't make ${targpath} relative to ${basepath}`),
    ]
  }

  // Walk both paths element by element until they first differ.
  const bl = b.length
  const tl = t.length
  let b0 = 0
  let bi = 0
  let t0 = 0
  let ti = 0
  for (;;) {
    while (bi < bl && b[bi] !== '/') {
      bi++
    }
    while (ti < tl && t[ti] !== '/') {
      ti++
    }
    if (t.slice(t0, ti) !== b.slice(b0, bi)) {
      break
    }
    if (bi < bl) {
      bi++
    }
    if (ti < tl) {
      ti++
    }
    b0 = bi
    t0 = ti
  }
  if (b.slice(b0, bi) === '..') {
    return [
      '',
      $.newError(`Rel: can't make ${targpath} relative to ${basepath}`),
    ]
  }

  if (b0 !== bl) {
    // Base elements remain; emit one ".." per leftover base element, then the
    // remaining target tail.
    let seps = 0
    for (let i = b0; i < bl; i++) {
      if (b[i] === '/') {
        seps++
      }
    }
    let out = '..'
    for (let i = 0; i < seps; i++) {
      out += '/..'
    }
    if (t0 !== tl) {
      out += '/' + t.slice(t0)
    }
    return [out, null]
  }
  return [t.slice(t0), null]
}

// EvalSymlinks returns the path name after the evaluation of any symbolic
// links. This is a lexical port of Go's path/filepath walkSymlinks: it resolves
// each component with Lstat and follows symlinks with Readlink, preserving the
// relative-vs-absolute shape of the input. It deliberately does not use a host
// realpath, which would always force an absolute result and would not surface
// Go's per-component ENOTDIR and link-cycle errors. volLen is 0 for a relative
// input and 1 for an absolute root.
export async function EvalSymlinks(path: string): Promise<[string, $.GoError]> {
  let p = path
  const volLen = p.length > 0 && p[0] === '/' ? 1 : 0
  const vol = p.slice(0, volLen)
  let dest = vol
  let linksWalked = 0
  for (let start = volLen; start < p.length; ) {
    while (start < p.length && p[start] === '/') {
      start++
    }
    let end = start
    while (end < p.length && p[end] !== '/') {
      end++
    }

    const component = p.slice(start, end)
    if (end === start) {
      break
    } else if (component === '.') {
      start = end
      continue
    } else if (component === '..') {
      // Back up to the previous component unless it is itself a kept "..".
      let r = dest.length - 1
      for (; r >= volLen; r--) {
        if (dest[r] === '/') {
          break
        }
      }
      if (r < volLen || dest.slice(r + 1) === '..') {
        if (dest.length > volLen) {
          dest += '/'
        }
        dest += '..'
      } else {
        dest = dest.slice(0, r)
      }
      start = end
      continue
    }

    if (dest.length > volLen && dest[dest.length - 1] !== '/') {
      dest += '/'
    }
    dest += component

    const [info, statErr] = await Lstat(dest)
    if (statErr !== null) {
      return ['', statErr]
    }
    if ((info!.Mode() & ModeSymlink) === 0) {
      if (!info!.IsDir() && end < p.length) {
        return ['', $.newError('not a directory')]
      }
      start = end
      continue
    }

    linksWalked++
    if (linksWalked > 255) {
      return ['', $.newError('EvalSymlinks: too many links')]
    }
    const [link, linkErr] = await Readlink(dest)
    if (linkErr !== null) {
      return ['', linkErr]
    }
    p = link + p.slice(end)
    if (link.length > 0 && link[0] === '/') {
      // Absolute symlink target: restart from the root.
      dest = '/'
    } else {
      // Relative symlink target: replace the last component of dest.
      let r = dest.length - 1
      for (; r >= volLen; r--) {
        if (dest[r] === '/') {
          break
        }
      }
      dest = r < volLen ? vol : dest.slice(0, r)
    }
    start = 0
  }
  return [Clean(dest), null]
}

export function Glob(_pattern: string): [string[], $.GoError] {
  // No filesystem support, return empty array
  return [[], null]
}

// WalkFunc is the type of the function called for each file or directory
// visited by Walk. The path argument contains the argument to Walk as a
// prefix; that is, if Walk is called with "dir" and finds a file "a"
// in that directory, the walk function will be called with argument
// "dir/a". The info argument is the fs.FileInfo for the named path.
export type WalkFunc = (
  path: string,
  info: FileInfo,
  err: $.GoError,
) => $.GoError | Promise<$.GoError>

// Walk walks the file tree rooted at root, calling fn for each file or
// directory in lexical order. It reads each entry with Lstat, so it does not
// follow symbolic links, as in Go.
export async function Walk(root: string, fn: WalkFunc): Promise<$.GoError> {
  const [info, statErr] = await Lstat(root)
  let err: $.GoError
  if (statErr !== null) {
    err = await fn(root, null, statErr)
  } else {
    err = await walk(root, info, fn)
  }
  if (err === SkipDir || err === SkipAll) {
    return null
  }
  return err
}

// walk recursively descends path, calling fn.
async function walk(
  path: string,
  info: FileInfo,
  fn: WalkFunc,
): Promise<$.GoError> {
  if (!info!.IsDir()) {
    return await fn(path, info, null)
  }

  const [entries, readErr] = await ReadDir(path)
  let err = await fn(path, info, readErr)
  // If readErr is set, fn is called twice for path: once before reading the
  // directory and once after the failure, as in Go.
  if (readErr !== null || err !== null) {
    return err
  }

  for (const entry of $.asArray(entries)) {
    const filename = Join(path, entry!.Name())
    const [fileInfo, statErr] = await Lstat(filename)
    if (statErr !== null) {
      err = await fn(filename, fileInfo, statErr)
      if (err !== null && err !== SkipDir) {
        return err
      }
      continue
    }
    err = await walk(filename, fileInfo, fn)
    if (err !== null && (!fileInfo!.IsDir() || err !== SkipDir)) {
      return err
    }
  }
  return null
}

export type WalkDirFunc = (
  path: string,
  d: DirEntry,
  err: $.GoError,
) => $.GoError | Promise<$.GoError>

// WalkDir walks the file tree rooted at root, calling fn for each file or
// directory in lexical order. It reads directories with os.ReadDir, whose
// entries report symbolic links without following them, as in Go.
export async function WalkDir(
  root: string,
  fn: WalkDirFunc,
): Promise<$.GoError> {
  const [info, statErr] = await Lstat(root)
  let err: $.GoError
  if (statErr !== null) {
    err = await fn(root, null, statErr)
  } else {
    err = await walkDir(root, FileInfoToDirEntry(info), fn)
  }
  if (err === SkipDir || err === SkipAll) {
    return null
  }
  return err
}

// walkDir recursively descends path, calling fn.
async function walkDir(
  path: string,
  d: DirEntry,
  fn: WalkDirFunc,
): Promise<$.GoError> {
  let err = await fn(path, d, null)
  if (err !== null || !d!.IsDir()) {
    if (err === SkipDir && d!.IsDir()) {
      // Successfully skipped directory.
      err = null
    }
    return err
  }

  const [entries, readErr] = await ReadDir(path)
  if (readErr !== null) {
    // Second call, to report the ReadDir error.
    err = await fn(path, d, readErr)
    if (err !== null) {
      if (err === SkipDir && d!.IsDir()) {
        err = null
      }
      return err
    }
  }

  for (const entry of $.asArray(entries)) {
    err = await walkDir(Join(path, entry!.Name()), entry, fn)
    if (err !== null) {
      if (err === SkipDir) {
        break
      }
      return err
    }
  }
  return null
}

// Localize converts a slash-separated path into an operating system path.
// The input must be a valid path as reported by io/fs.ValidPath. On a
// Unix-like target the only further restriction is the absence of a NUL byte.
export function Localize(path: string): [string, $.GoError] {
  if (!ValidPath(path) || path.indexOf('\x00') >= 0) {
    return ['', $.newError('invalid path')]
  }
  return [path, null]
}

import * as $ from '@goscript/builtin/index.js'

type ProcessEnv = Record<string, string | undefined>

interface ProcessLike {
  env?: ProcessEnv
}

// memoryEnv holds the environment when the host has none, as in a browser,
// as Go keeps the environment in memory on js/wasm.
const memoryEnv: ProcessEnv = {}

function hostEnv(): ProcessEnv {
  return (globalThis as { process?: ProcessLike }).process?.env ?? memoryEnv
}

// Getenv Environment variable functions using Node.js/browser APIs.
export function Getenv(key: string): [string, boolean] {
  const value = hostEnv()[key]
  return value !== undefined ? [value, true] : ['', false]
}

export function Setenv(key: string, value: string): $.GoError {
  hostEnv()[key] = value
  return null
}

export function Unsetenv(key: string): $.GoError {
  delete hostEnv()[key]
  return null
}

export function Clearenv(): void {
  const env = hostEnv()
  for (const key in env) {
    delete env[key]
  }
}

export function Environ(): $.Slice<string> {
  const values: string[] = []
  for (const [key, value] of Object.entries(hostEnv())) {
    if (value !== undefined) {
      values.push(`${key}=${value}`)
    }
  }
  return $.arrayToSlice(values)
}

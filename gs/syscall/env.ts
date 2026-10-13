import * as $ from '@goscript/builtin/index.js'

type ProcessEnv = Record<string, string | undefined>

interface ProcessLike {
  env?: ProcessEnv
}

// memoryEnv holds the environment when the host has none, as in a browser,
// as Go keeps the environment in memory on js/wasm.
const memoryEnv: ProcessEnv = {}

// environment returns the host process environment, or memoryEnv when the
// host has none.
function environment(): ProcessEnv {
  return (globalThis as { process?: ProcessLike }).process?.env ?? memoryEnv
}

// Getenv returns the value of the environment variable named by key, and
// whether it is set.
export function Getenv(key: string): [string, boolean] {
  const value = environment()[key]
  return value !== undefined ? [value, true] : ['', false]
}

// Setenv sets the value of the environment variable named by key.
export function Setenv(key: string, value: string): $.GoError {
  environment()[key] = value
  return null
}

// Unsetenv unsets the environment variable named by key.
export function Unsetenv(key: string): $.GoError {
  delete environment()[key]
  return null
}

// Clearenv deletes all environment variables.
export function Clearenv(): void {
  const env = environment()
  for (const key in env) {
    delete env[key]
  }
}

// Environ returns the environment as key=value strings.
export function Environ(): $.Slice<string> {
  const values: string[] = []
  for (const [key, value] of Object.entries(environment())) {
    if (value !== undefined) {
      values.push(`${key}=${value}`)
    }
  }
  return $.arrayToSlice(values)
}

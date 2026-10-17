import { describe, expect, it, vi } from 'vitest'

import { resetHostRuntimeForTests } from '@goscript/builtin/hostio.js'

import {
  BuildInfo,
  BuildSetting,
  FreeOSMemory,
  Module,
  PrintStack,
  ReadBuildInfo,
  SetGCPercent,
  SetMaxStack,
  SetMaxThreads,
  SetMemoryLimit,
  SetPanicOnFault,
  SetTraceback,
  Stack,
} from './index.js'

describe('runtime/debug override', () => {
  it('returns a stack trace as bytes', () => {
    const stack = Stack()

    expect(stack).toBeInstanceOf(Uint8Array)
    expect(new TextDecoder().decode(stack)).toContain('Error')
  })

  it('prints the current stack trace through the browser-like stderr console fallback', () => {
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const originalDeno = (globalThis as any).Deno
    const originalProcess = (globalThis as any).process
    delete (globalThis as any).Deno
    delete (globalThis as any).process
    resetHostRuntimeForTests()

    try {
      PrintStack()
      expect(consoleLog).toHaveBeenCalledTimes(1)
      expect(consoleLog.mock.calls[0][0]).toContain('Error')
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      if (originalDeno === undefined) {
        delete (globalThis as any).Deno
      } else {
        ;(globalThis as any).Deno = originalDeno
      }
      if (originalProcess === undefined) {
        delete (globalThis as any).process
      } else {
        ;(globalThis as any).process = originalProcess
      }
      resetHostRuntimeForTests()
      consoleLog.mockRestore()
      consoleError.mockRestore()
    }
  })

  it('exposes build info structs and reports no embedded module table', () => {
    const module = new Module({
      Path: 'example.test/module',
      Version: 'v1.2.3',
      Sum: 'h1:sum',
      Replace: new Module({ Path: '../module' }),
    })
    const info = new BuildInfo({
      GoVersion: 'go1.26.3',
      Path: 'example.test/main',
      Main: module,
      Deps: [module],
      Settings: [new BuildSetting({ Key: 'GOOS', Value: 'js' })],
    })

    expect(info.Main.Path).toBe('example.test/module')
    expect(info.Deps?.[0]).toBe(module)
    expect(info.Settings?.[0]?.Value).toBe('js')
    expect(ReadBuildInfo()).toEqual([null, false])
  })

  it('returns the previous runtime settings, which have no effect', () => {
    expect(SetGCPercent(50)).toBe(100)
    expect(SetGCPercent(100)).toBe(50)
    expect(SetMemoryLimit(1024n)).toBe(9223372036854775807n)
    expect(SetMemoryLimit(-1n)).toBe(1024n)
    expect(SetMaxStack(1 << 20)).toBe(1000000000)
    expect(SetMaxThreads(5)).toBe(10000)
    expect(SetPanicOnFault(true)).toBe(false)
    expect(SetPanicOnFault(false)).toBe(true)
    SetTraceback('all')
    FreeOSMemory()
  })
})

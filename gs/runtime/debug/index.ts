import * as $ from '@goscript/builtin/index.js'
import { writeHostStderrText } from '@goscript/builtin/hostio.js'

export class BuildSetting {
  public Key: string
  public Value: string

  constructor(init?: Partial<{ Key: string; Value: string }>) {
    this.Key = init?.Key ?? ''
    this.Value = init?.Value ?? ''
  }

  public clone(): BuildSetting {
    return $.markAsStructValue(
      new BuildSetting({ Key: this.Key, Value: this.Value }),
    )
  }
}

export class Module {
  public Path: string
  public Version: string
  public Sum: string
  public Replace: Module | $.VarRef<Module> | null

  constructor(
    init?: Partial<{
      Path: string
      Version: string
      Sum: string
      Replace: Module | $.VarRef<Module> | null
    }>,
  ) {
    this.Path = init?.Path ?? ''
    this.Version = init?.Version ?? ''
    this.Sum = init?.Sum ?? ''
    this.Replace = init?.Replace ?? null
  }

  public clone(): Module {
    return $.markAsStructValue(
      new Module({
        Path: this.Path,
        Version: this.Version,
        Sum: this.Sum,
        Replace: this.Replace,
      }),
    )
  }
}

export class BuildInfo {
  public GoVersion: string
  public Path: string
  public Main: Module
  public Deps: $.Slice<Module | $.VarRef<Module> | null>
  public Settings: $.Slice<BuildSetting>

  constructor(
    init?: Partial<{
      GoVersion: string
      Path: string
      Main: Module
      Deps: $.Slice<Module | $.VarRef<Module> | null>
      Settings: $.Slice<BuildSetting>
    }>,
  ) {
    this.GoVersion = init?.GoVersion ?? ''
    this.Path = init?.Path ?? ''
    this.Main = init?.Main ?? new Module()
    this.Deps = init?.Deps ?? null
    this.Settings = init?.Settings ?? null
  }

  public clone(): BuildInfo {
    return $.markAsStructValue(
      new BuildInfo({
        GoVersion: this.GoVersion,
        Path: this.Path,
        Main: this.Main.clone(),
        Deps: this.Deps,
        Settings: this.Settings,
      }),
    )
  }
}

export function Stack(): Uint8Array {
  const stack = new Error().stack ?? 'stack trace unavailable'
  return new TextEncoder().encode(stack)
}

export function PrintStack(): void {
  writeHostStderrText($.bytesToString(Stack()))
}

export function ReadBuildInfo(): [BuildInfo | null, boolean] {
  return [null, false]
}

// The settings below configure a Go runtime's collector, stacks and threads,
// which JavaScript hosts manage themselves, so they have no effect. Each still
// returns its previous setting, as in Go, starting from Go's defaults.
let gcPercent = 100
let memoryLimit = 9223372036854775807n
let maxStack = 1000000000
let maxThreads = 10000
let panicOnFault = false

// SetGCPercent sets the garbage collection target percentage.
export function SetGCPercent(percent: number): number {
  const previous = gcPercent
  gcPercent = percent
  return previous
}

// SetMemoryLimit sets the soft memory limit; a negative limit only reads it.
export function SetMemoryLimit(limit: bigint): bigint {
  const previous = memoryLimit
  if (limit >= 0n) {
    memoryLimit = limit
  }
  return previous
}

// SetMaxStack sets the maximum stack size of a goroutine.
export function SetMaxStack(bytes: number): number {
  const previous = maxStack
  maxStack = bytes
  return previous
}

// SetMaxThreads sets the maximum number of operating system threads.
export function SetMaxThreads(threads: number): number {
  const previous = maxThreads
  maxThreads = threads
  return previous
}

// SetPanicOnFault sets whether an unexpected fault address panics.
export function SetPanicOnFault(enabled: boolean): boolean {
  const previous = panicOnFault
  panicOnFault = enabled
  return previous
}

// SetTraceback sets how much a crash prints, which the host decides.
export function SetTraceback(_level: string): void {}

// FreeOSMemory forces a collection and returns memory to the system, which
// the host does on its own schedule.
export function FreeOSMemory(): void {}

export * from './stubs.gs.js'

// bench-gsbench runs the tests/bench/gsbench micro-benchmarks compiled by
// GoScript and compiled by Go to WebAssembly, and prints a table of their
// times sorted by the ratio of the two. See tests/bench/gsbench/README.md.
import { spawn } from 'node:child_process'
import { rm } from 'node:fs/promises'
import { delimiter, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

// Each target maps benchmark names to the fastest ns/op of their runs.
type Times = Map<string, number>

const usage = `usage: bun run scripts/bench-gsbench.ts [options]

  --bench REGEXP        benchmarks to run (default .)
  --benchtime D         time to run each benchmark (default 200ms)
  --count N             runs of each benchmark; the table has the fastest (default 1)
  --runtime R           GoScript runtime: browser or bun (default browser)
  --browser-channel C   installed browser for --runtime browser (default chrome;
                        empty for Playwright's Chromium)
  --goscript CMD        goscript command (default: go run ./cmd/goscript)
  --native              also run the benchmarks as native Go
`

// The options select the benchmarks, the runtimes and the goscript build.
const { values: opts } = parseArgs({
  options: {
    bench: { type: 'string', default: '.' },
    benchtime: { type: 'string', default: '200ms' },
    count: { type: 'string', default: '1' },
    runtime: { type: 'string', default: 'browser' },
    'browser-channel': { type: 'string', default: 'chrome' },
    goscript: { type: 'string', default: '' },
    native: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
})
if (opts.help) {
  process.stdout.write(usage)
  process.exit(0)
}

// The benchmarks run in the gsbench package directory, and GoScript writes
// its test workspace under the gitignored .tmp directory.
const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const pkgDir = join(repoRoot, 'tests', 'bench', 'gsbench')
const workDir = join(repoRoot, '.tmp', 'gsbench')
const benchArgs = [
  '-run',
  '^$',
  '-bench',
  opts.bench,
  '-benchtime',
  opts.benchtime,
]
const count = Number(opts.count)

// GoScript runs the benchmarks in a browser or in Bun.
const gsCommand =
  opts.goscript === '' ?
    ['go', 'run', './cmd/goscript']
  : opts.goscript.split(' ')
const gsArgs = [
  'test',
  '--workdir',
  workDir,
  '--timeout',
  '30m',
  '--dir',
  pkgDir,
]
if (opts.runtime === 'browser') {
  gsArgs.push('--browser')
  if (opts['browser-channel'] !== '') {
    gsArgs.push('--browser-channel', opts['browser-channel'])
  }
}
gsArgs.push(
  '--run',
  '^$',
  '--bench',
  opts.bench,
  '--benchtime',
  opts.benchtime,
  '--count',
  opts.count,
  '.',
)

// Go runs the WebAssembly test binary in Node with the go_js_wasm_exec
// script from its lib/wasm directory.
const goroot = (
  await run(['go', 'env', 'GOROOT'], repoRoot, process.env, false)
).trim()
const wasmEnv = {
  ...process.env,
  GOOS: 'js',
  GOARCH: 'wasm',
  PATH: join(goroot, 'lib', 'wasm') + delimiter + (process.env.PATH ?? ''),
}

// Each target runs in turn, so that they do not compete for the CPU.
await rm(workDir, { recursive: true, force: true })
const gsLabel =
  opts.runtime === 'browser' ?
    `goscript (${opts['browser-channel'] || 'chromium'})`
  : 'goscript (bun)'
const gs = parseTimes(
  await run([...gsCommand, ...gsArgs], repoRoot, process.env, true),
)
const wasm = parseTimes(
  await run(
    ['go', 'test', ...benchArgs, '-count', opts.count, '.'],
    pkgDir,
    wasmEnv,
    true,
  ),
)
let native: Times | null = null
if (opts.native) {
  native = parseTimes(
    await run(
      ['go', 'test', ...benchArgs, '-count', opts.count, '.'],
      pkgDir,
      process.env,
      true,
    ),
  )
}

process.stdout.write(formatTable(gsLabel, gs, wasm, native))

// run runs a command in dir and returns its standard output, copying the
// output to standard error as it arrives when echo is set.
async function run(
  cmd: string[],
  dir: string,
  env: NodeJS.ProcessEnv,
  echo: boolean,
): Promise<string> {
  // The child inherits standard error, and its standard output is collected.
  const child = spawn(cmd[0], cmd.slice(1), {
    cwd: dir,
    env,
    stdio: ['ignore', 'pipe', 'inherit'],
  })
  let out = ''
  child.stdout.setEncoding('utf8')
  child.stdout.on('data', (chunk: string) => {
    out += chunk
    if (echo) {
      process.stderr.write(chunk)
    }
  })

  // A failed command stops the comparison.
  const code = await new Promise<number | null>((resolve, reject) => {
    child.on('error', reject)
    child.on('close', resolve)
  })
  if (code !== 0) {
    throw new Error(`${cmd.join(' ')} exited with ${code}`)
  }
  return out
}

// parseTimes returns the fastest ns/op of each benchmark in go test -bench
// output, without the Benchmark prefix and the GOMAXPROCS suffix.
function parseTimes(out: string): Times {
  const times: Times = new Map()
  for (const line of out.split('\n')) {
    const m = /^Benchmark(\S+?)(?:-\d+)?\s+\d+\s+([0-9.]+) ns\/op/.exec(line)
    if (m === null) {
      continue
    }
    const prev = times.get(m[1])
    const ns = Number(m[2])
    times.set(m[1], prev === undefined ? ns : Math.min(prev, ns))
  }
  return times
}

// formatTable returns the table of times and ratios, sorted by the ratio of
// GoScript to WebAssembly time, slowest first, with their geometric mean.
function formatTable(
  gsLabel: string,
  gs: Times,
  wasm: Times,
  native: Times | null,
): string {
  // Only the benchmarks that ran under both targets have a ratio.
  const names = [...gs.keys()].filter((name) => wasm.has(name))
  const ratio = (name: string) => gs.get(name)! / wasm.get(name)!
  names.sort((a, b) => ratio(b) - ratio(a))
  const width = Math.max(9, ...names.map((name) => name.length))

  // The header names the targets and the settings.
  const lines = [
    `gsbench: ${gsLabel} vs Go wasm (node), ns/op, fastest of ${count} run(s), benchtime ${opts.benchtime}, ${new Date().toISOString()}`,
    '',
  ]
  let header =
    'benchmark'.padEnd(width) + 'goscript'.padStart(13) + 'wasm'.padStart(13)
  if (native !== null) {
    header += 'native'.padStart(13)
  }
  lines.push(
    header +
      'gs/wasm'.padStart(10) +
      (native !== null ?
        'gs/native'.padStart(11) + 'wasm/native'.padStart(13)
      : ''),
  )

  // Each benchmark has its times and ratios.
  for (const name of names) {
    let line =
      name.padEnd(width) +
      fmtNs(gs.get(name)!).padStart(13) +
      fmtNs(wasm.get(name)!).padStart(13)
    if (native !== null) {
      line += fmtNs(native.get(name) ?? NaN).padStart(13)
    }
    line += ratio(name).toFixed(2).padStart(10)
    if (native !== null) {
      const nativeNs = native.get(name) ?? NaN
      line += fmtRatio(gs.get(name)! / nativeNs).padStart(11)
      line += fmtRatio(wasm.get(name)! / nativeNs).padStart(13)
    }
    lines.push(line)
  }

  // The geometric mean summarizes the ratios, and missing benchmarks are named.
  const logSum = names.reduce((sum, name) => sum + Math.log(ratio(name)), 0)
  lines.push(
    '',
    `geomean gs/wasm: ${Math.exp(logSum / names.length).toFixed(2)} over ${names.length} benchmarks`,
  )

  // With native times, the geometric means against native are given too.
  if (native !== null) {
    const withNative = names.filter((name) => native.has(name))
    const geomean = (times: Times) =>
      Math.exp(
        withNative.reduce(
          (sum, name) => sum + Math.log(times.get(name)! / native.get(name)!),
          0,
        ) / withNative.length,
      ).toFixed(2)
    lines.push(
      `geomean gs/native: ${geomean(gs)}, wasm/native: ${geomean(wasm)} over ${withNative.length} benchmarks`,
    )
  }
  const missing = [...new Set([...gs.keys(), ...wasm.keys()])].filter(
    (name) => !gs.has(name) || !wasm.has(name),
  )
  if (missing.length > 0) {
    lines.push(`missing from one target: ${missing.join(' ')}`)
  }
  return lines.join('\n') + '\n'
}

// fmtRatio formats a ratio with two decimals, or a dash when a time is
// missing.
function fmtRatio(ratio: number): string {
  return Number.isNaN(ratio) ? '-' : ratio.toFixed(2)
}

// fmtNs formats a time in ns/op with about four significant digits.
function fmtNs(ns: number): string {
  if (Number.isNaN(ns)) {
    return '-'
  }
  return ns >= 1000 ?
      Math.round(ns).toString()
    : Number(ns.toPrecision(4)).toString()
}

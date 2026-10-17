# gsbench

gsbench is a suite of micro-benchmarks of basic Go language operations. It
compares Go compiled to TypeScript by GoScript and run in a browser (or Bun)
with the same Go compiled to WebAssembly by the Go toolchain and run in Node,
to find the language features that cost the most in GoScript output. It is an
ordinary Go package of `testing` benchmarks, so it runs unchanged as native Go,
as Go wasm, and under `goscript test --bench`.

The suite was written while profiling the Cogent Core GUI framework compiled by
GoScript, so some benchmarks mirror code from it, such as its text lexer and
its bit flag enums.

## What it covers

- `baseline_test.go`: Baseline benchmarks use only scalar types, operators,
  branches, loops and calls, which JavaScript represents directly, so their
  ratios compare the JavaScript and WebAssembly engines themselves.
- `ladder_test.go`: the Ladder starts from the baselines and adds one language
  feature at a time (struct values and pointers, pointers to variables and
  fields, value, pointer and interface methods, slices of structs, strings and
  runes, maps, multiple returns, closures, embedding, type assertions) up to
  `LadderLexLike`, a lexer-like rule matcher. Each rung does about 10000 basic
  steps, so the rung where the ratio jumps shows which feature costs the most.
  `LadderBitFlagHas` and `LadderBitFlagSet` test bit flags through an
  interface with `sync/atomic`, the way enumgen-generated bit flag types do.
- `bench_test.go`: single operations on structs, pointers, interfaces (calls,
  boxing, type switches and assertions), strings, slices, maps (string,
  struct and pointer keys), closures, `strings.Builder`, `fmt.Sprintf` and
  `sort.Slice`.
- `typed_test.go`: slices of fixed-size numbers, which GoScript holds in
  JavaScript typed arrays, used the way mesh and GPU code uses them.
- `rand_test.go`: `math/rand` and `math/rand/v2`, global and seeded sources,
  and a simulation-style random interface.
- `override_test.go`: pointer methods of types that GoScript implements by
  hand (`bytes.Buffer`, `strings.Builder`, `time.Time`).

## Running it

`scripts/bench-gsbench.ts` runs the suite under GoScript in Chrome and as Go
wasm in Node, one after the other, and prints a table sorted by the ratio of
the two times, slowest first:

```sh
bun run scripts/bench-gsbench.ts
bun run scripts/bench-gsbench.ts --bench Ladder --count 3 --native
```

By default it builds goscript from this checkout with `go run ./cmd/goscript`;
`--goscript PATH` uses another build, so that two compiler versions can be
compared. `--runtime bun` runs GoScript in Bun, `--browser-channel ''` uses
Playwright's Chromium instead of an installed Chrome, `--count N` keeps the
fastest of N runs, and `--native` adds a native Go column with the gs/native and
wasm/native ratios and their geometric means. Run it with `-h` for all options.

Each target can also be run by hand from this directory:

```sh
# Native Go.
go test -run '^$' -bench . -benchtime 200ms

# Go wasm in Node, with go_js_wasm_exec on PATH.
PATH="$(go env GOROOT)/lib/wasm:$PATH" GOOS=js GOARCH=wasm go test -run '^$' -bench . -benchtime 200ms

# GoScript in Chrome (omit --browser for Bun).
go run ../../../cmd/goscript test --browser --browser-channel chrome --run '^$' --bench . --benchtime 200ms .
```

The package has no tests, so `go test ./...` only builds it.

## Reading the results

The `gs/wasm` column is GoScript time divided by Go wasm time: 1.0 means
GoScript output is as fast as WebAssembly, 3.0 means it takes three times as
long, and below 1.0 means it is faster. Ratios below 1.0 are common for scalar
code, calls and strings, which JavaScript engines optimize well. The baselines
show the ratio for code that maps directly to JavaScript; a benchmark well
above them uses a feature that GoScript output pays extra for.
[docs/performance.md](../../../docs/performance.md) explains the main sources
of those costs, such as assignment copies, pointers into values, slice windows
and value map keys. The geometric mean summarizes a run, but individual ratios
say more.

The times are noisy. Run the suite on a quiet machine (no builds, test runs or
busy browser tabs), use `--count` to keep the fastest of several runs, and
compare results only within one session: browser, Node and CPU frequency
changes between sessions move the times more than many compiler changes do.

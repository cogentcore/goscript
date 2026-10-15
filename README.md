<div align="center">
  <h3>GoScript: a Go to TypeScript compiler</h3>

  <p>
    Your Go code runs anywhere TypeScript runs: Node, Bun, and the browser.
  </p>

  <div align="center">
    <img src="./docs/assets/readme-transpile-demo.svg?cachebuster=4" alt="GoScript side-by-side Go source and generated TypeScript output showing a channel send, goroutine scheduling, and awaited channel receive." />
  </div>

  <p>
    <a href="https://pkg.go.dev/github.com/s4wave/goscript"><img src="https://pkg.go.dev/badge/github.com/s4wave/goscript.svg" alt="Go Reference" /></a>
    <a href="https://deepwiki.com/s4wave/goscript"><img src="https://img.shields.io/badge/DeepWiki-Ask-blue" alt="Ask DeepWiki" /></a>
  </p>

</div>

GoScript compiles Go packages into readable TypeScript modules. Write your
program in Go, with its standard library, its package ecosystem, and its
concurrency, and run it in any web browser, in Node, or in Bun.
Goroutines, channels, `select`, `defer`, pointers, and struct copies behave as
they do in Go, and the output is ordinary TypeScript you can import, bundle,
and step through in a debugger.

```bash
go install github.com/s4wave/goscript/cmd/goscript@latest
goscript compile --package . --output ./output
```

## Why GoScript

Go gives you a strong standard library, a large ecosystem of packages, simple
modules, and concurrency built into the language. GoScript brings all of it to
the browser without a WebAssembly runtime. The compiled program is plain
TypeScript, a fraction of the size of the same program built for WebAssembly:

| Program                              | GoScript | Go WebAssembly | Smaller by |
| ------------------------------------ | -------: | -------------: | ---------: |
| Hello world with `fmt`               |    47 KB |         543 KB |        12x |
| `encoding/json`, `sort`, `strings`   |    71 KB |         904 KB |        13x |
| Spacewave browser core, with go-git  |   3.7 MB |        14.4 MB |         4x |

Sizes are Brotli-compressed. The GoScript output is bundled with Bun and
minified with oxc. The WebAssembly builds use Go 1.27.1 with
`-trimpath -ldflags='-s -w'` and exclude the 17 KB `wasm_exec.js` loader.

Blocking Go code meets JavaScript through standard `async` and `await`. A Go
function that can block compiles to an `async` function, so TypeScript calls it
with `await`, and a `js.FuncOf` callback that blocks returns a Promise to its
JavaScript caller. Goroutines run as async tasks on the event loop, beside the
rest of the page.

Generated code also runs on the engine's own garbage collector and JIT. Go
values are ordinary JavaScript objects, so the engine optimizes the hot paths
and collects what the program drops. A Go WebAssembly program runs its own
collector inside linear memory, which can grow but never shrinks, so the page
keeps its peak heap until it reloads.

Use GoScript when Go is the source of truth and part of your product runs in a
TypeScript runtime: shared validation and business rules, TypeScript packages
published from Go code, or a Go application running in the browser without a
rewrite.

GoScript is built against [Spacewave](https://github.com/s4wave/spacewave), a
large Go and TypeScript application framework. Spacewave compiles its browser
core through GoScript, including go-git and the go-mysql-server SQL engine, and
runs its core package tests through `goscript test` in CI.

[GopherJS](https://github.com/gopherjs/gopherjs) shares the goal of running Go
in JavaScript and ships its own goroutine scheduler. GoScript emits readable
TypeScript modules and maps goroutines onto JavaScript async functions.

## Install

GoScript needs the Go toolchain. Install the CLI with Go:

```bash
go install github.com/s4wave/goscript/cmd/goscript@latest
```

Or add it to a JavaScript project. The npm package runs the same compiler
through your local Go toolchain and adds the TypeScript API:

```bash
bun add -d goscript
```

[Bun](https://bun.sh) runs generated code directly. For Node and browsers,
bundle it with a bundler that resolves `tsconfig.json` paths, such as Bun,
Vite, or esbuild.

## Quick Start

Write a Go program:

```go
// main.go
package main

import "fmt"

type Greeter struct{ Name string }

func (g Greeter) Greet() string { return "Hello, " + g.Name + "!" }

func main() {
	ch := make(chan string)
	go func() { ch <- Greeter{Name: "GoScript"}.Greet() }()
	fmt.Println(<-ch)
}
```

Compile it from the module directory. GoScript also emits the packages it
imports, here `fmt`, so the output runs on its own:

```bash
goscript compile --package . --output ./output
```

Point `@goscript/*` imports at the output in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": { "@goscript/*": ["./output/@goscript/*"] }
  }
}
```

Run it:

```bash
$ bun run output/@goscript/example.com/hello/main.gs.ts
Hello, GoScript!
```

Each Go package becomes a directory under `output/@goscript/`, named by its
import path, with one `.gs.ts` file per Go file and an `index.ts` that exports
the package. A `package main` runs directly; any other package is a module you
import:

```ts
import { NewUser } from '@goscript/example.com/my/module/index.js'
```

[docs/typescript.md](./docs/typescript.md) has the full `tsconfig.json` for
typechecking and bundling generated code.

## Usage

### Compile packages

```bash
goscript compile --package ./pkg/... --output ./output
```

`--package` takes any Go package pattern and repeats. GoScript compiles the
requested packages and every package they import. `--skip-dependencies` emits
only the requested packages and the runtime, for builds that compile
dependencies separately.
[docs/cli.md](./docs/cli.md) lists every option.

### Run Go tests

`goscript test` compiles a package's Go tests to TypeScript and runs them with
Bun, or in Chromium with `--browser`. The output follows `go test`:

```bash
goscript test --tags goscript ./...
```

### Compile from TypeScript

```ts
import { compile } from 'goscript'

await compile({
  pkg: '.',
  output: './output',
  dir: process.cwd(),
})
```

### Compile from Go

```go
comp, err := compiler.NewCompiler(&compiler.Config{
	Dir:        ".",
	OutputPath: "./output",
}, nil, nil)
if err != nil {
	return err
}
_, err = comp.CompilePackages(ctx, ".")
```

### Compile in the browser

`github.com/s4wave/goscript/compiler/wasm` builds to WebAssembly and compiles a
single Go source file to TypeScript in the page. It accepts files without
imports; the [website playground](./website) uses it.

```go
ts, err := wasm.CompileSource(src, "main")
```

## Features

- **Go language:** structs, interfaces, generics, closures, slices, maps, and value copies.
- **Pointers:** `&x`, pointers to pointers, and pointer receivers behave as in Go.
- **Concurrency:** goroutines, channels, `select`, `sync`, `defer`, `panic`, and `recover`.
- **Exact integers:** `int64` and `uint64` compile to `bigint` and wrap like Go.
- **Control flow:** `goto`, labels, type switches, and `range` over iterator functions.
- **Standard library:** `fmt`, `strings`, `sync`, `time`, `encoding/json`, `crypto`, and more.
- **Third-party packages:** go-git, klauspost/compress, blake3, protobuf-go-lite, and more.
- **Go tests:** `goscript test` runs your Go tests on the output in Bun or Chromium.
- **Large programs:** GoScript compiles Spacewave's browser core, including go-git.
- **Async interop:** blocking Go functions compile to `async` functions that TypeScript awaits.
- **In the browser:** the compiler itself runs in the page through WebAssembly.

## How It Works

```text
Go packages -> type check -> semantic model -> lowered IR -> TypeScript
                                                         + runtime + overrides
```

GoScript loads packages with the Go toolchain and type-checks them. It then
decides which variables need a pointer box, which functions must become
`async`, and how each type maps to TypeScript, before it writes any text. The
emitter renders the result, and the compiler copies the
[`@goscript/builtin`](./gs/builtin) runtime and any handwritten
[overrides](./gs/README.md) for packages such as `sync`, `os`, and `reflect`.

A function that can block on a channel, `select`, or a lock becomes `async`,
and so does every function that calls it. Goroutines run as async tasks on the
JavaScript event loop, and no WebAssembly runtime ships with your code.

[docs/explainer.md](./docs/explainer.md) walks through each stage with
generated output for structs, pointers, channels, and `defer`.

## Limitations

GoScript compiles most Go code as written. These are the known gaps:

- **Inputs:** the CLI and APIs take package patterns, not individual `.go` files.
- **Browser compiler:** compiles a single file without imports. Use the CLI for real packages.
- **`unsafe` and cgo:** cgo is unsupported, and `unsafe.Sizeof` and pointer conversions throw.
- **`int`:** a JavaScript number. It loses precision past 2^53 and does not wrap at 64 bits.
- **Standard library:** a package works when GoScript overrides it or it compiles from Go source.
- **Host APIs:** sockets, processes, and plugins work only as far as the JavaScript host allows.
- **`reflect`:** covers types, values, struct fields, maps, `MakeFunc`, and `DeepEqual`, not all.
- **`goscript test`:** supports a subset of `testing` and of the `go test` flags.
- **Speed:** async calls and `bigint` math cost more than synchronous code on plain numbers.

Use `int64` or `uint64` where a value needs exact 64-bit arithmetic: both
compile to `bigint` and wrap as in Go.

## Development

```bash
bun install
bun run test
bun run lint
bun run build
```

`bun run example` compiles and runs [example/simple](./example/simple).
`bun run website:build` builds the website and playground.
[example/app](./example/app) is a full-stack application built on generated
TypeScript.

The [compliance tests](./tests/README.md) under [tests/tests](./tests/tests)
are Go programs compiled, typechecked, and run against expected output.

## Contributing

To fix a missing Go behavior, add a focused compiler or compliance test that
reproduces it, then implement the behavior in the compiler or runtime stage
responsible for it.

Open an issue for Go code GoScript cannot compile, runtime gaps, and missing
standard-library overrides.

## License

MIT

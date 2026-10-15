# GoScript Async Interface Compatibility Design

## Overview

GoScript addresses a fundamental impedance mismatch between Go's synchronous-appearing concurrency model and TypeScript's explicit async/await model. This document describes how GoScript determines when TypeScript interfaces should have async methods based on actual implementation requirements.

## Problem Statement

### The Core Challenge

**Go's model**: All operations appear synchronous to the programmer - goroutines block transparently when encountering channel operations or async system calls.

**TypeScript's model**: Async operations must explicitly return Promises and use await syntax.

This creates an interface compatibility problem:

```go
// Go interface - appears synchronous
type Locker interface {
    Lock()   // may block goroutine waiting for mutex
    Unlock() // immediate operation
}
```

Without proper analysis, this generates inconsistent TypeScript:

```typescript
// PROBLEMATIC: Methods have different async requirements
export interface Locker {
  Lock(): Promise<void>    // async because sync.Mutex.Lock() uses Promises
  Unlock(): void          // sync because it's immediate
}

// Implementations become incompatible:
class FastLocker implements Locker {
  Lock(): void { /* immediate */ }     // ❌ Type error - doesn't return Promise
  Unlock(): void { /* immediate */ }   // ✅ OK
}
```

### Requirements

1. **Type Safety**: All implementations must be compatible with generated interfaces
2. **Correctness**: Interface method signatures must reflect actual async needs
3. **Granularity**: Per-method analysis (not all-or-nothing per interface)
4. **Cross-Package**: Support for external package implementations

## Solution Architecture

### Core Principle

**"Interface method async status is determined by analyzing all known implementations"**

If ANY implementation of an interface method requires async behavior (due to channel operations, async calls, etc.), then:
1. The interface method becomes async (returns Promise)
2. All implementations are forced to be async-compatible

### Open and Closed Interfaces

The rule above applies only where every implementation is known. The current
compiler (`compiler/semantic-model.go`, `compiler/semantic-whole-program.go`)
distinguishes:

- **Package-sealed interfaces** (with an unexported method): every
  implementation is in the compiled graph, so the implementations color the
  methods.
- **Closed exported interfaces**, in a whole-program build (the requested
  packages are main packages and their dependencies, or a test binary): an
  exported, non-generic interface whose implementations are all compiled Go
  methods with bodies, or methods of other closed interfaces (embedded
  interface fields). No type of a hand-written override package may
  implement it, and no interface that an override package declares or
  exposes in its API may have all of its methods, since override values are
  TypeScript objects whose methods may suspend without metadata saying so.
- **Open interfaces**: every other interface. A call of an open interface
  method makes its caller async, but the method itself stays sync unless a
  compiled implementation is async.

A library build keeps every exported interface open
(`SemanticBuildOptions.WholeProgram` false).

### Calls Through Function Values

A call through a function value (a variable, field, parameter, element, call
result or type assertion of func type) is colored by the function values the
program takes (`compiler/semantic-func-values.go`,
`compiler/semantic-func-classes.go`, `compiler/semantic-func-shape.go`):

- The values are declared functions and methods named outside a call,
  method values and method expressions (including interface methods),
  function literals, and the body of each range-over-func loop, which is the
  yield callback.
- Calls and values are grouped by the shape of their underlying signature.
  Each called shape is a class with a synthetic key; a call through a value
  is a call of its class, and a class is async when a value whose shape
  matches is async. A type parameter matches any type, so calls and values
  in generic code match conservatively.
- Function literals and the initializers of lazily initialized package
  variables are nodes of the analysis like declared functions. A literal is
  lowered async exactly when the analysis colors it async. A function that
  reads a lazily initialized variable waits for its initializer.
- Function values from override packages (function results, func-typed
  fields and variables, and the callbacks an override passes to Go
  functions) suspend only by calling the Go functions they were given: their
  own function parameters and those of the function that produced them.
- A func type asserted from an interface value keeps its classes async when
  the program uses a function that override metadata lists in
  `funcValueMakers` (`reflect.MakeFunc`, `reflect.Value.MethodByName`),
  since reflection can make a function of any type.
- The iteration reaches one fixed point with the interface coloring: an async
  implementation can make a function value async and the reverse.

A library build keeps every class async. A call through a value of a sync
class is not awaited, and its result is asserted to its Go type, since the
TypeScript type of a function value admits a promise.

### Conditionally Async Overrides

Override metadata can make a function, a method or an interface method async
only in a program with an async compiled method of given names
(`asyncWhenMethods` in `meta.json`, keyed by a function name or
`Type.Method`, with `builtin` holding universe objects):

- The fmt print functions (`Sprint*`, `Print*`, `Append*`) depend on
  `Error`, `Format`, `GoString` and `String`, the methods they may call. They
  return a plain value when every operand renders synchronously. `Fprint*`
  stay async, since they write to an `io.Writer`.
- Override error types whose `Error` wraps another error's (`strconv.NumError`,
  `fs.PathError`, `os.LinkError`, `os.SyscallError`, `scanner.ErrorList`,
  `pkg/errors`, `cryptobyte.BuildError`) depend on the same names.
- `error.Error` (in `gs/builtin/meta.json`) depends on the same names: the
  error values override packages produce suspend only by formatting operands
  or wrapping other errors. In a whole program, `error` is therefore closed:
  a call of `Error` suspends only where a compiled method of one of those
  names is async, or an override method of one is marked async.

A call of such a target that the program leaves sync is not awaited, and its
result is asserted to its Go type, since its TypeScript type admits a
promise.

### Reporting Async Roots

`-report-async` (`CompileRequest.ReportAsync`) reports where the async
functions of a program come from, without changing the output
(`compiler/semantic-async-report.go`, `compiler/async-report.go`). Every mark
of the coloring is made at a root or along one edge from the mark being
propagated, so the coloring records the roots and every edge, including
edges to functions already async. The report lists each root with its kind
and cause, its spread (the functions it reaches in that graph, by package),
the functions only it reaches (its subtree in the dominator tree, with a
source above every root), and one chain of marks to `main`. It sums the roots
by kind and lists the classes and interface methods that one async value or
implementation made async. A reporting build checks every body and does not
replay the program from the cache, since body summaries do not keep causes.

### Implementation Analysis Flow

```
1. Control Flow Analysis
   ├── Detect async operations (channels, async calls)
   ├── Mark functions as async/sync based on body analysis
   └── Store results in Analysis.FunctionData

2. Interface Implementation Tracking  
   ├── Find all interface declarations
   ├── Locate struct types implementing each interface
   ├── Map interface methods to struct implementations
   └── Store in Analysis.InterfaceImplementations

3. Interface Method Resolution
   ├── For each interface method, check all implementations
   ├── If ANY implementation is async → interface method is async
   ├── Cache results in Analysis.InterfaceMethodAsyncStatus
   └── Force sync implementations to be async-compatible

4. Code Generation
   ├── Generate interfaces with resolved async status
   ├── Generate struct methods with consistency checking
   └── Ensure implementation compatibility
```

## Implementation Details

### Data Structures

```go
type Analysis struct {
    // Track which struct types implement which interface methods
    InterfaceImplementations map[InterfaceMethodKey][]ImplementationInfo
    
    // Cache resolved async status for interface methods  
    InterfaceMethodAsyncStatus map[InterfaceMethodKey]bool
    
    // Existing function async analysis
    FunctionData map[types.Object]*FunctionInfo
    
    // Cross-package support
    AllPackages map[string]*packages.Package
}

type InterfaceMethodKey struct {
    InterfaceType string // String representation of interface type
    MethodName    string // Method name (e.g., "Lock")
}

type ImplementationInfo struct {
    StructType    *types.Named // The implementing struct type
    Method        *types.Func  // The method object
    IsAsyncByFlow bool         // Whether this implementation requires async
}
```

### Analysis Process

#### Phase 1: Control Flow Analysis

```go
func (v *analysisVisitor) containsAsyncOperations(node ast.Node) bool {
    // Detect:
    // - Channel operations: ch <- value, <-ch
    // - Calls to known async functions
    // - Method calls on async types (sync.Mutex.Lock, etc.)
    // - Context-based operations
}
```

#### Phase 2: Implementation Discovery

```go
func (v *interfaceImplementationVisitor) Visit(node ast.Node) ast.Visitor {
    switch n := node.(type) {
    case *ast.GenDecl:
        // Find interface declarations
        for _, spec := range n.Specs {
            if typeSpec, ok := spec.(*ast.TypeSpec); ok {
                if interfaceType, ok := typeSpec.Type.(*ast.InterfaceType); ok {
                    v.findInterfaceImplementations(typeSpec, interfaceType)
                }
            }
        }
    }
}
```

Implementation discovery includes:
- **Type assertions**: `obj.(SomeInterface)` 
- **Interface assignments**: `var locker Locker = &myStruct{}`
- **Cross-package analysis**: Scanning all loaded packages

#### Phase 3: Async Status Resolution

```go
func (a *Analysis) IsInterfaceMethodAsync(interfaceType *types.Interface, methodName string) bool {
    key := InterfaceMethodKey{
        InterfaceType: interfaceType.String(),
        MethodName:    methodName,
    }
    
    // Check cache first
    if result, exists := a.InterfaceMethodAsyncStatus[key]; exists {
        return result
    }
    
    // Find all implementations
    implementations := a.InterfaceImplementations[key]
    
    // If ANY implementation is async, interface method is async
    for _, impl := range implementations {
        if impl.IsAsyncByFlow {
            a.InterfaceMethodAsyncStatus[key] = true
            return true
        }
    }
    
    a.InterfaceMethodAsyncStatus[key] = false
    return false
}
```

### Code Generation Integration

#### Interface Lowering

```go
func (o *LoweringOwner) tsMethodSignature(ctx lowerFileContext, method *types.Func) string {
    signature, _ := method.Type().(*types.Signature)
    if signature == nil {
        return method.Name() + "(): unknown"
    }
    async := o.functionAsync(ctx, method)
    return method.Name() + "(" + tsSignatureParams(signature) + "): " +
        asyncResultType(tsSignatureResult(signature), async)
}
```

#### Struct Method Lowering

```go
func (o *LoweringOwner) lowerFuncDecl(ctx lowerFileContext, decl *ast.FuncDecl) (*loweredFunction, []Diagnostic) {
    // SemanticModelOwner colors functions and interface-compatible methods
    // before lowering. Lowering records the final async status in IR; the
    // emitter only renders that decision.
    fnObj := ctx.pkg.TypesInfo.Defs[decl.Name].(*types.Func)
    async := ctx.model.functions[fnObj] != nil && ctx.model.functions[fnObj].async
    lowered := &loweredFunction{async: async}
    _ = lowered
}
```

## Examples

### Example 1: Consistent Async Interface

```go
// Input Go code
type Locker interface {
    Lock()
    Unlock()
}

type SyncMutex struct{}
func (m *SyncMutex) Lock()   { /* immediate */ }
func (m *SyncMutex) Unlock() { /* immediate */ }

type AsyncMutex struct{}
func (m *AsyncMutex) Lock()   { /* channel operation - detected as async */ }
func (m *AsyncMutex) Unlock() { /* immediate */ }
```

```typescript
// Generated TypeScript - consistent interface
export interface Locker {
  Lock(): Promise<void>    // ✅ ASYNC - because AsyncMutex.Lock() needs it
  Unlock(): void          // ✅ SYNC - all implementations are sync
}

class SyncMutex implements Locker {
  async Lock(): Promise<void> { /* forced async for compatibility */ }
  Unlock(): void { /* immediate */ }
}

class AsyncMutex implements Locker {
  async Lock(): Promise<void> { /* naturally async */ }
  Unlock(): void { /* immediate */ }
}
```

### Example 2: Cross-Package Implementation

```go
// Package A: interface definition
package a
type Writer interface {
    Write(data []byte) error
}

// Package B: sync implementation  
package b
type FileWriter struct{}
func (w *FileWriter) Write(data []byte) error { /* immediate */ }

// Package C: async implementation
package c  
type NetworkWriter struct{}
func (w *NetworkWriter) Write(data []byte) error { /* channel ops */ }
```

GoScript analyzes ALL packages and determines:
- `NetworkWriter.Write()` requires async (channel operations)
- Therefore `Writer.Write()` interface method becomes async
- `FileWriter.Write()` forced to be async-compatible

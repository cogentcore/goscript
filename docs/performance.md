# Performance

GoScript compiles Go structs to TypeScript classes, stores them in plain
JavaScript arrays and `Map`s, and calls their methods directly. Most of what
it emits runs as fast as handwritten JavaScript: field access, method calls,
loops, closures and control flow are often faster than the same Go code
compiled to WebAssembly.

The remaining overhead comes from one difference. A JavaScript object behaves
like a Go pointer, not like a Go value. Wherever a Go program relies on value
semantics, GoScript has to add something to keep Go's behavior. This document
lists the six places where that happens, what GoScript does about each, and
how GopherJS and Go's own WebAssembly port handle the same problem. Most of
the compiler's optimization work consists of proving, case by case, that a
program cannot observe the difference, so that the extra work can be left out.

1. [Assignment copies](#1-assignment-copies)
2. [Pointers into values](#2-pointers-into-values)
3. [Slices are windows](#3-slices-are-windows)
4. [Map keys compare by value](#4-map-keys-compare-by-value)
5. [Interfaces carry a dynamic type](#5-interfaces-carry-a-dynamic-type)
6. [Integer and float widths](#6-integer-and-float-widths)
7. [What remains](#what-remains)

## 1. Assignment copies

In Go, `b := a` for a struct makes an independent copy, so changing `b.Min.X`
leaves `a` alone. In JavaScript, `b = a` makes both names refer to the same
object. GoScript therefore clones a struct value when it is assigned, passed by
value, returned, stored in a slice or map, or appended. A struct with nested
struct fields is one object per level, so a copy allocates once per level.

GoScript leaves a copy out when the compiler can prove that no code can tell
the difference:

- a parameter or receiver that the function only reads is passed without a
  copy;
- the last use of a local struct moves it instead of copying it;
- a range value that the loop body does not change shares the element;
- a function that returns a parameter it only reads lets the caller borrow
  the result when the caller does not change it;
- call results and map lookups are already fresh values.

When a copy is needed, it goes through a positional constructor and a
field-by-field `clone`, which V8 can inline. Where V8 can also prove that the
copy does not escape, it removes the allocation entirely.

**GopherJS** represents struct values the same way, as objects with a
positional constructor, and copies them with `$clone`, which makes a zero
value and copies the fields through a generic per-type `copy` loop. It leaves
the copy out only for `x := T{...}` with a composite literal.

**WebAssembly** keeps a struct value inline in linear memory, on the stack or
inside its containing value, so a copy is a short memory move with no
allocation, and the garbage collector never sees it.

## 2. Pointers into values

Go can take the address of a struct field, an array element or a slice
element, `p := &s.f` or `q := &a[3]`, and the pointer stays a live view of that
storage. JavaScript has no pointer to a property or to an array slot.

GoScript represents the pointer to a struct as the struct object itself, and a
pointer to a variable as a `VarRef` box. A pointer to a field or an element is
a small reference object with a getter and a setter. Two consequences follow:

- writing a new value into a slot that has outstanding pointers must update the
  existing object in place rather than replacing it, so `copy` and element
  assignment of struct elements copy into the existing element;
- each `&s[i]` creates a new reference object, so pointer equality compares
  the storage and index that the references refer to, not the reference
  objects.

GoScript passes a short-lived reference without caching it when the callee
only dereferences the pointer, and compares pointers directly with `===` until
a program creates a view whose identity differs from its target.

**GopherJS** uses the same model. A struct pointer is the object, and a field
pointer is a `ptrType` object with a getter and a setter, which GopherJS caches
on the target object (`$ptr_f`) so that taking the address twice gives the same
pointer. Element pointers are cached the same way, by index on the array.

**WebAssembly** pointers are addresses in linear memory, so taking an address is
free and pointer equality is integer comparison.

## 3. Slices are windows

A Go slice is a window over a shared backing array: `t := s[2:5]` aliases `s`,
`append` reallocates only when capacity runs out, and writes through `t` show
up in `s`. A JavaScript array has no offset and no capacity.

GoScript uses the plain array as the slice when the slice covers the whole
array, and otherwise a small slice object that holds the backing array, offset,
length and capacity, so each subslice allocates a header. Slices of the
8-, 16- and 32-bit integer types, `float32` and `float64` are backed by typed
arrays, as `[]byte` already is, which also lets their memory be
viewed as bytes without a copy for GPU uploads and other JavaScript APIs.
Loops over a slice read its backing array and offset once, and constant
subslices of read-only package tables are created once.

**GopherJS** represents every slice as a `$Slice` object with `$array`,
`$offset`, `$length` and `$capacity`, with typed arrays for numeric element
types.

**WebAssembly** passes a slice as a pointer, length and capacity, by value in
registers or on the stack, so a subslice allocates nothing.

## 4. Map keys compare by value

In Go, two different `Point{1, 2}` values are the same map key. A JavaScript
`Map` compares objects by identity, so a lookup with a new `Point` would miss.

GoScript uses JavaScript keys directly for strings, numbers, booleans and
pointers, which makes those maps as fast as JavaScript maps. For a struct,
array or interface key, it computes a key from the values of the fields and
then checks the entries with that key for Go equality, so each lookup builds
that key.

**GopherJS** computes a string key for every non-primitive key type with the
type's `keyFor` function, which joins the keys of the fields.

**WebAssembly** uses Go's runtime hash map, which hashes the key bytes (or
calls a type-specific hash function) in place, without building a key.

## 5. Interfaces carry a dynamic type

`var x any = T{}` and `var x any = &T{}` must stay distinguishable, and
`x.(Stringer)` must check the method set of the dynamic type: a `T` value has
only the methods with value receivers, while `*T` also has those with pointer
receivers. A JavaScript object only knows which methods its class has.

GoScript boxes a value with its Go type when it is converted to an interface,
using a per-class box whose prototype carries the type so that boxing is a
single allocation. Type assertions and type switches look the dynamic type up
and cache the outcome per type, and a type switch remembers which case
matched for each dynamic type it has seen.

**GopherJS** wraps non-pointer values of named types in an instance of the
type's wrapper constructor (`new T(v)`, holding the value in `$val`), and
checks assertions against the method set recorded for the type, caching which
types implement each interface.

**WebAssembly** represents an interface as a pair of a type or method table
pointer and a data pointer. An assertion to a concrete type compares pointers,
and an assertion to an interface looks up a cached method table.

## 6. Integer and float widths

Go's `int32`, `uint8` and `float32` wrap or round on every operation, and its
64-bit integers need 64-bit arithmetic. JavaScript has only 64-bit floats.

GoScript keeps narrow integers as numbers and wraps them with `| 0`, `>>> 0`
and masks, rounds `float32` results with `Math.fround`, and leaves out
conversions that cannot change a value. `int` and `uint` are JavaScript
numbers, exact up to 2^53, and `int64` and `uint64` are `bigint`s, with helpers
that use `BigInt.asIntN` and lookup tables for common shifts. Code that does
heavy 64-bit arithmetic, such as random number generators, is written in the
overrides with pairs of 32-bit words instead.

**GopherJS** makes `int` 32 bits wide, represents `int64` and `uint64` as
objects with `$high` and `$low` 32-bit halves, and rounds `float32` with
`Math.fround`.

**WebAssembly** has native `i32`, `i64` and `f32` instructions, so every width
costs the same as on a native target.

## What remains

After the extra work that a program cannot observe is left out, what remains
is:

- an allocation for each struct value that really must be copied, and one per
  nested struct field;
- a header object for each subslice;
- a key built for each lookup in a map with struct, array or interface keys;
- a box for each conversion of a value to an interface;
- `Math.fround` and integer wrapping where results can overflow.

Removing these would mean not using JavaScript objects for Go values at all,
and laying them out in one typed-array heap instead, as WebAssembly does. That
amounts to compiling to WebAssembly again, and gives up what makes JavaScript
output worth having: values that JavaScript code and the DOM can use directly,
a garbage collector shared with the rest of the page, and a smaller memory
footprint for pointer-heavy programs such as widget trees.

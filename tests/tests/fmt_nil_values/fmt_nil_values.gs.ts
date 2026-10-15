// Generated file based on fmt_nil_values.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export type Line = $.Slice<T>

$.registerNamedType("main.Line", /* @__PURE__ */ $.sliceType("main.T"));

export type Ints = $.Slice<number>

$.registerNamedType("main.Ints", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

export type Bytes = $.Slice<number>

$.registerNamedType("main.Bytes", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")));

export type M = globalThis.Map<string, number> | null

$.registerNamedType("main.M", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")));

export class T {
	public declare A: number

	constructor(__goscriptValue?: boolean, A$?: number) {
		this.A = A$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): T {
		return new T(true, this.A)
	}

	public __goscriptAssign(source: T): this {
		this.A = source.A
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [],
		T,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let l: Line = null! as Line
	let i: Ints = null! as Ints
	let b: Bytes = null! as Bytes
	let s: $.Slice<T> = null! as $.Slice<T>
	let m: M = null! as M
	let p: T | $.VarRef<T> | null = null! as T | $.VarRef<T> | null

	// Print and Sprint format a nil slice or map as an empty one, as %v
	// does.
	fmt.Println((fmt.Sprint($.interfaceValue(l, "main.Line", /* @__PURE__ */ $.sliceType("main.T", "main.Line"))) as string), (fmt.Sprint($.interfaceValue(i, "main.Ints", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.Ints"))) as string), (fmt.Sprint($.interfaceValue(b, "main.Bytes", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "main.Bytes"))) as string), (fmt.Sprint($.interfaceValue(s, "[]main.T", /* @__PURE__ */ $.sliceType("main.T"))) as string), (fmt.Sprint($.interfaceValue(m, "main.M", "main.M")) as string))
	fmt.Println($.interfaceValue(l, "main.Line", /* @__PURE__ */ $.sliceType("main.T", "main.Line")), $.interfaceValue(i, "main.Ints", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.Ints")), $.interfaceValue(s, "[]main.T", /* @__PURE__ */ $.sliceType("main.T")), $.interfaceValue(m, "main.M", "main.M"), $.interfaceValue(p, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	fmt.Printf("%v %v %v %+v|%d|%s\n", $.interfaceValue(l, "main.Line", /* @__PURE__ */ $.sliceType("main.T", "main.Line")), $.interfaceValue(i, "main.Ints", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.Ints")), $.interfaceValue(b, "main.Bytes", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "main.Bytes")), $.interfaceValue(l, "main.Line", /* @__PURE__ */ $.sliceType("main.T", "main.Line")), $.interfaceValue(i, "main.Ints", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.Ints")), $.interfaceValue(b, "main.Bytes", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "main.Bytes")))

	// %#v spells the type of a nil slice, map or pointer.
	fmt.Printf("%#v %#v %#v %#v %#v\n", $.interfaceValue(l, "main.Line", /* @__PURE__ */ $.sliceType("main.T", "main.Line")), $.interfaceValue(i, "main.Ints", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.Ints")), $.interfaceValue(s, "[]main.T", /* @__PURE__ */ $.sliceType("main.T")), $.interfaceValue(m, "main.M", "main.M"), $.interfaceValue(p, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))
	fmt.Printf("%#v %#v\n", $.interfaceValue(b, "main.Bytes", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "main.Bytes")), $.interfaceValue(null, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))

	// The same holds in an interface and in a struct field.
	let a: any = $.interfaceValue(l, "main.Line", /* @__PURE__ */ $.sliceType("main.T", "main.Line"))
	fmt.Println(a, (fmt.Sprint(a) as string), (fmt.Sprintf("%#v", a) as string))
	let x = $.anonymousStructValue({L: (null as Line)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("L", /* @__PURE__ */ $.sliceType("main.T", "main.Line"), [0], 0, true)] })
	fmt.Printf("%v %+v\n", $.interfaceValue($.markAsStructValue($.cloneStructValue(x)), "struct{L main.Line}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("L", /* @__PURE__ */ $.sliceType("main.T", "main.Line"), [0], 0, true)] }), $.interfaceValue($.markAsStructValue($.cloneStructValue(x)), "struct{L main.Line}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("L", /* @__PURE__ */ $.sliceType("main.T", "main.Line"), [0], 0, true)] }))
}

if ($.isMainScript(import.meta)) {
	await main()
}

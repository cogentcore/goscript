// Generated file based on ast.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/package_name_collision/second/ast", ["ast·123smei.Node", "ast·123smei.Type", "ast·123smei.List"])

export type Node = {
	Pos(): number
}

$.registerInterfaceType(
	"ast·123smei.Node",
	null,
	[$.methodSignature("Pos", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class Type {
	public declare Kind: number

	constructor(__goscriptValue?: boolean, Kind$?: number) {
		this.Kind = Kind$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Type {
		return new Type(true, this.Kind)
	}

	public __goscriptAssign(source: Type): this {
		this.Kind = source.Kind
		return this
	}

	static __typeInfo = $.registerStructType(
		"ast·123smei.Type",
		() => new Type(),
		() => [],
		Type,
		() => [/* @__PURE__ */ $.structField("Kind", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export class List {
	public declare N: number

	constructor(__goscriptValue?: boolean, N$?: number) {
		this.N = N$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): List {
		return new List(true, this.N)
	}

	public __goscriptAssign(source: List): this {
		this.N = source.N
		return this
	}

	public Pos(): number {
		const l: List | $.VarRef<List> | null = this;
		return $.pointerValue<List>(l).N
	}

	static __typeInfo = $.registerStructType(
		"ast·123smei.List",
		() => new List(),
		() => [$.methodSignature("Pos", [], [/* @__PURE__ */ $.basicType("int")], true)],
		List,
		() => [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

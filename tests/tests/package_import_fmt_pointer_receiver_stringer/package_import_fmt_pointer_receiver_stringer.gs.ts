// Generated file based on package_import_fmt_pointer_receiver_stringer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/fmt/index.js"

export type Line = $.Slice<Lex>

$.registerNamedType("main.Line", /* @__PURE__ */ $.sliceType("main.Lex"));

$.registerNamedValueType(
	"*main.Line",
	{String: (receiver: any, ...args: any[]) => (Line_String as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class Lex {
	public declare Name: string

	public declare Start: number

	constructor(init?: Partial<{Name?: string, Start?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Start = init?.Start ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Lex {
		return new Lex(this, true)
	}

	public __goscriptAssign(source: Lex): this {
		this.Name = source.Name
		this.Start = source.Start
		return this
	}

	public async String(): globalThis.Promise<string> {
		const lx: Lex | $.VarRef<Lex> | null = this;
		const lx$: Lex = lx == null ? $.pointerTarget<Lex>(lx) : (lx as any).__isVarRef === true ? (lx as any).value : (lx as any).__goValue === undefined ? (lx as any) : $.pointerTarget<Lex>(lx)
		return fmt.Sprintf("[%s:%d]", (lx$ as Lex).Name, $.basicInterfaceValue((lx$ as Lex).Start, "int"))
	}

	static __typeInfo = $.registerStructType(
		"main.Lex",
		() => new Lex(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Lex,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Start", key: "Start", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Val {
	public declare N: number

	constructor(init?: Partial<{N?: number}>, __goscriptValue?: boolean) {
		this.N = init?.N ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Val {
		return new Val(this, true)
	}

	public __goscriptAssign(source: Val): this {
		this.N = source.N
		return this
	}

	public async String(): globalThis.Promise<string> {
		const v = this;
		return fmt.Sprintf("val%d", $.basicInterfaceValue(v.N, "int"))
	}

	static __typeInfo = $.registerStructType(
		"main.Val",
		() => new Val(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Val,
		() => [{ name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function Line_String(ll: $.VarRef<Line> | null): string {
	return "line"
}

export async function main(): globalThis.Promise<void> {
	let lx = $.varRef(new Lex({Name: "a", Start: 1}, true))
	await fmt.Println($.interfaceValue((lx.value).clone(), "main.Lex", "main.Lex"), $.interfaceValue(lx, "*main.Lex", /* @__PURE__ */ $.pointerType("main.Lex")))
	let line: $.VarRef<Line> = $.varRef(($.arrayToSlice<Lex>([new Lex({Name: "b", Start: 2}, true), new Lex({Name: "c", Start: 3}, true)]) as Line))
	await fmt.Println($.interfaceValue(line.value, "main.Line", /* @__PURE__ */ $.sliceType("main.Lex", "main.Line")), $.namedValueInterfaceValue<any>(line, "*main.Line", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	await fmt.Println(await fmt.Sprint($.interfaceValue(line.value, "main.Line", /* @__PURE__ */ $.sliceType("main.Lex", "main.Line"))))
	let ptrs = $.arrayToSlice<Lex | $.VarRef<Lex> | null>([$.indexRef(line.value!, 0)])
	await fmt.Println($.interfaceValue($.arrayIndex(ptrs!, 0), "*main.Lex", /* @__PURE__ */ $.pointerType("main.Lex")), $.interfaceValue(new Val({N: 4}, true), "main.Val", "main.Val"), $.interfaceValue(new Val({N: 5}), "*main.Val", /* @__PURE__ */ $.pointerType("main.Val")), $.interfaceValue($.arrayToSlice<Val>([new Val({N: 6}, true)]), "[]main.Val", /* @__PURE__ */ $.sliceType("main.Val")))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any, ...args: any[]) => (Line_String as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType("main.Lex", "main.Line")))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

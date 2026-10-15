// Generated file based on package_import_fmt_pointer_receiver_stringer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export type Line = $.Slice<Lex>

$.registerNamedType("main.Line", /* @__PURE__ */ $.sliceType("main.Lex"));

$.registerNamedValueType(
	"*main.Line",
	{String: (receiver: any) => (Line_String as any)(receiver)},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class Lex {
	public declare Name: string

	public declare Start: number

	constructor(__goscriptValue?: boolean, Name$?: string, Start$?: number) {
		this.Name = Name$ ?? ""
		this.Start = Start$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Lex {
		return new Lex(true, this.Name, this.Start)
	}

	public __goscriptAssign(source: Lex): this {
		this.Name = source.Name
		this.Start = source.Start
		return this
	}

	public String(): string {
		const lx: Lex | $.VarRef<Lex> | null = this;
		const lx$: Lex = lx == null ? $.pointerTarget<Lex>(lx) : (lx as any).__isVarRef === true ? (lx as any).value : (lx as any).__goValue === undefined ? (lx as any) : $.pointerTarget<Lex>(lx)
		return (fmt.Sprintf("[%s:%d]", (lx$ as Lex).Name, $.basicInterfaceValue((lx$ as Lex).Start, "int")) as string)
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

	constructor(__goscriptValue?: boolean, N$?: number) {
		this.N = N$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Val {
		return new Val(true, this.N)
	}

	public __goscriptAssign(source: Val): this {
		this.N = source.N
		return this
	}

	public String(): string {
		const v = this;
		return (fmt.Sprintf("val%d", $.basicInterfaceValue(v.N, "int")) as string)
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
	let lx = $.varRef(new Lex(true, "a", 1))
	fmt.Println($.interfaceValue((lx.value).clone(), "main.Lex", "main.Lex"), $.interfaceValue(lx, "*main.Lex", /* @__PURE__ */ $.pointerType("main.Lex")))
	let line: $.VarRef<Line> = $.varRef(($.arrayToSlice<Lex>([new Lex(true, "b", 2), new Lex(true, "c", 3)]) as Line))
	fmt.Println($.interfaceValue(line.value, "main.Line", /* @__PURE__ */ $.sliceType("main.Lex", "main.Line")), $.namedValueInterfaceValue<any>(line, "*main.Line", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	fmt.Println((fmt.Sprint($.interfaceValue(line.value, "main.Line", /* @__PURE__ */ $.sliceType("main.Lex", "main.Line"))) as string))
	let ptrs = $.arrayToSlice<Lex | $.VarRef<Lex> | null>([$.indexRef(line.value!, 0)])
	fmt.Println($.interfaceValue($.arrayIndex(ptrs!, 0), "*main.Lex", /* @__PURE__ */ $.pointerType("main.Lex")), $.interfaceValue(new Val(true, 4), "main.Val", "main.Val"), $.interfaceValue(new Val(false, 5), "*main.Val", /* @__PURE__ */ $.pointerType("main.Val")), $.interfaceValue($.arrayToSlice<Val>([new Val(true, 6)]), "[]main.Val", /* @__PURE__ */ $.sliceType("main.Val")))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any) => (Line_String as any)(receiver)})
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

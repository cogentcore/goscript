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

	public _fields: {
		Name: string
		Start: number
	}

	constructor(init?: Partial<{Name?: string, Start?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Start: init?.Start ?? (0 as number)
		}
	}

	public clone(): Lex {
		return $.markAsStructValue(new Lex(this))
	}

	public async String(): globalThis.Promise<string> {
		const lx: Lex | $.VarRef<Lex> | null = this;
		return fmt.Sprintf("[%s:%d]", $.pointerValue<Lex>(lx).Name, $.basicInterfaceValue($.pointerValue<Lex>(lx).Start, "int"))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Start"])
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

	public _fields: {
		N: number
	}

	constructor(init?: Partial<{N?: number}>) {
		this._fields = {
			N: init?.N ?? (0 as number)
		}
	}

	public clone(): Val {
		return $.markAsStructValue(new Val(this))
	}

	public async String(): globalThis.Promise<string> {
		const v = this;
		return fmt.Sprintf("val%d", $.basicInterfaceValue(v.N, "int"))
	}

	static {
		$.bindStructFields(this.prototype, ["N"])
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
	let lx = $.varRef($.markAsStructValue(new Lex({Name: "a", Start: 1})))
	await fmt.Println($.interfaceValue($.markAsStructValue($.cloneStructValue(lx.value)), "main.Lex", "main.Lex"), $.interfaceValue(lx, "*main.Lex", /* @__PURE__ */ $.pointerType("main.Lex")))
	let line: $.VarRef<Line> = $.varRef(($.arrayToSlice<Lex>([$.markAsStructValue(new Lex({Name: "b", Start: 2})), $.markAsStructValue(new Lex({Name: "c", Start: 3}))]) as Line))
	await fmt.Println($.interfaceValue(line.value, "main.Line", /* @__PURE__ */ $.sliceType("main.Lex", "main.Line")), $.namedValueInterfaceValue<any>(line, "*main.Line", {String: (receiver: any, ...args: any[]) => (Line_String as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType("main.Lex", "main.Line")), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]))
	await fmt.Println(await fmt.Sprint($.interfaceValue(line.value, "main.Line", /* @__PURE__ */ $.sliceType("main.Lex", "main.Line"))))
	let ptrs: $.Slice<Lex | $.VarRef<Lex> | null> = $.arrayToSlice<Lex | $.VarRef<Lex> | null>([$.indexRef(line.value!, 0)])
	await fmt.Println($.interfaceValue($.arrayIndex(ptrs!, 0), "*main.Lex", /* @__PURE__ */ $.pointerType("main.Lex")), $.interfaceValue($.markAsStructValue(new Val({N: 4})), "main.Val", "main.Val"), $.interfaceValue(new Val({N: 5}), "*main.Val", /* @__PURE__ */ $.pointerType("main.Val")), $.interfaceValue($.arrayToSlice<Val>([$.markAsStructValue(new Val({N: 6}))]), "[]main.Val", /* @__PURE__ */ $.sliceType("main.Val")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

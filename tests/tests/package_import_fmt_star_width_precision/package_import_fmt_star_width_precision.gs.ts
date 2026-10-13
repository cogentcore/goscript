// Generated file based on package_import_fmt_star_width_precision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as errors from "@goscript/errors/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/errors/index.js"
import "@goscript/fmt/index.js"

export type num = number

$.registerNamedValueType(
	"main.num",
	{String: (receiver: any, ...args: any[]) => (num_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.num",
	{String: (receiver: any, ...args: any[]) => (num_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export async function num_String(f: num): globalThis.Promise<string> {
	return fmt.Sprintf("%.*g", $.basicInterfaceValue(7, "int"), $.basicInterfaceValue($.float32(f), "float32"))
}

export async function main(): globalThis.Promise<void> {
	await fmt.Println(await fmt.Sprintf("[%.*f]", $.basicInterfaceValue(3, "int"), $.basicInterfaceValue(3.14159, "float64")))
	await fmt.Println(await fmt.Sprintf("[%*d]", $.basicInterfaceValue(5, "int"), $.basicInterfaceValue(42, "int")))
	await fmt.Println(await fmt.Sprintf("[%*d]", $.basicInterfaceValue(-5, "int"), $.basicInterfaceValue(42, "int")))
	await fmt.Println(await fmt.Sprintf("[%*.*f]", $.basicInterfaceValue(8, "int"), $.basicInterfaceValue(2, "int"), $.basicInterfaceValue(3.14159, "float64")))
	await fmt.Println(await fmt.Sprintf("[%.*g]", $.basicInterfaceValue(7, "int"), $.basicInterfaceValue(13.333333015441895, "float32")))
	await fmt.Println(await fmt.Sprintf("[%.*d] [%s]", $.basicInterfaceValue(-1, "int"), $.basicInterfaceValue(5, "int"), "after"))
	await fmt.Println(await fmt.Sprintf("[%v]", $.namedValueInterfaceValue<any>(6.666666507720947, "main.num", {String: (receiver: any, ...args: any[]) => (num_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.basicType("float32", "main.num"), [$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])))
	await fmt.Println(await fmt.Sprintf("[%.*d]", "x", $.basicInterfaceValue(5, "int")))
	let err = fmt.Errorf("%*s: %w", $.basicInterfaceValue(6, "int"), "ctx", (errors.New("base") as any))
	await fmt.Println((err as any), errors.Unwrap($.pointerValueOrNil(err)!) != null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

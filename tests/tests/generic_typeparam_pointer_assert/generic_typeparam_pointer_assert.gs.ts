// Generated file based on generic_typeparam_pointer_assert.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Setter = {
	Has(v: bigint): boolean
	Set(v: bigint): void
}

$.registerInterfaceType(
	"main.Setter",
	null,
	[{ name: "Has", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export type Flag = bigint

$.registerNamedValueType(
	"*main.Flag",
	{Has: (receiver: any, ...args: any[]) => (Flag_Has as any)(receiver, ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => (Flag_Set as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Has", [["v", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int64")]])]
);

export type Constraint = any

$.registerInterfaceType(
	"main.Constraint",
	null,
	[]
);

export function Flag_Has(f: $.VarRef<Flag> | null, v: bigint): boolean {
	return ($.int64And($.int64($.pointerValue<Flag>(f)), v)) != 0n
}

export function Flag_Set(f: $.VarRef<Flag> | null, v: bigint): void {
	f!.value = $.int64($.int64Or($.int64($.pointerValue<Flag>(f)), v))
}

export async function Describe(__typeArgs: $.GenericTypeArgs | undefined, __goscriptParam0: any, values: $.Slice<bigint>): globalThis.Promise<bigint> {
	let i: $.VarRef<any> = $.varRef(__goscriptParam0)
	let p = $.mustTypeAssert<Setter | null>($.typeParamPointerInterfaceValue(i, __typeArgs?.["T"], "*T", /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), "main.Setter")
	let n: bigint = 0n
	for (let __goscriptRangeTarget0 = values, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let v = __goscriptRangeTarget0![__rangeIndex]
		if (await $.pointerValue<Exclude<Setter, null>>(p).Has(v)) {
			n++
		}
	}
	await $.pointerValue<Exclude<Setter, null>>(p).Set(8n)
	return $.int64Add(n, $.int64(i.value))
}

export async function main(): globalThis.Promise<void> {
	await $.println("count:", await Describe({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int64", "main.Flag"), zero: () => 0n }}, 3n, $.arrayToSlice<bigint>([1n, 2n, 4n])))
	let f: $.VarRef<Flag> = $.varRef(1n)
	{
		let [s, ok] = $.typeAssertTuple<Setter | null>($.namedValueInterfaceValue<any>(f, "*main.Flag", {Has: (receiver: any, ...args: any[]) => (Flag_Has as any)(receiver, ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => (Flag_Set as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int64", "main.Flag")), [$.methodSignature("Has", [["v", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int64")]])]), "main.Setter")
		if (ok) {
			await $.pointerValue<Exclude<Setter, null>>(s).Set(2n)
		}
	}
	await $.println("flag:", $.int64(f.value))
}

if ($.isMainScript(import.meta)) {
	await main()
}

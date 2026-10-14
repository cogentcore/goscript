// Generated file based on generic_pointer_constraint_method_dispatch.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type localPairingMessage = {
	MarshalVT(__typeArgs: $.GenericTypeArgs | undefined): [$.Slice<number>, $.GoError]
	UnmarshalVT(__typeArgs: $.GenericTypeArgs | undefined, data: $.Slice<number>): $.GoError
}

$.registerInterfaceType(
	"main.localPairingMessage",
	null,
	[{ name: "MarshalVT", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "UnmarshalVT", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }]
);

export type setter = {
	Has(v: bigint): boolean
	Set(v: bigint): void
}

$.registerInterfaceType(
	"main.setter",
	null,
	[{ name: "Has", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export type flag = bigint

$.registerNamedValueType(
	"*main.flag",
	{Has: (receiver: any, ...args: any[]) => (flag_Has as any)(receiver, ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => (flag_Set as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Has", [["v", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int64")]])]
);

export type flagConstraint = any

$.registerInterfaceType(
	"main.flagConstraint",
	null,
	[]
);

export class pairingOffer {
	public declare Note: string

	public _fields: {
		Note: string
	}

	constructor(init?: Partial<{Note?: string}>) {
		this._fields = {
			Note: init?.Note ?? ("" as string)
		}
	}

	public clone(): pairingOffer {
		return $.markAsStructValue(new pairingOffer(this))
	}

	public __goscriptAssign(source: pairingOffer): void {
		const target = this._fields
		const values = source._fields
		target.Note = values.Note
	}

	public MarshalVT(): [$.Slice<number>, $.GoError] {
		const o: pairingOffer | $.VarRef<pairingOffer> | null = this;
		return [$.stringToBytes($.pointerValue<pairingOffer>(o).Note), null]
	}

	public UnmarshalVT(data: $.Slice<number>): $.GoError {
		let o: pairingOffer | $.VarRef<pairingOffer> | null = this;
		$.pointerValue<pairingOffer>(o).Note = $.concatString("decoded:", $.bytesToString(data))
		return null
	}

	static {
		$.bindStructFields(this.prototype, ["Note"])
	}

	static __typeInfo = $.registerStructType(
		"main.pairingOffer",
		() => new pairingOffer(),
		() => [{ name: "MarshalVT", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }] }, { name: "UnmarshalVT", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }],
		pairingOffer,
		() => [{ name: "Note", key: "Note", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function decodeLocalPairing(__typeArgs: $.GenericTypeArgs | undefined, data: $.Slice<number>): globalThis.Promise<[any, $.GoError]> {
	let msg: $.VarRef<any> = $.varRef($.genericZero(__typeArgs, "T", null))
	let err = (__goscriptAwait = $.callGenericMethod(__typeArgs, "M", "UnmarshalVT", $.interfaceValue(msg, "*T", /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), data), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	return [msg.value, err]
}

export async function encodeLocalPairing(__typeArgs: $.GenericTypeArgs | undefined, msg: any): globalThis.Promise<[$.Slice<number>, $.GoError]> {
	return $.callGenericMethod(__typeArgs, "M", "MarshalVT", msg)
}

export function flag_Has(f: $.VarRef<flag> | null, v: bigint): boolean {
	return ($.int64And($.int64($.pointerValue<flag>(f)), v)) != 0n
}

export function flag_Set(f: $.VarRef<flag> | null, v: bigint): void {
	f!.value = $.int64($.int64Or($.int64($.pointerValue<flag>(f)), v))
}

export async function countFlags(__typeArgs: $.GenericTypeArgs | undefined, __goscriptParam0: any, values: $.Slice<bigint>): globalThis.Promise<bigint> {
	let i: $.VarRef<any> = $.varRef(__goscriptParam0)
	let p = $.mustTypeAssert<setter | null>($.typeParamPointerInterfaceValue(i, __typeArgs?.["T"], "*T", /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), "main.setter")
	let n: bigint = 0n
	for (let __goscriptRangeTarget0 = values, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let v = __goscriptRangeTarget0![__rangeIndex]
		if ((__goscriptAwait = $.pointerValue<Exclude<setter, null>>(p).Has(v), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) {
			n++
		}
	}
	void (__goscriptAwait = $.pointerValue<Exclude<setter, null>>(p).Set(8n), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	return $.int64Add(n, $.int64(i.value))
}

export async function main(): globalThis.Promise<void> {
	let __goscriptTuple0: any = await decodeLocalPairing({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: /* @__PURE__ */ $.pointerType("main.pairingOffer"), zero: () => null, methods: {MarshalVT: (receiver: any, ...args: any[]) => $.pointerValue(receiver).MarshalVT(...$.stripGenericTypeArgs(args)), UnmarshalVT: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UnmarshalVT(...$.stripGenericTypeArgs(args))} }, T: { type: "main.pairingOffer", zero: () => $.markAsStructValue(new pairingOffer()) }}, new Uint8Array([104, 105]))
	let msg = (__goscriptTuple0[0] as pairingOffer)
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("decode error")
		return
	}
	await $.println(msg.Note)

	let __goscriptTuple1: any = await encodeLocalPairing({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, M: { type: /* @__PURE__ */ $.pointerType("main.pairingOffer"), zero: () => null, methods: {MarshalVT: (receiver: any, ...args: any[]) => $.pointerValue(receiver).MarshalVT(...$.stripGenericTypeArgs(args)), UnmarshalVT: (receiver: any, ...args: any[]) => $.pointerValue(receiver).UnmarshalVT(...$.stripGenericTypeArgs(args))} }, T: { type: "main.pairingOffer", zero: () => $.markAsStructValue(new pairingOffer()) }}, new pairingOffer({Note: "note"}))
	let encoded: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	if (err != null) {
		await $.println("encode error")
		return
	}
	await $.println("encoded:", $.bytesToString(encoded))

	await $.println("count:", await countFlags({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int64", "main.flag"), zero: () => 0n }}, 3n, $.arrayToSlice<bigint>([1n, 2n, 4n])))
	let fl: $.VarRef<flag> = $.varRef(1n)
	{
		let [s, ok] = $.typeAssertTuple<setter | null>($.namedValueInterfaceValue<any>(fl, "*main.flag", {Has: (receiver: any, ...args: any[]) => (flag_Has as any)(receiver, ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => (flag_Set as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int64", "main.flag")), [$.methodSignature("Has", [["v", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["v", /* @__PURE__ */ $.basicType("int64")]])]), "main.setter")
		if (ok) {
			void (__goscriptAwait = $.pointerValue<Exclude<setter, null>>(s).Set(2n), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		}
	}
	await $.println("flag:", $.int64(fl.value))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

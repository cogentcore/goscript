// Generated file based on package_import_encoding_json_named_slice_method_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"
import "@goscript/encoding/json/index.js"

export type Maps = $.Slice<MapItem>

$.registerNamedValueType(
	"*main.Maps",
	{CopyFrom: (receiver: any, ...args: any[]) => (Maps_CopyFrom as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("CopyFrom", [["cp", /* @__PURE__ */ $.sliceType("main.MapItem", "main.Maps")]], ["error"])]
);

export type Names = globalThis.Map<string, number> | null

$.registerNamedValueType(
	"*main.Names",
	{Len: (receiver: any, ...args: any[]) => (Names_Len as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class MapItem {
	public declare Name: string

	public declare Map: globalThis.Map<string, number> | null

	public _fields: {
		Name: string
		Map: globalThis.Map<string, number> | null
	}

	constructor(init?: Partial<{Name?: string, Map?: globalThis.Map<string, number> | null}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Map: init?.Map ?? (null! as globalThis.Map<string, number> | null)
		}
	}

	public clone(): MapItem {
		return $.markAsStructValue(new MapItem(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Map"])
	}

	static __typeInfo = $.registerStructType(
		"main.MapItem",
		() => new MapItem(),
		() => [],
		MapItem,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Map", key: "Map", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")) }]
	)
}

export function Maps_CopyFrom(km: $.VarRef<Maps> | null, cp: Maps): $.GoError {
	km!.value = ($.makeSlice<MapItem>(0, $.len((cp as Maps)), undefined, () => $.markAsStructValue(new MapItem())) as Maps)
	let __goscriptTuple0: any = json.Marshal($.interfaceValue(cp, "main.Maps", /* @__PURE__ */ $.sliceType("main.MapItem", "main.Maps")))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		return err
	}
	return json.Unmarshal(b, $.namedValueInterfaceValue<any>(km, "*main.Maps", {CopyFrom: (receiver: any, ...args: any[]) => (Maps_CopyFrom as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType("main.MapItem", "main.Maps")), [$.methodSignature("CopyFrom", [["cp", /* @__PURE__ */ $.sliceType("main.MapItem", "main.Maps")]], ["error"])]))
}

export function Names_Len(n: $.VarRef<Names> | null): number {
	return $.len($.pointerValue<Names>(n))
}

export let standard: Maps = ($.arrayToSlice<MapItem>([$.markAsStructValue(new MapItem({Name: "a", Map: $.makeMap<string, number>([["x", 1]])})), $.markAsStructValue(new MapItem({Name: "b"}))]) as Maps)

export function __goscript_set_standard(__goscriptValue: Maps): void {
	standard = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let available: $.VarRef<Maps> = $.varRef(null! as Maps)
	let err = Maps_CopyFrom(available, (standard as Maps))
	await $.println("copy:", err == null, $.len((available.value as Maps)))
	if ($.len((available.value as Maps)) == 2) {
		await $.println("items:", $.arrayIndex(available.value!, 0).Name, $.mapGet<string, number, number>($.arrayIndex(available.value!, 0).Map, "x", 0)[0], $.arrayIndex(available.value!, 1).Name)
	}

	let names: $.VarRef<Names> = $.varRef(null! as Names)
	err = json.Unmarshal(new Uint8Array([123, 34, 112, 34, 58, 49, 44, 34, 113, 34, 58, 50, 125]), $.namedValueInterfaceValue<any>(names, "*main.Names", {Len: (receiver: any, ...args: any[]) => (Names_Len as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType("main.Names"), [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])]))
	await $.println("names:", err == null, Names_Len(names), $.mapGet<string, number, number>(names.value, "q", 0)[0])
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_encoding_json_unmarshal_pointer_hook.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"

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

export class Hooked {
	public get Calls(): number {
		return this._fields.Calls
	}

	public set Calls(value: number) {
		this._fields.Calls = value
	}

	public get Seen(): string {
		return this._fields.Seen
	}

	public set Seen(value: string) {
		this._fields.Seen = value
	}

	public _fields: {
		Calls: number
		Seen: string
	}

	constructor(init?: Partial<{Calls?: number, Seen?: string}>) {
		this._fields = {
			Calls: init?.Calls ?? (0 as number),
			Seen: init?.Seen ?? ("" as string)
		}
	}

	public clone(): Hooked {
		return $.markAsStructValue(new Hooked(this))
	}

	public UnmarshalJSON(data: $.Slice<number>): $.GoError {
		let h: Hooked | $.VarRef<Hooked> | null = this;
		$.pointerValue<Hooked>(h).Calls++
		$.pointerValue<Hooked>(h).Seen = $.bytesToString(data)
		return null
	}

	static __typeInfo = $.registerStructType(
		"main.Hooked",
		() => new Hooked(),
		() => [{ name: "UnmarshalJSON", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }] }],
		Hooked,
		() => [{ name: "Calls", key: "Calls", type: /* @__PURE__ */ $.basicType("int") }, { name: "Seen", key: "Seen", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Box {
	public get Value(): Hooked | $.VarRef<Hooked> | null {
		return this._fields.Value
	}

	public set Value(value: Hooked | $.VarRef<Hooked> | null) {
		this._fields.Value = value
	}

	public _fields: {
		Value: Hooked | $.VarRef<Hooked> | null
	}

	constructor(init?: Partial<{Value?: Hooked | $.VarRef<Hooked> | null}>) {
		this._fields = {
			Value: init?.Value ?? (null! as Hooked | $.VarRef<Hooked> | null)
		}
	}

	public clone(): Box {
		return $.markAsStructValue(new Box(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Box",
		() => new Box(),
		() => [],
		Box,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.pointerType("main.Hooked"), tag: "json:\"value\"" }]
	)
}

export class MapItem {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Map(): globalThis.Map<string, number> | null {
		return this._fields.Map
	}

	public set Map(value: globalThis.Map<string, number> | null) {
		this._fields.Map = value
	}

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

export function missingHooks(): [json.Marshaler | null, json.Unmarshaler | null] {
	return [null, null]
}

export async function main(): globalThis.Promise<void> {
	let [marshaler, unmarshaler] = missingHooks()
	await fmt.Println("missing hooks", marshaler == null, unmarshaler == null)

	// A non-nil *T field with UnmarshalJSON must use the hook before any
	// pointer-to-struct population path can inspect fields.
	let box = $.varRef($.markAsStructValue(new Box({Value: new Hooked({Seen: "before"})})))
	{
		let err = json.Unmarshal(new Uint8Array([123, 34, 118, 97, 108, 117, 101, 34, 58, 123, 34, 105, 103, 110, 111, 114, 101, 100, 34, 58, 48, 125, 125]), $.interfaceValue(box, "*main.Box", /* @__PURE__ */ $.pointerType("main.Box")))
		if (err != null) {
			await fmt.Println("unmarshal error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
			return
		}
	}
	await fmt.Printf("calls=%d seen=%s\n", $.basicInterfaceValue($.pointerValue<Hooked>(box.value.Value).Calls, "int"), $.pointerValue<Hooked>(box.value.Value).Seen)

	// A pointer to a named slice or map type with methods, but no
	// UnmarshalJSON, decodes into the value it points to.
	let maps: $.VarRef<Maps> = $.varRef(null! as Maps)
	let err = Maps_CopyFrom(maps, ($.arrayToSlice<MapItem>([$.markAsStructValue(new MapItem({Name: "a", Map: $.makeMap<string, number>([["x", 1]])})), $.markAsStructValue(new MapItem({Name: "b"}))]) as Maps))
	await fmt.Println("copy:", err == null, $.basicInterfaceValue($.len((maps.value as Maps)), "int"), $.arrayIndex(maps.value!, 0).Name, $.basicInterfaceValue($.mapGet<string, number, number>($.arrayIndex(maps.value!, 0).Map, "x", 0)[0], "int"), $.arrayIndex(maps.value!, 1).Name)

	let names: $.VarRef<Names> = $.varRef(null! as Names)
	err = json.Unmarshal(new Uint8Array([123, 34, 112, 34, 58, 49, 44, 34, 113, 34, 58, 50, 125]), $.namedValueInterfaceValue<any>(names, "*main.Names", {Len: (receiver: any, ...args: any[]) => (Names_Len as any)(receiver, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType("main.Names"), [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])]))
	await fmt.Println("names:", err == null, $.basicInterfaceValue(Names_Len(names), "int"), $.basicInterfaceValue($.mapGet<string, number, number>(names.value, "q", 0)[0], "int"))
}

if ($.isMainScript(import.meta)) {
	await main()
}

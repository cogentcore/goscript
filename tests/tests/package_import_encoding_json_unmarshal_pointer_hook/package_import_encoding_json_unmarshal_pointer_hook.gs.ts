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
	public declare Calls: number

	public declare Seen: string

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

	static {
		$.bindStructFields(this.prototype, ["Calls", "Seen"])
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
	public declare Value: Hooked | $.VarRef<Hooked> | null

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

	static {
		$.bindStructFields(this.prototype, ["Value"])
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
	return json.Unmarshal(b, $.namedValueInterfaceValue<any>(km, "*main.Maps", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
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
	err = json.Unmarshal(new Uint8Array([123, 34, 112, 34, 58, 49, 44, 34, 113, 34, 58, 50, 125]), $.namedValueInterfaceValue<any>(names, "*main.Names", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()))
	await fmt.Println("names:", err == null, $.basicInterfaceValue(Names_Len(names), "int"), $.basicInterfaceValue($.mapGet<string, number, number>(names.value, "q", 0)[0], "int"))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({CopyFrom: (receiver: any, ...args: any[]) => (Maps_CopyFrom as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType("main.MapItem", "main.Maps")))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("CopyFrom", [["cp", /* @__PURE__ */ $.sliceType("main.MapItem", "main.Maps")]], ["error"])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({Len: (receiver: any, ...args: any[]) => (Names_Len as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.pointerType("main.Names"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

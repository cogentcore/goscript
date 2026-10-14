// Generated file based on package_import_encoding_json_reuse_interface_elements.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"

export type Named = {
	GetName(): string
}

$.registerInterfaceType(
	"main.Named",
	null,
	[{ name: "GetName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Node {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	public GetName(): string {
		const n: Node | $.VarRef<Node> | null = this;
		return $.pointerValue<Node>(n).Name
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [{ name: "GetName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Node,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Custom {
	public get Text(): string {
		return this._fields.Text
	}

	public set Text(value: string) {
		this._fields.Text = value
	}

	public _fields: {
		Text: string
	}

	constructor(init?: Partial<{Text?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Text: init?.Text ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Custom {
		return new Custom(this, true)
	}

	public __goscriptAssign(source: Custom): void {
		const target = this._fields
		const values = source._fields
		target.Text = values.Text
	}

	public GetName(): string {
		const c: Custom | $.VarRef<Custom> | null = this;
		return $.pointerValue<Custom>(c).Text
	}

	public UnmarshalJSON(b: $.Slice<number>): $.GoError {
		let c: Custom | $.VarRef<Custom> | null = this;
		$.pointerValue<Custom>(c).Text = $.concatString("custom:", $.bytesToString(b))
		return null
	}

	static __typeInfo = $.registerStructType(
		"main.Custom",
		() => new Custom(),
		() => [{ name: "GetName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "UnmarshalJSON", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }],
		Custom,
		() => [{ name: "Text", key: "Text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Holder {
	public get Items(): $.Slice<Named | null> {
		return this._fields.Items
	}

	public set Items(value: $.Slice<Named | null>) {
		this._fields.Items = value
	}

	public _fields: {
		Items: $.Slice<Named | null>
	}

	constructor(init?: Partial<{Items?: $.Slice<Named | null>}>, __goscriptValue?: boolean) {
		this._fields = {
			Items: init?.Items ?? (null! as $.Slice<Named | null>)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		target.Items = values.Items
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [{ name: "Items", key: "Items", type: /* @__PURE__ */ $.sliceType("main.Named") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a: Node | $.VarRef<Node> | null = new Node()
	let b: Custom | $.VarRef<Custom> | null = new Custom()
	let h = $.varRef(new Holder({Items: $.arrayToSlice<Named | null>([$.interfaceValue<Named | null>(a, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")), $.interfaceValue<Named | null>(b, "*main.Custom", /* @__PURE__ */ $.pointerType("main.Custom"))])}, true))
	let err = json.Unmarshal(new Uint8Array([123, 34, 73, 116, 101, 109, 115, 34, 58, 91, 123, 34, 78, 97, 109, 101, 34, 58, 34, 120, 34, 125, 44, 34, 121, 34, 93, 125]), $.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder")))
	await fmt.Println((err as any), $.basicInterfaceValue($.sliceLen(h.value.Items), "int"), $.comparableEqual($.arrayIndex(h.value.Items!, 0), $.interfaceValue<Named | null>(a, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))), $.pointerValue<Node>(a).Name, $.comparableEqual($.arrayIndex(h.value.Items!, 1), $.interfaceValue<Named | null>(b, "*main.Custom", /* @__PURE__ */ $.pointerType("main.Custom"))), $.pointerValue<Custom>(b).Text)
}

if ($.isMainScript(import.meta)) {
	await main()
}

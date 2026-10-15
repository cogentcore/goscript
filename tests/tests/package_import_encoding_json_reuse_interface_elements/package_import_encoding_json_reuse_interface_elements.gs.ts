// Generated file based on package_import_encoding_json_reuse_interface_elements.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as fmt from "@goscript/fmt/index.js"

export type Named = {
	GetName(): string
}

$.registerInterfaceType(
	"main.Named",
	null,
	[{ name: "GetName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Node {
	public declare Name: string

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): this {
		this.Name = source.Name
		return this
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
	public declare Text: string

	constructor(init?: Partial<{Text?: string}>, __goscriptValue?: boolean) {
		this.Text = init?.Text ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Custom {
		return new Custom(this, true)
	}

	public __goscriptAssign(source: Custom): this {
		this.Text = source.Text
		return this
	}

	public GetName(): string {
		const c: Custom | $.VarRef<Custom> | null = this;
		return $.pointerValue<Custom>(c).Text
	}

	public UnmarshalJSON(b: $.Slice<number>): $.GoError {
		let c: Custom | $.VarRef<Custom> | null = this;
		$.pointerValue<Custom>(c).Text = "custom:" + $.bytesToString(b)
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
	public declare Items: $.Slice<Named | null>

	constructor(init?: Partial<{Items?: $.Slice<Named | null>}>, __goscriptValue?: boolean) {
		this.Items = init?.Items ?? (null! as $.Slice<Named | null>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): this {
		this.Items = source.Items
		return this
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
	let a = new Node()
	let b = new Custom()
	let h = $.varRef(new Holder({Items: $.arrayToSlice<Named | null>([$.interfaceValue<Named | null>(a, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")), $.interfaceValue<Named | null>(b, "*main.Custom", /* @__PURE__ */ $.pointerType("main.Custom"))])}, true))
	let err = json.Unmarshal(new Uint8Array([123, 34, 73, 116, 101, 109, 115, 34, 58, 91, 123, 34, 78, 97, 109, 101, 34, 58, 34, 120, 34, 125, 44, 34, 121, 34, 93, 125]), $.interfaceValue(h, "*main.Holder", /* @__PURE__ */ $.pointerType("main.Holder")))
	await fmt.Println((err as any), $.basicInterfaceValue($.sliceLen(h.value.Items), "int"), $.comparableEqual($.arrayIndex(h.value.Items!, 0), $.interfaceValue<Named | null>(a, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))), $.pointerValue<Node>(a).Name, $.comparableEqual($.arrayIndex(h.value.Items!, 1), $.interfaceValue<Named | null>(b, "*main.Custom", /* @__PURE__ */ $.pointerType("main.Custom"))), $.pointerValue<Custom>(b).Text)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_encoding_json_tag_not_first.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"
import "@goscript/encoding/json/index.js"

export class Node {
	public declare Name: string

	public declare Parent: Node | $.VarRef<Node> | null

	public declare Label: string

	public declare Empty: string

	public declare Kept: number

	public _fields: {
		Name: string
		Parent: Node | $.VarRef<Node> | null
		Label: string
		Empty: string
		Kept: number
	}

	constructor(init?: Partial<{Name?: string, Parent?: Node | $.VarRef<Node> | null, Label?: string, Empty?: string, Kept?: number}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Parent: init?.Parent ?? (null! as Node | $.VarRef<Node> | null),
			Label: init?.Label ?? ("" as string),
			Empty: init?.Empty ?? ("" as string),
			Kept: init?.Kept ?? (0 as number)
		}
	}

	public clone(): Node {
		return $.markAsStructValue(new Node(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Parent", "Label", "Empty", "Kept"])
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [],
		Node,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string"), tag: "copier:\"-\"" }, { name: "Parent", key: "Parent", type: /* @__PURE__ */ $.pointerType("main.Node"), tag: "copier:\"-\" json:\"-\" xml:\"-\"" }, { name: "Label", key: "Label", type: /* @__PURE__ */ $.basicType("string"), tag: "xml:\"label\" json:\"title\"" }, { name: "Empty", key: "Empty", type: /* @__PURE__ */ $.basicType("string"), tag: "display:\"-\" json:\"empty,omitempty\"" }, { name: "Kept", key: "Kept", type: /* @__PURE__ */ $.basicType("int"), tag: "table:\"-\" json:\",omitempty\"" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let n: Node | $.VarRef<Node> | null = new Node({Name: "a", Label: "x", Kept: 3})
	$.pointerValue<Node>(n).Parent = n
	let __goscriptTuple0: any = json.Marshal($.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println($.bytesToString(b), err == null)

	let m: $.VarRef<Node> = $.varRef($.markAsStructValue(new Node()))
	err = json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 98, 34, 44, 34, 80, 97, 114, 101, 110, 116, 34, 58, 123, 34, 78, 97, 109, 101, 34, 58, 34, 112, 34, 125, 44, 34, 116, 105, 116, 108, 101, 34, 58, 34, 121, 34, 44, 34, 101, 109, 112, 116, 121, 34, 58, 34, 101, 34, 44, 34, 75, 101, 112, 116, 34, 58, 52, 125]), $.interfaceValue(m, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	await $.println(m.value.Name, m.value.Parent == null, m.value.Label, m.value.Empty, m.value.Kept, err == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

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

	constructor(init?: Partial<{Name?: string, Parent?: Node | $.VarRef<Node> | null, Label?: string, Empty?: string, Kept?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Parent = init?.Parent ?? (null! as Node | $.VarRef<Node> | null)
		this.Label = init?.Label ?? ("" as string)
		this.Empty = init?.Empty ?? ("" as string)
		this.Kept = init?.Kept ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): this {
		this.Name = source.Name
		this.Parent = source.Parent
		this.Label = source.Label
		this.Empty = source.Empty
		this.Kept = source.Kept
		return this
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
	let n = new Node({Name: "a", Label: "x", Kept: 3})
	$.pointerValue<Node>(n).Parent = n
	let __goscriptTuple0: any = json.Marshal($.interfaceValue(n, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println($.bytesToString(b), err == null)

	let m: $.VarRef<Node> = $.varRef(new Node(undefined, true))
	err = json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 98, 34, 44, 34, 80, 97, 114, 101, 110, 116, 34, 58, 123, 34, 78, 97, 109, 101, 34, 58, 34, 112, 34, 125, 44, 34, 116, 105, 116, 108, 101, 34, 58, 34, 121, 34, 44, 34, 101, 109, 112, 116, 121, 34, 58, 34, 101, 34, 44, 34, 75, 101, 112, 116, 34, 58, 52, 125]), $.interfaceValue(m, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	await $.println(m.value.Name, m.value.Parent == null, m.value.Label, m.value.Empty, m.value.Kept, err == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

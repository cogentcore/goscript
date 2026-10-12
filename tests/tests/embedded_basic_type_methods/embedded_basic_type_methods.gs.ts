// Generated file based on embedded_basic_type_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Pos = number

export type NodeType = number

export type Node = {
	Position(): Pos
	Type(): NodeType
}

$.registerInterfaceType(
	"main.Node",
	null,
	[{ name: "Position", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.Pos") }] }, { name: "Type", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.NodeType") }] }]
);

export class TextNode {
	public declare NodeType: NodeType

	public declare Pos: Pos

	public declare Text: string

	public _fields: {
		NodeType: NodeType
		Pos: Pos
		Text: string
	}

	constructor(init?: Partial<{NodeType?: NodeType, Pos?: Pos, Text?: string}>) {
		this._fields = {
			NodeType: init?.NodeType ?? (0 as NodeType),
			Pos: init?.Pos ?? (0 as Pos),
			Text: init?.Text ?? ("" as string)
		}
	}

	public clone(): TextNode {
		return $.markAsStructValue(new TextNode(this))
	}

	public Type(): any {
		return NodeType_Type(this.NodeType)
	}

	public Position(): any {
		return Pos_Position(this.Pos)
	}

	static {
		$.bindStructFields(this.prototype, ["NodeType", "Pos", "Text"])
	}

	static __typeInfo = $.registerStructType(
		"main.TextNode",
		() => new TextNode(),
		() => [{ name: "Type", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.NodeType") }] }, { name: "Position", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.Pos") }] }],
		TextNode,
		() => [{ name: "NodeType", key: "NodeType", type: /* @__PURE__ */ $.basicType("int", "main.NodeType"), anonymous: true }, { name: "Pos", key: "Pos", type: /* @__PURE__ */ $.basicType("int", "main.Pos"), anonymous: true }, { name: "Text", key: "Text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class BranchNode {
	public declare NodeType: NodeType

	public declare Pos: Pos

	public declare Line: number

	public _fields: {
		NodeType: NodeType
		Pos: Pos
		Line: number
	}

	constructor(init?: Partial<{NodeType?: NodeType, Pos?: Pos, Line?: number}>) {
		this._fields = {
			NodeType: init?.NodeType ?? (0 as NodeType),
			Pos: init?.Pos ?? (0 as Pos),
			Line: init?.Line ?? (0 as number)
		}
	}

	public clone(): BranchNode {
		return $.markAsStructValue(new BranchNode(this))
	}

	public Type(): any {
		return NodeType_Type(this.NodeType)
	}

	public Position(): any {
		return Pos_Position(this.Pos)
	}

	static {
		$.bindStructFields(this.prototype, ["NodeType", "Pos", "Line"])
	}

	static __typeInfo = $.registerStructType(
		"main.BranchNode",
		() => new BranchNode(),
		() => [{ name: "Type", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.NodeType") }] }, { name: "Position", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.Pos") }] }],
		BranchNode,
		() => [{ name: "NodeType", key: "NodeType", type: /* @__PURE__ */ $.basicType("int", "main.NodeType"), anonymous: true }, { name: "Pos", key: "Pos", type: /* @__PURE__ */ $.basicType("int", "main.Pos"), anonymous: true }, { name: "Line", key: "Line", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class IfNode {
	public declare BranchNode: BranchNode

	public _fields: {
		BranchNode: BranchNode
	}

	constructor(init?: Partial<{BranchNode?: BranchNode}>) {
		this._fields = {
			BranchNode: init?.BranchNode ? $.markAsStructValue($.cloneStructValue(init.BranchNode)) : $.markAsStructValue(new BranchNode())
		}
	}

	public clone(): IfNode {
		return $.markAsStructValue(new IfNode(this))
	}

	public Position(): any {
		return Pos_Position($.pointerValue<BranchNode>(this.BranchNode).Pos)
	}

	public Type(): any {
		return NodeType_Type($.pointerValue<BranchNode>(this.BranchNode).NodeType)
	}

	static {
		$.bindStructFields(this.prototype, ["BranchNode"])
	}

	static __typeInfo = $.registerStructType(
		"main.IfNode",
		() => new IfNode(),
		() => [{ name: "Position", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.Pos") }] }, { name: "Type", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int", "main.NodeType") }] }],
		IfNode,
		() => [{ name: "BranchNode", key: "BranchNode", type: "main.BranchNode", anonymous: true }]
	)
}

export function Pos_Position(p: Pos): Pos {
	return p
}

export function NodeType_Type(t: NodeType): NodeType {
	return t
}

export function newText(pos: Pos, text: string): TextNode | $.VarRef<TextNode> | null {
	return new TextNode({NodeType: 3, Pos: pos, Text: text})
}

export async function main(): globalThis.Promise<void> {
	let t: TextNode | $.VarRef<TextNode> | null = newText(7, "hi")
	await $.println(Pos_Position($.pointerValue<TextNode>(t).Pos), NodeType_Type($.pointerValue<TextNode>(t).NodeType), $.pointerValue<TextNode>(t).Text)
	let v = $.markAsStructValue($.cloneStructValue($.pointerValue<TextNode>(t)))
	await $.println(Pos_Position(v.Pos), NodeType_Type(v.NodeType))
	let n: Node | null = $.interfaceValue<Node | null>(t, "*main.TextNode", /* @__PURE__ */ $.pointerType("main.TextNode"))
	await $.println(await $.pointerValue<Exclude<Node, null>>(n).Position(), await $.pointerValue<Exclude<Node, null>>(n).Type())
	$.pointerValue<TextNode>(t).Pos = 9
	await $.println(await $.pointerValue<Exclude<Node, null>>(n).Position(), $.pointerValue<TextNode>(t).Pos)

	let i: IfNode | $.VarRef<IfNode> | null = new IfNode({BranchNode: $.markAsStructValue(new BranchNode({NodeType: 10, Pos: 42, Line: 3}))})
	await $.println(Pos_Position($.pointerValue<IfNode>(i).BranchNode.Pos), NodeType_Type($.pointerValue<IfNode>(i).BranchNode.NodeType), $.pointerValue<IfNode>(i).BranchNode.Line)
	n = $.interfaceValue<Node | null>(i, "*main.IfNode", /* @__PURE__ */ $.pointerType("main.IfNode"))
	await $.println(await $.pointerValue<Exclude<Node, null>>(n).Position(), await $.pointerValue<Exclude<Node, null>>(n).Type())
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_encoding_json_embedded_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"

export class Base {
	public declare Name: string

	public declare Kids: $.Slice<string>

	public declare hidden: number

	public declare Shadowed: string

	public _fields: {
		Name: string
		Kids: $.Slice<string>
		hidden: number
		Shadowed: string
	}

	constructor(init?: Partial<{Name?: string, Kids?: $.Slice<string>, hidden?: number, Shadowed?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Kids: init?.Kids ?? (null! as $.Slice<string>),
			hidden: init?.hidden ?? (0 as number),
			Shadowed: init?.Shadowed ?? ("" as string)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Kids", "hidden", "Shadowed"])
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [],
		Base,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Kids", key: "Kids", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }, { name: "hidden", key: "hidden", type: /* @__PURE__ */ $.basicType("int") }, { name: "Shadowed", key: "Shadowed", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class inner {
	public declare Deep: number

	public _fields: {
		Deep: number
	}

	constructor(init?: Partial<{Deep?: number}>) {
		this._fields = {
			Deep: init?.Deep ?? (0 as number)
		}
	}

	public clone(): inner {
		return $.markAsStructValue(new inner(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Deep"])
	}

	static __typeInfo = $.registerStructType(
		"main.inner",
		() => new inner(),
		() => [],
		inner,
		() => [{ name: "Deep", key: "Deep", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Extra {
	public declare Note: string

	public _fields: {
		Note: string
	}

	constructor(init?: Partial<{Note?: string}>) {
		this._fields = {
			Note: init?.Note ?? ("" as string)
		}
	}

	public clone(): Extra {
		return $.markAsStructValue(new Extra(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Note"])
	}

	static __typeInfo = $.registerStructType(
		"main.Extra",
		() => new Extra(),
		() => [],
		Extra,
		() => [{ name: "Note", key: "Note", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Node {
	public declare Base: Base

	public declare Extra: Extra | $.VarRef<Extra> | null

	public declare inner: inner

	public declare Tagged: Base

	public declare Shadowed: string

	public declare Size: number

	public declare _private: boolean

	public _fields: {
		Base: Base
		Extra: Extra | $.VarRef<Extra> | null
		inner: inner
		Tagged: Base
		Shadowed: string
		Size: number
		_private: boolean
	}

	constructor(init?: Partial<{Base?: Base, Extra?: Extra | $.VarRef<Extra> | null, inner?: inner, Tagged?: Base, Shadowed?: string, Size?: number, _private?: boolean}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base()),
			Extra: init?.Extra ?? (null! as Extra | $.VarRef<Extra> | null),
			inner: init?.inner ? $.markAsStructValue($.cloneStructValue(init.inner)) : $.markAsStructValue(new inner()),
			Tagged: init?.Tagged ? $.markAsStructValue($.cloneStructValue(init.Tagged)) : $.markAsStructValue(new Base()),
			Shadowed: init?.Shadowed ?? ("" as string),
			Size: init?.Size ?? (0 as number),
			_private: init?._private ?? (false as boolean)
		}
	}

	public clone(): Node {
		return $.markAsStructValue(new Node(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Base", "Extra", "inner", "Tagged", "Shadowed", "Size", "_private"])
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [],
		Node,
		() => [{ name: "Base", key: "Base", type: "main.Base", anonymous: true }, { name: "Extra", key: "Extra", type: /* @__PURE__ */ $.pointerType("main.Extra"), anonymous: true }, { name: "inner", key: "inner", type: "main.inner", anonymous: true }, { name: "Tagged", key: "Tagged", type: "main.Base", tag: "json:\"tagged\"" }, { name: "Shadowed", key: "Shadowed", type: /* @__PURE__ */ $.basicType("string") }, { name: "Size", key: "Size", type: /* @__PURE__ */ $.basicType("int") }, { name: "private", key: "_private", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let n = $.markAsStructValue(new Node({Base: $.markAsStructValue(new Base({Name: "a", Kids: $.arrayToSlice<string>(["x"]), hidden: 3, Shadowed: "base"})), Extra: new Extra({Note: "n"}), inner: $.markAsStructValue(new inner({Deep: 7})), Shadowed: "outer", Size: 2, _private: true}))
	let __goscriptTuple0: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(n)), "main.Node", "main.Node"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await fmt.Println($.bytesToString(b), (err as any))

	let m: $.VarRef<Node> = $.varRef($.markAsStructValue(new Node()))
	m.value.Extra = new Extra()
	err = json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 98, 34, 44, 34, 75, 105, 100, 115, 34, 58, 91, 34, 121, 34, 44, 34, 122, 34, 93, 44, 34, 78, 111, 116, 101, 34, 58, 34, 109, 34, 44, 34, 68, 101, 101, 112, 34, 58, 57, 44, 34, 83, 104, 97, 100, 111, 119, 101, 100, 34, 58, 34, 115, 34, 44, 34, 83, 105, 122, 101, 34, 58, 52, 44, 34, 116, 97, 103, 103, 101, 100, 34, 58, 123, 34, 78, 97, 109, 101, 34, 58, 34, 116, 34, 125, 125]), $.interfaceValue(m, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	await fmt.Println((err as any), m.value.Base.Name, $.interfaceValue(m.value.Base.Kids, "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))), $.pointerValue<Extra>(m.value.Extra).Note, $.basicInterfaceValue(m.value.inner.Deep, "int"), m.value.Shadowed, $.stringEqual(m.value.Base.Shadowed, ""), $.basicInterfaceValue(m.value.Size, "int"), m.value.Tagged.Name)

	let nilExtra: Node = $.markAsStructValue(new Node())
	let __goscriptTuple1: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(nilExtra)), "main.Node", "main.Node"))
	b = __goscriptTuple1[0]
	await fmt.Println($.bytesToString(b))
}

if ($.isMainScript(import.meta)) {
	await main()
}

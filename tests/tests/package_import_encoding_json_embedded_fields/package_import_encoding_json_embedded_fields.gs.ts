// Generated file based on package_import_encoding_json_embedded_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as fmt from "@goscript/fmt/index.js"

export class Base {
	public declare Name: string

	public declare Kids: $.Slice<string>

	public declare hidden: number

	public declare Shadowed: string

	constructor(__goscriptValue?: boolean, Name$?: string, Kids$?: $.Slice<string>, hidden$?: number, Shadowed$?: string) {
		this.Name = Name$ ?? ""
		this.Kids = Kids$ ?? (null! as $.Slice<string>)
		this.hidden = hidden$ ?? 0
		this.Shadowed = Shadowed$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Base {
		return new Base(true, this.Name, this.Kids, this.hidden, this.Shadowed)
	}

	public __goscriptAssign(source: Base): this {
		this.Name = source.Name
		this.Kids = source.Kids
		this.hidden = source.hidden
		this.Shadowed = source.Shadowed
		return this
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

	constructor(__goscriptValue?: boolean, Deep$?: number) {
		this.Deep = Deep$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(true, this.Deep)
	}

	public __goscriptAssign(source: inner): this {
		this.Deep = source.Deep
		return this
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

	constructor(__goscriptValue?: boolean, Note$?: string) {
		this.Note = Note$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Extra {
		return new Extra(true, this.Note)
	}

	public __goscriptAssign(source: Extra): this {
		this.Note = source.Note
		return this
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

	constructor(__goscriptValue?: boolean, Base$?: Base, Extra$?: Extra | $.VarRef<Extra> | null, inner$?: inner, Tagged$?: Base, Shadowed$?: string, Size$?: number, _private$?: boolean) {
		this.Base = Base$ ?? new Base(true)
		this.Extra = Extra$ ?? (null! as Extra | $.VarRef<Extra> | null)
		this.inner = inner$ ?? new inner(true)
		this.Tagged = Tagged$ ?? new Base(true)
		this.Shadowed = Shadowed$ ?? ""
		this.Size = Size$ ?? 0
		this._private = _private$ ?? false
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(true, this.Base.clone(), this.Extra, this.inner.clone(), this.Tagged.clone(), this.Shadowed, this.Size, this._private)
	}

	public __goscriptAssign(source: Node): this {
		this.Base.__goscriptAssign(source.Base)
		this.Extra = source.Extra
		this.inner.__goscriptAssign(source.inner)
		this.Tagged.__goscriptAssign(source.Tagged)
		this.Shadowed = source.Shadowed
		this.Size = source.Size
		this._private = source._private
		return this
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
	let n = new Node(true, new Base(true, "a", $.arrayToSlice<string>(["x"]), 3, "base"), new Extra(false, "n"), new inner(true, 7), undefined, "outer", 2, true)
	let __goscriptTuple0: any = (json.Marshal($.structInterfaceValue(n, "main.Node", "main.Node")) as [$.Slice<number>, $.GoError])
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	fmt.Println($.bytesToString(b), (err as any))

	let m: $.VarRef<Node> = $.varRef(new Node(true))
	m.value.Extra = new Extra()
	err = (json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 98, 34, 44, 34, 75, 105, 100, 115, 34, 58, 91, 34, 121, 34, 44, 34, 122, 34, 93, 44, 34, 78, 111, 116, 101, 34, 58, 34, 109, 34, 44, 34, 68, 101, 101, 112, 34, 58, 57, 44, 34, 83, 104, 97, 100, 111, 119, 101, 100, 34, 58, 34, 115, 34, 44, 34, 83, 105, 122, 101, 34, 58, 52, 44, 34, 116, 97, 103, 103, 101, 100, 34, 58, 123, 34, 78, 97, 109, 101, 34, 58, 34, 116, 34, 125, 125]), $.interfaceValue(m, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))) as $.GoError)
	fmt.Println((err as any), m.value.Base.Name, $.interfaceValue(m.value.Base.Kids, "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))), $.pointerValue<Extra>(m.value.Extra).Note, $.basicInterfaceValue(m.value.inner.Deep, "int"), m.value.Shadowed, $.stringEqual(m.value.Base.Shadowed, ""), $.basicInterfaceValue(m.value.Size, "int"), m.value.Tagged.Name)

	let nilExtra: Node = new Node(true)
	let __goscriptTuple1: any = (json.Marshal($.structInterfaceValue(nilExtra, "main.Node", "main.Node")) as [$.Slice<number>, $.GoError])
	b = __goscriptTuple1[0]
	fmt.Println($.bytesToString(b))
}

if ($.isMainScript(import.meta)) {
	await main()
}

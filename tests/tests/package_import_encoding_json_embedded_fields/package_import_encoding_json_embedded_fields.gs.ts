// Generated file based on package_import_encoding_json_embedded_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as fmt from "@goscript/fmt/index.js"

export class Base {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Kids(): $.Slice<string> {
		return this._fields.Kids
	}

	public set Kids(value: $.Slice<string>) {
		this._fields.Kids = value
	}

	public get hidden(): number {
		return this._fields.hidden
	}

	public set hidden(value: number) {
		this._fields.hidden = value
	}

	public get Shadowed(): string {
		return this._fields.Shadowed
	}

	public set Shadowed(value: string) {
		this._fields.Shadowed = value
	}

	public _fields: {
		Name: string
		Kids: $.Slice<string>
		hidden: number
		Shadowed: string
	}

	constructor(init?: Partial<{Name?: string, Kids?: $.Slice<string>, hidden?: number, Shadowed?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Kids: init?.Kids ?? (null! as $.Slice<string>),
			hidden: init?.hidden ?? (0 as number),
			Shadowed: init?.Shadowed ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Base {
		return new Base(this, true)
	}

	public __goscriptAssign(source: Base): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Kids = values.Kids
		target.hidden = values.hidden
		target.Shadowed = values.Shadowed
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
	public get Deep(): number {
		return this._fields.Deep
	}

	public set Deep(value: number) {
		this._fields.Deep = value
	}

	public _fields: {
		Deep: number
	}

	constructor(init?: Partial<{Deep?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Deep: init?.Deep ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(this, true)
	}

	public __goscriptAssign(source: inner): void {
		const target = this._fields
		const values = source._fields
		target.Deep = values.Deep
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
	public get Note(): string {
		return this._fields.Note
	}

	public set Note(value: string) {
		this._fields.Note = value
	}

	public _fields: {
		Note: string
	}

	constructor(init?: Partial<{Note?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Note: init?.Note ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Extra {
		return new Extra(this, true)
	}

	public __goscriptAssign(source: Extra): void {
		const target = this._fields
		const values = source._fields
		target.Note = values.Note
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
	public get Base(): Base {
		return this._fields.Base
	}

	public set Base(value: Base) {
		this._fields.Base = value
	}

	public get Extra(): Extra | $.VarRef<Extra> | null {
		return this._fields.Extra
	}

	public set Extra(value: Extra | $.VarRef<Extra> | null) {
		this._fields.Extra = value
	}

	public get inner(): inner {
		return this._fields.inner
	}

	public set inner(value: inner) {
		this._fields.inner = value
	}

	public get Tagged(): Base {
		return this._fields.Tagged
	}

	public set Tagged(value: Base) {
		this._fields.Tagged = value
	}

	public get Shadowed(): string {
		return this._fields.Shadowed
	}

	public set Shadowed(value: string) {
		this._fields.Shadowed = value
	}

	public get Size(): number {
		return this._fields.Size
	}

	public set Size(value: number) {
		this._fields.Size = value
	}

	public get _private(): boolean {
		return this._fields._private
	}

	public set _private(value: boolean) {
		this._fields._private = value
	}

	public _fields: {
		Base: Base
		Extra: Extra | $.VarRef<Extra> | null
		inner: inner
		Tagged: Base
		Shadowed: string
		Size: number
		_private: boolean
	}

	constructor(init?: Partial<{Base?: Base, Extra?: Extra | $.VarRef<Extra> | null, inner?: inner, Tagged?: Base, Shadowed?: string, Size?: number, _private?: boolean}>, __goscriptValue?: boolean) {
		this._fields = {
			Base: init?.Base ? init.Base.clone() : new Base(undefined, true),
			Extra: init?.Extra ?? (null! as Extra | $.VarRef<Extra> | null),
			inner: init?.inner ? init.inner.clone() : new inner(undefined, true),
			Tagged: init?.Tagged ? init.Tagged.clone() : new Base(undefined, true),
			Shadowed: init?.Shadowed ?? ("" as string),
			Size: init?.Size ?? (0 as number),
			_private: init?._private ?? (false as boolean)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Base, values.Base)
		target.Extra = values.Extra
		$.assignStruct(target.inner, values.inner)
		$.assignStruct(target.Tagged, values.Tagged)
		target.Shadowed = values.Shadowed
		target.Size = values.Size
		target._private = values._private
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
	let n = new Node({Base: new Base({Name: "a", Kids: $.arrayToSlice<string>(["x"]), hidden: 3, Shadowed: "base"}, true), Extra: new Extra({Note: "n"}), inner: new inner({Deep: 7}, true), Shadowed: "outer", Size: 2, _private: true}, true)
	let __goscriptTuple0: any = json.Marshal($.interfaceValue((n).clone(), "main.Node", "main.Node"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await fmt.Println($.bytesToString(b), (err as any))

	let m: $.VarRef<Node> = $.varRef(new Node(undefined, true))
	m.value.Extra = new Extra()
	err = json.Unmarshal(new Uint8Array([123, 34, 78, 97, 109, 101, 34, 58, 34, 98, 34, 44, 34, 75, 105, 100, 115, 34, 58, 91, 34, 121, 34, 44, 34, 122, 34, 93, 44, 34, 78, 111, 116, 101, 34, 58, 34, 109, 34, 44, 34, 68, 101, 101, 112, 34, 58, 57, 44, 34, 83, 104, 97, 100, 111, 119, 101, 100, 34, 58, 34, 115, 34, 44, 34, 83, 105, 122, 101, 34, 58, 52, 44, 34, 116, 97, 103, 103, 101, 100, 34, 58, 123, 34, 78, 97, 109, 101, 34, 58, 34, 116, 34, 125, 125]), $.interfaceValue(m, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))
	await fmt.Println((err as any), m.value.Base.Name, $.interfaceValue(m.value.Base.Kids, "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))), $.pointerValue<Extra>(m.value.Extra).Note, $.basicInterfaceValue(m.value.inner.Deep, "int"), m.value.Shadowed, $.stringEqual(m.value.Base.Shadowed, ""), $.basicInterfaceValue(m.value.Size, "int"), m.value.Tagged.Name)

	let nilExtra: Node = new Node(undefined, true)
	let __goscriptTuple1: any = json.Marshal($.interfaceValue((nilExtra).clone(), "main.Node", "main.Node"))
	b = __goscriptTuple1[0]
	await fmt.Println($.bytesToString(b))
}

if ($.isMainScript(import.meta)) {
	await main()
}

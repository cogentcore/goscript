// Generated file based on reflect_structof_embedded_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class Base {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	public __goscriptAssign(source: Base): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	public Label(): string {
		const b = this;
		return b.Name
	}

	public SetName(name: string): void {
		let b: Base | $.VarRef<Base> | null = this;
		$.pointerValue<Base>(b).Name = name
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("SetName", [["name", /* @__PURE__ */ $.basicType("string")]], [], true)],
		Base,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}

export class Node {
	public get Base(): Base {
		return this._fields.Base
	}

	public set Base(value: Base) {
		this._fields.Base = value
	}

	public get Value(): number {
		return this._fields.Value
	}

	public set Value(value: number) {
		this._fields.Value = value
	}

	public _fields: {
		Base: Base
		Value: number
	}

	constructor(init?: Partial<{Base?: Base, Value?: number}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base()),
			Value: init?.Value ?? (0 as number)
		}
	}

	public clone(): Node {
		return $.markAsStructValue(new Node(this))
	}

	public __goscriptAssign(source: Node): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Base, values.Base)
		target.Value = values.Value
	}

	public Label(): any {
		return $.pointerValue<Base>(this.Base).Label()
	}

	public SetName(name: any): any {
		return $.pointerValue<Base>(this.Base).SetName(name)
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("SetName", [["name", /* @__PURE__ */ $.basicType("string")]], [], true)],
		Node,
		() => [/* @__PURE__ */ $.structField("Base", "main.Base", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("Value", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// A struct type built from the fields of Node, whose embedded Base has
	// methods: Go allows this when Base is the first field.
	let nt = reflect.TypeOf($.interfaceValue($.markAsStructValue(new Node()), "main.Node", "main.Node"))
	let fields: $.Slice<reflect.StructField> = $.makeSlice<reflect.StructField>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(nt).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), undefined, undefined, () => $.markAsStructValue(new reflect.StructField()))
	for (let __goscriptRangeTarget0 = fields, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		$.assignStruct((__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i], $.markAsStructValue($.cloneStructValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(nt).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))))
	}
	let st = reflect.StructOf(fields)
	await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(st).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(st).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Anonymous, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(st).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Name)

	await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(st).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(st).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

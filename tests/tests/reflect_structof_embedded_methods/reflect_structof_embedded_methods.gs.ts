// Generated file based on reflect_structof_embedded_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class Base {
	public declare Name: string

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

	public Label(): string {
		const b = this;
		return b.Name
	}

	public SetName(name: string): void {
		let b: Base | $.VarRef<Base> | null = this;
		$.pointerValue<Base>(b).Name = name
	}

	static {
		$.bindStructFields(this.prototype, ["Name"])
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("SetName", [["name", /* @__PURE__ */ $.basicType("string")]])],
		Base,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}

export class Node {
	public declare Base: Base

	public declare Value: number

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

	public Label(): any {
		return $.pointerValue<Base>(this.Base).Label()
	}

	public SetName(name: any): any {
		return $.pointerValue<Base>(this.Base).SetName(name)
	}

	static {
		$.bindStructFields(this.prototype, ["Base", "Value"])
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [$.methodSignature("Label", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("SetName", [["name", /* @__PURE__ */ $.basicType("string")]])],
		Node,
		() => [/* @__PURE__ */ $.structField("Base", "main.Base", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("Value", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// A struct type built from the fields of Node, whose embedded Base has
	// methods: Go allows this when Base is the first field.
	let nt = reflect.TypeOf($.interfaceValue($.markAsStructValue(new Node()), "main.Node", "main.Node"))
	let fields: $.Slice<reflect.StructField> = $.makeSlice<reflect.StructField>(await $.pointerValue<Exclude<reflect.Type, null>>(nt).NumField(), undefined, undefined, () => $.markAsStructValue(new reflect.StructField()))
	for (let __goscriptRangeTarget0 = fields, i = 0; i < $.len(__goscriptRangeTarget0); i++) {
		$.assignStruct(fields![i], $.markAsStructValue($.cloneStructValue(await $.pointerValue<Exclude<reflect.Type, null>>(nt).Field(i))))
	}
	let st = reflect.StructOf(fields)
	await $.println(await $.pointerValue<Exclude<reflect.Type, null>>(st).NumField(), (await $.pointerValue<Exclude<reflect.Type, null>>(st).Field(0)).Anonymous, (await $.pointerValue<Exclude<reflect.Type, null>>(st).Field(1)).Name)

	await $.println(await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>(st).Field(0)).Type).String(), await $.pointerValue<Exclude<reflect.Type, null>>((await $.pointerValue<Exclude<reflect.Type, null>>(st).Field(1)).Type).String())
}

if ($.isMainScript(import.meta)) {
	await main()
}

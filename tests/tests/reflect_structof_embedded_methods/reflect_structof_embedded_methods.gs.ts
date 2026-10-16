// Generated file based on reflect_structof_embedded_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Base {
	public declare Name: string

	constructor(__goscriptValue?: boolean, Name$?: string) {
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Base {
		return new Base(true, this.Name)
	}

	public __goscriptAssign(source: Base): this {
		this.Name = source.Name
		return this
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
	public declare Base: Base

	public declare Value: number

	constructor(__goscriptValue?: boolean, Base$?: Base, Value$?: number) {
		this.Base = Base$ ?? new Base(true)
		this.Value = Value$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(true, this.Base.clone(), this.Value)
	}

	public __goscriptAssign(source: Node): this {
		this.Base.__goscriptAssign(source.Base)
		this.Value = source.Value
		return this
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
	let nt = reflect.TypeOf($.structInterfaceValue(new Node(true), "main.Node", "main.Node"))
	let fields = $.makeSlice<reflect.StructField>((__goscriptAwait = (nt !== null && (nt as any).__isVarRef !== true && ((nt as any).__goValue === undefined || (nt as any).__goType?.charCodeAt(0) !== 42) ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), undefined, undefined, () => $.markAsStructValue(new reflect.StructField()))
	for (let __goscriptRangeTarget0 = fields, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		$.assignStruct((__goscriptRangeWindow0.backing as any[])[__goscriptRangeWindow0.offset + i], ((__goscriptAwait = (nt !== null && (nt as any).__isVarRef !== true && ((nt as any).__goValue === undefined || (nt as any).__goType?.charCodeAt(0) !== 42) ? (nt as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(nt)).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField))
	}
	let st = reflect.StructOf(fields)
	await $.println((__goscriptAwait = (st !== null && (st as any).__isVarRef !== true && ((st as any).__goValue === undefined || (st as any).__goType?.charCodeAt(0) !== 42) ? (st as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(st)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), ((__goscriptAwait = (st !== null && (st as any).__isVarRef !== true && ((st as any).__goValue === undefined || (st as any).__goType?.charCodeAt(0) !== 42) ? (st as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(st)).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Anonymous, ((__goscriptAwait = (st !== null && (st as any).__isVarRef !== true && ((st as any).__goValue === undefined || (st as any).__goType?.charCodeAt(0) !== 42) ? (st as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(st)).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Name)

	await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(((__goscriptAwait = (st !== null && (st as any).__isVarRef !== true && ((st as any).__goValue === undefined || (st as any).__goType?.charCodeAt(0) !== 42) ? (st as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(st)).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(((__goscriptAwait = (st !== null && (st as any).__isVarRef !== true && ((st as any).__goValue === undefined || (st as any).__goType?.charCodeAt(0) !== 42) ? (st as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(st)).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

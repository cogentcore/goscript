// Generated file based on reflect_struct_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class inner {
	public declare A: number

	public declare B: string

	public _fields: {
		A: number
		B: string
	}

	constructor(init?: Partial<{A?: number, B?: string}>) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? ("" as string)
		}
	}

	public clone(): inner {
		return $.markAsStructValue(new inner(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
	}

	static __typeInfo = $.registerStructType(
		"main.inner",
		() => new inner(),
		() => [],
		inner,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export class outer {
	public declare X: number

	public declare In: inner

	public declare P: inner | $.VarRef<inner> | null

	public _fields: {
		X: number
		In: inner
		P: inner | $.VarRef<inner> | null
	}

	constructor(init?: Partial<{X?: number, In?: inner, P?: inner | $.VarRef<inner> | null}>) {
		this._fields = {
			X: init?.X ?? (0 as number),
			In: init?.In ? $.markAsStructValue($.cloneStructValue(init.In)) : $.markAsStructValue(new inner()),
			P: init?.P ?? (null! as inner | $.VarRef<inner> | null)
		}
	}

	public clone(): outer {
		return $.markAsStructValue(new outer(this))
	}

	static {
		$.bindStructFields(this.prototype, ["X", "In", "P"])
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [],
		outer,
		() => [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("float64"), [0], 0, true), /* @__PURE__ */ $.structField("In", "main.inner", [1], 8, true), /* @__PURE__ */ $.structField("P", /* @__PURE__ */ $.pointerType("main.inner"), [2], 32, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// Test creating a StructField value
	let field = (() => { const __goscriptLiteralField0 = reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }}); return $.markAsStructValue(new reflect.StructField({Name: "TestField", Type: __goscriptLiteralField0})) })()
	await $.println("StructField Name:", field.Name)
	await $.println("StructField Type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(field.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Type.FieldByIndex selects nested fields, following pointers to structs
	let typ = reflect.TypeOf($.interfaceValue($.markAsStructValue(new outer()), "main.outer", "main.outer"))
	let f = $.markAsStructValue($.cloneStructValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByIndex($.arrayToSlice<number>([0])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
	await $.println("FieldByIndex 0:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	$.assignStruct(f, $.markAsStructValue($.cloneStructValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByIndex($.arrayToSlice<number>([1, 1])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))))
	await $.println("FieldByIndex 1,1:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	$.assignStruct(f, $.markAsStructValue($.cloneStructValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByIndex($.arrayToSlice<number>([2, 0])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))))
	await $.println("FieldByIndex 2,0:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

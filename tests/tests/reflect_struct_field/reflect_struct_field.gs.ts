// Generated file based on reflect_struct_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class inner {
	public get A(): number {
		return this._fields.A
	}

	public set A(value: number) {
		this._fields.A = value
	}

	public get B(): string {
		return this._fields.B
	}

	public set B(value: string) {
		this._fields.B = value
	}

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

	public __goscriptAssign(source: inner): void {
		const target = this._fields
		const values = source._fields
		target.A = values.A
		target.B = values.B
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
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public get In(): inner {
		return this._fields.In
	}

	public set In(value: inner) {
		this._fields.In = value
	}

	public get P(): inner | $.VarRef<inner> | null {
		return this._fields.P
	}

	public set P(value: inner | $.VarRef<inner> | null) {
		this._fields.P = value
	}

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

	public __goscriptAssign(source: outer): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
		$.assignStruct(target.In, values.In)
		target.P = values.P
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
	let field = (() => { const __goscriptLiteralField0 = reflect.TypeFor(__goscriptStatic0()); return $.markAsStructValue(new reflect.StructField({Name: "TestField", Type: __goscriptLiteralField0})) })()
	await $.println("StructField Name:", field.Name)
	await $.println("StructField Type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(field.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Type.FieldByIndex selects nested fields, following pointers to structs
	let typ = reflect.TypeOf($.interfaceValue($.markAsStructValue(new outer()), "main.outer", "main.outer"))
	let f = $.markAsStructValue($.cloneStructValue((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByIndex($.arrayToSlice<number>([0])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
	await $.println("FieldByIndex 0:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	$.assignStruct(f, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByIndex($.arrayToSlice<number>([1, 1])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("FieldByIndex 1,1:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	$.assignStruct(f, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByIndex($.arrayToSlice<number>([2, 0])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("FieldByIndex 2,0:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

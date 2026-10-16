// Generated file based on reflect_struct_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class inner {
	public declare A: number

	public declare B: string

	constructor(__goscriptValue?: boolean, A$?: number, B$?: string) {
		this.A = A$ ?? 0
		this.B = B$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(true, this.A, this.B)
	}

	public __goscriptAssign(source: inner): this {
		this.A = source.A
		this.B = source.B
		return this
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

	constructor(__goscriptValue?: boolean, X$?: number, In$?: inner, P$?: inner | $.VarRef<inner> | null) {
		this.X = X$ ?? 0
		this.In = In$ ?? new inner(true)
		this.P = P$ ?? (null! as inner | $.VarRef<inner> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(true, this.X, this.In.clone(), this.P)
	}

	public __goscriptAssign(source: outer): this {
		this.X = source.X
		this.In.__goscriptAssign(source.In)
		this.P = source.P
		return this
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
	let typ = reflect.TypeOf($.structInterfaceValue(new outer(true), "main.outer", "main.outer"))
	let f = $.markAsStructValue($.cloneStructValue(((__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && ((typ as any).__goValue === undefined || (typ as any).__goType?.charCodeAt(0) !== 42) ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).FieldByIndex($.arrayToSlice<number>([0])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField)))
	await $.println("FieldByIndex 0:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	f = $.assignStruct(f, ((__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && ((typ as any).__goValue === undefined || (typ as any).__goType?.charCodeAt(0) !== 42) ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).FieldByIndex($.arrayToSlice<number>([1, 1])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField))
	await $.println("FieldByIndex 1,1:", f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	f = $.assignStruct(f, ((__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && ((typ as any).__goValue === undefined || (typ as any).__goType?.charCodeAt(0) !== 42) ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).FieldByIndex($.arrayToSlice<number>([2, 0])), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField))
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

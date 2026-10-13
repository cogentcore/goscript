// Generated file based on reflect_newat_offset.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/reflect/index.js"
import "@goscript/unsafe/index.js"

export class Sub {
	public declare X: number

	public declare Y: string

	public _fields: {
		X: number
		Y: string
	}

	constructor(init?: Partial<{X?: number, Y?: string}>) {
		this._fields = {
			X: init?.X ?? (0 as number),
			Y: init?.Y ?? ("" as string)
		}
	}

	public clone(): Sub {
		return $.markAsStructValue(new Sub(this))
	}

	static {
		$.bindStructFields(this.prototype, ["X", "Y"])
	}

	static __typeInfo = $.registerStructType(
		"main.Sub",
		() => new Sub(),
		() => [],
		Sub,
		() => [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export class T {
	public declare Mbr1: string

	public declare Mbr2: number

	public declare S: Sub

	public _fields: {
		Mbr1: string
		Mbr2: number
		S: Sub
	}

	constructor(init?: Partial<{Mbr1?: string, Mbr2?: number, S?: Sub}>) {
		this._fields = {
			Mbr1: init?.Mbr1 ?? ("" as string),
			Mbr2: init?.Mbr2 ?? (0 as number),
			S: init?.S ? $.markAsStructValue($.cloneStructValue(init.S)) : $.markAsStructValue(new Sub())
		}
	}

	public clone(): T {
		return $.markAsStructValue(new T(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Mbr1", "Mbr2", "S"])
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [],
		T,
		() => [/* @__PURE__ */ $.structField("Mbr1", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Mbr2", /* @__PURE__ */ $.basicType("int"), [1], 16, true), /* @__PURE__ */ $.structField("S", "main.Sub", [2], 24, true)]
	)
}

export let pt: $.VarRef<T> = $.varRef($.markAsStructValue(new T()))

export function __goscript_set_pt(__goscriptValue: T): void {
	$.assignStruct(pt.value, __goscriptValue)
}

export function fieldValue(obj: any, fld: reflect.StructField): reflect.Value {
	let ov = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(obj)))
	let f = ($.uint($.uint64Add($.markAsStructValue($.cloneStructValue(ov)).Pointer(), fld.Offset), 64) as any)
	return $.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(fld.Type)!, f)))
}

export async function main(): globalThis.Promise<void> {
	let typ = reflect.TypeOf($.interfaceValue($.markAsStructValue($.cloneStructValue(pt.value)), "main.T", "main.T"))
	let [fld, ] = await $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByName("Mbr2")
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fieldValue($.interfaceValue(pt, "*main.T", /* @__PURE__ */ $.pointerType("main.T")), $.markAsStructValue($.cloneStructValue(fld))))).Elem())).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(10, "int")))))
	await $.println(pt.value.Mbr2)

	let __goscriptTuple0: any = await $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByName("Mbr1")
	$.assignStruct(fld, __goscriptTuple0[0])
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fieldValue($.interfaceValue(pt, "*main.T", /* @__PURE__ */ $.pointerType("main.T")), $.markAsStructValue($.cloneStructValue(fld))))).Elem())).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf("new"))))
	await $.println(pt.value.Mbr1, pt.value.Mbr2)

	let [sf, ] = await $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByName("S")
	let [yf, ] = await $.pointerValue<Exclude<reflect.Type, null>>(sf.Type).FieldByName("Y")
	let ov = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pt, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(yf.Type)!, ($.uint($.uint64Add(($.uint($.uint64Add($.markAsStructValue($.cloneStructValue(ov)).Pointer(), sf.Offset), 64)), yf.Offset), 64) as any)))).Elem())).SetString("sub")
	await $.println(pt.value.S.Y)

	let local: T | $.VarRef<T> | null = new T()
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fieldValue($.interfaceValue(local, "*main.T", /* @__PURE__ */ $.pointerType("main.T")), $.markAsStructValue($.cloneStructValue(fld))))).Elem())).SetString("loc")
	await $.println($.pointerValue<T>(local).Mbr1)

	let v = $.varRef(3)
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}))!, ($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Pointer() as any)))).Elem())).SetInt(4n)
	await $.println(v.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

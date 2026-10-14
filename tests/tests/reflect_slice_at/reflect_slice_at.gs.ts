// Generated file based on reflect_slice_at.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/reflect/index.js"
import "@goscript/unsafe/index.js"

export class Sub {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public get Y(): string {
		return this._fields.Y
	}

	public set Y(value: string) {
		this._fields.Y = value
	}

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

	public __goscriptAssign(source: Sub): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
		target.Y = values.Y
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
	public get Mbr1(): string {
		return this._fields.Mbr1
	}

	public set Mbr1(value: string) {
		this._fields.Mbr1 = value
	}

	public get Mbr2(): number {
		return this._fields.Mbr2
	}

	public set Mbr2(value: number) {
		this._fields.Mbr2 = value
	}

	public get S(): Sub {
		return this._fields.S
	}

	public set S(value: Sub) {
		this._fields.S = value
	}

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

	public __goscriptAssign(source: T): void {
		const target = this._fields
		const values = source._fields
		target.Mbr1 = values.Mbr1
		target.Mbr2 = values.Mbr2
		$.assignStruct(target.S, values.S)
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

export async function newAtOffsets(): globalThis.Promise<void> {
	let typ = reflect.TypeOf($.interfaceValue($.markAsStructValue($.cloneStructValue(pt.value)), "main.T", "main.T"))
	let [fld, ] = await $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByName("Mbr2")
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fieldValue($.interfaceValue(pt, "*main.T", /* @__PURE__ */ $.pointerType("main.T")), fld))).Elem())).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(10, "int")))))
	await $.println("newat-offset:", pt.value.Mbr2)

	let __goscriptTuple0: any = await $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByName("Mbr1")
	$.assignStruct(fld, __goscriptTuple0[0])
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fieldValue($.interfaceValue(pt, "*main.T", /* @__PURE__ */ $.pointerType("main.T")), fld))).Elem())).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf("new"))))
	await $.println("newat-offset:", pt.value.Mbr1, pt.value.Mbr2)

	let [sf, ] = await $.pointerValue<Exclude<reflect.Type, null>>(typ).FieldByName("S")
	let [yf, ] = await $.pointerValue<Exclude<reflect.Type, null>>(sf.Type).FieldByName("Y")
	let ov = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pt, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(yf.Type)!, ($.uint($.uint64Add(($.uint($.uint64Add($.markAsStructValue($.cloneStructValue(ov)).Pointer(), sf.Offset), 64)), yf.Offset), 64) as any)))).Elem())).SetString("sub")
	await $.println("newat-offset:", pt.value.S.Y)

	let local: T | $.VarRef<T> | null = new T()
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fieldValue($.interfaceValue(local, "*main.T", /* @__PURE__ */ $.pointerType("main.T")), fld))).Elem())).SetString("loc")
	await $.println("newat-offset:", $.pointerValue<T>(local).Mbr1)

	let v = $.varRef(3)
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!, ($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Pointer() as any)))).Elem())).SetInt(4n)
	await $.println("newat-offset:", v.value)
}

export async function main(): globalThis.Promise<void> {
	let local = $.varRef(41)
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!, (local as any)))).Elem())).SetInt(42n)
	await $.println("newat-local:", local.value)

	class holder {
		public get Count(): number {
			return this._fields.Count
		}

		public set Count(value: number) {
			this._fields.Count = value
		}

		public _fields: {
			Count: number
		}

		constructor(init?: Partial<{Count?: number}>) {
			this._fields = {
				Count: init?.Count ?? (0 as number)
			}
		}

		public clone(): holder {
			return $.markAsStructValue(new holder(this))
		}

		public __goscriptAssign(source: holder): void {
			const target = this._fields
			const values = source._fields
			target.Count = values.Count
		}

		static __typeInfo = $.registerStructType(
			"main.holder",
			() => new holder(),
			() => [],
			holder,
			() => [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
		)
	}
	let h = $.markAsStructValue(new holder({Count: 5}))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.NewAt($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!, ($.fieldRef(h._fields, "Count") as any)))).Elem())).SetInt(6n)
	await $.println("newat-field:", h.Count)

	let buf: $.Slice<number> = new Uint8Array([1, 2, 3, 4]) as $.Slice<number>
	let bytes = $.markAsStructValue($.cloneStructValue(reflect.SliceAt($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!, ($.indexRef(buf!, 1) as any), 2)))
	await $.println("bytes:", $.markAsStructValue($.cloneStructValue(bytes)).Len(), $.markAsStructValue($.cloneStructValue(bytes)).Cap(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bytes)).Index(0))).Uint(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bytes)).Index(1))).Uint())
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bytes)).Index(0))).SetUint(9n)
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bytes)).Index(1))).SetUint(8n)
	await $.println("buf:", $.uint($.arrayIndex(buf!, 0), 8), $.uint($.arrayIndex(buf!, 1), 8), $.uint($.arrayIndex(buf!, 2), 8), $.uint($.arrayIndex(buf!, 3), 8))

	let ints: $.Slice<number> = $.arrayToSlice<number>([10, 20, 30, 40])
	let intSlice = $.markAsStructValue($.cloneStructValue(reflect.SliceAt($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!, ($.indexRef(ints!, 1) as any), 2)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(intSlice)).Index(1))).SetInt(77n)
	await $.println("ints:", $.arrayIndex(ints!, 0), $.arrayIndex(ints!, 1), $.arrayIndex(ints!, 2), $.arrayIndex(ints!, 3), $.markAsStructValue($.cloneStructValue(intSlice)).Len(), $.markAsStructValue($.cloneStructValue(intSlice)).Cap())

	let empty = $.markAsStructValue($.cloneStructValue(reflect.SliceAt($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!, (null as any), 0)))
	await $.println("empty:", $.markAsStructValue($.cloneStructValue(empty)).IsNil(), $.markAsStructValue($.cloneStructValue(empty)).Len(), $.markAsStructValue($.cloneStructValue(empty)).Cap())

	await newAtOffsets()

	await $.println("reflect_slice_at test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

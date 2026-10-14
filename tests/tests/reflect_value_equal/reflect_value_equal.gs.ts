// Generated file based on reflect_value_equal.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class P {
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

	public clone(): P {
		return $.markAsStructValue(new P(this))
	}

	static {
		$.bindStructFields(this.prototype, ["X", "Y"])
	}

	static __typeInfo = $.registerStructType(
		"main.P",
		() => new P(),
		() => [],
		P,
		() => [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("Y", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let v = $.varRef(1)
	let w = $.varRef(1)
	let pv = $.varRef(v)
	let pw = w
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pv.value, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pv.value, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pv.value, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pw, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))))))
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(v.value, "int")))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(w.value, "int"))))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1n, "int64")))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1, "int"))))))
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pv, "**int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))))).Elem())).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pv.value, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))))))
	let n1: $.VarRef<number> | null = null! as $.VarRef<number> | null
	let n2: $.VarRef<number> | null = null! as $.VarRef<number> | null
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n1, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n2, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(n1, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pv.value, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))))))
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new P({X: 1, Y: "a"})), "main.P", "main.P")))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new P({X: 1, Y: "a"})), "main.P", "main.P"))))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new P({X: 1, Y: "a"})), "main.P", "main.P")))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new P({X: 1, Y: "b"})), "main.P", "main.P"))))))
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf(null))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf(null)))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf(null))).Equal($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1, "int"))))))

	class Z {
		public declare S: $.Slice<number>

		public declare M: globalThis.Map<string, number> | null

		public declare P: $.VarRef<number> | null

		public declare F: number

		public declare B: boolean

		public declare T: string

		public _fields: {
			S: $.Slice<number>
			M: globalThis.Map<string, number> | null
			P: $.VarRef<number> | null
			F: number
			B: boolean
			T: string
		}

		constructor(init?: Partial<{S?: $.Slice<number>, M?: globalThis.Map<string, number> | null, P?: $.VarRef<number> | null, F?: number, B?: boolean, T?: string}>) {
			this._fields = {
				S: init?.S ?? (null! as $.Slice<number>),
				M: init?.M ?? (null! as globalThis.Map<string, number> | null),
				P: init?.P ?? (null! as $.VarRef<number> | null),
				F: init?.F ?? (0 as number),
				B: init?.B ?? (false as boolean),
				T: init?.T ?? ("" as string)
			}
		}

		public clone(): Z {
			return $.markAsStructValue(new Z(this))
		}

		static {
			$.bindStructFields(this.prototype, ["S", "M", "P", "F", "B", "T"])
		}

		static __typeInfo = $.registerStructType(
			"main.Z",
			() => new Z(),
			() => [],
			Z,
			() => [/* @__PURE__ */ $.structField("S", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), [0], 0, true), /* @__PURE__ */ $.structField("M", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")), [1], 24, true), /* @__PURE__ */ $.structField("P", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")), [2], 32, true), /* @__PURE__ */ $.structField("F", /* @__PURE__ */ $.basicType("float64"), [3], 40, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("bool"), [4], 48, true), /* @__PURE__ */ $.structField("T", /* @__PURE__ */ $.basicType("string"), [5], 56, true)]
		)
	}
	let z = $.markAsStructValue(new Z())
	let zv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue($.cloneStructValue(z)), "main.Z", "main.Z"))))
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(zv)).NumField(); i++) {
		await $.println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(zv)).Type()).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait).Name, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(zv)).Field(i))).IsZero())
	}
	await $.println($.markAsStructValue($.cloneStructValue(zv)).IsZero(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new Z({T: "x"})), "main.Z", "main.Z")))).IsZero())
	await $.println($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).IsZero(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))).IsZero())
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

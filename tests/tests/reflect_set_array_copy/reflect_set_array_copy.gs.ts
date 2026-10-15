// Generated file based on reflect_set_array_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Pose {
	public get M(): number[] {
		return this._fields.M
	}

	public set M(value: number[]) {
		this._fields.M = value
	}

	public get A(): number[] {
		return this._fields.A
	}

	public set A(value: number[]) {
		this._fields.A = value
	}

	public get Inner(): {"B": number[]} {
		return this._fields.Inner
	}

	public set Inner(value: {"B": number[]}) {
		this._fields.Inner = value
	}

	public _fields: {
		M: number[]
		A: number[]
		Inner: {"B": number[]}
	}

	constructor(init?: Partial<{M?: number[], A?: number[], Inner?: {"B": number[]}}>, __goscriptValue?: boolean) {
		this._fields = {
			M: init?.M !== undefined ? $.cloneArrayValue(init.M, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4)) : $.arrayValue(globalThis.Array.from({ length: 4 }, () => 0), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4)),
			A: init?.A !== undefined ? $.cloneArrayValue(init.A, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0)),
			Inner: init?.Inner ? $.markAsStructValue($.cloneStructValue(init.Inner)) : $.anonymousStructValue({"B": $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), [0], 0, true)] })
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pose {
		return new Pose(this, true)
	}

	public __goscriptAssign(source: Pose): void {
		const target = this._fields
		const values = source._fields
		target.M = $.assignFieldValue(target.M, values.M, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4))
		target.A = $.assignFieldValue(target.A, values.A, /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
		$.assignStruct(target.Inner, values.Inner)
	}

	static __typeInfo = $.registerStructType(
		"main.Pose",
		() => new Pose(),
		() => [],
		Pose,
		() => [/* @__PURE__ */ $.structField("M", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4), [0], 0, true), /* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), [1], 16, true), /* @__PURE__ */ $.structField("Inner", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), [0], 0, true)] }, [2], 32, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let a = $.varRef(new Pose({M: $.arrayValue([1, 2, 3, 4], /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("float32"), 4)), A: $.arrayValue([5, 6])}, true))
	a.value.Inner.B = $.arrayValue([7, 8])
	let b: $.VarRef<Pose> = $.varRef(new Pose(undefined, true))
	let c: $.VarRef<Pose> = $.varRef(new Pose(undefined, true))
	let d: $.VarRef<Pose> = $.varRef(new Pose(undefined, true))
	let av = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(a, "*main.Pose", /* @__PURE__ */ $.pointerType("main.Pose"))))).Elem()))

	// Set an array field from another array field.
	let bv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(b, "*main.Pose", /* @__PURE__ */ $.pointerType("main.Pose"))))).Elem()))
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(av)).NumField(); i++) {
		$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(bv)).Field(i))).Set($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(av)).Field(i))))
	}

	// Set an array field from a converted array field.
	let cv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(c, "*main.Pose", /* @__PURE__ */ $.pointerType("main.Pose"))))).Elem()))
	for (let i = 0; i < $.markAsStructValue($.cloneStructValue(av)).NumField(); i++) {
		$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(cv)).Field(i))).Set($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(av)).Field(i))).Convert($.pointerValueOrNil($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(cv)).Field(i))).Type())!))))
	}

	// Set a whole struct.
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(d, "*main.Pose", /* @__PURE__ */ $.pointerType("main.Pose"))))).Elem())).Set($.markAsStructValue($.cloneStructValue(av)))

	a.value.M[0] = 100
	a.value.A[0] = 200
	a.value.Inner.B[0] = 300
	await $.println("b:", $.arrayIndex(b.value.M, 0), $.arrayIndex(b.value.A, 0), $.arrayIndex(b.value.Inner.B, 0))
	await $.println("c:", $.arrayIndex(c.value.M, 0), $.arrayIndex(c.value.A, 0), $.arrayIndex(c.value.Inner.B, 0))
	await $.println("d:", $.arrayIndex(d.value.M, 0), $.arrayIndex(d.value.A, 0), $.arrayIndex(d.value.Inner.B, 0))

	b.value.M[1] = 9
	await $.println("c after b:", $.arrayIndex(c.value.M, 1), $.arrayIndex(d.value.M, 1), $.arrayIndex(a.value.M, 1))

	// Index of an array element set from an array.
	let arrs = $.varRef($.arrayValue(globalThis.Array.from({ length: 2 }, () => $.arrayValue(globalThis.Array.from({ length: 2 }, () => 0))), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), 2)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(arrs, "*[2][2]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), 2)))))).Elem())).Index(0))).Set($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(av)).Field(1))))
	a.value.A[1] = 400
	await $.println("arrs:", $.arrayIndex($.arrayIndex(arrs.value, 0), 1))

	// Interface returns a copy of an array.
	let x = $.cloneArrayValue($.mustTypeAssert<number[]>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(av)).Field(1))).Interface(), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2)), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2))
	a.value.A[1] = 500
	await $.println("interface:", $.arrayIndex(x, 1))
}

if ($.isMainScript(import.meta)) {
	await main()
}

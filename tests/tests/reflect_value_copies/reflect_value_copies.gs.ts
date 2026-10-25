// Generated file based on reflect_value_copies.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class slot {
	public declare n: number

	public declare ref: reflect.Value

	constructor(__goscriptValue?: boolean, n$?: number, ref$?: reflect.Value) {
		this.n = n$ ?? 0
		this.ref = ref$ ?? $.markAsStructValue(new reflect.Value())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): slot {
		return new slot(true, this.n, this.ref)
	}

	public __goscriptAssign(source: slot): this {
		this.n = source.n
		this.ref = source.ref
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.slot",
		() => new slot(),
		() => [],
		slot,
		() => [/* @__PURE__ */ $.structField("n", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/reflect_value_copies" }), /* @__PURE__ */ $.structField("ref", "reflect.Value", [1], 8, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/reflect_value_copies" })]
	)
}

export async function main(): globalThis.Promise<void> {
	// A copy of a settable Value sets the same variable.
	let x = $.varRef(1)
	let v = reflect.ValueOf($.interfaceValue(x, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))).Elem()
	let w = v
	w.SetInt(2n)
	await $.println("copy set:", x.value, v.Int(), w.Int())

	// Struct copies share the Value and its variable.
	let s = new slot(true, 1, v)
	let t = (s).clone()
	t.n = 2
	t.ref.SetInt(3n)
	await $.println("struct copy:", s.n, t.n, x.value, s.ref.Int())

	// A slice of slots copies Values on assignment.
	let stack = $.makeSlice<slot>(3, undefined, undefined, () => new slot(true))
	$.sliceElems(stack!)[$.sliceSlot(stack!, 0)].__goscriptAssign((() => { const __goscriptLiteralField0 = reflect.ValueOf("a"); return new slot(true, undefined, __goscriptLiteralField0) })())
	$.sliceElems(stack!)[$.sliceSlot(stack!, 1)].__goscriptAssign($.arrayIndex(stack!, 0))
	$.sliceElems(stack!)[$.sliceSlot(stack!, 0)].__goscriptAssign((() => { const __goscriptLiteralField1 = reflect.ValueOf($.basicInterfaceValue(5, "int")); return new slot(true, undefined, __goscriptLiteralField1) })())
	await $.println("stack:", $.arrayIndex(stack!, 0).ref.Int(), $.arrayIndex(stack!, 1).ref.String(), $.arrayIndex(stack!, 2).ref.IsValid())

	// A Value of a struct field reads and writes the field.
	class pair {
		public declare A: number

		public declare B: number

		constructor(init?: Partial<{A?: number, B?: number}>, __goscriptValue?: boolean) {
			this.A = init?.A ?? (0 as number)
			this.B = init?.B ?? (0 as number)
			;(this as any)[$.structValueMarker] = __goscriptValue === true
		}

		public clone(): pair {
			return new pair(this, true)
		}

		public __goscriptAssign(source: pair): this {
			this.A = source.A
			this.B = source.B
			return this
		}

		static __typeInfo = $.registerStructType(
			"main.pair",
			() => new pair(),
			() => [],
			pair,
			() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("int"), [1], 8, true)]
		)
	}
	let p = $.varRef($.markAsStructValue(new pair({A: 1, B: 2})))
	let pv = reflect.ValueOf($.interfaceValue(p, "*main.pair", /* @__PURE__ */ $.pointerType("main.pair"))).Elem()
	let fa = pv.Field(0)
	let fb = fa
	fb.SetInt(10n)
	await $.println("field:", p.value.A, fa.Int(), pv.Field(1).Int())

	// The zero Value of a field is invalid.
	let z: slot = new slot(true)
	await $.println("zero:", z.ref.IsValid(), reflect.Kind_String(z.ref.Kind()))
}

if ($.isMainScript(import.meta)) {
	await main()
}

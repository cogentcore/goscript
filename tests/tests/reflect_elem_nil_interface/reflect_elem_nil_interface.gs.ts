// Generated file based on reflect_elem_nil_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export type shape = {
	Area(): number
}

$.registerInterfaceType(
	"main.shape",
	null,
	[$.methodSignature("Area", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class square {
	public declare Side: number

	public _fields: {
		Side: number
	}

	constructor(init?: Partial<{Side?: number}>) {
		this._fields = {
			Side: init?.Side ?? (0 as number)
		}
	}

	public clone(): square {
		return $.markAsStructValue(new square(this))
	}

	public Area(): number {
		const s = this;
		return s.Side * s.Side
	}

	static {
		$.bindStructFields(this.prototype, ["Side"])
	}

	static __typeInfo = $.registerStructType(
		"main.square",
		() => new square(),
		() => [$.methodSignature("Area", [], [/* @__PURE__ */ $.basicType("int")])],
		square,
		() => [/* @__PURE__ */ $.structField("Side", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export class holder {
	public declare S: shape | null

	public declare A: any

	public _fields: {
		S: shape | null
		A: any
	}

	constructor(init?: Partial<{S?: shape | null, A?: any}>) {
		this._fields = {
			S: init?.S ?? (null! as shape | null),
			A: init?.A ?? (null! as any)
		}
	}

	public clone(): holder {
		return $.markAsStructValue(new holder(this))
	}

	static {
		$.bindStructFields(this.prototype, ["S", "A"])
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [/* @__PURE__ */ $.structField("S", "main.shape", [0], 0, true), /* @__PURE__ */ $.structField("A", { kind: $.TypeKind.Interface, methods: [] }, [1], 16, true)]
	)
}

export function underlying(v: reflect.Value): reflect.Value {
	while (($.markAsStructValue($.cloneStructValue(v)).Kind() == 20) || ($.markAsStructValue($.cloneStructValue(v)).Kind() == 22)) {
		let e: reflect.Value = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem()))
		if (!$.markAsStructValue($.cloneStructValue(e)).IsValid()) {
			return $.markAsStructValue($.cloneStructValue(v))
		}
		$.assignStruct(v, $.markAsStructValue($.cloneStructValue(e)))
	}
	return $.markAsStructValue($.cloneStructValue(v))
}

export async function main(): globalThis.Promise<void> {
	let empty: $.VarRef<holder> = $.varRef($.markAsStructValue(new holder()))
	let ev = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(empty, "*main.holder", /* @__PURE__ */ $.pointerType("main.holder"))))).Elem()))
	let s = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Field(0)))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(s)).Kind()), $.markAsStructValue($.cloneStructValue(s)).IsNil(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(s)).Elem())).IsValid())
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue(s))))).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Field(1)))))).Kind()))

	let full = $.varRef($.markAsStructValue(new holder({S: $.interfaceValue<shape | null>($.markAsStructValue(new square({Side: 3})), "main.square", "main.square"), A: $.interfaceValue(new square({Side: 2}), "*main.square", /* @__PURE__ */ $.pointerType("main.square"))})))
	let fv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(full, "*main.holder", /* @__PURE__ */ $.pointerType("main.holder"))))).Elem()))
	let u = $.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fv)).Field(0))))))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(u)).Kind()), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(u)).Field(0))).Int())
	$.assignStruct(u, $.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fv)).Field(1)))))))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(u)).Kind()), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(u)).Field(0))).Int())

	let nilAny: $.VarRef<any> = $.varRef(null! as any)
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(nilAny, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }))))).Elem())).Elem())).IsValid())
}

if ($.isMainScript(import.meta)) {
	await main()
}

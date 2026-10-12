// Generated file based on reflect_elem_struct_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class T {
	public declare A: string

	public declare B: number

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): T {
		return $.markAsStructValue(new T(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [],
		T,
		() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("B", /* @__PURE__ */ $.basicType("float32"), [1], 16, true)]
	)
}

export function walk(v: reflect.Value): string {
	if ($.markAsStructValue($.cloneStructValue(v)).Kind() == 22) {
		if ($.markAsStructValue($.cloneStructValue(v)).IsNil()) {
			return "nil"
		}
		return "*" + walk($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem())))
	}
	return reflect.Kind_String($.markAsStructValue($.cloneStructValue(v)).Kind())
}

export async function main(): globalThis.Promise<void> {
	let s: $.VarRef<T | $.VarRef<T> | null> = $.varRef(new T({A: "aaa", B: 3.14}))
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s.value, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(v)).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem())).Kind()), await $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem())).Type()).String())
	await $.println(walk($.markAsStructValue($.cloneStructValue(v))), walk($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "**main.T", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.pointerType("main.T"))))))))

	let np: T | $.VarRef<T> | null = null! as T | $.VarRef<T> | null
	await $.println(walk($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(np, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(np, "*main.T", /* @__PURE__ */ $.pointerType("main.T"))))).Elem())).IsValid())

	let e = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem()))
	await $.println($.markAsStructValue($.cloneStructValue(e)).NumField(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(0))).String(), $.markAsStructValue($.cloneStructValue(e)).CanSet())
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(0))).SetString("bbb")
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).FieldByName("B"))).SetFloat(2.5)
	await $.println($.pointerValue<T>(s.value).A, $.pointerValue<T>(s.value).B)
}

if ($.isMainScript(import.meta)) {
	await main()
}

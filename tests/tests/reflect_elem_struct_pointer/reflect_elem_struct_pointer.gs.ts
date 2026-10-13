// Generated file based on reflect_elem_struct_pointer.go
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

export function walk(v: reflect.Value): string {
	if ($.markAsStructValue($.cloneStructValue(v)).Kind() == 22) {
		if ($.markAsStructValue($.cloneStructValue(v)).IsNil()) {
			return "nil"
		}
		return $.concatString("*", walk($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem()))))
	}
	return reflect.Kind_String($.markAsStructValue($.cloneStructValue(v)).Kind())
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
	let s: $.VarRef<T | $.VarRef<T> | null> = $.varRef(new T({A: "aaa", B: 3.140000104904175}))
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

	// Field Values copied into a slice read back what was set through them.
	let fields: $.Slice<reflect.Value> = $.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(0))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(1)))])
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 0))).SetString("ccc")
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 1))).SetFloat(1.5)
	await $.println($.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 0))).String(), $.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 1))).Float(), $.pointerValue<T>(s.value).A, $.pointerValue<T>(s.value).B)

	// Values made by New read back what was set through them, as decoders
	// building map keys do.
	let name = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf(""))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(name)).SetString("a")
	await $.println($.markAsStructValue($.cloneStructValue(name)).String(), $.mustTypeAssert<string>($.markAsStructValue($.cloneStructValue(name)).Interface(), /* @__PURE__ */ $.basicType("string")))
	$.markAsStructValue($.cloneStructValue(name)).SetString("é")
	await $.println($.markAsStructValue($.cloneStructValue(name)).Len())

	let n = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0, "int")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(n)).SetInt(7n)
	let big = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0n, "int64")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(big)).SetInt(1099511627776n)
	await $.println($.markAsStructValue($.cloneStructValue(n)).Int(), $.markAsStructValue($.cloneStructValue(big)).Int())

	let f = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0.0, "float64")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(f)).SetFloat(2.5)
	let b = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf(false))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(b)).SetBool(true)
	await $.println($.markAsStructValue($.cloneStructValue(f)).Float(), $.markAsStructValue($.cloneStructValue(b)).Bool())

	let sl = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.interfaceValue($.arrayToSlice<string>([]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(sl)).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["x", "y"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))))
	await $.println($.markAsStructValue($.cloneStructValue(sl)).Len())

	// The element of a nil interface is the zero Value.
	let empty: $.VarRef<holder> = $.varRef($.markAsStructValue(new holder()))
	let ev = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(empty, "*main.holder", /* @__PURE__ */ $.pointerType("main.holder"))))).Elem()))
	let sf = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Field(0)))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(sf)).Kind()), $.markAsStructValue($.cloneStructValue(sf)).IsNil(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(sf)).Elem())).IsValid())
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue(sf))))).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Field(1)))))).Kind()))

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

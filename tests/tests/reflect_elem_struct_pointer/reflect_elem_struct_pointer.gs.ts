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

export type node = {
	AsBase(): base | $.VarRef<base> | null
}

$.registerInterfaceType(
	"main.node",
	null,
	[$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.base")])]
);

export class T {
	public get A(): string {
		return this._fields.A
	}

	public set A(value: string) {
		this._fields.A = value
	}

	public get B(): number {
		return this._fields.B
	}

	public set B(value: number) {
		this._fields.B = value
	}

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): T {
		return new T(this, true)
	}

	public __goscriptAssign(source: T): void {
		const target = this._fields
		const values = source._fields
		target.A = values.A
		target.B = values.B
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
	public get Side(): number {
		return this._fields.Side
	}

	public set Side(value: number) {
		this._fields.Side = value
	}

	public _fields: {
		Side: number
	}

	constructor(init?: Partial<{Side?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Side: init?.Side ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): square {
		return new square(this, true)
	}

	public __goscriptAssign(source: square): void {
		const target = this._fields
		const values = source._fields
		target.Side = values.Side
	}

	public Area(): number {
		const s = this;
		return s.Side * s.Side
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
	public get S(): shape | null {
		return this._fields.S
	}

	public set S(value: shape | null) {
		this._fields.S = value
	}

	public get A(): any {
		return this._fields.A
	}

	public set A(value: any) {
		this._fields.A = value
	}

	public _fields: {
		S: shape | null
		A: any
	}

	constructor(init?: Partial<{S?: shape | null, A?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			S: init?.S ?? (null! as shape | null),
			A: init?.A ?? (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): void {
		const target = this._fields
		const values = source._fields
		target.S = $.assignFieldValue(target.S, values.S, "main.shape")
		target.A = $.assignFieldValue(target.A, values.A, { kind: $.TypeKind.Interface, methods: [] })
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [/* @__PURE__ */ $.structField("S", "main.shape", [0], 0, true), /* @__PURE__ */ $.structField("A", { kind: $.TypeKind.Interface, methods: [] }, [1], 16, true)]
	)
}

export class base {
	public get This(): node | null {
		return this._fields.This
	}

	public set This(value: node | null) {
		this._fields.This = value
	}

	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		This: node | null
		Name: string
	}

	constructor(init?: Partial<{This?: node | null, Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			This: init?.This ?? (null! as node | null),
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): base {
		return new base(this, true)
	}

	public __goscriptAssign(source: base): void {
		const target = this._fields
		const values = source._fields
		target.This = $.assignFieldValue(target.This, values.This, "main.node")
		target.Name = values.Name
	}

	public AsBase(): base | $.VarRef<base> | null {
		const b: base | $.VarRef<base> | null = this;
		return b
	}

	public async NewInstance(): globalThis.Promise<node | null> {
		const b: base | $.VarRef<base> | null = this;
		return $.mustTypeAssert<node | null>($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(($.pointerValue<base>(b).This as any))).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))!))).Interface(), "main.node")
	}

	static __typeInfo = $.registerStructType(
		"main.base",
		() => new base(),
		() => [$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.base")], true), $.methodSignature("NewInstance", [], ["main.node"], true)],
		base,
		() => [/* @__PURE__ */ $.structField("This", "main.node", [0], 0, true), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [1], 16, true)]
	)
}

export class widget {
	public get base(): base {
		return this._fields.base
	}

	public set base(value: base) {
		this._fields.base = value
	}

	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public _fields: {
		base: base
		X: number
	}

	constructor(init?: Partial<{base?: base, X?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			base: init?.base ? init.base.clone() : new base(undefined, true),
			X: init?.X ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): widget {
		return new widget(this, true)
	}

	public __goscriptAssign(source: widget): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.base, values.base)
		target.X = values.X
	}

	public AsBase(): any {
		return $.pointerValue<base>(this.base).AsBase()
	}

	public async NewInstance(): globalThis.Promise<any> {
		return await $.pointerValue<base>(this.base).NewInstance()
	}

	static __typeInfo = $.registerStructType(
		"main.widget",
		() => new widget(),
		() => [$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.base")], true), $.methodSignature("NewInstance", [], ["main.node"], true)],
		widget,
		() => [/* @__PURE__ */ $.structField("base", "main.base", [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/reflect_elem_struct_pointer", anonymous: true }), /* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [1], 32, true)]
	)
}

export class body {
	public get widget(): widget {
		return this._fields.widget
	}

	public set widget(value: widget) {
		this._fields.widget = value
	}

	public get Title(): string {
		return this._fields.Title
	}

	public set Title(value: string) {
		this._fields.Title = value
	}

	public _fields: {
		widget: widget
		Title: string
	}

	constructor(init?: Partial<{widget?: widget, Title?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			widget: init?.widget ? init.widget.clone() : new widget(undefined, true),
			Title: init?.Title ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): body {
		return new body(this, true)
	}

	public __goscriptAssign(source: body): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.widget, values.widget)
		target.Title = values.Title
	}

	public AsBase(): any {
		return $.pointerValue<widget>(this.widget).base.AsBase()
	}

	public async NewInstance(): globalThis.Promise<any> {
		return await $.pointerValue<widget>(this.widget).base.NewInstance()
	}

	static __typeInfo = $.registerStructType(
		"main.body",
		() => new body(),
		() => [$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.base")], true), $.methodSignature("NewInstance", [], ["main.node"], true)],
		body,
		() => [/* @__PURE__ */ $.structField("widget", "main.widget", [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/reflect_elem_struct_pointer", anonymous: true }), /* @__PURE__ */ $.structField("Title", /* @__PURE__ */ $.basicType("string"), [1], 40, true)]
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

export function underlying(v: reflect.Value): reflect.Value {
	while (($.markAsStructValue($.cloneStructValue(v)).Kind() == 20) || ($.markAsStructValue($.cloneStructValue(v)).Kind() == 22)) {
		let e: reflect.Value = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem()))
		if (!$.markAsStructValue($.cloneStructValue(e)).IsValid()) {
			return $.markAsStructValue($.cloneStructValue(v))
		}
		v = $.assignStruct(v, e)
	}
	return $.markAsStructValue($.cloneStructValue(v))
}

export async function structPointers(): globalThis.Promise<void> {
	let b = new body({Title: "body"})
	$.pointerValue<body>(b).widget.base.This = $.interfaceValue<node | null>(b, "*main.body", /* @__PURE__ */ $.pointerType("main.body"))
	let [n, ok] = $.typeAssertTuple<node | null>($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(b, "*main.body", /* @__PURE__ */ $.pointerType("main.body"))))).Interface(), "main.node")
	await $.println("valueof:", ok, ok && ($.pointerEqual(((n as any)?.__goType === "*main.body" && (n as any).__goValue === undefined && (n as any).__isTypedNil !== true ? ((n as any) as body | $.VarRef<body> | null) : $.mustTypeAssert<body | $.VarRef<body> | null>(n, /* @__PURE__ */ $.pointerType("main.body"))), b)))
	let __goscriptTuple0: any = $.typeAssertTuple<body | $.VarRef<body> | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(b, "*main.body", /* @__PURE__ */ $.pointerType("main.body"))))).Elem())).Addr())).Interface(), /* @__PURE__ */ $.pointerType("main.body"))
	let a: body | $.VarRef<body> | null = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println("addr:", ok, $.pointerEqual(a, b))

	let __goscriptTuple1: any = $.typeAssertTuple<body | $.VarRef<body> | null>(await $.pointerValue<body>(b).widget.base.NewInstance(), /* @__PURE__ */ $.pointerType("main.body"))
	let nb: body | $.VarRef<body> | null = __goscriptTuple1[0]
	ok = __goscriptTuple1[1]
	await $.println("new:", ok, !$.pointerEqual(nb, b), $.stringEqual($.pointerValue<body>(nb).Title, ""), $.pointerValue<body>(nb).widget.base.AsBase() != null)
	let nv = $.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.interfaceValue(new widget(undefined, true), "main.widget", "main.widget")))!)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(nv)).Elem())).FieldByName("X"))).SetInt(7n)
	await $.println("new widget:", $.pointerValue<widget>($.mustTypeAssert<widget | $.VarRef<widget> | null>($.markAsStructValue($.cloneStructValue(nv)).Interface(), /* @__PURE__ */ $.pointerType("main.widget"))).X)

	let np: body | $.VarRef<body> | null = null! as body | $.VarRef<body> | null
	let iv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(np, "*main.body", /* @__PURE__ */ $.pointerType("main.body"))))).Interface()
	await $.println("nil:", iv != null, ((iv as any)?.__goType === "*main.body" && (iv as any).__goValue === undefined && (iv as any).__isTypedNil !== true ? ((iv as any) as body | $.VarRef<body> | null) : $.mustTypeAssert<body | $.VarRef<body> | null>(iv, /* @__PURE__ */ $.pointerType("main.body"))) == null)
}

export async function main(): globalThis.Promise<void> {
	let s: $.VarRef<T | $.VarRef<T> | null> = $.varRef(new T({A: "aaa", B: 3.140000104904175}))
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s.value, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(v)).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem())).Kind()), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem())).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println(walk(v), walk($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "**main.T", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.pointerType("main.T"))))))))

	let np: T | $.VarRef<T> | null = null! as T | $.VarRef<T> | null
	await $.println(walk($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(np, "*main.T", /* @__PURE__ */ $.pointerType("main.T")))))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(np, "*main.T", /* @__PURE__ */ $.pointerType("main.T"))))).Elem())).IsValid())

	let e = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Elem()))
	await $.println($.markAsStructValue($.cloneStructValue(e)).NumField(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(0))).String(), $.markAsStructValue($.cloneStructValue(e)).CanSet())
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(0))).SetString("bbb")
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).FieldByName("B"))).SetFloat(2.5)
	await $.println($.pointerValue<T>(s.value).A, $.pointerValue<T>(s.value).B)

	// Field Values copied into a slice read back what was set through them.
	let fields = $.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(0))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(e)).Field(1)))])
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 0))).SetString("ccc")
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 1))).SetFloat(1.5)
	await $.println($.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 0))).String(), $.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 1))).Float(), $.pointerValue<T>(s.value).A, $.pointerValue<T>(s.value).B)

	// Values made by New read back what was set through them, as decoders
	// building map keys do.
	let name = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf(""))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(name)).SetString("a")
	await $.println($.markAsStructValue($.cloneStructValue(name)).String(), $.mustTypeAssert<string>($.markAsStructValue($.cloneStructValue(name)).Interface(), /* @__PURE__ */ $.basicType("string")))
	$.markAsStructValue($.cloneStructValue(name)).SetString("\xc3\xa9")
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
	let empty: $.VarRef<holder> = $.varRef(new holder(undefined, true))
	let ev = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(empty, "*main.holder", /* @__PURE__ */ $.pointerType("main.holder"))))).Elem()))
	let sf = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Field(0)))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(sf)).Kind()), $.markAsStructValue($.cloneStructValue(sf)).IsNil(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(sf)).Elem())).IsValid())
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue(sf))))).Kind()), reflect.Kind_String($.markAsStructValue($.cloneStructValue(underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ev)).Field(1)))))).Kind()))

	let full = $.varRef(new holder({S: $.interfaceValue<shape | null>(new square({Side: 3}, true), "main.square", "main.square"), A: $.interfaceValue(new square({Side: 2}), "*main.square", /* @__PURE__ */ $.pointerType("main.square"))}, true))
	let fv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(full, "*main.holder", /* @__PURE__ */ $.pointerType("main.holder"))))).Elem()))
	let u = underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fv)).Field(0))))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(u)).Kind()), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(u)).Field(0))).Int())
	u = $.assignStruct(u, underlying($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(fv)).Field(1)))))
	await $.println(reflect.Kind_String($.markAsStructValue($.cloneStructValue(u)).Kind()), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(u)).Field(0))).Int())

	let nilAny: $.VarRef<any> = $.varRef(null! as any)
	await $.println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(nilAny, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }))))).Elem())).Elem())).IsValid())

	await structPointers()
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

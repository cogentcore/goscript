// Generated file based on reflect_struct_pointer_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export type Node = {
	AsBase(): Base | $.VarRef<Base> | null
}

$.registerInterfaceType(
	"main.Node",
	null,
	[$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.Base")])]
);

export class Base {
	public declare This: Node | null

	public declare Name: string

	public _fields: {
		This: Node | null
		Name: string
	}

	constructor(init?: Partial<{This?: Node | null, Name?: string}>) {
		this._fields = {
			This: init?.This ?? (null! as Node | null),
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	public AsBase(): Base | $.VarRef<Base> | null {
		const b: Base | $.VarRef<Base> | null = this;
		return b
	}

	public async NewInstance(): globalThis.Promise<Node | null> {
		const b: Base | $.VarRef<Base> | null = this;
		return $.mustTypeAssert<Node | null>($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf(($.pointerValue<Base>(b).This as any))).Elem())!))).Interface(), "main.Node")
	}

	static {
		$.bindStructFields(this.prototype, ["This", "Name"])
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.Base")]), $.methodSignature("NewInstance", [], ["main.Node"])],
		Base,
		() => [/* @__PURE__ */ $.structField("This", "main.Node", [0], 0, true), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [1], 16, true)]
	)
}

export class Widget {
	public declare Base: Base

	public declare X: number

	public _fields: {
		Base: Base
		X: number
	}

	constructor(init?: Partial<{Base?: Base, X?: number}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base()),
			X: init?.X ?? (0 as number)
		}
	}

	public clone(): Widget {
		return $.markAsStructValue(new Widget(this))
	}

	public AsBase(): any {
		return $.pointerValue<Base>(this.Base).AsBase()
	}

	public async NewInstance(): globalThis.Promise<any> {
		return await $.pointerValue<Base>(this.Base).NewInstance()
	}

	static {
		$.bindStructFields(this.prototype, ["Base", "X"])
	}

	static __typeInfo = $.registerStructType(
		"main.Widget",
		() => new Widget(),
		() => [$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.Base")]), $.methodSignature("NewInstance", [], ["main.Node"])],
		Widget,
		() => [/* @__PURE__ */ $.structField("Base", "main.Base", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [1], 32, true)]
	)
}

export class Body {
	public declare Widget: Widget

	public declare Title: string

	public _fields: {
		Widget: Widget
		Title: string
	}

	constructor(init?: Partial<{Widget?: Widget, Title?: string}>) {
		this._fields = {
			Widget: init?.Widget ? $.markAsStructValue($.cloneStructValue(init.Widget)) : $.markAsStructValue(new Widget()),
			Title: init?.Title ?? ("" as string)
		}
	}

	public clone(): Body {
		return $.markAsStructValue(new Body(this))
	}

	public AsBase(): any {
		return $.pointerValue<Widget>(this.Widget).Base.AsBase()
	}

	public async NewInstance(): globalThis.Promise<any> {
		return await $.pointerValue<Widget>(this.Widget).Base.NewInstance()
	}

	static {
		$.bindStructFields(this.prototype, ["Widget", "Title"])
	}

	static __typeInfo = $.registerStructType(
		"main.Body",
		() => new Body(),
		() => [$.methodSignature("AsBase", [], [/* @__PURE__ */ $.pointerType("main.Base")]), $.methodSignature("NewInstance", [], ["main.Node"])],
		Body,
		() => [/* @__PURE__ */ $.structField("Widget", "main.Widget", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("Title", /* @__PURE__ */ $.basicType("string"), [1], 40, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let b: Body | $.VarRef<Body> | null = new Body({Title: "body"})
	$.pointerValue<Body>(b).Widget.Base.This = $.interfaceValue<Node | null>(b, "*main.Body", /* @__PURE__ */ $.pointerType("main.Body"))

	// ValueOf of a struct pointer gives back the same pointer.
	let [n, ok] = $.typeAssertTuple<Node | null>($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(b, "*main.Body", /* @__PURE__ */ $.pointerType("main.Body"))))).Interface(), "main.Node")
	await $.println("valueof:", ok, ok && ($.pointerEqual($.mustTypeAssert<Body | $.VarRef<Body> | null>(n, /* @__PURE__ */ $.pointerType("main.Body")), b)))

	// Addr of the element is the same pointer.
	let __goscriptTuple0: any = $.typeAssertTuple<Body | $.VarRef<Body> | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(b, "*main.Body", /* @__PURE__ */ $.pointerType("main.Body"))))).Elem())).Addr())).Interface(), /* @__PURE__ */ $.pointerType("main.Body"))
	let a: Body | $.VarRef<Body> | null = __goscriptTuple0[0]
	ok = __goscriptTuple0[1]
	await $.println("addr:", ok, $.pointerEqual(a, b))

	// New makes a new zero struct pointer that satisfies interfaces.
	let ni = await $.pointerValue<Body>(b).Widget.Base.NewInstance()
	let __goscriptTuple1: any = $.typeAssertTuple<Body | $.VarRef<Body> | null>(ni, /* @__PURE__ */ $.pointerType("main.Body"))
	let nb: Body | $.VarRef<Body> | null = __goscriptTuple1[0]
	ok = __goscriptTuple1[1]
	await $.println("new:", ok, !$.pointerEqual(nb, b), $.stringEqual($.pointerValue<Body>(nb).Title, ""), $.pointerValue<Body>(nb).Widget.Base.AsBase() != null)

	// Fields set through reflect are seen through the pointer.
	let nv = $.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.interfaceValue($.markAsStructValue(new Widget()), "main.Widget", "main.Widget")))!)))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(nv)).Elem())).FieldByName("X"))).SetInt(7n)
	let w: Widget | $.VarRef<Widget> | null = $.mustTypeAssert<Widget | $.VarRef<Widget> | null>($.markAsStructValue($.cloneStructValue(nv)).Interface(), /* @__PURE__ */ $.pointerType("main.Widget"))
	await $.println("new widget:", $.pointerValue<Widget>(w).X)

	// A nil struct pointer stays a typed nil.
	let np: Body | $.VarRef<Body> | null = null! as Body | $.VarRef<Body> | null
	let iv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(np, "*main.Body", /* @__PURE__ */ $.pointerType("main.Body"))))).Interface()
	await $.println("nil:", iv != null, $.mustTypeAssert<Body | $.VarRef<Body> | null>(iv, /* @__PURE__ */ $.pointerType("main.Body")) == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

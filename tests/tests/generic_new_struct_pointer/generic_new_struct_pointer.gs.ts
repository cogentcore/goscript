// Generated file based on generic_new_struct_pointer.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Node = {
	Name(): string
	SetName(name: string): void
}

$.registerInterfaceType(
	"main.Node",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export class Base {
	public declare name: string

	public declare inits: number

	public _fields: {
		name: string
		inits: number
	}

	constructor(init?: Partial<{name?: string, inits?: number}>) {
		this._fields = {
			name: init?.name ?? ("" as string),
			inits: init?.inits ?? (0 as number)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	public Name(): string {
		const b: Base | $.VarRef<Base> | null = this;
		return $.pointerValue<Base>(b).name
	}

	public SetName(name: string): void {
		let b: Base | $.VarRef<Base> | null = this;
		$.pointerValue<Base>(b).name = name
	}

	static {
		$.bindStructFields(this.prototype, ["name", "inits"])
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Base,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "inits", key: "inits", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Widget {
	public declare Base: Base

	public declare Text: string

	public _fields: {
		Base: Base
		Text: string
	}

	constructor(init?: Partial<{Base?: Base, Text?: string}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base()),
			Text: init?.Text ?? ("" as string)
		}
	}

	public clone(): Widget {
		return $.markAsStructValue(new Widget(this))
	}

	public Name(): any {
		return $.pointerValue<Base>(this.Base).Name()
	}

	public SetName(name: any): any {
		return $.pointerValue<Base>(this.Base).SetName(name)
	}

	static {
		$.bindStructFields(this.prototype, ["Base", "Text"])
	}

	static __typeInfo = $.registerStructType(
		"main.Widget",
		() => new Widget(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Widget,
		() => [{ name: "Base", key: "Base", type: "main.Base", anonymous: true }, { name: "Text", key: "Text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function newNode(__typeArgs: $.GenericTypeArgs | undefined): any {
	let n = $.genericNew(__typeArgs, "T", null)
	return n
}

export function asNode(__typeArgs: $.GenericTypeArgs | undefined): Node | null {
	return $.mustTypeAssert<Node | null>($.typeParamPointerInterfaceValue(newNode({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}), __typeArgs?.["T"], "*T", /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), "main.Node")
}

export async function initAs(__typeArgs: $.GenericTypeArgs | undefined, n: Node | null, init: ((w: any) => void) | null): globalThis.Promise<void> {
	void (__goscriptAwait = init!($.mustTypeAssert<any>((n as any), /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

export function store(__typeArgs: $.GenericTypeArgs | undefined, p: any, v: any): void {
	$.genericPointerRef(p).value = v
}

export function load(__typeArgs: $.GenericTypeArgs | undefined, p: any): any {
	return $.pointerValue<any>(p)
}

export async function main(): globalThis.Promise<void> {
	let n = asNode({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }})
	void (__goscriptAwait = $.pointerValue<Exclude<Node, null>>(n).SetName("text"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	await initAs({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }}, n, $.functionValue((w: Widget | $.VarRef<Widget> | null): void => {
		$.pointerValue<Widget>(w).Text = "hello"
		$.pointerValue<Widget>(w).Base.inits++
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Widget")], results: [] } as $.FunctionTypeInfo)))
	let w: Widget | $.VarRef<Widget> | null = $.mustTypeAssert<Widget | $.VarRef<Widget> | null>(n, /* @__PURE__ */ $.pointerType("main.Widget"))
	await $.println("name:", $.pointerValue<Widget>(w).Base.Name(), "text:", $.pointerValue<Widget>(w).Text, "inits:", $.pointerValue<Widget>(w).Base.inits)
	await $.println("same:", $.comparableEqual($.interfaceValue(w, "*main.Widget", /* @__PURE__ */ $.pointerType("main.Widget")), (n as any)))

	let p: Widget | $.VarRef<Widget> | null = (newNode({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }}) as Widget | $.VarRef<Widget> | null)
	store({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }}, p, $.markAsStructValue(new Widget({Text: "stored"})))
	await $.println("stored:", $.pointerValue<Widget>(p).Text, load({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }}, p).Text)

	let q: Widget | $.VarRef<Widget> | null = (newNode({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }}) as Widget | $.VarRef<Widget> | null)
	let v = ($.markAsStructValue($.cloneStructValue(load({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }}, q))) as Widget)
	v.Text = "copy"
	await $.println("copy is independent:", $.stringEqual($.pointerValue<Widget>(q).Text, ""), v.Text)

	let ip = (newNode({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}) as $.VarRef<number> | null)
	store({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, ip, 7)
	ip!.value = ip!.value + (1)
	await $.println("int:", $.pointerValue<number>(ip), load({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, ip))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

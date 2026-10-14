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
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public get inits(): number {
		return this._fields.inits
	}

	public set inits(value: number) {
		this._fields.inits = value
	}

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

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Base,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "inits", key: "inits", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Widget {
	public get Base(): Base {
		return this._fields.Base
	}

	public set Base(value: Base) {
		this._fields.Base = value
	}

	public get Text(): string {
		return this._fields.Text
	}

	public set Text(value: string) {
		this._fields.Text = value
	}

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
	await init!($.mustTypeAssert<any>((n as any), /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))
}

export function store(__typeArgs: $.GenericTypeArgs | undefined, p: any, v: any): void {
	$.genericPointerRef(p).value = $.copyElement(v)
}

export function load(__typeArgs: $.GenericTypeArgs | undefined, p: any): any {
	return $.copyElement($.pointerValue<any>(p))
}

export async function main(): globalThis.Promise<void> {
	let n = asNode(__goscriptStatic0())
	await $.pointerValue<Exclude<Node, null>>(n).SetName("text")
	await initAs(__goscriptStatic0(), n, $.functionValue((w: Widget | $.VarRef<Widget> | null): void => {
		$.pointerValue<Widget>(w).Text = "hello"
		$.pointerValue<Widget>(w).Base.inits++
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Widget")], results: [] } as $.FunctionTypeInfo)))
	let w: Widget | $.VarRef<Widget> | null = $.mustTypeAssert<Widget | $.VarRef<Widget> | null>(n, /* @__PURE__ */ $.pointerType("main.Widget"))
	await $.println("name:", $.pointerValue<Widget>(w).Base.Name(), "text:", $.pointerValue<Widget>(w).Text, "inits:", $.pointerValue<Widget>(w).Base.inits)
	await $.println("same:", $.comparableEqual($.interfaceValue(w, "*main.Widget", /* @__PURE__ */ $.pointerType("main.Widget")), (n as any)))

	let p: Widget | $.VarRef<Widget> | null = (newNode(__goscriptStatic0()) as Widget | $.VarRef<Widget> | null)
	store(__goscriptStatic0(), p, $.markAsStructValue(new Widget({Text: "stored"})))
	await $.println("stored:", $.pointerValue<Widget>(p).Text, load(__goscriptStatic0(), p).Text)

	let q: Widget | $.VarRef<Widget> | null = (newNode(__goscriptStatic0()) as Widget | $.VarRef<Widget> | null)
	let v = ($.markAsStructValue($.cloneStructValue(load(__goscriptStatic0(), q))) as Widget)
	v.Text = "copy"
	await $.println("copy is independent:", $.stringEqual($.pointerValue<Widget>(q).Text, ""), v.Text)

	let ip = (newNode(__goscriptStatic1()) as $.VarRef<number> | null)
	store(__goscriptStatic1(), ip, 7)
	ip!.value = ip!.value + (1)
	await $.println("int:", $.pointerValue<number>(ip), load(__goscriptStatic1(), ip))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => $.markAsStructValue(new Widget()) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

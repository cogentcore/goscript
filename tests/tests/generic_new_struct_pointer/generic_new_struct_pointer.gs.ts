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

	constructor(__goscriptValue?: boolean, name$?: string, inits$?: number) {
		this.name = name$ ?? ""
		this.inits = inits$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Base {
		return new Base(true, this.name, this.inits)
	}

	public __goscriptAssign(source: Base): this {
		this.name = source.name
		this.inits = source.inits
		return this
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
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Base,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "inits", key: "inits", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Widget {
	public declare Base: Base

	public declare Text: string

	constructor(__goscriptValue?: boolean, Base$?: Base, Text$?: string) {
		this.Base = Base$ ?? new Base(true)
		this.Text = Text$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Widget {
		return new Widget(true, this.Base.clone(), this.Text)
	}

	public __goscriptAssign(source: Widget): this {
		this.Base.__goscriptAssign(source.Base)
		this.Text = source.Text
		return this
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
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "SetName", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
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

export function initAs(__typeArgs: $.GenericTypeArgs | undefined, n: Node | null, init: ((w: any) => void) | null): void {
	init!($.mustTypeAssert<any>((n as any), /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })))
}

export function store(__typeArgs: $.GenericTypeArgs | undefined, p: any, v: any): void {
	$.genericPointerRef(p).value = $.copyElement(v)
}

export function load(__typeArgs: $.GenericTypeArgs | undefined, p: any): any {
	return $.copyElement($.pointerValue<any>(p))
}

export async function main(): globalThis.Promise<void> {
	let n = asNode(__goscriptStatic0())
	void (__goscriptAwait = (n !== null && (n as any).__isVarRef !== true && (n as any).__goValue === undefined ? (n as Exclude<Node, null>) : $.pointerValue<Exclude<Node, null>>(n)).SetName("text"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	initAs(__goscriptStatic0(), n, $.functionValue((w: Widget | $.VarRef<Widget> | null) => {
		$.pointerValue<Widget>(w).Text = "hello"
		$.pointerValue<Widget>(w).Base.inits++
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Widget")], results: [] } as $.FunctionTypeInfo)))
	let w = ((n as any)?.__goType === "*main.Widget" && (n as any).__goValue === undefined && (n as any).__isTypedNil !== true ? ((n as any) as Widget | $.VarRef<Widget> | null) : $.mustTypeAssert<Widget | $.VarRef<Widget> | null>(n, /* @__PURE__ */ $.pointerType("main.Widget")))
	let w$: Widget = w == null ? $.pointerTarget<Widget>(w) : (w as any).__isVarRef === true ? (w as any).value : (w as any).__goValue === undefined ? (w as any) : $.pointerTarget<Widget>(w)
	await $.println("name:", (w$ as Widget).Base.Name(), "text:", (w$ as Widget).Text, "inits:", (w$ as Widget).Base.inits)
	await $.println("same:", $.comparableEqual($.interfaceValue(w, "*main.Widget", /* @__PURE__ */ $.pointerType("main.Widget")), (n as any)))

	let p = (newNode(__goscriptStatic0()) as Widget | $.VarRef<Widget> | null)
	store(__goscriptStatic0(), p, new Widget(true, undefined, "stored"))
	await $.println("stored:", $.pointerValue<Widget>(p).Text, load(__goscriptStatic0(), p).Text)

	let q = (newNode(__goscriptStatic0()) as Widget | $.VarRef<Widget> | null)
	let v = ((load(__goscriptStatic0(), q)).clone() as Widget)
	v.Text = "copy"
	await $.println("copy is independent:", $.stringEqual($.pointerValue<Widget>(q).Text, ""), v.Text)

	let ip = (newNode(__goscriptStatic1()) as $.VarRef<number> | null)
	store(__goscriptStatic1(), ip, 7)
	ip!.value += 1
	await $.println("int:", $.pointerValue<number>(ip), load(__goscriptStatic1(), ip))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Widget", zero: () => new Widget(true) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

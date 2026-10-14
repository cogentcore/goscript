// Generated file based on generic_promoted_method_type_arg.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Flags = bigint

export type Flagger = {
	Is(flag: Flags): boolean
	Set(flag: Flags): void
}

$.registerInterfaceType(
	"main.Flagger",
	null,
	[{ name: "Is", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }]
);

export class Base {
	public get App(): any {
		return this._fields.App
	}

	public set App(value: any) {
		this._fields.App = value
	}

	public get flags(): Flags {
		return this._fields.flags
	}

	public set flags(value: Flags) {
		this._fields.flags = value
	}

	public _fields: {
		App: any
		flags: Flags
	}

	constructor(init?: Partial<{App?: any, flags?: Flags}>) {
		this._fields = {
			App: init?.App ?? (null! as any),
			flags: init?.flags ?? (0n as Flags)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	public __goscriptAssign(source: Base): void {
		const target = this._fields
		const values = source._fields
		target.App = $.assignFieldValue(target.App, values.App, { kind: $.TypeKind.Interface, methods: [] })
		target.flags = values.flags
	}

	public Is(__typeArgs: $.GenericTypeArgs | undefined, flag: Flags): boolean {
		const b: Base | $.VarRef<Base> | null = this;
		return ($.int64And($.pointerValue<Base>(b).flags, ($.int64Shl(1n, flag)))) != 0n
	}

	public Set(__typeArgs: $.GenericTypeArgs | undefined, flag: Flags): void {
		let b: Base | $.VarRef<Base> | null = this;
		$.pointerValue<Base>(b).flags = $.int64Or($.pointerValue<Base>(b).flags, $.int64Shl(1n, flag))
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [{ name: "Is", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Base,
		() => [{ name: "App", key: "App", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "flags", key: "flags", type: /* @__PURE__ */ $.basicType("int64", "main.Flags") }]
	)
}

export class App {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): App {
		return $.markAsStructValue(new App(this))
	}

	public __goscriptAssign(source: App): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	static __typeInfo = $.registerStructType(
		"main.App",
		() => new App(),
		() => [],
		App,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Window {
	public get Base(): Base {
		return this._fields.Base
	}

	public set Base(value: Base) {
		this._fields.Base = value
	}

	public get Title(): string {
		return this._fields.Title
	}

	public set Title(value: string) {
		this._fields.Title = value
	}

	public _fields: {
		Base: Base
		Title: string
	}

	constructor(init?: Partial<{Base?: Base, Title?: string}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base({App: null! as App | $.VarRef<App> | null})),
			Title: init?.Title ?? ("" as string)
		}
	}

	public clone(): Window {
		return $.markAsStructValue(new Window(this))
	}

	public __goscriptAssign(source: Window): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Base, values.Base)
		target.Title = values.Title
	}

	public Is(flag: any): any {
		return $.pointerValue<Base>(this.Base).Is({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.App"), zero: () => null }}, flag)
	}

	public Set(flag: any): any {
		return $.pointerValue<Base>(this.Base).Set({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.App"), zero: () => null }}, flag)
	}

	static __typeInfo = $.registerStructType(
		"main.Window",
		() => new Window(),
		() => [{ name: "Is", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Window,
		() => [{ name: "Base", key: "Base", type: "main.Base", anonymous: true }, { name: "Title", key: "Title", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Single {
	public get Base(): Base {
		return this._fields.Base
	}

	public set Base(value: Base) {
		this._fields.Base = value
	}

	public get Count(): number {
		return this._fields.Count
	}

	public set Count(value: number) {
		this._fields.Count = value
	}

	public _fields: {
		Base: Base
		Count: number
	}

	constructor(init?: Partial<{Base?: Base, Count?: number}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base({App: null})),
			Count: init?.Count ?? (0 as number)
		}
	}

	public clone(): Single {
		return $.markAsStructValue(new Single(this))
	}

	public __goscriptAssign(source: Single): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Base, values.Base)
		target.Count = values.Count
	}

	public Is(__typeArgs: $.GenericTypeArgs | undefined, flag: any): any {
		return $.pointerValue<Base>(this.Base).Is({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: __typeArgs?.["A"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}, flag)
	}

	public Set(__typeArgs: $.GenericTypeArgs | undefined, flag: any): any {
		return $.pointerValue<Base>(this.Base).Set({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: __typeArgs?.["A"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}, flag)
	}

	static __typeInfo = $.registerStructType(
		"main.Single",
		() => new Single(),
		() => [{ name: "Is", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "Set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		Single,
		() => [{ name: "Base", key: "Base", type: "main.Base", anonymous: true }, { name: "Count", key: "Count", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function check(__typeArgs: $.GenericTypeArgs | undefined, w: any): globalThis.Promise<boolean> {
	await $.callGenericMethod(__typeArgs, "W", "Set", w, 6n)
	return await $.callGenericMethod(__typeArgs, "W", "Is", w, 6n) && !await $.callGenericMethod(__typeArgs, "W", "Is", w, 2n)
}

export function asFlagger(__typeArgs: $.GenericTypeArgs | undefined, w: any): Flagger | null {
	return $.mustTypeAssert<Flagger | null>($.typeParamInterfaceValue<any>(w, __typeArgs?.["W"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Is", [["flag", /* @__PURE__ */ $.basicType("int64", "main.Flags")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Set", [["flag", /* @__PURE__ */ $.basicType("int64", "main.Flags")]])] }, zero: () => null }), "main.Flagger")
}

export async function main(): globalThis.Promise<void> {
	let w: Window | $.VarRef<Window> | null = new Window({Title: "main"})
	await $.println("check:", await check({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.Window"), zero: () => null, methods: {Is: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Is(...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Set(...$.stripGenericTypeArgs(args))} }}, w))
	let f = asFlagger({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.Window"), zero: () => null, methods: {Is: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Is(...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Set(...$.stripGenericTypeArgs(args))} }}, new Window())
	await $.pointerValue<Exclude<Flagger, null>>(f).Set(3n)
	await $.println("interface:", await $.pointerValue<Exclude<Flagger, null>>(f).Is(3n), await $.pointerValue<Exclude<Flagger, null>>(f).Is(6n))

	let s: Single | $.VarRef<Single> | null = new Single()
	await $.println("generic outer:", await check({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.Single"), zero: () => null, methods: {Is: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Is({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.App"), zero: () => null }}, ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Set({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.App"), zero: () => null }}, ...$.stripGenericTypeArgs(args))} }}, s))
	await $.println("generic outer string:", await check({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.Single"), zero: () => null, methods: {Is: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Is({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }}, ...$.stripGenericTypeArgs(args)), Set: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Set({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }}, ...$.stripGenericTypeArgs(args))} }}, new Single()))
}

if ($.isMainScript(import.meta)) {
	await main()
}

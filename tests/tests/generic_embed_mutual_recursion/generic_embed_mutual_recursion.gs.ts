// Generated file based on generic_embed_mutual_recursion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Window = {
	Name(): string
}

$.registerInterfaceType(
	"main.Window",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type App = {
	FirstName(): string | globalThis.Promise<string>
	Window(): Window | null
}

$.registerInterfaceType(
	"main.App",
	null,
	[{ name: "FirstName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Window", args: [], returns: [{ type: "main.Window" }] }]
);

export class AppBase {
	public get Windows(): $.Slice<any> {
		return this._fields.Windows
	}

	public set Windows(value: $.Slice<any>) {
		this._fields.Windows = value
	}

	public _fields: {
		Windows: $.Slice<any>
	}

	constructor(init?: Partial<{Windows?: $.Slice<any>}>) {
		this._fields = {
			Windows: init?.Windows ?? (null! as $.Slice<any>)
		}
	}

	public clone(): AppBase {
		return $.markAsStructValue(new AppBase(this))
	}

	public async FirstName(__typeArgs: $.GenericTypeArgs | undefined): globalThis.Promise<string> {
		const a: AppBase | $.VarRef<AppBase> | null = this;
		if ($.len($.pointerValue<AppBase>(a).Windows) == 0) {
			return ""
		}
		return $.callGenericMethod(__typeArgs, "W", "Name", $.arrayIndex($.pointerValue<AppBase>(a).Windows!, 0))
	}

	public Window(__typeArgs: $.GenericTypeArgs | undefined): Window | null {
		const a: AppBase | $.VarRef<AppBase> | null = this;
		if ($.len($.pointerValue<AppBase>(a).Windows) == 0) {
			return null
		}
		return $.typeParamInterfaceValue<Window | null>($.arrayIndex($.pointerValue<AppBase>(a).Windows!, 0), __typeArgs?.["W"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])] }, zero: () => null })
	}

	static __typeInfo = $.registerStructType(
		"main.AppBase",
		() => new AppBase(),
		() => [{ name: "FirstName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Window", args: [], returns: [{ type: "main.Window" }] }],
		AppBase,
		() => [{ name: "Windows", key: "Windows", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])] }) }]
	)
}

export class WindowBase {
	public get App(): any {
		return this._fields.App
	}

	public set App(value: any) {
		this._fields.App = value
	}

	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		App: any
		name: string
	}

	constructor(init?: Partial<{App?: any, name?: string}>) {
		this._fields = {
			App: init?.App ?? (null! as any),
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): WindowBase {
		return $.markAsStructValue(new WindowBase(this))
	}

	public async AppWindowName(__typeArgs: $.GenericTypeArgs | undefined): globalThis.Promise<string> {
		const w: WindowBase | $.VarRef<WindowBase> | null = this;
		return $.concatString(($.concatString(await $.pointerValue<Exclude<Window, null>>((await $.callGenericMethod(__typeArgs, "A", "Window", $.pointerValue<WindowBase>(w).App))).Name(), " via ")), await $.callGenericMethod(__typeArgs, "A", "FirstName", $.pointerValue<WindowBase>(w).App))
	}

	public Name(__typeArgs: $.GenericTypeArgs | undefined): string {
		const w: WindowBase | $.VarRef<WindowBase> | null = this;
		return $.pointerValue<WindowBase>(w).name
	}

	static __typeInfo = $.registerStructType(
		"main.WindowBase",
		() => new WindowBase(),
		() => [{ name: "AppWindowName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		WindowBase,
		() => [{ name: "App", key: "App", type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("FirstName", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Window", [], ["main.Window"])] } }, { name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class MyApp {
	public get AppBase(): AppBase {
		return this._fields.AppBase
	}

	public set AppBase(value: AppBase) {
		this._fields.AppBase = value
	}

	public _fields: {
		AppBase: AppBase
	}

	constructor(init?: Partial<{AppBase?: AppBase}>) {
		this._fields = {
			AppBase: init?.AppBase ? $.markAsStructValue($.cloneStructValue(init.AppBase)) : $.markAsStructValue(new AppBase())
		}
	}

	public clone(): MyApp {
		return $.markAsStructValue(new MyApp(this))
	}

	public async FirstName(): globalThis.Promise<any> {
		return await $.pointerValue<AppBase>(this.AppBase).FirstName({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.MyWindow"), zero: () => null, methods: {AppWindowName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppWindowName(...$.stripGenericTypeArgs(args)), Name: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Name(...$.stripGenericTypeArgs(args))} }})
	}

	public Window(): any {
		return $.pointerValue<AppBase>(this.AppBase).Window({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.MyWindow"), zero: () => null, methods: {AppWindowName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppWindowName(...$.stripGenericTypeArgs(args)), Name: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Name(...$.stripGenericTypeArgs(args))} }})
	}

	static __typeInfo = $.registerStructType(
		"main.MyApp",
		() => new MyApp(),
		() => [{ name: "FirstName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Window", args: [], returns: [{ type: "main.Window" }] }],
		MyApp,
		() => [{ name: "AppBase", key: "AppBase", type: "main.AppBase", anonymous: true }]
	)
}

export class MyWindow {
	public get WindowBase(): WindowBase {
		return this._fields.WindowBase
	}

	public set WindowBase(value: WindowBase) {
		this._fields.WindowBase = value
	}

	public _fields: {
		WindowBase: WindowBase
	}

	constructor(init?: Partial<{WindowBase?: WindowBase}>) {
		this._fields = {
			WindowBase: init?.WindowBase ? $.markAsStructValue($.cloneStructValue(init.WindowBase)) : $.markAsStructValue(new WindowBase({App: null! as MyApp | $.VarRef<MyApp> | null}))
		}
	}

	public clone(): MyWindow {
		return $.markAsStructValue(new MyWindow(this))
	}

	public async AppWindowName(): globalThis.Promise<any> {
		return await $.pointerValue<WindowBase>(this.WindowBase).AppWindowName({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.MyApp"), zero: () => null, methods: {FirstName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).FirstName(...$.stripGenericTypeArgs(args)), Window: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Window(...$.stripGenericTypeArgs(args))} }})
	}

	public Name(): any {
		return $.pointerValue<WindowBase>(this.WindowBase).Name({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.MyApp"), zero: () => null, methods: {FirstName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).FirstName(...$.stripGenericTypeArgs(args)), Window: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Window(...$.stripGenericTypeArgs(args))} }})
	}

	static __typeInfo = $.registerStructType(
		"main.MyWindow",
		() => new MyWindow(),
		() => [{ name: "AppWindowName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		MyWindow,
		() => [{ name: "WindowBase", key: "WindowBase", type: "main.WindowBase", anonymous: true }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a: MyApp | $.VarRef<MyApp> | null = new MyApp()
	let w: MyWindow | $.VarRef<MyWindow> | null = new MyWindow()
	$.pointerValue<MyWindow>(w).WindowBase.name = "main"
	$.pointerValue<MyWindow>(w).WindowBase.App = a
	$.pointerValue<MyApp>(a).AppBase.Windows = $.append($.pointerValue<MyApp>(a).AppBase.Windows, w, $.appendZeros.nil)
	let app: App | null = $.namedValueInterfaceValue<App | null>(a, "*main.MyApp", {FirstName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).FirstName(...$.stripGenericTypeArgs(args)), Window: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Window(...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType("main.MyApp"), [$.methodSignature("FirstName", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Window", [], ["main.Window"])])
	await $.println(await $.pointerValue<Exclude<Window, null>>((await $.pointerValue<Exclude<App, null>>(app).Window())).Name())
	await $.println(await $.pointerValue<Exclude<Window, null>>($.pointerValue<MyApp>($.pointerValue<MyWindow>(w).WindowBase.App).AppBase.Window({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.MyWindow"), zero: () => null, methods: {AppWindowName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppWindowName(...$.stripGenericTypeArgs(args)), Name: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Name(...$.stripGenericTypeArgs(args))} }})).Name())
	await $.println(await $.pointerValue<MyWindow>(w).WindowBase.AppWindowName({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.MyApp"), zero: () => null, methods: {FirstName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).FirstName(...$.stripGenericTypeArgs(args)), Window: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Window(...$.stripGenericTypeArgs(args))} }}))
	await $.println(await $.pointerValue<MyApp>(a).AppBase.FirstName({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.MyWindow"), zero: () => null, methods: {AppWindowName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppWindowName(...$.stripGenericTypeArgs(args)), Name: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Name(...$.stripGenericTypeArgs(args))} }}))
}

if ($.isMainScript(import.meta)) {
	await main()
}

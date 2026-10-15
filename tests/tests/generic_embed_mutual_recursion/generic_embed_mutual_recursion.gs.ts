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
	public declare Windows: $.Slice<any>

	constructor(init?: Partial<{Windows?: $.Slice<any>}>, __goscriptValue?: boolean) {
		this.Windows = init?.Windows ?? (null! as $.Slice<any>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): AppBase {
		return new AppBase(this, true)
	}

	public __goscriptAssign(source: AppBase): this {
		this.Windows = source.Windows
		return this
	}

	public async FirstName(__typeArgs: $.GenericTypeArgs | undefined): globalThis.Promise<string> {
		const a: AppBase | $.VarRef<AppBase> | null = this;
		const a$: AppBase = a == null ? $.pointerTarget<AppBase>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<AppBase>(a)
		if ($.sliceLen((a$ as AppBase).Windows) == 0) {
			return ""
		}
		return $.callGenericMethod(__typeArgs, "W", "Name", $.arrayIndex((a$ as AppBase).Windows!, 0))
	}

	public Window(__typeArgs: $.GenericTypeArgs | undefined): Window | null {
		const a: AppBase | $.VarRef<AppBase> | null = this;
		const a$: AppBase = a == null ? $.pointerTarget<AppBase>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<AppBase>(a)
		if ($.sliceLen((a$ as AppBase).Windows) == 0) {
			return null
		}
		return $.typeParamInterfaceValue<Window | null>($.arrayIndex((a$ as AppBase).Windows!, 0), __typeArgs?.["W"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])] }, zero: () => null })
	}

	static __typeInfo = $.registerStructType(
		"main.AppBase",
		() => new AppBase(),
		() => [{ name: "FirstName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Window", args: [], returns: [{ type: "main.Window" }], pointerReceiver: true }],
		AppBase,
		() => [{ name: "Windows", key: "Windows", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])] }) }]
	)
}

export class WindowBase {
	public declare App: any

	public declare name: string

	constructor(init?: Partial<{App?: any, name?: string}>, __goscriptValue?: boolean) {
		this.App = init?.App !== undefined ? $.copyElement(init.App) : (null! as any)
		this.name = init?.name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): WindowBase {
		return new WindowBase(this, true)
	}

	public __goscriptAssign(source: WindowBase): this {
		this.App = $.assignFieldValue(this.App, source.App, { kind: $.TypeKind.Interface, methods: [$.methodSignature("FirstName", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Window", [], ["main.Window"])] })
		this.name = source.name
		return this
	}

	public async AppWindowName(__typeArgs: $.GenericTypeArgs | undefined): globalThis.Promise<string> {
		const w: WindowBase | $.VarRef<WindowBase> | null = this;
		const w$: WindowBase = w == null ? $.pointerTarget<WindowBase>(w) : (w as any).__isVarRef === true ? (w as any).value : (w as any).__goValue === undefined ? (w as any) : $.pointerTarget<WindowBase>(w)
		return (__goscriptAwait = $.pointerValue<Exclude<Window, null>>((__goscriptAwait = $.callGenericMethod(__typeArgs, "A", "Window", (w$ as WindowBase).App), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) + " via " + (__goscriptAwait = $.callGenericMethod(__typeArgs, "A", "FirstName", (w$ as WindowBase).App), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}

	public Name(__typeArgs: $.GenericTypeArgs | undefined): string {
		const w: WindowBase | $.VarRef<WindowBase> | null = this;
		return $.pointerValue<WindowBase>(w).name
	}

	static __typeInfo = $.registerStructType(
		"main.WindowBase",
		() => new WindowBase(),
		() => [{ name: "AppWindowName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		WindowBase,
		() => [{ name: "App", key: "App", type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("FirstName", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Window", [], ["main.Window"])] } }, { name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class MyApp {
	public declare AppBase: AppBase

	constructor(init?: Partial<{AppBase?: AppBase}>, __goscriptValue?: boolean) {
		this.AppBase = init?.AppBase ? $.markAsStructValue($.cloneStructValue(init.AppBase)) : $.markAsStructValue(new AppBase())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyApp {
		return new MyApp(this, true)
	}

	public __goscriptAssign(source: MyApp): this {
		$.assignStruct(this.AppBase, source.AppBase)
		return this
	}

	public async FirstName(): globalThis.Promise<any> {
		return await $.pointerValue<AppBase>(this.AppBase).FirstName(__goscriptStatic0())
	}

	public Window(): any {
		return $.pointerValue<AppBase>(this.AppBase).Window(__goscriptStatic0())
	}

	static __typeInfo = $.registerStructType(
		"main.MyApp",
		() => new MyApp(),
		() => [{ name: "FirstName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Window", args: [], returns: [{ type: "main.Window" }], pointerReceiver: true }],
		MyApp,
		() => [{ name: "AppBase", key: "AppBase", type: "main.AppBase", anonymous: true }]
	)
}

export class MyWindow {
	public declare WindowBase: WindowBase

	constructor(init?: Partial<{WindowBase?: WindowBase}>, __goscriptValue?: boolean) {
		this.WindowBase = init?.WindowBase ? $.markAsStructValue($.cloneStructValue(init.WindowBase)) : $.markAsStructValue(new WindowBase({App: null! as MyApp | $.VarRef<MyApp> | null}))
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyWindow {
		return new MyWindow(this, true)
	}

	public __goscriptAssign(source: MyWindow): this {
		$.assignStruct(this.WindowBase, source.WindowBase)
		return this
	}

	public async AppWindowName(): globalThis.Promise<any> {
		return await $.pointerValue<WindowBase>(this.WindowBase).AppWindowName(__goscriptStatic1())
	}

	public Name(): any {
		return $.pointerValue<WindowBase>(this.WindowBase).Name(__goscriptStatic1())
	}

	static __typeInfo = $.registerStructType(
		"main.MyWindow",
		() => new MyWindow(),
		() => [{ name: "AppWindowName", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		MyWindow,
		() => [{ name: "WindowBase", key: "WindowBase", type: "main.WindowBase", anonymous: true }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a = new MyApp()
	let a$: MyApp = a == null ? $.pointerTarget<MyApp>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<MyApp>(a)
	let w = new MyWindow()
	let w$: MyWindow = w == null ? $.pointerTarget<MyWindow>(w) : (w as any).__isVarRef === true ? (w as any).value : (w as any).__goValue === undefined ? (w as any) : $.pointerTarget<MyWindow>(w);
	;(w$ as MyWindow).WindowBase.name = "main";
	;(w$ as MyWindow).WindowBase.App = a;
	;(a$ as MyApp).AppBase.Windows = $.appendOne((a$ as MyApp).AppBase.Windows, w, $.appendZeros.nil)
	let app: App | null = $.namedValueInterfaceValue<App | null>(a, "*main.MyApp", __goscriptStatic2(), __goscriptStatic3(), __goscriptStatic4())
	await $.println((__goscriptAwait = $.pointerValue<Exclude<Window, null>>((__goscriptAwait = (app !== null && (app as any).__isVarRef !== true && (app as any).__goValue === undefined ? (app as Exclude<App, null>) : $.pointerValue<Exclude<App, null>>(app)).Window(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println((__goscriptAwait = $.pointerValue<Exclude<Window, null>>($.pointerValue<MyApp>((w$ as MyWindow).WindowBase.App).AppBase.Window(__goscriptStatic0())).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println(await (w$ as MyWindow).WindowBase.AppWindowName(__goscriptStatic1()))
	await $.println(await (a$ as MyApp).AppBase.FirstName(__goscriptStatic0()))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, W: { type: /* @__PURE__ */ $.pointerType("main.MyWindow"), zero: () => null, methods: {AppWindowName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).AppWindowName(...$.stripGenericTypeArgs(args)), Name: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Name(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, A: { type: /* @__PURE__ */ $.pointerType("main.MyApp"), zero: () => null, methods: {FirstName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).FirstName(...$.stripGenericTypeArgs(args)), Window: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Window(...$.stripGenericTypeArgs(args))} }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({FirstName: (receiver: any, ...args: any[]) => $.pointerValue(receiver).FirstName(...$.stripGenericTypeArgs(args)), Window: (receiver: any, ...args: any[]) => $.pointerValue(receiver).Window(...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= (/* @__PURE__ */ $.pointerType("main.MyApp"))
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ([$.methodSignature("FirstName", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Window", [], ["main.Window"])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

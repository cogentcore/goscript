// Generated file based on package_import_fmt_pointer_cycle.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/fmt/index.js"
import "@goscript/strings/index.js"

export class Node {
	public declare Name: string

	public declare Parent: Node | $.VarRef<Node> | null

	public declare Kids: $.Slice<Node | $.VarRef<Node> | null>

	public _fields: {
		Name: string
		Parent: Node | $.VarRef<Node> | null
		Kids: $.Slice<Node | $.VarRef<Node> | null>
	}

	constructor(init?: Partial<{Name?: string, Parent?: Node | $.VarRef<Node> | null, Kids?: $.Slice<Node | $.VarRef<Node> | null>}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Parent: init?.Parent ?? (null! as Node | $.VarRef<Node> | null),
			Kids: init?.Kids ?? (null! as $.Slice<Node | $.VarRef<Node> | null>)
		}
	}

	public clone(): Node {
		return $.markAsStructValue(new Node(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Parent", "Kids"])
	}

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [],
		Node,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Parent", key: "Parent", type: /* @__PURE__ */ $.pointerType("main.Node") }, { name: "Kids", key: "Kids", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.Node")) }]
	)
}

export class Base {
	public declare Windows: $.Slice<any>

	public declare Active: any

	public _fields: {
		Windows: $.Slice<any>
		Active: any
	}

	constructor(init?: Partial<{Windows?: $.Slice<any>, Active?: any}>) {
		this._fields = {
			Windows: init?.Windows ?? (null! as $.Slice<any>),
			Active: init?.Active ?? (null! as any)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Windows", "Active"])
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [],
		Base,
		() => [{ name: "Windows", key: "Windows", type: /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }) }, { name: "Active", key: "Active", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class App {
	public declare Base: Base

	public declare Name: string

	public _fields: {
		Base: Base
		Name: string
	}

	constructor(init?: Partial<{Base?: Base, Name?: string}>) {
		this._fields = {
			Base: init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base({Active: null! as Win | $.VarRef<Win> | null})),
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): App {
		return $.markAsStructValue(new App(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Base", "Name"])
	}

	static __typeInfo = $.registerStructType(
		"main.App",
		() => new App(),
		() => [],
		App,
		() => [{ name: "Base", key: "Base", type: "main.Base", anonymous: true }, { name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Win {
	public declare App: App | $.VarRef<App> | null

	public declare Title: string

	public _fields: {
		App: App | $.VarRef<App> | null
		Title: string
	}

	constructor(init?: Partial<{App?: App | $.VarRef<App> | null, Title?: string}>) {
		this._fields = {
			App: init?.App ?? (null! as App | $.VarRef<App> | null),
			Title: init?.Title ?? ("" as string)
		}
	}

	public clone(): Win {
		return $.markAsStructValue(new Win(this))
	}

	static {
		$.bindStructFields(this.prototype, ["App", "Title"])
	}

	static __typeInfo = $.registerStructType(
		"main.Win",
		() => new Win(),
		() => [],
		Win,
		() => [{ name: "App", key: "App", type: /* @__PURE__ */ $.pointerType("main.App") }, { name: "Title", key: "Title", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export function shape(s: string): string {
	let b: $.VarRef<strings.Builder> = $.varRef($.markAsStructValue(new strings.Builder()))
	for (let i = 0; i < $.len(s); i++) {
		if (strings.HasPrefix($.sliceStringOrBytes(s, i, undefined), "0x")) {
			b.value.WriteString("PTR")
			i = i + (2)
			while ((i < $.len(s)) && (strings.IndexByte("0123456789abcdef", $.uint($.indexStringOrBytes(s, i), 8)) >= 0)) {
				i++
			}
			i--
			continue
		}
		b.value.WriteByte($.uint($.indexStringOrBytes(s, i), 8))
	}
	return b.value.String()
}

export async function main(): globalThis.Promise<void> {
	let root: Node | $.VarRef<Node> | null = new Node({Name: "root"})
	let kid: Node | $.VarRef<Node> | null = new Node({Name: "kid", Parent: root})
	$.pointerValue<Node>(root).Kids = $.append($.pointerValue<Node>(root).Kids, kid, $.appendZeros.nil)
	await fmt.Println(shape(await fmt.Sprint($.interfaceValue(root, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
	await fmt.Println(shape(await fmt.Sprintf("%+v", $.interfaceValue(kid, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))

	let app: App | $.VarRef<App> | null = new App({Name: "app"})
	let win: Win | $.VarRef<Win> | null = new Win({App: app, Title: "main"})
	$.pointerValue<App>(app).Base.Windows = $.append($.pointerValue<App>(app).Base.Windows, win, $.appendZeros.nil)
	$.pointerValue<App>(app).Base.Active = win
	await fmt.Println(shape(await fmt.Sprint($.interfaceValue(win, "*main.Win", /* @__PURE__ */ $.pointerType("main.Win")))))
	await fmt.Println(shape(await fmt.Sprint($.interfaceValue(app, "*main.App", /* @__PURE__ */ $.pointerType("main.App")))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

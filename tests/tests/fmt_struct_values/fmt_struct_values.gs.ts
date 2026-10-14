// Generated file based on fmt_struct_values.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as strings from "@goscript/strings/index.js"

import * as logrus from "@goscript/github.com/sirupsen/logrus/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/bytes/index.js"
import "@goscript/fmt/index.js"
import "@goscript/strings/index.js"
import "@goscript/github.com/sirupsen/logrus/index.js"

export class Inner {
	// Ready is included even when it is false.
	public get Ready(): boolean {
		return this._fields.Ready
	}

	public set Ready(value: boolean) {
		this._fields.Ready = value
	}

	public _fields: {
		Ready: boolean
	}

	constructor(init?: Partial<{Ready?: boolean}>) {
		this._fields = {
			Ready: init?.Ready ?? (false as boolean)
		}
	}

	public clone(): Inner {
		return $.markAsStructValue(new Inner(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Inner",
		() => new Inner(),
		() => [],
		Inner,
		() => [/* @__PURE__ */ $.structField("Ready", /* @__PURE__ */ $.basicType("bool"), [0], 0, true)]
	)
}

export class Record {
	// Count is the numeric field.
	public get Count(): number {
		return this._fields.Count
	}

	public set Count(value: number) {
		this._fields.Count = value
	}

	// name is visible to formatting despite being unexported.
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	// Inner is a nested value.
	public get Inner(): Inner {
		return this._fields.Inner
	}

	public set Inner(value: Inner) {
		this._fields.Inner = value
	}

	public _fields: {
		Count: number
		name: string
		Inner: Inner
	}

	constructor(init?: Partial<{Count?: number, name?: string, Inner?: Inner}>) {
		this._fields = {
			Count: init?.Count ?? (0 as number),
			name: init?.name ?? ("" as string),
			Inner: init?.Inner ? $.markAsStructValue($.cloneStructValue(init.Inner)) : $.markAsStructValue(new Inner())
		}
	}

	public clone(): Record {
		return $.markAsStructValue(new Record(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Record",
		() => new Record(),
		() => [],
		Record,
		() => [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true), /* @__PURE__ */ $.structField("name", /* @__PURE__ */ $.basicType("string"), [1], 8, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/fmt_struct_values" }), /* @__PURE__ */ $.structField("Inner", "main.Inner", [2], 24, true)]
	)
}

export class Pointers {
	// Value points to a scalar, which formats as an address.
	public get Value(): $.VarRef<number> | null {
		return this._fields.Value
	}

	public set Value(value: $.VarRef<number> | null) {
		this._fields.Value = value
	}

	// Next can point back to this record.
	public get Next(): Pointers | $.VarRef<Pointers> | null {
		return this._fields.Next
	}

	public set Next(value: Pointers | $.VarRef<Pointers> | null) {
		this._fields.Next = value
	}

	// Dynamic holds a pointer behind an interface.
	public get Dynamic(): any {
		return this._fields.Dynamic
	}

	public set Dynamic(value: any) {
		this._fields.Dynamic = value
	}

	public _fields: {
		Value: $.VarRef<number> | null
		Next: Pointers | $.VarRef<Pointers> | null
		Dynamic: any
	}

	constructor(init?: Partial<{Value?: $.VarRef<number> | null, Next?: Pointers | $.VarRef<Pointers> | null, Dynamic?: any}>) {
		this._fields = {
			Value: init?.Value ?? (null! as $.VarRef<number> | null),
			Next: init?.Next ?? (null! as Pointers | $.VarRef<Pointers> | null),
			Dynamic: init?.Dynamic ?? (null! as any)
		}
	}

	public clone(): Pointers {
		return $.markAsStructValue(new Pointers(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Pointers",
		() => new Pointers(),
		() => [],
		Pointers,
		() => [/* @__PURE__ */ $.structField("Value", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")), [0], 0, true), /* @__PURE__ */ $.structField("Next", /* @__PURE__ */ $.pointerType("main.Pointers"), [1], 8, true), /* @__PURE__ */ $.structField("Dynamic", { kind: $.TypeKind.Interface, methods: [] }, [2], 16, true)]
	)
}

export class Node {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Parent(): Node | $.VarRef<Node> | null {
		return this._fields.Parent
	}

	public set Parent(value: Node | $.VarRef<Node> | null) {
		this._fields.Parent = value
	}

	public get Kids(): $.Slice<Node | $.VarRef<Node> | null> {
		return this._fields.Kids
	}

	public set Kids(value: $.Slice<Node | $.VarRef<Node> | null>) {
		this._fields.Kids = value
	}

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

	static __typeInfo = $.registerStructType(
		"main.Node",
		() => new Node(),
		() => [],
		Node,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Parent", /* @__PURE__ */ $.pointerType("main.Node"), [1], 16, true), /* @__PURE__ */ $.structField("Kids", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.pointerType("main.Node")), [2], 24, true)]
	)
}

export class Base {
	public get Windows(): $.Slice<any> {
		return this._fields.Windows
	}

	public set Windows(value: $.Slice<any>) {
		this._fields.Windows = value
	}

	public get Active(): any {
		return this._fields.Active
	}

	public set Active(value: any) {
		this._fields.Active = value
	}

	public _fields: {
		Windows: $.Slice<any>
		Active: any
	}

	constructor(init?: Partial<{Windows?: $.Slice<any>, Active?: any}>) {
		this._fields = {
			Windows: init?.Windows ?? (null! as $.Slice<any>),
			Active: init?.Active !== undefined ? $.copyElement(init.Active) : (null! as any)
		}
	}

	public clone(): Base {
		return $.markAsStructValue(new Base(this))
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [],
		Base,
		() => [/* @__PURE__ */ $.structField("Windows", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }), [0], 0, true), /* @__PURE__ */ $.structField("Active", { kind: $.TypeKind.Interface, methods: [] }, [1], 0, true)]
	)
}

export class App {
	public get Base(): Base {
		return this._fields.Base
	}

	public set Base(value: Base) {
		this._fields.Base = value
	}

	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

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

	static __typeInfo = $.registerStructType(
		"main.App",
		() => new App(),
		() => [],
		App,
		() => [/* @__PURE__ */ $.structField("Base", "main.Base", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [1], 32, true)]
	)
}

export class Win {
	public get App(): App | $.VarRef<App> | null {
		return this._fields.App
	}

	public set App(value: App | $.VarRef<App> | null) {
		this._fields.App = value
	}

	public get Title(): string {
		return this._fields.Title
	}

	public set Title(value: string) {
		this._fields.Title = value
	}

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

	static __typeInfo = $.registerStructType(
		"main.Win",
		() => new Win(),
		() => [],
		Win,
		() => [/* @__PURE__ */ $.structField("App", /* @__PURE__ */ $.pointerType("main.App"), [0], 0, true), /* @__PURE__ */ $.structField("Title", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let value = $.varRef($.markAsStructValue(new Record({Count: 3, name: "hello", Inner: $.markAsStructValue(new Inner({Ready: true}))})))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue($.markAsStructValue($.cloneStructValue(value.value)), "main.Record", "main.Record")))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue($.markAsStructValue($.cloneStructValue(value.value)), "main.Record", "main.Record")))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))
	await $.println(await fmt.Sprint($.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))
	await $.println(await fmt.Sprintf("%#v", $.interfaceValue($.markAsStructValue($.cloneStructValue(value.value)), "main.Record", "main.Record")))
	await $.println(await fmt.Sprintf("%#v", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))

	let anonymous = $.varRef($.anonymousStructValue({Count: 4}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue($.markAsStructValue($.cloneStructValue(anonymous.value)), "struct{Count int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue($.markAsStructValue($.cloneStructValue(anonymous.value)), "struct{Count int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue(anonymous, "*struct{Count int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue(anonymous, "*struct{Count int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))))

	// Addresses differ across runtimes; their identity and surrounding text agree.
	let count = $.varRef(7)
	let pointers = $.varRef($.markAsStructValue(new Pointers({Value: count})))
	pointers.value.Next = pointers
	pointers.value.Dynamic = $.interfaceValue(pointers, "*main.Pointers", /* @__PURE__ */ $.pointerType("main.Pointers"))
	let text = await fmt.Sprintf("%+v", $.interfaceValue(pointers, "*main.Pointers", /* @__PURE__ */ $.pointerType("main.Pointers")))
	text = strings.ReplaceAll(text, await fmt.Sprintf("%p", $.interfaceValue(count, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))), "<scalar>")
	text = strings.ReplaceAll(text, await fmt.Sprintf("%p", $.interfaceValue(pointers, "*main.Pointers", /* @__PURE__ */ $.pointerType("main.Pointers"))), "<self>")
	await $.println(text)

	// Pointers nested in slices and struct cycles print as addresses.
	let root: Node | $.VarRef<Node> | null = new Node({Name: "root"})
	let kid: Node | $.VarRef<Node> | null = new Node({Name: "kid", Parent: root})
	$.pointerValue<Node>(root).Kids = $.append($.pointerValue<Node>(root).Kids, kid, $.appendZeros.nil)
	let app: App | $.VarRef<App> | null = new App({Name: "app"})
	let win: Win | $.VarRef<Win> | null = new Win({App: app, Title: "main"})
	$.pointerValue<App>(app).Base.Windows = $.append($.pointerValue<App>(app).Base.Windows, win, $.appendZeros.nil)
	$.pointerValue<App>(app).Base.Active = win
	let names: strings.Replacer | $.VarRef<strings.Replacer> | null = strings.NewReplacer(await fmt.Sprintf("%p", $.interfaceValue(root, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))), "<root>", await fmt.Sprintf("%p", $.interfaceValue(kid, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))), "<kid>", await fmt.Sprintf("%p", $.interfaceValue(app, "*main.App", /* @__PURE__ */ $.pointerType("main.App"))), "<app>", await fmt.Sprintf("%p", $.interfaceValue(win, "*main.Win", /* @__PURE__ */ $.pointerType("main.Win"))), "<win>")
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprint($.interfaceValue(root, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprintf("%+v", $.interfaceValue(kid, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprint($.interfaceValue(win, "*main.Win", /* @__PURE__ */ $.pointerType("main.Win")))))
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprint($.interfaceValue(app, "*main.App", /* @__PURE__ */ $.pointerType("main.App")))))

	// Exercise the same log field formatting used by controller shutdown warnings.
	let output: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let logger: logrus.Logger | $.VarRef<logrus.Logger> | null = logrus.New()
	await logrus.Logger.prototype.SetOutput.call(logger, $.interfaceValue<io.Writer | null>(output, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer")))
	await logrus.Logger.prototype.SetFormatter.call(logger, $.interfaceValue<logrus.Formatter | null>(new logrus.TextFormatter({DisableColors: true, DisableTimestamp: true}), "*logrus.TextFormatter", /* @__PURE__ */ $.pointerType("logrus.TextFormatter")))
	await logrus.Entry.prototype.Warn.call(await logrus.Logger.prototype.WithField.call(logger, "controller", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))), $.arrayToSlice<any>(["waiting for controller Execute to return"]))
	await $.println(strings.TrimSpace(output.value.String()))
}

if ($.isMainScript(import.meta)) {
	await main()
}

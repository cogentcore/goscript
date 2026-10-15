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
	public declare Ready: boolean

	constructor(init?: Partial<{Ready?: boolean}>, __goscriptValue?: boolean) {
		this.Ready = init?.Ready ?? (false as boolean)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(this, true)
	}

	public __goscriptAssign(source: Inner): this {
		this.Ready = source.Ready
		return this
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
	public declare Count: number

	// name is visible to formatting despite being unexported.
	public declare name: string

	// Inner is a nested value.
	public declare Inner: Inner

	constructor(init?: Partial<{Count?: number, name?: string, Inner?: Inner}>, __goscriptValue?: boolean) {
		this.Count = init?.Count ?? (0 as number)
		this.name = init?.name ?? ("" as string)
		this.Inner = init?.Inner ? init.Inner.clone() : new Inner(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Record {
		return new Record(this, true)
	}

	public __goscriptAssign(source: Record): this {
		this.Count = source.Count
		this.name = source.name
		this.Inner.__goscriptAssign(source.Inner)
		return this
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
	public declare Value: $.VarRef<number> | null

	// Next can point back to this record.
	public declare Next: Pointers | $.VarRef<Pointers> | null

	// Dynamic holds a pointer behind an interface.
	public declare Dynamic: any

	constructor(init?: Partial<{Value?: $.VarRef<number> | null, Next?: Pointers | $.VarRef<Pointers> | null, Dynamic?: any}>, __goscriptValue?: boolean) {
		this.Value = init?.Value ?? (null! as $.VarRef<number> | null)
		this.Next = init?.Next ?? (null! as Pointers | $.VarRef<Pointers> | null)
		this.Dynamic = init?.Dynamic ?? (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Pointers {
		return new Pointers(this, true)
	}

	public __goscriptAssign(source: Pointers): this {
		this.Value = source.Value
		this.Next = source.Next
		this.Dynamic = $.assignFieldValue(this.Dynamic, source.Dynamic, { kind: $.TypeKind.Interface, methods: [] })
		return this
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
	public declare Name: string

	public declare Parent: Node | $.VarRef<Node> | null

	public declare Kids: $.Slice<Node | $.VarRef<Node> | null>

	constructor(init?: Partial<{Name?: string, Parent?: Node | $.VarRef<Node> | null, Kids?: $.Slice<Node | $.VarRef<Node> | null>}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Parent = init?.Parent ?? (null! as Node | $.VarRef<Node> | null)
		this.Kids = init?.Kids ?? (null! as $.Slice<Node | $.VarRef<Node> | null>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): this {
		this.Name = source.Name
		this.Parent = source.Parent
		this.Kids = source.Kids
		return this
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
	public declare Windows: $.Slice<any>

	public declare Active: any

	constructor(init?: Partial<{Windows?: $.Slice<any>, Active?: any}>, __goscriptValue?: boolean) {
		this.Windows = init?.Windows ?? (null! as $.Slice<any>)
		this.Active = init?.Active !== undefined ? $.copyElement(init.Active) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Base {
		return new Base(this, true)
	}

	public __goscriptAssign(source: Base): this {
		this.Windows = source.Windows
		this.Active = $.assignFieldValue(this.Active, source.Active, { kind: $.TypeKind.Interface, methods: [] })
		return this
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
	public declare Base: Base

	public declare Name: string

	constructor(init?: Partial<{Base?: Base, Name?: string}>, __goscriptValue?: boolean) {
		this.Base = init?.Base ? $.markAsStructValue($.cloneStructValue(init.Base)) : $.markAsStructValue(new Base({Active: null! as Win | $.VarRef<Win> | null}))
		this.Name = init?.Name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): App {
		return new App(this, true)
	}

	public __goscriptAssign(source: App): this {
		$.assignStruct(this.Base, source.Base)
		this.Name = source.Name
		return this
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
	public declare App: App | $.VarRef<App> | null

	public declare Title: string

	constructor(init?: Partial<{App?: App | $.VarRef<App> | null, Title?: string}>, __goscriptValue?: boolean) {
		this.App = init?.App ?? (null! as App | $.VarRef<App> | null)
		this.Title = init?.Title ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Win {
		return new Win(this, true)
	}

	public __goscriptAssign(source: Win): this {
		this.App = source.App
		this.Title = source.Title
		return this
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
	let value = $.varRef(new Record({Count: 3, name: "hello", Inner: new Inner({Ready: true}, true)}, true))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue((value.value).clone(), "main.Record", "main.Record")))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue((value.value).clone(), "main.Record", "main.Record")))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))
	await $.println(await fmt.Sprint($.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))
	await $.println(await fmt.Sprintf("%#v", $.interfaceValue((value.value).clone(), "main.Record", "main.Record")))
	await $.println(await fmt.Sprintf("%#v", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))))

	let anonymous = $.varRef($.anonymousStructValue({Count: 4}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue($.markAsStructValue($.cloneStructValue(anonymous.value)), "struct{Count int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue($.markAsStructValue($.cloneStructValue(anonymous.value)), "struct{Count int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })))
	await $.println(await fmt.Sprintf("%v", $.interfaceValue(anonymous, "*struct{Count int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))))
	await $.println(await fmt.Sprintf("%+v", $.interfaceValue(anonymous, "*struct{Count int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))))

	// Addresses differ across runtimes; their identity and surrounding text agree.
	let count = $.varRef(7)
	let pointers = $.varRef(new Pointers({Value: count}, true))
	pointers.value.Next = pointers
	pointers.value.Dynamic = $.interfaceValue(pointers, "*main.Pointers", /* @__PURE__ */ $.pointerType("main.Pointers"))
	let text = await fmt.Sprintf("%+v", $.interfaceValue(pointers, "*main.Pointers", /* @__PURE__ */ $.pointerType("main.Pointers")))
	text = strings.ReplaceAll(text, await fmt.Sprintf("%p", $.interfaceValue(count, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))), "<scalar>")
	text = strings.ReplaceAll(text, await fmt.Sprintf("%p", $.interfaceValue(pointers, "*main.Pointers", /* @__PURE__ */ $.pointerType("main.Pointers"))), "<self>")
	await $.println(text)

	// Pointers nested in slices and struct cycles print as addresses.
	let root = new Node({Name: "root"})
	let root$: Node = root == null ? $.pointerTarget<Node>(root) : (root as any).__isVarRef === true ? (root as any).value : (root as any).__goValue === undefined ? (root as any) : $.pointerTarget<Node>(root)
	let kid = new Node({Name: "kid", Parent: root});
	;(root$ as Node).Kids = $.appendOne((root$ as Node).Kids, kid, $.appendZeros.nil)
	let app = new App({Name: "app"})
	let app$: App = app == null ? $.pointerTarget<App>(app) : (app as any).__isVarRef === true ? (app as any).value : (app as any).__goValue === undefined ? (app as any) : $.pointerTarget<App>(app)
	let win = new Win({App: app, Title: "main"});
	;(app$ as App).Base.Windows = $.appendOne((app$ as App).Base.Windows, win, $.appendZeros.nil);
	;(app$ as App).Base.Active = win
	let names = strings.NewReplacer(await fmt.Sprintf("%p", $.interfaceValue(root, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))), "<root>", await fmt.Sprintf("%p", $.interfaceValue(kid, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node"))), "<kid>", await fmt.Sprintf("%p", $.interfaceValue(app, "*main.App", /* @__PURE__ */ $.pointerType("main.App"))), "<app>", await fmt.Sprintf("%p", $.interfaceValue(win, "*main.Win", /* @__PURE__ */ $.pointerType("main.Win"))), "<win>")
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprint($.interfaceValue(root, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprintf("%+v", $.interfaceValue(kid, "*main.Node", /* @__PURE__ */ $.pointerType("main.Node")))))
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprint($.interfaceValue(win, "*main.Win", /* @__PURE__ */ $.pointerType("main.Win")))))
	await $.println(strings.Replacer.prototype.Replace.call($.pointerValue<strings.Replacer>(names), await fmt.Sprint($.interfaceValue(app, "*main.App", /* @__PURE__ */ $.pointerType("main.App")))))

	// Exercise the same log field formatting used by controller shutdown warnings.
	let output: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	let logger = logrus.New()
	await (logger !== null && (logger as any).__isVarRef !== true && (logger as any).__goValue === undefined ? ((logger as any) as logrus.Logger).SetOutput($.interfaceValue<io.Writer | null>(output, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer"))) : logrus.Logger.prototype.SetOutput.call(logger, $.interfaceValue<io.Writer | null>(output, "*bytes.Buffer", /* @__PURE__ */ $.pointerType("bytes.Buffer"))))
	await logrus.Logger.prototype.SetFormatter.call(logger, $.interfaceValue<logrus.Formatter | null>(new logrus.TextFormatter({DisableColors: true, DisableTimestamp: true}), "*logrus.TextFormatter", /* @__PURE__ */ $.pointerType("logrus.TextFormatter")))
	await logrus.Entry.prototype.Warn.call(await (logger !== null && (logger as any).__isVarRef !== true && (logger as any).__goValue === undefined ? ((logger as any) as logrus.Logger).WithField("controller", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record"))) : logrus.Logger.prototype.WithField.call(logger, "controller", $.interfaceValue(value, "*main.Record", /* @__PURE__ */ $.pointerType("main.Record")))), $.arrayToSlice<any>(["waiting for controller Execute to return"]))
	await $.println(strings.TrimSpace(output.value.String()))
}

if ($.isMainScript(import.meta)) {
	await main()
}

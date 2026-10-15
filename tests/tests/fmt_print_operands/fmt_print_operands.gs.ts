// Generated file based on fmt_print_operands.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as io from "@goscript/io/index.js"
import * as strings from "@goscript/strings/index.js"
import "@goscript/io/index.js"

export type celsius = number

$.registerNamedValueType(
	"main.celsius",
	{String: (receiver: any, ...args: any[]) => (celsius_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.celsius",
	{String: (receiver: any, ...args: any[]) => (celsius_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class slowName {
	public get ch(): $.Channel<string> | null {
		return this._fields.ch
	}

	public set ch(value: $.Channel<string> | null) {
		this._fields.ch = value
	}

	public _fields: {
		ch: $.Channel<string> | null
	}

	constructor(init?: Partial<{ch?: $.Channel<string> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			ch: init?.ch ?? (null! as $.Channel<string> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): slowName {
		return new slowName(this, true)
	}

	public __goscriptAssign(source: slowName): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
	}

	public async String(): globalThis.Promise<string> {
		const s = this;
		await $.chanSend(s.ch, "slow")
		return await $.chanRecv(s.ch)
	}

	static __typeInfo = $.registerStructType(
		"main.slowName",
		() => new slowName(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		slowName,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("string"), "both") }]
	)
}

export class reading {
	public get Name(): slowName {
		return this._fields.Name
	}

	public set Name(value: slowName) {
		this._fields.Name = value
	}

	public get Value(): number {
		return this._fields.Value
	}

	public set Value(value: number) {
		this._fields.Value = value
	}

	public _fields: {
		Name: slowName
		Value: number
	}

	constructor(init?: Partial<{Name?: slowName, Value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ? init.Name.clone() : new slowName(undefined, true),
			Value: init?.Value ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): reading {
		return new reading(this, true)
	}

	public __goscriptAssign(source: reading): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Name, values.Name)
		target.Value = values.Value
	}

	static __typeInfo = $.registerStructType(
		"main.reading",
		() => new reading(),
		() => [],
		reading,
		() => [{ name: "Name", key: "Name", type: "main.slowName" }, { name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class tag {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): tag {
		return new tag(this, true)
	}

	public __goscriptAssign(source: tag): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
	}

	public String(): string {
		const t = this;
		return "#" + t.name
	}

	static __typeInfo = $.registerStructType(
		"main.tag",
		() => new tag(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		tag,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class plain {
	public get Tag(): tag {
		return this._fields.Tag
	}

	public set Tag(value: tag) {
		this._fields.Tag = value
	}

	public get Count(): number {
		return this._fields.Count
	}

	public set Count(value: number) {
		this._fields.Count = value
	}

	public get Tags(): $.Slice<string> {
		return this._fields.Tags
	}

	public set Tags(value: $.Slice<string>) {
		this._fields.Tags = value
	}

	public _fields: {
		Tag: tag
		Count: number
		Tags: $.Slice<string>
	}

	constructor(init?: Partial<{Tag?: tag, Count?: number, Tags?: $.Slice<string>}>, __goscriptValue?: boolean) {
		this._fields = {
			Tag: init?.Tag ? init.Tag.clone() : new tag(undefined, true),
			Count: init?.Count ?? (0 as number),
			Tags: init?.Tags ?? (null! as $.Slice<string>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): plain {
		return new plain(this, true)
	}

	public __goscriptAssign(source: plain): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Tag, values.Tag)
		target.Count = values.Count
		target.Tags = values.Tags
	}

	static __typeInfo = $.registerStructType(
		"main.plain",
		() => new plain(),
		() => [],
		plain,
		() => [{ name: "Tag", key: "Tag", type: "main.tag" }, { name: "Count", key: "Count", type: /* @__PURE__ */ $.basicType("int") }, { name: "Tags", key: "Tags", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }]
	)
}

export class codeError {
	public get code(): number {
		return this._fields.code
	}

	public set code(value: number) {
		this._fields.code = value
	}

	public _fields: {
		code: number
	}

	constructor(init?: Partial<{code?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			code: init?.code ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): codeError {
		return new codeError(this, true)
	}

	public __goscriptAssign(source: codeError): void {
		const target = this._fields
		const values = source._fields
		target.code = values.code
	}

	public Error(): string {
		const e: codeError | $.VarRef<codeError> | null = this;
		return (fmt.Sprintf("code %d", $.basicInterfaceValue($.pointerValue<codeError>(e).code, "int")) as string)
	}

	static __typeInfo = $.registerStructType(
		"main.codeError",
		() => new codeError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		codeError,
		() => [{ name: "code", key: "code", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function celsius_String(c: celsius): string {
	return (fmt.Sprintf("%.1fC", $.basicInterfaceValue(c, "float64")) as string)
}

export function basics(n: number, s: string, f: number): string {
	return (fmt.Sprintf("%d %s %.2f", $.basicInterfaceValue(n, "int"), s, $.basicInterfaceValue(f, "float64")) as string)
}

export function temps(c: celsius, p: plain): string {
	return (fmt.Sprint($.namedValueInterfaceValue<any>(c, "main.celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), " ", $.interfaceValue((p).clone(), "main.plain", "main.plain")) as string)
}

export async function slow(s: slowName): globalThis.Promise<string> {
	return fmt.Sprintf("<%v>", $.interfaceValue((s).clone(), "main.slowName", "main.slowName"))
}

export async function nested(r: reading): globalThis.Promise<string> {
	return fmt.Sprintf("%v", $.interfaceValue((r).clone(), "main.reading", "main.reading"))
}

export async function anything(v: any): globalThis.Promise<string> {
	return fmt.Sprint(v)
}

export async function wrap(err: $.GoError): globalThis.Promise<string> {
	return fmt.Sprintf("failed: %v", (err as any))
}

export function build(c: celsius): string {
	let b = $.varRef($.markAsStructValue(new strings.Builder()))
	fmt.Fprintf($.pointerValueOrNil($.interfaceValue<io.Writer | null>(b, "*strings.Builder", /* @__PURE__ */ $.pointerType("strings.Builder")))!, "[%v]", $.namedValueInterfaceValue<any>(c, "main.celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	fmt.Fprintln($.pointerValueOrNil($.interfaceValue<io.Writer | null>(b, "*strings.Builder", /* @__PURE__ */ $.pointerType("strings.Builder")))!, "done")
	return b.value.String()
}

export async function write(w: io.Writer | null, c: celsius): globalThis.Promise<void> {
	await fmt.Fprintf($.pointerValueOrNil(w)!, "(%v)\n", $.namedValueInterfaceValue<any>(c, "main.celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
}

export async function main(): globalThis.Promise<void> {
	await $.println(basics(1, "a", 2.5))
	await $.println(temps(21.5, new plain({Tag: new tag({name: "t"}, true), Count: 2, Tags: $.arrayToSlice<string>(["x"])}, true)))
	await $.println(await slow(new slowName({ch: $.makeChannel<string>(1, "", "both")}, true)))
	await $.println(await nested(new reading({Name: new slowName({ch: $.makeChannel<string>(1, "", "both")}, true), Value: 4}, true)))
	await $.println(await anything($.namedValueInterfaceValue<any>(1, "main.celsius", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))
	await $.println(await anything($.interfaceValue(new slowName({ch: $.makeChannel<string>(1, "", "both")}, true), "main.slowName", "main.slowName")))
	await $.println(await wrap($.interfaceValue<$.GoError>(new codeError({code: 7}), "*main.codeError", /* @__PURE__ */ $.pointerType("main.codeError"))))
	await $.print(build(5))
	let b = $.varRef($.markAsStructValue(new strings.Builder()))
	await write($.interfaceValue<io.Writer | null>(b, "*strings.Builder", /* @__PURE__ */ $.pointerType("strings.Builder")), 6)
	await $.print(b.value.String())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any, ...args: any[]) => (celsius_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.basicType("float64", "main.celsius"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

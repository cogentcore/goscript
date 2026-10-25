// Generated file based on composite_literal_nested_await.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class command {
	public declare name: string

	public declare flags: $.Slice<string>

	public declare action: (() => number | globalThis.Promise<number>) | null

	constructor(__goscriptValue?: boolean, name$?: string, flags$?: $.Slice<string>, action$?: (() => number | globalThis.Promise<number>) | null) {
		this.name = name$ ?? ""
		this.flags = flags$ ?? (null! as $.Slice<string>)
		this.action = action$ ?? (null! as (() => number | globalThis.Promise<number>) | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): command {
		return new command(true, this.name, this.flags, this.action)
	}

	public __goscriptAssign(source: command): this {
		this.name = source.name
		this.flags = source.flags
		this.action = source.action
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.command",
		() => new command(),
		() => [],
		command,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "flags", key: "flags", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")) }, { name: "action", key: "action", type: ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo) }]
	)
}

export class config {
	public declare flags: ((prefix: string) => $.Slice<string> | globalThis.Promise<$.Slice<string>>) | null

	constructor(__goscriptValue?: boolean, flags$?: ((prefix: string) => $.Slice<string> | globalThis.Promise<$.Slice<string>>) | null) {
		this.flags = flags$ ?? (null! as ((prefix: string) => $.Slice<string> | globalThis.Promise<$.Slice<string>>) | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): config {
		return new config(true, this.flags)
	}

	public __goscriptAssign(source: config): this {
		this.flags = source.flags
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.config",
		() => new config(),
		() => [],
		config,
		() => [{ name: "flags", key: "flags", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"))] } as $.FunctionTypeInfo) }]
	)
}

export let results: $.Channel<number> | null = $.makeChannel<number>(4, 0, "both")

export function __goscript_set_results(__goscriptValue: $.Channel<number> | null): void {
	results = __goscriptValue
}

export function newCommand(c: config): command | $.VarRef<command> | null {
	return (() => { const __goscriptLiteralField0 = (c.flags!("--") as $.Slice<string>); return new command(false, "status", __goscriptLiteralField0, $.functionValue(async (): globalThis.Promise<number> => {
		return await $.chanRecv(results)
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))) })()
}

export let lazyCommand: command = (() => { const __goscriptLiteralField1 = defaultFlags("-"); return new command(true, "lazy", __goscriptLiteralField1, $.functionValue(async (): globalThis.Promise<number> => {
	return await $.chanRecv(results)
}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))) })()

export function __goscript_set_lazyCommand(__goscriptValue: command): void {
	$.assignStruct(lazyCommand, __goscriptValue)
}

export function defaultFlags(prefix: string): $.Slice<string> {
	return $.arrayToSlice<string>([prefix + "verbose"])
}

export async function main(): globalThis.Promise<void> {
	let cmd = newCommand(new config(true, defaultFlags))
	let cmd$: command = cmd == null ? $.pointerTarget<command>(cmd) : (cmd as any).__isVarRef === true ? (cmd as any).value : (cmd as any).__goValue === undefined ? (cmd as any) : $.pointerTarget<command>(cmd)
	await $.println((cmd$ as command).name, $.plainSliceIndex((cmd$ as command).flags!, 0))
	await $.chanSend(results, 7)
	await $.println((__goscriptAwait = (cmd$ as command).action!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println(lazyCommand.name, $.plainSliceIndex(lazyCommand.flags!, 0))
	await $.chanSend(results, 9)
	await $.println((__goscriptAwait = lazyCommand.action!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

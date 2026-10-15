// Generated file based on composite_literal_nested_await.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class command {
	public declare name: string

	public declare flags: $.Slice<string>

	public declare action: (() => number | globalThis.Promise<number>) | null

	constructor(init?: Partial<{name?: string, flags?: $.Slice<string>, action?: (() => number | globalThis.Promise<number>) | null}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		this.flags = init?.flags ?? (null! as $.Slice<string>)
		this.action = init?.action ?? (null! as (() => number | globalThis.Promise<number>) | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): command {
		return new command(this, true)
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

	constructor(init?: Partial<{flags?: ((prefix: string) => $.Slice<string> | globalThis.Promise<$.Slice<string>>) | null}>, __goscriptValue?: boolean) {
		this.flags = init?.flags ?? (null! as ((prefix: string) => $.Slice<string> | globalThis.Promise<$.Slice<string>>) | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): config {
		return new config(this, true)
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
	return (() => { const __goscriptLiteralField0 = (c.flags!("--") as $.Slice<string>); return new command({name: "status", flags: __goscriptLiteralField0, action: $.functionValue(async (): globalThis.Promise<number> => {
		return await $.chanRecv(results)
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))}) })()
}

export let lazyCommand: command = (() => { const __goscriptLiteralField1 = defaultFlags("-"); return new command({name: "lazy", flags: __goscriptLiteralField1, action: $.functionValue(async (): globalThis.Promise<number> => {
	return await $.chanRecv(results)
}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))}, true) })()

export function __goscript_set_lazyCommand(__goscriptValue: command): void {
	$.assignStruct(lazyCommand, __goscriptValue)
}

export function defaultFlags(prefix: string): $.Slice<string> {
	return $.arrayToSlice<string>([prefix + "verbose"])
}

export async function main(): globalThis.Promise<void> {
	let cmd = newCommand(new config({flags: defaultFlags}, true))
	let cmd$: command = cmd == null ? $.pointerTarget<command>(cmd) : (cmd as any).__isVarRef === true ? (cmd as any).value : (cmd as any).__goValue === undefined ? (cmd as any) : $.pointerTarget<command>(cmd)
	await $.println((cmd$ as command).name, $.arrayIndex((cmd$ as command).flags!, 0))
	await $.chanSend(results, 7)
	await $.println((__goscriptAwait = (cmd$ as command).action!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println(lazyCommand.name, $.arrayIndex(lazyCommand.flags!, 0))
	await $.chanSend(results, 9)
	await $.println((__goscriptAwait = lazyCommand.action!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on promoted_embedded_struct_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type closer = {
	Close(): string
}

$.registerInterfaceType(
	"main.closer",
	null,
	[{ name: "Close", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class stream {
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

	public clone(): stream {
		return new stream(this, true)
	}

	public __goscriptAssign(source: stream): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
	}

	public Close(): string {
		const s = this;
		return $.concatString("close:", s.name)
	}

	static __typeInfo = $.registerStructType(
		"main.stream",
		() => new stream(),
		() => [{ name: "Close", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		stream,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class stopStream {
	public get stream(): stream {
		return this._fields.stream
	}

	public set stream(value: stream) {
		this._fields.stream = value
	}

	public _fields: {
		stream: stream
	}

	constructor(init?: Partial<{stream?: stream}>, __goscriptValue?: boolean) {
		this._fields = {
			stream: init?.stream ? init.stream.clone() : new stream(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): stopStream {
		return new stopStream(this, true)
	}

	public __goscriptAssign(source: stopStream): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.stream, values.stream)
	}

	public Close(): any {
		return $.pointerValue<stream>(this.stream).Close()
	}

	static __typeInfo = $.registerStructType(
		"main.stopStream",
		() => new stopStream(),
		() => [{ name: "Close", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		stopStream,
		() => [{ name: "stream", key: "stream", type: "main.stream", anonymous: true }]
	)
}

export class pointerStopStream {
	public get stream(): stream | $.VarRef<stream> | null {
		return this._fields.stream
	}

	public set stream(value: stream | $.VarRef<stream> | null) {
		this._fields.stream = value
	}

	public _fields: {
		stream: stream | $.VarRef<stream> | null
	}

	constructor(init?: Partial<{stream?: stream | $.VarRef<stream> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			stream: init?.stream ?? (null! as stream | $.VarRef<stream> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pointerStopStream {
		return new pointerStopStream(this, true)
	}

	public __goscriptAssign(source: pointerStopStream): void {
		const target = this._fields
		const values = source._fields
		target.stream = values.stream
	}

	public Close(): any {
		return $.pointerValue<stream>(this.stream).Close()
	}

	static __typeInfo = $.registerStructType(
		"main.pointerStopStream",
		() => new pointerStopStream(),
		() => [{ name: "Close", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		pointerStopStream,
		() => [{ name: "stream", key: "stream", type: /* @__PURE__ */ $.pointerType("main.stream"), anonymous: true }]
	)
}

export async function closeIt(c: closer | null): globalThis.Promise<void> {
	await $.println((__goscriptAwait = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as Exclude<closer, null>) : $.pointerValue<Exclude<closer, null>>(c)).Close(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	let value = new stopStream({stream: new stream({name: "value"}, true)}, true)
	await closeIt($.interfaceValue<closer | null>((value).clone(), "main.stopStream", "main.stopStream"))

	let ptr: stopStream | $.VarRef<stopStream> | null = new stopStream({stream: new stream({name: "pointer"}, true)})
	await closeIt($.interfaceValue<closer | null>(ptr, "*main.stopStream", /* @__PURE__ */ $.pointerType("main.stopStream")))

	let promotedPtr = new pointerStopStream({stream: new stream({name: "embedded pointer"})}, true)
	await closeIt($.interfaceValue<closer | null>((promotedPtr).clone(), "main.pointerStopStream", "main.pointerStopStream"))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

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
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): stream {
		return new stream(true, this.name)
	}

	public __goscriptAssign(source: stream): this {
		this.name = source.name
		return this
	}

	public Close(): string {
		const s = this;
		return "close:" + s.name
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
	public declare stream: stream

	constructor(__goscriptValue?: boolean, stream$?: stream) {
		this.stream = stream$ ?? new stream(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): stopStream {
		return new stopStream(true, this.stream.clone())
	}

	public __goscriptAssign(source: stopStream): this {
		this.stream.__goscriptAssign(source.stream)
		return this
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
	public declare stream: stream | $.VarRef<stream> | null

	constructor(__goscriptValue?: boolean, stream$?: stream | $.VarRef<stream> | null) {
		this.stream = stream$ ?? (null! as stream | $.VarRef<stream> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): pointerStopStream {
		return new pointerStopStream(true, this.stream)
	}

	public __goscriptAssign(source: pointerStopStream): this {
		this.stream = source.stream
		return this
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
	await $.println((__goscriptAwait = (c !== null && (c as any).__isVarRef !== true && ((c as any).__goValue === undefined || (c as any).__goType?.charCodeAt(0) !== 42) ? (c as Exclude<closer, null>) : $.pointerValue<Exclude<closer, null>>(c)).Close(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	let value = new stopStream(true, new stream(true, "value"))
	await closeIt($.structInterfaceValue<closer | null>(value, "main.stopStream", "main.stopStream"))

	let ptr = new stopStream(false, new stream(true, "pointer"))
	await closeIt($.interfaceValue<closer | null>(ptr, "*main.stopStream", /* @__PURE__ */ $.pointerType("main.stopStream")))

	let promotedPtr = new pointerStopStream(true, new stream(false, "embedded pointer"))
	await closeIt($.structInterfaceValue<closer | null>(promotedPtr, "main.pointerStopStream", "main.pointerStopStream"))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_pairing_dial_conversions.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as crypto from "@goscript/crypto/index.js"
import * as ed25519 from "@goscript/crypto/ed25519/index.js"
import * as errors from "@goscript/errors/index.js"
import * as io from "@goscript/io/index.js"
import * as net from "@goscript/net/index.js"
import "@goscript/crypto/index.js"
import "@goscript/crypto/ed25519/index.js"
import "@goscript/io/index.js"

export class recreateError {
	public declare next: bigint

	constructor(__goscriptValue?: boolean, next$?: bigint) {
		this.next = next$ ?? 0n
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): recreateError {
		return new recreateError(true, this.next)
	}

	public __goscriptAssign(source: recreateError): this {
		this.next = source.next
		return this
	}

	public Error(): string {
		const e: recreateError | $.VarRef<recreateError> | null = this;
		return "recreate"
	}

	static __typeInfo = $.registerStructType(
		"main.recreateError",
		() => new recreateError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		recreateError,
		() => [{ name: "next", key: "next", type: /* @__PURE__ */ $.basicType("uint64") }]
	)
}

export class readWriteCloser {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): readWriteCloser {
		return new readWriteCloser(true)
	}

	public __goscriptAssign(source: readWriteCloser): this {
		return this
	}

	public Close(): $.GoError {
		return null
	}

	public Read(_p0: $.Slice<number>): [number, $.GoError] {
		return [0, io.EOF]
	}

	public Write(p: $.Slice<number>): [number, $.GoError] {
		return [$.sliceLen(p), null]
	}

	static __typeInfo = $.registerStructType(
		"main.readWriteCloser",
		() => new readWriteCloser(),
		() => [{ name: "Close", args: [], returns: [{ type: "error" }], pointerReceiver: true }, { name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }, { name: "Write", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		readWriteCloser,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let addr: net.Addr | null = $.interfaceValue<net.Addr | null>((() => { const __goscriptLiteralField0 = (net.IPv4(127, 0, 0, 1) as net.IP); return new net.UDPAddr(false, __goscriptLiteralField0, 443) })(), "*net.UDPAddr", /* @__PURE__ */ $.pointerType("net.UDPAddr"))
	await $.println("addr", (__goscriptAwait = (addr !== null && (addr as any).__isVarRef !== true && ((addr as any).__goValue === undefined || (addr as any).__goType?.charCodeAt(0) !== 42) ? (addr as Exclude<net.Addr, null>) : $.pointerValue<Exclude<net.Addr, null>>(addr)).Network(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.pointerValue<net.UDPAddr>(((addr as any)?.__goType === "*net.UDPAddr" && (addr as any).__goValue === undefined && (addr as any).__isTypedNil !== true ? ((addr as any) as net.UDPAddr | $.VarRef<net.UDPAddr> | null) : $.mustTypeAssert<net.UDPAddr | $.VarRef<net.UDPAddr> | null>(addr, /* @__PURE__ */ $.pointerType("net.UDPAddr")))).Port)

	let stream: io.ReadWriteCloser | null = $.interfaceValue<io.ReadWriteCloser | null>(new readWriteCloser(), "*main.readWriteCloser", /* @__PURE__ */ $.pointerType("main.readWriteCloser"))
	let [written, err] = await (stream !== null && (stream as any).__isVarRef !== true && ((stream as any).__goValue === undefined || (stream as any).__goType?.charCodeAt(0) !== 42) ? (stream as Exclude<io.ReadWriteCloser, null>) : $.pointerValue<Exclude<io.ReadWriteCloser, null>>(stream)).Write(new Uint8Array([100, 105, 97, 108]))
	await $.println("stream", written, err == null, await (stream !== null && (stream as any).__isVarRef !== true && ((stream as any).__goValue === undefined || (stream as any).__goType?.charCodeAt(0) !== 42) ? (stream as Exclude<io.ReadWriteCloser, null>) : $.pointerValue<Exclude<io.ReadWriteCloser, null>>(stream)).Close() == null)

	let keys = $.makeChannel<crypto.PublicKey | null>(1, null! as crypto.PublicKey | null, "both")
	await $.chanSend(keys, $.namedValueInterfaceValue<crypto.PublicKey | null>(new Uint8Array([1, 2, 3]) as $.Slice<number>, "ed25519.PublicKey", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	let key = ($.mustTypeAssert<ed25519.PublicKey>((await $.chanRecv(keys)), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "ed25519.PublicKey")) as ed25519.PublicKey)
	await $.println("key", $.sliceLen((key as ed25519.PublicKey)), $.typedSliceIndex(key!, 0))

	let target: $.VarRef<recreateError | $.VarRef<recreateError> | null> = $.varRef(null! as recreateError | $.VarRef<recreateError> | null)
	let matched = errors.As($.pointerValueOrNil($.interfaceValue<$.GoError>(new recreateError(false, 7n), "*main.recreateError", /* @__PURE__ */ $.pointerType("main.recreateError")))!, $.interfaceValue(target, "**main.recreateError", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.pointerType("main.recreateError"))))
	await $.println("error", matched, $.pointerValue<recreateError>(target.value).next)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Equal: (receiver: any, ...args: any[]) => (ed25519.PublicKey_Equal as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "ed25519.PublicKey"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Equal", [["x", "crypto.PublicKey"]], [/* @__PURE__ */ $.basicType("bool")])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

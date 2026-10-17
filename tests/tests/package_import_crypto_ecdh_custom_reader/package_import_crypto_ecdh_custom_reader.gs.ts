// Generated file based on package_import_crypto_ecdh_custom_reader.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as ecdh from "@goscript/crypto/ecdh/index.js"
import * as errors from "@goscript/errors/index.js"
import * as io from "@goscript/io/index.js"
import "@goscript/io/index.js"

export class segmentedReader {
	public declare data: $.Slice<number>

	public declare offset: number

	public declare step: number

	constructor(__goscriptValue?: boolean, data$?: $.Slice<number>, offset$?: number, step$?: number) {
		this.data = data$ ?? (null! as $.Slice<number>)
		this.offset = offset$ ?? 0
		this.step = step$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): segmentedReader {
		return new segmentedReader(true, this.data, this.offset, this.step)
	}

	public __goscriptAssign(source: segmentedReader): this {
		this.data = source.data
		this.offset = source.offset
		this.step = source.step
		return this
	}

	public Read(p: $.Slice<number>): [number, $.GoError] {
		const r: segmentedReader | $.VarRef<segmentedReader> | null = this;
		const r$: segmentedReader = r == null ? $.pointerTarget<segmentedReader>(r) : (r as any).__isVarRef === true ? (r as any).value : (r as any).__goValue === undefined ? (r as any) : $.pointerTarget<segmentedReader>(r)
		if ((r$ as segmentedReader).offset >= $.sliceLen((r$ as segmentedReader).data)) {
			return [0, io.EOF]
		}
		let n = (() => { const __goscriptMinMax0 = (r$ as segmentedReader).step; const __goscriptMinMax1 = $.sliceLen(p); const __goscriptMinMax2 = $.sliceLen((r$ as segmentedReader).data) - (r$ as segmentedReader).offset; let __goscriptMinMax3 = __goscriptMinMax0; __goscriptMinMax3 = $.min(__goscriptMinMax3, __goscriptMinMax1); __goscriptMinMax3 = $.min(__goscriptMinMax3, __goscriptMinMax2); return __goscriptMinMax3 })()
		$.copy(p, $.goSlice((r$ as segmentedReader).data, (r$ as segmentedReader).offset, (r$ as segmentedReader).offset + n));
		;(r$ as segmentedReader).offset += n
		return [n, null]
	}

	static __typeInfo = $.registerStructType(
		"main.segmentedReader",
		() => new segmentedReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		segmentedReader,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "offset", key: "offset", type: /* @__PURE__ */ $.basicType("int") }, { name: "step", key: "step", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class failingReader {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): failingReader {
		return new failingReader(true)
	}

	public __goscriptAssign(source: failingReader): this {
		return this
	}

	public Read(p: $.Slice<number>): [number, $.GoError] {
		let n = $.copy(p, new Uint8Array([1, 2, 3, 4, 5, 6, 7]) as $.Slice<number>)
		return [n, errReaderFailed]
	}

	static __typeInfo = $.registerStructType(
		"main.failingReader",
		() => new failingReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		failingReader,
		() => []
	)
}

export let errReaderFailed: $.GoError = errors.New("reader failed")

export function __goscript_set_errReaderFailed(__goscriptValue: $.GoError): void {
	errReaderFailed = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let deterministicBytes = bytes.Repeat(new Uint8Array([42]) as $.Slice<number>, 64)
	let __goscriptTuple0: any = await $.pointerValue<Exclude<ecdh.Curve, null>>(ecdh.X25519()).GenerateKey($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader(deterministicBytes), "*bytes.Reader", __goscriptStatic0()))!)
	let deterministic: ecdh.PrivateKey | $.VarRef<ecdh.PrivateKey> | null = __goscriptTuple0[0]
	let err: $.GoError = __goscriptTuple0[1]
	await $.println("deterministic err nil", err == null)
	await $.println("deterministic private matches", bytes.Equal((deterministic !== null && (deterministic as any).__isVarRef !== true && (deterministic as any).__goValue === undefined ? ((deterministic as any) as ecdh.PrivateKey).Bytes() : ecdh.PrivateKey.prototype.Bytes.call($.pointerValue<ecdh.PrivateKey>(deterministic))), $.goSlice(deterministicBytes, undefined, 32)))
	await $.println("deterministic public len", $.sliceLen(ecdh.PublicKey.prototype.Bytes.call($.pointerValue<ecdh.PublicKey>((deterministic !== null && (deterministic as any).__isVarRef !== true && (deterministic as any).__goValue === undefined ? ((deterministic as any) as ecdh.PrivateKey).PublicKey() : ecdh.PrivateKey.prototype.PublicKey.call($.pointerValue<ecdh.PrivateKey>(deterministic)))))))

	let segmentedBytes = bytes.Repeat(new Uint8Array([43]) as $.Slice<number>, 64)
	let __goscriptTuple1: any = await $.pointerValue<Exclude<ecdh.Curve, null>>(ecdh.X25519()).GenerateKey($.pointerValueOrNil($.interfaceValue<io.Reader | null>(new segmentedReader(false, segmentedBytes, undefined, 5), "*main.segmentedReader", /* @__PURE__ */ $.pointerType("main.segmentedReader")))!)
	let segmented: ecdh.PrivateKey | $.VarRef<ecdh.PrivateKey> | null = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("segmented err nil", err == null)
	await $.println("segmented private matches", bytes.Equal((segmented !== null && (segmented as any).__isVarRef !== true && (segmented as any).__goValue === undefined ? ((segmented as any) as ecdh.PrivateKey).Bytes() : ecdh.PrivateKey.prototype.Bytes.call($.pointerValue<ecdh.PrivateKey>(segmented))), $.goSlice(segmentedBytes, undefined, 32)))
	await $.println("segmented public len", $.sliceLen(ecdh.PublicKey.prototype.Bytes.call($.pointerValue<ecdh.PublicKey>((segmented !== null && (segmented as any).__isVarRef !== true && (segmented as any).__goValue === undefined ? ((segmented as any) as ecdh.PrivateKey).PublicKey() : ecdh.PrivateKey.prototype.PublicKey.call($.pointerValue<ecdh.PrivateKey>(segmented)))))))

	let __goscriptTuple2: any = await $.pointerValue<Exclude<ecdh.Curve, null>>(ecdh.X25519()).GenerateKey($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bytes.NewReader($.goSlice(deterministicBytes, undefined, 31)), "*bytes.Reader", __goscriptStatic0()))!)
	let short: ecdh.PrivateKey | $.VarRef<ecdh.PrivateKey> | null = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("premature key nil", short == null)
	await $.println("premature unexpected EOF", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(io.ErrUnexpectedEOF)!))

	let __goscriptTuple3: any = await $.pointerValue<Exclude<ecdh.Curve, null>>(ecdh.X25519()).GenerateKey($.pointerValueOrNil($.interfaceValue<io.Reader | null>(new failingReader(), "*main.failingReader", /* @__PURE__ */ $.pointerType("main.failingReader")))!)
	let failed: ecdh.PrivateKey | $.VarRef<ecdh.PrivateKey> | null = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	await $.println("explicit key nil", failed == null)
	await $.println("explicit error propagated", errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(errReaderFailed)!))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("bytes.Reader"), "bytes.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

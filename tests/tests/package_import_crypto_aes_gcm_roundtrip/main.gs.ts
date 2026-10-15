// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bytes from "@goscript/bytes/index.js"
import * as aes from "@goscript/crypto/aes/index.js"
import * as cipher from "@goscript/crypto/cipher/index.js"

export type packetSealer = {
	Seal(dst: $.Slice<number>, plaintext: $.Slice<number>): $.Slice<number> | globalThis.Promise<$.Slice<number>>
}

$.registerInterfaceType(
	"main.packetSealer",
	null,
	[{ name: "Seal", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }] }]
);

export class wrappedAEAD {
	public declare inner: cipher.AEAD | null

	constructor(init?: Partial<{inner?: cipher.AEAD | null}>, __goscriptValue?: boolean) {
		this.inner = init?.inner ?? (null! as cipher.AEAD | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): wrappedAEAD {
		return new wrappedAEAD(this, true)
	}

	public __goscriptAssign(source: wrappedAEAD): this {
		this.inner = $.assignFieldValue(this.inner, source.inner, "cipher.AEAD")
		return this
	}

	public async NonceSize(): globalThis.Promise<number> {
		const w: wrappedAEAD | $.VarRef<wrappedAEAD> | null = this;
		return $.pointerValue<Exclude<cipher.AEAD, null>>($.pointerValue<wrappedAEAD>(w).inner).NonceSize()
	}

	public async Open(dst: $.Slice<number>, nonce: $.Slice<number>, ciphertext: $.Slice<number>, additionalData: $.Slice<number>): globalThis.Promise<[$.Slice<number>, $.GoError]> {
		const w: wrappedAEAD | $.VarRef<wrappedAEAD> | null = this;
		return $.pointerValue<Exclude<cipher.AEAD, null>>($.pointerValue<wrappedAEAD>(w).inner).Open(dst, nonce, ciphertext, additionalData)
	}

	public async Overhead(): globalThis.Promise<number> {
		const w: wrappedAEAD | $.VarRef<wrappedAEAD> | null = this;
		return $.pointerValue<Exclude<cipher.AEAD, null>>($.pointerValue<wrappedAEAD>(w).inner).Overhead()
	}

	public async Seal(dst: $.Slice<number>, nonce: $.Slice<number>, plaintext: $.Slice<number>, additionalData: $.Slice<number>): globalThis.Promise<$.Slice<number>> {
		const w: wrappedAEAD | $.VarRef<wrappedAEAD> | null = this;
		return $.pointerValue<Exclude<cipher.AEAD, null>>($.pointerValue<wrappedAEAD>(w).inner).Seal(dst, nonce, plaintext, additionalData)
	}

	static __typeInfo = $.registerStructType(
		"main.wrappedAEAD",
		() => new wrappedAEAD(),
		() => [{ name: "NonceSize", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "Open", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }], pointerReceiver: true }, { name: "Overhead", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "Seal", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }], pointerReceiver: true }],
		wrappedAEAD,
		() => [{ name: "inner", key: "inner", type: "cipher.AEAD" }]
	)
}

export class nestedSealer {
	public declare aead: cipher.AEAD | null

	public declare nonce: $.Slice<number>

	public declare aad: $.Slice<number>

	constructor(init?: Partial<{aead?: cipher.AEAD | null, nonce?: $.Slice<number>, aad?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this.aead = init?.aead ?? (null! as cipher.AEAD | null)
		this.nonce = init?.nonce ?? (null! as $.Slice<number>)
		this.aad = init?.aad ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): nestedSealer {
		return new nestedSealer(this, true)
	}

	public __goscriptAssign(source: nestedSealer): this {
		this.aead = $.assignFieldValue(this.aead, source.aead, "cipher.AEAD")
		this.nonce = source.nonce
		this.aad = source.aad
		return this
	}

	public async Seal(dst: $.Slice<number>, plaintext: $.Slice<number>): globalThis.Promise<$.Slice<number>> {
		const s: nestedSealer | $.VarRef<nestedSealer> | null = this;
		const s$: nestedSealer = s == null ? $.pointerTarget<nestedSealer>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<nestedSealer>(s)
		return $.pointerValue<Exclude<cipher.AEAD, null>>((s$ as nestedSealer).aead).Seal(dst, (s$ as nestedSealer).nonce, plaintext, (s$ as nestedSealer).aad)
	}

	static __typeInfo = $.registerStructType(
		"main.nestedSealer",
		() => new nestedSealer(),
		() => [{ name: "Seal", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }], pointerReceiver: true }],
		nestedSealer,
		() => [{ name: "aead", key: "aead", type: "cipher.AEAD" }, { name: "nonce", key: "nonce", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "aad", key: "aad", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export function encodeHex(data: $.Slice<number>): string {
	const digits: string = "0123456789abcdef"
	let encoded = $.makeSlice<number>($.sliceLen(data) * 2, undefined, "byte")
	for (let __goscriptRangeTarget0 = data, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __goscriptSliceWindow0 = $.sliceRange(encoded), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let value = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number), 8);
		;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i * 2)] = $.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", $.uintShr(value, 4, 8));
		;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, (i * 2) + 1)] = $.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", value & 0xf)
	}
	return $.bytesToString(encoded)
}

export async function roundTrip(prefix: $.Slice<number>): globalThis.Promise<void> {
	let key = new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102])
	let nonce = new Uint8Array([49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50])
	let plaintext = new Uint8Array([98, 114, 111, 119, 115, 101, 114, 32, 113, 117, 105, 99, 32, 104, 97, 110, 100, 115, 104, 97, 107, 101, 32, 112, 97, 121, 108, 111, 97, 100])
	let aad = new Uint8Array([113, 117, 105, 99, 32, 112, 114, 111, 116, 101, 99, 116, 101, 100, 32, 104, 101, 97, 100, 101, 114])

	let [block, err] = aes.NewCipher(key)
	if (err != null) {
		$.panic((err as any))
	}
	let aead: cipher.AEAD | null = null! as cipher.AEAD | null
	let __goscriptTuple0: any = cipher.NewGCM($.pointerValueOrNil(block)!)
	aead = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	if (err != null) {
		$.panic((err as any))
	}

	let sealed = await (aead !== null && (aead as any).__isVarRef !== true && (aead as any).__goValue === undefined ? (aead as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(aead)).Seal(prefix, nonce, plaintext, aad)
	let ciphertext = $.goSlice(sealed, $.sliceLen(prefix), undefined)
	let __goscriptTuple1: any = await (aead !== null && (aead as any).__isVarRef !== true && (aead as any).__goValue === undefined ? (aead as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(aead)).Open(null, nonce, ciphertext, aad)
	let opened: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("round trip:", err == null, bytes.Equal(opened, plaintext), $.sliceLen(sealed), $.sliceLen(ciphertext))
	if (prefix == null) {
		await $.println("ciphertext:", encodeHex(ciphertext))
	}
	if (($.sliceLen(prefix) == 0) && ($.cap(prefix) >= $.sliceLen(sealed))) {
		let backing = $.goSlice(prefix, undefined, $.sliceLen(sealed))
		await $.println("shared backing:", bytes.Equal(backing, sealed), $.cap(prefix), $.sliceLen(sealed))
	}
}

export function makeGeneric<T>(__typeArgs: $.GenericTypeArgs | undefined, length: number, capacity: number): $.Slice<T> {
	return $.makeSlice<T>(length, capacity, undefined, () => ($.genericZero(__typeArgs, "T", null) as T))
}

export async function main(): globalThis.Promise<void> {
	await roundTrip(null)
	await roundTrip($.makeSlice<number>(15, undefined, "byte"))
	await roundTrip($.makeSlice<number>(0, 64, "byte"))
	let [block, ] = aes.NewCipher(new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]))
	let [inner, ] = cipher.NewGCM($.pointerValueOrNil(block)!)
	let aead = $.interfaceValue<cipher.AEAD | null>(new wrappedAEAD({inner: inner}), "*main.wrappedAEAD", /* @__PURE__ */ $.pointerType("main.wrappedAEAD"))
	let plaintext = $.makeSlice<number>(695, undefined, "byte")
	for (let __goscriptRangeTarget1 = plaintext, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), i = 0; i < __goscriptRangeWindow1.length; i++) {
		;(__goscriptRangeWindow1.backing as any[])[__goscriptRangeWindow1.offset + i] = $.uint(i, 8)
	}
	let packet: $.Slice<number> = (makeGeneric(__goscriptStatic0(), 15 + $.sliceLen(plaintext), 1452) as $.Slice<number>)
	let nonce = new Uint8Array([49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50])
	let aad = new Uint8Array([113, 117, 105, 99, 32, 112, 114, 111, 116, 101, 99, 116, 101, 100, 32, 104, 101, 97, 100, 101, 114])
	let expected = await (aead !== null && (aead as any).__isVarRef !== true && (aead as any).__goValue === undefined ? (aead as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(aead)).Seal(null, nonce, plaintext, aad)
	$.copy($.goSlice(packet, 15, undefined), plaintext)
	let sealer = $.interfaceValue<packetSealer | null>(new nestedSealer({aead: aead, nonce: nonce, aad: aad}), "*main.nestedSealer", /* @__PURE__ */ $.pointerType("main.nestedSealer"));
	;((__goscriptAwait = (sealer !== null && (sealer as any).__isVarRef !== true && (sealer as any).__goValue === undefined ? (sealer as Exclude<packetSealer, null>) : $.pointerValue<Exclude<packetSealer, null>>(sealer)).Seal($.goSlice(packet, 15, 15), $.goSlice(packet, 15, 15 + $.sliceLen(plaintext))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as $.Slice<number>)
	packet = $.goSlice(packet, undefined, $.sliceLen(packet) + (__goscriptAwait = (aead !== null && (aead as any).__isVarRef !== true && (aead as any).__goValue === undefined ? (aead as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(aead)).Overhead(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("wrapped shared backing:", bytes.Equal($.goSlice(packet, 15, 15 + $.sliceLen(expected)), expected))

	let [randomAEAD, err] = cipher.NewGCMWithRandomNonce($.pointerValueOrNil(block)!)
	let randomSealed = await (randomAEAD !== null && (randomAEAD as any).__isVarRef !== true && (randomAEAD as any).__goValue === undefined ? (randomAEAD as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(randomAEAD)).Seal(new Uint8Array([7]) as $.Slice<number>, null, new Uint8Array([114, 97, 110, 100, 111, 109, 32, 110, 111, 110, 99, 101]), aad)
	let __goscriptTuple2: any = await (randomAEAD !== null && (randomAEAD as any).__isVarRef !== true && (randomAEAD as any).__goValue === undefined ? (randomAEAD as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(randomAEAD)).Open(null, null, $.goSlice(randomSealed, 1, undefined), aad)
	let randomOpened: $.Slice<number> = __goscriptTuple2[0]
	let openErr = __goscriptTuple2[1]
	await $.println("random nonce:", err == null, openErr == null, (__goscriptAwait = (randomAEAD !== null && (randomAEAD as any).__isVarRef !== true && (randomAEAD as any).__goValue === undefined ? (randomAEAD as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(randomAEAD)).NonceSize(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (randomAEAD !== null && (randomAEAD as any).__isVarRef !== true && (randomAEAD as any).__goValue === undefined ? (randomAEAD as Exclude<cipher.AEAD, null>) : $.pointerValue<Exclude<cipher.AEAD, null>>(randomAEAD)).Overhead(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.sliceLen(randomSealed), $.arrayIndex(randomSealed!, 0) == 7, bytes.Equal(randomOpened, new Uint8Array([114, 97, 110, 100, 111, 109, 32, 110, 111, 110, 99, 101])))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

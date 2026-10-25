// Generated file based on package_import_x509_tls_path.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as ed25519 from "@goscript/crypto/ed25519/index.js"
import * as rand from "@goscript/crypto/rand/index.js"
import * as tls from "@goscript/crypto/tls/index.js"
import * as x509 from "@goscript/crypto/x509/index.js"
import * as pkix from "@goscript/crypto/x509/pkix/index.js"
import * as big from "@goscript/math/big/index.js"
import * as time from "@goscript/time/index.js"
import type * as crypto from "@goscript/crypto/index.js"
import * as io from "@goscript/io/index.js"
import "@goscript/crypto/rand/index.js"
import "@goscript/io/index.js"

export async function main(): globalThis.Promise<void> {
	let __goscriptTuple0: any = await ed25519.GenerateKey($.pointerValueOrNil(rand.Reader)!)
	let pub: ed25519.PublicKey = (__goscriptTuple0[0] as ed25519.PublicKey)
	let priv: ed25519.PrivateKey = (__goscriptTuple0[1] as ed25519.PrivateKey)
	let err: $.GoError = __goscriptTuple0[2]
	await $.println("keygen err nil", err == null)

	let template = (() => { const __goscriptLiteralField0 = big.NewInt(84n); const __goscriptLiteralField1 = $.markAsStructValue($.cloneStructValue(time.Unix(1700000000n, 0n))); const __goscriptLiteralField2 = $.markAsStructValue($.cloneStructValue(time.Unix(1700003600n, 0n))); return new x509.Certificate(false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, __goscriptLiteralField0, undefined, new pkix.Name(true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "bifrost.goscript.test"), __goscriptLiteralField1, __goscriptLiteralField2, 1, undefined, undefined, undefined, $.arrayToSlice<x509.ExtKeyUsage>([1, 2]), undefined, true) })()
	let __goscriptTuple1: any = await x509.CreateCertificate(rand.Reader, template, template, $.namedValueInterfaceValue<any>(pub, "ed25519.PublicKey", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.namedValueInterfaceValue<any>(priv, "ed25519.PrivateKey", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()))
	let der: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("create err nil", err == null)
	if (err != null) {
		await $.println("create error", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	let __goscriptTuple2: any = await x509.ParseCertificate(der)
	let leaf: x509.Certificate | $.VarRef<x509.Certificate> | null = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("parse err nil", err == null)
	if (err != null) {
		await $.println("parse error", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	let certificate = new tls.Certificate(true, $.arrayToSlice<$.Slice<number>>([der]), $.namedValueInterfaceValue<crypto.PrivateKey | null>(priv, "ed25519.PrivateKey", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()), undefined, undefined, undefined, leaf)
	let config = new tls.Config(false, undefined, undefined, $.arrayToSlice<tls.Certificate>([certificate]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, $.arrayToSlice<string>(["bifrost"]), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 771)
	let config$: tls.Config = config == null ? $.pointerTarget<tls.Config>(config) : (config as any).__isVarRef === true ? (config as any).value : (config as any).__goValue === undefined ? (config as any) : $.pointerTarget<tls.Config>(config)
	await $.println("certificate count", $.sliceLen((config$ as tls.Config).Certificates))
	await $.println("chain count", $.sliceLen($.plainSliceIndex((config$ as tls.Config).Certificates!, 0).Certificate))
	await $.println("leaf common name", $.pointerValue<x509.Certificate>($.plainSliceIndex((config$ as tls.Config).Certificates!, 0).Leaf).Subject.CommonName)
	await $.println("private key signer", ed25519.PublicKey_Equal($.mustTypeAssert<ed25519.PublicKey>(ed25519.PrivateKey_Public($.mustTypeAssert<ed25519.PrivateKey>($.plainSliceIndex((config$ as tls.Config).Certificates!, 0).PrivateKey, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "ed25519.PrivateKey"))), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "ed25519.PublicKey")), $.namedValueInterfaceValue<crypto.PublicKey | null>(pub, "ed25519.PublicKey", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())))
	await $.println("min version", (config$ as tls.Config).MinVersion)
	await $.println("next proto", $.plainSliceIndex((config$ as tls.Config).NextProtos!, 0))

	let cache = tls.NewLRUClientSessionCache(2)
	let session = new tls.ClientSessionState()
	void (__goscriptAwait = (cache !== null && (cache as any).__isVarRef !== true && ((cache as any).__goValue === undefined || (cache as any).__goType?.charCodeAt(0) !== 42) ? (cache as Exclude<tls.ClientSessionCache, null>) : $.pointerValue<Exclude<tls.ClientSessionCache, null>>(cache)).Put("one", session), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let __goscriptTuple3: any = await (cache !== null && (cache as any).__isVarRef !== true && ((cache as any).__goValue === undefined || (cache as any).__goType?.charCodeAt(0) !== 42) ? (cache as Exclude<tls.ClientSessionCache, null>) : $.pointerValue<Exclude<tls.ClientSessionCache, null>>(cache)).Get("one")
	let cached: tls.ClientSessionState | $.VarRef<tls.ClientSessionState> | null = __goscriptTuple3[0]
	let ok: boolean = __goscriptTuple3[1]
	await $.println("session cache hit", ok, (cached === session || ($.pointerAliasesMade || (cached as any)?.__goElementBacking !== undefined) && $.pointerEqual(cached, session)))
	void (__goscriptAwait = (cache !== null && (cache as any).__isVarRef !== true && ((cache as any).__goValue === undefined || (cache as any).__goType?.charCodeAt(0) !== 42) ? (cache as Exclude<tls.ClientSessionCache, null>) : $.pointerValue<Exclude<tls.ClientSessionCache, null>>(cache)).Put("two", new tls.ClientSessionState()), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	void (__goscriptAwait = (cache !== null && (cache as any).__isVarRef !== true && ((cache as any).__goValue === undefined || (cache as any).__goType?.charCodeAt(0) !== 42) ? (cache as Exclude<tls.ClientSessionCache, null>) : $.pointerValue<Exclude<tls.ClientSessionCache, null>>(cache)).Put("three", new tls.ClientSessionState()), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	let __goscriptTuple4: any = await (cache !== null && (cache as any).__isVarRef !== true && ((cache as any).__goValue === undefined || (cache as any).__goType?.charCodeAt(0) !== 42) ? (cache as Exclude<tls.ClientSessionCache, null>) : $.pointerValue<Exclude<tls.ClientSessionCache, null>>(cache)).Get("one")
	ok = __goscriptTuple4[1]
	await $.println("session cache evicted", !ok)
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

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({Equal: (receiver: any, ...args: any[]) => (ed25519.PrivateKey_Equal as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Public: (receiver: any) => (ed25519.PrivateKey_Public as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Seed: (receiver: any) => (ed25519.PrivateKey_Seed as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Sign: (receiver: any, ...args: any[]) => (ed25519.PrivateKey_Sign as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"), "ed25519.PrivateKey"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("Equal", [["x", "crypto.PrivateKey"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Public", [], ["crypto.PublicKey"]), $.methodSignature("Seed", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]), $.methodSignature("Sign", [["rand", "io.Reader"], ["message", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["opts", "crypto.SignerOpts"]], [["signature", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["err", "error"]])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

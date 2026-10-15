// Generated file based on package_import_asn1_rdn_sequence.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as pkix from "@goscript/crypto/x509/pkix/index.js"

import * as asn1 from "@goscript/encoding/asn1/index.js"
import "@goscript/crypto/x509/pkix/index.js"
import "@goscript/encoding/asn1/index.js"

export async function main(): globalThis.Promise<void> {
	let input = ($.arrayToSlice<pkix.RelativeDistinguishedNameSET>([($.arrayToSlice<pkix.AttributeTypeAndValue>([new pkix.AttributeTypeAndValue({Type: ($.arrayToSlice<number>([2, 5, 4, 3]) as asn1.ObjectIdentifier), Value: "goscript"}, true)]) as pkix.RelativeDistinguishedNameSET)]) as pkix.RDNSequence)
	let __goscriptTuple0: any = await asn1.Marshal($.namedValueInterfaceValue<any>(input, "pkix.RDNSequence", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))
	let der: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println("marshal err nil", err == null)
	await $.println("der len", $.sliceLen(der))

	let output: $.VarRef<pkix.RDNSequence> = $.varRef(null! as pkix.RDNSequence)
	let __goscriptTuple1: any = await asn1.Unmarshal(der, $.namedValueInterfaceValue<any>(output, "*pkix.RDNSequence", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic2()))
	let rest: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("unmarshal err nil", err == null)
	await $.println("rest len", $.sliceLen(rest))
	await $.println("rdn count", $.sliceLen((output.value as pkix.RDNSequence)))
	await $.println("set count", $.sliceLen(($.arrayIndex(output.value!, 0) as pkix.RelativeDistinguishedNameSET)))
	await $.println("oid", asn1.ObjectIdentifier_String($.arrayIndex($.arrayIndex(output.value!, 0)!, 0).Type))
	await $.println("value", $.mustTypeAssert<string>($.arrayIndex($.arrayIndex(output.value!, 0)!, 0).Value, /* @__PURE__ */ $.basicType("string")))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({String: (receiver: any, ...args: any[]) => (pkix.RDNSequence_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType("pkix.AttributeTypeAndValue", "pkix.RelativeDistinguishedNameSET"), "pkix.RDNSequence"))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({String: (receiver: any, ...args: any[]) => (pkix.RDNSequence_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType("pkix.AttributeTypeAndValue", "pkix.RelativeDistinguishedNameSET"), "pkix.RDNSequence")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

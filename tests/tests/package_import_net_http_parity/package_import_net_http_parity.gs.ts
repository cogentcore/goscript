// Generated file based on package_import_net_http_parity.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as http from "@goscript/net/http/index.js"
import * as httptest from "@goscript/net/http/httptest/index.js"
import * as strings from "@goscript/strings/index.js"
import * as time from "@goscript/time/index.js"
import * as bytes from "@goscript/bytes/index.js"
import type * as io from "@goscript/io/index.js"
import * as url from "@goscript/net/url/index.js"
import "@goscript/bytes/index.js"
import "@goscript/net/url/index.js"

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let h = $.makeMap<string, $.Slice<string>>([])
	http.Header_Set(h, "content-type", "text/plain")
	http.Header_Add(h, "content-type", "charset=utf-8")
	await $.println("header:", http.CanonicalHeaderKey("x-test"), await http.Header_Get(h, "CONTENT-TYPE"), $.sliceLen(http.Header_Values(h, "content-type")))

	let [major, minor, ok] = http.ParseHTTPVersion("HTTP/2.0")
	await $.println("proto:", major, minor, ok)
	await $.println("status:", http.MethodPatch, 511, http.StatusText(511))

	let __goscriptTuple0: any = http.NewRequest(http.MethodPut, "https://example.invalid/path?q=1", $.interfaceValue<io.Reader | null>($.markAsStructValue($.cloneStructValue($.pointerValue<any>(http.NoBody))), "http.noBody", __goscriptStatic0())!)
	let req: http.Request | $.VarRef<http.Request> | null = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	let req$: http.Request = req == null ? $.pointerTarget<http.Request>(req) : (req as any).__isVarRef === true ? (req as any).value : (req as any).__goValue === undefined ? (req as any) : $.pointerTarget<http.Request>(req)
	if (err != null) {
		await $.println("request error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	http.Header_Set((req$ as http.Request).Header, "Cookie", "space=wave")
	await $.println("request:", (req$ as http.Request).Method, $.pointerValue<url.URL>((req$ as http.Request).URL).Path, (req !== null && (req as any).__isVarRef !== true && (req as any).__goValue === undefined ? ((req as any) as http.Request).ProtoAtLeast(1, 1) : http.Request.prototype.ProtoAtLeast.call($.pointerValue<http.Request>(req), 1, 1)), $.sliceLen((req !== null && (req as any).__isVarRef !== true && (req as any).__goValue === undefined ? ((req as any) as http.Request).Cookies() : http.Request.prototype.Cookies.call($.pointerValue<http.Request>(req)))))

	let rec: httptest.ResponseRecorder | $.VarRef<httptest.ResponseRecorder> | null = httptest.NewRecorder()
	http.Error($.pointerValueOrNil($.interfaceValue<http.ResponseWriter | null>(rec, "*httptest.ResponseRecorder", __goscriptStatic1()))!, http.ProtocolError.prototype.Error.call($.pointerValue<http.ProtocolError>(http.ErrNotSupported)), 403)
	await $.println("recorder:", $.pointerValue<httptest.ResponseRecorder>(rec).Code, $.pointerValue<bytes.Buffer>($.pointerValue<httptest.ResponseRecorder>(rec).Body).String())

	rec = httptest.NewRecorder()
	await http.ServeContent($.pointerValueOrNil($.interfaceValue<http.ResponseWriter | null>(rec, "*httptest.ResponseRecorder", __goscriptStatic1()))!, req, "content.txt", $.markAsStructValue(new time.Time()), $.pointerValueOrNil($.interfaceValue<io.ReadSeeker | null>(strings.NewReader("served"), "*strings.Reader", __goscriptStatic2()))!)
	await $.println("servecontent:", $.pointerValue<httptest.ResponseRecorder>(rec).Code, $.pointerValue<bytes.Buffer>($.pointerValue<httptest.ResponseRecorder>(rec).Body).String())

	let __goscriptTuple1: any = http.NewRequest(http.MethodHead, "https://example.invalid/content.txt", $.interfaceValue<io.Reader | null>($.markAsStructValue($.cloneStructValue($.pointerValue<any>(http.NoBody))), "http.noBody", __goscriptStatic0())!)
	let headReq: http.Request | $.VarRef<http.Request> | null = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	if (err != null) {
		await $.println("head request error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	rec = httptest.NewRecorder()
	await http.ServeContent($.pointerValueOrNil($.interfaceValue<http.ResponseWriter | null>(rec, "*httptest.ResponseRecorder", __goscriptStatic1()))!, headReq, "content.txt", $.markAsStructValue(new time.Time()), $.pointerValueOrNil($.interfaceValue<io.ReadSeeker | null>(strings.NewReader("hidden"), "*strings.Reader", __goscriptStatic2()))!)
	await $.println("servecontent head:", $.pointerValue<httptest.ResponseRecorder>(rec).Code, $.pointerValue<bytes.Buffer>($.pointerValue<httptest.ResponseRecorder>(rec).Body).Len())

	let srv = httptest.NewTLSServer($.pointerValueOrNil(http.NotFoundHandler())!)
	__defer.defer(() => { (srv !== null && (srv as any).__isVarRef !== true && (srv as any).__goValue === undefined ? ((srv as any) as httptest.Server).Close() : httptest.Server.prototype.Close.call($.pointerValue<httptest.Server>(srv))) })
	await $.println("server:", !$.stringEqual($.pointerValue<httptest.Server>(srv).URL, ""), (srv !== null && (srv as any).__isVarRef !== true && (srv as any).__goValue === undefined ? ((srv as any) as httptest.Server).Client() : httptest.Server.prototype.Client.call($.pointerValue<httptest.Server>(srv))) != null, httptest.DefaultRemoteAddr)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods("http.noBody", "http.noBody", () => [$.methodSignature("Close", [], ["error"]), $.methodSignature("Read", [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], [/* @__PURE__ */ $.basicType("int"), "error"]), $.methodSignature("WriteTo", ["io.Writer"], [/* @__PURE__ */ $.basicType("int64"), "error"])]))
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("httptest.ResponseRecorder"), "httptest.ResponseRecorder", () => [$.methodSignature("Flush", [], [], true), $.methodSignature("Header", [], ["http.Header"], true), $.methodSignature("Result", [], [/* @__PURE__ */ $.pointerType("http.Response")], true), $.methodSignature("Write", [["buf", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.basicType("int"), "error"], true), $.methodSignature("WriteHeader", [["code", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("WriteString", [["str", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("int"), "error"], true)]))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("strings.Reader"), "strings.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["s", /* @__PURE__ */ $.basicType("string")]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

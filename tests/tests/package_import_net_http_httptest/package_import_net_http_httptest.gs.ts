// Generated file based on package_import_net_http_httptest.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as mime from "@goscript/mime/index.js"
import * as http from "@goscript/net/http/index.js"
import * as httptest from "@goscript/net/http/httptest/index.js"

export async function setAttachment(w: http.ResponseWriter | null, name: string): globalThis.Promise<void> {
	http.Header_Set(((__goscriptAwait = (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Header(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as http.Header), "Content-Disposition", mime.FormatMediaType("attachment", $.makeMap<string, string>([["filename", name]])))
}

export async function main(): globalThis.Promise<void> {
	let w = httptest.NewRecorder()
	http.Header_Set((w !== null && (w as any).__isVarRef !== true && (w as any).__goValue === undefined ? ((w as any) as httptest.ResponseRecorder).Header() : httptest.ResponseRecorder.prototype.Header.call($.pointerValue<httptest.ResponseRecorder>(w))), "X-Test", "ok")
	await $.println(await http.Header_Get((w !== null && (w as any).__isVarRef !== true && (w as any).__goValue === undefined ? ((w as any) as httptest.ResponseRecorder).Header() : httptest.ResponseRecorder.prototype.Header.call($.pointerValue<httptest.ResponseRecorder>(w))), "X-Test"))

	await setAttachment($.interfaceValue<http.ResponseWriter | null>(w, "*httptest.ResponseRecorder", __goscriptStatic0()), "hello.txt")
	await $.println(await http.Header_Get((w !== null && (w as any).__isVarRef !== true && (w as any).__goValue === undefined ? ((w as any) as httptest.ResponseRecorder).Header() : httptest.ResponseRecorder.prototype.Header.call($.pointerValue<httptest.ResponseRecorder>(w))), "Content-Disposition"))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("httptest.ResponseRecorder"), "httptest.ResponseRecorder", () => [$.methodSignature("Flush", [], [], true), $.methodSignature("Header", [], ["http.Header"], true), $.methodSignature("Result", [], [/* @__PURE__ */ $.pointerType("http.Response")], true), $.methodSignature("Write", [["buf", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.basicType("int"), "error"], true), $.methodSignature("WriteHeader", [["code", /* @__PURE__ */ $.basicType("int")]], [], true), $.methodSignature("WriteString", [["str", /* @__PURE__ */ $.basicType("string")]], [/* @__PURE__ */ $.basicType("int"), "error"], true)]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

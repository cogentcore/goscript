// Generated file based on net_http_servemux_handlefunc.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as http from "@goscript/net/http/index.js"
import * as httptest from "@goscript/net/http/httptest/index.js"
import * as bytes from "@goscript/bytes/index.js"
import type * as io from "@goscript/io/index.js"
import * as url from "@goscript/net/url/index.js"
import "@goscript/bytes/index.js"
import "@goscript/net/url/index.js"

export async function serve(handler: http.Handler | null, target: string): globalThis.Promise<void> {
	let rec = httptest.NewRecorder()
	let rec$: httptest.ResponseRecorder = rec == null ? $.pointerTarget<httptest.ResponseRecorder>(rec) : (rec as any).__isVarRef === true ? (rec as any).value : (rec as any).__goValue === undefined ? (rec as any) : $.pointerTarget<httptest.ResponseRecorder>(rec)
	await (handler !== null && (handler as any).__isVarRef !== true && ((handler as any).__goValue === undefined || (handler as any).__goType?.charCodeAt(0) !== 42) ? (handler as Exclude<http.Handler, null>) : $.pointerValue<Exclude<http.Handler, null>>(handler)).ServeHTTP($.pointerValueOrNil($.interfaceValue<http.ResponseWriter | null>(rec, "*httptest.ResponseRecorder", /* @__PURE__ */ $.pointerType("httptest.ResponseRecorder")))!, httptest.NewRequest(http.MethodGet, target, null!))
	await $.println(target, "->", (rec$ as httptest.ResponseRecorder).Code, await http.Header_Get(httptest.ResponseRecorder.prototype.Header.call($.pointerValue<httptest.ResponseRecorder>(rec)), "X-Route"), $.pointerValue<bytes.Buffer>((rec$ as httptest.ResponseRecorder).Body).String())
}

export async function main(): globalThis.Promise<void> {
	let mux = http.NewServeMux()
	http.ServeMux.prototype.HandleFunc.call($.pointerValue<http.ServeMux>(mux), "/mux", $.functionValue(async (w: http.ResponseWriter | null, r: http.Request | $.VarRef<http.Request> | null) => {
		http.Header_Set(((__goscriptAwait = (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Header(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as http.Header), "X-Route", "mux")
		void (__goscriptAwait = (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).WriteHeader(202), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		{
			let [, err] = await (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Write($.stringToBytes("hello " + $.pointerValue<url.URL>($.pointerValue<http.Request>(r).URL).Path))
			if (err != null) {
				await $.println("write error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			}
		}
	}, ({ kind: $.TypeKind.Function, params: ["http.ResponseWriter", /* @__PURE__ */ $.pointerType("http.Request")], results: [] } as $.FunctionTypeInfo)))
	http.HandleFunc("/default", $.functionValue(async (w: http.ResponseWriter | null, r: http.Request | $.VarRef<http.Request> | null) => {
		http.Header_Set(((__goscriptAwait = (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Header(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as http.Header), "X-Route", "default")
		{
			let [, err] = await (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Write($.stringToBytes("hello " + $.pointerValue<url.URL>($.pointerValue<http.Request>(r).URL).Path))
			if (err != null) {
				await $.println("write error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			}
		}
	}, ({ kind: $.TypeKind.Function, params: ["http.ResponseWriter", /* @__PURE__ */ $.pointerType("http.Request")], results: [] } as $.FunctionTypeInfo)))

	await serve($.interfaceValue<http.Handler | null>(mux, "*http.ServeMux", /* @__PURE__ */ $.pointerType("http.ServeMux")), "/mux")
	await serve($.interfaceValue<http.Handler | null>(mux, "*http.ServeMux", /* @__PURE__ */ $.pointerType("http.ServeMux")), "/missing")
	await serve($.interfaceValue<http.Handler | null>(http.DefaultServeMux, "*http.ServeMux", /* @__PURE__ */ $.pointerType("http.ServeMux")), "/default")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

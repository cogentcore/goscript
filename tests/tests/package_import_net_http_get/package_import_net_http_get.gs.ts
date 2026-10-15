// Generated file based on package_import_net_http_get.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as io from "@goscript/io/index.js"
import * as http from "@goscript/net/http/index.js"
import * as httptest from "@goscript/net/http/httptest/index.js"
import * as strings from "@goscript/strings/index.js"

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let server = httptest.NewServer($.pointerValueOrNil($.namedValueInterfaceValue<http.Handler | null>($.namedFunction($.functionValue(async (w: http.ResponseWriter | null, r: http.Request | $.VarRef<http.Request> | null) => {
		let data: $.Slice<number> = null! as $.Slice<number>
		if ($.pointerValue<http.Request>(r).Body != null) {
			let readErr: $.GoError = null! as $.GoError
			let __goscriptTuple0: any = await io.ReadAll($.pointerValueOrNil(($.pointerValue<http.Request>(r).Body as io.Reader | null))!)
			data = __goscriptTuple0[0]
			readErr = __goscriptTuple0[1]
			if (readErr != null) {
				void (__goscriptAwait = (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).WriteHeader(500), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
				{
					let [, writeErr] = await (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Write($.stringToBytes("read error: " + (__goscriptAwait = (readErr !== null && (readErr as any).__isVarRef !== true && ((readErr as any).__goValue === undefined || (readErr as any).__goType?.charCodeAt(0) !== 42) ? (readErr as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(readErr)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
					if (writeErr != null) {
						return
					}
				}
				return
			}
		}
		if ($.sliceLen(data) != 0) {
			{
				let [, writeErr] = await (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Write($.stringToBytes($.pointerValue<http.Request>(r).Method + ":" + $.bytesToString(data)))
				if (writeErr != null) {
					return
				}
			}
			return
		}
		{
			let [, writeErr] = await (w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<http.ResponseWriter, null>) : $.pointerValue<Exclude<http.ResponseWriter, null>>(w)).Write($.stringToBytes($.pointerValue<http.Request>(r).Method))
			if (writeErr != null) {
				return
			}
		}
	}, ({ kind: $.TypeKind.Function, params: ["http.ResponseWriter", /* @__PURE__ */ $.pointerType("http.Request")], results: [] } as $.FunctionTypeInfo)), "http.HandlerFunc", ({ kind: $.TypeKind.Function, name: "http.HandlerFunc", params: ["http.ResponseWriter", /* @__PURE__ */ $.pointerType("http.Request")], results: [] } as $.FunctionTypeInfo)), "http.HandlerFunc", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))!)
	let server$: httptest.Server = server == null ? $.pointerTarget<httptest.Server>(server) : (server as any).__isVarRef === true ? (server as any).value : (server as any).__goValue === undefined ? (server as any) : $.pointerTarget<httptest.Server>(server)
	__defer.defer(() => { httptest.Server.prototype.Close.call($.pointerValue<httptest.Server>(server)) })

	let __goscriptTuple1: any = await http.Get((server$ as httptest.Server).URL)
	let resp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple1[0]
	let err = __goscriptTuple1[1]
	let resp$: http.Response = resp == null ? $.pointerTarget<http.Response>(resp) : (resp as any).__isVarRef === true ? (resp as any).value : (resp as any).__goValue === undefined ? (resp as any) : $.pointerTarget<http.Response>(resp)
	if (err != null) {
		await $.println("get error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	const __goscriptDeferCallee0 = $.functionValue(((__receiver) => () => __receiver.Close())($.pointerValue<Exclude<io.ReadCloser, null>>((resp$ as http.Response).Body)), ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo), "io.Closer.Close-fm")
	__defer.defer(async () => { await __goscriptDeferCallee0() })

	let __goscriptTuple2: any = await io.ReadAll($.pointerValueOrNil(((resp$ as http.Response).Body as io.Reader | null))!)
	let data: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	if (err != null) {
		await $.println("read error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}

	await $.println("get status:", (resp$ as http.Response).StatusCode)
	await $.println("get body:", $.bytesToString(data))

	let __goscriptTuple3: any = await http.Client.prototype.Get.call($.pointerValue<http.Client>(httptest.Server.prototype.Client.call($.pointerValue<httptest.Server>(server))), (server$ as httptest.Server).URL)
	let clientResp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	let clientResp$: http.Response = clientResp == null ? $.pointerTarget<http.Response>(clientResp) : (clientResp as any).__isVarRef === true ? (clientResp as any).value : (clientResp as any).__goValue === undefined ? (clientResp as any) : $.pointerTarget<http.Response>(clientResp)
	if (err != null) {
		await $.println("client get error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	const __goscriptDeferCallee1 = $.functionValue(((__receiver) => () => __receiver.Close())($.pointerValue<Exclude<io.ReadCloser, null>>((clientResp$ as http.Response).Body)), ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo), "io.Closer.Close-fm")
	__defer.defer(async () => { await __goscriptDeferCallee1() })

	let __goscriptTuple4: any = await io.ReadAll($.pointerValueOrNil(((clientResp$ as http.Response).Body as io.Reader | null))!)
	data = __goscriptTuple4[0]
	err = __goscriptTuple4[1]
	if (err != null) {
		await $.println("client get read error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("client get status:", (clientResp$ as http.Response).StatusCode)
	await $.println("client get body:", $.bytesToString(data))

	let __goscriptTuple5: any = await http.Client.prototype.Head.call($.pointerValue<http.Client>(httptest.Server.prototype.Client.call($.pointerValue<httptest.Server>(server))), (server$ as httptest.Server).URL)
	let headResp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple5[0]
	err = __goscriptTuple5[1]
	let headResp$: http.Response = headResp == null ? $.pointerTarget<http.Response>(headResp) : (headResp as any).__isVarRef === true ? (headResp as any).value : (headResp as any).__goValue === undefined ? (headResp as any) : $.pointerTarget<http.Response>(headResp)
	if (err != null) {
		await $.println("head error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	const __goscriptDeferCallee2 = $.functionValue(((__receiver) => () => __receiver.Close())($.pointerValue<Exclude<io.ReadCloser, null>>((headResp$ as http.Response).Body)), ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo), "io.Closer.Close-fm")
	__defer.defer(async () => { await __goscriptDeferCallee2() })
	await $.println("head status:", (headResp$ as http.Response).StatusCode)

	let __goscriptTuple6: any = await http.Client.prototype.Post.call($.pointerValue<http.Client>(httptest.Server.prototype.Client.call($.pointerValue<httptest.Server>(server))), (server$ as httptest.Server).URL, "text/plain", $.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("payload"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")))!)
	let postResp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple6[0]
	err = __goscriptTuple6[1]
	let postResp$: http.Response = postResp == null ? $.pointerTarget<http.Response>(postResp) : (postResp as any).__isVarRef === true ? (postResp as any).value : (postResp as any).__goValue === undefined ? (postResp as any) : $.pointerTarget<http.Response>(postResp)
	if (err != null) {
		await $.println("post error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	const __goscriptDeferCallee3 = $.functionValue(((__receiver) => () => __receiver.Close())($.pointerValue<Exclude<io.ReadCloser, null>>((postResp$ as http.Response).Body)), ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo), "io.Closer.Close-fm")
	__defer.defer(async () => { await __goscriptDeferCallee3() })

	let __goscriptTuple7: any = await io.ReadAll($.pointerValueOrNil(((postResp$ as http.Response).Body as io.Reader | null))!)
	data = __goscriptTuple7[0]
	err = __goscriptTuple7[1]
	if (err != null) {
		await $.println("post read error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("post status:", (postResp$ as http.Response).StatusCode)
	await $.println("post body:", $.bytesToString(data))

	let __goscriptTuple8: any = http.NewRequest(http.MethodGet, (server$ as httptest.Server).URL, null!)
	let transportReq: http.Request | $.VarRef<http.Request> | null = __goscriptTuple8[0]
	err = __goscriptTuple8[1]
	if (err != null) {
		await $.println("transport request error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	let __goscriptTuple9: any = await http.Transport.prototype.RoundTrip.call($.pointerValue<http.Transport>((new http.Transport())), transportReq)
	let transportResp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple9[0]
	err = __goscriptTuple9[1]
	let transportResp$: http.Response = transportResp == null ? $.pointerTarget<http.Response>(transportResp) : (transportResp as any).__isVarRef === true ? (transportResp as any).value : (transportResp as any).__goValue === undefined ? (transportResp as any) : $.pointerTarget<http.Response>(transportResp)
	if (err != null) {
		await $.println("transport error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	const __goscriptDeferCallee4 = $.functionValue(((__receiver) => () => __receiver.Close())($.pointerValue<Exclude<io.ReadCloser, null>>((transportResp$ as http.Response).Body)), ({ kind: $.TypeKind.Function, params: [], results: ["error"] } as $.FunctionTypeInfo), "io.Closer.Close-fm")
	__defer.defer(async () => { await __goscriptDeferCallee4() })
	let __goscriptTuple10: any = await io.ReadAll($.pointerValueOrNil(((transportResp$ as http.Response).Body as io.Reader | null))!)
	data = __goscriptTuple10[0]
	err = __goscriptTuple10[1]
	if (err != null) {
		await $.println("transport read error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("transport status:", (transportResp$ as http.Response).StatusCode)
	await $.println("transport body:", $.bytesToString(data))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({ServeHTTP: (receiver: any, ...args: any[]) => (http.HandlerFunc_ServeHTTP as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (({ kind: $.TypeKind.Function, name: "http.HandlerFunc", params: ["http.ResponseWriter", /* @__PURE__ */ $.pointerType("http.Request")], results: [] } as $.FunctionTypeInfo))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("ServeHTTP", [["w", "http.ResponseWriter"], ["r", /* @__PURE__ */ $.pointerType("http.Request")]])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

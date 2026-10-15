// Generated file based on package_import_net_http_parser.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bufio from "@goscript/bufio/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as io from "@goscript/io/index.js"

import * as http from "@goscript/net/http/index.js"

import * as strings from "@goscript/strings/index.js"

import * as url from "@goscript/net/url/index.js"
import "@goscript/bufio/index.js"
import "@goscript/fmt/index.js"
import "@goscript/io/index.js"
import "@goscript/net/http/index.js"
import "@goscript/strings/index.js"
import "@goscript/net/url/index.js"

export async function main(): globalThis.Promise<void> {
	let requestWire = "POST /chunk HTTP/1.1\r\n" + "Host: example.com\r\n" + "Transfer-Encoding: chunked\r\n" + "X-Test: one\r\n" + "X-Test: two\r\n" + "\r\n" + "5\r\nhello\r\n0\r\n\r\n"
	let __goscriptTuple0: any = await http.ReadRequest(bufio.NewReader($.interfaceValue<io.Reader | null>(strings.NewReader(requestWire), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader"))))
	let req: http.Request | $.VarRef<http.Request> | null = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	let req$: http.Request = req == null ? $.pointerTarget<http.Request>(req) : (req as any).__isVarRef === true ? (req as any).value : (req as any).__goValue === undefined ? (req as any) : $.pointerTarget<http.Request>(req)
	if (err != null) {
		await fmt.Println("request error:", (err as any))
		return
	}
	let __goscriptTuple1: any = await io.ReadAll($.pointerValueOrNil(((req$ as http.Request).Body as io.Reader | null))!)
	let reqBody: $.Slice<number> = __goscriptTuple1[0]
	let reqBodyErr = __goscriptTuple1[1]
	await fmt.Printf("request %s %s %s %s %d %d %s %d %d %t %d %q %v\n", (req$ as http.Request).Method, (req$ as http.Request).Host, $.pointerValue<url.URL>((req$ as http.Request).URL).Path, $.pointerValue<url.URL>((req$ as http.Request).URL).RawQuery, $.basicInterfaceValue((req$ as http.Request).ProtoMajor, "int"), $.basicInterfaceValue((req$ as http.Request).ProtoMinor, "int"), http.Request.prototype.UserAgent.call($.pointerValue<http.Request>(req)), $.basicInterfaceValue($.sliceLen(http.Header_Values((req$ as http.Request).Header, "X-Test")), "int"), $.basicInterfaceValue((req$ as http.Request).ContentLength, "int64"), (req$ as http.Request).Close, $.basicInterfaceValue($.sliceLen((req$ as http.Request).TransferEncoding), "int"), $.bytesToString(reqBody), (reqBodyErr as any))

	let responseWire = "HTTP/1.1 201 Created\r\n" + "Content-Type: text/plain\r\n" + "Content-Length: 5\r\n" + "\r\n" + "hello"
	let __goscriptTuple2: any = await http.ReadResponse(bufio.NewReader($.interfaceValue<io.Reader | null>(strings.NewReader(responseWire), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader"))), req)
	let resp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	let resp$: http.Response = resp == null ? $.pointerTarget<http.Response>(resp) : (resp as any).__isVarRef === true ? (resp as any).value : (resp as any).__goValue === undefined ? (resp as any) : $.pointerTarget<http.Response>(resp)
	if (err != null) {
		await fmt.Println("response error:", (err as any))
		return
	}
	let __goscriptTuple3: any = await io.ReadAll($.pointerValueOrNil(((resp$ as http.Response).Body as io.Reader | null))!)
	let respBody: $.Slice<number> = __goscriptTuple3[0]
	let respBodyErr = __goscriptTuple3[1]
	await fmt.Printf("response %s %d %d %d %s %d %t %d %q %v\n", (resp$ as http.Response).Status, $.basicInterfaceValue((resp$ as http.Response).StatusCode, "int"), $.basicInterfaceValue((resp$ as http.Response).ProtoMajor, "int"), $.basicInterfaceValue((resp$ as http.Response).ProtoMinor, "int"), await http.Header_Get((resp$ as http.Response).Header, "Content-Type"), $.basicInterfaceValue((resp$ as http.Response).ContentLength, "int64"), (resp$ as http.Response).Close, $.basicInterfaceValue($.sliceLen((resp$ as http.Response).TransferEncoding), "int"), $.bytesToString(respBody), (respBodyErr as any))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_net_http_parser.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as bufio from "@goscript/bufio/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as io from "@goscript/io/index.js"
import * as http from "@goscript/net/http/index.js"
import * as strings from "@goscript/strings/index.js"
import * as url from "@goscript/net/url/index.js"
import "@goscript/net/url/index.js"

export async function main(): globalThis.Promise<void> {
	let requestWire = "POST /chunk HTTP/1.1\r\n" + "Host: example.com\r\n" + "Transfer-Encoding: chunked\r\n" + "X-Test: one\r\n" + "X-Test: two\r\n" + "\r\n" + "5\r\nhello\r\n0\r\n\r\n"
	let __goscriptTuple0: any = await http.ReadRequest(bufio.NewReader($.interfaceValue<io.Reader | null>(strings.NewReader(requestWire), "*strings.Reader", __goscriptStatic0())))
	let req: http.Request | $.VarRef<http.Request> | null = __goscriptTuple0[0]
	let err: $.GoError = __goscriptTuple0[1]
	let req$: http.Request = req == null ? $.pointerTarget<http.Request>(req) : (req as any).__isVarRef === true ? (req as any).value : (req as any).__goValue === undefined ? (req as any) : $.pointerTarget<http.Request>(req)
	if (err != null) {
		fmt.Println("request error:", (err as any))
		return
	}
	let __goscriptTuple1: any = await io.ReadAll($.pointerValueOrNil(((req$ as http.Request).Body as io.Reader | null))!)
	let reqBody: $.Slice<number> = __goscriptTuple1[0]
	let reqBodyErr: $.GoError = __goscriptTuple1[1]
	fmt.Printf("request %s %s %s %s %d %d %s %d %d %t %d %q %v\n", (req$ as http.Request).Method, (req$ as http.Request).Host, $.pointerValue<url.URL>((req$ as http.Request).URL).Path, $.pointerValue<url.URL>((req$ as http.Request).URL).RawQuery, $.basicInterfaceValue((req$ as http.Request).ProtoMajor, "int"), $.basicInterfaceValue((req$ as http.Request).ProtoMinor, "int"), (req !== null && (req as any).__isVarRef !== true && (req as any).__goValue === undefined ? ((req as any) as http.Request).UserAgent() : http.Request.prototype.UserAgent.call($.pointerValue<http.Request>(req))), $.basicInterfaceValue($.sliceLen(http.Header_Values((req$ as http.Request).Header, "X-Test")), "int"), $.basicInterfaceValue((req$ as http.Request).ContentLength, "int64"), (req$ as http.Request).Close, $.basicInterfaceValue($.sliceLen((req$ as http.Request).TransferEncoding), "int"), $.bytesToString(reqBody), (reqBodyErr as any))

	let responseWire = "HTTP/1.1 201 Created\r\n" + "Content-Type: text/plain\r\n" + "Content-Length: 5\r\n" + "\r\n" + "hello"
	let __goscriptTuple2: any = await http.ReadResponse(bufio.NewReader($.interfaceValue<io.Reader | null>(strings.NewReader(responseWire), "*strings.Reader", __goscriptStatic0())), req)
	let resp: http.Response | $.VarRef<http.Response> | null = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	let resp$: http.Response = resp == null ? $.pointerTarget<http.Response>(resp) : (resp as any).__isVarRef === true ? (resp as any).value : (resp as any).__goValue === undefined ? (resp as any) : $.pointerTarget<http.Response>(resp)
	if (err != null) {
		fmt.Println("response error:", (err as any))
		return
	}
	let __goscriptTuple3: any = await io.ReadAll($.pointerValueOrNil(((resp$ as http.Response).Body as io.Reader | null))!)
	let respBody: $.Slice<number> = __goscriptTuple3[0]
	let respBodyErr: $.GoError = __goscriptTuple3[1]
	fmt.Printf("response %s %d %d %d %s %d %t %d %q %v\n", (resp$ as http.Response).Status, $.basicInterfaceValue((resp$ as http.Response).StatusCode, "int"), $.basicInterfaceValue((resp$ as http.Response).ProtoMajor, "int"), $.basicInterfaceValue((resp$ as http.Response).ProtoMinor, "int"), await http.Header_Get((resp$ as http.Response).Header, "Content-Type"), $.basicInterfaceValue((resp$ as http.Response).ContentLength, "int64"), (resp$ as http.Response).Close, $.basicInterfaceValue($.sliceLen((resp$ as http.Response).TransferEncoding), "int"), $.bytesToString(respBody), (respBodyErr as any))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods(/* @__PURE__ */ $.pointerType("strings.Reader"), "strings.Reader", () => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("Read", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadAt", [["b", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], ["off", /* @__PURE__ */ $.basicType("int64")]], [["n", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("ReadByte", [], [/* @__PURE__ */ $.basicType("uint8"), "error"], true), $.methodSignature("ReadRune", [], [["ch", /* @__PURE__ */ $.basicType("int32")], ["size", /* @__PURE__ */ $.basicType("int")], ["err", "error"]], true), $.methodSignature("Reset", [["s", /* @__PURE__ */ $.basicType("string")]], [], true), $.methodSignature("Seek", [["offset", /* @__PURE__ */ $.basicType("int64")], ["whence", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int64"), "error"], true), $.methodSignature("Size", [], [/* @__PURE__ */ $.basicType("int64")], true), $.methodSignature("UnreadByte", [], ["error"], true), $.methodSignature("UnreadRune", [], ["error"], true), $.methodSignature("WriteTo", [["w", "io.Writer"]], [["n", /* @__PURE__ */ $.basicType("int64")], ["err", "error"]], true)]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

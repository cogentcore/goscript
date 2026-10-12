// Generated file based on json_decoder_async_reader.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bufio from "@goscript/bufio/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as io from "@goscript/io/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/bufio/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/io/index.js"
import "@goscript/strings/index.js"

export class chanReader {
	public declare ch: $.Channel<string> | null

	public declare cur: string

	public _fields: {
		ch: $.Channel<string> | null
		cur: string
	}

	constructor(init?: Partial<{ch?: $.Channel<string> | null, cur?: string}>) {
		this._fields = {
			ch: init?.ch ?? (null! as $.Channel<string> | null),
			cur: init?.cur ?? ("" as string)
		}
	}

	public clone(): chanReader {
		return $.markAsStructValue(new chanReader(this))
	}

	public async Read(p: $.Slice<number>): globalThis.Promise<[number, $.GoError]> {
		let r: chanReader | $.VarRef<chanReader> | null = this;
		if ($.stringEqual($.pointerValue<chanReader>(r).cur, "")) {
			let __goscriptRecv0 = await $.chanRecvWithOk($.pointerValue<chanReader>(r).ch)
			let s = __goscriptRecv0.value
			let ok = __goscriptRecv0.ok
			if (!ok) {
				return [0, io.EOF]
			}
			$.pointerValue<chanReader>(r).cur = s
		}
		let n = $.copy(p, $.pointerValue<chanReader>(r).cur)
		$.pointerValue<chanReader>(r).cur = $.sliceStringOrBytes($.pointerValue<chanReader>(r).cur, n, undefined)
		return [n, null]
	}

	static {
		$.bindStructFields(this.prototype, ["ch", "cur"])
	}

	static __typeInfo = $.registerStructType(
		"main.chanReader",
		() => new chanReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }] }],
		chanReader,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("string"), "both") }, { name: "cur", key: "cur", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class item {
	public declare A: string

	public declare B: number

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	static {
		$.bindStructFields(this.prototype, ["A", "B"])
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("string") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("float64") }]
	)
}

export async function newChanReader(chunks: $.Slice<string>): globalThis.Promise<chanReader | $.VarRef<chanReader> | null> {
	let r: chanReader | $.VarRef<chanReader> | null = new chanReader({ch: $.makeChannel<string>(0, "", "both")})
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		for (let __goscriptRangeTarget0 = chunks, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
			let c = __goscriptRangeTarget0![__rangeIndex]
			await $.chanSend($.pointerValue<chanReader>(r).ch, c)
		}
		$.pointerValue<chanReader>(r).ch!.close()
	})() })
	return r
}

export async function main(): globalThis.Promise<void> {
	// values, a number and a multibyte character are split across chunks
	let r: chanReader | $.VarRef<chanReader> | null = await newChanReader($.arrayToSlice<string>(["{\"A\": \"h", $.bytesToString(new Uint8Array([195])), $.bytesToString(new Uint8Array([169, 108, 108, 111, 34, 44, 32, 34, 66, 34, 58, 32, 49])), "2.5}", "\n{\"A\": \"x\", \"B\": 3}"]))
	let dec: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bufio.NewReader($.interfaceValue<io.Reader | null>(r, "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader"))), "*bufio.Reader", /* @__PURE__ */ $.pointerType("bufio.Reader")))!)
	while (true) {
		let it: $.VarRef<item> = $.varRef($.markAsStructValue(new item()))
		let err = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(dec), $.interfaceValue(it, "*main.item", /* @__PURE__ */ $.pointerType("main.item")))
		if ($.comparableEqual(err, io.EOF)) {
			await $.println("eof")
			break
		}
		if (err != null) {
			await $.println("error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
			break
		}
		await $.println(it.value.A, it.value.B)
	}

	// tokens and More from a blocking reader
	dec = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["[1, \"two\", ", "{\"k\": true}]"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader")))!)
	while (true) {
		let [tok, err] = await json.Decoder.prototype.Token.call($.pointerValue<json.Decoder>(dec))
		if (err != null) {
			await $.println("token end:", $.comparableEqual(err, io.EOF))
			break
		}
		{
			const __goscriptTypeSwitchValue = tok
			switch (true) {
				case $.typeAssert<json.Delim>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "json.Delim")).ok:
					{
						let t: json.Delim = $.typeAssert<json.Delim>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "json.Delim")).value
						await $.println("delim", String.fromCodePoint(t), await json.Decoder.prototype.More.call($.pointerValue<json.Decoder>(dec)))
					}
					break
				case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
					{
						let t: string = $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).value
						await $.println("string", t)
					}
					break
				case $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("float64")).ok:
					{
						let t: number = $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("float64")).value
						await $.println("number", t)
					}
					break
				case $.typeAssert<boolean>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("bool")).ok:
					{
						let t: boolean = $.typeAssert<boolean>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("bool")).value
						await $.println("bool", t)
					}
					break
			}
		}
	}

	// UseNumber tokens are json.Number values, and Delim has a String method
	dec = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["[1.5, \"s\"]"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader")))!)
	json.Decoder.prototype.UseNumber.call($.pointerValue<json.Decoder>(dec))
	while (true) {
		let [tok, err] = await json.Decoder.prototype.Token.call($.pointerValue<json.Decoder>(dec))
		if (err != null) {
			break
		}
		{
			const __goscriptTypeSwitchValue = tok
			switch (true) {
				case $.typeAssert<json.Delim>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "json.Delim")).ok:
					{
						let t: json.Delim = $.typeAssert<json.Delim>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "json.Delim")).value
						await $.println("delim", json.Delim_String(t))
					}
					break
				case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
					{
						let t: string = $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).value
						await $.println("string", t)
					}
					break
				case $.typeAssert<json.Number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string", "json.Number")).ok:
					{
						let t: json.Number = $.typeAssert<json.Number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string", "json.Number")).value
						let [f, ] = json.Number_Float64(t)
						await $.println("number", json.Number_String(t), f)
					}
					break
			}
		}
	}

	// a syntax error is reported without waiting for the rest of the input
	dec = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["{\"A\": ]", " more"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader")))!)
	let it: $.VarRef<item> = $.varRef($.markAsStructValue(new item()))
	let err = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(dec), $.interfaceValue(it, "*main.item", /* @__PURE__ */ $.pointerType("main.item")))
	await $.println("syntax error:", err != null)

	// a synchronous reader still works
	dec = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("{\"A\": \"s\", \"B\": 7} {\"A\": \"t\"}"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")))!)
	while (await json.Decoder.prototype.More.call($.pointerValue<json.Decoder>(dec))) {
		let __goscriptShadow0: $.VarRef<item> = $.varRef($.markAsStructValue(new item()))
		{
			let __goscriptShadow1 = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(dec), $.interfaceValue(__goscriptShadow0, "*main.item", /* @__PURE__ */ $.pointerType("main.item")))
			if (__goscriptShadow1 != null) {
				await $.println("error:", await $.pointerValue<Exclude<$.GoError, null>>(__goscriptShadow1).Error())
				break
			}
		}
		await $.println(__goscriptShadow0.value.A, __goscriptShadow0.value.B)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

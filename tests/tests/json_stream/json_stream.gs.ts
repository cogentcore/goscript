// Generated file based on json_stream.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as bufio from "@goscript/bufio/index.js"

import * as bytes from "@goscript/bytes/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as io from "@goscript/io/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/bufio/index.js"
import "@goscript/bytes/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/fmt/index.js"
import "@goscript/io/index.js"
import "@goscript/strings/index.js"

export class chanReader {
	public get ch(): $.Channel<string> | null {
		return this._fields.ch
	}

	public set ch(value: $.Channel<string> | null) {
		this._fields.ch = value
	}

	public get cur(): string {
		return this._fields.cur
	}

	public set cur(value: string) {
		this._fields.cur = value
	}

	public _fields: {
		ch: $.Channel<string> | null
		cur: string
	}

	constructor(init?: Partial<{ch?: $.Channel<string> | null, cur?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			ch: init?.ch ?? (null! as $.Channel<string> | null),
			cur: init?.cur ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): chanReader {
		return new chanReader(this, true)
	}

	public __goscriptAssign(source: chanReader): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
		target.cur = values.cur
	}

	public async Read(p: $.Slice<number>): globalThis.Promise<[number, $.GoError]> {
		let r: chanReader | $.VarRef<chanReader> | null = this;
		const r$ = $.pointerTarget<chanReader>(r)
		if ($.stringEqual((r$ as chanReader).cur, "")) {
			let __goscriptRecv0 = await $.chanRecvWithOk((r$ as chanReader).ch)
			let s = __goscriptRecv0.value
			let ok = __goscriptRecv0.ok
			if (!ok) {
				return [0, io.EOF]
			}
			;(r$ as chanReader).cur = s
		}
		let n = $.copy(p, (r$ as chanReader).cur);
		;(r$ as chanReader).cur = $.sliceStringOrBytes((r$ as chanReader).cur, n, undefined)
		return [n, null]
	}

	static __typeInfo = $.registerStructType(
		"main.chanReader",
		() => new chanReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		chanReader,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("string"), "both") }, { name: "cur", key: "cur", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class item {
	public get A(): string {
		return this._fields.A
	}

	public set A(value: string) {
		this._fields.A = value
	}

	public get B(): number {
		return this._fields.B
	}

	public set B(value: number) {
		this._fields.B = value
	}

	public _fields: {
		A: string
		B: number
	}

	constructor(init?: Partial<{A?: string, B?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			A: init?.A ?? ("" as string),
			B: init?.B ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): item {
		return new item(this, true)
	}

	public __goscriptAssign(source: item): void {
		const target = this._fields
		const values = source._fields
		target.A = values.A
		target.B = values.B
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
		for (let __goscriptRangeTarget0 = chunks, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
			let c = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
			await $.chanSend($.pointerValue<chanReader>(r).ch, c)
		}
		$.pointerValue<chanReader>(r).ch!.close()
	})() })
	return r
}

export async function printTokens(dec: json.Decoder | $.VarRef<json.Decoder> | null): globalThis.Promise<void> {
	while (true) {
		let [tok, err] = await json.Decoder.prototype.Token.call($.pointerValue<json.Decoder>(dec))
		if (err != null) {
			await fmt.Println("token end:", $.comparableEqual(err, io.EOF))
			return
		}
		{
			const __goscriptTypeSwitchValue = tok
			switch (true) {
				case $.typeAssert<json.Delim>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "json.Delim")).ok:
					{
						let t: json.Delim = $.typeAssert<json.Delim>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("int32", "json.Delim")).value
						await fmt.Println("delim", json.Delim_String(t), await json.Decoder.prototype.More.call($.pointerValue<json.Decoder>(dec)))
					}
					break
				case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
					{
						let t: string = $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).value
						await fmt.Println("string", t)
					}
					break
				case $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("float64")).ok:
					{
						let t: number = $.typeAssert<number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("float64")).value
						await fmt.Println("number", $.basicInterfaceValue(t, "float64"))
					}
					break
				case $.typeAssert<json.Number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string", "json.Number")).ok:
					{
						let t: json.Number = $.typeAssert<json.Number>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string", "json.Number")).value
						let [f, ] = json.Number_Float64(t)
						await fmt.Println("json.Number", json.Number_String(t), $.basicInterfaceValue(f, "float64"))
					}
					break
				case $.typeAssert<boolean>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("bool")).ok:
					{
						let t: boolean = $.typeAssert<boolean>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("bool")).value
						await fmt.Println("bool", t)
					}
					break
			}
		}
	}
}

export async function main(): globalThis.Promise<void> {
	// Compact preserves number literal spelling.
	let c: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	json.Compact(c, new Uint8Array([123, 34, 110, 34, 58, 32, 49, 101, 43, 48, 48, 44, 32, 34, 98, 105, 103, 34, 58, 32, 57, 48, 48, 55, 49, 57, 57, 50, 53, 52, 55, 52, 48, 57, 57, 51, 125]))
	await fmt.Println(c.value.String())

	// Indent lays out the compact form with Go spacing.
	let ind: $.VarRef<bytes.Buffer> = $.varRef($.markAsStructValue(new bytes.Buffer()))
	json.Indent(ind, new Uint8Array([123, 34, 97, 34, 58, 49, 44, 34, 98, 34, 58, 91, 50, 44, 51, 93, 125]), "", "  ")
	await fmt.Println(ind.value.String())

	// Decoder reads one value per call and buffers the rest of the stream.
	let dec: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("1 2 3"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")))!)
	let n: $.VarRef<number> = $.varRef(0)
	while (await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(dec), $.interfaceValue(n, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))) == null) {
		await fmt.Println("decoded", $.basicInterfaceValue(n.value, "int"))
	}

	// UseNumber keeps the exact source literal beyond float64 precision.
	let und: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("{\"big\":9007199254740993}"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")))!)
	json.Decoder.prototype.UseNumber.call($.pointerValue<json.Decoder>(und))
	let m: $.VarRef<globalThis.Map<string, any> | null> = $.varRef(null! as globalThis.Map<string, any> | null)
	await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(und), $.interfaceValue(m, "*map[string]interface{}", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))))
	await fmt.Println("big", $.mapGet<string, any, any>(m.value, "big", null)[0])

	// A malformed document yields a *json.SyntaxError with the Go byte offset.
	let v: $.VarRef<any> = $.varRef(null! as any)
	let err: $.GoError = json.Unmarshal(new Uint8Array([91, 49, 44, 93]), $.interfaceValue(v, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] })))
	{
		let __goscriptTuple0: any = $.typeAssertTuple<json.SyntaxError | $.VarRef<json.SyntaxError> | null>(err, /* @__PURE__ */ $.pointerType("json.SyntaxError"))
		let se: json.SyntaxError | $.VarRef<json.SyntaxError> | null = __goscriptTuple0[0]
		let ok = __goscriptTuple0[1]
		if (ok) {
			await fmt.Println("offset", $.basicInterfaceValue($.pointerValue<json.SyntaxError>(se).Offset, "int64"))
		}
	}

	// Token advances the stream; More reports remaining container elements.
	let mdec: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(strings.NewReader("[10,20]"), "*strings.Reader", /* @__PURE__ */ $.pointerType("strings.Reader")))!)
	await json.Decoder.prototype.Token.call($.pointerValue<json.Decoder>(mdec))
	await fmt.Println("more", await json.Decoder.prototype.More.call($.pointerValue<json.Decoder>(mdec)))
	await json.Decoder.prototype.Token.call($.pointerValue<json.Decoder>(mdec))
	await json.Decoder.prototype.Token.call($.pointerValue<json.Decoder>(mdec))
	await fmt.Println("more", await json.Decoder.prototype.More.call($.pointerValue<json.Decoder>(mdec)))

	// A blocking reader delivers values, a number, and a multibyte character
	// split across its chunks.
	let bdec: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(bufio.NewReader($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["{\"A\": \"h", $.bytesToString(new Uint8Array([195])), $.bytesToString(new Uint8Array([169, 108, 108, 111, 34, 44, 32, 34, 66, 34, 58, 32, 49])), "2.5}", "\n{\"A\": \"x\", \"B\": 3}"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader"))), "*bufio.Reader", /* @__PURE__ */ $.pointerType("bufio.Reader")))!)
	while (true) {
		let it: $.VarRef<item> = $.varRef(new item(undefined, true))
		{
			let __goscriptShadow0 = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(bdec), $.interfaceValue(it, "*main.item", /* @__PURE__ */ $.pointerType("main.item")))
			if (__goscriptShadow0 != null) {
				await fmt.Println("decode end:", $.comparableEqual(__goscriptShadow0, io.EOF))
				break
			}
		}
		await fmt.Println(it.value.A, $.basicInterfaceValue(it.value.B, "float64"))
	}

	// Token and More work on a blocking reader, and UseNumber tokens are
	// json.Number values.
	await printTokens(json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["[1, \"two\", ", "{\"k\": true}]"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader")))!))
	let ndec: json.Decoder | $.VarRef<json.Decoder> | null = json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["[1.5, \"s\"]"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader")))!)
	json.Decoder.prototype.UseNumber.call($.pointerValue<json.Decoder>(ndec))
	await printTokens(ndec)

	// A syntax error is reported without waiting for the rest of the input.
	let it: $.VarRef<item> = $.varRef(new item(undefined, true))
	err = await json.Decoder.prototype.Decode.call($.pointerValue<json.Decoder>(json.NewDecoder($.pointerValueOrNil($.interfaceValue<io.Reader | null>(await newChanReader($.arrayToSlice<string>(["{\"A\": ]", " more"])), "*main.chanReader", /* @__PURE__ */ $.pointerType("main.chanReader")))!)), $.interfaceValue(it, "*main.item", /* @__PURE__ */ $.pointerType("main.item")))
	await fmt.Println("syntax error:", err != null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

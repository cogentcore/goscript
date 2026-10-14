// Generated file based on package_import_encoding_json_text_map_keys.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as errors from "@goscript/errors/index.js"

import * as sort from "@goscript/sort/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/errors/index.js"
import "@goscript/sort/index.js"

export type Tokens = number

$.registerNamedValueType(
	"main.Tokens",
	{MarshalText: (receiver: any, ...args: any[]) => (Tokens_MarshalText as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (Tokens_String as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("MarshalText", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.Tokens",
	{MarshalText: (receiver: any, ...args: any[]) => (Tokens_MarshalText as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), String: (receiver: any, ...args: any[]) => (Tokens_String as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), UnmarshalText: (receiver: any, ...args: any[]) => (Tokens_UnmarshalText as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("MarshalText", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")), "error"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("UnmarshalText", [["text", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], ["error"])]
);

export type Style = globalThis.Map<Tokens, string> | null

$.registerNamedType("main.Style", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int32", "main.Tokens"), /* @__PURE__ */ $.basicType("string")));

export class Doc {
	public get Kind(): Tokens {
		return this._fields.Kind
	}

	public set Kind(value: Tokens) {
		this._fields.Kind = value
	}

	public get Kinds(): $.Slice<Tokens> {
		return this._fields.Kinds
	}

	public set Kinds(value: $.Slice<Tokens>) {
		this._fields.Kinds = value
	}

	public get Styles(): globalThis.Map<string, Style> | null {
		return this._fields.Styles
	}

	public set Styles(value: globalThis.Map<string, Style> | null) {
		this._fields.Styles = value
	}

	public get Counts(): globalThis.Map<number, number> | null {
		return this._fields.Counts
	}

	public set Counts(value: globalThis.Map<number, number> | null) {
		this._fields.Counts = value
	}

	public get Big(): globalThis.Map<bigint, string> | null {
		return this._fields.Big
	}

	public set Big(value: globalThis.Map<bigint, string> | null) {
		this._fields.Big = value
	}

	public _fields: {
		Kind: Tokens
		Kinds: $.Slice<Tokens>
		Styles: globalThis.Map<string, Style> | null
		Counts: globalThis.Map<number, number> | null
		Big: globalThis.Map<bigint, string> | null
	}

	constructor(init?: Partial<{Kind?: Tokens, Kinds?: $.Slice<Tokens>, Styles?: globalThis.Map<string, Style> | null, Counts?: globalThis.Map<number, number> | null, Big?: globalThis.Map<bigint, string> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Kind: init?.Kind ?? (0 as Tokens),
			Kinds: init?.Kinds ?? (null! as $.Slice<Tokens>),
			Styles: init?.Styles ?? (null! as globalThis.Map<string, Style> | null),
			Counts: init?.Counts ?? (null! as globalThis.Map<number, number> | null),
			Big: init?.Big ?? (null! as globalThis.Map<bigint, string> | null)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Doc {
		return new Doc(this, true)
	}

	public __goscriptAssign(source: Doc): void {
		const target = this._fields
		const values = source._fields
		target.Kind = values.Kind
		target.Kinds = values.Kinds
		target.Styles = values.Styles
		target.Counts = values.Counts
		target.Big = values.Big
	}

	static __typeInfo = $.registerStructType(
		"main.Doc",
		() => new Doc(),
		() => [],
		Doc,
		() => [{ name: "Kind", key: "Kind", type: /* @__PURE__ */ $.basicType("int32", "main.Tokens") }, { name: "Kinds", key: "Kinds", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int32", "main.Tokens")) }, { name: "Styles", key: "Styles", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), "main.Style") }, { name: "Counts", key: "Counts", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")) }, { name: "Big", key: "Big", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int64"), /* @__PURE__ */ $.basicType("string")) }]
	)
}

export const Background: Tokens = 0

export const Keyword: Tokens = 1

export const Comment: Tokens = 2

export let tokenNames: $.Slice<string> = $.arrayToSlice<string>(["Background", "Keyword", "Comment"])

export function __goscript_set_tokenNames(__goscriptValue: $.Slice<string>): void {
	tokenNames = __goscriptValue
}

export function Tokens_String(t: Tokens): string {
	return $.arrayIndex(tokenNames!, t)
}

export function Tokens_MarshalText(t: Tokens): [$.Slice<number>, $.GoError] {
	return [$.stringToBytes(Tokens_String(t)), null]
}

export async function Tokens_UnmarshalText(t: $.VarRef<Tokens> | null, text: $.Slice<number>): globalThis.Promise<$.GoError> {
	if ($.sliceLen(text) == 0) {
		await $.println("empty token")
	}
	for (let __goscriptRangeTarget0 = tokenNames, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let n = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as string)
		if ($.stringEqual(n, $.bytesToString(text))) {
			t!.value = $.int($.int(i, 32), 32)
			return null
		}
	}
	return errors.New($.concatString("unknown token ", $.bytesToString(text)))
}

export async function main(): globalThis.Promise<void> {
	let s: $.VarRef<Style> = $.varRef(null! as Style)
	{
		let err = await json.Unmarshal(new Uint8Array([123, 34, 75, 101, 121, 119, 111, 114, 100, 34, 58, 34, 98, 111, 108, 100, 34, 44, 34, 66, 97, 99, 107, 103, 114, 111, 117, 110, 100, 34, 58, 34, 119, 104, 105, 116, 101, 34, 125]), $.interfaceValue(s, "*main.Style", /* @__PURE__ */ $.pointerType("main.Style")))
		if (err != null) {
			await $.println("error:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		}
	}
	await $.println("len:", $.len(s.value))
	await $.println("keyword:", $.mapGet<Tokens, string, string>(s.value, 1, "")[0], "background:", $.mapGet<Tokens, string, string>(s.value, 0, "")[0])
	for (const [k, __rangeValue] of s.value?.entries() ?? []) {
		await $.println("key is token:", ($.int(k, 32) == 1) || ($.int(k, 32) == 0))
	}

	let d: $.VarRef<Doc> = $.varRef(new Doc(undefined, true))
	let err: $.GoError = await json.Unmarshal(new Uint8Array([123, 34, 75, 105, 110, 100, 34, 58, 34, 67, 111, 109, 109, 101, 110, 116, 34, 44, 34, 75, 105, 110, 100, 115, 34, 58, 91, 34, 75, 101, 121, 119, 111, 114, 100, 34, 44, 34, 66, 97, 99, 107, 103, 114, 111, 117, 110, 100, 34, 93, 44, 34, 83, 116, 121, 108, 101, 115, 34, 58, 123, 34, 120, 34, 58, 123, 34, 67, 111, 109, 109, 101, 110, 116, 34, 58, 34, 103, 114, 97, 121, 34, 125, 125, 44, 34, 67, 111, 117, 110, 116, 115, 34, 58, 123, 34, 49, 34, 58, 50, 44, 34, 45, 51, 34, 58, 52, 125, 44, 34, 66, 105, 103, 34, 58, 123, 34, 57, 48, 48, 55, 49, 57, 57, 50, 53, 52, 55, 52, 48, 57, 57, 51, 34, 58, 34, 98, 105, 103, 34, 125, 125]), $.interfaceValue(d, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	if (err != null) {
		await $.println("error:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	await $.println("comment:", $.mapGet<Tokens, string, string>($.mapGet<string, Style, Style>(d.value.Styles, "x", null)[0], 2, "")[0])
	await $.println("kind:", Tokens_String(d.value.Kind), "kinds:", $.sliceLen(d.value.Kinds), Tokens_String($.arrayIndex(d.value.Kinds!, 0)), Tokens_String($.arrayIndex(d.value.Kinds!, 1)))
	let __goscriptTuple0: any = json.Marshal($.interfaceValue(new Doc({Kind: 1, Kinds: $.arrayToSlice<Tokens>([2])}, true), "main.Doc", "main.Doc"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	await $.println("marshal doc:", $.bytesToString(b))
	await $.println("counts:", $.mapGet<number, number, number>(d.value.Counts, 1, 0)[0], $.mapGet<number, number, number>(d.value.Counts, -3, 0)[0])
	await $.println("big:", $.mapGet<bigint, string, string>(d.value.Big, 9007199254740993n, "")[0])

	let __goscriptTuple1: any = json.Marshal($.interfaceValue($.makeMap<Tokens, string>([[2, "gray"], [1, "bold"]]), "main.Style", "main.Style"))
	b = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	if (err != null) {
		await $.println("error:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	await $.println("marshal:", $.bytesToString(b))
	let __goscriptTuple2: any = json.Marshal($.interfaceValue($.makeMap<number, boolean>([[3, true], [1, false]]), "map[int]bool", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("bool"))))
	b = __goscriptTuple2[0]
	await $.println("marshal ints:", $.bytesToString(b))

	let bad: $.VarRef<Style> = $.varRef(null! as Style)
	err = await json.Unmarshal(new Uint8Array([123, 34, 78, 111, 112, 101, 34, 58, 34, 120, 34, 125]), $.interfaceValue(bad, "*main.Style", /* @__PURE__ */ $.pointerType("main.Style")))
	await $.println("bad error:", err != null)

	let keys: $.Slice<string> = $.arrayToSlice<string>([])
	for (const [k, __rangeValue] of d.value.Styles?.entries() ?? []) {
		keys = $.append(keys, k)
	}
	sort.Strings(keys)
	await $.println("styles keys:", $.sliceLen(keys), $.arrayIndex(keys!, 0))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

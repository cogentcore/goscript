// Generated file based on package_import_encoding_json_async_marshaler.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"

import * as errors from "@goscript/errors/index.js"

import * as strings from "@goscript/strings/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/encoding/json/index.js"
import "@goscript/errors/index.js"
import "@goscript/strings/index.js"
import "@goscript/sync/index.js"

export class Image {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Image {
		return new Image(this, true)
	}

	public __goscriptAssign(source: Image): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	public async MarshalJSON(): globalThis.Promise<[$.Slice<number>, $.GoError]> {
		const im: Image | $.VarRef<Image> | null = this;
		using __defer = new $.DisposableStack()
		const im$ = $.pointerTarget<Image>(im)
		await mu.value.Lock()
		const __goscriptDeferCallee0 = $.functionValue(((__receiver) => () => __receiver.Unlock())(mu.value), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
		__defer.defer(() => { __goscriptDeferCallee0() })
		if ($.stringEqual((im$ as Image).Name, "bad")) {
			return [null, errors.New("cannot marshal bad image")]
		}
		return await json.Marshal($.interfaceValue($.makeMap<string, string>([["encoded", strings.ToUpper((im$ as Image).Name)]]), "map[string]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string"))))
	}

	public async UnmarshalJSON(b: $.Slice<number>): globalThis.Promise<$.GoError> {
		let im: Image | $.VarRef<Image> | null = this;
		using __defer = new $.DisposableStack()
		await mu.value.Lock()
		const __goscriptDeferCallee1 = $.functionValue(((__receiver) => () => __receiver.Unlock())(mu.value), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
		__defer.defer(() => { __goscriptDeferCallee1() })
		let m: $.VarRef<globalThis.Map<string, string> | null> = $.varRef(null! as globalThis.Map<string, string> | null)
		{
			let err = await json.Unmarshal(b, $.interfaceValue(m, "*map[string]string", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string")))))
			if (err != null) {
				return err
			}
		}
		if ($.stringEqual($.mapGet<string, string, string>(m.value, "encoded", "")[0], "")) {
			return errors.New("missing encoded image")
		}
		$.pointerValue<Image>(im).Name = strings.ToLower($.mapGet<string, string, string>(m.value, "encoded", "")[0])
		return null
	}

	static __typeInfo = $.registerStructType(
		"main.Image",
		() => new Image(),
		() => [{ name: "MarshalJSON", args: [], returns: [{ type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { type: "error" }], pointerReceiver: true }, { name: "UnmarshalJSON", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "error" }], pointerReceiver: true }],
		Image,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Doc {
	public get Title(): string {
		return this._fields.Title
	}

	public set Title(value: string) {
		this._fields.Title = value
	}

	public get Image(): Image | $.VarRef<Image> | null {
		return this._fields.Image
	}

	public set Image(value: Image | $.VarRef<Image> | null) {
		this._fields.Image = value
	}

	public get Note(): string {
		return this._fields.Note
	}

	public set Note(value: string) {
		this._fields.Note = value
	}

	public _fields: {
		Title: string
		Image: Image | $.VarRef<Image> | null
		Note: string
	}

	constructor(init?: Partial<{Title?: string, Image?: Image | $.VarRef<Image> | null, Note?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Title: init?.Title ?? ("" as string),
			Image: init?.Image ?? (null! as Image | $.VarRef<Image> | null),
			Note: init?.Note ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Doc {
		return new Doc(this, true)
	}

	public __goscriptAssign(source: Doc): void {
		const target = this._fields
		const values = source._fields
		target.Title = values.Title
		target.Image = values.Image
		target.Note = values.Note
	}

	static __typeInfo = $.registerStructType(
		"main.Doc",
		() => new Doc(),
		() => [],
		Doc,
		() => [{ name: "Title", key: "Title", type: /* @__PURE__ */ $.basicType("string") }, { name: "Image", key: "Image", type: /* @__PURE__ */ $.pointerType("main.Image") }, { name: "Note", key: "Note", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export let mu: $.VarRef<sync.Mutex> = $.varRef($.markAsStructValue(new sync.Mutex()))

export function __goscript_set_mu(__goscriptValue: sync.Mutex): void {
	$.assignStruct(mu.value, __goscriptValue)
}

export async function main(): globalThis.Promise<void> {
	let __goscriptTuple0: any = await json.Marshal($.interfaceValue(new Image({Name: "top"}), "*main.Image", /* @__PURE__ */ $.pointerType("main.Image")))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println("top:", $.bytesToString(b), err == null)

	let im: Image | $.VarRef<Image> | null = new Image()
	err = await json.Unmarshal(b, $.interfaceValue(im, "*main.Image", /* @__PURE__ */ $.pointerType("main.Image")))
	await $.println("top back:", $.pointerValue<Image>(im).Name, err == null)

	let doc: Doc | $.VarRef<Doc> | null = new Doc({Title: "t", Image: new Image({Name: "nested"}), Note: "n"})
	let __goscriptTuple1: any = await json.Marshal($.interfaceValue(doc, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	b = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("doc:", $.bytesToString(b), err == null)

	let __goscriptTuple2: any = await json.MarshalIndent($.interfaceValue(doc, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")), "", " ")
	let b2: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("indent:", $.bytesToString(b2), err == null)

	let back: Doc | $.VarRef<Doc> | null = new Doc()
	err = await json.Unmarshal(b, $.interfaceValue(back, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	await $.println("doc back:", $.pointerValue<Doc>(back).Title, $.pointerValue<Image>($.pointerValue<Doc>(back).Image).Name, $.pointerValue<Doc>(back).Note, err == null)

	let __goscriptTuple3: any = await json.Marshal($.interfaceValue(new Doc({Image: new Image({Name: "bad"})}), "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	err = __goscriptTuple3[1]
	await $.println("marshal error:", strings.HasSuffix((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), ": cannot marshal bad image"))

	err = await json.Unmarshal(new Uint8Array([123, 34, 73, 109, 97, 103, 101, 34, 58, 123, 34, 111, 116, 104, 101, 114, 34, 58, 34, 120, 34, 125, 125]), $.interfaceValue(new Doc(), "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")))
	await $.println("unmarshal error:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

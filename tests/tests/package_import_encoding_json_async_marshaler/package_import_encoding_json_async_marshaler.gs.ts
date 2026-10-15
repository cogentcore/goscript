// Generated file based on package_import_encoding_json_async_marshaler.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as errors from "@goscript/errors/index.js"
import * as strings from "@goscript/strings/index.js"
import * as sync from "@goscript/sync/index.js"

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

	public MarshalJSON(): [$.Slice<number>, $.GoError] {
		const im: Image | $.VarRef<Image> | null = this;
		using __defer = new $.DisposableStack()
		const im$: Image = im == null ? $.pointerTarget<Image>(im) : (im as any).__isVarRef === true ? (im as any).value : (im as any).__goValue === undefined ? (im as any) : $.pointerTarget<Image>(im)
		mu.value.Lock()
		const __goscriptDeferCallee0 = $.functionValue(((__receiver) => () => __receiver.Unlock())(mu.value), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
		__defer.defer(() => { __goscriptDeferCallee0() })
		if ($.stringEqual((im$ as Image).Name, "bad")) {
			return [null, errors.New("cannot marshal bad image")]
		}
		return (json.Marshal($.interfaceValue($.makeMap<string, string>([["encoded", strings.ToUpper((im$ as Image).Name)]]), "map[string]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string")))) as [$.Slice<number>, $.GoError])
	}

	public UnmarshalJSON(b: $.Slice<number>): $.GoError {
		let im: Image | $.VarRef<Image> | null = this;
		using __defer = new $.DisposableStack()
		mu.value.Lock()
		const __goscriptDeferCallee1 = $.functionValue(((__receiver) => () => __receiver.Unlock())(mu.value), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
		__defer.defer(() => { __goscriptDeferCallee1() })
		let m: $.VarRef<globalThis.Map<string, string> | null> = $.varRef(null! as globalThis.Map<string, string> | null)
		{
			let err = (json.Unmarshal(b, $.interfaceValue(m, "*map[string]string", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("string"))))) as $.GoError)
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

export let mu = $.varRef($.markAsStructValue(new sync.Mutex()))

export function __goscript_set_mu(__goscriptValue: sync.Mutex): void {
	$.assignStruct(mu.value, __goscriptValue)
}

export async function main(): globalThis.Promise<void> {
	let __goscriptTuple0: any = (json.Marshal($.interfaceValue(new Image({Name: "top"}), "*main.Image", /* @__PURE__ */ $.pointerType("main.Image"))) as [$.Slice<number>, $.GoError])
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println("top:", $.bytesToString(b), err == null)

	let im = new Image()
	err = (json.Unmarshal(b, $.interfaceValue(im, "*main.Image", /* @__PURE__ */ $.pointerType("main.Image"))) as $.GoError)
	await $.println("top back:", $.pointerValue<Image>(im).Name, err == null)

	let doc = new Doc({Title: "t", Image: new Image({Name: "nested"}), Note: "n"})
	let __goscriptTuple1: any = (json.Marshal($.interfaceValue(doc, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc"))) as [$.Slice<number>, $.GoError])
	b = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("doc:", $.bytesToString(b), err == null)

	let __goscriptTuple2: any = (json.MarshalIndent($.interfaceValue(doc, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc")), "", " ") as [$.Slice<number>, $.GoError])
	let b2: $.Slice<number> = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("indent:", $.bytesToString(b2), err == null)

	let back = new Doc()
	let back$: Doc = back == null ? $.pointerTarget<Doc>(back) : (back as any).__isVarRef === true ? (back as any).value : (back as any).__goValue === undefined ? (back as any) : $.pointerTarget<Doc>(back)
	err = (json.Unmarshal(b, $.interfaceValue(back, "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc"))) as $.GoError)
	await $.println("doc back:", (back$ as Doc).Title, $.pointerValue<Image>((back$ as Doc).Image).Name, (back$ as Doc).Note, err == null)

	let __goscriptTuple3: any = (json.Marshal($.interfaceValue(new Doc({Image: new Image({Name: "bad"})}), "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc"))) as [$.Slice<number>, $.GoError])
	err = __goscriptTuple3[1]
	await $.println("marshal error:", strings.HasSuffix((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), ": cannot marshal bad image"))

	err = (json.Unmarshal(new Uint8Array([123, 34, 73, 109, 97, 103, 101, 34, 58, 123, 34, 111, 116, 104, 101, 114, 34, 58, 34, 120, 34, 125, 125]), $.interfaceValue(new Doc(), "*main.Doc", /* @__PURE__ */ $.pointerType("main.Doc"))) as $.GoError)
	await $.println("unmarshal error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

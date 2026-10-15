// Generated file based on embedded_interface_null_assertion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Reader = {
	Read(p: $.Slice<number>): [number, $.GoError]
}

$.registerInterfaceType(
	"main.Reader",
	null,
	[{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }] }]
);

export class MyReader {
	public declare Reader: Reader | null

	public declare name: string

	constructor(init?: Partial<{Reader?: Reader | null, name?: string}>, __goscriptValue?: boolean) {
		this.Reader = init?.Reader ?? (null! as Reader | null)
		this.name = init?.name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyReader {
		return new MyReader(this, true)
	}

	public __goscriptAssign(source: MyReader): this {
		this.Reader = $.assignFieldValue(this.Reader, source.Reader)
		this.name = source.name
		return this
	}

	public Read(p: any): any {
		return $.pointerValue<Exclude<Reader | null, null>>(this.Reader).Read(p)
	}

	static __typeInfo = $.registerStructType(
		"main.MyReader",
		() => new MyReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }] }],
		MyReader,
		() => [{ name: "Reader", key: "Reader", type: "main.Reader", anonymous: true }, { name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class StringReader {
	public declare data: string

	public declare pos: number

	constructor(init?: Partial<{data?: string, pos?: number}>, __goscriptValue?: boolean) {
		this.data = init?.data ?? ("" as string)
		this.pos = init?.pos ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): StringReader {
		return new StringReader(this, true)
	}

	public __goscriptAssign(source: StringReader): this {
		this.data = source.data
		this.pos = source.pos
		return this
	}

	public Read(p: $.Slice<number>): [number, $.GoError] {
		let s: StringReader | $.VarRef<StringReader> | null = this;
		const s$: StringReader = s == null ? $.pointerTarget<StringReader>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<StringReader>(s)
		if ((s$ as StringReader).pos >= $.stringLen((s$ as StringReader).data)) {
			return [0, null]
		}
		let n = $.copy(p, $.stringToBytes($.sliceStringOrBytes((s$ as StringReader).data, (s$ as StringReader).pos, undefined)));
		;(s$ as StringReader).pos += n
		return [n, null]
	}

	static __typeInfo = $.registerStructType(
		"main.StringReader",
		() => new StringReader(),
		() => [{ name: "Read", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		StringReader,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.basicType("string") }, { name: "pos", key: "pos", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let mr1 = new MyReader({name: "test1"})
	await $.println($.pointerValue<MyReader>(mr1).Reader == null)

	let sr = new StringReader({data: "hello", pos: 0})
	let mr2 = new MyReader({Reader: $.interfaceValue<Reader | null>(sr, "*main.StringReader", /* @__PURE__ */ $.pointerType("main.StringReader")), name: "test2"})
	await $.println($.pointerValue<MyReader>(mr2).Reader != null)

	let buf = $.makeSlice<number>(5, undefined, "byte")
	let [n, ] = $.pointerValue<Exclude<Reader, null>>($.pointerValue<MyReader>(mr2).Reader).Read(buf)
	await $.println(n == 5)

	await $.println(10)
	await $.println(15)
	await $.println(true)
}

if ($.isMainScript(import.meta)) {
	await main()
}

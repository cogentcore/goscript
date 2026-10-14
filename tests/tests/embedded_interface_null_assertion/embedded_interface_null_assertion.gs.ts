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
	public get Reader(): Reader | null {
		return this._fields.Reader
	}

	public set Reader(value: Reader | null) {
		this._fields.Reader = value
	}

	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		Reader: Reader | null
		name: string
	}

	constructor(init?: Partial<{Reader?: Reader | null, name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Reader: init?.Reader ?? (null! as Reader | null),
			name: init?.name ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): MyReader {
		return new MyReader(this, true)
	}

	public __goscriptAssign(source: MyReader): void {
		const target = this._fields
		const values = source._fields
		target.Reader = $.assignFieldValue(target.Reader, values.Reader, "main.Reader")
		target.name = values.name
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
	public get data(): string {
		return this._fields.data
	}

	public set data(value: string) {
		this._fields.data = value
	}

	public get pos(): number {
		return this._fields.pos
	}

	public set pos(value: number) {
		this._fields.pos = value
	}

	public _fields: {
		data: string
		pos: number
	}

	constructor(init?: Partial<{data?: string, pos?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			data: init?.data ?? ("" as string),
			pos: init?.pos ?? (0 as number)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): StringReader {
		return new StringReader(this, true)
	}

	public __goscriptAssign(source: StringReader): void {
		const target = this._fields
		const values = source._fields
		target.data = values.data
		target.pos = values.pos
	}

	public Read(p: $.Slice<number>): [number, $.GoError] {
		let s: StringReader | $.VarRef<StringReader> | null = this;
		const s$ = $.pointerTarget<StringReader>(s)
		if ((s$ as StringReader).pos >= $.stringLen((s$ as StringReader).data)) {
			return [0, null]
		}
		let n = $.copy(p, $.stringToBytes($.sliceStringOrBytes((s$ as StringReader).data, (s$ as StringReader).pos, undefined)));
		;(s$ as StringReader).pos = (s$ as StringReader).pos + (n)
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
	let mr1: MyReader | $.VarRef<MyReader> | null = new MyReader({name: "test1"})
	await $.println($.pointerValue<MyReader>(mr1).Reader == null)

	let sr: StringReader | $.VarRef<StringReader> | null = new StringReader({data: "hello", pos: 0})
	let mr2: MyReader | $.VarRef<MyReader> | null = new MyReader({Reader: $.interfaceValue<Reader | null>(sr, "*main.StringReader", /* @__PURE__ */ $.pointerType("main.StringReader")), name: "test2"})
	await $.println($.pointerValue<MyReader>(mr2).Reader != null)

	let buf: $.Slice<number> = $.makeSlice<number>(5, undefined, "byte")
	let [n, ] = $.pointerValue<Exclude<Reader, null>>($.pointerValue<MyReader>(mr2).Reader).Read(buf)
	await $.println(n == 5)

	await $.println(10)
	await $.println(15)
	await $.println(true)
}

if ($.isMainScript(import.meta)) {
	await main()
}

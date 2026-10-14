// Generated file based on addressed_struct_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Writer = {
	Write(_p0: $.Slice<number>): [number, $.GoError]
}

$.registerInterfaceType(
	"main.Writer",
	null,
	[{ name: "Write", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }] }]
);

export class Buffer {
	public get data(): $.Slice<number> {
		return this._fields.data
	}

	public set data(value: $.Slice<number>) {
		this._fields.data = value
	}

	public _fields: {
		data: $.Slice<number>
	}

	constructor(init?: Partial<{data?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			data: init?.data ?? (null! as $.Slice<number>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Buffer {
		return new Buffer(this, true)
	}

	public __goscriptAssign(source: Buffer): void {
		const target = this._fields
		const values = source._fields
		target.data = values.data
	}

	public Write(p: $.Slice<number>): [number, $.GoError] {
		let b: Buffer | $.VarRef<Buffer> | null = this;
		const b$: Buffer = b == null ? $.pointerTarget<Buffer>(b) : (b as any).__isVarRef === true ? (b as any).value : (b as any).__goValue === undefined ? (b as any) : $.pointerTarget<Buffer>(b);
		;(b$ as Buffer).data = $.appendSlice((b$ as Buffer).data, p, $.byteSliceHint)
		return [$.sliceLen(p), null]
	}

	static __typeInfo = $.registerStructType(
		"main.Buffer",
		() => new Buffer(),
		() => [{ name: "Write", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		Buffer,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export async function use(w: Writer | null): globalThis.Promise<void> {
	await $.pointerValue<Exclude<Writer, null>>(w).Write(new Uint8Array([120]))
}

export async function main(): globalThis.Promise<void> {
	let b: $.VarRef<Buffer> = $.varRef(new Buffer(undefined, true))
	await use($.interfaceValue<Writer | null>(b, "*main.Buffer", /* @__PURE__ */ $.pointerType("main.Buffer")))
	await $.println($.bytesToString(b.value.data))
}

if ($.isMainScript(import.meta)) {
	await main()
}

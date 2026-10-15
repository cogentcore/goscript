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
	public declare data: $.Slice<number>

	constructor(__goscriptValue?: boolean, data$?: $.Slice<number>) {
		this.data = data$ ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Buffer {
		return new Buffer(true, this.data)
	}

	public __goscriptAssign(source: Buffer): this {
		this.data = source.data
		return this
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

export function use(w: Writer | null): void {
	;(w !== null && (w as any).__isVarRef !== true && ((w as any).__goValue === undefined || (w as any).__goType?.charCodeAt(0) !== 42) ? (w as Exclude<Writer, null>) : $.pointerValue<Exclude<Writer, null>>(w)).Write(new Uint8Array([120]))
}

export async function main(): globalThis.Promise<void> {
	let b: $.VarRef<Buffer> = $.varRef(new Buffer(true))
	use($.interfaceValue<Writer | null>(b, "*main.Buffer", /* @__PURE__ */ $.pointerType("main.Buffer")))
	await $.println($.bytesToString(b.value.data))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on composite_literal_field_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class buffer {
	public declare buf: $.Slice<number>

	constructor(__goscriptValue?: boolean, buf$?: $.Slice<number>) {
		this.buf = buf$ ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): buffer {
		return new buffer(true, this.buf)
	}

	public __goscriptAssign(source: buffer): this {
		this.buf = source.buf
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.buffer",
		() => new buffer(),
		() => [],
		buffer,
		() => [{ name: "buf", key: "buf", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export function newBuffer(data: $.Slice<number>): buffer | $.VarRef<buffer> | null {
	let buf = new buffer(false, data)
	return buf
}

export async function main(): globalThis.Promise<void> {
	let buf = newBuffer(new Uint8Array([7]) as $.Slice<number>)
	await $.println($.typedSliceIndex($.pointerValue<buffer>(buf).buf!, 0))
}

if ($.isMainScript(import.meta)) {
	await main()
}

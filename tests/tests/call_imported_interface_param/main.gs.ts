// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import type * as subpkg from "@goscript/github.com/s4wave/goscript/tests/tests/call_imported_interface_param/subpkg/index.js"

import * as __goscript_sink from "./sink.gs.ts"
import "./sink.gs.ts"

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
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
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
		$.pointerValue<Buffer>(b).data = $.appendSlice($.pointerValue<Buffer>(b).data, p, $.byteSliceHint)
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

export async function main(): globalThis.Promise<void> {
	let b: $.VarRef<Buffer> = $.varRef(new Buffer(undefined, true))
	await __goscript_sink.Use($.interfaceValue<subpkg.Writer | null>(b, "*main.Buffer", /* @__PURE__ */ $.pointerType("main.Buffer")))
	await $.println($.bytesToString(b.value.data))
}

if ($.isMainScript(import.meta)) {
	await main()
}

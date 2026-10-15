// Generated file based on runtime_trace_empty.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as trace from "@goscript/runtime/trace/index.js"

import type * as io from "@goscript/io/index.js"
import "@goscript/fmt/index.js"
import "@goscript/runtime/trace/index.js"

export class byteSink {
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

	public clone(): byteSink {
		return new byteSink(this, true)
	}

	public __goscriptAssign(source: byteSink): void {
		const target = this._fields
		const values = source._fields
		target.data = values.data
	}

	public Write(p: $.Slice<number>): [number, $.GoError] {
		let s: byteSink | $.VarRef<byteSink> | null = this;
		const s$: byteSink = s == null ? $.pointerTarget<byteSink>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<byteSink>(s);
		;(s$ as byteSink).data = $.appendSlice((s$ as byteSink).data, p, $.byteSliceHint)
		return [$.sliceLen(p), null]
	}

	static __typeInfo = $.registerStructType(
		"main.byteSink",
		() => new byteSink(),
		() => [{ name: "Write", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		byteSink,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export const hexDigits: string = "0123456789abcdef"

export function toHex(b: $.Slice<number>): string {
	let out: $.Slice<number> = $.makeSlice<number>($.sliceLen(b) * 2, undefined, "byte")
	for (let __goscriptRangeTarget0 = b, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __goscriptSliceWindow0 = $.sliceRange(out), i = 0; i < __goscriptRangeWindow0.length; i++) {
		let c = $.uint((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + i] as number), 8);
		;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, i * 2)] = $.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", $.uintShr(c, 4, 8));
		;(__goscriptSliceWindow0.backing as any[])[$.windowSlot(__goscriptSliceWindow0, (i * 2) + 1)] = $.indexByteString("\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", c & 0x0f)
	}
	return $.bytesToString(out)
}

export async function main(): globalThis.Promise<void> {
	let sink: byteSink | $.VarRef<byteSink> | null = new byteSink()
	{
		let err = trace.Start($.pointerValueOrNil($.interfaceValue<io.Writer | null>(sink, "*main.byteSink", /* @__PURE__ */ $.pointerType("main.byteSink")))!)
		if (err != null) {
			await fmt.Println($.concatString("ERROR:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
			return
		}
	}
	trace.Stop()

	await fmt.Println(toHex($.pointerValue<byteSink>(sink).data))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

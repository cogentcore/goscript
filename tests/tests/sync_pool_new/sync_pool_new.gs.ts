// Generated file based on sync_pool_new.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export class buffer {
	public declare data: $.Slice<number>

	constructor(__goscriptValue?: boolean, data$?: $.Slice<number>) {
		this.data = data$ ?? (null! as $.Slice<number>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): buffer {
		return new buffer(true, this.data)
	}

	public __goscriptAssign(source: buffer): this {
		this.data = source.data
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.buffer",
		() => new buffer(),
		() => [],
		buffer,
		() => [{ name: "data", key: "data", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }]
	)
}

export let buffers: $.VarRef<sync.Pool> = $.varRef($.markAsStructValue(new sync.Pool({New: $.functionValue((): any => {
	return $.interfaceValue(new buffer(false, $.makeSlice<number>(0, 8, "byte")), "*main.buffer", /* @__PURE__ */ $.pointerType("main.buffer"))
}, ({ kind: $.TypeKind.Function, params: [], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))})))

export function __goscript_set_buffers(__goscriptValue: sync.Pool): void {
	$.assignStruct(buffers.value, __goscriptValue)
}

export function _get(): buffer | $.VarRef<buffer> | null {
	return $.mustTypeAssert<buffer | $.VarRef<buffer> | null>(buffers.value.Get(), /* @__PURE__ */ $.pointerType("main.buffer"))
}

export function put(b: buffer | $.VarRef<buffer> | null): void {
	const b$: buffer = b == null ? $.pointerTarget<buffer>(b) : (b as any).__isVarRef === true ? (b as any).value : (b as any).__goValue === undefined ? (b as any) : $.pointerTarget<buffer>(b);
	;(b$ as buffer).data = $.goSlice((b$ as buffer).data, undefined, 0)
	buffers.value.Put($.interfaceValue(b, "*main.buffer", /* @__PURE__ */ $.pointerType("main.buffer")))
}

export async function main(): globalThis.Promise<void> {
	let b = _get()
	let b$: buffer = b == null ? $.pointerTarget<buffer>(b) : (b as any).__isVarRef === true ? (b as any).value : (b as any).__goValue === undefined ? (b as any) : $.pointerTarget<buffer>(b);
	;(b$ as buffer).data = $.append((b$ as buffer).data, $.uint(120, 8), $.byteSliceHint)
	await $.println("len:", $.sliceLen((b$ as buffer).data), "cap:", $.cap((b$ as buffer).data))
	put(b)
	let c = _get()
	await $.println("reused:", (c === b || $.pointerMayAlias(c) && $.pointerEqual(c, b)), $.sliceLen($.pointerValue<buffer>(c).data))
}

if ($.isMainScript(import.meta)) {
	await main()
}

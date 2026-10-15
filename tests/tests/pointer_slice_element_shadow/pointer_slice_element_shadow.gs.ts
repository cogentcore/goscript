// Generated file based on pointer_slice_element_shadow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class entry {
	public declare key: string

	constructor(init?: Partial<{key?: string}>, __goscriptValue?: boolean) {
		this.key = init?.key ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): entry {
		return new entry(this, true)
	}

	public __goscriptAssign(source: entry): this {
		this.key = source.key
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.entry",
		() => new entry(),
		() => [],
		entry,
		() => [{ name: "key", key: "key", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class _object {
	public declare entries: $.Slice<entry>

	constructor(init?: Partial<{entries?: $.Slice<entry>}>, __goscriptValue?: boolean) {
		this.entries = init?.entries ?? (null! as $.Slice<entry>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): _object {
		return new _object(this, true)
	}

	public __goscriptAssign(source: _object): this {
		this.entries = source.entries
		return this
	}

	public next(): entry | $.VarRef<entry> | null {
		let o: _object | $.VarRef<_object> | null = this;
		const o$: _object = o == null ? $.pointerTarget<_object>(o) : (o as any).__isVarRef === true ? (o as any).value : (o as any).__goValue === undefined ? (o as any) : $.pointerTarget<_object>(o)
		if ($.cap((o$ as _object).entries) > $.sliceLen((o$ as _object).entries)) {
			;(o$ as _object).entries = $.goSlice((o$ as _object).entries, undefined, $.sliceLen((o$ as _object).entries) + 1)
		} else {
			;(o$ as _object).entries = $.appendOne((o$ as _object).entries, new entry(undefined, true))
		}
		return $.indexRef((o$ as _object).entries!, $.sliceLen((o$ as _object).entries) - 1)
	}

	static __typeInfo = $.registerStructType(
		"main.object",
		() => new _object(),
		() => [{ name: "next", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.entry") }], pointerReceiver: true }],
		_object,
		() => [{ name: "entries", key: "entries", type: /* @__PURE__ */ $.sliceType("main.entry") }]
	)
}

export function parseKey(): [string, $.GoError] {
	return ["parsed", null]
}

export async function printInterfaceSpareZero(): globalThis.Promise<void> {
	let values: $.Slice<any> = $.makeSlice<any>(0, 2)
	values = $.appendOne(values, $.interfaceValue(new entry({key: "value"}, true), "main.entry", "main.entry"), $.appendZeros.nil)
	values = $.goSlice(values, undefined, 2)
	await $.println($.arrayIndex(values!, 1) == null)
}

export async function printInterfaceAppendSliceSpareZero(): globalThis.Promise<void> {
	let values: $.Slice<any> = $.makeSlice<any>(0, 2)
	values = $.appendSlice(values, $.arrayToSlice<any>([$.interfaceValue(new entry({key: "value"}, true), "main.entry", "main.entry")]), $.appendZeros.nil)
	values = $.goSlice(values, undefined, 2)
	await $.println($.arrayIndex(values!, 1) == null)
}

export async function main(): globalThis.Promise<void> {
	let o = new _object()
	for (let i = 0; i < 4; i++) {
		let __goscriptShadow0 = (o !== null && (o as any).__isVarRef !== true && (o as any).__goValue === undefined ? ((o as any) as _object).next() : _object.prototype.next.call(o))
		$.pointerValue<entry>(__goscriptShadow0).key = "set"
		await $.println(i, $.pointerValue<entry>(__goscriptShadow0).key)
	}

	let __goscriptShadow1 = (o !== null && (o as any).__isVarRef !== true && (o as any).__goValue === undefined ? ((o as any) as _object).next() : _object.prototype.next.call(o))
	let err: $.GoError = null! as $.GoError
	let __goscriptTuple0: any = parseKey()
	$.pointerValue<entry>(__goscriptShadow1).key = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println($.pointerValue<entry>(__goscriptShadow1).key, err == null)
	await printInterfaceSpareZero()
	await printInterfaceAppendSliceSpareZero()
}

if ($.isMainScript(import.meta)) {
	await main()
}

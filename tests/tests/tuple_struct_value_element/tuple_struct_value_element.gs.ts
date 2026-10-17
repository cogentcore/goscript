// Generated file based on tuple_struct_value_element.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class order {
	public declare keys: $.Slice<$.Slice<number>>

	public declare done: number

	constructor(__goscriptValue?: boolean, keys$?: $.Slice<$.Slice<number>>, done$?: number) {
		this.keys = keys$ ?? (null! as $.Slice<$.Slice<number>>)
		this.done = done$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): order {
		return new order(true, this.keys, this.done)
	}

	public __goscriptAssign(source: order): this {
		this.keys = source.keys
		this.done = source.done
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.order",
		() => new order(),
		() => [],
		order,
		() => [{ name: "keys", key: "keys", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))) }, { name: "done", key: "done", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function split(ready: $.Channel<$.Slice<string>> | null): globalThis.Promise<[number, order, $.GoError]> {
	let o: order = new order(true)
	for (let __goscriptRangeTarget0 = await $.chanRecv(ready), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let k = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		o.keys = $.appendOne(o.keys, $.stringToBytes(k), $.appendZeros.nil)
	}
	o.done = 1
	return [$.sliceLen(o.keys), (o).clone(), null]
}

export async function main(): globalThis.Promise<void> {
	let err: $.GoError = null! as $.GoError
	let ready = $.makeChannel<$.Slice<string>>(1, null! as $.Slice<string>, "both")
	await $.chanSend(ready, $.arrayToSlice<string>(["a", "bc", "def"]))

	// A struct value declared beside a reused err keeps its type, so ranging
	// over a reslice of its [][]byte field yields []byte elements.
	let __goscriptTuple0: any = await split(ready)
	let n: number = __goscriptTuple0[0]
	let placed: order = __goscriptTuple0[1]
	err = __goscriptTuple0[2]
	if (err != null) {
		$.panic((err as any))
	}
	await $.println(n)
	for (let __goscriptRangeTarget1 = $.goSlice(placed.keys, placed.done, undefined), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let h = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as $.Slice<number>)
		await $.println($.bytesToString(h), $.sliceLen(h))
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

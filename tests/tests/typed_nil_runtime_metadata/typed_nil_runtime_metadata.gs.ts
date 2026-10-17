// Generated file based on typed_nil_runtime_metadata.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export type reader = {
	Read(_p0: $.Slice<number>): [number, $.GoError]
}

$.registerInterfaceType(
	"main.reader",
	null,
	[$.methodSignature("Read", [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))], [/* @__PURE__ */ $.basicType("int"), "error"])]
);

export class source {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): source {
		return new source(true)
	}

	public __goscriptAssign(source: source): this {
		return this
	}

	public Read(value: $.Slice<number>): [number, $.GoError] {
		return [$.sliceLen(value), null]
	}

	static __typeInfo = $.registerStructType(
		"main.source",
		() => new source(),
		() => [$.methodSignature("Read", [["value", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]], [/* @__PURE__ */ $.basicType("int"), "error"], true)],
		source,
		() => []
	)
}

export function mapComparisonPanics(): boolean {
	let panicked = false
	const __defer = new $.DisposableStack()
	try {
		__defer.defer(() => { (() => {
			panicked = $.recover() != null
		})() })
		let mapped: globalThis.Map<string, number> | null = null! as globalThis.Map<string, number> | null
		let left: any = $.interfaceValue(mapped, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))
		let right: any = $.interfaceValue(mapped, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))
		$.comparableEqual(left, right)
		const __goscriptReturn0: boolean = false
		panicked = __goscriptReturn0
		__defer.dispose()
		return panicked
		__defer.dispose()
	} catch (e) {
		__defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
	return panicked
}

export async function main(): globalThis.Promise<void> {
	let mapped: globalThis.Map<string, number> | null = null! as globalThis.Map<string, number> | null
	let mappedAny: any = $.interfaceValue(mapped, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))
	let __goscriptTuple0: any = $.typeAssertTuple<globalThis.Map<string, number> | null>(mappedAny, /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))
	let mappedValue: globalThis.Map<string, number> | null = __goscriptTuple0[0]
	let mappedOK: boolean = __goscriptTuple0[1]
	await $.println("map", mappedOK, mappedValue == null)

	let channel: $.Channel<number> | null = null! as $.Channel<number> | null
	let channelAny: any = $.interfaceValue(channel, "chan int", /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both"))
	let __goscriptTuple1: any = $.typeAssertTuple<$.Channel<number> | null>(channelAny, /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both"))
	let channelValue: $.Channel<number> | null = __goscriptTuple1[0]
	let channelOK: boolean = __goscriptTuple1[1]
	await $.println("chan", channelOK, channelValue == null)

	let callback: (() => void) | null = null! as (() => void) | null
	let callbackAny: any = $.interfaceValue(callback, "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
	let [callbackValue, callbackOK] = $.typeAssertTuple<(() => void) | null>(callbackAny, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
	await $.println("func", callbackOK, callbackValue == null)

	let pointer: source | $.VarRef<source> | null = null! as source | $.VarRef<source> | null
	let pointerAny: any = $.interfaceValue(pointer, "*main.source", /* @__PURE__ */ $.pointerType("main.source"))
	let [readerValue, readerOK] = $.typeAssertTuple<reader | null>(pointerAny, "main.reader")
	let [count, err] = await (readerValue !== null && (readerValue as any).__isVarRef !== true && ((readerValue as any).__goValue === undefined || (readerValue as any).__goType?.charCodeAt(0) !== 42) ? (readerValue as Exclude<reader, null>) : $.pointerValue<Exclude<reader, null>>(readerValue)).Read(new Uint8Array([1, 2]) as $.Slice<number>)
	if (err != null) {
		$.panic((err as any))
	}
	await $.println("reader", readerOK, count)

	let mappedReflect = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(mapped, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))))
	await $.println("reflect-map", $.markAsStructValue($.cloneStructValue(mappedReflect)).Kind() == 21, $.markAsStructValue($.cloneStructValue(mappedReflect)).IsNil())

	let pointerReflect = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(pointer, "*main.source", /* @__PURE__ */ $.pointerType("main.source")))))
	await $.println("reflect-pointer", $.markAsStructValue($.cloneStructValue(pointerReflect)).Kind() == 22, $.markAsStructValue($.cloneStructValue(pointerReflect)).IsNil(), (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(pointerReflect)).Type()).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) == 25)

	await $.println("map-comparison-panics", mapComparisonPanics())
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

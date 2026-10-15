// Generated file based on reflect_struct_of.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as reflect from "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	let intType = reflect.TypeFor(__goscriptStatic0())
	let stringType = reflect.TypeFor(__goscriptStatic1())
	let byteType = reflect.TypeFor(__goscriptStatic2())

	let fields = $.arrayToSlice<reflect.StructField>([$.markAsStructValue(new reflect.StructField({Name: "Name", Type: stringType, Tag: "json:\"name\""})), $.markAsStructValue(new reflect.StructField({Name: "Count", Type: intType, Tag: "json:\"count\""}))])
	let typ = reflect.StructOf(fields)
	await $.println("type:", (__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && (typ as any).__goValue === undefined ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && (typ as any).__goValue === undefined ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && (typ as any).__goValue === undefined ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).PkgPath(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && (typ as any).__goValue === undefined ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), ((__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && (typ as any).__goValue === undefined ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Offset > 0, (__goscriptAwait = (typ !== null && (typ as any).__isVarRef !== true && (typ as any).__goValue === undefined ? (typ as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(typ)).Comparable(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let value = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(typ)!))).Elem()))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(value)).FieldByName("Name"))).SetString("Ada")
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(value)).Field(1))).SetInt(3n)
	let __goscriptTuple0: any = json.Marshal($.markAsStructValue($.cloneStructValue(value)).Interface())
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("json error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		return
	}
	await $.println("json:", $.bytesToString(data))

	let layout = reflect.StructOf($.arrayToSlice<reflect.StructField>([$.markAsStructValue(new reflect.StructField({Name: "A", Type: byteType})), $.markAsStructValue(new reflect.StructField({Name: "B", Type: intType}))]))
	await $.println("layout:", ((__goscriptAwait = (layout !== null && (layout as any).__isVarRef !== true && (layout as any).__goValue === undefined ? (layout as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(layout)).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Offset, ((__goscriptAwait = (layout !== null && (layout as any).__isVarRef !== true && (layout as any).__goValue === undefined ? (layout as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(layout)).Field(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Offset, (__goscriptAwait = (layout !== null && (layout as any).__isVarRef !== true && (layout as any).__goValue === undefined ? (layout as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(layout)).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.arrayIndex(((__goscriptAwait = (layout !== null && (layout as any).__isVarRef !== true && (layout as any).__goValue === undefined ? (layout as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(layout)).Field(0), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField).Index!, 0))

	let inner = reflect.StructOf($.arrayToSlice<reflect.StructField>([$.markAsStructValue(new reflect.StructField({Name: "ID", Type: intType})), $.markAsStructValue(new reflect.StructField({Name: "Label", Type: stringType}))]))
	let outer = reflect.StructOf($.arrayToSlice<reflect.StructField>([$.markAsStructValue(new reflect.StructField({Name: "Inner", Type: inner, Anonymous: true})), $.markAsStructValue(new reflect.StructField({Name: "Count", Type: intType}))]))
	let visible = reflect.VisibleFields($.pointerValueOrNil(outer)!)
	await $.println("visible:", $.sliceLen(visible), $.arrayIndex(visible!, 0).Name, $.sliceLen($.arrayIndex(visible!, 1).Index), $.arrayIndex($.arrayIndex(visible!, 1).Index!, 0), $.arrayIndex($.arrayIndex(visible!, 1).Index!, 1))

	let outerValue = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(outer)!))).Elem()))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(outerValue)).FieldByIndex($.arrayToSlice<number>([0, 0])))).SetInt(9n)
	await $.println("promoted:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(outerValue)).FieldByName("ID"))).Int())

	await $.println("same:", $.comparableEqual(typ, reflect.StructOf(fields)))
	await $.println("different-pkg:", $.comparableEqual(reflect.StructOf($.arrayToSlice<reflect.StructField>([$.markAsStructValue(new reflect.StructField({Name: "x", PkgPath: "a", Type: intType}))])), reflect.StructOf($.arrayToSlice<reflect.StructField>([$.markAsStructValue(new reflect.StructField({Name: "x", PkgPath: "b", Type: intType}))]))))
	await $.println("reflect_struct_of test finished")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("string"), zero: () => "" }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("uint8"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

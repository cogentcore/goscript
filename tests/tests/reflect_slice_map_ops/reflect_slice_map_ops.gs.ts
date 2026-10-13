// Generated file based on reflect_slice_map_ops.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export async function main(): globalThis.Promise<void> {
	// MapRange starts before the first entry and uses the map's types.
	let it: reflect.MapIter | $.VarRef<reflect.MapIter> | null = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([["x", 3]]), "map[string]float32", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("float32")))))).MapRange()
	let n = 0
	while (reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(it))) {
		n++
		await $.println($.markAsStructValue($.cloneStructValue(reflect.MapIter.prototype.Key.call($.pointerValue<reflect.MapIter>(it)))).String(), reflect.Kind_String($.markAsStructValue($.cloneStructValue(reflect.MapIter.prototype.Value.call($.pointerValue<reflect.MapIter>(it)))).Kind()), $.markAsStructValue($.cloneStructValue(reflect.MapIter.prototype.Value.call($.pointerValue<reflect.MapIter>(it)))).Float())
	}
	await $.println(n)
	let empty: reflect.MapIter | $.VarRef<reflect.MapIter> | null = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.makeMap<string, number>([]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))))).MapRange()
	await $.println(reflect.MapIter.prototype.Next.call($.pointerValue<reflect.MapIter>(empty)))

	// Append appends after the slice's length, within its capacity.
	let s: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([1, 2, 3]))
	let sv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(s, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(sv)).SetLen(2)
	await $.println($.len(s.value), $.cap(s.value))
	let a = $.markAsStructValue($.cloneStructValue(reflect.Append($.markAsStructValue($.cloneStructValue(sv)), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(9, "int")))))))
	await $.println($.markAsStructValue($.cloneStructValue(a)).Len(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(a)).Index(2))).Int())
	let b = $.markAsStructValue($.cloneStructValue(reflect.AppendSlice($.markAsStructValue($.cloneStructValue(sv)), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([7, 8]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))))))
	await $.println($.markAsStructValue($.cloneStructValue(b)).Len(), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(b)).Index(3))).Int())

	// Values read after a Set through the same Value see the new contents.
	let m: $.VarRef<globalThis.Map<string, number> | null> = $.varRef($.makeMap<string, number>([["old", 0]]))
	let mv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(m, "*map[string]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(mv)).Set($.markAsStructValue($.cloneStructValue(reflect.MakeMap($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")), zero: () => null }}))!))))
	$.markAsStructValue($.cloneStructValue(mv)).SetMapIndex($.markAsStructValue($.cloneStructValue(reflect.ValueOf("k"))), $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(1, "int")))))
	await $.println($.len(m.value), $.markAsStructValue($.cloneStructValue(mv)).Len())
	let t: $.VarRef<$.Slice<number>> = $.varRef($.arrayToSlice<number>([0]))
	let tv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(t, "*[]int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(tv)).Set($.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(reflect.TypeFor({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }}))!, 2, 2))))
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(tv)).Index(1))).SetInt(4n)
	await $.println($.arrayIndex(t.value!, 1), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(tv)).Slice(1, 2))).Index(0))).Int())
}

if ($.isMainScript(import.meta)) {
	await main()
}

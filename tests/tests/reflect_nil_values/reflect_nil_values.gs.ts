// Generated file based on reflect_nil_values.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class S {
	public declare V: $.Slice<string>

	constructor(__goscriptValue?: boolean, V$?: $.Slice<string>) {
		this.V = V$ ?? (null! as $.Slice<string>)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): S {
		return new S(true, this.V)
	}

	public __goscriptAssign(source: S): this {
		this.V = source.V
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.S",
		() => new S(),
		() => [],
		S,
		() => [/* @__PURE__ */ $.structField("V", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), [0], 0, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// The zero value of a slice type is a nil slice.
	let st = reflect.TypeOf($.interfaceValue(null, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	let z = $.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil(st)!)))
	let n = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(st)!))).Elem()))
	fmt.Println($.markAsStructValue($.cloneStructValue(z)).IsNil(), $.markAsStructValue($.cloneStructValue(n)).IsNil(), $.basicInterfaceValue($.markAsStructValue($.cloneStructValue(n)).Len(), "int"), $.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(st)!, 0, 0))).IsNil())
	let bs: $.VarRef<$.Slice<number>> = $.varRef(null! as $.Slice<number>)
	let p = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(bs, "*[]byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))))))).Elem()))
	$.markAsStructValue($.cloneStructValue(p)).Set($.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil($.markAsStructValue($.cloneStructValue(p)).Type())!))))
	fmt.Println($.markAsStructValue($.cloneStructValue(p)).IsNil(), bs.value == null)

	// An interface holding a nil slice is not nil.
	let x = $.varRef($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(new S(), "*main.S", /* @__PURE__ */ $.pointerType("main.S"))))).Elem())).Field(0))).Interface())
	fmt.Println(x.value == null, $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(x, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }))))).Elem())).IsNil())
	let e: $.VarRef<any> = $.varRef(null! as any)
	fmt.Println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(e, "*interface{}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Interface, methods: [] }))))).Elem())).IsNil())

	// MapIndex finds a key however its Value was made, and gives the zero
	// Value for a missing one.
	let m = $.makeMap<number, string>([[0, "a"]])
	let mv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(m, "map[int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string"))))))
	let k = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0, "int")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(k)).SetInt(0n)
	fmt.Println($.structInterfaceValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(mv)).MapIndex($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(0, "int"))))))), "reflect.Value", __goscriptStatic0()), $.structInterfaceValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(mv)).MapIndex($.markAsStructValue($.cloneStructValue(k))))), "reflect.Value", __goscriptStatic0()))
	fmt.Println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(mv)).MapIndex($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(5, "int"))))))).IsValid())
	let nilMap: globalThis.Map<number, string> | null = null! as globalThis.Map<number, string> | null
	fmt.Println($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(nilMap, "map[int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string")))))).MapIndex(k))).IsValid())
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods("reflect.Value", "reflect.Value", () => [$.methodSignature("Addr", [], ["reflect.Value"]), $.methodSignature("Bool", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Bytes", [], [/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]), $.methodSignature("Call", [["in", /* @__PURE__ */ $.sliceType("reflect.Value")]], [/* @__PURE__ */ $.sliceType("reflect.Value")]), $.methodSignature("CallSlice", [["in", /* @__PURE__ */ $.sliceType("reflect.Value")]], [/* @__PURE__ */ $.sliceType("reflect.Value")]), $.methodSignature("CanAddr", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanComplex", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanConvert", [["t", "reflect.Type"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanFloat", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanInt", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanInterface", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanSet", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("CanUint", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Cap", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Clear"), $.methodSignature("Close"), $.methodSignature("Comparable", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Complex", [], [/* @__PURE__ */ $.basicType("complex128")]), $.methodSignature("Convert", [["t", "reflect.Type"]], ["reflect.Value"]), $.methodSignature("Elem", [], ["reflect.Value"]), $.methodSignature("Equal", [["u", "reflect.Value"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Field", [["i", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("FieldByIndex", [["index", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))]], ["reflect.Value"]), $.methodSignature("FieldByIndexErr", [["index", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))]], ["reflect.Value", "error"]), $.methodSignature("FieldByName", [["name", /* @__PURE__ */ $.basicType("string")]], ["reflect.Value"]), $.methodSignature("FieldByNameFunc", [["match", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)]], ["reflect.Value"]), $.methodSignature("Fields", [], [({ kind: $.TypeKind.Function, name: "iter.Seq2", params: [({ kind: $.TypeKind.Function, params: ["reflect.StructField", "reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("Float", [], [/* @__PURE__ */ $.basicType("float64")]), $.methodSignature("Grow", [["n", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("Index", [["i", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("Int", [], [/* @__PURE__ */ $.basicType("int64")]), $.methodSignature("Interface", [], [["i", { kind: $.TypeKind.Interface, methods: [] }]]), $.methodSignature("InterfaceData", [], [/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uintptr"), 2)]), $.methodSignature("IsNil", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsValid", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsZero", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Kind", [], [/* @__PURE__ */ $.basicType("uint", "reflect.Kind")]), $.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("MapIndex", [["key", "reflect.Value"]], ["reflect.Value"]), $.methodSignature("MapKeys", [], [/* @__PURE__ */ $.sliceType("reflect.Value")]), $.methodSignature("MapRange", [], [/* @__PURE__ */ $.pointerType("reflect.MapIter")]), $.methodSignature("Method", [["i", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("MethodByName", [["name", /* @__PURE__ */ $.basicType("string")]], ["reflect.Value"]), $.methodSignature("Methods", [], [({ kind: $.TypeKind.Function, name: "iter.Seq2", params: [({ kind: $.TypeKind.Function, params: ["reflect.Method", "reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("NumField", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("NumMethod", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("OverflowComplex", [["x", /* @__PURE__ */ $.basicType("complex128")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("OverflowFloat", [["x", /* @__PURE__ */ $.basicType("float64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("OverflowInt", [["x", /* @__PURE__ */ $.basicType("int64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("OverflowUint", [["x", /* @__PURE__ */ $.basicType("uint64")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Pointer", [], [/* @__PURE__ */ $.basicType("uintptr")]), $.methodSignature("Recv", [], [["x", "reflect.Value"], ["ok", /* @__PURE__ */ $.basicType("bool")]]), $.methodSignature("Send", [["x", "reflect.Value"]]), $.methodSignature("Seq", [], [({ kind: $.TypeKind.Function, name: "iter.Seq", params: [({ kind: $.TypeKind.Function, params: ["reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("Seq2", [], [({ kind: $.TypeKind.Function, name: "iter.Seq2", params: [({ kind: $.TypeKind.Function, params: ["reflect.Value", "reflect.Value"], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)]), $.methodSignature("Set", [["x", "reflect.Value"]]), $.methodSignature("SetBool", [["x", /* @__PURE__ */ $.basicType("bool")]]), $.methodSignature("SetBytes", [["x", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8"))]]), $.methodSignature("SetCap", [["n", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("SetComplex", [["x", /* @__PURE__ */ $.basicType("complex128")]]), $.methodSignature("SetFloat", [["x", /* @__PURE__ */ $.basicType("float64")]]), $.methodSignature("SetInt", [["x", /* @__PURE__ */ $.basicType("int64")]]), $.methodSignature("SetIterKey", [["iter", /* @__PURE__ */ $.pointerType("reflect.MapIter")]]), $.methodSignature("SetIterValue", [["iter", /* @__PURE__ */ $.pointerType("reflect.MapIter")]]), $.methodSignature("SetLen", [["n", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("SetMapIndex", [["key", "reflect.Value"], ["elem", "reflect.Value"]]), $.methodSignature("SetPointer", [["x", /* @__PURE__ */ $.basicType("unknown")]]), $.methodSignature("SetString", [["x", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("SetUint", [["x", /* @__PURE__ */ $.basicType("uint64")]]), $.methodSignature("SetZero"), $.methodSignature("Slice", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("Slice3", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")], ["k", /* @__PURE__ */ $.basicType("int")]], ["reflect.Value"]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("TryRecv", [], [["x", "reflect.Value"], ["ok", /* @__PURE__ */ $.basicType("bool")]]), $.methodSignature("TrySend", [["x", "reflect.Value"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Type", [], ["reflect.Type"]), $.methodSignature("Uint", [], [/* @__PURE__ */ $.basicType("uint64")]), $.methodSignature("UnsafeAddr", [], [/* @__PURE__ */ $.basicType("uintptr")]), $.methodSignature("UnsafePointer", [], [/* @__PURE__ */ $.basicType("unknown")])]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

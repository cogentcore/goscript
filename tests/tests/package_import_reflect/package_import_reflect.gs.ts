// Generated file based on package_import_reflect.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export type Stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.Stringer",
	null,
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class Person {
	public declare Name: string

	public declare Age: number

	constructor(__goscriptValue?: boolean, Name$?: string, Age$?: number) {
		this.Name = Name$ ?? ""
		this.Age = Age$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Person {
		return new Person(true, this.Name, this.Age)
	}

	public __goscriptAssign(source: Person): this {
		this.Name = source.Name
		this.Age = source.Age
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Person",
		() => new Person(),
		() => [],
		Person,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Age", /* @__PURE__ */ $.basicType("int"), [1], 16, true)]
	)
}

export function reflectOverlap(x: $.Slice<number>, y: $.Slice<number>): boolean {
	return ((($.sliceLen(x) > 0) && ($.sliceLen(y) > 0)) && ($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.indexRef(x!, 0), "*byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8")))))).Pointer() <= $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.indexRef(y!, $.sliceLen(y) - 1), "*byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8")))))).Pointer())) && ($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.indexRef(y!, 0), "*byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8")))))).Pointer() <= $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.indexRef(x!, $.sliceLen(x) - 1), "*byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8")))))).Pointer())
}

export function reflectSameStart(x: $.Slice<number>, y: $.Slice<number>): boolean {
	return (($.sliceLen(x) > 0) && ($.sliceLen(y) > 0)) && ($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.indexRef(x!, 0), "*byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8")))))).Pointer() == $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.indexRef(y!, 0), "*byte", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8")))))).Pointer())
}

export async function main(): globalThis.Promise<void> {
	// Test basic reflect functions
	let x = 42
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(x, "int"))))
	await $.println("Type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic0())).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Value:", $.markAsStructValue($.cloneStructValue(v)).Int())
	await $.println("Kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(v)).Kind()))

	// Test with string
	let s = "hello"
	let sv = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(s)))
	await $.println("String type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic1())).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("String value:", $.markAsStructValue($.cloneStructValue(sv)).String())
	await $.println("String kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(sv)).Kind()))

	// Test with slice
	let slice = $.arrayToSlice<number>([1, 2, 3])
	let sliceV = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(slice, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))
	await $.println("Slice type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic2())).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Slice len:", $.markAsStructValue($.cloneStructValue(sliceV)).Len())
	await $.println("Slice kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(sliceV)).Kind()))

	// Test DeepEqual
	let a = $.arrayToSlice<number>([1, 2, 3])
	let b = $.arrayToSlice<number>([1, 2, 3])
	let c = $.arrayToSlice<number>([1, 2, 4])
	await $.println("DeepEqual a==b:", reflect.DeepEqual($.interfaceValue(a, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), $.interfaceValue(b, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))
	await $.println("DeepEqual a==c:", reflect.DeepEqual($.interfaceValue(a, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), $.interfaceValue(c, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))

	// Test Zero value
	let zeroInt = $.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!)))
	await $.println("Zero int:", $.markAsStructValue($.cloneStructValue(zeroInt)).Int())

	// Test type construction functions
	let intType = reflect.TypeFor(__goscriptStatic0())
	let sliceType = reflect.SliceOf($.pointerValueOrNil(intType)!)
	await $.println("SliceOf int:", (__goscriptAwait = (sliceType !== null && (sliceType as any).__isVarRef !== true && ((sliceType as any).__goValue === undefined || (sliceType as any).__goType?.charCodeAt(0) !== 42) ? (sliceType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(sliceType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("SliceOf kind:", reflect.Kind_String((__goscriptAwait = (sliceType !== null && (sliceType as any).__isVarRef !== true && ((sliceType as any).__goValue === undefined || (sliceType as any).__goType?.charCodeAt(0) !== 42) ? (sliceType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(sliceType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	let arrayType = reflect.ArrayOf(5, $.pointerValueOrNil(intType)!)
	await $.println("ArrayOf 5 int:", (__goscriptAwait = (arrayType !== null && (arrayType as any).__isVarRef !== true && ((arrayType as any).__goValue === undefined || (arrayType as any).__goType?.charCodeAt(0) !== 42) ? (arrayType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(arrayType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("ArrayOf kind:", reflect.Kind_String((__goscriptAwait = (arrayType !== null && (arrayType as any).__isVarRef !== true && ((arrayType as any).__goValue === undefined || (arrayType as any).__goType?.charCodeAt(0) !== 42) ? (arrayType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(arrayType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	let ptrType = reflect.PointerTo($.pointerValueOrNil(intType)!)
	await $.println("PointerTo int:", (__goscriptAwait = (ptrType !== null && (ptrType as any).__isVarRef !== true && ((ptrType as any).__goValue === undefined || (ptrType as any).__goType?.charCodeAt(0) !== 42) ? (ptrType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(ptrType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("PointerTo kind:", reflect.Kind_String((__goscriptAwait = (ptrType !== null && (ptrType as any).__isVarRef !== true && ((ptrType as any).__goValue === undefined || (ptrType as any).__goType?.charCodeAt(0) !== 42) ? (ptrType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(ptrType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	let ptrType2 = reflect.PointerTo($.pointerValueOrNil(intType)!)
	await $.println("PtrTo int:", (__goscriptAwait = (ptrType2 !== null && (ptrType2 as any).__isVarRef !== true && ((ptrType2 as any).__goValue === undefined || (ptrType2 as any).__goType?.charCodeAt(0) !== 42) ? (ptrType2 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(ptrType2)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test New and Indirect
	let newVal = $.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(intType)!)))
	await $.println("New int type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(newVal)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	let indirectVal = $.markAsStructValue($.cloneStructValue(reflect.Indirect(newVal)))
	await $.println("Indirect type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(indirectVal)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Zero values for different types
	let zeroString = $.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!)))
	await $.println("Zero string:", $.markAsStructValue($.cloneStructValue(zeroString)).String())

	let zeroBool = $.markAsStructValue($.cloneStructValue(reflect.Zero($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic3()))!)))
	await $.println("Zero bool:", $.markAsStructValue($.cloneStructValue(zeroBool)).String())

	// Test Swapper function
	let testSlice = $.arrayToSlice<number>([1, 2, 3, 4, 5])
	let swapper: ((i: number, j: number) => void) | null = reflect.Swapper($.interfaceValue(testSlice, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))
	await $.println("Before swap:", $.arrayIndex(testSlice!, 0), $.arrayIndex(testSlice!, 4))
	swapper!(0, 4)
	await $.println("After swap:", $.arrayIndex(testSlice!, 0), $.arrayIndex(testSlice!, 4))

	// Test Copy function
	let src = $.arrayToSlice<number>([10, 20, 30])
	let dst = $.makeSlice<number>(2, undefined, "number")
	let srcVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(src, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))
	let dstVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(dst, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))
	let copied = reflect.Copy(dstVal, srcVal)
	await $.println("Copied elements:", copied)
	await $.println("Dst after copy:", $.arrayIndex(dst!, 0), $.arrayIndex(dst!, 1))

	// Test struct reflection
	let person = new Person(true, "Alice", 30)
	let personType = reflect.TypeFor(__goscriptStatic4())
	await $.println("Struct type:", (__goscriptAwait = (personType !== null && (personType as any).__isVarRef !== true && ((personType as any).__goValue === undefined || (personType as any).__goType?.charCodeAt(0) !== 42) ? (personType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(personType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Struct kind:", reflect.Kind_String((__goscriptAwait = (personType !== null && (personType as any).__isVarRef !== true && ((personType as any).__goValue === undefined || (personType as any).__goType?.charCodeAt(0) !== 42) ? (personType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(personType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	let personVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue(person, "main.Person", "main.Person"))))
	await $.println("Struct value type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(personVal)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test with different kinds
	let f = 3.14
	let fVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(f, "float64"))))
	await $.println("Float kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(fVal)).Kind()))

	let boolVal = true
	let bVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(boolVal)))
	await $.println("Bool kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(bVal)).Kind()))

	// Test type equality
	let intType1 = reflect.TypeFor(__goscriptStatic0())
	let intType2 = reflect.TypeFor(__goscriptStatic0())
	await $.println("Same int types:", $.stringEqual((__goscriptAwait = (intType1 !== null && (intType1 as any).__isVarRef !== true && ((intType1 as any).__goValue === undefined || (intType1 as any).__goType?.charCodeAt(0) !== 42) ? (intType1 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(intType1)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (intType2 !== null && (intType2 as any).__isVarRef !== true && ((intType2 as any).__goValue === undefined || (intType2 as any).__goType?.charCodeAt(0) !== 42) ? (intType2 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(intType2)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	let stringType = reflect.TypeFor(__goscriptStatic1())
	await $.println("Different types:", $.stringEqual((__goscriptAwait = (intType1 !== null && (intType1 as any).__isVarRef !== true && ((intType1 as any).__goValue === undefined || (intType1 as any).__goType?.charCodeAt(0) !== 42) ? (intType1 as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(intType1)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), (__goscriptAwait = (stringType !== null && (stringType as any).__isVarRef !== true && ((stringType as any).__goValue === undefined || (stringType as any).__goType?.charCodeAt(0) !== 42) ? (stringType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(stringType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	// Test map type construction
	let mapType = reflect.MapOf($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!)
	await $.println("MapOf string->int:", (__goscriptAwait = (mapType !== null && (mapType as any).__isVarRef !== true && ((mapType as any).__goValue === undefined || (mapType as any).__goType?.charCodeAt(0) !== 42) ? (mapType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mapType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("MapOf kind:", reflect.Kind_String((__goscriptAwait = (mapType !== null && (mapType as any).__isVarRef !== true && ((mapType as any).__goValue === undefined || (mapType as any).__goType?.charCodeAt(0) !== 42) ? (mapType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(mapType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	// Test channel direction constants
	await $.println("Chan kinds available")

	// Test pointer operations
	// Note: Pointer-to-pointer reflection has a compiler limitation
	// var ptr *int = &x
	// ptrVal := reflect.ValueOf(&ptr)
	// println("Pointer type:", ptrVal.Type().String())
	// println("Pointer kind:", ptrVal.Kind().String())

	// Test interface type
	let iface: any = "hello"
	let ifaceVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf(iface)))
	await $.println("Interface value type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(ifaceVal)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Interface kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(ifaceVal)).Kind()))
	let __goscriptTuple0: any = reflect.TypeAssert(__goscriptStatic1(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf("typed"))))
	let assertedString: string = (__goscriptTuple0[0] as string)
	let assertedOK: boolean = __goscriptTuple0[1]
	await $.println("TypeAssert string:", assertedString, assertedOK)
	let [, assertedIntOK] = reflect.TypeAssert(__goscriptStatic0(), $.markAsStructValue($.cloneStructValue(reflect.ValueOf("typed"))))
	await $.println("TypeAssert int:", assertedIntOK)
	let complexValue = $.complex(3, -2)
	let complexReflect = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(complexValue, "complex128"))))
	await $.println("Complex value kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(complexReflect)).Kind()))
	await $.println("Complex real:", $.int($.real($.markAsStructValue($.cloneStructValue(complexReflect)).Complex())))
	await $.println("Complex imag:", $.int($.imag($.markAsStructValue($.cloneStructValue(complexReflect)).Complex())))
	let complexTarget: $.VarRef<$.Complex> = $.varRef($.complex(0, 0))
	let complexTargetValue = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(complexTarget, "*complex128", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("complex128")))))).Elem()))
	$.markAsStructValue($.cloneStructValue(complexTargetValue)).SetComplex($.complex(7, 8))
	await $.println("SetComplex real:", $.int($.real($.markAsStructValue($.cloneStructValue(complexTargetValue)).Complex())))
	await $.println("SetComplex imag:", $.int($.imag($.markAsStructValue($.cloneStructValue(complexTargetValue)).Complex())))
	await $.println("Array type len:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.ArrayOf(3, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!)).Len(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test function type
	let fn = $.functionValue((_p0: number): string => {
		return ""
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	let fnVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(fn, "func(int) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo)))))
	await $.println("Function type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(fnVal)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Function kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(fnVal)).Kind()))

	// Test more complex types
	let complexSlice = $.arrayToSlice<$.Slice<number>>([$.arrayToSlice<number>([1, 2]), $.arrayToSlice<number>([3, 4])])
	let complexVal = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(complexSlice, "[][]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))))
	await $.println("Complex slice type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(complexVal)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Complex slice kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(complexVal)).Kind()))
	await $.println("Complex slice len:", $.markAsStructValue($.cloneStructValue(complexVal)).Len())

	// Test type methods
	await $.println("Type size methods:")
	await $.println("Int size:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic0())).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("String size:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic1())).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Slice size:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeFor(__goscriptStatic2())).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test enhanced API surface - functions to implement
	await $.println("Enhanced API tests:")

	// Test MakeSlice
	let sliceTypeInt = reflect.SliceOf($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!)
	let newSlice = $.markAsStructValue($.cloneStructValue(reflect.MakeSlice($.pointerValueOrNil(sliceTypeInt)!, 3, 5)))
	await $.println("MakeSlice len:", $.markAsStructValue($.cloneStructValue(newSlice)).Len())
	await $.println("MakeSlice type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(newSlice)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test MakeMap
	let mapTypeStr = reflect.MapOf($.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!)
	let newMap = $.markAsStructValue($.cloneStructValue(reflect.MakeMap($.pointerValueOrNil(mapTypeStr)!)))
	await $.println("MakeMap type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(newMap)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Append
	let originalSlice = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<number>([1, 2]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))))
	let appendedSlice = $.markAsStructValue($.cloneStructValue(reflect.Append(originalSlice, $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.basicInterfaceValue(3, "int")))))))
	await $.println("Append result len:", $.markAsStructValue($.cloneStructValue(appendedSlice)).Len())

	// Test channel types
	let chanType = reflect.ChanOf(3, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!)
	await $.println("ChanOf type:", (__goscriptAwait = (chanType !== null && (chanType as any).__isVarRef !== true && ((chanType as any).__goValue === undefined || (chanType as any).__goType?.charCodeAt(0) !== 42) ? (chanType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(chanType)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("ChanOf kind:", reflect.Kind_String((__goscriptAwait = (chanType !== null && (chanType as any).__isVarRef !== true && ((chanType as any).__goValue === undefined || (chanType as any).__goType?.charCodeAt(0) !== 42) ? (chanType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(chanType)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))

	// Test MakeChan
	let newChan = $.markAsStructValue($.cloneStructValue(reflect.MakeChan($.pointerValueOrNil(chanType)!, 0)))
	await $.println("MakeChan type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(newChan)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test different channel directions
	let sendOnlyChan = reflect.ChanOf(2, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!)
	await $.println("SendOnly chan type:", (__goscriptAwait = (sendOnlyChan !== null && (sendOnlyChan as any).__isVarRef !== true && ((sendOnlyChan as any).__goValue === undefined || (sendOnlyChan as any).__goType?.charCodeAt(0) !== 42) ? (sendOnlyChan as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(sendOnlyChan)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let recvOnlyChan = reflect.ChanOf(1, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic3()))!)
	await $.println("RecvOnly chan type:", (__goscriptAwait = (recvOnlyChan !== null && (recvOnlyChan as any).__isVarRef !== true && ((recvOnlyChan as any).__goValue === undefined || (recvOnlyChan as any).__goType?.charCodeAt(0) !== 42) ? (recvOnlyChan as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(recvOnlyChan)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test channels with different element types
	let stringChanType = reflect.ChanOf(3, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!)
	let stringChan = $.markAsStructValue($.cloneStructValue(reflect.MakeChan($.pointerValueOrNil(stringChanType)!, 5)))
	await $.println("String chan type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(stringChan)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("String chan elem type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(stringChan)).Type()).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test buffered vs unbuffered channels
	let unbufferedChan = $.markAsStructValue($.cloneStructValue(reflect.MakeChan($.pointerValueOrNil(chanType)!, 0)))
	let bufferedChan = $.markAsStructValue($.cloneStructValue(reflect.MakeChan($.pointerValueOrNil(chanType)!, 10)))
	await $.println("Unbuffered chan type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(unbufferedChan)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Buffered chan type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(bufferedChan)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test channel reflection properties
	await $.println("Chan elem type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = (chanType !== null && (chanType as any).__isVarRef !== true && ((chanType as any).__goValue === undefined || (chanType as any).__goType?.charCodeAt(0) !== 42) ? (chanType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(chanType)).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Chan elem kind:", reflect.Kind_String((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>((__goscriptAwait = (chanType !== null && (chanType as any).__isVarRef !== true && ((chanType as any).__goValue === undefined || (chanType as any).__goType?.charCodeAt(0) !== 42) ? (chanType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(chanType)).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
	await $.println("Chan size:", (__goscriptAwait = (chanType !== null && (chanType as any).__isVarRef !== true && ((chanType as any).__goValue === undefined || (chanType as any).__goType?.charCodeAt(0) !== 42) ? (chanType as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(chanType)).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Value.Pointer on addressable slice elements.
	let pointerBuf = new Uint8Array([1, 2, 3, 4]) as $.Slice<number>
	let pointerLeft = $.goSlice(pointerBuf, 1, 3)
	let pointerRight = $.goSlice(pointerBuf, 2, 4)
	let pointerOther = new Uint8Array([8, 9]) as $.Slice<number>
	await $.println("Pointer overlap:", reflectOverlap(pointerLeft, pointerRight))
	await $.println("Pointer separate:", reflectOverlap(pointerLeft, pointerOther))
	await $.println("Pointer same:", reflectSameStart(pointerLeft, $.goSlice(pointerBuf, 1, undefined)))
	await $.println("Pointer different:", reflectSameStart(pointerLeft, pointerRight))

	// Test Select functionality
	let intChan = $.markAsStructValue($.cloneStructValue(reflect.MakeChan($.pointerValueOrNil(reflect.ChanOf(3, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic0()))!))!, 1)))
	let strChan = $.markAsStructValue($.cloneStructValue(reflect.MakeChan($.pointerValueOrNil(reflect.ChanOf(3, $.pointerValueOrNil(reflect.TypeFor(__goscriptStatic1()))!))!, 1)))

	// Send values to only the string channel to make select deterministic
	await $.markAsStructValue($.cloneStructValue(strChan)).Send($.markAsStructValue($.cloneStructValue(reflect.ValueOf("hello"))))

	let cases = $.arrayToSlice<reflect.SelectCase>([$.markAsStructValue(new reflect.SelectCase({Dir: 2, Chan: intChan})), $.markAsStructValue(new reflect.SelectCase({Dir: 2, Chan: strChan})), $.markAsStructValue(new reflect.SelectCase({Dir: 3}))])
	let [chosen, recv, recvOK] = await reflect.Select(cases)
	await $.println("Select chosen:", chosen, "recvOK:", recvOK)
	if ($.markAsStructValue($.cloneStructValue(recv)).IsValid()) {
		await $.println("Select recv type:", (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>($.markAsStructValue($.cloneStructValue(recv)).Type()).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		// Print the actual received value
		if (chosen == 0) {
			await $.println("Select recv value:", $.markAsStructValue($.cloneStructValue(recv)).Int())
		} else {
			if (chosen == 1) {
				await $.println("Select recv value:", $.markAsStructValue($.cloneStructValue(recv)).String())
			}
		}
	} else {
		await $.println("Select recv type: invalid")
	}
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
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), zero: () => null }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("bool"), zero: () => false }})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Person", zero: () => new Person(true) }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

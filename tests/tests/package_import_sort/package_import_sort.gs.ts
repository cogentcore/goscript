// Generated file based on package_import_sort.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as slices from "@goscript/slices/index.js"
import * as sort2 from "@goscript/sort/index.js"

export type byFreq = $.Slice<number>

$.registerNamedType("main.byFreq", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")));

$.registerNamedValueType(
	"main.byFreq",
	{Len: (receiver: any) => (byFreq_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Less: (receiver: any, ...args: any[]) => (byFreq_Less as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byFreq_Swap as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])]
);

$.registerNamedValueType(
	"*main.byFreq",
	{Len: (receiver: any) => (byFreq_Len as any)($.pointerValue(receiver)), Less: (receiver: any, ...args: any[]) => (byFreq_Less as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byFreq_Swap as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), sort: (receiver: any, ...args: any[]) => (byFreq_sort as any)(receiver, ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("sort", [["a", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))]])]
);

export type nameList = $.Slice<string>

$.registerNamedType("main.nameList", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")));

$.registerNamedValueType(
	"main.nameList",
	{First: (receiver: any) => (nameList_First as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.nameList",
	{First: (receiver: any) => (nameList_First as any)($.pointerValue(receiver))},
	[$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class descending {
	public get values(): $.Slice<number> {
		return this._fields.values
	}

	public set values(value: $.Slice<number>) {
		this._fields.values = value
	}

	public _fields: {
		values: $.Slice<number>
	}

	constructor(init?: Partial<{values?: $.Slice<number>}>, __goscriptValue?: boolean) {
		this._fields = {
			values: init?.values ?? (null! as $.Slice<number>)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): descending {
		return new descending(this, true)
	}

	public __goscriptAssign(source: descending): void {
		const target = this._fields
		const values = source._fields
		target.values = values.values
	}

	public Len(): number {
		const d = this;
		return $.sliceLen(d.values)
	}

	public Less(i: number, j: number): boolean {
		const d = this;
		return $.arrayIndex(d.values!, i) > $.arrayIndex(d.values!, j)
	}

	public Swap(i: number, j: number): void {
		let d: descending = this;
		let __goscriptAssign0_0: number = $.arrayIndex(d.values!, j)
		let __goscriptAssign0_1: number = $.arrayIndex(d.values!, i)
		$.sliceElems(d.values!)[$.sliceSlot(d.values!, i)] = __goscriptAssign0_0
		$.sliceElems(d.values!)[$.sliceSlot(d.values!, j)] = __goscriptAssign0_1
	}

	static __typeInfo = $.registerStructType(
		"main.descending",
		() => new descending(),
		() => [$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])],
		descending,
		() => [/* @__PURE__ */ $.structField("values", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_sort" })]
	)
}

export async function byFreq_sort(s: $.VarRef<byFreq> | null, a: $.Slice<number>): globalThis.Promise<void> {
	s!.value = ((a as byFreq) as byFreq)
	await sort2.Sort($.pointerValueOrNil($.namedValueInterfaceValue<sort2.Interface | null>(s, "*main.byFreq", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()))!)
}

export function byFreq_Len(s: byFreq): number {
	return $.sliceLen((s as byFreq))
}

export function byFreq_Less(s: byFreq, i: number, j: number): boolean {
	return $.arrayIndex(s!, i) < $.arrayIndex(s!, j)
}

export function byFreq_Swap(s: byFreq, i: number, j: number): void {
	let __goscriptAssign1_0: number = $.arrayIndex(s!, j)
	let __goscriptAssign1_1: number = $.arrayIndex(s!, i)
	$.sliceElems(s!)[$.sliceSlot(s!, i)] = __goscriptAssign1_0
	$.sliceElems(s!)[$.sliceSlot(s!, j)] = __goscriptAssign1_1
}

export async function main(): globalThis.Promise<void> {
	// Test basic slice sorting
	let ints = $.arrayToSlice<number>([3, 1, 4, 1, 5, 9])
	await $.println("Original ints:", $.arrayIndex(ints!, 0), $.arrayIndex(ints!, 1), $.arrayIndex(ints!, 2), $.arrayIndex(ints!, 3), $.arrayIndex(ints!, 4), $.arrayIndex(ints!, 5))
	sort2.Ints(ints)
	await $.println("Sorted ints:", $.arrayIndex(ints!, 0), $.arrayIndex(ints!, 1), $.arrayIndex(ints!, 2), $.arrayIndex(ints!, 3), $.arrayIndex(ints!, 4), $.arrayIndex(ints!, 5))

	// Test if sorted
	let isSorted = sort2.IntsAreSorted(ints)
	await $.println("Ints are sorted:", isSorted)

	// Test string sorting
	let strings = $.arrayToSlice<string>(["banana", "apple", "cherry"])
	await $.println("Original strings:", $.arrayIndex(strings!, 0), $.arrayIndex(strings!, 1), $.arrayIndex(strings!, 2))
	sort2.Strings(strings)
	await $.println("Sorted strings:", $.arrayIndex(strings!, 0), $.arrayIndex(strings!, 1), $.arrayIndex(strings!, 2))

	// Test if strings are sorted
	let stringSorted = sort2.StringsAreSorted(strings)
	await $.println("Strings are sorted:", stringSorted)

	// Test float64 sorting
	let floats = $.arrayToSlice<number>([3.14, 2.71, 1.41])
	await $.println("Original floats:", $.arrayIndex(floats!, 0), $.arrayIndex(floats!, 1), $.arrayIndex(floats!, 2))
	sort2.Float64s(floats)
	await $.println("Sorted floats:", $.arrayIndex(floats!, 0), $.arrayIndex(floats!, 1), $.arrayIndex(floats!, 2))

	// Test if floats are sorted
	let floatSorted = sort2.Float64sAreSorted(floats)
	await $.println("Floats are sorted:", floatSorted)

	// Test search functions
	let intIndex = sort2.SearchInts(ints, 4)
	await $.println("Index of 4 in sorted ints:", intIndex)

	let stringIndex = sort2.SearchStrings(strings, "banana")
	await $.println("Index of 'banana' in sorted strings:", stringIndex)

	let floatIndex = sort2.SearchFloat64s(floats, 2.71)
	await $.println("Index of 2.71 in sorted floats:", floatIndex)

	// Test generic Search function
	let searchResult = sort2.Search($.sliceLen(ints), $.functionValue((i: number): boolean => {
		return $.arrayIndex(ints!, i) >= 5
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	await $.println("First index where value >= 5:", searchResult)

	// A predicate that receives from a channel makes Search suspend.
	let gate = $.makeChannel<number>(8, 0, "both")
	for (let __goscriptRangeCount0 = $.cap(gate), __rangeIndex = 0; __rangeIndex < __goscriptRangeCount0; __rangeIndex++) {
		await $.chanSend(gate, 0)
	}
	let asyncSearch = await sort2.Search($.sliceLen(ints), $.functionValue(async (i: number): globalThis.Promise<boolean> => {
		return ($.arrayIndex(ints!, i) + await $.chanRecv(gate)) >= 4
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	await $.println("First index where value >= 4:", asyncSearch)
	let [findIndex, found] = sort2.Find($.sliceLen(ints), $.functionValue((i: number): number => {
		return 5 - $.arrayIndex(ints!, i)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))
	await $.println("Find 5:", findIndex, found)
	await $.println("Sorted pair:", sortedPair(2, 1))

	// Test Slice function with custom comparator
	let testSlice = $.arrayToSlice<number>([5, 2, 8, 1, 9])
	slices.Sort(testSlice)
	await $.println("Custom sorted slice:", $.arrayIndex(testSlice!, 0), $.arrayIndex(testSlice!, 1), $.arrayIndex(testSlice!, 2), $.arrayIndex(testSlice!, 3), $.arrayIndex(testSlice!, 4))

	let asyncSlice = $.arrayToSlice<number>([2, 1])
	let ready = $.makeChannel<boolean>(1, false, "both")
	await $.chanSend(ready, true)
	await sort2.Slice($.interfaceValue(asyncSlice, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), $.functionValue(async (i: number, j: number): globalThis.Promise<boolean> => {
		await $.chanRecv(ready)
		return $.arrayIndex(asyncSlice!, i) < $.arrayIndex(asyncSlice!, j)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	await $.println("Async sorted slice:", $.arrayIndex(asyncSlice!, 0), $.arrayIndex(asyncSlice!, 1))

	// Test SliceIsSorted
	let isSliceSorted = sort2.SliceIsSorted($.interfaceValue(testSlice, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), $.functionValue((i: number, j: number): boolean => {
		return $.arrayIndex(testSlice!, i) < $.arrayIndex(testSlice!, j)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	await $.println("Custom slice is sorted:", isSliceSorted)

	// Test custom sort.Interface values.
	let custom = new descending({values: $.arrayToSlice<number>([1, 3, 2])}, true)
	await sort2.Sort($.interfaceValue<sort2.Interface | null>((custom).clone(), "main.descending", "main.descending")!)
	await $.println("Custom interface sort:", $.arrayIndex(custom.values!, 0), $.arrayIndex(custom.values!, 1), $.arrayIndex(custom.values!, 2))

	let namedSlice = $.arrayToSlice<number>([4, 1, 3])
	let namedSliceSorter: $.VarRef<byFreq> = $.varRef(null! as byFreq)
	await byFreq_sort(namedSliceSorter, namedSlice)
	await $.println("Named slice pointer sort:", $.arrayIndex(namedSlice!, 0), $.arrayIndex(namedSlice!, 1), $.arrayIndex(namedSlice!, 2))

	// sort.Slice takes the slice as an any, such as from reflect
	let anySlice = $.arrayToSlice<number>([3, 1, 2])
	sort2.Slice($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(anySlice, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).Interface(), $.functionValue((i: number, j: number): boolean => {
		return $.arrayIndex(anySlice!, i) < $.arrayIndex(anySlice!, j)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	await $.println("Any slice sort:", $.arrayIndex(anySlice!, 0), $.arrayIndex(anySlice!, 1), $.arrayIndex(anySlice!, 2))
	await $.println("Any slice sorted:", sort2.SliceIsSorted($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(anySlice, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")))))).Interface(), $.functionValue((i: number, j: number): boolean => {
		return $.arrayIndex(anySlice!, i) < $.arrayIndex(anySlice!, j)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))))

	// a named slice type with methods passed as an any
	let names = ($.arrayToSlice<string>(["c", "a", "b"]) as nameList)
	sort2.Slice($.namedValueInterfaceValue<any>(names, "main.nameList", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()), $.functionValue((i: number, j: number): boolean => {
		return $.stringCompare($.arrayIndex(names!, i), $.arrayIndex(names!, j)) < 0
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	await $.println("Named slice any sort:", nameList_First(names), $.arrayIndex(names!, 1), $.arrayIndex(names!, 2))

	// Test the named slice types and their methods.
	let wordSlice = $.arrayToSlice<string>(["c", "a", "b"])
	await sort2.StringSlice_Sort((wordSlice as sort2.StringSlice))
	await $.println("StringSlice sort:", $.arrayIndex(wordSlice!, 0), $.arrayIndex(wordSlice!, 1), $.arrayIndex(wordSlice!, 2), sort2.StringSlice_Search((wordSlice as sort2.StringSlice), "b"))
	let floatSlice = ($.arrayToSlice<number>([2.5, 1.5]) as sort2.Float64Slice)
	await sort2.Float64Slice_Sort(floatSlice)
	await $.println("Float64Slice sort:", sort2.Float64Slice_Len(floatSlice), sort2.Float64Slice_Less(floatSlice, 0, 1), sort2.Float64Slice_Search(floatSlice, 2.5))
	let sorter: sort2.Interface | null = $.namedValueInterfaceValue<sort2.Interface | null>(($.arrayToSlice<number>([3, 1, 2]) as sort2.IntSlice), "sort.IntSlice", __goscriptStatic6(), __goscriptStatic7(), __goscriptStatic8())
	await sort2.Sort($.pointerValueOrNil(sorter)!)
	let intSlice = ($.mustTypeAssert<sort2.IntSlice>(sorter, /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "sort.IntSlice")) as sort2.IntSlice)
	await $.println("IntSlice interface sort:", $.arrayIndex(intSlice!, 0), $.arrayIndex(intSlice!, 1), $.arrayIndex(intSlice!, 2), (__goscriptAwait = (sorter !== null && (sorter as any).__isVarRef !== true && (sorter as any).__goValue === undefined ? (sorter as Exclude<sort2.Interface, null>) : $.pointerValue<Exclude<sort2.Interface, null>>(sorter)).Len(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await sort2.Sort($.pointerValueOrNil(sort2.Reverse($.pointerValueOrNil($.namedValueInterfaceValue<sort2.Interface | null>(intSlice, "sort.IntSlice", __goscriptStatic6(), __goscriptStatic7(), __goscriptStatic8()))!))!)
	sort2.IntSlice_Swap(intSlice, 0, 2)
	await $.println("IntSlice reverse and swap:", $.arrayIndex(intSlice!, 0), $.arrayIndex(intSlice!, 1), $.arrayIndex(intSlice!, 2))

	await $.println("test finished")
}

export function nameList_First(n: nameList): string {
	return $.arrayIndex(n!, 0)
}

export function sortedPair(a: number, b: number): number {
	let pair = $.arrayToSlice<number>([a, b])
	sort2.Slice($.interfaceValue(pair, "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))), $.functionValue((i: number, j: number): boolean => {
		return $.arrayIndex(pair!, i) < $.arrayIndex(pair!, j)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	return ($.arrayIndex(pair!, 0) * 10) + $.arrayIndex(pair!, 1)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Len: (receiver: any) => (byFreq_Len as any)($.pointerValue(receiver)), Less: (receiver: any, ...args: any[]) => (byFreq_Less as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), Swap: (receiver: any, ...args: any[]) => (byFreq_Swap as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args)), sort: (receiver: any, ...args: any[]) => (byFreq_sort as any)(receiver, ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= (/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "main.byFreq")))
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]]), $.methodSignature("sort", [["a", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))]])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({First: (receiver: any) => (nameList_First as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string"), "main.nameList"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("First", [], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ({Len: (receiver: any) => (sort2.IntSlice_Len as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Less: (receiver: any, ...args: any[]) => (sort2.IntSlice_Less as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Search: (receiver: any, ...args: any[]) => (sort2.IntSlice_Search as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args)), Sort: (receiver: any) => (sort2.IntSlice_Sort as any)(($.isVarRef(receiver) ? receiver.value : receiver)), Swap: (receiver: any, ...args: any[]) => (sort2.IntSlice_Swap as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic7$value: any
function __goscriptStatic7(): any {
	return __goscriptStatic7$value ??= (/* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"), "sort.IntSlice"))
}

var __goscriptStatic8$value: any
function __goscriptStatic8(): any {
	return __goscriptStatic8$value ??= ([$.methodSignature("Len", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Less", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Search", [["x", /* @__PURE__ */ $.basicType("int")]], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Sort"), $.methodSignature("Swap", [["i", /* @__PURE__ */ $.basicType("int")], ["j", /* @__PURE__ */ $.basicType("int")]])])
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

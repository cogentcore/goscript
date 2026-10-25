// Generated file based on fmt_map_sorted.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as math from "@goscript/math/index.js"

export class key {
	public declare A: number

	public declare B: string

	constructor(__goscriptValue?: boolean, A$?: number, B$?: string) {
		this.A = A$ ?? 0
		this.B = B$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): key {
		return new key(true, this.A, this.B)
	}

	public __goscriptAssign(source: key): this {
		this.A = source.A
		this.B = source.B
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.key",
		() => new key(),
		() => [],
		key,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("int") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Keys are sorted, numbers by value with NaN first.
	let ints = $.makeMap<number, string>([[3, "c"], [-1, "a"], [2, "b"]])
	let floats = $.makeMap<number, boolean>([[2.5, true], [math.NaN(), false], [-1, true]])
	fmt.Println($.interfaceValue(ints, "map[int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string"))), $.interfaceValue(floats, "map[float64]bool", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("float64"), /* @__PURE__ */ $.basicType("bool"))))
	fmt.Printf("%v %+v %#v\n", $.interfaceValue(ints, "map[int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string"))), $.interfaceValue(ints, "map[int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string"))), $.interfaceValue(ints, "map[int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string"))))

	// Strings, bools, arrays and structs sort by value, field by field.
	fmt.Println($.interfaceValue($.makeMap<string, number>([["b", 2], ["a", 1], ["", 0]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))
	fmt.Println($.interfaceValue($.makeMap<boolean, number>([[true, 1], [false, 0]]), "map[bool]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("bool"), /* @__PURE__ */ $.basicType("int"))))
	fmt.Println($.interfaceValue($.makeMap<number[], string>([[$.arrayValue([2, 1]), "y"], [$.arrayValue([1, 9]), "x"]]), "map[[2]int]string", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("int"), 2), /* @__PURE__ */ $.basicType("string"))))
	fmt.Println($.interfaceValue($.makeMap<key, number>([[new key(true, 2, "a"), 3], [new key(true, 1, "b"), 2], [new key(true, 1, "a"), 1]]), "map[main.key]int", /* @__PURE__ */ $.mapType("main.key", /* @__PURE__ */ $.basicType("int"))))

	// Interface elements, nested maps and nil and empty maps.
	let nilMap: globalThis.Map<string, number> | null = null! as globalThis.Map<string, number> | null
	fmt.Println($.interfaceValue($.makeMap<string, any>([["x", $.basicInterfaceValue(1, "int")], ["y", "s"]]), "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] })), $.interfaceValue($.makeMap<number, globalThis.Map<number, number> | null>([[1, $.makeMap<number, number>([[2, 3]])]]), "map[int]map[int]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")))))
	fmt.Printf("%v %#v %v\n", $.interfaceValue(nilMap, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))), $.interfaceValue(nilMap, "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))), $.interfaceValue($.makeMap<string, number>([]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int"))))
	let x: any = $.interfaceValue($.makeMap<string, number>([["k", 1]]), "map[string]int", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.basicType("int")))
	fmt.Println(x, (fmt.Sprint(x) as string))
}

if ($.isMainScript(import.meta)) {
	await main()
}

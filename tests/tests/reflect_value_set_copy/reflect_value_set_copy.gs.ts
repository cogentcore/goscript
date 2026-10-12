// Generated file based on reflect_value_set_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class item {
	public declare Name: string

	public declare Count: number

	public declare Big: bigint

	public declare Ratio: number

	public declare On: boolean

	public declare Tags: $.Slice<string>

	public _fields: {
		Name: string
		Count: number
		Big: bigint
		Ratio: number
		On: boolean
		Tags: $.Slice<string>
	}

	constructor(init?: Partial<{Name?: string, Count?: number, Big?: bigint, Ratio?: number, On?: boolean, Tags?: $.Slice<string>}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Count: init?.Count ?? (0 as number),
			Big: init?.Big ?? (0n as bigint),
			Ratio: init?.Ratio ?? (0 as number),
			On: init?.On ?? (false as boolean),
			Tags: init?.Tags ?? (null! as $.Slice<string>)
		}
	}

	public clone(): item {
		return $.markAsStructValue(new item(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Count", "Big", "Ratio", "On", "Tags"])
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [],
		item,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Count", /* @__PURE__ */ $.basicType("int"), [1], 16, true), /* @__PURE__ */ $.structField("Big", /* @__PURE__ */ $.basicType("int64"), [2], 24, true), /* @__PURE__ */ $.structField("Ratio", /* @__PURE__ */ $.basicType("float64"), [3], 32, true), /* @__PURE__ */ $.structField("On", /* @__PURE__ */ $.basicType("bool"), [4], 40, true), /* @__PURE__ */ $.structField("Tags", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")), [5], 48, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// values made by New and set through Elem, as decoders do for map keys
	let name = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf(""))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(name)).SetString("a")
	await $.println($.markAsStructValue($.cloneStructValue(name)).String(), $.mustTypeAssert<string>($.markAsStructValue($.cloneStructValue(name)).Interface(), /* @__PURE__ */ $.basicType("string")))

	let n = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0, "int")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(n)).SetInt(7n)
	await $.println($.markAsStructValue($.cloneStructValue(n)).Int())

	let big = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0n, "int64")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(big)).SetInt(1099511627776n)
	await $.println($.markAsStructValue($.cloneStructValue(big)).Int())

	let f = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.basicInterfaceValue(0.0, "float64")))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(f)).SetFloat(2.5)
	await $.println($.markAsStructValue($.cloneStructValue(f)).Float())

	let b = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf(false))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(b)).SetBool(true)
	await $.println($.markAsStructValue($.cloneStructValue(b)).Bool())

	let sl = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.New($.pointerValueOrNil(reflect.TypeOf($.interfaceValue($.arrayToSlice<string>([]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))!))).Elem()))
	$.markAsStructValue($.cloneStructValue(sl)).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.arrayToSlice<string>(["x", "y"]), "[]string", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("string")))))))
	await $.println($.markAsStructValue($.cloneStructValue(sl)).Len())

	// struct fields set through a copy of the field Value
	let it = $.varRef($.markAsStructValue(new item()))
	let v = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(it, "*main.item", /* @__PURE__ */ $.pointerType("main.item"))))).Elem()))
	let fields: $.Slice<reflect.Value> = $.arrayToSlice<reflect.Value>([$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Field(0))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Field(1))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Field(4)))])
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 0))).SetString("n")
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 1))).SetInt(3n)
	$.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 2))).SetBool(true)
	await $.println($.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 0))).String(), $.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 1))).Int(), $.markAsStructValue($.cloneStructValue($.arrayIndex(fields!, 2))).Bool(), it.value.Name, it.value.Count, it.value.On)
}

if ($.isMainScript(import.meta)) {
	await main()
}

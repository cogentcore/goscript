// Generated file based on slices_sortfunc.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"

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
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Age", key: "Age", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let people = $.arrayToSlice<Person>([new Person(true, "Charlie", 30), new Person(true, "Alice", 25), new Person(true, "Bob", 35)])

	slices.SortFunc(people, $.functionValue((a: Person, b: Person): number => {
		if (a.Age < b.Age) {
			return -1
		}
		if (a.Age > b.Age) {
			return 1
		}
		return 0
	}, ({ kind: $.TypeKind.Function, params: ["main.Person", "main.Person"], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))

	for (let __goscriptRangeTarget0 = people, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let p = ((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Person)).clone()
		await $.println(p.Name, p.Age)
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

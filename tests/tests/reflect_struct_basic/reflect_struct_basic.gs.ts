// Generated file based on reflect_struct_basic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/fmt/index.js"
import "@goscript/reflect/index.js"

export class Person {
	public declare Name: string

	public declare Age: number

	constructor(init?: Partial<{Name?: string, Age?: number}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Age = init?.Age ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Person {
		return new Person(this, true)
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

export async function main(): globalThis.Promise<void> {
	let p = new Person({Name: "Alice", Age: 30}, true)
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((p).clone(), "main.Person", "main.Person"))))
	if ($.markAsStructValue($.cloneStructValue(v)).Kind() == 25) {
		let f = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Field(0)))
		await fmt.Println($.markAsStructValue($.cloneStructValue(f)).String())
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

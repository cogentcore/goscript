// Generated file based on reflect_struct_basic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/fmt/index.js"
import "@goscript/reflect/index.js"

export class Person {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Age(): number {
		return this._fields.Age
	}

	public set Age(value: number) {
		this._fields.Age = value
	}

	public _fields: {
		Name: string
		Age: number
	}

	constructor(init?: Partial<{Name?: string, Age?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Age: init?.Age ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Person {
		return new Person(this, true)
	}

	public __goscriptAssign(source: Person): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Age = values.Age
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

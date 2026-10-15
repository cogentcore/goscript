// Generated file based on json_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class Person {
	public declare Name: string

	public declare Age: number

	public declare Active: boolean

	constructor(init?: Partial<{Name?: string, Age?: number, Active?: boolean}>, __goscriptValue?: boolean) {
		this.Name = init?.Name ?? ("" as string)
		this.Age = init?.Age ?? (0 as number)
		this.Active = init?.Active ?? (false as boolean)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Person {
		return new Person(this, true)
	}

	public __goscriptAssign(source: Person): this {
		this.Name = source.Name
		this.Age = source.Age
		this.Active = source.Active
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Person",
		() => new Person(),
		() => [],
		Person,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true, { tag: "json:\"name\"" }), /* @__PURE__ */ $.structField("Age", /* @__PURE__ */ $.basicType("int"), [1], 16, true, { tag: "json:\"age\"" }), /* @__PURE__ */ $.structField("Active", /* @__PURE__ */ $.basicType("bool"), [2], 24, true, { tag: "json:\"active\"" })]
	)
}

export async function main(): globalThis.Promise<void> {
	let p = new Person({Name: "Alice", Age: 30, Active: true}, true)
	let v = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue((p).clone(), "main.Person", "main.Person"))))
	let t = $.markAsStructValue($.cloneStructValue(v)).Type()

	await $.println("Type:", (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println("Kind:", reflect.Kind_String((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Kind(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)))
	await $.println("NumField:", (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	for (let i = 0; i < (__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).NumField(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait); i++) {
		let sf = $.markAsStructValue($.cloneStructValue(((__goscriptAwait = (t !== null && (t as any).__isVarRef !== true && (t as any).__goValue === undefined ? (t as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(t)).Field(i), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as reflect.StructField)))
		let fv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Field(i)))

		await $.println("Field", i, ":", sf.Name)
		await $.println("  FieldValue Kind:", reflect.Kind_String($.markAsStructValue($.cloneStructValue(fv)).Kind()))
		await $.println("  FieldValue CanInterface:", $.markAsStructValue($.cloneStructValue(fv)).CanInterface())

		switch ($.markAsStructValue($.cloneStructValue(fv)).Kind()) {
			case reflect.String:
			{
				await $.println("  Value:", $.markAsStructValue($.cloneStructValue(fv)).String())
				break
			}
			case reflect.Int:
			case reflect.Int8:
			case reflect.Int16:
			case reflect.Int32:
			case reflect.Int64:
			{
				await $.println("  Value:", $.markAsStructValue($.cloneStructValue(fv)).Int())
				break
			}
			case reflect.Bool:
			{
				await $.println("  Value:", $.markAsStructValue($.cloneStructValue(fv)).Bool())
				break
			}
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on json_marshal_basic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"

export class Person {
	public declare Name: string

	public declare Age: number

	public declare Active: boolean

	constructor(__goscriptValue?: boolean, Name$?: string, Age$?: number, Active$?: boolean) {
		this.Name = Name$ ?? ""
		this.Age = Age$ ?? 0
		this.Active = Active$ ?? false
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Person {
		return new Person(true, this.Name, this.Age, this.Active)
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
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string"), tag: "json:\"name\"" }, { name: "Age", key: "Age", type: /* @__PURE__ */ $.basicType("int"), tag: "json:\"age\"" }, { name: "Active", key: "Active", type: /* @__PURE__ */ $.basicType("bool"), tag: "json:\"active\"" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let p = new Person(true, "Alice", 30, true)
	let __goscriptTuple0: any = (json.Marshal($.interfaceValue(p, "main.Person", "main.Person")) as [$.Slice<number>, $.GoError])
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("Marshal error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Marshal:", $.bytesToString(b))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

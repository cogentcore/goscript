// Generated file based on json_marshal_basic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as json from "@goscript/encoding/json/index.js"
import "@goscript/encoding/json/index.js"

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

	public get Active(): boolean {
		return this._fields.Active
	}

	public set Active(value: boolean) {
		this._fields.Active = value
	}

	public _fields: {
		Name: string
		Age: number
		Active: boolean
	}

	constructor(init?: Partial<{Name?: string, Age?: number, Active?: boolean}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Age: init?.Age ?? (0 as number),
			Active: init?.Active ?? (false as boolean)
		}
	}

	public clone(): Person {
		return $.markAsStructValue(new Person(this))
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
	let p = $.markAsStructValue(new Person({Name: "Alice", Age: 30, Active: true}))
	let __goscriptTuple0: any = json.Marshal($.interfaceValue($.markAsStructValue($.cloneStructValue(p)), "main.Person", "main.Person"))
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	if (err != null) {
		await $.println("Marshal error:", (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(err).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	} else {
		await $.println("Marshal:", $.bytesToString(b))
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

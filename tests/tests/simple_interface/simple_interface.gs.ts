// Generated file based on simple_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.Value)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.Value = source.Value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let original = $.varRef(new MyStruct(true, 30))
	let pAlias = original

	let jAlias: any = $.interfaceValue(pAlias, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))

	let [, ok] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(jAlias, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("pointer assertion result:", ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}

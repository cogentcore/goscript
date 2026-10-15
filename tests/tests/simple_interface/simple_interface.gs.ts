// Generated file based on simple_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare Value: number

	constructor(init?: Partial<{Value?: number}>, __goscriptValue?: boolean) {
		this.Value = init?.Value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
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
	let original = $.varRef(new MyStruct({Value: 30}, true))
	let pAlias = original

	let jAlias: any = $.interfaceValue(pAlias, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))

	let [, ok] = $.typeAssertTuple<MyStruct | $.VarRef<MyStruct> | null>(jAlias, /* @__PURE__ */ $.pointerType("main.MyStruct"))
	await $.println("pointer assertion result:", ok)
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on reflect_unsafe_pointer_field_set.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as unsafe from "@goscript/unsafe/index.js"
import "@goscript/unsafe/index.js"

export class config {
	public declare Name: string

	public declare UsesCgo: boolean

	constructor(__goscriptValue?: boolean, Name$?: string, UsesCgo$?: boolean) {
		this.Name = Name$ ?? ""
		this.UsesCgo = UsesCgo$ ?? false
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): config {
		return new config(true, this.Name, this.UsesCgo)
	}

	public __goscriptAssign(source: config): this {
		this.Name = source.Name
		this.UsesCgo = source.UsesCgo
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.config",
		() => new config(),
		() => [],
		config,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("UsesCgo", /* @__PURE__ */ $.basicType("bool"), [1], 16, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	let c = new config(false, "x")
	let f = reflect.ValueOf($.interfaceValue(c, "*main.config", /* @__PURE__ */ $.pointerType("main.config"))).Elem().FieldByName("UsesCgo")
	$.unsafePointerRef<boolean>(f.Addr().UnsafePointer()).value = true
	await $.println($.pointerValue<config>(c).UsesCgo)

	let b = $.varRef(false)
	let p = (b as any)
	$.unsafePointerRef<boolean>(p).value = true
	await $.println(b.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

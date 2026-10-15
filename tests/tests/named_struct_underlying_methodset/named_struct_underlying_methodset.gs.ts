// Generated file based on named_struct_underlying_methodset.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Stringer = {
	String(): string
}

$.registerInterfaceType(
	"main.Stringer",
	null,
	[{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class Base {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Base {
		return new Base(true)
	}

	public __goscriptAssign(source: Base): this {
		return this
	}

	public String(): string {
		return "base"
	}

	static __typeInfo = $.registerStructType(
		"main.Base",
		() => new Base(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Base,
		() => []
	)
}

export class Derived {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Derived {
		return new Derived(true)
	}

	public __goscriptAssign(source: Derived): this {
		return this
	}

	public Own(): string {
		return "derived"
	}

	static __typeInfo = $.registerStructType(
		"main.Derived",
		() => new Derived(),
		() => [{ name: "Own", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Derived,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let base: any = $.interfaceValue(new Base(true), "main.Base", "main.Base")
	let [, baseOK] = $.typeAssertTuple<Stringer | null>(base, "main.Stringer")
	await $.println("base implements Stringer:", baseOK)

	let derived: any = $.interfaceValue(new Derived(true), "main.Derived", "main.Derived")
	let [, derivedOK] = $.typeAssertTuple<Stringer | null>(derived, "main.Stringer")
	await $.println("derived implements Stringer:", derivedOK)
}

if ($.isMainScript(import.meta)) {
	await main()
}

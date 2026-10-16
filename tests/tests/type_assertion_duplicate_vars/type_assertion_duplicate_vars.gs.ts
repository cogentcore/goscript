// Generated file based on type_assertion_duplicate_vars.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Interface = {
	Method(): string
}

$.registerInterfaceType(
	"main.Interface",
	null,
	[{ name: "Method", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class ConcreteA {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ConcreteA {
		return new ConcreteA(true)
	}

	public __goscriptAssign(source: ConcreteA): this {
		return this
	}

	public Method(): string {
		const c = this;
		return "A"
	}

	static __typeInfo = $.registerStructType(
		"main.ConcreteA",
		() => new ConcreteA(),
		() => [{ name: "Method", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		ConcreteA,
		() => []
	)
}

export class ConcreteB {
	constructor(__goscriptValue?: boolean) {
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): ConcreteB {
		return new ConcreteB(true)
	}

	public __goscriptAssign(source: ConcreteB): this {
		return this
	}

	public Method(): string {
		const c = this;
		return "B"
	}

	static __typeInfo = $.registerStructType(
		"main.ConcreteB",
		() => new ConcreteB(),
		() => [{ name: "Method", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		ConcreteB,
		() => []
	)
}

export class Container {
	public declare hasA: boolean

	public declare hasB: boolean

	constructor(__goscriptValue?: boolean, hasA$?: boolean, hasB$?: boolean) {
		this.hasA = hasA$ ?? false
		this.hasB = hasB$ ?? false
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Container {
		return new Container(true, this.hasA, this.hasB)
	}

	public __goscriptAssign(source: Container): this {
		this.hasA = source.hasA
		this.hasB = source.hasB
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Container",
		() => new Container(),
		() => [],
		Container,
		() => [{ name: "hasA", key: "hasA", type: /* @__PURE__ */ $.basicType("bool") }, { name: "hasB", key: "hasB", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let iface: Interface | null = $.structInterfaceValue<Interface | null>(new ConcreteA(true), "main.ConcreteA", "main.ConcreteA")

	let c = new Container()
	let c$: Container = c == null ? $.pointerTarget<Container>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<Container>(c)

	// Multiple type assertions that should generate unique variable names
	let __goscriptTuple0: any = $.typeAssertTuple<ConcreteA>(iface, "main.ConcreteA");
	;(c$ as Container).hasA = __goscriptTuple0[1]
	let __goscriptTuple1: any = $.typeAssertTuple<ConcreteB>(iface, "main.ConcreteB");
	;(c$ as Container).hasB = __goscriptTuple1[1]

	await $.println("hasA:", (c$ as Container).hasA)
	await $.println("hasB:", (c$ as Container).hasB)
}

if ($.isMainScript(import.meta)) {
	await main()
}

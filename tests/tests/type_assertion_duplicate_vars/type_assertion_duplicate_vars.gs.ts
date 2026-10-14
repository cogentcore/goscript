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
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): ConcreteA {
		return new ConcreteA(this, true)
	}

	public __goscriptAssign(source: ConcreteA): void {
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
	public _fields: {
	}

	constructor(init?: Partial<{}>, __goscriptValue?: boolean) {
		this._fields = {
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): ConcreteB {
		return new ConcreteB(this, true)
	}

	public __goscriptAssign(source: ConcreteB): void {
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
	public get hasA(): boolean {
		return this._fields.hasA
	}

	public set hasA(value: boolean) {
		this._fields.hasA = value
	}

	public get hasB(): boolean {
		return this._fields.hasB
	}

	public set hasB(value: boolean) {
		this._fields.hasB = value
	}

	public _fields: {
		hasA: boolean
		hasB: boolean
	}

	constructor(init?: Partial<{hasA?: boolean, hasB?: boolean}>, __goscriptValue?: boolean) {
		this._fields = {
			hasA: init?.hasA ?? (false as boolean),
			hasB: init?.hasB ?? (false as boolean)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Container {
		return new Container(this, true)
	}

	public __goscriptAssign(source: Container): void {
		const target = this._fields
		const values = source._fields
		target.hasA = values.hasA
		target.hasB = values.hasB
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
	let iface: Interface | null = $.interfaceValue<Interface | null>(new ConcreteA(undefined, true), "main.ConcreteA", "main.ConcreteA")

	let c: Container | $.VarRef<Container> | null = new Container()

	// Multiple type assertions that should generate unique variable names
	let __goscriptTuple0: any = $.typeAssertTuple<ConcreteA>(iface, "main.ConcreteA")
	$.pointerValue<Container>(c).hasA = __goscriptTuple0[1]
	let __goscriptTuple1: any = $.typeAssertTuple<ConcreteB>(iface, "main.ConcreteB")
	$.pointerValue<Container>(c).hasB = __goscriptTuple1[1]

	await $.println("hasA:", $.pointerValue<Container>(c).hasA)
	await $.println("hasB:", $.pointerValue<Container>(c).hasB)
}

if ($.isMainScript(import.meta)) {
	await main()
}

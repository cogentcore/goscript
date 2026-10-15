// Generated file based on embedded_interface_forwarding.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Adder = {
	Add(value: number): number
}

$.registerInterfaceType(
	"main.Adder",
	null,
	[{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class Box {
	public declare Adder: Adder | null

	constructor(init?: Partial<{Adder?: Adder | null}>, __goscriptValue?: boolean) {
		this.Adder = init?.Adder ?? (null! as Adder | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): this {
		this.Adder = $.assignFieldValue(this.Adder, source.Adder, "main.Adder")
		return this
	}

	public Add(value: any): any {
		return $.pointerValue<Exclude<Adder | null, null>>(this.Adder).Add(value)
	}

	static __typeInfo = $.registerStructType(
		"main.Box",
		() => new Box(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		Box,
		() => [{ name: "Adder", key: "Adder", type: "main.Adder", anonymous: true }]
	)
}

export class Counter {
	public declare base: number

	constructor(init?: Partial<{base?: number}>, __goscriptValue?: boolean) {
		this.base = init?.base ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Counter {
		return new Counter(this, true)
	}

	public __goscriptAssign(source: Counter): this {
		this.base = source.base
		return this
	}

	public Add(value: number): number {
		const c: Counter | $.VarRef<Counter> | null = this;
		return $.pointerValue<Counter>(c).base + value
	}

	static __typeInfo = $.registerStructType(
		"main.Counter",
		() => new Counter(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Counter,
		() => [{ name: "base", key: "base", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function call(adder: Adder | null): number {
	return (adder !== null && (adder as any).__isVarRef !== true && ((adder as any).__goValue === undefined || (adder as any).__goType?.charCodeAt(0) !== 42) ? (adder as Exclude<Adder, null>) : $.pointerValue<Exclude<Adder, null>>(adder)).Add(4)
}

export async function main(): globalThis.Promise<void> {
	let box = new Box({Adder: $.interfaceValue<Adder | null>(new Counter({base: 3}), "*main.Counter", /* @__PURE__ */ $.pointerType("main.Counter"))})
	await $.println($.pointerValue<Exclude<Adder, null>>($.pointerValue<Box>(box).Adder).Add(5))
	await $.println(call($.interfaceValue<Adder | null>(box, "*main.Box", /* @__PURE__ */ $.pointerType("main.Box"))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

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
	public get Adder(): Adder | null {
		return this._fields.Adder
	}

	public set Adder(value: Adder | null) {
		this._fields.Adder = value
	}

	public _fields: {
		Adder: Adder | null
	}

	constructor(init?: Partial<{Adder?: Adder | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Adder: init?.Adder ?? (null! as Adder | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): void {
		const target = this._fields
		const values = source._fields
		target.Adder = $.assignFieldValue(target.Adder, values.Adder, "main.Adder")
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
	public get base(): number {
		return this._fields.base
	}

	public set base(value: number) {
		this._fields.base = value
	}

	public _fields: {
		base: number
	}

	constructor(init?: Partial<{base?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			base: init?.base ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Counter {
		return new Counter(this, true)
	}

	public __goscriptAssign(source: Counter): void {
		const target = this._fields
		const values = source._fields
		target.base = values.base
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
	return (adder !== null && (adder as any).__isVarRef !== true && (adder as any).__goValue === undefined ? (adder as Exclude<Adder, null>) : $.pointerValue<Exclude<Adder, null>>(adder)).Add(4)
}

export async function main(): globalThis.Promise<void> {
	let box = new Box({Adder: $.interfaceValue<Adder | null>(new Counter({base: 3}), "*main.Counter", /* @__PURE__ */ $.pointerType("main.Counter"))})
	await $.println($.pointerValue<Exclude<Adder, null>>($.pointerValue<Box>(box).Adder).Add(5))
	await $.println(call($.interfaceValue<Adder | null>(box, "*main.Box", /* @__PURE__ */ $.pointerType("main.Box"))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

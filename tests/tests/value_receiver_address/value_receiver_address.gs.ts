// Generated file based on value_receiver_address.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Counter {
	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		value: number
	}

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			value: init?.value ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Counter {
		return new Counter(this, true)
	}

	public __goscriptAssign(source: Counter): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	public PointerAfterIncrement(): Counter | $.VarRef<Counter> | null {
		let c = $.varRef(this);
		c.value.value++
		return c
	}

	public Value(): number {
		const c: Counter | $.VarRef<Counter> | null = this;
		return $.pointerValue<Counter>(c).value
	}

	static __typeInfo = $.registerStructType(
		"main.Counter",
		() => new Counter(),
		() => [{ name: "PointerAfterIncrement", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.Counter") }] }, { name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		Counter,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let original = $.varRef(new Counter({value: 10}, true))
	let pointerFromValue: Counter | $.VarRef<Counter> | null = $.markAsStructValue($.cloneStructValue(original.value)).PointerAfterIncrement()

	await $.println("Value receiver pointer value:", Counter.prototype.Value.call(pointerFromValue))
	await $.println("Original after PointerAfterIncrement:", original.value.Value())
}

if ($.isMainScript(import.meta)) {
	await main()
}

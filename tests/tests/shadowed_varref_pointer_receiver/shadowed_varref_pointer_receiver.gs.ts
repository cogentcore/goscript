// Generated file based on shadowed_varref_pointer_receiver.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class locked {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): locked {
		return new locked(this, true)
	}

	public __goscriptAssign(source: locked): this {
		this.value = source.value
		return this
	}

	public Inc(): void {
		let l: locked | $.VarRef<locked> | null = this;
		const l$: locked = l == null ? $.pointerTarget<locked>(l) : (l as any).__isVarRef === true ? (l as any).value : (l as any).__goValue === undefined ? (l as any) : $.pointerTarget<locked>(l);
		;(l$ as locked).value++
	}

	public Value(): number {
		const l: locked | $.VarRef<locked> | null = this;
		return $.pointerValue<locked>(l).value
	}

	static __typeInfo = $.registerStructType(
		"main.locked",
		() => new locked(),
		() => [{ name: "Inc", args: [], returns: [], pointerReceiver: true }, { name: "Value", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		locked,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newLocked(value: number): locked {
	return new locked({value: value}, true)
}

export async function main(): globalThis.Promise<void> {
	let __goscriptShadow0 = $.varRef(newLocked(1))
	__goscriptShadow0.value.Inc()
	await $.println(__goscriptShadow0.value.Value())

	for (let __rangeIndex = 0; __rangeIndex < 1; __rangeIndex++) {
		let __goscriptShadow1 = $.varRef(newLocked(10))
		__goscriptShadow1.value.Inc()
		await $.println(__goscriptShadow1.value.Value())
	}

	await $.println(__goscriptShadow0.value.Value())
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on var_init_method_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class T {
	public declare val: number

	constructor(__goscriptValue?: boolean, val$?: number) {
		this.val = val$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): T {
		return new T(true, this.val)
	}

	public __goscriptAssign(source: T): this {
		this.val = source.val
		return this
	}

	public WithDelta(delta: number): T | $.VarRef<T> | null {
		const t: T | $.VarRef<T> | null = this;
		return new T(false, $.pointerValue<T>(t).val + delta)
	}

	static __typeInfo = $.registerStructType(
		"main.T",
		() => new T(),
		() => [{ name: "WithDelta", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.pointerType("main.T") }], pointerReceiver: true }],
		T,
		() => [{ name: "val", key: "val", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function NewT(v: number): T | $.VarRef<T> | null {
	return new T(false, v)
}

export let Base: T | $.VarRef<T> | null = NewT(10)

export function __goscript_set_Base(__goscriptValue: T | $.VarRef<T> | null): void {
	Base = __goscriptValue
}

export let Derived: T | $.VarRef<T> | null = (Base !== null && (Base as any).__isVarRef !== true && (Base as any).__goValue === undefined ? ((Base as any) as T).WithDelta(5) : T.prototype.WithDelta.call(Base, 5))

export function __goscript_set_Derived(__goscriptValue: T | $.VarRef<T> | null): void {
	Derived = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	await $.println("Base:", $.pointerValue<T>(Base).val)
	await $.println("Derived:", $.pointerValue<T>(Derived).val)
}

if ($.isMainScript(import.meta)) {
	await main()
}

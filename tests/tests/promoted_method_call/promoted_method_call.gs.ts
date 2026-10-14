// Generated file based on promoted_method_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class base {
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

	public clone(): base {
		return new base(this, true)
	}

	public __goscriptAssign(source: base): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
	}

	public Add(n: number): number {
		const b: base | $.VarRef<base> | null = this;
		return $.pointerValue<base>(b).value + n
	}

	static __typeInfo = $.registerStructType(
		"main.base",
		() => new base(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		base,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class wrapper {
	public get base(): base {
		return this._fields.base
	}

	public set base(value: base) {
		this._fields.base = value
	}

	public _fields: {
		base: base
	}

	constructor(init?: Partial<{base?: base}>, __goscriptValue?: boolean) {
		this._fields = {
			base: init?.base ? init.base.clone() : new base(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): wrapper {
		return new wrapper(this, true)
	}

	public __goscriptAssign(source: wrapper): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.base, values.base)
	}

	public Add(n: any): any {
		return $.pointerValue<base>(this.base).Add(n)
	}

	static __typeInfo = $.registerStructType(
		"main.wrapper",
		() => new wrapper(),
		() => [{ name: "Add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		wrapper,
		() => [{ name: "base", key: "base", type: "main.base", anonymous: true }]
	)
}

export async function main(): globalThis.Promise<void> {
	let w: wrapper | $.VarRef<wrapper> | null = new wrapper({base: new base({value: 3}, true)})
	await $.println($.pointerValue<wrapper>(w).base.Add(4))

	let add: ((n: number) => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => (n: number) => __receiver.Add(n))($.pointerValue<wrapper>(w).base), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.(*base).Add-fm")
	await $.println((__goscriptAwait = add!(5), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

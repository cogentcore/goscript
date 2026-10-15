// Generated file based on promoted_pointer_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class counter {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): counter {
		return new counter(this, true)
	}

	public __goscriptAssign(source: counter): this {
		this.value = source.value
		return this
	}

	public Load(): number {
		const c: counter | $.VarRef<counter> | null = this;
		return $.pointerValue<counter>(c).value
	}

	static __typeInfo = $.registerStructType(
		"main.counter",
		() => new counter(),
		() => [{ name: "Load", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		counter,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class inner {
	public declare name: string

	public declare count: counter

	constructor(init?: Partial<{name?: string, count?: counter}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		this.count = init?.count ? init.count.clone() : new counter(undefined, true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(this, true)
	}

	public __goscriptAssign(source: inner): this {
		this.name = source.name
		this.count.__goscriptAssign(source.count)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.inner",
		() => new inner(),
		() => [],
		inner,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }, { name: "count", key: "count", type: "main.counter" }]
	)
}

export class outer {
	public declare inner: inner | $.VarRef<inner> | null

	constructor(init?: Partial<{inner?: inner | $.VarRef<inner> | null}>, __goscriptValue?: boolean) {
		this.inner = init?.inner ?? (null! as inner | $.VarRef<inner> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(this, true)
	}

	public __goscriptAssign(source: outer): this {
		this.inner = source.inner
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [],
		outer,
		() => [{ name: "inner", key: "inner", type: /* @__PURE__ */ $.pointerType("main.inner"), anonymous: true }]
	)
}

export async function main(): globalThis.Promise<void> {
	let o = new outer({inner: new inner({name: "ready", count: new counter({value: 7}, true)})})
	let o$: outer = o == null ? $.pointerTarget<outer>(o) : (o as any).__isVarRef === true ? (o as any).value : (o as any).__goValue === undefined ? (o as any) : $.pointerTarget<outer>(o)

	await $.println("name:", $.pointerValue<inner>((o$ as outer).inner).name)
	$.pointerValue<inner>((o$ as outer).inner).name = "done"
	await $.println("renamed:", $.pointerValue<inner>((o$ as outer).inner).name, $.pointerValue<inner>((o$ as outer).inner).name)
	await $.println("count:", $.pointerValue<inner>((o$ as outer).inner).count.Load())
}

if ($.isMainScript(import.meta)) {
	await main()
}

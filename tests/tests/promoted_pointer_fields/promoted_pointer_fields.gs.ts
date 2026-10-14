// Generated file based on promoted_pointer_fields.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class counter {
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

	public clone(): counter {
		return new counter(this, true)
	}

	public __goscriptAssign(source: counter): void {
		const target = this._fields
		const values = source._fields
		target.value = values.value
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
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public get count(): counter {
		return this._fields.count
	}

	public set count(value: counter) {
		this._fields.count = value
	}

	public _fields: {
		name: string
		count: counter
	}

	constructor(init?: Partial<{name?: string, count?: counter}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string),
			count: init?.count ? init.count.clone() : new counter(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): inner {
		return new inner(this, true)
	}

	public __goscriptAssign(source: inner): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
		$.assignStruct(target.count, values.count)
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
	public get inner(): inner | $.VarRef<inner> | null {
		return this._fields.inner
	}

	public set inner(value: inner | $.VarRef<inner> | null) {
		this._fields.inner = value
	}

	public _fields: {
		inner: inner | $.VarRef<inner> | null
	}

	constructor(init?: Partial<{inner?: inner | $.VarRef<inner> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			inner: init?.inner ?? (null! as inner | $.VarRef<inner> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(this, true)
	}

	public __goscriptAssign(source: outer): void {
		const target = this._fields
		const values = source._fields
		target.inner = values.inner
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
	let o: outer | $.VarRef<outer> | null = new outer({inner: new inner({name: "ready", count: new counter({value: 7}, true)})})

	await $.println("name:", $.pointerValue<inner>($.pointerValue<outer>(o).inner).name)
	$.pointerValue<inner>($.pointerValue<outer>(o).inner).name = "done"
	await $.println("renamed:", $.pointerValue<inner>($.pointerValue<outer>(o).inner).name, $.pointerValue<inner>($.pointerValue<outer>(o).inner).name)
	await $.println("count:", $.pointerValue<inner>($.pointerValue<outer>(o).inner).count.Load())
}

if ($.isMainScript(import.meta)) {
	await main()
}

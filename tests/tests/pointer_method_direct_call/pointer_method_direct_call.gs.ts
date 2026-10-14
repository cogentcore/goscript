// Generated file based on pointer_method_direct_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type adder = {
	add(i: number): number
}

$.registerInterfaceType(
	"main.adder",
	null,
	[{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class counter {
	public get n(): number {
		return this._fields.n
	}

	public set n(value: number) {
		this._fields.n = value
	}

	public _fields: {
		n: number
	}

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			n: init?.n ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): counter {
		return new counter(this, true)
	}

	public __goscriptAssign(source: counter): void {
		const target = this._fields
		const values = source._fields
		target.n = values.n
	}

	public add(i: number): number {
		let c: counter | $.VarRef<counter> | null = this;
		const c$: counter = c == null ? $.pointerTarget<counter>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<counter>(c)
		if (c == null) {
			return -1
		}
		;(c$ as counter).n = (c$ as counter).n + (i)
		return (c$ as counter).n
	}

	public ["get"](): number {
		const c: counter | $.VarRef<counter> | null = this;
		return $.pointerValue<counter>(c).n
	}

	static __typeInfo = $.registerStructType(
		"main.counter",
		() => new counter(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		counter,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function next(c: counter | $.VarRef<counter> | null): counter | $.VarRef<counter> | null {
	if ($.pointerValue<counter>(c).n > 2) {
		return null
	}
	return c
}

export async function main(): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		// A pointer method is called directly on a plain struct pointer.
		let c: counter | $.VarRef<counter> | null = new counter()
		for (let i = 0; i < 4; i++) {
			void (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as unknown as counter).add(i) : counter.prototype.add.call(c, i))
		}
		await $.println((c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as unknown as counter)["get"]() : counter.prototype.get.call(c)))

		// A nil receiver still reaches the method.
		let nilc: counter | $.VarRef<counter> | null = null! as counter | $.VarRef<counter> | null
		await $.println((nilc !== null && (nilc as any).__isVarRef !== true && (nilc as any).__goValue === undefined ? (nilc as unknown as counter).add(5) : counter.prototype.add.call(nilc, 5)))

		// The arguments are evaluated once, whichever way the method is called.
		let calls = 0
		let arg: (() => number | globalThis.Promise<number>) | null = $.functionValue((): number => {
			calls++
			return 2
		}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
		await $.println((c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? (c as unknown as counter).add((__goscriptAwait = arg!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) : counter.prototype.add.call(c, (__goscriptAwait = arg!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))), (nilc !== null && (nilc as any).__isVarRef !== true && (nilc as any).__goValue === undefined ? (nilc as unknown as counter).add((__goscriptAwait = arg!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)) : counter.prototype.add.call(nilc, (__goscriptAwait = arg!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))), calls)

		// A pointer to a struct variable that a closure reassigns.
		let v: $.VarRef<counter> = $.varRef(new counter(undefined, true))
		let pv: counter | $.VarRef<counter> | null = v
		let reset: (() => void) | null = $.functionValue((): void => {
			v.value = $.assignStruct(v.value, new counter({n: 100}, true))
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
		void (pv !== null && (pv as any).__isVarRef !== true && (pv as any).__goValue === undefined ? (pv as unknown as counter).add(1) : counter.prototype.add.call(pv, 1))
		void (__goscriptAwait = reset!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		await $.println((pv !== null && (pv as any).__isVarRef !== true && (pv as any).__goValue === undefined ? (pv as unknown as counter).add(1) : counter.prototype.add.call(pv, 1)), v.value.n)

		// Interface calls on a struct pointer, and on a nil interface, which panics.
		let a: adder | null = $.interfaceValue<adder | null>(c, "*main.counter", /* @__PURE__ */ $.pointerType("main.counter"))
		await $.println((__goscriptAwait = (a !== null && (a as any).__isVarRef !== true && (a as any).__goValue === undefined ? (a as Exclude<adder, null>) : $.pointerValue<Exclude<adder, null>>(a)).add(10), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		a = $.interfaceValue<adder | null>(next(c), "*main.counter", /* @__PURE__ */ $.pointerType("main.counter"))
		__defer.defer(async () => { await (async (): globalThis.Promise<void> => {
			await $.println("recovered:", $.recover() != null)
		})() })
		let none: adder | null = null! as adder | null
		await $.println((__goscriptAwait = (none !== null && (none as any).__isVarRef !== true && (none as any).__goValue === undefined ? (none as Exclude<adder, null>) : $.pointerValue<Exclude<adder, null>>(none)).add(1), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

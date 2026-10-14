// Generated file based on defer_go_argument_evaluation.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export class R {
	public get A(): number {
		return this._fields.A
	}

	public set A(value: number) {
		this._fields.A = value
	}

	public get B(): number {
		return this._fields.B
	}

	public set B(value: number) {
		this._fields.B = value
	}

	public _fields: {
		A: number
		B: number
	}

	constructor(init?: Partial<{A?: number, B?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): R {
		return new R(this, true)
	}

	public __goscriptAssign(source: R): void {
		const target = this._fields
		const values = source._fields
		target.A = values.A
		target.B = values.B
	}

	public async Show(tag: string): globalThis.Promise<void> {
		const r = this;
		await $.println(tag, r.A, r.B)
	}

	public async ShowPtr(tag: string): globalThis.Promise<void> {
		const r: R | $.VarRef<R> | null = this;
		const r$: R = r == null ? $.pointerTarget<R>(r) : (r as any).__isVarRef === true ? (r as any).value : (r as any).__goValue === undefined ? (r as any) : $.pointerTarget<R>(r)
		await $.println(tag, (r$ as R).A, (r$ as R).B)
	}

	public Store(): void {
		const r = this;
		stored = (r.A * 10) + r.B
	}

	public Sum(): number {
		const r = this;
		return r.A + r.B
	}

	static __typeInfo = $.registerStructType(
		"main.R",
		() => new R(),
		() => [{ name: "Show", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }, { name: "ShowPtr", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "Store", args: [], returns: [] }, { name: "Sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		R,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("int") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function show(tag: string, r: R): globalThis.Promise<void> {
	await $.println(tag, r.A, r.B)
}

export let stored: number = 0

export function __goscript_set_stored(__goscriptValue: number): void {
	stored = __goscriptValue
}

export async function value(n: number): globalThis.Promise<number> {
	await $.println("evaluate", n)
	return n
}

export function pair(): [number, number] {
	return [7, 8]
}

export async function two(a: number, b: number): globalThis.Promise<void> {
	await $.println("two", a, b)
}

export async function deferred(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let r = new R({A: 1, B: 2}, true)
	let n = 3
	let f: ((tag: string) => void) | null = $.functionValue(async (tag: string): globalThis.Promise<void> => {
		await $.println(tag, "first function")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
	let p: R | $.VarRef<R> | null = new R({A: 10, B: 20})
	const __goscriptDeferArg0 = (r).clone()
	__defer.defer(async () => { await show("arg", __goscriptDeferArg0) })
	const __goscriptDeferCallee0 = $.functionValue(((__receiver) => (tag: string) => __receiver.Show(tag))($.markAsStructValue($.cloneStructValue(r))), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo), "main.R.Show-fm")
	__defer.defer(async () => { await __goscriptDeferCallee0("receiver") })
	const __goscriptDeferCallee1 = $.functionValue(((__receiver) => (tag: string) => __receiver.ShowPtr(tag))($.pointerValue<R>(p)), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo), "main.(*R).ShowPtr-fm")
	__defer.defer(async () => { await __goscriptDeferCallee1("pointer") })
	const __goscriptDeferCallee2 = f
	__defer.defer(async () => { (__goscriptAwait = __goscriptDeferCallee2!("function"), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) })
	let mu: $.VarRef<sync.Mutex> = $.varRef($.markAsStructValue(new sync.Mutex()))
	await mu.value.Lock()
	__defer.defer(() => { mu.value.Unlock() })
	let q: R | $.VarRef<R> | null = new R({A: 50, B: 60})
	__defer.defer(async () => { await R.prototype.ShowPtr.call(q, "fixed pointer") })
	const __goscriptDeferArg1 = n
	const __goscriptDeferArg2 = await value(4)
	__defer.defer(async () => { await $.println("println", __goscriptDeferArg1, __goscriptDeferArg2) })
	const __goscriptDeferArg3 = (pair() as [number, number])
	__defer.defer(async () => { await two(...__goscriptDeferArg3) })
	const __goscriptDeferArg4 = n
	__defer.defer(async () => { await (async (m: number): globalThis.Promise<void> => {
		await $.println("literal", m)
	})(__goscriptDeferArg4) })
	const __goscriptDeferCallee3 = $.functionValue(((__receiver) => () => __receiver.Store())($.markAsStructValue($.cloneStructValue(r))), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "main.R.Store-fm")
	__defer.defer(() => { __goscriptDeferCallee3() })
	let sum: (() => number | globalThis.Promise<number>) | null = $.functionValue(((__receiver) => () => __receiver.Sum())($.markAsStructValue($.cloneStructValue(r))), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.R.Sum-fm")
	r.A = 5
	n = 6
	f = $.functionValue(async (tag: string): globalThis.Promise<void> => {
		await $.println(tag, "second function")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
	p = new R({A: 30, B: 40})
	await $.println("body", r.A, n)
	await $.println("method value", (__goscriptAwait = sum!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

export async function main(): globalThis.Promise<void> {
	await deferred()
	await $.println("stored", stored)
	let wg: $.VarRef<sync.WaitGroup> = $.varRef($.markAsStructValue(new sync.WaitGroup()))
	wg.value.Add(1)
	let r = new R({A: 1, B: 2}, true)
	const __goscriptDeferArg5 = (r).clone()
	queueMicrotask(async () => { await (async (r: R): globalThis.Promise<void> => {
		await show("go", (r).clone())
		wg.value.Done()
	})(__goscriptDeferArg5) })
	r.A = 9
	await wg.value.Wait()
	r
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

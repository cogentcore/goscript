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

	constructor(init?: Partial<{A?: number, B?: number}>) {
		this._fields = {
			A: init?.A ?? (0 as number),
			B: init?.B ?? (0 as number)
		}
	}

	public clone(): R {
		return $.markAsStructValue(new R(this))
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
		await $.println(tag, $.pointerValue<R>(r).A, $.pointerValue<R>(r).B)
	}

	static __typeInfo = $.registerStructType(
		"main.R",
		() => new R(),
		() => [{ name: "Show", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }, { name: "ShowPtr", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		R,
		() => [{ name: "A", key: "A", type: /* @__PURE__ */ $.basicType("int") }, { name: "B", key: "B", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function show(tag: string, r: R): globalThis.Promise<void> {
	await $.println(tag, r.A, r.B)
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
	let r = $.markAsStructValue(new R({A: 1, B: 2}))
	let n = 3
	let f: ((tag: string) => void) | null = $.functionValue(async (tag: string): globalThis.Promise<void> => {
		await $.println(tag, "first function")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
	let p: R | $.VarRef<R> | null = new R({A: 10, B: 20})
	const __goscriptDeferArg0 = $.markAsStructValue($.cloneStructValue(r))
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
	r.A = 5
	n = 6
	f = $.functionValue(async (tag: string): globalThis.Promise<void> => {
		await $.println(tag, "second function")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [] } as $.FunctionTypeInfo))
	p = new R({A: 30, B: 40})
	await $.println("body", r.A, n)
}

export async function main(): globalThis.Promise<void> {
	await deferred()
	let wg: $.VarRef<sync.WaitGroup> = $.varRef($.markAsStructValue(new sync.WaitGroup()))
	wg.value.Add(1)
	let r = $.markAsStructValue(new R({A: 1, B: 2}))
	const __goscriptDeferArg5 = $.markAsStructValue($.cloneStructValue(r))
	queueMicrotask(async () => { await (async (r: R): globalThis.Promise<void> => {
		await show("go", $.markAsStructValue($.cloneStructValue(r)))
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

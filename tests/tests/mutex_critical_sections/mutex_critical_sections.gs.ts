// Generated file based on mutex_critical_sections.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export class counter {
	public declare mu: sync.Mutex

	public declare n: number

	constructor(init?: Partial<{mu?: sync.Mutex, n?: number}>, __goscriptValue?: boolean) {
		this.mu = init?.mu ? $.markAsStructValue($.cloneStructValue(init.mu)) : $.markAsStructValue(new sync.Mutex())
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): counter {
		return new counter(this, true)
	}

	public __goscriptAssign(source: counter): this {
		$.assignStruct(this.mu, source.mu)
		this.n = source.n
		return this
	}

	public add(k: number): void {
		let c: counter | $.VarRef<counter> | null = this;
		const c$: counter = c == null ? $.pointerTarget<counter>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<counter>(c)
		void (c$ as counter).mu.Lock();
		;(c$ as counter).n += k
		void (c$ as counter).mu.Unlock()
	}

	public ["get"](): number {
		const c: counter | $.VarRef<counter> | null = this;
		using __defer = new $.DisposableStack()
		const c$: counter = c == null ? $.pointerTarget<counter>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<counter>(c)
		void (c$ as counter).mu.Lock()
		const __goscriptDeferCallee0 = $.functionValue(((__receiver) => () => __receiver.Unlock())((c$ as counter).mu), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
		__defer.defer(() => { __goscriptDeferCallee0() })
		return (c$ as counter).n
	}

	static __typeInfo = $.registerStructType(
		"main.counter",
		() => new counter(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		counter,
		() => [{ name: "mu", key: "mu", type: "sync.Mutex" }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class queue {
	public declare mu: sync.Mutex

	public declare items: $.Slice<number>

	public declare ready: $.Channel<number> | null

	constructor(init?: Partial<{mu?: sync.Mutex, items?: $.Slice<number>, ready?: $.Channel<number> | null}>, __goscriptValue?: boolean) {
		this.mu = init?.mu ? $.markAsStructValue($.cloneStructValue(init.mu)) : $.markAsStructValue(new sync.Mutex())
		this.items = init?.items ?? (null! as $.Slice<number>)
		this.ready = init?.ready ?? (null! as $.Channel<number> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): queue {
		return new queue(this, true)
	}

	public __goscriptAssign(source: queue): this {
		$.assignStruct(this.mu, source.mu)
		this.items = source.items
		this.ready = source.ready
		return this
	}

	public async push(v: number): globalThis.Promise<void> {
		let q: queue | $.VarRef<queue> | null = this;
		const q$: queue = q == null ? $.pointerTarget<queue>(q) : (q as any).__isVarRef === true ? (q as any).value : (q as any).__goValue === undefined ? (q as any) : $.pointerTarget<queue>(q)
		await (q$ as queue).mu.Lock();
		;(q$ as queue).items = $.appendOne((q$ as queue).items, v)
		await $.chanSend((q$ as queue).ready, v)
		void (q$ as queue).mu.Unlock()
	}

	public async size(): globalThis.Promise<number> {
		const q: queue | $.VarRef<queue> | null = this;
		using __defer = new $.DisposableStack()
		const q$: queue = q == null ? $.pointerTarget<queue>(q) : (q as any).__isVarRef === true ? (q as any).value : (q as any).__goValue === undefined ? (q as any) : $.pointerTarget<queue>(q)
		await (q$ as queue).mu.Lock()
		const __goscriptDeferCallee1 = $.functionValue(((__receiver) => () => __receiver.Unlock())((q$ as queue).mu), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
		__defer.defer(() => { __goscriptDeferCallee1() })
		return $.sliceLen((q$ as queue).items)
	}

	static __typeInfo = $.registerStructType(
		"main.queue",
		() => new queue(),
		() => [{ name: "push", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		queue,
		() => [{ name: "mu", key: "mu", type: "sync.Mutex" }, { name: "items", key: "items", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }, { name: "ready", key: "ready", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("int"), "both") }]
	)
}

export class shared {
	public declare mu: sync.Mutex

	public declare n: number

	constructor(init?: Partial<{mu?: sync.Mutex, n?: number}>, __goscriptValue?: boolean) {
		this.mu = init?.mu ? $.markAsStructValue($.cloneStructValue(init.mu)) : $.markAsStructValue(new sync.Mutex())
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): shared {
		return new shared(this, true)
	}

	public __goscriptAssign(source: shared): this {
		$.assignStruct(this.mu, source.mu)
		this.n = source.n
		return this
	}

	public async inc(): globalThis.Promise<void> {
		let s: shared | $.VarRef<shared> | null = this;
		const s$: shared = s == null ? $.pointerTarget<shared>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<shared>(s)
		await (s$ as shared).mu.Lock();
		;(s$ as shared).n++
		void (s$ as shared).mu.Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.shared",
		() => new shared(),
		() => [{ name: "inc", args: [], returns: [], pointerReceiver: true }],
		shared,
		() => [{ name: "mu", key: "mu", type: "sync.Mutex" }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let registryMu = $.varRef($.markAsStructValue(new sync.RWMutex()))

export function __goscript_set_registryMu(__goscriptValue: sync.RWMutex): void {
	$.assignStruct(registryMu.value, __goscriptValue)
}

export let registry: globalThis.Map<string, number> | null = $.makeMap<string, number>([])

export function __goscript_set_registry(__goscriptValue: globalThis.Map<string, number> | null): void {
	registry = __goscriptValue
}

export function register(name: string, v: number): void {
	using __defer = new $.DisposableStack()
	registryMu.value.Lock()
	const __goscriptDeferCallee2 = $.functionValue(((__receiver) => () => __receiver.Unlock())(registryMu.value), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*RWMutex).Unlock-fm")
	__defer.defer(() => { __goscriptDeferCallee2() })
	$.mapSet(registry, name, v)
}

export function lookup(name: string): number {
	registryMu.value.RLock()
	let v = $.mapGet<string, number, number>(registry, name, 0)[0]
	registryMu.value.RUnlock()
	return v
}

export async function lockWith(mu: sync.Mutex | $.VarRef<sync.Mutex> | null, f: (() => void) | null): globalThis.Promise<void> {
	using __defer = new $.DisposableStack()
	await sync.Mutex.prototype.Lock.call($.pointerValue<sync.Mutex>(mu))
	const __goscriptDeferCallee3 = $.functionValue(((__receiver) => () => __receiver.Unlock())($.pointerValue<sync.Mutex>(mu)), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*Mutex).Unlock-fm")
	__defer.defer(() => { __goscriptDeferCallee3() })
	f!()
}

export let setupOnce = $.varRef($.markAsStructValue(new sync.Once()))

export function __goscript_set_setupOnce(__goscriptValue: sync.Once): void {
	$.assignStruct(setupOnce.value, __goscriptValue)
}

export let setupDone = 0

export function __goscript_set_setupDone(__goscriptValue: number): void {
	setupDone = __goscriptValue
}

export let cache = $.varRef($.markAsStructValue(new sync.Map()))

export function __goscript_set_cache(__goscriptValue: sync.Map): void {
	$.assignStruct(cache.value, __goscriptValue)
}

export function setup(): number {
	setupOnce.value.Do($.functionValue(() => {
		setupDone++
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	return setupDone
}

export function cached(k: string): number {
	{
		let [v, ok] = cache.value.Load(k)
		if (ok) {
			return $.mustTypeAssert<number>(v, /* @__PURE__ */ $.basicType("int"))
		}
	}
	cache.value.Store(k, $.basicInterfaceValue($.stringLen(k), "int"))
	return $.stringLen(k)
}

export function cacheSize(): number {
	let n = 0
	cache.value.Range($.functionValue((k: any, v: any): boolean => {
		n++
		return true
	}, ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }, { kind: $.TypeKind.Interface, methods: [] }], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))
	return n
}

export let total = 0

export function __goscript_set_total(__goscriptValue: number): void {
	total = __goscriptValue
}

export async function sumAll(ch: $.Channel<number> | null, wg: sync.WaitGroup | $.VarRef<sync.WaitGroup> | null): globalThis.Promise<void> {
	queueMicrotask(async () => {
		using __defer = new $.DisposableStack()
		const __goscriptDeferCallee4 = $.functionValue(((__receiver) => () => __receiver.Done())($.pointerValue<sync.WaitGroup>(wg)), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "sync.(*WaitGroup).Done-fm")
		__defer.defer(() => { __goscriptDeferCallee4() })
		while (true) {
			let __goscriptRange0 = await $.chanRecvWithOk(ch)
			if (!__goscriptRange0.ok) {
				break
			}
			let v = __goscriptRange0.value
			total += v
		}
	})
}

export async function main(): globalThis.Promise<void> {
	let c = new counter()
	void (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as counter).add(2) : counter.prototype.add.call(c, 2))
	void (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as counter).add(3) : counter.prototype.add.call(c, 3))
	await $.println("counter:", (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as counter)["get"]() : counter.prototype.get.call(c)))

	let q = new queue({ready: $.makeChannel<number>(1, 0, "both")})
	let wg = $.varRef($.markAsStructValue(new sync.WaitGroup()))
	wg.value.Add(1)
	queueMicrotask(async () => {
		await using __defer = new $.AsyncDisposableStack()
		__defer.defer(() => { wg.value.Done() })
		await $.println("received:", await $.chanRecv($.pointerValue<queue>(q).ready))
	})
	await (q !== null && (q as any).__isVarRef !== true && (q as any).__goValue === undefined ? ((q as any) as queue).push(7) : queue.prototype.push.call(q, 7))
	await wg.value.Wait()
	await $.println("queue:", await (q !== null && (q as any).__isVarRef !== true && (q as any).__goValue === undefined ? ((q as any) as queue).size() : queue.prototype.size.call(q)))

	register("a", 1)
	register("b", 2)
	await $.println("lookup:", lookup("a") + lookup("b"))

	let s = new shared()
	let s$: shared = s == null ? $.pointerTarget<shared>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<shared>(s)
	await (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as shared).inc() : shared.prototype.inc.call(s))
	await lockWith($.fieldRef((s$ as shared), "mu"), $.functionValue(() => {
		;(s$ as shared).n += 10
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("shared:", (s$ as shared).n)

	await $.println("setup:", setup(), setup())
	await $.println("cached:", cached("abc"), cached("abc"), cacheSize())

	let ch = $.makeChannel<number>(0, 0, "both")
	let sums = $.varRef($.markAsStructValue(new sync.WaitGroup()))
	sums.value.Add(1)
	await sumAll(ch, sums)
	await $.chanSend(ch, 1)
	await $.chanSend(ch, 2)
	ch.close()
	await sums.value.Wait()
	await $.println("total:", total)
}

if ($.isMainScript(import.meta)) {
	await main()
}

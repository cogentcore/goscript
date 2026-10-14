// Generated file based on package_import_sync.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export class embeddedMutex {
	public get Mutex(): sync.Mutex {
		return this._fields.Mutex
	}

	public set Mutex(value: sync.Mutex) {
		this._fields.Mutex = value
	}

	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		Mutex: sync.Mutex
		value: number
	}

	constructor(init?: Partial<{Mutex?: sync.Mutex, value?: number}>) {
		this._fields = {
			Mutex: init?.Mutex ? $.markAsStructValue($.cloneStructValue(init.Mutex)) : $.markAsStructValue(new sync.Mutex()),
			value: init?.value ?? (0 as number)
		}
	}

	public clone(): embeddedMutex {
		return $.markAsStructValue(new embeddedMutex(this))
	}

	public Lock(): any {
		return $.pointerValue<sync.Mutex>(this.Mutex).Lock()
	}

	public TryLock(): any {
		return $.pointerValue<sync.Mutex>(this.Mutex).TryLock()
	}

	public Unlock(): any {
		return $.pointerValue<sync.Mutex>(this.Mutex).Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.embeddedMutex",
		() => new embeddedMutex(),
		() => [{ name: "Lock", args: [], returns: [], pointerReceiver: true }, { name: "TryLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unlock", args: [], returns: [], pointerReceiver: true }],
		embeddedMutex,
		() => [{ name: "Mutex", key: "Mutex", type: "sync.Mutex", anonymous: true }, { name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class embeddedRWMutex {
	public get RWMutex(): sync.RWMutex {
		return this._fields.RWMutex
	}

	public set RWMutex(value: sync.RWMutex) {
		this._fields.RWMutex = value
	}

	public get value(): number {
		return this._fields.value
	}

	public set value(value: number) {
		this._fields.value = value
	}

	public _fields: {
		RWMutex: sync.RWMutex
		value: number
	}

	constructor(init?: Partial<{RWMutex?: sync.RWMutex, value?: number}>) {
		this._fields = {
			RWMutex: init?.RWMutex ? $.markAsStructValue($.cloneStructValue(init.RWMutex)) : $.markAsStructValue(new sync.RWMutex()),
			value: init?.value ?? (0 as number)
		}
	}

	public clone(): embeddedRWMutex {
		return $.markAsStructValue(new embeddedRWMutex(this))
	}

	public Lock(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).Lock()
	}

	public RLock(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).RLock()
	}

	public RLocker(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).RLocker()
	}

	public RUnlock(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).RUnlock()
	}

	public TryLock(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).TryLock()
	}

	public TryRLock(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).TryRLock()
	}

	public Unlock(): any {
		return $.pointerValue<sync.RWMutex>(this.RWMutex).Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.embeddedRWMutex",
		() => new embeddedRWMutex(),
		() => [{ name: "Lock", args: [], returns: [], pointerReceiver: true }, { name: "RLock", args: [], returns: [], pointerReceiver: true }, { name: "RLocker", args: [], returns: [{ type: "sync.Locker" }], pointerReceiver: true }, { name: "RUnlock", args: [], returns: [], pointerReceiver: true }, { name: "TryLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "TryRLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unlock", args: [], returns: [], pointerReceiver: true }],
		embeddedRWMutex,
		() => [{ name: "RWMutex", key: "RWMutex", type: "sync.RWMutex", anonymous: true }, { name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class queue {
	public get Mu(): sync.Mutex {
		return this._fields.Mu
	}

	public set Mu(value: sync.Mutex) {
		this._fields.Mu = value
	}

	public get Cond(): sync.Cond {
		return this._fields.Cond
	}

	public set Cond(value: sync.Cond) {
		this._fields.Cond = value
	}

	public get items(): $.Slice<number> {
		return this._fields.items
	}

	public set items(value: $.Slice<number>) {
		this._fields.items = value
	}

	public _fields: {
		Mu: sync.Mutex
		Cond: sync.Cond
		items: $.Slice<number>
	}

	constructor(init?: Partial<{Mu?: sync.Mutex, Cond?: sync.Cond, items?: $.Slice<number>}>) {
		this._fields = {
			Mu: init?.Mu ? $.markAsStructValue($.cloneStructValue(init.Mu)) : $.markAsStructValue(new sync.Mutex()),
			Cond: init?.Cond ? $.markAsStructValue($.cloneStructValue(init.Cond)) : $.markAsStructValue(new sync.Cond()),
			items: init?.items ?? (null! as $.Slice<number>)
		}
	}

	public clone(): queue {
		return $.markAsStructValue(new queue(this))
	}

	public async lockAndInit(): globalThis.Promise<void> {
		let q: queue | $.VarRef<queue> | null = this;
		await $.pointerValue<queue>(q).Mu.Lock()
		if ($.pointerValue<queue>(q).Cond.L == null) {
			$.pointerValue<queue>(q).Cond.L = $.interfaceValue<sync.Locker | null>($.fieldRef($.pointerValue<queue>(q)._fields, "Mu"), "*sync.Mutex", /* @__PURE__ */ $.pointerType("sync.Mutex"))
		}
	}

	public async pop(): globalThis.Promise<number> {
		let q: queue | $.VarRef<queue> | null = this;
		using __defer = new $.DisposableStack()
		await queue.prototype.lockAndInit.call(q)
		__defer.defer(() => { $.pointerValue<queue>(q).Mu.Unlock() })
		while ($.len($.pointerValue<queue>(q).items) == 0) {
			await $.pointerValue<queue>(q).Cond.Wait()
		}
		let v = $.arrayIndex($.pointerValue<queue>(q).items!, 0)
		$.pointerValue<queue>(q).items = $.goSlice($.pointerValue<queue>(q).items, 1, undefined)
		return v
	}

	public async push(v: number): globalThis.Promise<void> {
		let q: queue | $.VarRef<queue> | null = this;
		await queue.prototype.lockAndInit.call(q)
		$.pointerValue<queue>(q).items = $.append($.pointerValue<queue>(q).items, v)
		$.pointerValue<queue>(q).Cond.Signal()
		$.pointerValue<queue>(q).Mu.Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.queue",
		() => new queue(),
		() => [{ name: "lockAndInit", args: [], returns: [], pointerReceiver: true }, { name: "pop", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "push", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		queue,
		() => [{ name: "Mu", key: "Mu", type: "sync.Mutex" }, { name: "Cond", key: "Cond", type: "sync.Cond" }, { name: "items", key: "items", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Test Mutex
	let mu: $.VarRef<sync.Mutex> = $.varRef($.markAsStructValue(new sync.Mutex()))
	await mu.value.Lock()
	await $.println("Mutex locked")
	mu.value.Unlock()
	await $.println("Mutex unlocked")

	let embedded: $.VarRef<embeddedMutex> = $.varRef($.markAsStructValue(new embeddedMutex()))
	await embedded.value.Mutex.Lock()
	embedded.value.value = 7
	embedded.value.Mutex.Unlock()
	await $.println("Embedded Mutex value:", embedded.value.value)

	let embeddedRW: $.VarRef<embeddedRWMutex> = $.varRef($.markAsStructValue(new embeddedRWMutex()))
	await embeddedRW.value.RWMutex.RLock()
	await $.println("Embedded RWMutex read lock")
	embeddedRW.value.RWMutex.RUnlock()
	await embeddedRW.value.RWMutex.Lock()
	embeddedRW.value.value = 9
	embeddedRW.value.RWMutex.Unlock()
	await $.println("Embedded RWMutex value:", embeddedRW.value.value)

	// Test TryLock
	if (mu.value.TryLock()) {
		await $.println("TryLock succeeded")
		mu.value.Unlock()
	} else {
		await $.println("TryLock failed")
	}

	// Test WaitGroup
	let wg: $.VarRef<sync.WaitGroup> = $.varRef($.markAsStructValue(new sync.WaitGroup()))
	wg.value.Add(1)
	await $.println("WaitGroup counter set to 1")
	wg.value.Done()
	await $.println("WaitGroup counter decremented")
	await wg.value.Wait()
	await $.println("WaitGroup wait completed")

	// Test Once
	let once: $.VarRef<sync.Once> = $.varRef($.markAsStructValue(new sync.Once()))
	let counter = 0
	await once.value.Do($.functionValue(async (): globalThis.Promise<void> => {
		counter++
		await $.println("Once function executed, counter:", counter)
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await once.value.Do($.functionValue(async (): globalThis.Promise<void> => {
		counter++
		await $.println("This should not execute")
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("Final counter:", counter)

	// Test OnceFunc
	let onceFunc: (() => void) | null = sync.OnceFunc($.functionValue(async (): globalThis.Promise<void> => {
		await $.println("OnceFunc executed")
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await onceFunc!()
	await onceFunc!()

	// Test OnceValue
	let onceValue: (() => number | globalThis.Promise<number>) | null = (sync.OnceValue($.functionValue(async (): globalThis.Promise<number> => {
		await $.println("OnceValue function executed")
		return 42
	}, ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))) as (() => number | globalThis.Promise<number>) | null)
	let val1 = await onceValue!()
	let val2 = await onceValue!()
	await $.println("OnceValue results:", val1, val2)

	// Test sync.Map
	let m: $.VarRef<sync.Map> = $.varRef($.markAsStructValue(new sync.Map()))
	await m.value.Store("key1", "value1")
	await $.println("Stored key1")

	{
		let [val, ok] = await m.value.Load("key1")
		if (ok) {
			await $.println("Loaded key1:", val)
		}
	}

	{
		let [val, loaded] = await m.value.LoadOrStore("key2", "value2")
		if (!loaded) {
			await $.println("Stored key2:", val)
		}
	}

	{
		let [val, loaded] = await m.value.Swap("key2", "value3")
		if (loaded) {
			await $.println("Swapped key2 previous:", val)
		}
	}
	{
		let [val, ok] = await m.value.Load("key2")
		if (ok) {
			await $.println("Loaded key2 after swap:", val)
		}
	}
	if (!await m.value.CompareAndDelete("key2", "other")) {
		await $.println("CompareAndDelete mismatch preserved key2")
	}
	if (await m.value.CompareAndDelete("key2", "value3")) {
		await $.println("CompareAndDelete removed key2")
	}
	{
		let [, ok] = await m.value.Load("key2")
		if (!ok) {
			await $.println("key2 compare deleted successfully")
		}
	}

	await m.value.Range($.functionValue(async (key: any, value: any): globalThis.Promise<boolean> => {
		await $.println("Range:", key, "->", value)
		return true
	}, ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }, { kind: $.TypeKind.Interface, methods: [] }], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))

	await m.value.Delete("key1")
	{
		let [, ok] = await m.value.Load("key1")
		if (!ok) {
			await $.println("key1 deleted successfully")
		}
	}

	// Test Pool
	let pool: sync.Pool | $.VarRef<sync.Pool> | null = new sync.Pool({New: $.functionValue(async (): globalThis.Promise<any> => {
		await $.println("Pool creating new object")
		return "new object"
	}, ({ kind: $.TypeKind.Function, params: [], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))})

	let obj1 = await sync.Pool.prototype.Get.call($.pointerValue<sync.Pool>(pool))
	await $.println("Got from pool:", obj1)
	sync.Pool.prototype.Put.call($.pointerValue<sync.Pool>(pool), "reused object")
	let obj2 = await sync.Pool.prototype.Get.call($.pointerValue<sync.Pool>(pool))
	await $.println("Got from pool:", obj2)

	await condZeroValue()

	await $.println("test finished")
}

export async function condZeroValue(): globalThis.Promise<void> {
	let zero: sync.Cond = $.markAsStructValue(new sync.Cond())
	await $.println("zero L is nil:", zero.L == null)

	// The consumer starts first and each push waits for its pop to print,
	// so that the consumer waits on the Cond for every value.
	let q: queue | $.VarRef<queue> | null = new queue()
	let started: $.Channel<boolean> | null = $.makeChannel<boolean>(0, false, "both")
	let results: $.Channel<number> | null = $.makeChannel<number>(0, 0, "both")
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		await $.chanSend(started, true)
		for (let __rangeIndex = 0; __rangeIndex < 3; __rangeIndex++) {
			await $.chanSend(results, await queue.prototype.pop.call(q))
		}
	})() })
	await $.chanRecv(started)
	for (let i = 1; i <= 3; i++) {
		await queue.prototype.push.call(q, i * 10)
		await $.println("got:", await $.chanRecv(results))
	}

	let c: sync.Cond | $.VarRef<sync.Cond> | null = sync.NewCond($.pointerValueOrNil($.interfaceValue<sync.Locker | null>(new sync.Mutex(), "*sync.Mutex", /* @__PURE__ */ $.pointerType("sync.Mutex")))!)
	await $.println("NewCond L is nil:", $.pointerValue<sync.Cond>(c).L == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

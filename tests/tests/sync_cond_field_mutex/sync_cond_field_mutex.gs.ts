// Generated file based on sync_cond_field_mutex.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export class Deque {
	public declare Mu: sync.Mutex

	public declare Cond: sync.Cond

	public declare Items: $.Slice<number>

	public _fields: {
		Mu: sync.Mutex
		Cond: sync.Cond
		Items: $.Slice<number>
	}

	constructor(init?: Partial<{Mu?: sync.Mutex, Cond?: sync.Cond, Items?: $.Slice<number>}>) {
		this._fields = {
			Mu: init?.Mu ? $.markAsStructValue($.cloneStructValue(init.Mu)) : $.markAsStructValue(new sync.Mutex()),
			Cond: init?.Cond ? $.markAsStructValue($.cloneStructValue(init.Cond)) : $.markAsStructValue(new sync.Cond()),
			Items: init?.Items ?? (null! as $.Slice<number>)
		}
	}

	public clone(): Deque {
		return $.markAsStructValue(new Deque(this))
	}

	public async Next(): globalThis.Promise<number> {
		let q: Deque | $.VarRef<Deque> | null = this;
		using __defer = new $.DisposableStack()
		await Deque.prototype.lockAndInit.call(q)
		__defer.defer(() => { $.pointerValue<Deque>(q).Mu.Unlock() })
		while ($.len($.pointerValue<Deque>(q).Items) == 0) {
			await $.pointerValue<Deque>(q).Cond.Wait()
		}
		let it = $.arrayIndex($.pointerValue<Deque>(q).Items!, 0)
		$.pointerValue<Deque>(q).Items = $.goSlice($.pointerValue<Deque>(q).Items, 1, undefined)
		return it
	}

	public async Send(it: number): globalThis.Promise<void> {
		let q: Deque | $.VarRef<Deque> | null = this;
		await Deque.prototype.lockAndInit.call(q)
		$.pointerValue<Deque>(q).Items = $.append($.pointerValue<Deque>(q).Items, it)
		$.pointerValue<Deque>(q).Cond.Signal()
		$.pointerValue<Deque>(q).Mu.Unlock()
	}

	public async lockAndInit(): globalThis.Promise<void> {
		let q: Deque | $.VarRef<Deque> | null = this;
		await $.pointerValue<Deque>(q).Mu.Lock()
		if ($.pointerValue<Deque>(q).Cond.L == null) {
			$.pointerValue<Deque>(q).Cond.L = $.interfaceValue<sync.Locker | null>($.fieldRef($.pointerValue<Deque>(q)._fields, "Mu"), "*sync.Mutex", /* @__PURE__ */ $.pointerType("sync.Mutex"))
		}
	}

	static {
		$.bindStructFields(this.prototype, ["Mu", "Cond", "Items"])
	}

	static __typeInfo = $.registerStructType(
		"main.Deque",
		() => new Deque(),
		() => [{ name: "Next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "Send", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "lockAndInit", args: [], returns: [], pointerReceiver: true }],
		Deque,
		() => [{ name: "Mu", key: "Mu", type: "sync.Mutex" }, { name: "Cond", key: "Cond", type: "sync.Cond" }, { name: "Items", key: "Items", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export class Events {
	public declare Deque: Deque

	public _fields: {
		Deque: Deque
	}

	constructor(init?: Partial<{Deque?: Deque}>) {
		this._fields = {
			Deque: init?.Deque ? $.markAsStructValue($.cloneStructValue(init.Deque)) : $.markAsStructValue(new Deque())
		}
	}

	public clone(): Events {
		return $.markAsStructValue(new Events(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Deque"])
	}

	static __typeInfo = $.registerStructType(
		"main.Events",
		() => new Events(),
		() => [],
		Events,
		() => [{ name: "Deque", key: "Deque", type: "main.Deque" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let ev: Events | $.VarRef<Events> | null = new Events()
	let started: $.Channel<boolean> | null = $.makeChannel<boolean>(0, false, "both")
	let results: $.Channel<number> | null = $.makeChannel<number>(0, 0, "both")
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		await $.chanSend(started, true)
		for (let i = 0; i < 3; i++) {
			await $.chanSend(results, await $.pointerValue<Events>(ev).Deque.Next())
		}
	})() })
	await $.chanRecv(started)
	for (let i = 1; i <= 3; i++) {
		await $.pointerValue<Events>(ev).Deque.Send(i * 10)
		await $.println("got:", await $.chanRecv(results))
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

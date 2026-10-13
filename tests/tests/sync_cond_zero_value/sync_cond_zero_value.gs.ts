// Generated file based on sync_cond_zero_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export class queue {
	public declare Mu: sync.Mutex

	public declare Cond: sync.Cond

	public declare items: $.Slice<number>

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

	public init(): void {
		let q: queue | $.VarRef<queue> | null = this;
		if ($.pointerValue<queue>(q).Cond.L == null) {
			$.pointerValue<queue>(q).Cond.L = $.interfaceValue<sync.Locker | null>($.fieldRef($.pointerValue<queue>(q)._fields, "Mu"), "*sync.Mutex", /* @__PURE__ */ $.pointerType("sync.Mutex"))
		}
	}

	public async pop(): globalThis.Promise<number> {
		let q: queue | $.VarRef<queue> | null = this;
		await $.pointerValue<queue>(q).Mu.Lock()
		queue.prototype.init.call(q)
		while ($.len($.pointerValue<queue>(q).items) == 0) {
			await $.pointerValue<queue>(q).Cond.Wait()
		}
		let v = $.arrayIndex($.pointerValue<queue>(q).items!, 0)
		$.pointerValue<queue>(q).items = $.goSlice($.pointerValue<queue>(q).items, 1, undefined)
		$.pointerValue<queue>(q).Mu.Unlock()
		return v
	}

	public async push(v: number): globalThis.Promise<void> {
		let q: queue | $.VarRef<queue> | null = this;
		await $.pointerValue<queue>(q).Mu.Lock()
		queue.prototype.init.call(q)
		$.pointerValue<queue>(q).items = $.append($.pointerValue<queue>(q).items, v)
		$.pointerValue<queue>(q).Mu.Unlock()
		$.pointerValue<queue>(q).Cond.Signal()
	}

	static {
		$.bindStructFields(this.prototype, ["Mu", "Cond", "items"])
	}

	static __typeInfo = $.registerStructType(
		"main.queue",
		() => new queue(),
		() => [{ name: "init", args: [], returns: [] }, { name: "pop", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "push", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }],
		queue,
		() => [{ name: "Mu", key: "Mu", type: "sync.Mutex" }, { name: "Cond", key: "Cond", type: "sync.Cond" }, { name: "items", key: "items", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let zero: sync.Cond = $.markAsStructValue(new sync.Cond())
	await $.println("zero L is nil:", zero.L == null)

	let q: queue | $.VarRef<queue> | null = new queue()
	let done: $.Channel<boolean> | null = $.makeChannel<boolean>(0, false, "both")
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		let sum = 0
		for (let __rangeIndex = 0; __rangeIndex < 3; __rangeIndex++) {
			sum = sum + (await queue.prototype.pop.call(q))
		}
		await $.println("sum:", sum)
		await $.chanSend(done, true)
	})() })
	await queue.prototype.push.call(q, 1)
	await queue.prototype.push.call(q, 2)
	await queue.prototype.push.call(q, 3)
	await $.chanRecv(done)

	let c: sync.Cond | $.VarRef<sync.Cond> | null = sync.NewCond($.pointerValueOrNil($.interfaceValue<sync.Locker | null>(new sync.Mutex(), "*sync.Mutex", /* @__PURE__ */ $.pointerType("sync.Mutex")))!)
	await $.println("NewCond L is nil:", $.pointerValue<sync.Cond>(c).L == null)
}

if ($.isMainScript(import.meta)) {
	await main()
}

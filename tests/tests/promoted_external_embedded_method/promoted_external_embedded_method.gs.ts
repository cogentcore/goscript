// Generated file based on promoted_external_embedded_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export type runner = {
	Run(): string
}

$.registerInterfaceType(
	"main.runner",
	null,
	[{ name: "Run", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class raw {
	public declare Mutex: sync.Mutex

	constructor(__goscriptValue?: boolean, Mutex$?: sync.Mutex) {
		this.Mutex = Mutex$ ?? $.markAsStructValue(new sync.Mutex())
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): raw {
		return new raw(true, $.markAsStructValue($.cloneStructValue(this.Mutex)))
	}

	public __goscriptAssign(source: raw): this {
		$.assignStruct(this.Mutex, source.Mutex)
		return this
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
		"main.raw",
		() => new raw(),
		() => [{ name: "Lock", args: [], returns: [], pointerReceiver: true }, { name: "TryLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unlock", args: [], returns: [], pointerReceiver: true }],
		raw,
		() => [{ name: "Mutex", key: "Mutex", type: "sync.Mutex", anonymous: true }]
	)
}

export class outer {
	public declare raw: raw

	constructor(__goscriptValue?: boolean, raw$?: raw) {
		this.raw = raw$ ?? new raw(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): outer {
		return new outer(true, this.raw.clone())
	}

	public __goscriptAssign(source: outer): this {
		this.raw.__goscriptAssign(source.raw)
		return this
	}

	public Lock(): any {
		return $.pointerValue<raw>(this.raw).Mutex.Lock()
	}

	public TryLock(): any {
		return $.pointerValue<raw>(this.raw).Mutex.TryLock()
	}

	public Unlock(): any {
		return $.pointerValue<raw>(this.raw).Mutex.Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.outer",
		() => new outer(),
		() => [{ name: "Lock", args: [], returns: [], pointerReceiver: true }, { name: "TryLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unlock", args: [], returns: [], pointerReceiver: true }],
		outer,
		() => [{ name: "raw", key: "raw", type: "main.raw", anonymous: true }]
	)
}

export class rawRW {
	public declare RWMutex: sync.RWMutex

	constructor(__goscriptValue?: boolean, RWMutex$?: sync.RWMutex) {
		this.RWMutex = RWMutex$ ?? $.markAsStructValue(new sync.RWMutex())
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): rawRW {
		return new rawRW(true, $.markAsStructValue($.cloneStructValue(this.RWMutex)))
	}

	public __goscriptAssign(source: rawRW): this {
		$.assignStruct(this.RWMutex, source.RWMutex)
		return this
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
		"main.rawRW",
		() => new rawRW(),
		() => [{ name: "Lock", args: [], returns: [], pointerReceiver: true }, { name: "RLock", args: [], returns: [], pointerReceiver: true }, { name: "RLocker", args: [], returns: [{ type: "sync.Locker" }], pointerReceiver: true }, { name: "RUnlock", args: [], returns: [], pointerReceiver: true }, { name: "TryLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "TryRLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unlock", args: [], returns: [], pointerReceiver: true }],
		rawRW,
		() => [{ name: "RWMutex", key: "RWMutex", type: "sync.RWMutex", anonymous: true }]
	)
}

export class outerRW {
	public declare rawRW: rawRW

	constructor(__goscriptValue?: boolean, rawRW$?: rawRW) {
		this.rawRW = rawRW$ ?? new rawRW(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): outerRW {
		return new outerRW(true, this.rawRW.clone())
	}

	public __goscriptAssign(source: outerRW): this {
		this.rawRW.__goscriptAssign(source.rawRW)
		return this
	}

	public Lock(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.Lock()
	}

	public RLock(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.RLock()
	}

	public RLocker(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.RLocker()
	}

	public RUnlock(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.RUnlock()
	}

	public TryLock(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.TryLock()
	}

	public TryRLock(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.TryRLock()
	}

	public Unlock(): any {
		return $.pointerValue<rawRW>(this.rawRW).RWMutex.Unlock()
	}

	static __typeInfo = $.registerStructType(
		"main.outerRW",
		() => new outerRW(),
		() => [{ name: "Lock", args: [], returns: [], pointerReceiver: true }, { name: "RLock", args: [], returns: [], pointerReceiver: true }, { name: "RLocker", args: [], returns: [{ type: "sync.Locker" }], pointerReceiver: true }, { name: "RUnlock", args: [], returns: [], pointerReceiver: true }, { name: "TryLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "TryRLock", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }], pointerReceiver: true }, { name: "Unlock", args: [], returns: [], pointerReceiver: true }],
		outerRW,
		() => [{ name: "rawRW", key: "rawRW", type: "main.rawRW", anonymous: true }]
	)
}

export class rawRunner {
	public declare runner: runner | null

	constructor(__goscriptValue?: boolean, runner$?: runner | null) {
		this.runner = runner$ ?? (null! as runner | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): rawRunner {
		return new rawRunner(true, this.runner)
	}

	public __goscriptAssign(source: rawRunner): this {
		this.runner = $.assignFieldValue(this.runner, source.runner)
		return this
	}

	public Run(): any {
		return $.pointerValue<Exclude<runner | null, null>>(this.runner).Run()
	}

	static __typeInfo = $.registerStructType(
		"main.rawRunner",
		() => new rawRunner(),
		() => [{ name: "Run", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		rawRunner,
		() => [{ name: "runner", key: "runner", type: "main.runner", anonymous: true }]
	)
}

export class outerRunner {
	public declare rawRunner: rawRunner

	constructor(__goscriptValue?: boolean, rawRunner$?: rawRunner) {
		this.rawRunner = rawRunner$ ?? new rawRunner(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): outerRunner {
		return new outerRunner(true, this.rawRunner.clone())
	}

	public __goscriptAssign(source: outerRunner): this {
		this.rawRunner.__goscriptAssign(source.rawRunner)
		return this
	}

	public Run(): any {
		return $.pointerValue<any>($.pointerValue<rawRunner>(this.rawRunner).runner).Run()
	}

	static __typeInfo = $.registerStructType(
		"main.outerRunner",
		() => new outerRunner(),
		() => [{ name: "Run", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		outerRunner,
		() => [{ name: "rawRunner", key: "rawRunner", type: "main.rawRunner", anonymous: true }]
	)
}

export class runnable {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): runnable {
		return new runnable(true)
	}

	public __goscriptAssign(source: runnable): this {
		return this
	}

	public Run(): string {
		return "runner"
	}

	static __typeInfo = $.registerStructType(
		"main.runnable",
		() => new runnable(),
		() => [{ name: "Run", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		runnable,
		() => []
	)
}

export async function main(): globalThis.Promise<void> {
	let o: $.VarRef<outer> = $.varRef(new outer(true))
	await o.value.raw.Mutex.Lock()
	o.value.raw.Mutex.Unlock()

	let rw: $.VarRef<outerRW> = $.varRef(new outerRW(true))
	await rw.value.rawRW.RWMutex.RLock()
	rw.value.rawRW.RWMutex.RUnlock()
	let locker = rw.value.rawRW.RWMutex.RLocker()
	await (locker !== null && (locker as any).__isVarRef !== true && ((locker as any).__goValue === undefined || (locker as any).__goType?.charCodeAt(0) !== 42) ? (locker as Exclude<sync.Locker, null>) : $.pointerValue<Exclude<sync.Locker, null>>(locker)).Lock()
	void (__goscriptAwait = (locker !== null && (locker as any).__isVarRef !== true && ((locker as any).__goValue === undefined || (locker as any).__goType?.charCodeAt(0) !== 42) ? (locker as Exclude<sync.Locker, null>) : $.pointerValue<Exclude<sync.Locker, null>>(locker)).Unlock(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)

	let or = new outerRunner(true, new rawRunner(true, $.structInterfaceValue<runner | null>(new runnable(true), "main.runnable", "main.runnable")))
	await $.println($.pointerValue<Exclude<runner, null>>(or.rawRunner.runner).Run())
	await $.println("ok")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

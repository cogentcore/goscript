// Generated file based on promoted_external_embedded_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"
import "@goscript/sync/index.js"

export type runner = {
	Run(): string
}

$.registerInterfaceType(
	"main.runner",
	null,
	[{ name: "Run", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export class raw {
	public get Mutex(): sync.Mutex {
		return this._fields.Mutex
	}

	public set Mutex(value: sync.Mutex) {
		this._fields.Mutex = value
	}

	public _fields: {
		Mutex: sync.Mutex
	}

	constructor(init?: Partial<{Mutex?: sync.Mutex}>) {
		this._fields = {
			Mutex: init?.Mutex ? $.markAsStructValue($.cloneStructValue(init.Mutex)) : $.markAsStructValue(new sync.Mutex())
		}
	}

	public clone(): raw {
		return $.markAsStructValue(new raw(this))
	}

	public __goscriptAssign(source: raw): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Mutex, values.Mutex)
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
	public get raw(): raw {
		return this._fields.raw
	}

	public set raw(value: raw) {
		this._fields.raw = value
	}

	public _fields: {
		raw: raw
	}

	constructor(init?: Partial<{raw?: raw}>) {
		this._fields = {
			raw: init?.raw ? $.markAsStructValue($.cloneStructValue(init.raw)) : $.markAsStructValue(new raw())
		}
	}

	public clone(): outer {
		return $.markAsStructValue(new outer(this))
	}

	public __goscriptAssign(source: outer): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.raw, values.raw)
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
	public get RWMutex(): sync.RWMutex {
		return this._fields.RWMutex
	}

	public set RWMutex(value: sync.RWMutex) {
		this._fields.RWMutex = value
	}

	public _fields: {
		RWMutex: sync.RWMutex
	}

	constructor(init?: Partial<{RWMutex?: sync.RWMutex}>) {
		this._fields = {
			RWMutex: init?.RWMutex ? $.markAsStructValue($.cloneStructValue(init.RWMutex)) : $.markAsStructValue(new sync.RWMutex())
		}
	}

	public clone(): rawRW {
		return $.markAsStructValue(new rawRW(this))
	}

	public __goscriptAssign(source: rawRW): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.RWMutex, values.RWMutex)
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
	public get rawRW(): rawRW {
		return this._fields.rawRW
	}

	public set rawRW(value: rawRW) {
		this._fields.rawRW = value
	}

	public _fields: {
		rawRW: rawRW
	}

	constructor(init?: Partial<{rawRW?: rawRW}>) {
		this._fields = {
			rawRW: init?.rawRW ? $.markAsStructValue($.cloneStructValue(init.rawRW)) : $.markAsStructValue(new rawRW())
		}
	}

	public clone(): outerRW {
		return $.markAsStructValue(new outerRW(this))
	}

	public __goscriptAssign(source: outerRW): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.rawRW, values.rawRW)
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
	public get runner(): runner | null {
		return this._fields.runner
	}

	public set runner(value: runner | null) {
		this._fields.runner = value
	}

	public _fields: {
		runner: runner | null
	}

	constructor(init?: Partial<{runner?: runner | null}>) {
		this._fields = {
			runner: init?.runner ?? (null! as runner | null)
		}
	}

	public clone(): rawRunner {
		return $.markAsStructValue(new rawRunner(this))
	}

	public __goscriptAssign(source: rawRunner): void {
		const target = this._fields
		const values = source._fields
		target.runner = $.assignFieldValue(target.runner, values.runner, "main.runner")
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
	public get rawRunner(): rawRunner {
		return this._fields.rawRunner
	}

	public set rawRunner(value: rawRunner) {
		this._fields.rawRunner = value
	}

	public _fields: {
		rawRunner: rawRunner
	}

	constructor(init?: Partial<{rawRunner?: rawRunner}>) {
		this._fields = {
			rawRunner: init?.rawRunner ? $.markAsStructValue($.cloneStructValue(init.rawRunner)) : $.markAsStructValue(new rawRunner())
		}
	}

	public clone(): outerRunner {
		return $.markAsStructValue(new outerRunner(this))
	}

	public __goscriptAssign(source: outerRunner): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.rawRunner, values.rawRunner)
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
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): runnable {
		return $.markAsStructValue(new runnable(this))
	}

	public __goscriptAssign(source: runnable): void {
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
	let o: $.VarRef<outer> = $.varRef($.markAsStructValue(new outer()))
	await o.value.raw.Mutex.Lock()
	o.value.raw.Mutex.Unlock()

	let rw: $.VarRef<outerRW> = $.varRef($.markAsStructValue(new outerRW()))
	await rw.value.rawRW.RWMutex.RLock()
	rw.value.rawRW.RWMutex.RUnlock()
	let locker = rw.value.rawRW.RWMutex.RLocker()
	await $.pointerValue<Exclude<sync.Locker, null>>(locker).Lock()
	void (__goscriptAwait = $.pointerValue<Exclude<sync.Locker, null>>(locker).Unlock(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)

	let or = $.markAsStructValue(new outerRunner({rawRunner: $.markAsStructValue(new rawRunner({runner: $.interfaceValue<runner | null>($.markAsStructValue(new runnable()), "main.runnable", "main.runnable")}))}))
	await $.println($.pointerValue<Exclude<runner, null>>(or.rawRunner.runner).Run())
	await $.println("ok")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

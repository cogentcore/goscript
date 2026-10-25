// Generated file based on async_function_pointer_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as atomic from "@goscript/sync/atomic/index.js"
import "@goscript/sync/atomic/index.js"

export type Process = ((snap: Snapshot | $.VarRef<Snapshot> | null, n: number) => [$.VarRef<number> | null, $.Slice<number>, $.GoError] | globalThis.Promise<[$.VarRef<number> | null, $.Slice<number>, $.GoError]>) | null

export type SnapFunc = ((n: number) => [$.VarRef<number> | null, $.Slice<number>, $.GoError] | globalThis.Promise<[$.VarRef<number> | null, $.Slice<number>, $.GoError]>) | null

export class Snapshot {
	public declare base: number

	constructor(__goscriptValue?: boolean, base$?: number) {
		this.base = base$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Snapshot {
		return new Snapshot(true, this.base)
	}

	public __goscriptAssign(source: Snapshot): this {
		this.base = source.base
		return this
	}

	public async Apply(n: number, cb: ((n: number) => [$.VarRef<number> | null, $.Slice<number>, $.GoError] | globalThis.Promise<[$.VarRef<number> | null, $.Slice<number>, $.GoError]>) | null): globalThis.Promise<[number, $.GoError]> {
		const s: Snapshot | $.VarRef<Snapshot> | null = this;
		let __goscriptTuple0: any = await cb!($.pointerValue<Snapshot>(s).base + n)
		let next: $.VarRef<number> | null = __goscriptTuple0[0]
		let results: $.Slice<number> = __goscriptTuple0[1]
		let err: $.GoError = __goscriptTuple0[2]
		if (err != null) {
			return [0, err]
		}
		return [$.pointerValue<number>(next) + $.sliceLen(results), null]
	}

	static __typeInfo = $.registerStructType(
		"main.Snapshot",
		() => new Snapshot(),
		() => [{ name: "Apply", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }, { type: "error" }], pointerReceiver: true }],
		Snapshot,
		() => [{ name: "base", key: "base", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Host {
	public declare process: atomic.Pointer<Process>

	constructor(__goscriptValue?: boolean, process$?: atomic.Pointer<Process>) {
		this.process = process$ ?? $.markAsStructValue(new atomic.Pointer<Process>())
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Host {
		return new Host(true, $.markAsStructValue($.cloneStructValue(this.process)))
	}

	public __goscriptAssign(source: Host): this {
		$.assignStruct(this.process, source.process)
		return this
	}

	public processor(): ((n: number) => [number, $.GoError] | globalThis.Promise<[number, $.GoError]>) | null {
		const h: Host | $.VarRef<Host> | null = this;
		let cb = ($.pointerValue<Host>(h).process.Load() as $.VarRef<Process> | null)
		if (cb == null) {
			return (null as ((n: number) => [number, $.GoError] | globalThis.Promise<[number, $.GoError]>) | null)
		}
		return $.functionValue(async (n: number): globalThis.Promise<[number, $.GoError]> => {
			let snap = new Snapshot(false, 10)
			return Snapshot.prototype.Apply.call(snap, n, $.functionValue(async (n: number): globalThis.Promise<[$.VarRef<number> | null, $.Slice<number>, $.GoError]> => {
				return ($.pointerValue<Process>(cb))!(snap, n)
			}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), "error"] } as $.FunctionTypeInfo)))
		}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int"), "error"] } as $.FunctionTypeInfo))
	}

	static __typeInfo = $.registerStructType(
		"main.Host",
		() => new Host(),
		() => [{ name: "processor", args: [], returns: [{ type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int"), "error"] } as $.FunctionTypeInfo) }], pointerReceiver: true }],
		Host,
		() => [{ name: "process", key: "process", type: "atomic.Pointer" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let ch = $.makeChannel<number>(1, 0, "both")
	await $.chanSend(ch, 5)
	let process: $.VarRef<((snap: Snapshot | $.VarRef<Snapshot> | null, n: number) => [$.VarRef<number> | null, $.Slice<number>, $.GoError] | globalThis.Promise<[$.VarRef<number> | null, $.Slice<number>, $.GoError]>) | null> = $.varRef($.functionValue(async (snap: Snapshot | $.VarRef<Snapshot> | null, n: number): globalThis.Promise<[$.VarRef<number> | null, $.Slice<number>, $.GoError]> => {
		let next = $.varRef(n + await $.chanRecv(ch))
		return [next, $.arrayToSlice<number>([$.pointerValue<Snapshot>(snap).base]), null]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Snapshot"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), "error"] } as $.FunctionTypeInfo)))

	let h = new Host()
	$.pointerValue<Host>(h).process.Store(process)
	let [got, err] = await (h !== null && (h as any).__isVarRef !== true && (h as any).__goValue === undefined ? ((h as any) as Host).processor() : Host.prototype.processor.call(h))!(1)
	await $.println("pointer callback", got, err == null)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.Snapshot"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")), /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int")), "error"] } as $.FunctionTypeInfo), zero: () => null }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

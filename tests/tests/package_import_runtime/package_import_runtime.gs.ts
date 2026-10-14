// Generated file based on package_import_runtime.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as runtime from "@goscript/runtime/index.js"

import * as strconv from "@goscript/strconv/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/runtime/index.js"
import "@goscript/strconv/index.js"
import "@goscript/strings/index.js"

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

	public PtrMethod(): number {
		const c: counter | $.VarRef<counter> | null = this;
		return $.pointerValue<counter>(c).n
	}

	public ValMethod(): number {
		const c = this;
		return c.n
	}

	static __typeInfo = $.registerStructType(
		"main.counter",
		() => new counter(),
		() => [$.methodSignature("PtrMethod", [], [/* @__PURE__ */ $.basicType("int")], true), $.methodSignature("ValMethod", [], [/* @__PURE__ */ $.basicType("int")])],
		counter,
		() => [/* @__PURE__ */ $.structField("n", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })]
	)
}

export class box {
	public get v(): any {
		return this._fields.v
	}

	public set v(value: any) {
		this._fields.v = value
	}

	public _fields: {
		v: any
	}

	constructor(init?: Partial<{v?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			v: init?.v !== undefined ? $.copyElement(init.v) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): box {
		return new box(this, true)
	}

	public __goscriptAssign(source: box): void {
		const target = this._fields
		const values = source._fields
		target.v = $.assignFieldValue(target.v, values.v, { kind: $.TypeKind.Interface, methods: [] })
	}

	public Get(__typeArgs: $.GenericTypeArgs | undefined): any {
		const b: box | $.VarRef<box> | null = this;
		return $.copyElement($.pointerValue<box>(b).v)
	}

	static __typeInfo = $.registerStructType(
		"main.box",
		() => new box(),
		() => [$.methodSignature("Get", [], [{ kind: $.TypeKind.Interface, methods: [] }], true)],
		box,
		() => [/* @__PURE__ */ $.structField("v", { kind: $.TypeKind.Interface, methods: [] }, [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })]
	)
}

function __goscriptInit0(): void {
	// Graphics and windowing code locks the main goroutine to the main
	// thread in init.
	runtime.LockOSThread()
}

export async function main(): globalThis.Promise<void> {
	// Test basic runtime functions
	await $.println("GOOS:", runtime.GOOS)
	await $.println("GOARCH:", runtime.GOARCH)
	await $.println("Compiler:", runtime.Compiler)
	runtime.GOROOT()
	// println("Version:", runtime.Version()) - not stable for the test (go.mod may change)
	// println("NumCPU:", runtime.NumCPU()) - not stable for the test (number of cores may change)

	// Test GOMAXPROCS
	let procs = runtime.GOMAXPROCS(0)
	await $.println("GOMAXPROCS(-1):", runtime.GOMAXPROCS(-1))
	await $.println("GOMAXPROCS(0):", procs)

	// Test NumGoroutine
	await $.println("NumGoroutine:", runtime.NumGoroutine())

	// Test GC (should be no-op)
	runtime.GC()
	await $.println("GC called successfully")

	let pcs: $.Slice<number> = $.makeSlice<number>(0, undefined, "number")
	await $.println("Callers empty:", runtime.Callers(0, pcs))
	let frames: runtime.Frames | $.VarRef<runtime.Frames> | null = runtime.CallersFrames(pcs)
	let [frame, more] = runtime.Frames.prototype.Next.call($.pointerValue<runtime.Frames>(frames))
	await $.println("Frames empty:", frame.Line, more)
	await $.println("FuncForPC nil:", runtime.FuncForPC(0) == null)
	await callers()
	await funcValueNames()

	let __goscriptShadow0 = $.varRef($.anonymousStructValue({value: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })] }))
	let cleanup = $.markAsStructValue($.cloneStructValue(runtime.AddCleanup(__goscriptShadow0, $.functionValue(async (value: number): globalThis.Promise<void> => {
		await $.println("cleanup should not run during test:", value)
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [] } as $.FunctionTypeInfo)), 1)))
	$.markAsStructValue($.cloneStructValue(cleanup)).Stop()
	runtime.KeepAlive($.interfaceValue(__goscriptShadow0, "*struct{value int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })] })))
	await $.println("Cleanup stopped")

	runtime.SetFinalizer($.interfaceValue(__goscriptShadow0, "*struct{value int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })] })), $.interfaceValue($.functionValue(async (_p0: $.VarRef<{"value": number}> | null): globalThis.Promise<void> => {
		await $.println("finalizer should not run during test")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })] })], results: [] } as $.FunctionTypeInfo)), "func(*struct{value int})", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })] })], results: [] } as $.FunctionTypeInfo)))
	runtime.SetFinalizer($.interfaceValue(__goscriptShadow0, "*struct{value int}", /* @__PURE__ */ $.pointerType({ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_runtime" })] })), null)
	await $.println("Finalizer ignored")

	await lockOSThread()
}

export async function callers(): globalThis.Promise<void> {
	let __goscriptTuple0: any = runtime.Caller(0)
	let pc = $.uint(__goscriptTuple0[0], 64)
	let file = __goscriptTuple0[1]
	let line = __goscriptTuple0[2]
	let ok = __goscriptTuple0[3]
	await $.println("Caller:", ok, $.uint(pc, 64) != 0, !$.stringEqual(file, ""), line > 0)
	let f: runtime.Func | $.VarRef<runtime.Func> | null = runtime.FuncForPC($.uint(pc, 64))
	await $.println("FuncForPC caller:", f != null, strings.Contains(runtime.Func.prototype.Name.call($.pointerValueOrNil(f)), "callers"))
	await $.println("Caller(1):", !$.stringEqual(callerInfo(), ""))

	let pcs: $.Slice<number> = $.makeSlice<number>(8, undefined, "number")
	let n = runtime.Callers(1, pcs)
	let [frame, ] = runtime.Frames.prototype.Next.call($.pointerValue<runtime.Frames>(runtime.CallersFrames($.goSlice(pcs, undefined, n))))
	await $.println("Callers:", n > 0, frame.Line > 0, strings.Contains(frame.Function, "callers"))
}

export function callerInfo(): string {
	let __goscriptTuple1: any = runtime.Caller(1)
	let pc = $.uint(__goscriptTuple1[0], 64)
	let file = __goscriptTuple1[1]
	let line = __goscriptTuple1[2]
	return $.concatString(($.concatString(($.concatString(($.concatString(runtime.Func.prototype.Name.call($.pointerValueOrNil(runtime.FuncForPC($.uint(pc, 64)))), " ")), file)), ":")), strconv.Itoa(line))
}

export function funcName(f: any): string {
	return runtime.Func.prototype.Name.call($.pointerValueOrNil(runtime.FuncForPC($.uint($.markAsStructValue($.cloneStructValue(reflect.ValueOf(f))).Pointer(), 64))))
}

export function helperFunc(): void {
}

export async function funcValueNames(): globalThis.Promise<void> {
	await $.println("FuncForPC func:", funcName($.interfaceValue($.goFunc(helperFunc, "main.helperFunc"), "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))))
	await $.println("FuncForPC imported:", funcName($.interfaceValue($.goFunc(strings.ToUpper, "strings.ToUpper"), "func(s string) string", ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))))

	let c: counter | $.VarRef<counter> | null = new counter({n: 1})
	await $.println("FuncForPC pointer method:", funcName($.interfaceValue($.functionValue(((__receiver) => () => __receiver.PtrMethod())($.pointerValue<counter>(c)), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.(*counter).PtrMethod-fm"), "func() int", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))))
	await $.println("FuncForPC value method:", funcName($.interfaceValue($.functionValue(((__receiver) => () => __receiver.ValMethod())($.markAsStructValue($.cloneStructValue($.pointerValue<counter>(c)))), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.counter.ValMethod-fm"), "func() int", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))))

	let b: box | $.VarRef<box> | null = new box({v: 2})
	await $.println("FuncForPC generic method:", funcName($.interfaceValue($.functionValue(((__receiver) => () => __receiver.Get(__goscriptStatic0()))($.pointerValue<box>(b)), ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo), "main.(*box[...]).Get-fm"), "func() int", ({ kind: $.TypeKind.Function, params: [], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))))
}

export async function lockOSThread(): globalThis.Promise<void> {
	let done: $.Channel<boolean> | null = $.makeChannel<boolean>(0, false, "both")
	queueMicrotask(async () => { await (async (): globalThis.Promise<void> => {
		await using __defer = new $.AsyncDisposableStack()
		runtime.LockOSThread()
		__defer.defer(() => { runtime.UnlockOSThread() })
		await $.println("locked goroutine ran")
		await $.chanSend(done, true)
	})() })
	await $.chanRecv(done)
	runtime.UnlockOSThread()
	await $.println("main unlocked")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, E: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

__goscriptInit0()

if ($.isMainScript(import.meta)) {
	await main()
}

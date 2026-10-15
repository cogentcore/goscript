// Generated file based on override_variadic_method_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as js from "@goscript/syscall/js/index.js"

export class recorder {
	public declare obj: js.Value

	constructor(init?: Partial<{obj?: js.Value}>, __goscriptValue?: boolean) {
		this.obj = init?.obj ? $.markAsStructValue($.cloneStructValue(init.obj)) : $.markAsStructValue(new js.Value())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): recorder {
		return new recorder(this, true)
	}

	public __goscriptAssign(source: recorder): this {
		$.assignStruct(this.obj, source.obj)
		return this
	}

	public flush(): void {
		let r: recorder | $.VarRef<recorder> | null = this;
		using __defer = new $.DisposableStack()
		const r$: recorder = r == null ? $.pointerTarget<recorder>(r) : (r as any).__isVarRef === true ? (r as any).value : (r as any).__goValue === undefined ? (r as any) : $.pointerTarget<recorder>(r)
		const __goscriptDeferCallee0 = $.functionValue(((__receiver) => (m: string, args: $.Slice<any>) => __receiver.Call(m, ...(args ?? [])))($.markAsStructValue($.cloneStructValue((r$ as recorder).obj))), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: ["js.Value"], isVariadic: true } as $.FunctionTypeInfo), "syscall/js.Value.Call-fm")
		__defer.defer(() => { __goscriptDeferCallee0("hit", null) })
		const __goscriptDeferCallee1 = $.functionValue(((__receiver) => (m: string, args: $.Slice<any>) => __receiver.Call(m, ...(args ?? [])))($.markAsStructValue($.cloneStructValue((r$ as recorder).obj))), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: ["js.Value"], isVariadic: true } as $.FunctionTypeInfo), "syscall/js.Value.Call-fm")
		const __goscriptDeferArg0 = $.arrayToSlice<any>([$.basicInterfaceValue(2, "int"), $.basicInterfaceValue(3, "int")])
		__defer.defer(() => { __goscriptDeferCallee1("hit", __goscriptDeferArg0) })
		let args = $.arrayToSlice<any>([$.basicInterfaceValue(4, "int")])
		const __goscriptDeferCallee2 = $.functionValue(((__receiver) => (m: string, args: $.Slice<any>) => __receiver.Call(m, ...(args ?? [])))($.markAsStructValue($.cloneStructValue((r$ as recorder).obj))), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: ["js.Value"], isVariadic: true } as $.FunctionTypeInfo), "syscall/js.Value.Call-fm")
		const __goscriptDeferArg1 = args
		__defer.defer(() => { __goscriptDeferCallee2("hit", __goscriptDeferArg1) })
		$.assignStruct((r$ as recorder).obj, js.Null())
	}

	static __typeInfo = $.registerStructType(
		"main.recorder",
		() => new recorder(),
		() => [{ name: "flush", args: [], returns: [], pointerReceiver: true }],
		recorder,
		() => [{ name: "obj", key: "obj", type: "js.Value" }]
	)
}

export async function main(): globalThis.Promise<void> {
	using __defer = new $.DisposableStack()
	let hit = $.markAsStructValue($.cloneStructValue(js.FuncOf($.functionValue(async (_this: js.Value, args: $.Slice<js.Value>): globalThis.Promise<any> => {
		await $.println("hit", $.sliceLen(args))
		return null
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)))))
	const __goscriptDeferCallee3 = $.functionValue(((__receiver) => () => __receiver.Release())($.markAsStructValue($.cloneStructValue(hit))), ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo), "syscall/js.Func.Release-fm")
	__defer.defer(() => { __goscriptDeferCallee3() })
	let obj = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(js.Global())).Get("Object"))).New()))
	$.markAsStructValue($.cloneStructValue(obj)).Set("hit", $.interfaceValue($.markAsStructValue($.cloneStructValue(hit)), "js.Func", "js.Func"))

	// A method value takes its variadic arguments as a slice.
	let call: ((m: string, args: $.Slice<any>) => js.Value | globalThis.Promise<js.Value>) | null = $.functionValue(((__receiver) => (m: string, args: $.Slice<any>) => __receiver.Call(m, ...(args ?? [])))($.markAsStructValue($.cloneStructValue(obj))), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: ["js.Value"], isVariadic: true } as $.FunctionTypeInfo), "syscall/js.Value.Call-fm")
	call!("hit", null)
	call!("hit", $.arrayToSlice<any>([$.basicInterfaceValue(1, "int")]))
	call!("hit", $.arrayToSlice<any>([$.basicInterfaceValue(1, "int"), $.basicInterfaceValue(2, "int")]))

	let r = new recorder({obj: $.markAsStructValue($.cloneStructValue(obj))})
	void (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as recorder).flush() : recorder.prototype.flush.call(r))
}

if ($.isMainScript(import.meta)) {
	await main()
}

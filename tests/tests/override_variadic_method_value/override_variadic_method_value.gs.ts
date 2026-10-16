// Generated file based on override_variadic_method_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as js from "@goscript/syscall/js/index.js"

export class recorder {
	public declare obj: js.Value

	constructor(__goscriptValue?: boolean, obj$?: js.Value) {
		this.obj = obj$ ?? $.markAsStructValue(new js.Value())
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): recorder {
		return new recorder(true, $.markAsStructValue($.cloneStructValue(this.obj)))
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
	$.markAsStructValue($.cloneStructValue(obj)).Set("hit", $.interfaceValue($.markAsStructValue($.cloneStructValue(hit)), "js.Func", __goscriptStatic0()))

	// A method value takes its variadic arguments as a slice.
	let call: ((m: string, args: $.Slice<any>) => js.Value | globalThis.Promise<js.Value>) | null = $.functionValue(((__receiver) => (m: string, args: $.Slice<any>) => __receiver.Call(m, ...(args ?? [])))($.markAsStructValue($.cloneStructValue(obj))), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string"), /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })], results: ["js.Value"], isVariadic: true } as $.FunctionTypeInfo), "syscall/js.Value.Call-fm")
	call!("hit", null)
	call!("hit", $.arrayToSlice<any>([$.basicInterfaceValue(1, "int")]))
	call!("hit", $.arrayToSlice<any>([$.basicInterfaceValue(1, "int"), $.basicInterfaceValue(2, "int")]))

	let r = new recorder(false, $.markAsStructValue($.cloneStructValue(obj)))
	void (r !== null && (r as any).__isVarRef !== true && (r as any).__goValue === undefined ? ((r as any) as recorder).flush() : recorder.prototype.flush.call(r))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.overrideTypeMethods("js.Func", "js.Func", () => [$.methodSignature("Bool", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Call", [["m", /* @__PURE__ */ $.basicType("string")], ["args", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })]], ["js.Value"], false, true), $.methodSignature("Delete", [["p", /* @__PURE__ */ $.basicType("string")]]), $.methodSignature("Equal", [["w", "js.Value"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Float", [], [/* @__PURE__ */ $.basicType("float64")]), $.methodSignature("Get", [["p", /* @__PURE__ */ $.basicType("string")]], ["js.Value"]), $.methodSignature("Index", [["i", /* @__PURE__ */ $.basicType("int")]], ["js.Value"]), $.methodSignature("InstanceOf", [["t", "js.Value"]], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Int", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("Invoke", [["args", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })]], ["js.Value"], false, true), $.methodSignature("IsNaN", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsNull", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("IsUndefined", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Length", [], [/* @__PURE__ */ $.basicType("int")]), $.methodSignature("New", [["args", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] })]], ["js.Value"], false, true), $.methodSignature("Release"), $.methodSignature("Set", [["p", /* @__PURE__ */ $.basicType("string")], ["x", { kind: $.TypeKind.Interface, methods: [] }]]), $.methodSignature("SetIndex", [["i", /* @__PURE__ */ $.basicType("int")], ["x", { kind: $.TypeKind.Interface, methods: [] }]]), $.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")]), $.methodSignature("Truthy", [], [/* @__PURE__ */ $.basicType("bool")]), $.methodSignature("Type", [], [/* @__PURE__ */ $.basicType("int", "js.Type")])]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_syscall_js.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as js from "@goscript/syscall/js/index.js"
import "@goscript/syscall/js/index.js"

export async function main(): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		let global = $.markAsStructValue($.cloneStructValue(js.Global()))
		$.markAsStructValue($.cloneStructValue(global)).Set("__GOSCRIPT_JS_TEST__", $.interfaceValue($.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue($.makeMap<string, any>([["name", "goscript"], ["nums", $.interfaceValue($.arrayToSlice<any>([$.basicInterfaceValue(1, "int"), $.basicInterfaceValue(2, "int"), $.basicInterfaceValue(3, "int")]), "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))]]), "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))))), "js.Value", "js.Value"))
		let obj = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(global)).Get("__GOSCRIPT_JS_TEST__")))
		await $.println("type:", js.Type_String($.markAsStructValue($.cloneStructValue(obj)).Type()))
		await $.println("name:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(obj)).Get("name"))).String())
		await $.println("length:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(obj)).Get("nums"))).Length())

		let cb = $.markAsStructValue($.cloneStructValue(js.FuncOf($.functionValue((_this: js.Value, args: $.Slice<js.Value>): any => {
			return $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 0))).Int() + 1, "int")
		}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)))))
		__defer.defer(() => { $.markAsStructValue($.cloneStructValue(cb)).Release() })
		await $.println("callback:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(cb)).Invoke($.basicInterfaceValue(41, "int")))).Int())

		let bytes = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(global)).Get("Uint8Array"))).New($.basicInterfaceValue(3, "int"))))
		$.markAsStructValue($.cloneStructValue(bytes)).SetIndex(0, $.basicInterfaceValue(65, "int"))
		$.markAsStructValue($.cloneStructValue(bytes)).SetIndex(1, $.basicInterfaceValue(66, "int"))
		$.markAsStructValue($.cloneStructValue(bytes)).SetIndex(2, $.basicInterfaceValue(67, "int"))
		let dst: $.Slice<number> = $.makeSlice<number>(3, undefined, "byte")
		js.CopyBytesToGo(dst, $.markAsStructValue($.cloneStructValue(bytes)))
		await $.println("bytes:", $.bytesToString(dst))

		// A JavaScript exception surfaces as a js.Error panic.
		await (async (): globalThis.Promise<void> => {
			const __defer = new $.AsyncDisposableStack()
			try {
				__defer.defer(async () => { await (async (): globalThis.Promise<void> => {
					{
						let [err, ok] = $.typeAssertTuple<js.Error>($.recover(), "js.Error")
						if (ok) {
							await $.println("recovered:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(err)).Get("name"))).String())
						}
					}
				})() })
				$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(global)).Get("JSON"))).Call("parse", "{")
				await __defer.dispose()
			} catch (e) {
				await __defer.disposePanic(e)
				if (!$.recovered(e)) {
					throw e
				}
			}
		})()

		await funcOfValues()
		await valueOfNil()
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
}

export function wrap(fn: ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null): js.Func {
	let jsFunc: ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null = $.functionValue(async (_this: js.Value, args: $.Slice<js.Value>): globalThis.Promise<any> => {
		return fn!($.markAsStructValue($.cloneStructValue(_this)), args)
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	return $.markAsStructValue($.cloneStructValue(js.FuncOf($.syncFunction(jsFunc))))
}

export async function funcOfValues(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let add = $.markAsStructValue($.cloneStructValue(wrap($.functionValue((_this: js.Value, args: $.Slice<js.Value>): any => {
		return $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 0))).Int() + $.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 1))).Int(), "int")
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)))))
	__defer.defer(() => { $.markAsStructValue($.cloneStructValue(add)).Release() })
	await $.println("wrapped type:", js.Type_String($.markAsStructValue($.cloneStructValue(add)).Type()))

	let fn: ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null = null! as ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null
	fn = $.functionValue((_this: js.Value, args: $.Slice<js.Value>): any => {
		return "from variable"
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	let direct = $.markAsStructValue($.cloneStructValue(js.FuncOf($.syncFunction(fn))))
	__defer.defer(() => { $.markAsStructValue($.cloneStructValue(direct)).Release() })
	await $.println("direct:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(direct)).Invoke())).String())
}

export function features(): $.Slice<any> {
	let out: $.Slice<any> = null! as $.Slice<any>
	return out
}

export async function valueOfNil(): globalThis.Promise<void> {
	await $.println("nil slice:", js.Type_String($.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(null, "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))))).Type()), $.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(null, "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))))).Length())
	await $.println("nil map:", js.Type_String($.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(null, "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))))).Type()))

	let desc: globalThis.Map<string, any> | null = $.makeMap<string, any>([["label", ""], ["requiredFeatures", $.interfaceValue(features(), "[]interface{}", /* @__PURE__ */ $.sliceType({ kind: $.TypeKind.Interface, methods: [] }))], ["limits", $.interfaceValue(null, "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] }))]])
	let v = $.markAsStructValue($.cloneStructValue(js.ValueOf($.interfaceValue(desc, "map[string]interface{}", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), { kind: $.TypeKind.Interface, methods: [] })))))
	await $.println("nested slice:", js.Type_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Get("requiredFeatures"))).Type()), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(js.Global())).Get("Array"))).Call("isArray", $.interfaceValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Get("requiredFeatures"))), "js.Value", "js.Value")))).Bool())
	await $.println("nested map:", js.Type_String($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(v)).Get("limits"))).Type()))

	let nothing: any = null! as any
	await $.println("nil interface:", js.Type_String($.markAsStructValue($.cloneStructValue(js.ValueOf(nothing))).Type()))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on package_import_syscall_js_funcof_value.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as js from "@goscript/syscall/js/index.js"
import "@goscript/syscall/js/index.js"

export function wrap(fn: ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null): js.Func {
	let jsFunc: ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null = $.functionValue(async (_this: js.Value, args: $.Slice<js.Value>): globalThis.Promise<any> => {
		return fn!($.markAsStructValue($.cloneStructValue(_this)), args)
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo))
	return $.markAsStructValue($.cloneStructValue(js.FuncOf($.syncFunction(jsFunc))))
}

export async function main(): globalThis.Promise<void> {
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

if ($.isMainScript(import.meta)) {
	await main()
}

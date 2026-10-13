// Generated file based on package_import_syscall_js_funcof_async.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as sync from "@goscript/sync/index.js"

import * as js from "@goscript/syscall/js/index.js"
import "@goscript/sync/index.js"
import "@goscript/syscall/js/index.js"

export async function wrap(fn: ((_this: js.Value, args: $.Slice<js.Value>) => any | globalThis.Promise<any>) | null): globalThis.Promise<js.Func> {
	return $.markAsStructValue($.cloneStructValue(js.FuncOf($.functionValue(async (_this: js.Value, args: $.Slice<js.Value>): globalThis.Promise<any> => {
		return fn!($.markAsStructValue($.cloneStructValue(_this)), args)
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)))))
}

export async function main(): globalThis.Promise<void> {
	await using __defer = new $.AsyncDisposableStack()
	let mu: $.VarRef<sync.Mutex> = $.varRef($.markAsStructValue(new sync.Mutex()))
	let done: $.Channel<string> | null = $.makeChannel<string>(2, "", "both")

	// The callback locks a mutex, so it may suspend. It is called by
	// JavaScript, which does not wait for it.
	let handler = $.markAsStructValue($.cloneStructValue(await wrap($.functionValue(async (_this: js.Value, args: $.Slice<js.Value>): globalThis.Promise<any> => {
		using __defer = new $.DisposableStack()
		await mu.value.Lock()
		__defer.defer(() => { mu.value.Unlock() })
		await $.chanSend(done, "handled " + $.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 0))).String())
		return null
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)))))
	__defer.defer(() => { $.markAsStructValue($.cloneStructValue(handler)).Release() })

	$.markAsStructValue($.cloneStructValue(handler)).Invoke("first")
	await $.println(await $.chanRecv(done))

	// A callback that does not suspend still returns its result.
	let add = $.markAsStructValue($.cloneStructValue(js.FuncOf($.functionValue((_this: js.Value, args: $.Slice<js.Value>): any => {
		return $.basicInterfaceValue($.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 0))).Int() + $.markAsStructValue($.cloneStructValue($.arrayIndex(args!, 1))).Int(), "int")
	}, ({ kind: $.TypeKind.Function, params: ["js.Value", /* @__PURE__ */ $.sliceType("js.Value")], results: [{ kind: $.TypeKind.Interface, methods: [] }] } as $.FunctionTypeInfo)))))
	__defer.defer(() => { $.markAsStructValue($.cloneStructValue(add)).Release() })
	await $.println("sum:", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(add)).Invoke($.basicInterfaceValue(2, "int"), $.basicInterfaceValue(3, "int")))).Int())

	$.markAsStructValue($.cloneStructValue(handler)).Invoke("second")
	await $.println(await $.chanRecv(done))
}

if ($.isMainScript(import.meta)) {
	await main()
}

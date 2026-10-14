// Generated file based on runtime_func_nil_name.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as runtime from "@goscript/runtime/index.js"
import "@goscript/reflect/index.js"
import "@goscript/runtime/index.js"

export function hello(): void {
}

export function funcName(f: any): string {
	return runtime.Func.prototype.Name.call($.pointerValueOrNil(runtime.FuncForPC($.uint($.markAsStructValue($.cloneStructValue(reflect.ValueOf(f))).Pointer(), 64))))
}

export async function main(): globalThis.Promise<void> {
	// Name of a nil *runtime.Func is "", as in Go.
	let fn: runtime.Func | $.VarRef<runtime.Func> | null = null! as runtime.Func | $.VarRef<runtime.Func> | null
	await $.println("nil:", $.stringEqual(runtime.Func.prototype.Name.call($.pointerValueOrNil(fn)), ""))
	await $.println("pc 0:", $.stringEqual(runtime.Func.prototype.Name.call($.pointerValueOrNil(runtime.FuncForPC(0))), ""))

	let nilFunc: (() => void) | null = null! as (() => void) | null
	await $.println("nil func:", $.stringEqual(funcName($.interfaceValue(nilFunc, "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))), ""))
	await $.println("hello:", funcName($.interfaceValue($.goFunc(hello, "main.hello"), "func()", ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on closure_func_assignment.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function run(_set: ((_p0: (() => void) | null) => void) | null): globalThis.Promise<void> {
	let cb: $.VarRef<(() => void) | null> = $.varRef(null! as (() => void) | null)
	void (__goscriptAwait = _set!($.functionValue(async () => {
		void (__goscriptAwait = _set!($.functionValue(() => {
			cb.value = $.functionValue(async () => {
				await $.println("called")
			}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	if (cb.value != null) {
		void (__goscriptAwait = cb.value!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}
}

export async function main(): globalThis.Promise<void> {
	await run($.functionValue(async (fn: (() => void) | null) => {
		void (__goscriptAwait = fn!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	}, ({ kind: $.TypeKind.Function, params: [({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)], results: [] } as $.FunctionTypeInfo)))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

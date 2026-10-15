// Generated file based on factory_async_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/factory_async_callback/dep/index.js"

export type AddFactoryFunc = ((b: dep.Bus) => $.Slice<dep.Factory | null> | globalThis.Promise<$.Slice<dep.Factory | null>>) | null

export let Factories: $.Slice<AddFactoryFunc | null> = $.arrayToSlice<AddFactoryFunc | null>([$.functionValue(async (b: dep.Bus): globalThis.Promise<$.Slice<dep.Factory | null>> => {
	return $.arrayToSlice<dep.Factory | null>([await dep.NewFactory((b).clone())])
}, ({ kind: $.TypeKind.Function, params: ["dep.Bus"], results: [/* @__PURE__ */ $.sliceType("dep.Factory")] } as $.FunctionTypeInfo))])

export function __goscript_set_Factories(__goscriptValue: $.Slice<AddFactoryFunc | null>): void {
	Factories = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	let factories = ((__goscriptAwait = $.arrayIndex(Factories!, 0)!(new dep.Bus(undefined, true)), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait) as $.Slice<dep.Factory | null>)
	await $.println((__goscriptAwait = $.pointerValue<Exclude<dep.Factory, null>>($.arrayIndex(factories!, 0)).GetConfigID(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

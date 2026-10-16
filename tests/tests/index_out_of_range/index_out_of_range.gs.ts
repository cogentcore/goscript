// Generated file based on index_out_of_range.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function recoverMsg(label: string, fn: (() => void) | null): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		__defer.defer(async () => { await (async () => {
			{
				let r = $.recover()
				if (r != null) {
					{
						let [err, ok] = $.typeAssertTuple<$.GoError>(r, "error")
						if (ok) {
							await $.println(label, (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
						} else {
							await $.println(label, "non-error panic")
						}
					}
				}
			}
		})() })
		void (__goscriptAwait = fn!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
}

export async function main(): globalThis.Promise<void> {
	await recoverMsg("slice:", $.functionValue(async () => {
		let s = $.arrayToSlice<number>([1, 2, 3])
		let i = 5
		await $.println($.arrayIndex(s!, i))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await recoverMsg("array:", $.functionValue(async () => {
		let a: number[] = $.arrayValue(globalThis.Array.from({ length: 3 }, () => 0))
		let i = 7
		await $.println(a[$.checkArrayIndex(i, 3)])
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await recoverMsg("negative:", $.functionValue(async () => {
		let s = $.arrayToSlice<number>([1, 2, 3])
		let i = -1
		await $.println($.arrayIndex(s!, i))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await recoverMsg("string:", $.functionValue(async () => {
		let s = "abc"
		let i = 9
		await $.println($.indexString(s, i))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await recoverMsg("string-negative:", $.functionValue(async () => {
		let s = "abc"
		let i = -1
		await $.println($.indexString(s, i))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await recoverMsg("bytes-negative:", $.functionValue(async () => {
		let b = new Uint8Array([97, 98, 99])
		let i = -1
		await $.println($.arrayIndex(b!, i))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("done")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

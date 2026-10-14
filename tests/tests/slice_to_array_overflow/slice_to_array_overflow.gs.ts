// Generated file based on slice_to_array_overflow.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function recoverMsg(label: string, fn: (() => void) | null): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		__defer.defer(async () => { await (async (): globalThis.Promise<void> => {
			{
				let r = $.recover()
				if (r != null) {
					{
						let [err, ok] = $.typeAssertTuple<$.GoError>(r, "error")
						if (ok) {
							await $.println(label, (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
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
	await recoverMsg("array:", $.functionValue(async (): globalThis.Promise<void> => {
		let values: $.Slice<number> = new Uint8Array([1, 2]) as $.Slice<number>
		let arr = $.cloneArrayValue(($.sliceToArray<number>(values, 4, "byte") as Uint8Array), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 4))
		await $.println($.arrayIndex(arr, 0))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await recoverMsg("pointer:", $.functionValue(async (): globalThis.Promise<void> => {
		let values: $.Slice<number> = new Uint8Array([1, 2]) as $.Slice<number>
		let arr: $.VarRef<Uint8Array> | null = ($.sliceToArrayPointer<number>(values, 4, "byte") as $.VarRef<Uint8Array> | null)
		await $.println($.arrayIndex($.pointerValue<Uint8Array>(arr), 0))
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("done")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

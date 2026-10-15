// Generated file based on sync_once_async_do.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as sync from "@goscript/sync/index.js"

export async function main(): globalThis.Promise<void> {
	let once = $.varRef($.markAsStructValue(new sync.Once()))
	let ch = $.makeChannel<number>(1, 0, "both")
	await $.chanSend(ch, 17)
	let value = 0
	await once.value.Do($.functionValue(async () => {
		value = await $.chanRecv(ch)
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await once.value.Do($.functionValue(() => {
		value = 99
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("once", value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

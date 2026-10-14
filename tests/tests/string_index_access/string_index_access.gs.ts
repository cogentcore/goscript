// Generated file based on string_index_access.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export const lookup: string = "\x00\xff\x07\xe4\xbd\xa0"

export async function main(): globalThis.Promise<void> {
	let myStr1 = "testing"
	await $.println("Byte from myStr1[0]:", $.indexString(myStr1, 0))
	await $.println("Byte from myStr1[2]:", $.indexString(myStr1, 2))
	await $.println("Byte from myStr1[6]:", $.indexString(myStr1, 6))

	let myStr2 = "\xe4\xbd\xa0\xe5\xa5\xbd\xe4\xb8\x96\xe7\x95\x8c"
	// String indexing returns UTF-8 bytes, not Unicode code points.
	await $.println("Byte from myStr2[0]:", $.indexString(myStr2, 0))
	await $.println("Byte from myStr2[1]:", $.indexString(myStr2, 1))
	await $.println("Byte from myStr2[2]:", $.indexString(myStr2, 2))
	await $.println("Byte from myStr2[3]:", $.indexString(myStr2, 3))

	// Constant lookup tables preserve invalid UTF-8 and control bytes.
	for (let i = 0; i < 6; i++) {
		await $.println("constant byte", $.indexByteString("\x00\xff\x07\xe4\xbd\xa0", i))
	}
	await checkBounds(-1)
	await checkBounds(6)
}

export async function checkBounds(index: number): globalThis.Promise<void> {
	const __defer = new $.AsyncDisposableStack()
	try {
		__defer.defer(async () => { await (async (): globalThis.Promise<void> => {
			await $.println("out of bounds", $.recover() != null)
		})() })
		await $.println($.indexByteString("\x00\xff\x07\xe4\xbd\xa0", index))
		await __defer.dispose()
	} catch (e) {
		await __defer.disposePanic(e)
		if (!$.recovered(e)) {
			throw e
		}
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

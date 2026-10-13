// Generated file based on narrow_int_arith_widening_conversion.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type GID = number

export class entry {
	public declare start: number

	public declare end: number

	public declare delta: number

	public _fields: {
		start: number
		end: number
		delta: number
	}

	constructor(init?: Partial<{start?: number, end?: number, delta?: number}>) {
		this._fields = {
			start: init?.start ?? (0 as number),
			end: init?.end ?? (0 as number),
			delta: init?.delta ?? (0 as number)
		}
	}

	public clone(): entry {
		return $.markAsStructValue(new entry(this))
	}

	static {
		$.bindStructFields(this.prototype, ["start", "end", "delta"])
	}

	static __typeInfo = $.registerStructType(
		"main.entry",
		() => new entry(),
		() => [],
		entry,
		() => [{ name: "start", key: "start", type: /* @__PURE__ */ $.basicType("uint16") }, { name: "end", key: "end", type: /* @__PURE__ */ $.basicType("uint16") }, { name: "delta", key: "delta", type: /* @__PURE__ */ $.basicType("uint16") }]
	)
}

export function lookup(e: entry, c: number): GID {
	return $.uint($.uint($.uint(c + e.delta, 16), 32), 32)
}

export async function main(): globalThis.Promise<void> {
	let e = $.markAsStructValue(new entry({start: 32, end: 126, delta: 65507}))
	await $.println("gid H:", $.uint(lookup($.markAsStructValue($.cloneStructValue(e)), 72), 32))

	let a: number = 200
	let b: number = 100
	await $.println("uint8 sum:", $.uint($.uint($.uint(a + b, 8), 32), 32), $.int($.uint(a * b, 8)), $.uint64($.uint(((a - b) - b) - b, 8)))

	let x: number = 30000
	let y: number = 10000
	await $.println("int16 sum:", $.int($.int($.int(x + y, 16), 32), 32), $.int64($.int(x * 3, 16)), $.uint($.uint($.int((-x - y) - y, 16), 32), 32))

	let s: number = 1
	await $.println("shift:", $.uint($.uint($.uint((s << 15) + (s << 15), 16), 32), 32), $.int($.uint($.uint(~s, 16), 16)))

	let i8: number = 127
	await $.println("int8:", $.int($.int(i8 + 1, 8)), $.int(i8 * 2, 8))
}

if ($.isMainScript(import.meta)) {
	await main()
}

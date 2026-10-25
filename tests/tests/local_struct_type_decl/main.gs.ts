// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	class result {
		public declare value: number

		constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
			this.value = init?.value ?? (0 as number)
			;(this as any).__goStructValue = __goscriptValue === true
		}

		public clone(): result {
			return new result(this, true)
		}

		public __goscriptAssign(source: result): this {
			this.value = source.value
			return this
		}

		static __typeInfo = $.registerStructType(
			"main.result",
			() => new result(),
			() => [],
			result,
			() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
		)
	}

	let ch = $.makeChannel<result>(1, $.markAsStructValue(new result()), "both")
	await $.chanSend(ch, $.markAsStructValue(new result({value: 7})))
	let got: result = await $.chanRecv(ch)
	await $.println(got.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

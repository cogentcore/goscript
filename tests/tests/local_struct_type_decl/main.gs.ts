// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function main(): globalThis.Promise<void> {
	class result {
		public get value(): number {
			return this._fields.value
		}

		public set value(value: number) {
			this._fields.value = value
		}

		public _fields: {
			value: number
		}

		constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
			this._fields = {
				value: init?.value ?? (0 as number)
			}
			;(this as any)[$.structValueMarker] = __goscriptValue === true
		}

		public clone(): result {
			return new result(this, true)
		}

		public __goscriptAssign(source: result): void {
			const target = this._fields
			const values = source._fields
			target.value = values.value
		}

		static __typeInfo = $.registerStructType(
			"main.result",
			() => new result(),
			() => [],
			result,
			() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
		)
	}

	let ch: $.Channel<result> | null = $.makeChannel<result>(1, $.markAsStructValue(new result()), "both")
	await $.chanSend(ch, $.markAsStructValue(new result({value: 7})))
	let got = await $.chanRecv(ch)
	await $.println(got.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

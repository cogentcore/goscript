// Generated file based on switch_default_fallthrough.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function classify(value: number): string {
	switch (value) {
		default:
		{
		}
		case 1:
		{
			return "one"
			break
		}
		case 2:
		{
			return "two"
			break
		}
	}
	throw new globalThis.Error("goscript: unreachable return")
}

export function selectKind(value: number, small: boolean): string {
	let result = ""
	switch ((true as boolean)) {
		case value > 10:
		{
			fallback: {
				if (small) {
					if (value < 20) {
						break fallback
					}
					result = "big"
					break
				}
				result = "huge"
				break
			}
		}
		default:
		{
			result += "fallback"
			break
		}
	}
	return result
}

export async function main(): globalThis.Promise<void> {
	await $.println(classify(0))
	await $.println(classify(1))
	await $.println(classify(2))
	await $.println(selectKind(15, true))
	await $.println(selectKind(25, true))
	await $.println(selectKind(15, false))
	await $.println(selectKind(5, true))
}

if ($.isMainScript(import.meta)) {
	await main()
}

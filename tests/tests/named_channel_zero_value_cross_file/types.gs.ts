// Generated file based on types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Jobs = $.Channel<Job> | null

export class Job {
	public declare Value: string

	constructor(init?: Partial<{Value?: string}>, __goscriptValue?: boolean) {
		this.Value = init?.Value ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Job {
		return new Job(this, true)
	}

	public __goscriptAssign(source: Job): this {
		this.Value = source.Value
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Job",
		() => new Job(),
		() => [],
		Job,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

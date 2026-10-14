// Generated file based on types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Jobs = $.Channel<Job> | null

export class Job {
	public get Value(): string {
		return this._fields.Value
	}

	public set Value(value: string) {
		this._fields.Value = value
	}

	public _fields: {
		Value: string
	}

	constructor(init?: Partial<{Value?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value ?? ("" as string)
		}
		if (__goscriptValue) {
			(this as any)[$.structValueMarker] = true
		}
	}

	public clone(): Job {
		return new Job(this, true)
	}

	public __goscriptAssign(source: Job): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
	}

	static __typeInfo = $.registerStructType(
		"main.Job",
		() => new Job(),
		() => [],
		Job,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

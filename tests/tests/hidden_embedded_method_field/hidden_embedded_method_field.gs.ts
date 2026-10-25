// Generated file based on hidden_embedded_method_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class embedded {
	constructor(__goscriptValue?: boolean) {
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): embedded {
		return new embedded(true)
	}

	public __goscriptAssign(source: embedded): this {
		return this
	}

	public Database(): string {
		return "method"
	}

	static __typeInfo = $.registerStructType(
		"main.embedded",
		() => new embedded(),
		() => [{ name: "Database", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		embedded,
		() => []
	)
}

export class holder {
	public declare Database: string

	public declare embedded: embedded

	constructor(__goscriptValue?: boolean, Database$?: string, embedded$?: embedded) {
		this.Database = Database$ ?? ""
		this.embedded = embedded$ ?? new embedded(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(true, this.Database, this.embedded.clone())
	}

	public __goscriptAssign(source: holder): this {
		this.Database = source.Database
		this.embedded.__goscriptAssign(source.embedded)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "Database", key: "Database", type: /* @__PURE__ */ $.basicType("string") }, { name: "embedded", key: "embedded", type: "main.embedded", anonymous: true }]
	)
}

export function value(h: holder): string {
	return h.Database
}

export async function main(): globalThis.Promise<void> {
	await $.println(value(new holder(true, "field")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

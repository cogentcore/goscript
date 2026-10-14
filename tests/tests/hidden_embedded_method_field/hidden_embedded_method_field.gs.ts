// Generated file based on hidden_embedded_method_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class embedded {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): embedded {
		return $.markAsStructValue(new embedded(this))
	}

	public __goscriptAssign(source: embedded): void {
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
	public get Database(): string {
		return this._fields.Database
	}

	public set Database(value: string) {
		this._fields.Database = value
	}

	public get embedded(): embedded {
		return this._fields.embedded
	}

	public set embedded(value: embedded) {
		this._fields.embedded = value
	}

	public _fields: {
		Database: string
		embedded: embedded
	}

	constructor(init?: Partial<{Database?: string, embedded?: embedded}>) {
		this._fields = {
			Database: init?.Database ?? ("" as string),
			embedded: init?.embedded ? $.markAsStructValue($.cloneStructValue(init.embedded)) : $.markAsStructValue(new embedded())
		}
	}

	public clone(): holder {
		return $.markAsStructValue(new holder(this))
	}

	public __goscriptAssign(source: holder): void {
		const target = this._fields
		const values = source._fields
		target.Database = values.Database
		$.assignStruct(target.embedded, values.embedded)
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
	await $.println(value($.markAsStructValue(new holder({Database: "field"}))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on func_var_sync_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as os from "@goscript/os/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/os/index.js"
import "@goscript/strings/index.js"

export class matcher {
	public declare match: ((r: number) => boolean | globalThis.Promise<boolean>) | null

	public _fields: {
		match: ((r: number) => boolean | globalThis.Promise<boolean>) | null
	}

	constructor(init?: Partial<{match?: ((r: number) => boolean | globalThis.Promise<boolean>) | null}>) {
		this._fields = {
			match: init?.match ?? (null! as ((r: number) => boolean | globalThis.Promise<boolean>) | null)
		}
	}

	public clone(): matcher {
		return $.markAsStructValue(new matcher(this))
	}

	static {
		$.bindStructFields(this.prototype, ["match"])
	}

	static __typeInfo = $.registerStructType(
		"main.matcher",
		() => new matcher(),
		() => [],
		matcher,
		() => [{ name: "match", key: "match", type: ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo) }]
	)
}

export async function main(): globalThis.Promise<void> {
	let isX: ((r: number) => boolean | globalThis.Promise<boolean>) | null = $.functionValue((r: number): boolean => {
		return $.int(r, 32) == 120
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))
	await $.println(strings.IndexFunc("abxc", $.syncFunction(isX)))

	// a function value in a struct field
	let m = $.markAsStructValue(new matcher({match: isX}))
	await $.println(strings.IndexFunc("xyz", $.syncFunction(m.match)), strings.LastIndexFunc("axbx", $.syncFunction(m.match)))

	let env: globalThis.Map<string, string> | null = $.makeMap<string, string>([["A", "1"]])
	let expand: ((s: string) => string | globalThis.Promise<string>) | null = $.functionValue((s: string): string => {
		return $.mapGet<string, string, string>(env, s, "")[0]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	await $.println(os.Expand("$A-$B", $.syncFunction(expand)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

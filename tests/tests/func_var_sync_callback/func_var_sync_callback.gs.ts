// Generated file based on func_var_sync_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as os from "@goscript/os/index.js"
import * as strings from "@goscript/strings/index.js"

export class matcher {
	public declare match: ((r: number) => boolean | globalThis.Promise<boolean>) | null

	constructor(__goscriptValue?: boolean, match$?: ((r: number) => boolean | globalThis.Promise<boolean>) | null) {
		this.match = match$ ?? (null! as ((r: number) => boolean | globalThis.Promise<boolean>) | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): matcher {
		return new matcher(true, this.match)
	}

	public __goscriptAssign(source: matcher): this {
		this.match = source.match
		return this
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
	let isX = $.functionValue((r: number): boolean => {
		return r == 120
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))
	await $.println(strings.IndexFunc("abxc", $.syncFunction(isX)))

	// A function value in a struct field.
	let m = new matcher(true, isX)
	await $.println(strings.IndexFunc("xyz", $.syncFunction(m.match)), strings.LastIndexFunc("axbx", $.syncFunction(m.match)))

	let env = $.makeMap<string, string>([["A", "1"]])
	let expand = $.functionValue((s: string): string => {
		return $.mapGet<string, string, string>(env, s, "")[0]
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("string")] } as $.FunctionTypeInfo))
	await $.println(os.Expand("$A-$B", $.syncFunction(expand)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on func_var_sync_callback.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as os from "@goscript/os/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/os/index.js"
import "@goscript/strings/index.js"

export class matcher {
	public get match(): ((r: number) => boolean | globalThis.Promise<boolean>) | null {
		return this._fields.match
	}

	public set match(value: ((r: number) => boolean | globalThis.Promise<boolean>) | null) {
		this._fields.match = value
	}

	public _fields: {
		match: ((r: number) => boolean | globalThis.Promise<boolean>) | null
	}

	constructor(init?: Partial<{match?: ((r: number) => boolean | globalThis.Promise<boolean>) | null}>, __goscriptValue?: boolean) {
		this._fields = {
			match: init?.match ?? (null! as ((r: number) => boolean | globalThis.Promise<boolean>) | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): matcher {
		return new matcher(this, true)
	}

	public __goscriptAssign(source: matcher): void {
		const target = this._fields
		const values = source._fields
		target.match = values.match
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
		return r == 120
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int32")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))
	await $.println(strings.IndexFunc("abxc", $.syncFunction(isX)))

	// A function value in a struct field.
	let m = new matcher({match: isX}, true)
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

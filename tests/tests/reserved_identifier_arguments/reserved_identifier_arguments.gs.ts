// Generated file based on reserved_identifier_arguments.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Parser {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): Parser {
		return $.markAsStructValue(new Parser(this))
	}

	public __goscriptAssign(source: Parser): void {
	}

	public Parse(_arguments: $.Slice<string>): number {
		return $.sliceLen(_arguments)
	}

	static __typeInfo = $.registerStructType(
		"main.Parser",
		() => new Parser(),
		() => [{ name: "Parse", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		Parser,
		() => []
	)
}

export function collect(_arguments: string): string {
	return $.concatString(_arguments, "!")
}

export async function main(): globalThis.Promise<void> {
	await $.println($.markAsStructValue(new Parser()).Parse($.arrayToSlice<string>(["a", "b"])))
	await $.println(collect("ok"))
}

if ($.isMainScript(import.meta)) {
	await main()
}

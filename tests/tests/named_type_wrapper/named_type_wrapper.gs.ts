// Generated file based on named_type_wrapper.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type MyFileMode = number

$.registerNamedValueType(
	"main.MyFileMode",
	{String: (receiver: any) => (MyFileMode_String as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.MyFileMode",
	{String: (receiver: any) => (MyFileMode_String as any)($.pointerValue(receiver))},
	[$.methodSignature("String", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class FileStatus {
	public declare mode: MyFileMode

	public declare size: bigint

	constructor(__goscriptValue?: boolean, mode$?: MyFileMode, size$?: bigint) {
		this.mode = mode$ ?? 0
		this.size = size$ ?? 0n
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): FileStatus {
		return new FileStatus(true, this.mode, this.size)
	}

	public __goscriptAssign(source: FileStatus): this {
		this.mode = source.mode
		this.size = source.size
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.FileStatus",
		() => new FileStatus(),
		() => [],
		FileStatus,
		() => [{ name: "mode", key: "mode", type: /* @__PURE__ */ $.basicType("int", "main.MyFileMode") }, { name: "size", key: "size", type: /* @__PURE__ */ $.basicType("int64") }]
	)
}

export function MyFileMode_String(m: MyFileMode): string {
	return "mode"
}

export async function main(): globalThis.Promise<void> {
	// Test using the named type directly
	let mode: MyFileMode = 0o644
	await $.println("Mode value:", mode)
	await $.println("Mode string:", MyFileMode_String(mode))

	// Test using in struct
	let status = new FileStatus(true, 493, 1024n)

	await $.println("Status mode:", status.mode)
	await $.println("Status size:", status.size)

	// Test type assertion and conversion
	let genericMode: MyFileMode = 511
	await $.println("Generic mode:", genericMode)
}

if ($.isMainScript(import.meta)) {
	await main()
}

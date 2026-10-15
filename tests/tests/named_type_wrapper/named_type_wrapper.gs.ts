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
	public get mode(): MyFileMode {
		return this._fields.mode
	}

	public set mode(value: MyFileMode) {
		this._fields.mode = value
	}

	public get size(): bigint {
		return this._fields.size
	}

	public set size(value: bigint) {
		this._fields.size = value
	}

	public _fields: {
		mode: MyFileMode
		size: bigint
	}

	constructor(init?: Partial<{mode?: MyFileMode, size?: bigint}>, __goscriptValue?: boolean) {
		this._fields = {
			mode: init?.mode ?? (0 as MyFileMode),
			size: init?.size ?? (0n as bigint)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): FileStatus {
		return new FileStatus(this, true)
	}

	public __goscriptAssign(source: FileStatus): void {
		const target = this._fields
		const values = source._fields
		target.mode = values.mode
		target.size = values.size
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
	await $.println("Mode value:", $.int(mode))
	await $.println("Mode string:", MyFileMode_String(mode))

	// Test using in struct
	let status = new FileStatus({mode: 493, size: 1024n}, true)

	await $.println("Status mode:", $.int(status.mode))
	await $.println("Status size:", status.size)

	// Test type assertion and conversion
	let genericMode: MyFileMode = 511
	await $.println("Generic mode:", $.int(genericMode))
}

if ($.isMainScript(import.meta)) {
	await main()
}

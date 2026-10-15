// Generated file based on anonymous_struct_field_address.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class entry {
	public declare value: number

	constructor(init?: Partial<{value?: number}>, __goscriptValue?: boolean) {
		this.value = init?.value ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): entry {
		return new entry(this, true)
	}

	public __goscriptAssign(source: entry): this {
		this.value = source.value
		return this
	}

	public add(value: number): void {
		let e: entry | $.VarRef<entry> | null = this;
		const e$: entry = e == null ? $.pointerTarget<entry>(e) : (e as any).__isVarRef === true ? (e as any).value : (e as any).__goValue === undefined ? (e as any) : $.pointerTarget<entry>(e);
		;(e$ as entry).value += value
	}

	static __typeInfo = $.registerStructType(
		"main.entry",
		() => new entry(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		entry,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export let box: {"table": entry[]} = $.anonymousStructValue({"table": $.arrayValue(globalThis.Array.from({ length: 2 }, () => new entry(undefined, true)), /* @__PURE__ */ $.arrayType("main.entry", 2))}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("table", /* @__PURE__ */ $.arrayType("main.entry", 2), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/anonymous_struct_field_address" })] })

export function __goscript_set_box(__goscriptValue: {"table": entry[]}): void {
	$.assignStruct(box, __goscriptValue)
}

export function entries(): $.VarRef<entry[]> | null {
	return $.fieldRef(box, "table")
}

export async function main(): globalThis.Promise<void> {
	let table = entries()
	$.arrayIndex($.pointerValue<entry[]>(table), 0).add(5)
	await $.println($.arrayIndex($.pointerValue<entry[]>(table), 0).value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

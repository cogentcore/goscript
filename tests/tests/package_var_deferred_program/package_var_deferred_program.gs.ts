// Generated file based on package_var_deferred_program.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as tables from "@goscript/github.com/s4wave/goscript/tests/tests/package_var_deferred_program/tables/index.js"

export let other: $.VarRef<tables.Codec> = $.varRef(new tables.Codec({Name: "other"}, true))

export function __goscript_set_other(__goscriptValue: tables.Codec): void {
	$.assignStruct(other.value, __goscriptValue)
}

export var labeled: $.Slice<any>

export function __goscript_init_labeled(): void {
	if (((labeled) as any) === undefined) {
		labeled = $.arrayToSlice<any>([$.interfaceValue(tables.__goscript_get_CodecA(), "*tables.Codec", /* @__PURE__ */ $.pointerType("tables.Codec")), tables.Label("y", 6)])
	}
}

export function __goscript_get_labeled(): $.Slice<any> {
	if (((labeled) as any) === undefined) {
		__goscript_init_labeled()
	}
	return labeled
}

export function __goscript_set_labeled(__goscriptValue: $.Slice<any>): void {
	labeled = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	// A deferred list reads the tables of its codecs.
	await $.println("all", $.sliceLen(tables.__goscript_get_All()), $.pointerValue<tables.Codec>($.arrayIndex(tables.__goscript_get_All()!, 0)).Name, $.pointerValue<tables.Codec>($.arrayIndex(tables.__goscript_get_All()!, 1)).Name, $.arrayIndex($.pointerValue<tables.Codec>($.arrayIndex(tables.__goscript_get_All()!, 1)).Decode, 255))
	await $.println("named", $.pointerValue<tables.Codec>($.mustTypeAssert<tables.Codec | $.VarRef<tables.Codec> | null>($.arrayIndex(tables.__goscript_get_Named()!, 0), /* @__PURE__ */ $.pointerType("tables.Codec"))).Name, $.mustTypeAssert<string>($.arrayIndex(tables.__goscript_get_Named()!, 1), /* @__PURE__ */ $.basicType("string")))
	await $.println("labeled", $.pointerValue<tables.Codec>($.mustTypeAssert<tables.Codec | $.VarRef<tables.Codec> | null>($.arrayIndex(__goscript_get_labeled()!, 0), /* @__PURE__ */ $.pointerType("tables.Codec"))).Name, $.mustTypeAssert<string>($.arrayIndex(__goscript_get_labeled()!, 1), /* @__PURE__ */ $.basicType("string")))

	// An assignment after initialization does not change a list built at
	// initialization.
	tables.__goscript_set_CodecC(other)
	await $.println("withc", $.pointerValue<tables.Codec>($.arrayIndex(tables.WithC!, 1)).Name, $.pointerValue<tables.Codec>(tables.__goscript_get_CodecC()).Name)

	// Nor does a change through a pointer method.
	$.pointerValue<tables.Counter>($.pointerValue<tables.Counter>(tables.Count)).Inc()
	await $.println("withcount", $.mustTypeAssert<tables.Counter>($.arrayIndex(tables.WithCount!, 1), "tables.Counter").N, $.pointerValue<tables.Counter>(tables.Count).N)

	// A list that reads a map holds the entry before init changes it.
	await $.println("kind", tables.Kind)
}

if ($.isMainScript(import.meta)) {
	await main()
}

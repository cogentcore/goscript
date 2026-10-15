// Generated file based on package_import_time_parse_layout.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as time from "@goscript/time/index.js"
import "@goscript/time/index.js"

export let fieldLayouts: $.Slice<{"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null}> = $.arrayToSlice<{"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null}>([$.anonymousStructValue({fmt: time.RFC3339, value: "2025-05-15T01:10:42Z", zone: time.UTC}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("fmt", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" }), /* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" }), /* @__PURE__ */ $.structField("zone", /* @__PURE__ */ $.pointerType("time.Location"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" })] }), $.anonymousStructValue({fmt: time.DateTime, value: "2025-05-15 01:10:42", zone: time.FixedZone("local-datetime", 0)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("fmt", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" }), /* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" }), /* @__PURE__ */ $.structField("zone", /* @__PURE__ */ $.pointerType("time.Location"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" })] }), $.anonymousStructValue({fmt: time.DateTime, value: "2025-05-15 01:10:42", zone: time.FixedZone("PDT", -25200)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("fmt", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" }), /* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" }), /* @__PURE__ */ $.structField("zone", /* @__PURE__ */ $.pointerType("time.Location"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_layout" })] })])

export function __goscript_set_fieldLayouts(__goscriptValue: $.Slice<{"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null}>): void {
	fieldLayouts = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	// The layouts github.com/BurntSushi/toml tries in order, with a fixed
	// zone standing in for its local date/time locations.
	let local = time.FixedZone("local", 0)
	let layouts = $.arrayToSlice<string>([time.RFC3339Nano, "2006-01-02T15:04:05.999999999", "2006-01-02", "15:04:05.999999999", "2006-01-02T15:04Z07:00", "2006-01-02T15:04", "15:04"])
	let values = $.arrayToSlice<string>(["1979-05-27T07:32:00Z", "1979-05-27T00:32:00.999999-07:00", "1979-05-27T07:32:00", "1979-05-27T00:32:00.5", "1979-05-27", "07:32:00", "00:32:00.999999", "1979-05-27T07:32Z", "1979-05-27T07:32", "07:32", "1979-05-27 07:32:00"])
	for (let __goscriptRangeTarget1 = values, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as string)
		let matched = false
		for (let __goscriptRangeTarget0 = layouts, __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
			let l = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as string)
			let [t, err] = time.ParseInLocation(l, v, local)
			if (err != null) {
				continue
			}
			await $.println(v, "=>", l, "=>", $.markAsStructValue($.cloneStructValue(t)).Format(time.RFC3339Nano), time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue(t)).Location())), $.markAsStructValue($.cloneStructValue(t)).Year())
			matched = true
			break
		}
		if (!matched) {
			await $.println(v, "=> no match")
		}
	}

	// Errors match Go's ParseError text.
	let bad = $.arrayToSlice<string[]>([$.arrayValue([time.RFC3339, "2025-05-15"]), $.arrayValue(["2006-01-02", "2025-05-15T01:02"]), $.arrayValue(["2006-01-02", "2025-13-01"]), $.arrayValue(["2006-01-02", "2025-02-30"]), $.arrayValue(["15:04", "25:00"]), $.arrayValue([time.DateTime, "2025-5-15 01:10:42"])])
	for (let __goscriptRangeTarget2 = bad, __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		let b = $.cloneArrayValue((__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as string[]), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("string"), 2))
		let [, err] = time.Parse($.arrayIndex(b, 0), $.arrayIndex(b, 1))
		if (err == null) {
			await $.println("unexpected success:", $.arrayIndex(b, 0), $.arrayIndex(b, 1))
			continue
		}
		await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	// Other layout elements.
	let other = $.arrayToSlice<string[]>([$.arrayValue([time.RFC1123Z, "Mon, 02 Jan 2006 15:04:05 -0700"]), $.arrayValue([time.Kitchen, "3:04PM"]), $.arrayValue([time.ANSIC, "Mon Jan  2 15:04:05 2006"]), $.arrayValue(["January 2, 2006 at 3:04pm", "March 9, 2024 at 11:30am"]), $.arrayValue(["2006.002", "2024.060"]), $.arrayValue([time.StampMilli, "Jan  2 15:04:05.123"]), $.arrayValue([time.DateTime, "2025-05-15 01:10:42.25"]), $.arrayValue([time.RFC1123, "Mon, 02 Jan 2006 15:04:05 UTC"])])
	for (let __goscriptRangeTarget3 = other, __goscriptRangeWindow3 = $.sliceRange(__goscriptRangeTarget3), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow3.length; __rangeIndex++) {
		let o = $.cloneArrayValue((__goscriptRangeWindow3.backing[__goscriptRangeWindow3.offset + __rangeIndex] as string[]), /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("string"), 2))
		let [t, err] = time.Parse($.arrayIndex(o, 0), $.arrayIndex(o, 1))
		if (err != null) {
			await $.println("error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			continue
		}
		await $.println($.arrayIndex(o, 1), "=>", $.markAsStructValue($.cloneStructValue(t)).Format(time.RFC3339Nano), time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue(t)).Location())))
	}

	// ParseDuration handles compound and fractional durations.
	let durations = $.arrayToSlice<string>(["1m30s", "1.5h", "-2h45m3.5s", "300ms", "1us", "0", "", "1", "3x", ".s"])
	for (let __goscriptRangeTarget4 = durations, __goscriptRangeWindow4 = $.sliceRange(__goscriptRangeTarget4), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow4.length; __rangeIndex++) {
		let s = (__goscriptRangeWindow4.backing[__goscriptRangeWindow4.offset + __rangeIndex] as string)
		let [d, err] = time.ParseDuration(s)
		if (err != null) {
			await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			continue
		}
		await $.println(s, "=>", time.Duration_String(d))
	}

	// ParseInLocation takes the location from a struct field.
	for (let __goscriptRangeTarget5 = fieldLayouts, __goscriptRangeWindow5 = $.sliceRange(__goscriptRangeTarget5), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow5.length; __rangeIndex++) {
		let f = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow5.backing[__goscriptRangeWindow5.offset + __rangeIndex] as {"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null})))
		let [t, err] = time.ParseInLocation(f.fmt, f.value, f.zone)
		if (err != null) {
			await $.println("error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
			continue
		}
		await $.println("parsed:", $.markAsStructValue($.cloneStructValue(t)).Format(time.RFC3339Nano), time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue(t)).Location())), $.markAsStructValue($.cloneStructValue(t)).Unix())
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

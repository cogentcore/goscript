// Generated file based on package_import_time_parse_location_field.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as time from "@goscript/time/index.js"
import "@goscript/time/index.js"

export let layouts: $.Slice<{"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null}> = $.arrayToSlice<{"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null}>([$.anonymousStructValue({fmt: time.RFC3339, value: "2025-05-15T01:10:42Z", zone: time.UTC}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("fmt", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" }), /* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" }), /* @__PURE__ */ $.structField("zone", /* @__PURE__ */ $.pointerType("time.Location"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" })] }), $.anonymousStructValue({fmt: time.DateTime, value: "2025-05-15 01:10:42", zone: time.FixedZone("local-datetime", 0)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("fmt", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" }), /* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" }), /* @__PURE__ */ $.structField("zone", /* @__PURE__ */ $.pointerType("time.Location"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" })] }), $.anonymousStructValue({fmt: time.DateTime, value: "2025-05-15 01:10:42", zone: time.FixedZone("PDT", -25200)}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("fmt", /* @__PURE__ */ $.basicType("string"), [0], 0, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" }), /* @__PURE__ */ $.structField("value", /* @__PURE__ */ $.basicType("string"), [1], 16, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" }), /* @__PURE__ */ $.structField("zone", /* @__PURE__ */ $.pointerType("time.Location"), [2], 32, false, { pkgPath: "github.com/s4wave/goscript/tests/tests/package_import_time_parse_location_field" })] })])

export function __goscript_set_layouts(__goscriptValue: $.Slice<{"fmt": string, "value": string, "zone": time.Location | $.VarRef<time.Location> | null}>): void {
	layouts = __goscriptValue
}

export async function main(): globalThis.Promise<void> {
	for (let __goscriptRangeTarget0 = layouts, __rangeIndex = 0; __rangeIndex < $.len(__goscriptRangeTarget0); __rangeIndex++) {
		let l = $.markAsStructValue($.cloneStructValue(__goscriptRangeTarget0![__rangeIndex]))
		let [t, err] = time.ParseInLocation(l.fmt, l.value, l.zone)
		if (err != null) {
			await $.println("error:", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
			continue
		}
		await $.println("parsed:", $.markAsStructValue($.cloneStructValue(t)).Format(time.RFC3339Nano), time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue(t)).Location())), $.markAsStructValue($.cloneStructValue(t)).Unix())
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

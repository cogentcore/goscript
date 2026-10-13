// Generated file based on package_import_time_local.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as time from "@goscript/time/index.js"
import "@goscript/time/index.js"

export async function main(): globalThis.Promise<void> {
	// Results here hold in any local time zone.
	let t = $.markAsStructValue($.cloneStructValue(time.Date(2026, 10, 13, 22, 30, 0, 0, time.UTC)))
	let l = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t)).Local()))
	await $.println("local location:", $.pointerEqual($.markAsStructValue($.cloneStructValue(l)).Location(), time.Local))
	await $.println("same instant:", $.markAsStructValue($.cloneStructValue(l)).Equal($.markAsStructValue($.cloneStructValue(t))))
	let [, off] = $.markAsStructValue($.cloneStructValue(l)).Zone()
	let wall = (((($.markAsStructValue($.cloneStructValue(l)).Hour() * 3600) + ($.markAsStructValue($.cloneStructValue(l)).Minute() * 60)) - off) + (2 * 86400)) % 86400
	await $.println("wall clock matches offset:", wall == 81000)
	await $.println("now location:", $.pointerEqual($.markAsStructValue($.cloneStructValue(time.Now())).Location(), time.Local))
	await $.println("unix location:", $.pointerEqual($.markAsStructValue($.cloneStructValue(time.Unix(0n, 0n))).Location(), time.Local))
	await $.println("unix milli location:", $.pointerEqual($.markAsStructValue($.cloneStructValue(time.UnixMilli(0n))).Location(), time.Local))
	await $.println("utc location:", time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(l)).UTC())).Location())))
	await $.println("unix equal:", $.markAsStructValue($.cloneStructValue(time.Unix(1760394600n, 0n))).Equal($.markAsStructValue($.cloneStructValue(time.Date(2025, 10, 13, 22, 30, 0, 0, time.UTC)))))
}

if ($.isMainScript(import.meta)) {
	await main()
}

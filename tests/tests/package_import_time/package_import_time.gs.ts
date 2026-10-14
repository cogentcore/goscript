// Generated file based on package_import_time.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as math from "@goscript/math/index.js"

import * as time from "@goscript/time/index.js"
import "@goscript/math/index.js"
import "@goscript/time/index.js"

export async function main(): globalThis.Promise<void> {
	let now = $.markAsStructValue($.cloneStructValue(time.Now()))
	let setTime = $.markAsStructValue($.cloneStructValue(time.Date(2025, 5, 15, 1, 10, 42, 0, time.UTC)))
	if ($.markAsStructValue($.cloneStructValue(now)).Sub($.markAsStructValue($.cloneStructValue(setTime))) < 86400000000000n) {
		await $.println("expected we are > 24 hrs past may 15, incorrect")
	}

	await $.println("preset time", $.markAsStructValue($.cloneStructValue(setTime)).String())
	await $.println("unix", $.markAsStructValue($.cloneStructValue(setTime)).Unix())
	await $.println("unix micro", $.markAsStructValue($.cloneStructValue(setTime)).UnixMicro())
	await $.println("unix nano", $.markAsStructValue($.cloneStructValue(setTime)).UnixNano())
	await $.println("unix milli", $.markAsStructValue($.cloneStructValue(setTime)).UnixMilli())

	// day, month, etc.
	await $.println("day", $.markAsStructValue($.cloneStructValue(setTime)).Day())
	await $.println("month", $.markAsStructValue($.cloneStructValue(setTime)).Month())
	await $.println("january", 1)
	await $.println("year", $.markAsStructValue($.cloneStructValue(setTime)).Year())
	await $.println("hour", $.markAsStructValue($.cloneStructValue(setTime)).Hour())
	await $.println("minute", $.markAsStructValue($.cloneStructValue(setTime)).Minute())
	await $.println("second", $.markAsStructValue($.cloneStructValue(setTime)).Second())
	await $.println("nanosecond", $.markAsStructValue($.cloneStructValue(setTime)).Nanosecond())
	let [year, month, day] = $.markAsStructValue($.cloneStructValue(setTime)).Date()
	await $.println("date tuple", year, month, day)
	let [hour, minute, second] = $.markAsStructValue($.cloneStructValue(setTime)).Clock()
	await $.println("clock tuple", hour, minute, second)
	let [zoneName, zoneOffset] = $.markAsStructValue($.cloneStructValue(setTime)).Zone()
	await $.println("zone tuple", zoneName, zoneOffset)
	await $.println("add date", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(setTime)).AddDate(1, 2, 3))).UTC())).Format(time.RFC3339))

	// other functions on setTime
	await $.println("weekday", time.Weekday_String($.markAsStructValue($.cloneStructValue(setTime)).Weekday()))
	await $.println("location", time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue(setTime)).Location())))
	await $.println("utc", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(setTime)).UTC())).Format("2006-01-02T15:04:05Z07:00"))
	await $.println("seconds", time.Duration_Seconds(($.int64Mul(1500n, 1000000n))))
	await $.println("duration string", time.Duration_String(($.int64Mul(1500n, 1000000n))))
	await $.println("negative duration before", $.markAsStructValue($.cloneStructValue(time.Now())).After($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(time.Now())).Add(-60000000000n)))))

	let [duration, durationErr] = time.ParseDuration("1.5s")
	await $.println("parsed duration", duration, durationErr == null)
	let [, badDurationErr] = time.ParseDuration("not-a-duration")
	await $.println("bad duration err", badDurationErr != null)

	let timer: time.Timer | $.VarRef<time.Timer> | null = time.AfterFunc(9223372036854775807n, $.functionValue((): void => {
	}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo)))
	await $.println("max duration timer stopped", time.Timer.prototype.Stop.call($.pointerValue<time.Timer>(timer)))
	let maxDuration = 9223372036854775807n
	await $.println("max duration converted", maxDuration > 0n)

	let [parsed, parseErr] = time.Parse(time.RFC3339, "2025-05-15T01:10:42Z")
	await $.println("parsed time", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(parsed)).UTC())).Format(time.RFC3339), parseErr == null)
	await $.println("parsed nano", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(parsed)).UTC())).Format(time.RFC3339Nano))
	let [, badParseErr] = time.Parse(time.RFC3339, "not-a-time")
	await $.println("bad time err", badParseErr != null)

	await marshal()
	await local()
}

export async function local(): globalThis.Promise<void> {
	let t = $.markAsStructValue($.cloneStructValue(time.Date(2026, 10, 13, 22, 30, 0, 0, time.UTC)))
	let l = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t)).Local()))
	await $.println("local location", $.pointerEqual($.markAsStructValue($.cloneStructValue(l)).Location(), time.Local), $.markAsStructValue($.cloneStructValue(l)).Equal($.markAsStructValue($.cloneStructValue(t))))
	let [, off] = $.markAsStructValue($.cloneStructValue(l)).Zone()
	let wall = (((($.markAsStructValue($.cloneStructValue(l)).Hour() * 3600) + ($.markAsStructValue($.cloneStructValue(l)).Minute() * 60)) - off) + (2 * 86400)) % 86400
	await $.println("local wall clock matches offset", wall == 81000)
	let [name, ] = $.markAsStructValue($.cloneStructValue(l)).Zone()
	await $.println("local zone name is an abbreviation", (!$.stringEqual(name, "")) && (!$.stringEqual(name, "Local")))
	await $.println("local zone name formats as MST", $.stringEqual($.markAsStructValue($.cloneStructValue(l)).Format("MST"), name))
	await $.println("now location", $.pointerEqual($.markAsStructValue($.cloneStructValue(time.Now())).Location(), time.Local))
	await $.println("unix location", $.pointerEqual($.markAsStructValue($.cloneStructValue(time.Unix(0n, 0n))).Location(), time.Local), $.pointerEqual($.markAsStructValue($.cloneStructValue(time.UnixMilli(0n))).Location(), time.Local))
	await $.println("local utc location", time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(l)).UTC())).Location())))
	await $.println("unix equal", $.markAsStructValue($.cloneStructValue(time.Unix(1760394600n, 0n))).Equal($.markAsStructValue($.cloneStructValue(time.Date(2025, 10, 13, 22, 30, 0, 0, time.UTC)))))
}

export async function marshal(): globalThis.Promise<void> {
	let t = $.markAsStructValue($.cloneStructValue(time.Date(2025, 5, 15, 1, 10, 42, 123456789, time.UTC)))
	let __goscriptTuple0: any = $.markAsStructValue($.cloneStructValue(t)).MarshalJSON()
	let b: $.Slice<number> = __goscriptTuple0[0]
	let err = __goscriptTuple0[1]
	await $.println("marshal json", $.bytesToString(b), err == null)
	let u: $.VarRef<time.Time> = $.varRef($.markAsStructValue(new time.Time()))
	err = u.value.UnmarshalJSON(b)
	await $.println("unmarshal json", err == null, $.markAsStructValue($.cloneStructValue(u.value)).Equal($.markAsStructValue($.cloneStructValue(t))))
	await $.println("unmarshal json null", u.value.UnmarshalJSON(new Uint8Array([110, 117, 108, 108])) == null, $.markAsStructValue($.cloneStructValue(u.value)).Equal($.markAsStructValue($.cloneStructValue(t))))
	await $.println("unmarshal json number err", u.value.UnmarshalJSON(new Uint8Array([49, 50])) != null)

	let __goscriptTuple1: any = $.markAsStructValue($.cloneStructValue(t)).MarshalText()
	let text: $.Slice<number> = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("marshal text", $.bytesToString(text), err == null)
	let v: $.VarRef<time.Time> = $.varRef($.markAsStructValue(new time.Time()))
	await $.println("unmarshal text", v.value.UnmarshalText(text) == null, $.markAsStructValue($.cloneStructValue(v.value)).Equal($.markAsStructValue($.cloneStructValue(t))))
	await $.println("unmarshal bad text", v.value.UnmarshalText(new Uint8Array([98, 97, 100])) != null, $.markAsStructValue($.cloneStructValue(v.value)).IsZero())

	let __goscriptTuple2: any = $.markAsStructValue($.cloneStructValue(time.Date(10000, 1, 1, 0, 0, 0, 0, time.UTC))).MarshalJSON()
	err = __goscriptTuple2[1]
	await $.println("marshal json year 10000 err", await $.pointerValue<Exclude<$.GoError, null>>(err).Error())
}

if ($.isMainScript(import.meta)) {
	await main()
}

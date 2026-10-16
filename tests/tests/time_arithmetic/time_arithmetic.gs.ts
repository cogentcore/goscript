// Generated file based on time_arithmetic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as math from "@goscript/math/index.js"
import * as time from "@goscript/time/index.js"
import "@goscript/math/index.js"

export async function show(label: string, t: time.Time): globalThis.Promise<void> {
	await $.println(label, $.markAsStructValue($.cloneStructValue(t)).Format(time.RFC3339Nano), $.markAsStructValue($.cloneStructValue(t)).UnixNano())
}

export async function main(): globalThis.Promise<void> {
	// Add and Sub of short and long durations, also across milliseconds.
	let t0 = $.markAsStructValue($.cloneStructValue(time.Date(2026, 10, 16, 1, 2, 3, 999_999_999, time.UTC)))
	await show("add ns", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(1n))))
	await show("add -ns", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(-1000000000n))))
	await show("add sub-ms", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(1500001n))))
	await show("add -sub-ms", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(-1500001n))))
	await show("add 200 days", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(17280000000000007n))))
	await show("add -300 years", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(-9145440000000000003n))))
	await show("add max", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(time.Date(1, 1, 1, 0, 0, 0, 0, time.UTC))).Add(9223372036854775807n))))
	let t = $.markAsStructValue($.cloneStructValue(t0))
	let d: time.Duration = 0n
	for (let __rangeIndex = 0; __rangeIndex < 100; __rangeIndex++) {
		t = $.assignStruct(t, $.markAsStructValue($.cloneStructValue(t)).Add(1000003n))
		d = $.int64Add(d, $.markAsStructValue($.cloneStructValue(t)).Sub($.markAsStructValue($.cloneStructValue(t0))))
	}
	await $.println("loop", d, $.markAsStructValue($.cloneStructValue(t)).Sub($.markAsStructValue($.cloneStructValue(t0))), $.markAsStructValue($.cloneStructValue(t0)).Sub($.markAsStructValue($.cloneStructValue(t))))
	let far = $.markAsStructValue($.cloneStructValue(time.Date(2400, 1, 1, 0, 0, 0, 5, time.UTC)))
	await $.println("sub long", $.markAsStructValue($.cloneStructValue(far)).Sub($.markAsStructValue($.cloneStructValue(t0))), $.markAsStructValue($.cloneStructValue(t0)).Sub($.markAsStructValue($.cloneStructValue(far))))
	await $.println("sub saturates", $.markAsStructValue($.cloneStructValue(time.Date(2500, 1, 1, 0, 0, 0, 0, time.UTC))).Sub($.markAsStructValue($.cloneStructValue(time.Date(1500, 1, 1, 0, 0, 0, 0, time.UTC)))) == 9223372036854775807n, $.markAsStructValue($.cloneStructValue(time.Date(1500, 1, 1, 0, 0, 0, 0, time.UTC))).Sub($.markAsStructValue($.cloneStructValue(time.Date(2500, 1, 1, 0, 0, 0, 0, time.UTC)))) == -9223372036854775808n)
	await $.println("compare", $.markAsStructValue($.cloneStructValue(t)).After($.markAsStructValue($.cloneStructValue(t0))), $.markAsStructValue($.cloneStructValue(t)).Before($.markAsStructValue($.cloneStructValue(t0))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(1n))).Equal($.markAsStructValue($.cloneStructValue(t0))), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(1n))).Add(-1n))).Equal($.markAsStructValue($.cloneStructValue(t0))), $.markAsStructValue($.cloneStructValue(t0)).Compare($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Add(1n)))))

	// Round and Truncate to multiples since the zero time; halfway rounds up.
	for (let __goscriptRangeTarget0 = $.arrayToSlice<time.Duration>([0n, -1n, 1n, 1000n, 1000000n, 1500000000n, 1000000000n, 60000000000n, 420000000000n, 3600000000000n, 86400000000000n, 4611686018427387907n]), __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let d = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as time.Duration)
		await show("round " + time.Duration_String(d), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Round(d))))
		await show("truncate " + time.Duration_String(d), $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).Truncate(d))))
	}
	let half = $.markAsStructValue($.cloneStructValue(time.Date(2026, 1, 1, 0, 0, 0, 500_000_000, time.UTC)))
	await show("round half", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(half)).Round(1000000000n))))
	await show("round below half", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(half)).Add(-1n))).Round(1000000000n))))
	let old = $.markAsStructValue($.cloneStructValue(time.Date(-5, 3, 1, 12, 30, 0, 250, time.UTC)))
	await show("round before zero", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(old)).Round(3600000000000n))))
	await show("truncate before zero", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(old)).Truncate(3600000000000n))))
	let zone = time.FixedZone("X", 19800)
	await show("truncate zone", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).In(zone))).Truncate(86400000000000n))))
	await $.println("zone kept", time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(t0)).In(zone))).Round(3600000000000n))).Location())))

	// Duration.Round and Truncate, also halfway, negative and saturating.
	for (let __goscriptRangeTarget1 = $.arrayToSlice<time.Duration>([1499n, 1500n, -1500n, -1501n, 9223372036854775807n, -9223372036854775808n, 123456789123456789n]), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as time.Duration)
		await $.println("duration", v, time.Duration_Round(v, 1000n), time.Duration_Truncate(v, 1000n), time.Duration_Round(v, 3600000000000n), time.Duration_Round(v, 0n))
	}

	// Monotonic readings move with Add and are stripped by Round, Truncate
	// and In.
	let now = $.markAsStructValue($.cloneStructValue(time.Now()))
	let later = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(now)).Add(1500000000n)))
	await $.println("mono", $.markAsStructValue($.cloneStructValue(later)).Sub($.markAsStructValue($.cloneStructValue(now))), $.markAsStructValue($.cloneStructValue(now)).Sub($.markAsStructValue($.cloneStructValue(later))), $.markAsStructValue($.cloneStructValue(later)).After($.markAsStructValue($.cloneStructValue(now))))
	await $.println("mono stripped", $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(now)).Round(0n))).Equal($.markAsStructValue($.cloneStructValue(now))))
	await $.println("mono string", $.stringLen($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(now)).Round(0n))).String()) < $.stringLen($.markAsStructValue($.cloneStructValue(now)).String()))
}

if ($.isMainScript(import.meta)) {
	await main()
}

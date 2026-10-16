package main

import (
	"math"
	"time"
)


func show(label string, t time.Time) {
	println(label, t.Format(time.RFC3339Nano), t.UnixNano())
}

func main() {
	// Add and Sub of short and long durations, also across milliseconds.
	t0 := time.Date(2026, 10, 16, 1, 2, 3, 999_999_999, time.UTC)
	show("add ns", t0.Add(1))
	show("add -ns", t0.Add(-1_000_000_000))
	show("add sub-ms", t0.Add(1_500_001))
	show("add -sub-ms", t0.Add(-1_500_001))
	show("add 200 days", t0.Add(200*24*time.Hour+7))
	show("add -300 years", t0.Add(-290*365*24*time.Hour-3))
	show("add max", time.Date(1, 1, 1, 0, 0, 0, 0, time.UTC).Add(math.MaxInt64))
	t := t0
	var d time.Duration
	for range 100 {
		t = t.Add(time.Millisecond + 3)
		d += t.Sub(t0)
	}
	println("loop", d, t.Sub(t0), t0.Sub(t))
	far := time.Date(2400, 1, 1, 0, 0, 0, 5, time.UTC)
	println("sub long", far.Sub(t0), t0.Sub(far))
	println("sub saturates", time.Date(2500, 1, 1, 0, 0, 0, 0, time.UTC).Sub(time.Date(1500, 1, 1, 0, 0, 0, 0, time.UTC)) == math.MaxInt64,
		time.Date(1500, 1, 1, 0, 0, 0, 0, time.UTC).Sub(time.Date(2500, 1, 1, 0, 0, 0, 0, time.UTC)) == math.MinInt64)
	println("compare", t.After(t0), t.Before(t0), t0.Add(1).Equal(t0), t0.Add(1).Add(-1).Equal(t0), t0.Compare(t0.Add(1)))

	// Round and Truncate to multiples since the zero time; halfway rounds up.
	for _, d := range []time.Duration{0, -1, 1, time.Microsecond, time.Millisecond, 1500 * time.Millisecond, time.Second, time.Minute, 7 * time.Minute, time.Hour, 24 * time.Hour, 1<<62 + 3} {
		show("round "+d.String(), t0.Round(d))
		show("truncate "+d.String(), t0.Truncate(d))
	}
	half := time.Date(2026, 1, 1, 0, 0, 0, 500_000_000, time.UTC)
	show("round half", half.Round(time.Second))
	show("round below half", half.Add(-1).Round(time.Second))
	old := time.Date(-5, 3, 1, 12, 30, 0, 250, time.UTC)
	show("round before zero", old.Round(time.Hour))
	show("truncate before zero", old.Truncate(time.Hour))
	zone := time.FixedZone("X", 5*3600+1800)
	show("truncate zone", t0.In(zone).Truncate(24*time.Hour))
	println("zone kept", t0.In(zone).Round(time.Hour).Location().String())

	// Duration.Round and Truncate, also halfway, negative and saturating.
	for _, v := range []time.Duration{1499, 1500, -1500, -1501, math.MaxInt64, math.MinInt64, 123_456_789_123_456_789} {
		println("duration", v, v.Round(1000), v.Truncate(1000), v.Round(time.Hour), v.Round(0))
	}

	// Monotonic readings move with Add and are stripped by Round, Truncate
	// and In.
	now := time.Now()
	later := now.Add(1500 * time.Millisecond)
	println("mono", later.Sub(now), now.Sub(later), later.After(now))
	println("mono stripped", now.Round(0).Equal(now))
	println("mono string", len(now.Round(0).String()) < len(now.String()))
}

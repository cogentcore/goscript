package main

import "time"

func main() {
	// The layouts github.com/BurntSushi/toml tries in order, with a fixed
	// zone standing in for its local date/time locations.
	local := time.FixedZone("local", 0)
	layouts := []string{
		time.RFC3339Nano,
		"2006-01-02T15:04:05.999999999",
		"2006-01-02",
		"15:04:05.999999999",
		"2006-01-02T15:04Z07:00",
		"2006-01-02T15:04",
		"15:04",
	}
	values := []string{
		"1979-05-27T07:32:00Z",
		"1979-05-27T00:32:00.999999-07:00",
		"1979-05-27T07:32:00",
		"1979-05-27T00:32:00.5",
		"1979-05-27",
		"07:32:00",
		"00:32:00.999999",
		"1979-05-27T07:32Z",
		"1979-05-27T07:32",
		"07:32",
		"1979-05-27 07:32:00",
	}
	for _, v := range values {
		matched := false
		for _, l := range layouts {
			t, err := time.ParseInLocation(l, v, local)
			if err != nil {
				continue
			}
			println(v, "=>", l, "=>", t.Format(time.RFC3339Nano), t.Location().String(), t.Year())
			matched = true
			break
		}
		if !matched {
			println(v, "=> no match")
		}
	}

	// Errors match Go's ParseError text.
	bad := [][2]string{
		{time.RFC3339, "2025-05-15"},
		{"2006-01-02", "2025-05-15T01:02"},
		{"2006-01-02", "2025-13-01"},
		{"2006-01-02", "2025-02-30"},
		{"15:04", "25:00"},
		{time.DateTime, "2025-5-15 01:10:42"},
	}
	for _, b := range bad {
		_, err := time.Parse(b[0], b[1])
		if err == nil {
			println("unexpected success:", b[0], b[1])
			continue
		}
		println(err.Error())
	}

	// Other layout elements.
	other := [][2]string{
		{time.RFC1123Z, "Mon, 02 Jan 2006 15:04:05 -0700"},
		{time.Kitchen, "3:04PM"},
		{time.ANSIC, "Mon Jan  2 15:04:05 2006"},
		{"January 2, 2006 at 3:04pm", "March 9, 2024 at 11:30am"},
		{"2006.002", "2024.060"},
		{time.StampMilli, "Jan  2 15:04:05.123"},
		{time.DateTime, "2025-05-15 01:10:42.25"},
		{time.RFC1123, "Mon, 02 Jan 2006 15:04:05 UTC"},
	}
	for _, o := range other {
		t, err := time.Parse(o[0], o[1])
		if err != nil {
			println("error:", err.Error())
			continue
		}
		println(o[1], "=>", t.Format(time.RFC3339Nano), t.Location().String())
	}

	// ParseDuration handles compound and fractional durations.
	durations := []string{"1m30s", "1.5h", "-2h45m3.5s", "300ms", "1us", "0", "", "1", "3x", ".s"}
	for _, s := range durations {
		d, err := time.ParseDuration(s)
		if err != nil {
			println(err.Error())
			continue
		}
		println(s, "=>", d.String())
	}
}

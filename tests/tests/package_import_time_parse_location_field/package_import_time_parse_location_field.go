package main

import "time"

// layouts holds *time.Location values in struct fields that are passed to
// time.ParseInLocation, as github.com/BurntSushi/toml does.
var layouts = []struct {
	fmt   string
	value string
	zone  *time.Location
}{
	{time.RFC3339, "2025-05-15T01:10:42Z", time.UTC},
	{time.DateTime, "2025-05-15 01:10:42", time.FixedZone("local-datetime", 0)},
	{time.DateTime, "2025-05-15 01:10:42", time.FixedZone("PDT", -7*60*60)},
}

func main() {
	for _, l := range layouts {
		t, err := time.ParseInLocation(l.fmt, l.value, l.zone)
		if err != nil {
			println("error:", err.Error())
			continue
		}
		println("parsed:", t.Format(time.RFC3339Nano), t.Location().String(), t.Unix())
	}
}

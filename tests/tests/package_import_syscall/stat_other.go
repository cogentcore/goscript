//go:build !js

package main

// statCtime matches the js/wasm result on hosts whose Stat_t has other fields.
func statCtime() string {
	return "1970-01-01T00:00:05.000000007Z 3ns"
}

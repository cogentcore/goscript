//go:build js

package main

import (
	"syscall"
	"time"
)

// statCtime reads the int64 fields of the js/wasm Stat_t.
func statCtime() string {
	stat := syscall.Stat_t{Size: 3, Ctime: 5, CtimeNsec: 7}
	ctime := time.Unix(int64(stat.Ctime), int64(stat.CtimeNsec))
	return ctime.UTC().Format(time.RFC3339Nano) + " " + time.Duration(stat.Size).String()
}

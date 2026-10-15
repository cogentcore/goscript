// Generated file based on stat_js.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as syscall from "@goscript/syscall/index.js"
import * as time from "@goscript/time/index.js"

export function statCtime(): string {
	let stat = $.markAsStructValue(new syscall.Stat_t({Size: 3n, Ctime: 5n, CtimeNsec: 7n}))
	let ctime = $.markAsStructValue($.cloneStructValue(time.Unix(stat.Ctime, stat.CtimeNsec)))
	return $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(ctime)).UTC())).Format(time.RFC3339Nano) + " " + time.Duration_String(stat.Size)
}

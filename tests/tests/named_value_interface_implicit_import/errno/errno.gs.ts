// Generated file based on errno.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Errno = number

export function Errno_Error(e: Errno): string {
	switch (e) {
		case 20:
		{
			return "not a directory"
			break
		}
	}
	return "errno"
}

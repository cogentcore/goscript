// Generated file based on subpkg.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export async function Run(name: string, fn: (() => $.GoError | globalThis.Promise<$.GoError>) | null): globalThis.Promise<void> {
	let err = (__goscriptAwait = fn!(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	if (err != null) {
		await $.println(name, "error")
		return
	}
	await $.println(name, "ok")
}

var __goscriptAwait: any

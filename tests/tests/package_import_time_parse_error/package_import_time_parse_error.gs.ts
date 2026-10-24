// Generated file based on package_import_time_parse_error.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"
import * as time from "@goscript/time/index.js"

export async function main(): globalThis.Promise<void> {
	// A parse failure is a *time.ParseError that errors.As finds.
	let [, err] = time.Parse("2006-01-02", "2024-13-01")
	let pe: $.VarRef<time.ParseError | $.VarRef<time.ParseError> | null> = $.varRef(null! as time.ParseError | $.VarRef<time.ParseError> | null)
	await $.println("as:", errors.As($.pointerValueOrNil(err)!, $.interfaceValue(pe, "**time.ParseError", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.pointerType("time.ParseError")))))
	await $.println("fields:", $.pointerValue<time.ParseError>(pe.value).Layout, $.pointerValue<time.ParseError>(pe.value).Value, $.pointerValue<time.ParseError>(pe.value).Message)
	await $.println("error:", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// A composite literal sets the exported fields, and Error formats them.
	let lit: time.ParseError | $.VarRef<time.ParseError> | null = new time.ParseError({Layout: "15:04", Value: "x", LayoutElem: "15", ValueElem: "x"})
	await $.println("literal:", (lit !== null && (lit as any).__isVarRef !== true && (lit as any).__goValue === undefined ? ((lit as any) as time.ParseError).Error() : time.ParseError.prototype.Error.call($.pointerValue<time.ParseError>(lit))))
	lit = new time.ParseError({Value: "y", Message: ": bad"})
	await $.println("message:", (lit !== null && (lit as any).__isVarRef !== true && (lit as any).__goValue === undefined ? ((lit as any) as time.ParseError).Error() : time.ParseError.prototype.Error.call($.pointerValue<time.ParseError>(lit))))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

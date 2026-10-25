// Generated file based on override_package_var_address.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as strconv from "@goscript/strconv/index.js"
import * as time from "@goscript/time/index.js"

export async function main(): globalThis.Promise<void> {
	// Taking the address of a variable of a hand-written package does not
	// change how other uses of the variable read it.
	let p = $.varRef(time.UTC)
	await $.println(time.Location.prototype.String.call($.pointerValue<time.Location>(($.pointerValue<time.Location | $.VarRef<time.Location> | null>(p)))))
	let e = reflect.ValueOf($.interfaceValue($.varRef(strconv.ErrRange), "*error", /* @__PURE__ */ $.pointerType("error"))).Elem()
	await $.println((__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>($.mustTypeAssert<$.GoError>(e.Interface(), "error")).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	let t = $.markAsStructValue($.cloneStructValue(time.Date(2000, 1, 2, 3, 4, 5, 0, time.UTC)))
	await $.println($.markAsStructValue($.cloneStructValue(t)).Year(), time.Location.prototype.String.call($.pointerValue<time.Location>($.markAsStructValue($.cloneStructValue(t)).Location())))
	let [, err] = strconv.Atoi("99999999999999999999999")
	await $.println(errors.Is($.pointerValueOrNil(err)!, $.pointerValueOrNil(strconv.ErrRange)!), (__goscriptAwait = $.pointerValue<Exclude<$.GoError, null>>(strconv.ErrRange).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

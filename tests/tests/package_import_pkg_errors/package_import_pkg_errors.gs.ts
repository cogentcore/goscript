// Generated file based on package_import_pkg_errors.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/github.com/pkg/errors/index.js"

export async function main(): globalThis.Promise<void> {
	// Test New
	let err1 = errors.New("basic error")
	await $.println("New error:", (__goscriptAwait = (err1 !== null && (err1 as any).__isVarRef !== true && ((err1 as any).__goValue === undefined || (err1 as any).__goType?.charCodeAt(0) !== 42) ? (err1 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err1)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Errorf
	let err2 = errors.Errorf("formatted error: %d", $.basicInterfaceValue(42, "int"))
	await $.println("Errorf error:", (__goscriptAwait = (err2 !== null && (err2 as any).__isVarRef !== true && ((err2 as any).__goValue === undefined || (err2 as any).__goType?.charCodeAt(0) !== 42) ? (err2 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err2)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test WithStack
	let baseErr = errors.New("base error")
	let err3 = errors.WithStack($.pointerValueOrNil(baseErr)!)
	await $.println("WithStack error:", (__goscriptAwait = (err3 !== null && (err3 as any).__isVarRef !== true && ((err3 as any).__goValue === undefined || (err3 as any).__goType?.charCodeAt(0) !== 42) ? (err3 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err3)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Wrap
	let err4 = errors.Wrap($.pointerValueOrNil(baseErr)!, "wrapped message")
	await $.println("Wrap error:", (__goscriptAwait = (err4 !== null && (err4 as any).__isVarRef !== true && ((err4 as any).__goValue === undefined || (err4 as any).__goType?.charCodeAt(0) !== 42) ? (err4 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err4)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Wrapf
	let err5 = errors.Wrapf($.pointerValueOrNil(baseErr)!, "wrapped with format: %s", "test")
	await $.println("Wrapf error:", (__goscriptAwait = (err5 !== null && (err5 as any).__isVarRef !== true && ((err5 as any).__goValue === undefined || (err5 as any).__goType?.charCodeAt(0) !== 42) ? (err5 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err5)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test WithMessage
	let err6 = errors.WithMessage($.pointerValueOrNil(baseErr)!, "additional message")
	await $.println("WithMessage error:", (__goscriptAwait = (err6 !== null && (err6 as any).__isVarRef !== true && ((err6 as any).__goValue === undefined || (err6 as any).__goType?.charCodeAt(0) !== 42) ? (err6 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err6)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test WithMessagef
	let err7 = errors.WithMessagef($.pointerValueOrNil(baseErr)!, "additional formatted message: %d", $.basicInterfaceValue(123, "int"))
	await $.println("WithMessagef error:", (__goscriptAwait = (err7 !== null && (err7 as any).__isVarRef !== true && ((err7 as any).__goValue === undefined || (err7 as any).__goType?.charCodeAt(0) !== 42) ? (err7 as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err7)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test Cause
	let cause = errors.Cause($.pointerValueOrNil(err4)!)
	await $.println("Cause error:", (__goscriptAwait = (cause !== null && (cause as any).__isVarRef !== true && ((cause as any).__goValue === undefined || (cause as any).__goType?.charCodeAt(0) !== 42) ? (cause as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(cause)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Test nil handling
	let nilErr = errors.WithStack(null!)
	if (nilErr == null) {
		await $.println("WithStack with nil returns nil")
	}

	let nilWrap = errors.Wrap(null!, "message")
	if (nilWrap == null) {
		await $.println("Wrap with nil returns nil")
	}

	let err: $.GoError = null! as $.GoError
	let nilWrapVar = errors.Wrap($.pointerValueOrNil(err)!, "message")
	if (nilWrapVar == null) {
		await $.println("Wrap with nil error variable returns nil")
	}

	// Test Go 1.13 error handling
	let unwrapped = errors.Unwrap($.pointerValueOrNil(err4)!)
	if (unwrapped != null) {
		await $.println("Unwrap error:", (__goscriptAwait = (unwrapped !== null && (unwrapped as any).__isVarRef !== true && ((unwrapped as any).__goValue === undefined || (unwrapped as any).__goType?.charCodeAt(0) !== 42) ? (unwrapped as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(unwrapped)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	// Test Is
	if (errors.Is($.pointerValueOrNil(err4)!, $.pointerValueOrNil(baseErr)!)) {
		await $.println("Is check passed")
	}

	await $.println("test finished")
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

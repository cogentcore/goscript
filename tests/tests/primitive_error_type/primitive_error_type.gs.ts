// Generated file based on primitive_error_type.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type MyError = number

$.registerNamedValueType(
	"main.MyError",
	{Error: (receiver: any) => (MyError_Error as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

$.registerNamedValueType(
	"*main.MyError",
	{Error: (receiver: any) => (MyError_Error as any)($.pointerValue(receiver))},
	[$.methodSignature("Error", [], [/* @__PURE__ */ $.basicType("string")])]
);

export const ErrNegative: MyError = -1

export function MyError_Error(e: MyError): string {
	if (e == 0) {
		return "no error"
	}
	return "error occurred"
}

export function mayFail(n: number): $.GoError {
	if (n < 0) {
		return $.namedValueInterfaceValue<$.GoError>(n, "main.MyError", {"Error": MyError_Error}, /* @__PURE__ */ $.basicType("int", "main.MyError"))
	}
	return null
}

export async function main(): globalThis.Promise<void> {
	let err = mayFail(5)
	if (err == null) {
		await $.println("mayFail(5): no error")
	} else {
		await $.println("mayFail(5):", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	err = mayFail(-1)
	if (err == null) {
		await $.println("mayFail(-1): no error")
	} else {
		await $.println("mayFail(-1):", (__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}

	{
		let __goscriptSwitch0 = err
		switch ((true as boolean)) {
			case $.comparableEqual(__goscriptSwitch0, $.namedValueInterfaceValue<$.GoError>(-1, "main.MyError", {"Error": MyError_Error}, /* @__PURE__ */ $.basicType("int", "main.MyError"))):
			{
				await $.println("switch: matched primitive error")
				break
			}
			default:
			{
				await $.println("switch: missed primitive error")
				break
			}
		}
	}
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on redeclaration_assign.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function returnsOneIntOneBool(): [number, boolean] {
	return [7, true]
}

export function shadowTupleInput(value: string): [string, boolean] {
	return [value + "-inner", true]
}

export function shadowCallbackInput(fn: ((_p0: number) => number | globalThis.Promise<number>) | null): [number, boolean] {
	return [(fn!(5) as number), true]
}

export async function selectResultRedeclare(): globalThis.Promise<void> {
	let resultCh = $.makeChannel<string>(1, "", "both")
	await $.chanSend(resultCh, "ready")
	const [__goscriptSelect0HasReturn, __goscriptSelect0Value] = await $.selectStatement<any, void>([
		{
			id: 0,
			isSend: false,
			channel: resultCh,
			onSelected: async (__goscriptSelect0Result) => {
				let result = __goscriptSelect0Result.value
				await $.println("select result:", result)
			}
		}
	], false)
	if (__goscriptSelect0HasReturn) {
		return __goscriptSelect0Value
	}
}

export async function typeSwitchCaseRedeclare(value: any): globalThis.Promise<void> {
	{
		const __goscriptTypeSwitchValue = value
		switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic0())) {
			case 0:
				{
					let hashed = "int"
					await $.println("type hashed:", hashed)
				}
				break
			case 1:
				{
					let hashed = "string"
					await $.println("type hashed:", hashed)
				}
				break
		}
	}
}

export async function main(): globalThis.Promise<void> {
	let i = 0
	await $.println("initial i:", i)

	// i already exists from the var declaration above.
	// err is a new variable being declared.
	let __goscriptTuple0: any = returnsOneIntOneBool()
	i = __goscriptTuple0[0]
	let err: boolean = __goscriptTuple0[1]

	await $.println("after assign i:", i)
	if (err) {
		await $.println("err is true")
	} else {
		await $.println("err is false")
	}

	let value = "outer"
	{
		let __goscriptShadow0 = value
		let __goscriptTuple1: any = shadowTupleInput(__goscriptShadow0)
		let __goscriptShadow1: string = __goscriptTuple1[0]
		let ok: boolean = __goscriptTuple1[1]
		await $.println("shadow tuple:", __goscriptShadow1, ok)
	}

	{
		let __goscriptTuple2: any = shadowCallbackInput($.functionValue((k: number): number => {
			return k + 1
		}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo)))
		let k: number = __goscriptTuple2[0]
		let ok: boolean = __goscriptTuple2[1]
		await $.println("callback shadow:", k, ok)
	}

	await selectResultRedeclare()
	await typeSwitchCaseRedeclare($.basicInterfaceValue(1, "int"))
	await typeSwitchCaseRedeclare("two")
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.typeSwitchSite([/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("string")]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on shadow_define_init.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export function next(n: number): [number, $.GoError] {
	return [n + 1, null]
}

export function switchInit(pos: number): number {
	let __goscriptShadow0 = pos
	{
		let __goscriptTuple0: any = next(__goscriptShadow0)
		let __goscriptShadow1: number = __goscriptTuple0[0]
		let err: $.GoError = __goscriptTuple0[1]
		let __goscriptSwitch0 = err
		switch ((true as boolean)) {
			case __goscriptSwitch0 == null:
			{
				return __goscriptShadow1
				break
			}
		}
	}
	return -1
}

export function ifInit(pos: number): number {
	let __goscriptShadow2 = pos
	{
		let __goscriptTuple1: any = next(__goscriptShadow2)
		let __goscriptShadow3: number = __goscriptTuple1[0]
		let err: $.GoError = __goscriptTuple1[1]
		if (err == null) {
			return __goscriptShadow3
		}
	}
	return -1
}

export function block(pos: number): number {
	{
		let __goscriptShadow4 = pos
		let __goscriptTuple2: any = next(__goscriptShadow4)
		let __goscriptShadow5: number = __goscriptTuple2[0]
		let err: $.GoError = __goscriptTuple2[1]
		if (err == null) {
			return __goscriptShadow5
		}
	}
	return -1
}

export function single(pos: number): number {
	let __goscriptShadow6 = pos
	{
		let __goscriptShadow7 = __goscriptShadow6 * 2
		switch (__goscriptShadow7) {
			case 4:
			{
				return __goscriptShadow7
				break
			}
		}
	}
	return -1
}

export function forInit(i: number): number {
	let sum = 0
	{
		let __goscriptShadow8 = i
		for (let __goscriptShadow9 = __goscriptShadow8; __goscriptShadow9 < 3; __goscriptShadow9++) {
			sum += __goscriptShadow9
		}
	}
	return sum
}

export function typeSwitchInit(v: any): number {
	let __goscriptShadow10 = v
	let __goscriptTuple3: any = $.typeAssertTuple<number>(__goscriptShadow10, /* @__PURE__ */ $.basicType("int"))
	let __goscriptShadow11: number = __goscriptTuple3[0]
	let ok: boolean = __goscriptTuple3[1]
	{
		const __goscriptTypeSwitchValue = ok
		switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic0())) {
			case 0:
				{
					return __goscriptShadow11
				}
				break
		}
	}
	return -1
}

export async function main(): globalThis.Promise<void> {
	await $.println("switchInit:", switchInit(1))
	await $.println("ifInit:", ifInit(1))
	await $.println("block:", block(1))
	await $.println("single:", single(2))
	await $.println("forInit:", forInit(1))
	await $.println("typeSwitchInit:", typeSwitchInit($.basicInterfaceValue(5, "int")))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.typeSwitchSite([/* @__PURE__ */ $.basicType("bool")]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

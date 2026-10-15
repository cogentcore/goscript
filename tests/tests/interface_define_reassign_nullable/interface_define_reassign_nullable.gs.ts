// Generated file based on interface_define_reassign_nullable.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export type Shape = {
	Area(): number
}

$.registerInterfaceType(
	"main.Shape",
	null,
	[$.methodSignature("Area", [], [/* @__PURE__ */ $.basicType("int")])]
);

export class Square {
	public declare Side: number

	constructor(init?: Partial<{Side?: number}>, __goscriptValue?: boolean) {
		this.Side = init?.Side ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Square {
		return new Square(this, true)
	}

	public __goscriptAssign(source: Square): this {
		this.Side = source.Side
		return this
	}

	public Area(): number {
		const s = this;
		return s.Side * s.Side
	}

	static __typeInfo = $.registerStructType(
		"main.Square",
		() => new Square(),
		() => [$.methodSignature("Area", [], [/* @__PURE__ */ $.basicType("int")])],
		Square,
		() => [/* @__PURE__ */ $.structField("Side", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export function find(ok: boolean): Shape | null {
	if (ok) {
		return $.interfaceValue<Shape | null>(new Square({Side: 2}, true), "main.Square", "main.Square")
	}
	return null
}

export function first(): Shape | null {
	return $.interfaceValue<Shape | null>(new Square({Side: 3}, true), "main.Square", "main.Square")
}

export async function main(): globalThis.Promise<void> {
	// A variable declared from a call result keeps its interface type,
	// so it can be assigned a nil interface later.
	let s = first()
	await $.println((__goscriptAwait = (s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? (s as Exclude<Shape, null>) : $.pointerValue<Exclude<Shape, null>>(s)).Area(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	s = find(false)
	await $.println(s == null)

	// reflect.Type results, as in jinzhu/copier.
	let elem: reflect.Type | null = (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue($.arrayToSlice<number>([]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))).Elem(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
	elem = reflect.PtrTo($.pointerValueOrNil(elem)!)
	await $.println((__goscriptAwait = (elem !== null && (elem as any).__isVarRef !== true && (elem as any).__goValue === undefined ? (elem as Exclude<reflect.Type, null>) : $.pointerValue<Exclude<reflect.Type, null>>(elem)).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

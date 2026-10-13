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

	public _fields: {
		Side: number
	}

	constructor(init?: Partial<{Side?: number}>) {
		this._fields = {
			Side: init?.Side ?? (0 as number)
		}
	}

	public clone(): Square {
		return $.markAsStructValue(new Square(this))
	}

	public Area(): number {
		const s = this;
		return s.Side * s.Side
	}

	static {
		$.bindStructFields(this.prototype, ["Side"])
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
		return $.interfaceValue<Shape | null>($.markAsStructValue(new Square({Side: 2})), "main.Square", "main.Square")
	}
	return null
}

export function first(): Shape | null {
	return $.interfaceValue<Shape | null>($.markAsStructValue(new Square({Side: 3})), "main.Square", "main.Square")
}

export async function main(): globalThis.Promise<void> {
	// A variable declared from a call result keeps its interface type,
	// so it can be assigned a nil interface later.
	let s = first()
	await $.println(await $.pointerValue<Exclude<Shape, null>>(s).Area())
	s = find(false)
	await $.println(s == null)

	// reflect.Type results, as in jinzhu/copier.
	let elem: reflect.Type | null = await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue($.arrayToSlice<number>([]), "[]int", /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("int"))))).Elem()
	elem = reflect.PtrTo($.pointerValueOrNil(elem)!)
	await $.println(await $.pointerValue<Exclude<reflect.Type, null>>(elem).String())
}

if ($.isMainScript(import.meta)) {
	await main()
}

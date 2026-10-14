// Generated file based on interface_slice_index_short_decl.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/interface_slice_index_short_decl/dep/index.js"
import "@goscript/github.com/s4wave/goscript/tests/tests/interface_slice_index_short_decl/dep/index.js"

export type value = Uint8Array

$.registerNamedType("main.value", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2));

$.registerNamedValueType(
	"main.value",
	{Key: (receiver: any, ...args: any[]) => (value_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]
);

$.registerNamedValueType(
	"*main.value",
	{Key: (receiver: any, ...args: any[]) => (value_Key as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]
);

export type Fixed = $.Slice<dep.Ref | null>

$.registerNamedType("main.Fixed", /* @__PURE__ */ $.sliceType("dep.Ref"));

$.registerNamedValueType(
	"main.Fixed",
	{Mark: (receiver: any, ...args: any[]) => (Fixed_Mark as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Mark", [], [/* @__PURE__ */ $.basicType("bool")])]
);

$.registerNamedValueType(
	"*main.Fixed",
	{Mark: (receiver: any, ...args: any[]) => (Fixed_Mark as any)($.pointerValue(receiver), ...$.stripGenericTypeArgs(args))},
	[$.methodSignature("Mark", [], [/* @__PURE__ */ $.basicType("bool")])]
);

export type Shape = {
	Mark(): boolean
}

$.registerInterfaceType(
	"main.Shape",
	null,
	[{ name: "Mark", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }]
);

export class Action {
	public get Result(): number {
		return this._fields.Result
	}

	public set Result(value: number) {
		this._fields.Result = value
	}

	public get Filter(): globalThis.Map<number, dep.Ref | null> | null {
		return this._fields.Filter
	}

	public set Filter(value: globalThis.Map<number, dep.Ref | null> | null) {
		this._fields.Filter = value
	}

	public _fields: {
		Result: number
		Filter: globalThis.Map<number, dep.Ref | null> | null
	}

	constructor(init?: Partial<{Result?: number, Filter?: globalThis.Map<number, dep.Ref | null> | null}>) {
		this._fields = {
			Result: init?.Result ?? (0 as number),
			Filter: init?.Filter ?? (null! as globalThis.Map<number, dep.Ref | null> | null)
		}
	}

	public clone(): Action {
		return $.markAsStructValue(new Action(this))
	}

	public __goscriptAssign(source: Action): void {
		const target = this._fields
		const values = source._fields
		target.Result = values.Result
		target.Filter = values.Filter
	}

	public Mark(): boolean {
		const a = this;
		return a.Filter != null
	}

	public SetFilter(k: number, v: dep.Ref | null): void {
		let a: Action | $.VarRef<Action> | null = this;
		if ($.pointerValue<Action>(a).Filter == null) {
			$.pointerValue<Action>(a).Filter = $.makeMap<number, dep.Ref | null>()
		}
		$.mapSet($.pointerValue<Action>(a).Filter, k, v)
	}

	static __typeInfo = $.registerStructType(
		"main.Action",
		() => new Action(),
		() => [{ name: "Mark", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("bool") }] }, { name: "SetFilter", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }, { type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		Action,
		() => [{ name: "Result", key: "Result", type: /* @__PURE__ */ $.basicType("int") }, { name: "Filter", key: "Filter", type: /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("int"), "dep.Ref") }]
	)
}

export function value_Key(v: value): any {
	return $.namedValueInterfaceValue<any>(v, "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())
}

export function Fixed_Mark(f: Fixed): boolean {
	return $.sliceLen((f as Fixed)) != 0
}

export async function main(): globalThis.Promise<void> {
	let shapes: $.Slice<Shape | null> = $.arrayToSlice<Shape | null>([$.namedValueInterfaceValue<Shape | null>($.arrayToSlice<dep.Ref | null>([$.namedValueInterfaceValue<dep.Ref | null>($.arrayValue(new Uint8Array([1, 2])), "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())]), "main.Fixed", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()), $.interfaceValue<Shape | null>($.markAsStructValue(new Action({Result: 1, Filter: $.makeMap<number, dep.Ref | null>([[1, $.namedValueInterfaceValue<dep.Ref | null>($.arrayValue(new Uint8Array([1, 2])), "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())]])})), "main.Action", "main.Action")])
	let fixed: $.Slice<Fixed> = null! as $.Slice<Fixed>
	for (let __goscriptRangeTarget0 = shapes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let shape = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Shape | null)
		{
			const __goscriptTypeSwitchValue = shape
			switch (true) {
				case $.typeAssert<Fixed>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType("dep.Ref", "main.Fixed")).ok:
					{
						let shape: Fixed = $.typeAssert<Fixed>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType("dep.Ref", "main.Fixed")).value
						shape = ($.appendOne((shape as Fixed), $.namedValueInterfaceValue<dep.Ref | null>($.arrayValue(new Uint8Array([3, 4])), "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.appendZeros.nil) as Fixed)
						fixed = $.appendOne(fixed, (shape as Fixed), $.appendZeros.nil)
					}
					break
				case $.typeAssert<Action>(__goscriptTypeSwitchValue, "main.Action").ok:
					{
						let shape: $.VarRef<Action> = $.varRef($.markAsStructValue($.cloneStructValue($.typeAssert<Action>(__goscriptTypeSwitchValue, "main.Action").value)))
						let fix: Fixed = ($.arrayIndex(fixed!, 0) as Fixed)
						let fv = $.arrayIndex(fix!, 0)
						{
							let v = $.mapGet<number, dep.Ref | null, dep.Ref | null>(shape.value.Filter, shape.value.Result, null)[0]
							if (v != null) {
								await dep.ToKey(v)
								await dep.ToKey(fv)
							}
						}
						shape.value.SetFilter(2, fv)
					}
					break
			}
		}
	}
	let fix: Fixed = ($.arrayIndex(fixed!, 0) as Fixed)
	let fv = $.arrayIndex(fix!, 0)
	if (await dep.ToKey(fv) != null) {
		await $.println("ok")
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Key: (receiver: any, ...args: any[]) => (value_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ("main.value")
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ([$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])])
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({Mark: (receiver: any, ...args: any[]) => (Fixed_Mark as any)(($.isVarRef(receiver) ? receiver.value : receiver), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.sliceType("dep.Ref", "main.Fixed"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("Mark", [], [/* @__PURE__ */ $.basicType("bool")])])
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on interface_slice_index_short_decl.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/interface_slice_index_short_decl/dep/index.js"

export type value = Uint8Array

$.registerNamedType("main.value", /* @__PURE__ */ $.arrayType(/* @__PURE__ */ $.basicType("uint8"), 2));

$.registerNamedValueType(
	"main.value",
	{Key: (receiver: any) => (value_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]
);

$.registerNamedValueType(
	"*main.value",
	{Key: (receiver: any) => (value_Key as any)($.pointerValue(receiver))},
	[$.methodSignature("Key", [], [{ kind: $.TypeKind.Interface, methods: [] }])]
);

export type Fixed = $.Slice<dep.Ref | null>

$.registerNamedType("main.Fixed", /* @__PURE__ */ $.sliceType("dep.Ref"));

$.registerNamedValueType(
	"main.Fixed",
	{Mark: (receiver: any) => (Fixed_Mark as any)(($.isVarRef(receiver) ? receiver.value : receiver))},
	[$.methodSignature("Mark", [], [/* @__PURE__ */ $.basicType("bool")])]
);

$.registerNamedValueType(
	"*main.Fixed",
	{Mark: (receiver: any) => (Fixed_Mark as any)($.pointerValue(receiver))},
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
	public declare Result: number

	public declare Filter: globalThis.Map<number, dep.Ref | null> | null

	constructor(__goscriptValue?: boolean, Result$?: number, Filter$?: globalThis.Map<number, dep.Ref | null> | null) {
		this.Result = Result$ ?? 0
		this.Filter = Filter$ ?? (null! as globalThis.Map<number, dep.Ref | null> | null)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Action {
		return new Action(true, this.Result, this.Filter)
	}

	public __goscriptAssign(source: Action): this {
		this.Result = source.Result
		this.Filter = source.Filter
		return this
	}

	public Mark(): boolean {
		const a = this;
		return a.Filter != null
	}

	public SetFilter(k: number, v: dep.Ref | null): void {
		const a: Action | $.VarRef<Action> | null = this;
		const a$: Action = a == null ? $.pointerTarget<Action>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<Action>(a)
		if ((a$ as Action).Filter == null) {
			;(a$ as Action).Filter = $.makeMap<number, dep.Ref | null>()
		}
		$.mapSet((a$ as Action).Filter, k, v)
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
	let shapes = $.arrayToSlice<Shape | null>([$.namedValueInterfaceValue<Shape | null>($.arrayToSlice<dep.Ref | null>([$.namedValueInterfaceValue<dep.Ref | null>($.arrayValue(new Uint8Array([1, 2])), "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())]), "main.Fixed", __goscriptStatic3(), __goscriptStatic4(), __goscriptStatic5()), $.structInterfaceValue<Shape | null>(new Action(true, 1, $.makeMap<number, dep.Ref | null>([[1, $.namedValueInterfaceValue<dep.Ref | null>($.arrayValue(new Uint8Array([1, 2])), "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2())]])), "main.Action", "main.Action")])
	let fixed: $.Slice<Fixed> = null! as $.Slice<Fixed>
	for (let __goscriptRangeTarget0 = shapes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let shape = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as Shape | null)
		{
			const __goscriptTypeSwitchValue = shape
			switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic6())) {
				case 0:
					{
						let shape: Fixed = $.typeAssert<Fixed>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType("dep.Ref", "main.Fixed")).value
						shape = ($.appendOne((shape as Fixed), $.namedValueInterfaceValue<dep.Ref | null>($.arrayValue(new Uint8Array([3, 4])), "main.value", __goscriptStatic0(), __goscriptStatic1(), __goscriptStatic2()), $.appendZeros.nil) as Fixed)
						fixed = $.appendOne(fixed, (shape as Fixed), $.appendZeros.nil)
					}
					break
				case 1:
					{
						let shape: $.VarRef<Action> = $.varRef($.markAsStructValue($.cloneStructValue($.typeAssert<Action>(__goscriptTypeSwitchValue, "main.Action").value)))
						let fix = ($.plainSliceIndex(fixed!, 0) as Fixed)
						let fv = $.plainSliceIndex(fix!, 0)
						{
							let v = $.mapGet<number, dep.Ref | null, dep.Ref | null>(shape.value.Filter, shape.value.Result, null)[0]
							if (v != null) {
								dep.ToKey(v)
								dep.ToKey(fv)
							}
						}
						shape.value.SetFilter(2, fv)
					}
					break
			}
		}
	}
	let fix = ($.plainSliceIndex(fixed!, 0) as Fixed)
	let fv = $.plainSliceIndex(fix!, 0)
	if (dep.ToKey(fv) != null) {
		await $.println("ok")
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({Key: (receiver: any) => (value_Key as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
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
	return __goscriptStatic3$value ??= ({Mark: (receiver: any) => (Fixed_Mark as any)(($.isVarRef(receiver) ? receiver.value : receiver))})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= (/* @__PURE__ */ $.sliceType("dep.Ref", "main.Fixed"))
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ([$.methodSignature("Mark", [], [/* @__PURE__ */ $.basicType("bool")])])
}

var __goscriptStatic6$value: any
function __goscriptStatic6(): any {
	return __goscriptStatic6$value ??= ($.typeSwitchSite([/* @__PURE__ */ $.sliceType("dep.Ref", "main.Fixed"), "main.Action"]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on generic_constrained_slice_clone.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type clonable = {
	CloneVT(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"main.clonable",
	null,
	[{ name: "CloneVT", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class item {
	public declare value: string

	constructor(__goscriptValue?: boolean, value$?: string) {
		this.value = value$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): item {
		return new item(true, this.value)
	}

	public __goscriptAssign(source: item): this {
		this.value = source.value
		return this
	}

	public CloneVT(): item | $.VarRef<item> | null {
		const i: item | $.VarRef<item> | null = this;
		if (i == null) {
			return null
		}
		return new item(false, $.pointerValue<item>(i).value)
	}

	static __typeInfo = $.registerStructType(
		"main.item",
		() => new item(),
		() => [{ name: "CloneVT", args: [], returns: [{ type: /* @__PURE__ */ $.pointerType("main.item") }], pointerReceiver: true }],
		item,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function cloneSlice<T>(__typeArgs: $.GenericTypeArgs | undefined, items: $.Slice<T>): globalThis.Promise<$.Slice<T>> {
	let cloned: $.Slice<T> = $.makeSlice<T>(0, $.sliceLen(items), $.genericSliceTypeHint(__typeArgs, "T"), () => ($.genericZero(__typeArgs, "T", null) as T))
	for (let __goscriptRangeTarget0 = items, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let item = $.copyElement((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as any))
		cloned = $.append(cloned, (__goscriptAwait = $.callGenericMethod(__typeArgs, "T", "CloneVT", item), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.appendZero(() => ($.genericZero(__typeArgs, "T", null) as T)))
	}
	return cloned
}

export async function main(): globalThis.Promise<void> {
	let items = $.arrayToSlice<item | $.VarRef<item> | null>([new item(false, "first"), new item(false, "second")])
	let cloned = (await cloneSlice(__goscriptStatic0(), items) as $.Slice<item | $.VarRef<item> | null>)
	await $.println($.sliceLen(cloned), $.pointerValue<item>($.arrayIndex(cloned!, 0)).value, $.pointerValue<item>($.arrayIndex(cloned!, 1)).value, ($.arrayIndex(cloned!, 0) === $.arrayIndex(items!, 0) || $.pointerAliasesMade && $.pointerEqual($.arrayIndex(cloned!, 0), $.arrayIndex(items!, 0))))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.pointerType("main.item"), zero: () => null, methods: {CloneVT: (receiver: any) => $.pointerValue(receiver).CloneVT()} }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

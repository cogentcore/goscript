// Generated file based on generic_interface_type_name.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export type node = {
	Name(): string
}

$.registerInterfaceType(
	"main.node",
	null,
	[{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }]
);

export type sizer = {
	Size(): number
}

$.registerInterfaceType(
	"main.sizer",
	null,
	[{ name: "Size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class label {
	public declare text: string

	constructor(__goscriptValue?: boolean, text$?: string) {
		this.text = text$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): label {
		return new label(true, this.text)
	}

	public __goscriptAssign(source: label): this {
		this.text = source.text
		return this
	}

	public Name(): string {
		const l: label | $.VarRef<label> | null = this;
		return "label:" + $.pointerValue<label>(l).text
	}

	static __typeInfo = $.registerStructType(
		"main.label",
		() => new label(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		label,
		() => [{ name: "text", key: "text", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class icon {
	public declare size: number

	constructor(__goscriptValue?: boolean, size$?: number) {
		this.size = size$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): icon {
		return new icon(true, this.size)
	}

	public __goscriptAssign(source: icon): this {
		this.size = source.size
		return this
	}

	public Name(): string {
		const i: icon | $.VarRef<icon> | null = this;
		return (fmt.Sprint("icon:", $.basicInterfaceValue($.pointerValue<icon>(i).size, "int")) as string)
	}

	public Size(): number {
		const i: icon | $.VarRef<icon> | null = this;
		return $.pointerValue<icon>(i).size
	}

	static __typeInfo = $.registerStructType(
		"main.icon",
		() => new icon(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		icon,
		() => [{ name: "size", key: "size", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newNode(__typeArgs: $.GenericTypeArgs | undefined): node | null {
	return $.typeParamInterfaceValue<node | null>($.genericInterfaceValue($.genericNew(__typeArgs, "T", null), "*T", /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), __typeArgs?.["PT"] ?? { type: { kind: $.TypeKind.Interface, methods: [$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])] }, zero: () => null })
}

export function box(__typeArgs: $.GenericTypeArgs | undefined, __goscriptParam0: any): $.Slice<any> {
	let v: $.VarRef<any> = $.varRef(__goscriptParam0)
	return $.arrayToSlice<any>([$.typeParamInterfaceValue<any>(v.value, __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }), $.typeParamPointerInterfaceValue(v, __typeArgs?.["T"], "*T", /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), $.genericInterfaceValue($.arrayToSlice<any>([$.copyElement(v.value)]), "[]T", /* @__PURE__ */ $.sliceType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })), $.genericInterfaceValue($.makeMap<string, any>([["k", $.copyElement(v.value)]]), "map[string]T", /* @__PURE__ */ $.mapType(/* @__PURE__ */ $.basicType("string"), __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }))])
}

export async function main(): globalThis.Promise<void> {
	// Values made in generic code keep the names of their own types.
	let nodes = $.arrayToSlice<node | null>([newNode(__goscriptStatic0()), newNode(__goscriptStatic1()), newNode(__goscriptStatic0()), newNode(__goscriptStatic1())])
	for (let __goscriptRangeTarget0 = nodes, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let n = (__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as node | null)
		let [, isSizer] = $.typeAssertTuple<sizer | null>(n, "main.sizer")
		fmt.Printf("%T %v %v\n", (n as any), isSizer, (__goscriptAwait = (n !== null && (n as any).__isVarRef !== true && ((n as any).__goValue === undefined || (n as any).__goType?.charCodeAt(0) !== 42) ? (n as Exclude<node, null>) : $.pointerValue<Exclude<node, null>>(n)).Name(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	}
	for (let __goscriptRangeTarget1 = box(__goscriptStatic2(), new label(true, "x")), __goscriptRangeWindow1 = $.sliceRange(__goscriptRangeTarget1), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow1.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow1.backing[__goscriptRangeWindow1.offset + __rangeIndex] as any)
		fmt.Printf("%T\n", v)
	}
	for (let __goscriptRangeTarget2 = box(__goscriptStatic3(), $.plainSliceIndex(nodes!, 0)), __goscriptRangeWindow2 = $.sliceRange(__goscriptRangeTarget2), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow2.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow2.backing[__goscriptRangeWindow2.offset + __rangeIndex] as any)
		fmt.Printf("%T\n", v)
	}
	for (let __goscriptRangeTarget3 = box(__goscriptStatic4(), 3), __goscriptRangeWindow3 = $.sliceRange(__goscriptRangeTarget3), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow3.length; __rangeIndex++) {
		let v = (__goscriptRangeWindow3.backing[__goscriptRangeWindow3.offset + __rangeIndex] as any)
		fmt.Printf("%T\n", v)
	}
	{
		const __goscriptTypeSwitchValue = $.plainSliceIndex(nodes!, 1)
		switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic5())) {
			case 0:
				{
					fmt.Println("switch: label")
				}
				break
			case 1:
				{
					fmt.Println("switch: icon")
				}
				break
		}
	}
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.label", zero: () => new label(true) }, PT: { type: /* @__PURE__ */ $.pointerType("main.label"), zero: () => null, methods: {Name: (receiver: any) => $.pointerValue(receiver).Name()} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.icon", zero: () => new icon(true) }, PT: { type: /* @__PURE__ */ $.pointerType("main.icon"), zero: () => null, methods: {Name: (receiver: any) => $.pointerValue(receiver).Name(), Size: (receiver: any) => $.pointerValue(receiver).Size()} }})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.label", zero: () => new label(true) }})
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.node", zero: () => null, methods: {Name: (receiver: any) => receiver.Name()} }})
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ($.typeSwitchSite([/* @__PURE__ */ $.pointerType("main.label"), /* @__PURE__ */ $.pointerType("main.icon")]))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

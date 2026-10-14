// Generated file based on generic_type_switch_type_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/fmt/index.js"

export class Value {
	public declare Val: number

	public declare Unit: string

	public _fields: {
		Val: number
		Unit: string
	}

	constructor(init?: Partial<{Val?: number, Unit?: string}>) {
		this._fields = {
			Val: init?.Val ?? (0 as number),
			Unit: init?.Unit ?? ("" as string)
		}
	}

	public clone(): Value {
		return $.markAsStructValue(new Value(this))
	}

	public async String(): globalThis.Promise<string> {
		const v = this;
		return fmt.Sprintf("%g%s", $.basicInterfaceValue(v.Val, "float32"), v.Unit)
	}

	static {
		$.bindStructFields(this.prototype, ["Val", "Unit"])
	}

	static __typeInfo = $.registerStructType(
		"main.Value",
		() => new Value(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Value,
		() => [{ name: "Val", key: "Val", type: /* @__PURE__ */ $.basicType("float32") }, { name: "Unit", key: "Unit", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Sides {
	public declare Top: any

	public declare Right: any

	public _fields: {
		Top: any
		Right: any
	}

	constructor(init?: Partial<{Top?: any, Right?: any}>) {
		this._fields = {
			Top: init?.Top ?? (null! as any),
			Right: init?.Right ?? (null! as any)
		}
	}

	public clone(): Sides {
		return $.markAsStructValue(new Sides(this))
	}

	public async SetAny(__typeArgs: $.GenericTypeArgs | undefined, a: any): globalThis.Promise<string> {
		let s: Sides | $.VarRef<Sides> | null = this;
		{
			const __goscriptTypeSwitchValue = a
			switch (true) {
				case $.typeAssert<Sides>(__goscriptTypeSwitchValue, "main.Sides").ok:
					{
						let val: Sides = $.markAsStructValue($.cloneStructValue($.typeAssert<Sides>(__goscriptTypeSwitchValue, "main.Sides").value))
						$.assignStruct($.pointerValue<Sides>(s), $.markAsStructValue($.cloneStructValue(val)))
						return "Sides[T]"
					}
					break
				case $.typeAssert<Sides | $.VarRef<Sides> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Sides")).ok:
					{
						let val: Sides | $.VarRef<Sides> | null = $.typeAssert<Sides | $.VarRef<Sides> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Sides")).value
						$.assignStruct($.pointerValue<Sides>(s), $.markAsStructValue($.cloneStructValue($.pointerValue<Sides>(val))))
						return "*Sides[T]"
					}
					break
				case $.typeAssert<any>(__goscriptTypeSwitchValue, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }).ok:
					{
						let val: any = $.typeAssert<any>(__goscriptTypeSwitchValue, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }).value
						let __goscriptAssign0_0: any = val
						let __goscriptAssign0_1: any = val
						$.pointerValue<Sides>(s).Top = __goscriptAssign0_0
						$.pointerValue<Sides>(s).Right = __goscriptAssign0_1
						return "T"
					}
					break
				case $.typeAssert<any>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).ok:
					{
						let val: any = $.typeAssert<any>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).value
						let __goscriptAssign1_0: any = $.pointerValue<any>(val)
						let __goscriptAssign1_1: any = $.pointerValue<any>(val)
						$.pointerValue<Sides>(s).Top = __goscriptAssign1_0
						$.pointerValue<Sides>(s).Right = __goscriptAssign1_1
						return "*T"
					}
					break
				case $.typeAssert<$.Slice<any>>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).ok:
					{
						let val: $.Slice<any> = $.typeAssert<$.Slice<any>>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).value
						let __goscriptAssign2_0: any = $.arrayIndex(val!, 0)
						let __goscriptAssign2_1: any = $.arrayIndex(val!, 1)
						$.pointerValue<Sides>(s).Top = __goscriptAssign2_0
						$.pointerValue<Sides>(s).Right = __goscriptAssign2_1
						return "[]T"
					}
					break
				case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
					{
						let val: string = $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).value
						return $.concatString("string ", val)
					}
					break
				default:
					{
						let val: any = __goscriptTypeSwitchValue
						return fmt.Sprintf("default %v", val)
					}
					break
			}
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	static {
		$.bindStructFields(this.prototype, ["Top", "Right"])
	}

	static __typeInfo = $.registerStructType(
		"main.Sides",
		() => new Sides(),
		() => [{ name: "SetAny", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Sides,
		() => [{ name: "Top", key: "Top", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Right", key: "Right", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: $.markAsStructValue(new Value()), Right: $.markAsStructValue(new Value())})))
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, "3px"))
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, $.interfaceValue($.markAsStructValue(new Value({Val: 1, Unit: "px"})), "main.Value", "main.Value")), await $.markAsStructValue($.cloneStructValue(s.value.Top)).String())
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, $.interfaceValue(new Value({Val: 2, Unit: "em"}), "*main.Value", /* @__PURE__ */ $.pointerType("main.Value"))), await $.markAsStructValue($.cloneStructValue(s.value.Right)).String())
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, $.interfaceValue($.arrayToSlice<Value>([$.markAsStructValue(new Value({Val: 3, Unit: "a"})), $.markAsStructValue(new Value({Val: 4, Unit: "b"}))]), "[]main.Value", /* @__PURE__ */ $.sliceType("main.Value"))), await $.markAsStructValue($.cloneStructValue(s.value.Top)).String(), await $.markAsStructValue($.cloneStructValue(s.value.Right)).String())
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, $.interfaceValue($.markAsStructValue(new Sides({Top: $.markAsStructValue(new Value({Val: 5, Unit: "c"})), Right: $.markAsStructValue(new Value())})), "main.Sides", "main.Sides")), await $.markAsStructValue($.cloneStructValue(s.value.Top)).String())
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, $.namedValueInterfaceValue<any>(new Sides({Right: $.markAsStructValue(new Value({Val: 6, Unit: "d"})), Top: $.markAsStructValue(new Value())}), "*main.Sides", {SetAny: (receiver: any, ...args: any[]) => $.pointerValue(receiver).SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, ...$.stripGenericTypeArgs(args))}, /* @__PURE__ */ $.pointerType("main.Sides"), [$.methodSignature("SetAny", [["a", { kind: $.TypeKind.Interface, methods: [] }]], [/* @__PURE__ */ $.basicType("string")])])), await $.markAsStructValue($.cloneStructValue(s.value.Right)).String())
	await $.println(await s.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => $.markAsStructValue(new Value()), methods: {String: (receiver: any, ...args: any[]) => $.pointerValue(receiver).String(...$.stripGenericTypeArgs(args))} }}, $.basicInterfaceValue(7, "int")))

	let f: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0})))
	await $.println(await f.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }}, $.basicInterfaceValue(1.5, "float32")), f.value.Top)
	await $.println(await f.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }}, $.basicInterfaceValue(1.5, "float64")))
	await $.println(await f.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }}, "x"))

	let i: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0})))
	await $.println(await i.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, $.basicInterfaceValue(3, "int")), i.value.Top)
	await $.println(await i.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, $.basicInterfaceValue(3n, "int64")))
	await $.println(await i.value.SetAny({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }}, $.basicInterfaceValue(3.5, "float64")))
}

if ($.isMainScript(import.meta)) {
	await main()
}

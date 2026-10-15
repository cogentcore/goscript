// Generated file based on generic_type_switch_type_param.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export class Value {
	public declare Val: number

	public declare Unit: string

	constructor(init?: Partial<{Val?: number, Unit?: string}>, __goscriptValue?: boolean) {
		this.Val = init?.Val ?? (0 as number)
		this.Unit = init?.Unit ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Value {
		return new Value(this, true)
	}

	public __goscriptAssign(source: Value): this {
		this.Val = source.Val
		this.Unit = source.Unit
		return this
	}

	public String(): string {
		const v = this;
		return (fmt.Sprintf("%g%s", $.basicInterfaceValue(v.Val, "float32"), v.Unit) as string)
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

	constructor(init?: Partial<{Top?: any, Right?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.Top = init?.Top !== undefined ? (__goscriptFresh === true ? init.Top : $.copyElement(init.Top)) : (null! as any)
		this.Right = init?.Right !== undefined ? (__goscriptFresh === true ? init.Right : $.copyElement(init.Right)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Sides {
		return new Sides(this, true)
	}

	public __goscriptAssign(source: Sides): this {
		this.Top = $.assignFieldValue(this.Top, source.Top)
		this.Right = $.assignFieldValue(this.Right, source.Right)
		return this
	}

	public SetAny(__typeArgs: $.GenericTypeArgs | undefined, a: any): string {
		let s: Sides | $.VarRef<Sides> | null = this;
		const s$: Sides = s == null ? $.pointerTarget<Sides>(s) : (s as any).__isVarRef === true ? (s as any).value : (s as any).__goValue === undefined ? (s as any) : $.pointerTarget<Sides>(s)
		{
			const __goscriptTypeSwitchValue = a
			switch (true) {
				case $.typeAssert<Sides>(__goscriptTypeSwitchValue, "main.Sides").ok:
					{
						let val: Sides = $.markAsStructValue($.cloneStructValue($.typeAssert<Sides>(__goscriptTypeSwitchValue, "main.Sides").value))
						$.assignStruct((s$ as Sides), (val).clone())
						return "Sides[T]"
					}
					break
				case $.typeAssert<Sides | $.VarRef<Sides> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Sides")).ok:
					{
						let val: Sides | $.VarRef<Sides> | null = $.typeAssert<Sides | $.VarRef<Sides> | null>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType("main.Sides")).value
						$.assignStruct((s$ as Sides), ($.pointerValue<Sides>(val)).clone())
						return "*Sides[T]"
					}
					break
				case $.typeAssert<any>(__goscriptTypeSwitchValue, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }).ok:
					{
						let val: any = $.typeAssert<any>(__goscriptTypeSwitchValue, __typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] }).value
						let __goscriptAssign0_0: any = $.copyElement(val)
						let __goscriptAssign0_1: any = $.copyElement(val);
						;(s$ as Sides).Top = __goscriptAssign0_0;
						;(s$ as Sides).Right = __goscriptAssign0_1
						return "T"
					}
					break
				case $.typeAssert<any>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).ok:
					{
						let val: any = $.typeAssert<any>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.pointerType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).value
						let __goscriptAssign1_0: any = $.copyElement($.pointerValue<any>(val))
						let __goscriptAssign1_1: any = $.copyElement($.pointerValue<any>(val));
						;(s$ as Sides).Top = __goscriptAssign1_0;
						;(s$ as Sides).Right = __goscriptAssign1_1
						return "*T"
					}
					break
				case $.typeAssert<$.Slice<any>>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).ok:
					{
						let val: $.Slice<any> = $.typeAssert<$.Slice<any>>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.sliceType(__typeArgs?.["T"]?.type ?? { kind: $.TypeKind.Interface, methods: [] })).value
						let __goscriptAssign2_0: any = $.copyElement($.arrayIndex(val!, 0))
						let __goscriptAssign2_1: any = $.copyElement($.arrayIndex(val!, 1));
						;(s$ as Sides).Top = __goscriptAssign2_0;
						;(s$ as Sides).Right = __goscriptAssign2_1
						return "[]T"
					}
					break
				case $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).ok:
					{
						let val: string = $.typeAssert<string>(__goscriptTypeSwitchValue, /* @__PURE__ */ $.basicType("string")).value
						return "string " + val
					}
					break
				default:
					{
						let val: any = __goscriptTypeSwitchValue
						return (fmt.Sprintf("default %v", val) as string)
					}
					break
			}
		}
		throw new globalThis.Error("goscript: unreachable return")
	}

	static __typeInfo = $.registerStructType(
		"main.Sides",
		() => new Sides(),
		() => [{ name: "SetAny", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Sides,
		() => [{ name: "Top", key: "Top", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "Right", key: "Right", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: new Value(undefined, true), Right: new Value(undefined, true)}, undefined, true)))
	await $.println(s.value.SetAny(__goscriptStatic0(), "3px"))
	await $.println(s.value.SetAny(__goscriptStatic0(), $.interfaceValue(new Value({Val: 1, Unit: "px"}, true), "main.Value", "main.Value")), $.markAsStructValue($.cloneStructValue(s.value.Top)).String())
	await $.println(s.value.SetAny(__goscriptStatic0(), $.interfaceValue(new Value({Val: 2, Unit: "em"}), "*main.Value", /* @__PURE__ */ $.pointerType("main.Value"))), $.markAsStructValue($.cloneStructValue(s.value.Right)).String())
	await $.println(s.value.SetAny(__goscriptStatic0(), $.interfaceValue($.arrayToSlice<Value>([new Value({Val: 3, Unit: "a"}, true), new Value({Val: 4, Unit: "b"}, true)]), "[]main.Value", /* @__PURE__ */ $.sliceType("main.Value"))), $.markAsStructValue($.cloneStructValue(s.value.Top)).String(), $.markAsStructValue($.cloneStructValue(s.value.Right)).String())
	await $.println(s.value.SetAny(__goscriptStatic0(), $.interfaceValue($.markAsStructValue(new Sides({Top: new Value({Val: 5, Unit: "c"}, true), Right: new Value(undefined, true)})), "main.Sides", "main.Sides")), $.markAsStructValue($.cloneStructValue(s.value.Top)).String())
	await $.println(s.value.SetAny(__goscriptStatic0(), $.namedValueInterfaceValue<any>(new Sides({Right: new Value({Val: 6, Unit: "d"}, true), Top: new Value(undefined, true)}), "*main.Sides", __goscriptStatic1(), __goscriptStatic2(), __goscriptStatic3())), $.markAsStructValue($.cloneStructValue(s.value.Right)).String())
	await $.println(s.value.SetAny(__goscriptStatic0(), $.basicInterfaceValue(7, "int")))

	let f: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0}, undefined, true)))
	await $.println(f.value.SetAny(__goscriptStatic4(), $.basicInterfaceValue(1.5, "float32")), f.value.Top)
	await $.println(f.value.SetAny(__goscriptStatic4(), $.basicInterfaceValue(1.5, "float64")))
	await $.println(f.value.SetAny(__goscriptStatic4(), "x"))

	let i: $.VarRef<Sides> = $.varRef($.markAsStructValue(new Sides({Top: 0, Right: 0}, undefined, true)))
	await $.println(i.value.SetAny(__goscriptStatic5(), $.basicInterfaceValue(3, "int")), i.value.Top)
	await $.println(i.value.SetAny(__goscriptStatic5(), $.basicInterfaceValue(3n, "int64")))
	await $.println(i.value.SetAny(__goscriptStatic5(), $.basicInterfaceValue(3.5, "float64")))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.Value", zero: () => new Value(undefined, true), methods: {String: (receiver: any) => $.pointerValue(receiver).String()} }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({SetAny: (receiver: any, ...args: any[]) => $.pointerValue(receiver).SetAny(__goscriptStatic0(), ...$.stripGenericTypeArgs(args))})
}

var __goscriptStatic2$value: any
function __goscriptStatic2(): any {
	return __goscriptStatic2$value ??= (/* @__PURE__ */ $.pointerType("main.Sides"))
}

var __goscriptStatic3$value: any
function __goscriptStatic3(): any {
	return __goscriptStatic3$value ??= ([$.methodSignature("SetAny", [["a", { kind: $.TypeKind.Interface, methods: [] }]], [/* @__PURE__ */ $.basicType("string")])])
}

var __goscriptStatic4$value: any
function __goscriptStatic4(): any {
	return __goscriptStatic4$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("float32"), zero: () => 0 }})
}

var __goscriptStatic5$value: any
function __goscriptStatic5(): any {
	return __goscriptStatic5$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

if ($.isMainScript(import.meta)) {
	await main()
}

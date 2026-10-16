// Generated file based on reflect_struct_field_go_types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as reflect from "@goscript/reflect/index.js"
import * as strings from "@goscript/strings/index.js"

export class Inner {
	public declare X: number

	constructor(__goscriptValue?: boolean, X$?: number) {
		this.X = X$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(true, this.X)
	}

	public __goscriptAssign(source: Inner): this {
		this.X = source.X
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Inner",
		() => new Inner(),
		() => [],
		Inner,
		() => [/* @__PURE__ */ $.structField("X", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export class arg {
	public declare Name: string

	public declare Value: any

	public declare Tag: reflect.StructTag

	constructor(__goscriptValue?: boolean, Name$?: string, Value$?: any, Tag$?: reflect.StructTag) {
		this.Name = Name$ ?? ""
		this.Value = Value$ ?? (null! as any)
		this.Tag = Tag$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): arg {
		return new arg(true, this.Name, this.Value, this.Tag)
	}

	public __goscriptAssign(source: arg): this {
		this.Name = source.Name
		this.Value = $.assignFieldValue(this.Value, source.Value)
		this.Tag = source.Tag
		return this
	}

	public label(): string {
		const a: arg | $.VarRef<arg> | null = this;
		return $.pointerValue<arg>(a).Name
	}

	static __typeInfo = $.registerStructType(
		"main.arg",
		() => new arg(),
		() => [$.methodSignature("label", [], [/* @__PURE__ */ $.basicType("string")], true)],
		arg,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true), /* @__PURE__ */ $.structField("Value", { kind: $.TypeKind.Interface, methods: [] }, [1], 16, true), /* @__PURE__ */ $.structField("Tag", /* @__PURE__ */ $.basicType("string", "reflect.StructTag"), [2], 32, true)]
	)
}

export class Outer {
	public declare Inner: Inner

	public declare Name: string

	constructor(__goscriptValue?: boolean, Inner$?: Inner, Name$?: string) {
		this.Inner = Inner$ ?? new Inner(true)
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(true, this.Inner.clone(), this.Name)
	}

	public __goscriptAssign(source: Outer): this {
		this.Inner.__goscriptAssign(source.Inner)
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Outer",
		() => new Outer(),
		() => [],
		Outer,
		() => [/* @__PURE__ */ $.structField("Inner", "main.Inner", [0], 0, true, { anonymous: true }), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [1], 8, true)]
	)
}

export async function main(): globalThis.Promise<void> {
	// A StructField literal takes a Type that may be nil, as reflect.TypeOf
	// returns.
	let a = new arg(false, "Arg", $.basicInterfaceValue(3, "int"), "json:\"arg\"")
	let a$: arg = a == null ? $.pointerTarget<arg>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<arg>(a)
	let f = (() => { const __goscriptLiteralField0 = (a !== null && (a as any).__isVarRef !== true && (a as any).__goValue === undefined ? ((a as any) as arg).label() : arg.prototype.label.call(a)); const __goscriptLiteralField1 = reflect.TypeOf((a$ as arg).Value); return $.markAsStructValue(new reflect.StructField({Name: __goscriptLiteralField0, Type: __goscriptLiteralField1, Tag: (a$ as arg).Tag})) })()
	await $.println(f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), reflect.StructTag_Get(f.Tag, "json"))

	// Index is a []int that can be appended to.
	let [_of, ] = await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.structInterfaceValue(new Outer(true), "main.Outer", "main.Outer"))).FieldByName("X")
	_of.Index = $.appendSlice($.arrayToSlice<number>([9]), _of.Index)
	await $.println($.sliceLen(_of.Index), $.arrayIndex(_of.Index!, 0), $.arrayIndex(_of.Index!, 1), $.arrayIndex(_of.Index!, 2))

	// Value.FieldByNameFunc finds a field by a name predicate.
	let val = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.structInterfaceValue(new Outer(true, new Inner(true, 5), "n"), "main.Outer", "main.Outer"))))
	let fv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(val)).FieldByNameFunc($.functionValue((n: string): boolean => {
		return strings.EqualFold(n, "name")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))))
	await $.println($.markAsStructValue($.cloneStructValue(fv)).String())
	let missing = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(val)).FieldByNameFunc($.functionValue((n: string): boolean => {
		return false
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))))
	await $.println($.markAsStructValue($.cloneStructValue(missing)).IsValid())

	// The zero StructField has a nil Type and an empty Index.
	let zero = $.markAsStructValue(new reflect.StructField())
	await $.println(zero.Type == null, $.sliceLen(zero.Index))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

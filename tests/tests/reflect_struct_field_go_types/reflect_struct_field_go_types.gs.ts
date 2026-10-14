// Generated file based on reflect_struct_field_go_types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/strings/index.js"

export class Inner {
	public declare X: number

	public _fields: {
		X: number
	}

	constructor(init?: Partial<{X?: number}>) {
		this._fields = {
			X: init?.X ?? (0 as number)
		}
	}

	public clone(): Inner {
		return $.markAsStructValue(new Inner(this))
	}

	static {
		$.bindStructFields(this.prototype, ["X"])
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

	public _fields: {
		Name: string
		Value: any
		Tag: reflect.StructTag
	}

	constructor(init?: Partial<{Name?: string, Value?: any, Tag?: reflect.StructTag}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Value: init?.Value ?? (null! as any),
			Tag: init?.Tag ?? ("" as reflect.StructTag)
		}
	}

	public clone(): arg {
		return $.markAsStructValue(new arg(this))
	}

	public label(): string {
		const a: arg | $.VarRef<arg> | null = this;
		return $.pointerValue<arg>(a).Name
	}

	static {
		$.bindStructFields(this.prototype, ["Name", "Value", "Tag"])
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

	public _fields: {
		Inner: Inner
		Name: string
	}

	constructor(init?: Partial<{Inner?: Inner, Name?: string}>) {
		this._fields = {
			Inner: init?.Inner ? $.markAsStructValue($.cloneStructValue(init.Inner)) : $.markAsStructValue(new Inner()),
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Outer {
		return $.markAsStructValue(new Outer(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Inner", "Name"])
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
	let a: arg | $.VarRef<arg> | null = new arg({Name: "Arg", Value: $.basicInterfaceValue(3, "int"), Tag: "json:\"arg\""})
	let f = (() => { const __goscriptLiteralField0 = arg.prototype.label.call(a); const __goscriptLiteralField1 = reflect.TypeOf($.pointerValue<arg>(a).Value); return $.markAsStructValue(new reflect.StructField({Name: __goscriptLiteralField0, Type: __goscriptLiteralField1, Tag: $.pointerValue<arg>(a).Tag})) })()
	await $.println(f.Name, await $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), reflect.StructTag_Get(f.Tag, "json"))

	// Index is a []int that can be appended to.
	let [_of, ] = await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue($.markAsStructValue(new Outer()), "main.Outer", "main.Outer"))).FieldByName("X")
	_of.Index = $.appendSlice($.arrayToSlice<number>([9]), _of.Index)
	await $.println($.len(_of.Index), $.arrayIndex(_of.Index!, 0), $.arrayIndex(_of.Index!, 1), $.arrayIndex(_of.Index!, 2))

	// Value.FieldByNameFunc finds a field by a name predicate.
	let val = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue($.markAsStructValue(new Outer({Inner: $.markAsStructValue(new Inner({X: 5})), Name: "n"})), "main.Outer", "main.Outer"))))
	let fv = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(val)).FieldByNameFunc($.functionValue((n: string): boolean => {
		return strings.EqualFold(n, "name")
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))))
	await $.println($.markAsStructValue($.cloneStructValue(fv)).String())
	let missing = $.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(val)).FieldByNameFunc($.functionValue((n: string): boolean => {
		return false
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("string")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo)))))
	await $.println($.markAsStructValue($.cloneStructValue(missing)).IsValid())

	// The zero StructField has a nil Type and an empty Index.
	let zero: reflect.StructField = $.markAsStructValue(new reflect.StructField())
	await $.println(zero.Type == null, $.len(zero.Index))
}

if ($.isMainScript(import.meta)) {
	await main()
}

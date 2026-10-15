// Generated file based on reflect_struct_field_go_types.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"

import * as strings from "@goscript/strings/index.js"
import "@goscript/reflect/index.js"
import "@goscript/strings/index.js"

export class Inner {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public _fields: {
		X: number
	}

	constructor(init?: Partial<{X?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Inner {
		return new Inner(this, true)
	}

	public __goscriptAssign(source: Inner): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
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
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Value(): any {
		return this._fields.Value
	}

	public set Value(value: any) {
		this._fields.Value = value
	}

	public get Tag(): reflect.StructTag {
		return this._fields.Tag
	}

	public set Tag(value: reflect.StructTag) {
		this._fields.Tag = value
	}

	public _fields: {
		Name: string
		Value: any
		Tag: reflect.StructTag
	}

	constructor(init?: Partial<{Name?: string, Value?: any, Tag?: reflect.StructTag}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Value: init?.Value ?? (null! as any),
			Tag: init?.Tag ?? ("" as reflect.StructTag)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): arg {
		return new arg(this, true)
	}

	public __goscriptAssign(source: arg): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Value = $.assignFieldValue(target.Value, values.Value, { kind: $.TypeKind.Interface, methods: [] })
		target.Tag = values.Tag
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
	public get Inner(): Inner {
		return this._fields.Inner
	}

	public set Inner(value: Inner) {
		this._fields.Inner = value
	}

	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Inner: Inner
		Name: string
	}

	constructor(init?: Partial<{Inner?: Inner, Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Inner: init?.Inner ? init.Inner.clone() : new Inner(undefined, true),
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(this, true)
	}

	public __goscriptAssign(source: Outer): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Inner, values.Inner)
		target.Name = values.Name
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
	let a = new arg({Name: "Arg", Value: $.basicInterfaceValue(3, "int"), Tag: "json:\"arg\""})
	let a$: arg = a == null ? $.pointerTarget<arg>(a) : (a as any).__isVarRef === true ? (a as any).value : (a as any).__goValue === undefined ? (a as any) : $.pointerTarget<arg>(a)
	let f = (() => { const __goscriptLiteralField0 = (a !== null && (a as any).__isVarRef !== true && (a as any).__goValue === undefined ? ((a as any) as arg).label() : arg.prototype.label.call(a)); const __goscriptLiteralField1 = reflect.TypeOf((a$ as arg).Value); return $.markAsStructValue(new reflect.StructField({Name: __goscriptLiteralField0, Type: __goscriptLiteralField1, Tag: (a$ as arg).Tag})) })()
	await $.println(f.Name, (__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(f.Type).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), reflect.StructTag_Get(f.Tag, "json"))

	// Index is a []int that can be appended to.
	let [_of, ] = await $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.interfaceValue(new Outer(undefined, true), "main.Outer", "main.Outer"))).FieldByName("X")
	_of.Index = $.appendSlice($.arrayToSlice<number>([9]), _of.Index)
	await $.println($.sliceLen(_of.Index), $.arrayIndex(_of.Index!, 0), $.arrayIndex(_of.Index!, 1), $.arrayIndex(_of.Index!, 2))

	// Value.FieldByNameFunc finds a field by a name predicate.
	let val = $.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(new Outer({Inner: new Inner({X: 5}, true), Name: "n"}, true), "main.Outer", "main.Outer"))))
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
	await $.println(zero.Type == null, $.sliceLen(zero.Index))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on varref_struct.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

export class MyStruct {
	// MyInt is shared through pointers to this storage.
	public get MyInt(): number {
		return this._fields.MyInt
	}

	public set MyInt(value: number) {
		this._fields.MyInt = value
	}

	public _fields: {
		MyInt: number
	}

	constructor(init?: Partial<{MyInt?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			MyInt: init?.MyInt ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): void {
		const target = this._fields
		const values = source._fields
		target.MyInt = values.MyInt
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [/* @__PURE__ */ $.structField("MyInt", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
	)
}

export class Outer {
	// Child is copied in place during assignment.
	public get Child(): MyStruct {
		return this._fields.Child
	}

	public set Child(value: MyStruct) {
		this._fields.Child = value
	}

	// Items retains the addresses of array elements.
	public get Items(): MyStruct[] {
		return this._fields.Items
	}

	public set Items(value: MyStruct[]) {
		this._fields.Items = value
	}

	// Ptr is replaced rather than copied through its pointee.
	public get Ptr(): MyStruct | $.VarRef<MyStruct> | null {
		return this._fields.Ptr
	}

	public set Ptr(value: MyStruct | $.VarRef<MyStruct> | null) {
		this._fields.Ptr = value
	}

	public _fields: {
		Child: MyStruct
		Items: MyStruct[]
		Ptr: MyStruct | $.VarRef<MyStruct> | null
	}

	constructor(init?: Partial<{Child?: MyStruct, Items?: MyStruct[], Ptr?: MyStruct | $.VarRef<MyStruct> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			Child: init?.Child ? init.Child.clone() : new MyStruct(undefined, true),
			Items: init?.Items !== undefined ? $.cloneArrayValue(init.Items, /* @__PURE__ */ $.arrayType("main.MyStruct", 2)) : $.arrayValue(globalThis.Array.from({ length: 2 }, () => new MyStruct(undefined, true)), /* @__PURE__ */ $.arrayType("main.MyStruct", 2)),
			Ptr: init?.Ptr ?? (null! as MyStruct | $.VarRef<MyStruct> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Outer {
		return new Outer(this, true)
	}

	public __goscriptAssign(source: Outer): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.Child, values.Child)
		target.Items = $.assignFieldValue(target.Items, values.Items, /* @__PURE__ */ $.arrayType("main.MyStruct", 2))
		target.Ptr = values.Ptr
	}

	static __typeInfo = $.registerStructType(
		"main.Outer",
		() => new Outer(),
		() => [],
		Outer,
		() => [/* @__PURE__ */ $.structField("Child", "main.MyStruct", [0], 0, true), /* @__PURE__ */ $.structField("Items", /* @__PURE__ */ $.arrayType("main.MyStruct", 2), [1], 8, true), /* @__PURE__ */ $.structField("Ptr", /* @__PURE__ */ $.pointerType("main.MyStruct"), [2], 24, true)]
	)
}

export let global: MyStruct = new MyStruct(undefined, true)

export function __goscript_set_global(__goscriptValue: MyStruct): void {
	$.assignStruct(global, __goscriptValue)
}

export function pair(): [MyStruct, MyStruct] {
	return [new MyStruct({MyInt: 70}, true), new MyStruct({MyInt: 80}, true)]
}

export async function main(): globalThis.Promise<void> {
	// 'val' is a value type, but its address is taken, so it should be varrefed in TS.
	let val = $.varRef(new MyStruct({MyInt: 10}, true))
	let ptrToVal: MyStruct | $.VarRef<MyStruct> | null = val
	let ptrToVal$: MyStruct = ptrToVal == null ? $.pointerTarget<MyStruct>(ptrToVal) : (ptrToVal as any).__isVarRef === true ? (ptrToVal as any).value : (ptrToVal as any).__goValue === undefined ? (ptrToVal as any) : $.pointerTarget<MyStruct>(ptrToVal)

	// Accessing pointer value, should use .value
	await $.println("ptrToVal.MyInt:", (ptrToVal$ as MyStruct).MyInt)

	// Accessing pointer value, should use .value
	let myIntVal = (ptrToVal$ as MyStruct).MyInt
	await $.println("myIntVal:", myIntVal)

	// Field pointers retain their storage identity across whole-value assignment.
	let field = $.fieldRef(val.value._fields, "MyInt")
	val.value = $.assignStruct(val.value, new MyStruct({MyInt: 30}, true))
	await $.println("field after assignment:", $.pointerValue<number>(field), $.pointerEqual(field, $.fieldRef(val.value._fields, "MyInt")))
	field!.value = 40
	await $.println("write through field:", val.value.MyInt, (ptrToVal$ as MyStruct).MyInt)

	// TypeScript keywords use the same storage key for reads and addresses.
	let keywords = $.anonymousStructValue({_catch: 5}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("catch", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { key: "_catch", pkgPath: "github.com/s4wave/goscript/tests/tests/varref_struct" })] })
	let keyword = $.fieldRef(keywords, "_catch")
	keyword!.value = 6
	await $.println("keyword field:", keywords._catch, $.pointerEqual(keyword, $.fieldRef(keywords, "_catch")))

	// Nested values keep their storage while pointer fields change referents.
	let first: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({MyInt: 1})
	let second: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({MyInt: 2})
	let outer = new Outer({Ptr: first}, true)
	let child = $.fieldRef(outer.Child._fields, "MyInt")
	let item = $.fieldRef($.arrayIndex(outer.Items, 0)._fields, "MyInt")
	let ptrField = $.fieldRef(outer._fields, "Ptr")
	outer = $.assignStruct(outer, new Outer({Child: new MyStruct({MyInt: 50}, true), Items: $.arrayValue([new MyStruct({MyInt: 60}, true), new MyStruct(undefined, true)], /* @__PURE__ */ $.arrayType("main.MyStruct", 2)), Ptr: second}, true))
	await $.println("nested:", $.pointerValue<number>(child), $.pointerValue<number>(item), $.pointerEqual($.pointerValue<MyStruct | $.VarRef<MyStruct> | null>(ptrField), second), $.pointerValue<MyStruct>(first).MyInt)
	await $.println("nested identity:", $.pointerEqual(child, $.fieldRef(outer.Child._fields, "MyInt")), $.pointerEqual(item, $.fieldRef($.arrayIndex(outer.Items, 0)._fields, "MyInt")), $.pointerEqual(ptrField, $.fieldRef(outer._fields, "Ptr")))

	// Both tuple and parallel assignments update existing variable storage.
	let __goscriptTuple0: any = pair()
	val.value = $.assignStruct(val.value, __goscriptTuple0[0])
	$.assignStruct(global, __goscriptTuple0[1])
	await $.println("tuple:", $.pointerValue<number>(field), global.MyInt)
	let globalField = $.fieldRef(global._fields, "MyInt")
	let __goscriptAssign0_0: MyStruct = (global).clone()
	let __goscriptAssign0_1: MyStruct = (val.value).clone()
	val.value = $.assignStruct(val.value, __goscriptAssign0_0)
	$.assignStruct(global, __goscriptAssign0_1)
	await $.println("parallel:", $.pointerValue<number>(field), $.pointerValue<number>(globalField))
	$.assignStruct(global, new MyStruct({MyInt: 90}, true))
	await $.println("global:", $.pointerValue<number>(globalField))

	// Reflection writes through the same aggregate storage as generated assignment.
	$.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(val, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))))).Elem())).Set($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(new MyStruct({MyInt: 100}, true), "main.MyStruct", "main.MyStruct")))))
	await $.println("reflect:", $.pointerValue<number>(field), $.pointerEqual(field, $.fieldRef(val.value._fields, "MyInt")))
	let reflected = $.mustTypeAssert<$.VarRef<number> | null>($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue($.markAsStructValue($.cloneStructValue(reflect.ValueOf($.interfaceValue(val, "*main.MyStruct", /* @__PURE__ */ $.pointerType("main.MyStruct"))))).Elem())).FieldByName("MyInt"))).Addr())).Interface(), /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int")))
	await $.println("reflect address:", $.pointerEqual(reflected, field))
}

if ($.isMainScript(import.meta)) {
	await main()
}

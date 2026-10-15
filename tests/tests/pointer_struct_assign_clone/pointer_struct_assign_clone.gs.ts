// Generated file based on pointer_struct_assign_clone.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public get Value(): number {
		return this._fields.Value
	}

	public set Value(value: number) {
		this._fields.Value = value
	}

	public _fields: {
		Value: number
	}

	constructor(init?: Partial<{Value?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(this, true)
	}

	public __goscriptAssign(source: MyStruct): void {
		const target = this._fields
		const values = source._fields
		target.Value = values.Value
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [],
		MyStruct,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s1 = new MyStruct({Value: 10}, true)
	let p: MyStruct | $.VarRef<MyStruct> | null = null! as MyStruct | $.VarRef<MyStruct> | null
	p = new MyStruct({Value: 20})

	// This assignment should trigger the .clone() on s1
	// because s1 is a struct and *p is being assigned.
	$.assignStruct($.pointerValue<MyStruct>(p), s1)

	await $.println($.pointerValue<MyStruct>(p).Value)

	// Modify s1 to ensure p is a clone and not a reference
	s1.Value = 30
	await $.println($.pointerValue<MyStruct>(p).Value)

	// Test assignment from a pointer to a struct (should not clone)
	let s2 = new MyStruct({Value: 40})
	let p2 = new MyStruct({Value: 50})
	let p2$: MyStruct = p2 == null ? $.pointerTarget<MyStruct>(p2) : (p2 as any).__isVarRef === true ? (p2 as any).value : (p2 as any).__goValue === undefined ? (p2 as any) : $.pointerTarget<MyStruct>(p2)
	$.assignStruct((p2$ as MyStruct), $.pointerValue<MyStruct>(s2))
	await $.println((p2$ as MyStruct).Value)

	$.pointerValue<MyStruct>(s2).Value = 60
	await $.println((p2$ as MyStruct).Value)
	// GoScript should replicate this by cloning if the RHS is a struct value.
	// In *p2 = *s2, *s2 is a struct value.

	// Test assignment of a struct from a function call
	let s3 = new MyStruct({Value: 70}, true)
	let p3 = new MyStruct({Value: 80})
	$.assignStruct($.pointerValue<MyStruct>(p3), getStruct())
	await $.println($.pointerValue<MyStruct>(p3).Value)
	await $.println(s3.Value)

	// Test assignment of a struct from a pointer returned by a function call
	let p4 = new MyStruct({Value: 90})
	$.assignStruct($.pointerValue<MyStruct>(p4), $.pointerValue<MyStruct>(getStructPointer()))
	await $.println($.pointerValue<MyStruct>(p4).Value)
}

export function getStruct(): MyStruct {
	return new MyStruct({Value: 100}, true)
}

export function getStructPointer(): MyStruct | $.VarRef<MyStruct> | null {
	return new MyStruct({Value: 110})
}

if ($.isMainScript(import.meta)) {
	await main()
}

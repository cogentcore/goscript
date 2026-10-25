// Generated file based on method_call_on_pointer_receiver.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare MyInt: number

	public declare MyString: string

	constructor(__goscriptValue?: boolean, MyInt$?: number, MyString$?: string) {
		this.MyInt = MyInt$ ?? 0
		this.MyString = MyString$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.MyInt, this.MyString)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.MyInt = source.MyInt
		this.MyString = source.MyString
		return this
	}

	public GetMyString(): string {
		const m: MyStruct | $.VarRef<MyStruct> | null = this;
		return $.pointerValue<MyStruct>(m).MyString
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [{ name: "GetMyString", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		MyStruct,
		() => [{ name: "MyInt", key: "MyInt", type: /* @__PURE__ */ $.basicType("int") }, { name: "MyString", key: "MyString", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class setterStruct {
	public declare value: number

	constructor(__goscriptValue?: boolean, value$?: number) {
		this.value = value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): setterStruct {
		return new setterStruct(true, this.value)
	}

	public __goscriptAssign(source: setterStruct): this {
		this.value = source.value
		return this
	}

	public ["get"](): number {
		const s: setterStruct | $.VarRef<setterStruct> | null = this;
		return $.pointerValue<setterStruct>(s).value
	}

	public ["set"](value: number): void {
		const s: setterStruct | $.VarRef<setterStruct> | null = this;
		$.pointerValue<setterStruct>(s).value = value
	}

	static __typeInfo = $.registerStructType(
		"main.setterStruct",
		() => new setterStruct(),
		() => [{ name: "get", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "set", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		setterStruct,
		() => [{ name: "value", key: "value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class digest {
	public declare writes: number

	constructor(__goscriptValue?: boolean, writes$?: number) {
		this.writes = writes$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): digest {
		return new digest(true, this.writes)
	}

	public __goscriptAssign(source: digest): this {
		this.writes = source.writes
		return this
	}

	public Write(p: $.Slice<number>): void {
		const d: digest | $.VarRef<digest> | null = this;
		const d$: digest = d == null ? $.pointerTarget<digest>(d) : (d as any).__isVarRef === true ? (d as any).value : (d as any).__goValue === undefined ? (d as any) : $.pointerTarget<digest>(d);
		;(d$ as digest).writes += $.sliceLen(p)
	}

	static __typeInfo = $.registerStructType(
		"main.digest",
		() => new digest(),
		() => [{ name: "Write", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		digest,
		() => [{ name: "writes", key: "writes", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let structPointer = new MyStruct(false, 4, "hello world")
	// === Method Call on Pointer Receiver ===
	// Calling a method with a pointer receiver (*MyStruct) using a pointer variable.
	await $.println("Method call on pointer (structPointer): Expected: hello world, Actual: " + (structPointer !== null && (structPointer as any).__isVarRef !== true && (structPointer as any).__goValue === undefined ? ((structPointer as any) as MyStruct).GetMyString() : MyStruct.prototype.GetMyString.call(structPointer)))

	let setter = new setterStruct()
	void (setter !== null && (setter as any).__isVarRef !== true && (setter as any).__goValue === undefined ? ((setter as any) as setterStruct)["set"](9) : setterStruct.prototype.set.call(setter, 9))
	await $.println("reserved pointer method:", (setter !== null && (setter as any).__isVarRef !== true && (setter as any).__goValue === undefined ? ((setter as any) as setterStruct)["get"]() : setterStruct.prototype.get.call(setter)))

	let d = new digest()
	let pad = new Uint8Array([1, 2, 3]) as $.Slice<number>
	{
		void (d !== null && (d as any).__isVarRef !== true && (d as any).__goValue === undefined ? ((d as any) as digest).Write(pad) : digest.prototype.Write.call(d, pad))
		let __goscriptShadow0 = new Uint8Array([4]) as $.Slice<number>
		await $.println("shadowed type name after method call:", $.pointerValue<digest>(d).writes, $.sliceLen(__goscriptShadow0))
	}
}

if ($.isMainScript(import.meta)) {
	await main()
}

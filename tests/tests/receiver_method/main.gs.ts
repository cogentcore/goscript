// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class MyStruct {
	public declare Value: number

	constructor(__goscriptValue?: boolean, Value$?: number) {
		this.Value = Value$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): MyStruct {
		return new MyStruct(true, this.Value)
	}

	public __goscriptAssign(source: MyStruct): this {
		this.Value = source.Value
		return this
	}

	public DoesNotUseReceiver(): number {
		const m: MyStruct | $.VarRef<MyStruct> | null = this;
		return 42
	}

	public UsesReceiver(): number {
		const m: MyStruct | $.VarRef<MyStruct> | null = this;
		return $.pointerValue<MyStruct>(m).Value
	}

	static __typeInfo = $.registerStructType(
		"main.MyStruct",
		() => new MyStruct(),
		() => [{ name: "DoesNotUseReceiver", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "UsesReceiver", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		MyStruct,
		() => [{ name: "Value", key: "Value", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let s = new MyStruct(false, 10)
	await $.println((s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as MyStruct).UsesReceiver() : MyStruct.prototype.UsesReceiver.call(s)))
	await $.println((s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as MyStruct).DoesNotUseReceiver() : MyStruct.prototype.DoesNotUseReceiver.call(s)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

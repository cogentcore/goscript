// Generated file based on main.go
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
	let s: MyStruct | $.VarRef<MyStruct> | null = new MyStruct({Value: 10})
	await $.println((s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as MyStruct).UsesReceiver() : MyStruct.prototype.UsesReceiver.call(s)))
	await $.println((s !== null && (s as any).__isVarRef !== true && (s as any).__goValue === undefined ? ((s as any) as MyStruct).DoesNotUseReceiver() : MyStruct.prototype.DoesNotUseReceiver.call(s)))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on helper.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/imported_generic_function/helper", ["helper.Box", "helper.Value", "helper.IntValue"])

export type Value = {
	GetValue(): number
}

$.registerInterfaceType(
	"helper.Value",
	null,
	[{ name: "GetValue", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class Box {
	public get Value(): any {
		return this._fields.Value
	}

	public set Value(value: any) {
		this._fields.Value = value
	}

	public _fields: {
		Value: any
	}

	constructor(init?: Partial<{Value?: any}>) {
		this._fields = {
			Value: init?.Value !== undefined ? $.copyElement(init.Value) : (null! as any)
		}
	}

	public clone(): Box {
		return $.markAsStructValue(new Box(this))
	}

	public __goscriptAssign(source: Box): void {
		const target = this._fields
		const values = source._fields
		target.Value = $.assignFieldValue(target.Value, values.Value, { kind: $.TypeKind.Interface, methods: [] })
	}

	static __typeInfo = $.registerStructType(
		"helper.Box",
		() => new Box(),
		() => [],
		Box,
		() => [{ name: "Value", key: "Value", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class IntValue {
	public get N(): number {
		return this._fields.N
	}

	public set N(value: number) {
		this._fields.N = value
	}

	public _fields: {
		N: number
	}

	constructor(init?: Partial<{N?: number}>) {
		this._fields = {
			N: init?.N ?? (0 as number)
		}
	}

	public clone(): IntValue {
		return $.markAsStructValue(new IntValue(this))
	}

	public __goscriptAssign(source: IntValue): void {
		const target = this._fields
		const values = source._fields
		target.N = values.N
	}

	public GetValue(): number {
		const v = this;
		return v.N
	}

	static __typeInfo = $.registerStructType(
		"helper.IntValue",
		() => new IntValue(),
		() => [{ name: "GetValue", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }],
		IntValue,
		() => [{ name: "N", key: "N", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function Wrap(__typeArgs: $.GenericTypeArgs | undefined, value: any): Box {
	return $.markAsStructValue(new Box({Value: $.copyElement(value)}))
}

export function Collect<T>(__typeArgs: $.GenericTypeArgs | undefined, value: any): [$.Slice<T>, $.GoError] {
	return [$.arrayToSlice<T>([$.copyElement(value)]), null]
}

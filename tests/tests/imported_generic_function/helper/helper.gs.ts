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
	public declare Value: any

	constructor(init?: Partial<{Value?: any}>, __goscriptValue?: boolean, __goscriptFresh?: boolean) {
		this.Value = init?.Value !== undefined ? (__goscriptFresh === true ? init.Value : $.copyElement(init.Value)) : (null! as any)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): this {
		this.Value = $.assignFieldValue(this.Value, source.Value)
		return this
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
	public declare N: number

	constructor(init?: Partial<{N?: number}>, __goscriptValue?: boolean) {
		this.N = init?.N ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): IntValue {
		return new IntValue(this, true)
	}

	public __goscriptAssign(source: IntValue): this {
		this.N = source.N
		return this
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

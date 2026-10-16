// Generated file based on anonymous_struct_value_copy.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as slices from "@goscript/slices/index.js"

export function mutate(v: {"N": number}): void {
	v.N = 7
}

export async function main(): globalThis.Promise<void> {
	let a = $.anonymousStructValue({N: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })
	let b = $.markAsStructValue($.cloneStructValue(a))
	b.N = 9
	await $.println("assign:", a.N)

	mutate($.markAsStructValue($.cloneStructValue(a)))
	await $.println("param:", a.N)

	let s = $.arrayToSlice<{"N": number}>([$.anonymousStructValue({N: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })])
	let e = $.markAsStructValue($.cloneStructValue($.arrayIndex(s!, 0)))
	e.N = 9
	await $.println("index:", $.arrayIndex(s!, 0).N)

	let t = $.makeSlice<{"N": number}>(1, undefined, undefined, () => $.anonymousStructValue({"N": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }))
	$.copy(t, s, true)
	$.arrayIndex(t!, 0).N = 9
	await $.println("copy:", $.arrayIndex(s!, 0).N)

	let c = (slices.Clone(s) as $.Slice<{"N": number}>)
	$.arrayIndex(c!, 0).N = 9
	await $.println("clone:", $.arrayIndex(s!, 0).N)

	let x: any = $.interfaceValue($.anonymousStructValue({N: 1}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }), "struct{N int}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] })
	{
		const __goscriptTypeSwitchValue = x
		switch ($.typeSwitchCase(__goscriptTypeSwitchValue, __goscriptStatic0())) {
			case 0:
				{
					let v: {"N": number} = $.markAsStructValue($.cloneStructValue($.typeAssert<{"N": number}>(__goscriptTypeSwitchValue, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }).value))
					v.N = 9
				}
				break
		}
	}
	await $.println("switch:", $.mustTypeAssert<{"N": number}>(x, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }).N)

	let nested = $.anonymousStructValue({Inner: ($.anonymousStructValue({"N": 0}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }) as {"N": number})}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("Inner", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }, [0], 0, true)] })
	let inner = $.markAsStructValue($.cloneStructValue(nested.Inner))
	inner.N = 9
	await $.println("field:", nested.Inner.N)

	for (let __goscriptRangeTarget0 = s, __goscriptRangeWindow0 = $.sliceRange(__goscriptRangeTarget0), __rangeIndex = 0; __rangeIndex < __goscriptRangeWindow0.length; __rangeIndex++) {
		let r = $.markAsStructValue($.cloneStructValue((__goscriptRangeWindow0.backing[__goscriptRangeWindow0.offset + __rangeIndex] as {"N": number})))
		r.N = 9
	}
	await $.println("range:", $.arrayIndex(s!, 0).N)
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ($.typeSwitchSite([{ kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("N", /* @__PURE__ */ $.basicType("int"), [0], 0, true)] }]))
}

if ($.isMainScript(import.meta)) {
	await main()
}

// Generated file based on complex_arithmetic.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as math from "@goscript/math/index.js"

export function pair(): [$.Complex, $.Complex] {
	return [$.complex(1, 2), $.complex(3, -1)]
}

export async function main(): globalThis.Promise<void> {
	// The binary operators, with variable and constant operands.
	let [a, b] = pair()
	fmt.Println($.basicInterfaceValue($.complexAdd(a, b), "complex128"), $.basicInterfaceValue($.complexSub(a, b), "complex128"), $.basicInterfaceValue($.complexMul(a, b), "complex128"), $.basicInterfaceValue($.complexDiv(a, b), "complex128"), $.basicInterfaceValue($.complexNeg(a), "complex128"), $.basicInterfaceValue(a, "complex128"))
	fmt.Println($.basicInterfaceValue($.complexMul(a, $.complex(2, 0)), "complex128"), $.basicInterfaceValue($.complexMul($.complex(2, 0), a), "complex128"), $.basicInterfaceValue($.complexDiv(a, $.complex(2, 0)), "complex128"), $.basicInterfaceValue($.complexAdd(a, $.complex(0, 1)), "complex128"), $.basicInterfaceValue($.complexSub($.complex(1, 0), a), "complex128"))
	fmt.Println($.arrayEqual(a, b), !$.arrayEqual(a, b), $.arrayEqual(a, ($.complex(1, 2))))
	fmt.Printf("%v %.2f %e %g %+v\n", $.basicInterfaceValue(a, "complex128"), $.basicInterfaceValue(a, "complex128"), $.basicInterfaceValue(b, "complex128"), $.basicInterfaceValue($.complexNeg(b), "complex128"), $.interfaceValue($.anonymousStructValue({C: $.complex64($.complex(0, 2))}, { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("C", /* @__PURE__ */ $.basicType("complex64"), [0], 0, true)] }), "struct{C complex64}", { kind: $.TypeKind.Struct, methods: [], fields: [/* @__PURE__ */ $.structField("C", /* @__PURE__ */ $.basicType("complex64"), [0], 0, true)] }))

	// The assignment operators.
	let c = a
	c = $.complexAdd(c, b)
	c = $.complexSub(c, $.complex(1, 0))
	c = $.complexMul(c, a)
	c = $.complexDiv(c, $.complex(0, 2))
	fmt.Println($.basicInterfaceValue(c, "complex128"))

	// complex64 rounds to the precision of float32 parts.
	let x: $.Complex = $.complex64($.complex64(a))
	let y: $.Complex = $.complex64($.complex64(b))
	fmt.Println($.basicInterfaceValue($.complex64($.complexAdd(x, y)), "complex64"), $.basicInterfaceValue($.complex64($.complexMul(x, y)), "complex64"), $.basicInterfaceValue($.complex64($.complexDiv(x, y)), "complex64"), $.basicInterfaceValue($.complex64($.complexNeg(x)), "complex64"))
	x = $.complex64($.complexMul(x, $.complex64(y)))
	fmt.Println($.basicInterfaceValue(x, "complex64"), $.basicInterfaceValue($.real($.complex64(x)), "float32"), $.basicInterfaceValue($.imag($.complex64(x)), "float32"))

	// Division by zero and by infinities follows the Go runtime.
	let zero: $.Complex = $.complex(0, 0)
	let inf = $.complex(math.Inf(1), 0)
	fmt.Println($.basicInterfaceValue($.complexDiv(a, zero), "complex128"), $.basicInterfaceValue($.complexDiv(zero, zero), "complex128"), $.basicInterfaceValue($.complexDiv(a, inf), "complex128"), $.basicInterfaceValue($.complexDiv(inf, a), "complex128"))
}

if ($.isMainScript(import.meta)) {
	await main()
}

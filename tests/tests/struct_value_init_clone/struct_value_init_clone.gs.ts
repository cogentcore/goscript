// Generated file based on struct_value_init_clone.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Point {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Point {
		return new Point(true, this.X, this.Y)
	}

	public __goscriptAssign(source: Point): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Point",
		() => new Point(),
		() => [],
		Point,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Initialize directly
	let p1 = new Point(true, 1, 2)
	await $.println("p1:", p1.X, p1.Y)

	// Assign to another variable (should trigger clone)
	let p2 = (p1).clone()
	p2.X = 10

	// Print both to show they are independent
	await $.println("p1 after p2 mod:", p1.X, p1.Y)
	await $.println("p2:", p2.X, p2.Y)

	// Initialize via variable assignment
	let v = new Point(true, 3, 4)
	let p3 = (v).clone()
	p3.Y = 40

	await $.println("v after p3 mod:", v.X, v.Y)
	await $.println("p3:", p3.X, p3.Y)
}

if ($.isMainScript(import.meta)) {
	await main()
}

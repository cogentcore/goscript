// Generated file based on read_only_effect_free_call.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class vec {
	public declare x: number

	public declare y: number

	constructor(__goscriptValue?: boolean, x$?: number, y$?: number) {
		this.x = x$ ?? 0
		this.y = y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): vec {
		return new vec(true, this.x, this.y)
	}

	public __goscriptAssign(source: vec): this {
		this.x = source.x
		this.y = source.y
		return this
	}

	public add(o: vec): vec {
		const v = this;
		return mk(globalThis.Math.fround(v.x + o.x), globalThis.Math.fround(v.y + o.y))
	}

	public addBump(o: vec): vec {
		const v = this;
		return (() => { const __goscriptLiteralField0 = globalThis.Math.fround(bump(v.x) + o.x); return new vec(true, __goscriptLiteralField0, globalThis.Math.fround(v.y + o.y)) })()
	}

	public scale(s: number): vec {
		const v = this;
		let r = mk(globalThis.Math.fround(v.x * s), globalThis.Math.fround(v.y * s))
		return mk(globalThis.Math.fround(r.x + v.x), globalThis.Math.fround(r.y + v.y))
	}

	static __typeInfo = $.registerStructType(
		"main.vec",
		() => new vec(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.vec" }] }, { name: "addBump", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.vec" }] }, { name: "scale", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: "main.vec" }] }],
		vec,
		() => [{ name: "x", key: "x", type: /* @__PURE__ */ $.basicType("float32") }, { name: "y", key: "y", type: /* @__PURE__ */ $.basicType("float32") }]
	)
}

export class holder {
	public declare pos: vec

	constructor(__goscriptValue?: boolean, pos$?: vec) {
		this.pos = pos$ ?? new vec(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(true, this.pos.clone())
	}

	public __goscriptAssign(source: holder): this {
		this.pos.__goscriptAssign(source.pos)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "pos", key: "pos", type: "main.vec" }]
	)
}

export function mk(x: number, y: number): vec {
	return new vec(true, x, y)
}

export let counter = 0

export function __goscript_set_counter(__goscriptValue: number): void {
	counter = __goscriptValue
}

export function bump(x: number): number {
	counter++
	return x
}

export async function main(): globalThis.Promise<void> {
	let a = new vec(true, 1, 2)
	let b = a.add(new vec(true, 3, 4))
	a.x = 10
	await $.println("add", b.x, b.y, a.x)

	let h = new holder(false, new vec(true, 5, 6))
	let h$: holder = h == null ? $.pointerTarget<holder>(h) : (h as any).__isVarRef === true ? (h as any).value : (h as any).__goValue === undefined ? (h as any) : $.pointerTarget<holder>(h)
	let c = (h$ as holder).pos.scale(2);
	;(h$ as holder).pos.y = 0
	await $.println("scale", c.x, c.y, (h$ as holder).pos.y)

	let d = $.markAsStructValue($.cloneStructValue((h$ as holder).pos)).addBump(a)
	await $.println("bump", d.x, d.y, counter)
}

if ($.isMainScript(import.meta)) {
	await main()
}

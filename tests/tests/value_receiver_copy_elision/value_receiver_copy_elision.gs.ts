// Generated file based on value_receiver_copy_elision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class vec {
	public declare X: number

	public declare Y: number

	constructor(__goscriptValue?: boolean, X$?: number, Y$?: number) {
		this.X = X$ ?? 0
		this.Y = Y$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): vec {
		return new vec(true, this.X, this.Y)
	}

	public __goscriptAssign(source: vec): this {
		this.X = source.X
		this.Y = source.Y
		return this
	}

	public Bump(): number {
		const v = this;
		v.X++
		return v.X
	}

	public BumpInClosure(): number {
		const v = this;
		let f = $.functionValue(() => {
			v.X = 100
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
		f()
		return v.X
	}

	public BumpViaPointer(): number {
		const v = $.varRef<vec>(this);
		v.value.inc()
		return v.value.Y
	}

	public Keep(): vec {
		const v = this;
		return (v).clone()
	}

	public Sum(): number {
		const v = this;
		return v.X + v.Y
	}

	public inc(): void {
		const v: vec | $.VarRef<vec> | null = this;
		const v$: vec = v == null ? $.pointerTarget<vec>(v) : (v as any).__isVarRef === true ? (v as any).value : (v as any).__goValue === undefined ? (v as any) : $.pointerTarget<vec>(v);
		;(v$ as vec).Y++
	}

	static __typeInfo = $.registerStructType(
		"main.vec",
		() => new vec(),
		() => [{ name: "Bump", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "BumpInClosure", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "BumpViaPointer", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "Keep", args: [], returns: [{ type: "main.vec" }] }, { name: "Sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "inc", args: [], returns: [], pointerReceiver: true }],
		vec,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class holder {
	public declare v: vec

	constructor(__goscriptValue?: boolean, v$?: vec) {
		this.v = v$ ?? new vec(true)
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(true, this.v.clone())
	}

	public __goscriptAssign(source: holder): this {
		this.v.__goscriptAssign(source.v)
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.holder",
		() => new holder(),
		() => [],
		holder,
		() => [{ name: "v", key: "v", type: "main.vec" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let a = $.varRef(new vec(true, 1, 2))
	await $.println("sum", a.value.Sum())
	await $.println("bump", $.markAsStructValue($.cloneStructValue(a.value)).Bump(), a.value.X)
	await $.println("ptr", $.markAsStructValue($.cloneStructValue(a.value)).BumpViaPointer(), a.value.Y)
	await $.println("closure", $.markAsStructValue($.cloneStructValue(a.value)).BumpInClosure(), a.value.X)
	let k = a.value.Keep()
	k.X = 50
	await $.println("keep", a.value.X, k.X)
	let h = new holder(true, (a.value).clone())
	await $.println("field", h.v.Sum(), $.markAsStructValue($.cloneStructValue(h.v)).Bump(), h.v.X)
	let p = a
	await $.println("via pointer", $.pointerValue<vec>(p).Sum(), $.markAsStructValue($.cloneStructValue($.pointerValue<vec>(p))).Bump(), $.pointerValue<vec>(p).X)
}

if ($.isMainScript(import.meta)) {
	await main()
}

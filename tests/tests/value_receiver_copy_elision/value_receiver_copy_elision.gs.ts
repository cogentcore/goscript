// Generated file based on value_receiver_copy_elision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class vec {
	public declare X: number

	public declare Y: number

	public _fields: {
		X: number
		Y: number
	}

	constructor(init?: Partial<{X?: number, Y?: number}>) {
		this._fields = {
			X: init?.X ?? (0 as number),
			Y: init?.Y ?? (0 as number)
		}
	}

	public clone(): vec {
		return $.markAsStructValue(new vec(this))
	}

	public Bump(): number {
		let v: vec = this;
		v.X++
		return v.X
	}

	public async BumpInClosure(): globalThis.Promise<number> {
		const v = this;
		let f: (() => void) | null = $.functionValue((): void => {
			v.X = 100
		}, ({ kind: $.TypeKind.Function, params: [], results: [] } as $.FunctionTypeInfo))
		await f!()
		return v.X
	}

	public BumpViaPointer(): number {
		const v = $.varRef(this);
		v.value.inc()
		return v.value.Y
	}

	public Keep(): vec {
		const v = this;
		return $.markAsStructValue($.cloneStructValue(v))
	}

	public Sum(): number {
		const v = this;
		return v.X + v.Y
	}

	public inc(): void {
		let v: vec | $.VarRef<vec> | null = this;
		$.pointerValue<vec>(v).Y++
	}

	static {
		$.bindStructFields(this.prototype, ["X", "Y"])
	}

	static __typeInfo = $.registerStructType(
		"main.vec",
		() => new vec(),
		() => [{ name: "Bump", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "BumpInClosure", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "BumpViaPointer", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "Keep", args: [], returns: [{ type: "main.vec" }] }, { name: "Sum", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }, { name: "inc", args: [], returns: [] }],
		vec,
		() => [{ name: "X", key: "X", type: /* @__PURE__ */ $.basicType("int") }, { name: "Y", key: "Y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class holder {
	public declare v: vec

	public _fields: {
		v: vec
	}

	constructor(init?: Partial<{v?: vec}>) {
		this._fields = {
			v: init?.v ? $.markAsStructValue($.cloneStructValue(init.v)) : $.markAsStructValue(new vec())
		}
	}

	public clone(): holder {
		return $.markAsStructValue(new holder(this))
	}

	static {
		$.bindStructFields(this.prototype, ["v"])
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
	let a = $.varRef($.markAsStructValue(new vec({X: 1, Y: 2})))
	await $.println("sum", a.value.Sum())
	await $.println("bump", $.markAsStructValue($.cloneStructValue(a.value)).Bump(), a.value.X)
	await $.println("ptr", $.markAsStructValue($.cloneStructValue(a.value)).BumpViaPointer(), a.value.Y)
	await $.println("closure", await $.markAsStructValue($.cloneStructValue(a.value)).BumpInClosure(), a.value.X)
	let k = $.markAsStructValue($.cloneStructValue(a.value.Keep()))
	k.X = 50
	await $.println("keep", a.value.X, k.X)
	let h = $.markAsStructValue(new holder({v: $.markAsStructValue($.cloneStructValue(a.value))}))
	await $.println("field", h.v.Sum(), $.markAsStructValue($.cloneStructValue(h.v)).Bump(), h.v.X)
	let p: vec | $.VarRef<vec> | null = a
	await $.println("via pointer", $.pointerValue<vec>(p).Sum(), $.markAsStructValue($.cloneStructValue($.pointerValue<vec>(p))).Bump(), $.pointerValue<vec>(p).X)
}

if ($.isMainScript(import.meta)) {
	await main()
}

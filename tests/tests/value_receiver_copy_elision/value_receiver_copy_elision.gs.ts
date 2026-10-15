// Generated file based on value_receiver_copy_elision.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class vec {
	public get X(): number {
		return this._fields.X
	}

	public set X(value: number) {
		this._fields.X = value
	}

	public get Y(): number {
		return this._fields.Y
	}

	public set Y(value: number) {
		this._fields.Y = value
	}

	public _fields: {
		X: number
		Y: number
	}

	constructor(init?: Partial<{X?: number, Y?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			X: init?.X ?? (0 as number),
			Y: init?.Y ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): vec {
		return new vec(this, true)
	}

	public __goscriptAssign(source: vec): void {
		const target = this._fields
		const values = source._fields
		target.X = values.X
		target.Y = values.Y
	}

	public Bump(): number {
		let v: vec = this;
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
		const v = $.varRef(this);
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
		let v: vec | $.VarRef<vec> | null = this;
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
	public get v(): vec {
		return this._fields.v
	}

	public set v(value: vec) {
		this._fields.v = value
	}

	public _fields: {
		v: vec
	}

	constructor(init?: Partial<{v?: vec}>, __goscriptValue?: boolean) {
		this._fields = {
			v: init?.v ? init.v.clone() : new vec(undefined, true)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): holder {
		return new holder(this, true)
	}

	public __goscriptAssign(source: holder): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target.v, values.v)
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
	let a = $.varRef(new vec({X: 1, Y: 2}, true))
	await $.println("sum", a.value.Sum())
	await $.println("bump", $.markAsStructValue($.cloneStructValue(a.value)).Bump(), a.value.X)
	await $.println("ptr", $.markAsStructValue($.cloneStructValue(a.value)).BumpViaPointer(), a.value.Y)
	await $.println("closure", $.markAsStructValue($.cloneStructValue(a.value)).BumpInClosure(), a.value.X)
	let k = a.value.Keep()
	k.X = 50
	await $.println("keep", a.value.X, k.X)
	let h = new holder({v: a.value}, true)
	await $.println("field", h.v.Sum(), $.markAsStructValue($.cloneStructValue(h.v)).Bump(), h.v.X)
	let p = a
	await $.println("via pointer", $.pointerValue<vec>(p).Sum(), $.markAsStructValue($.cloneStructValue($.pointerValue<vec>(p))).Bump(), $.pointerValue<vec>(p).X)
}

if ($.isMainScript(import.meta)) {
	await main()
}

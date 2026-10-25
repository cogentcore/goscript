// Generated file based on struct_embedded_reserved_name.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class _object {
	public declare name: string

	constructor(__goscriptValue?: boolean, name$?: string) {
		this.name = name$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): _object {
		return new _object(true, this.name)
	}

	public __goscriptAssign(source: _object): this {
		this.name = source.name
		return this
	}

	public Name(): string {
		const o: _object | $.VarRef<_object> | null = this;
		return $.pointerValue<_object>(o).name
	}

	static __typeInfo = $.registerStructType(
		"main.object",
		() => new _object(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		_object,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Var {
	public declare _object: _object

	public declare kind: number

	constructor(__goscriptValue?: boolean, _object$?: _object, kind$?: number) {
		this._object = _object$ ?? new _object(true)
		this.kind = kind$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Var {
		return new Var(true, this._object.clone(), this.kind)
	}

	public __goscriptAssign(source: Var): this {
		this._object.__goscriptAssign(source._object)
		this.kind = source.kind
		return this
	}

	public Name(): any {
		return $.pointerValue<_object>(this._object).Name()
	}

	static __typeInfo = $.registerStructType(
		"main.Var",
		() => new Var(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }],
		Var,
		() => [{ name: "object", key: "_object", type: "main.object", anonymous: true }, { name: "kind", key: "kind", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class _number {
	public declare n: number

	constructor(__goscriptValue?: boolean, n$?: number) {
		this.n = n$ ?? 0
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): _number {
		return new _number(true, this.n)
	}

	public __goscriptAssign(source: _number): this {
		this.n = source.n
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.number",
		() => new _number(),
		() => [],
		_number,
		() => [{ name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class Holder {
	public declare _number: _number | $.VarRef<_number> | null

	public declare _string: string

	constructor(__goscriptValue?: boolean, _number$?: _number | $.VarRef<_number> | null, _string$?: string) {
		this._number = _number$ ?? (null! as _number | $.VarRef<_number> | null)
		this._string = _string$ ?? ""
		;(this as any).__goStructValue = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(true, this._number, this._string)
	}

	public __goscriptAssign(source: Holder): this {
		this._number = source._number
		this._string = source._string
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.Holder",
		() => new Holder(),
		() => [],
		Holder,
		() => [{ name: "number", key: "_number", type: /* @__PURE__ */ $.pointerType("main.number"), anonymous: true }, { name: "string", key: "_string", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let v = new Var(false, new _object(true, "x"))
	let v$: Var = v == null ? $.pointerTarget<Var>(v) : (v as any).__isVarRef === true ? (v as any).value : (v as any).__goValue === undefined ? (v as any) : $.pointerTarget<Var>(v)
	await $.println((v$ as Var)._object.Name(), (v$ as Var)._object.name, (v$ as Var)._object.Name(), (v$ as Var)._object.name)
	let o = $.fieldRef((v$ as Var), "_object")
	$.pointerValue<_object>(o).name = "y"
	await $.println((v$ as Var)._object.name)
	let h = new Holder(true, new _number(false, 3), "s")
	await $.println($.pointerValue<_number>(h._number).n, $.pointerValue<_number>(h._number).n, h._string)
}

if ($.isMainScript(import.meta)) {
	await main()
}

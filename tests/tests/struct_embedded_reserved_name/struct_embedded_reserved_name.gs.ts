// Generated file based on struct_embedded_reserved_name.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class _object {
	public declare name: string

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this.name = init?.name ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): _object {
		return new _object(this, true)
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

	constructor(init?: Partial<{_object?: _object, kind?: number}>, __goscriptValue?: boolean) {
		this._object = init?._object ? init._object.clone() : new _object(undefined, true)
		this.kind = init?.kind ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Var {
		return new Var(this, true)
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

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this.n = init?.n ?? (0 as number)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): _number {
		return new _number(this, true)
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

	constructor(init?: Partial<{_number?: _number | $.VarRef<_number> | null, _string?: string}>, __goscriptValue?: boolean) {
		this._number = init?._number ?? (null! as _number | $.VarRef<_number> | null)
		this._string = init?._string ?? ("" as string)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
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
	let v = new Var({_object: new _object({name: "x"}, true)})
	let v$: Var = v == null ? $.pointerTarget<Var>(v) : (v as any).__isVarRef === true ? (v as any).value : (v as any).__goValue === undefined ? (v as any) : $.pointerTarget<Var>(v)
	await $.println((v$ as Var)._object.Name(), (v$ as Var)._object.name, (v$ as Var)._object.Name(), (v$ as Var)._object.name)
	let o = $.fieldRef((v$ as Var), "_object")
	$.pointerValue<_object>(o).name = "y"
	await $.println((v$ as Var)._object.name)
	let h = new Holder({_number: new _number({n: 3}), _string: "s"}, true)
	await $.println($.pointerValue<_number>(h._number).n, $.pointerValue<_number>(h._number).n, h._string)
}

if ($.isMainScript(import.meta)) {
	await main()
}

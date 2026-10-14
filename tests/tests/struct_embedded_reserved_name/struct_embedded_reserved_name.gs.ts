// Generated file based on struct_embedded_reserved_name.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class _object {
	public get name(): string {
		return this._fields.name
	}

	public set name(value: string) {
		this._fields.name = value
	}

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): _object {
		return new _object(this, true)
	}

	public __goscriptAssign(source: _object): void {
		const target = this._fields
		const values = source._fields
		target.name = values.name
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
	public get _object(): _object {
		return this._fields._object
	}

	public set _object(value: _object) {
		this._fields._object = value
	}

	public get kind(): number {
		return this._fields.kind
	}

	public set kind(value: number) {
		this._fields.kind = value
	}

	public _fields: {
		_object: _object
		kind: number
	}

	constructor(init?: Partial<{_object?: _object, kind?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			_object: init?._object ? init._object.clone() : new _object(undefined, true),
			kind: init?.kind ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Var {
		return new Var(this, true)
	}

	public __goscriptAssign(source: Var): void {
		const target = this._fields
		const values = source._fields
		$.assignStruct(target._object, values._object)
		target.kind = values.kind
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
	public get n(): number {
		return this._fields.n
	}

	public set n(value: number) {
		this._fields.n = value
	}

	public _fields: {
		n: number
	}

	constructor(init?: Partial<{n?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			n: init?.n ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): _number {
		return new _number(this, true)
	}

	public __goscriptAssign(source: _number): void {
		const target = this._fields
		const values = source._fields
		target.n = values.n
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
	public get _number(): _number | $.VarRef<_number> | null {
		return this._fields._number
	}

	public set _number(value: _number | $.VarRef<_number> | null) {
		this._fields._number = value
	}

	public get _string(): string {
		return this._fields._string
	}

	public set _string(value: string) {
		this._fields._string = value
	}

	public _fields: {
		_number: _number | $.VarRef<_number> | null
		_string: string
	}

	constructor(init?: Partial<{_number?: _number | $.VarRef<_number> | null, _string?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			_number: init?._number ?? (null! as _number | $.VarRef<_number> | null),
			_string: init?._string ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Holder {
		return new Holder(this, true)
	}

	public __goscriptAssign(source: Holder): void {
		const target = this._fields
		const values = source._fields
		target._number = values._number
		target._string = values._string
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
	let v: Var | $.VarRef<Var> | null = new Var({_object: new _object({name: "x"}, true)})
	let v$: Var = v == null ? $.pointerTarget<Var>(v) : (v as any).__isVarRef === true ? (v as any).value : (v as any).__goValue === undefined ? (v as any) : $.pointerTarget<Var>(v)
	await $.println((v$ as Var)._object.Name(), (v$ as Var)._object.name, (v$ as Var)._object.Name(), (v$ as Var)._object.name)
	let o: _object | $.VarRef<_object> | null = $.fieldRef((v$ as Var)._fields, "_object")
	$.pointerValue<_object>(o).name = "y"
	await $.println((v$ as Var)._object.name)
	let h = new Holder({_number: new _number({n: 3}), _string: "s"}, true)
	await $.println($.pointerValue<_number>(h._number).n, $.pointerValue<_number>(h._number).n, h._string)
}

if ($.isMainScript(import.meta)) {
	await main()
}

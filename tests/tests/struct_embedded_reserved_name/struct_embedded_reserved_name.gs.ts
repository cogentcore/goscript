// Generated file based on struct_embedded_reserved_name.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class _object {
	public declare name: string

	public _fields: {
		name: string
	}

	constructor(init?: Partial<{name?: string}>) {
		this._fields = {
			name: init?.name ?? ("" as string)
		}
	}

	public clone(): _object {
		return $.markAsStructValue(new _object(this))
	}

	public Name(): string {
		const o: _object | $.VarRef<_object> | null = this;
		return $.pointerValue<_object>(o).name
	}

	static {
		$.bindStructFields(this.prototype, ["name"])
	}

	static __typeInfo = $.registerStructType(
		"main.object",
		() => new _object(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		_object,
		() => [{ name: "name", key: "name", type: /* @__PURE__ */ $.basicType("string") }]
	)
}

export class Var {
	public declare _object: _object

	public declare kind: number

	public _fields: {
		_object: _object
		kind: number
	}

	constructor(init?: Partial<{_object?: _object, kind?: number}>) {
		this._fields = {
			_object: init?._object ? $.markAsStructValue($.cloneStructValue(init._object)) : $.markAsStructValue(new _object()),
			kind: init?.kind ?? (0 as number)
		}
	}

	public clone(): Var {
		return $.markAsStructValue(new Var(this))
	}

	public Name(): any {
		return $.pointerValue<_object>(this._object).Name()
	}

	static {
		$.bindStructFields(this.prototype, ["_object", "kind"])
	}

	static __typeInfo = $.registerStructType(
		"main.Var",
		() => new Var(),
		() => [{ name: "Name", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		Var,
		() => [{ name: "object", key: "_object", type: "main.object", anonymous: true }, { name: "kind", key: "kind", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class _number {
	public declare n: number

	public _fields: {
		n: number
	}

	constructor(init?: Partial<{n?: number}>) {
		this._fields = {
			n: init?.n ?? (0 as number)
		}
	}

	public clone(): _number {
		return $.markAsStructValue(new _number(this))
	}

	static {
		$.bindStructFields(this.prototype, ["n"])
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

	public _fields: {
		_number: _number | $.VarRef<_number> | null
		_string: string
	}

	constructor(init?: Partial<{_number?: _number | $.VarRef<_number> | null, _string?: string}>) {
		this._fields = {
			_number: init?._number ?? (null! as _number | $.VarRef<_number> | null),
			_string: init?._string ?? ("" as string)
		}
	}

	public clone(): Holder {
		return $.markAsStructValue(new Holder(this))
	}

	static {
		$.bindStructFields(this.prototype, ["_number", "_string"])
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
	let v: Var | $.VarRef<Var> | null = new Var({_object: $.markAsStructValue(new _object({name: "x"}))})
	await $.println($.pointerValue<Var>(v)._object.Name(), $.pointerValue<Var>(v)._object.name, $.pointerValue<Var>(v)._object.Name(), $.pointerValue<Var>(v)._object.name)
	let o: _object | $.VarRef<_object> | null = $.fieldRef($.pointerValue<Var>(v)._fields, "_object")
	$.pointerValue<_object>(o).name = "y"
	await $.println($.pointerValue<Var>(v)._object.name)
	let h = $.markAsStructValue(new Holder({_number: new _number({n: 3}), _string: "s"}))
	await $.println($.pointerValue<_number>(h._number).n, $.pointerValue<_number>(h._number).n, h._string)
}

if ($.isMainScript(import.meta)) {
	await main()
}

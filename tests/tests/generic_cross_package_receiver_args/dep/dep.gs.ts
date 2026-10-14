// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/generic_cross_package_receiver_args/dep", ["dep.Provider", "dep.Impl", "dep.Keyed", "dep.Wrapper"])

export type Provider = {
	Value(__typeArgs: $.GenericTypeArgs | undefined): any
}

$.registerInterfaceType(
	"dep.Provider",
	null,
	[{ name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }]
);

export class Impl {
	public get Item(): any {
		return this._fields.Item
	}

	public set Item(value: any) {
		this._fields.Item = value
	}

	public _fields: {
		Item: any
	}

	constructor(init?: Partial<{Item?: any}>) {
		this._fields = {
			Item: init?.Item !== undefined ? $.copyElement(init.Item) : (null! as any)
		}
	}

	public clone(): Impl {
		return $.markAsStructValue(new Impl(this))
	}

	public __goscriptAssign(source: Impl): void {
		const target = this._fields
		const values = source._fields
		target.Item = $.assignFieldValue(target.Item, values.Item, { kind: $.TypeKind.Interface, methods: [] })
	}

	public Value(__typeArgs: $.GenericTypeArgs | undefined): any {
		const i: Impl | $.VarRef<Impl> | null = this;
		return $.copyElement($.pointerValue<Impl>(i).Item)
	}

	static __typeInfo = $.registerStructType(
		"dep.Impl",
		() => new Impl(),
		() => [{ name: "Value", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		Impl,
		() => [{ name: "Item", key: "Item", type: { kind: $.TypeKind.Interface, methods: [] } }]
	)
}

export class Keyed {
	public _fields: {
	}

	constructor(init?: Partial<{}>) {
		this._fields = {
		}
	}

	public clone(): Keyed {
		return $.markAsStructValue(new Keyed(this))
	}

	public __goscriptAssign(source: Keyed): void {
	}

	public SetValues(__typeArgs: $.GenericTypeArgs | undefined, value: any): any {
		const k: Keyed | $.VarRef<Keyed> | null = this;
		let zero: any = $.genericZero(__typeArgs, "U", null)
		return $.copyElement(zero)
	}

	static __typeInfo = $.registerStructType(
		"dep.Keyed",
		() => new Keyed(),
		() => [{ name: "SetValues", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		Keyed,
		() => []
	)
}

export class Wrapper {
	public get Keyed(): Keyed | $.VarRef<Keyed> | null {
		return this._fields.Keyed
	}

	public set Keyed(value: Keyed | $.VarRef<Keyed> | null) {
		this._fields.Keyed = value
	}

	public _fields: {
		Keyed: Keyed | $.VarRef<Keyed> | null
	}

	constructor(init?: Partial<{Keyed?: Keyed | $.VarRef<Keyed> | null}>) {
		this._fields = {
			Keyed: init?.Keyed ?? (null! as Keyed | $.VarRef<Keyed> | null)
		}
	}

	public clone(): Wrapper {
		return $.markAsStructValue(new Wrapper(this))
	}

	public __goscriptAssign(source: Wrapper): void {
		const target = this._fields
		const values = source._fields
		target.Keyed = values.Keyed
	}

	public SetValues(__typeArgs: $.GenericTypeArgs | undefined, value: any): any {
		return $.pointerValue<Keyed>(this.Keyed).SetValues({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: __typeArgs?.["T"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }, U: __typeArgs?.["U"] ?? { type: { kind: $.TypeKind.Interface, methods: [] }, zero: () => null }}, value)
	}

	static __typeInfo = $.registerStructType(
		"dep.Wrapper",
		() => new Wrapper(),
		() => [{ name: "SetValues", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }] }],
		Wrapper,
		() => [{ name: "Keyed", key: "Keyed", type: /* @__PURE__ */ $.pointerType("dep.Keyed"), anonymous: true }]
	)
}

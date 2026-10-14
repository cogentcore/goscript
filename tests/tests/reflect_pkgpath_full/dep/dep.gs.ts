// Generated file based on dep.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as reflect from "@goscript/reflect/index.js"
import "@goscript/reflect/index.js"

$.registerTypePackagePath("github.com/s4wave/goscript/tests/tests/reflect_pkgpath_full/dep", ["dep.Node", "dep.Level", "dep.Namer", "dep.Box", "dep.local"])

export type Level = number

export type Namer = {
	Name(): string
}

$.registerInterfaceType(
	"dep.Namer",
	null,
	[$.methodSignature("Name", [], [/* @__PURE__ */ $.basicType("string")])]
);

export class Node {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Node {
		return new Node(this, true)
	}

	public __goscriptAssign(source: Node): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
	}

	static __typeInfo = $.registerStructType(
		"dep.Node",
		() => new Node(),
		() => [],
		Node,
		() => [/* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [0], 0, true)]
	)
}

export class Box {
	public get Value(): any {
		return this._fields.Value
	}

	public set Value(value: any) {
		this._fields.Value = value
	}

	public _fields: {
		Value: any
	}

	constructor(init?: Partial<{Value?: any}>, __goscriptValue?: boolean) {
		this._fields = {
			Value: init?.Value !== undefined ? $.copyElement(init.Value) : (null! as any)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Box {
		return new Box(this, true)
	}

	public __goscriptAssign(source: Box): void {
		const target = this._fields
		const values = source._fields
		target.Value = $.assignFieldValue(target.Value, values.Value, { kind: $.TypeKind.Interface, methods: [] })
	}

	static __typeInfo = $.registerStructType(
		"dep.Box",
		() => new Box(),
		() => [],
		Box,
		() => [/* @__PURE__ */ $.structField("Value", { kind: $.TypeKind.Interface, methods: [] }, [0], 0, true)]
	)
}

export function LocalType(): reflect.Type | null {
	class local {
		public get A(): number {
			return this._fields.A
		}

		public set A(value: number) {
			this._fields.A = value
		}

		public _fields: {
			A: number
		}

		constructor(init?: Partial<{A?: number}>, __goscriptValue?: boolean) {
			this._fields = {
				A: init?.A ?? (0 as number)
			}
			;(this as any)[$.structValueMarker] = __goscriptValue === true
		}

		public clone(): local {
			return new local(this, true)
		}

		public __goscriptAssign(source: local): void {
			const target = this._fields
			const values = source._fields
			target.A = values.A
		}

		static __typeInfo = $.registerStructType(
			"dep.local",
			() => new local(),
			() => [],
			local,
			() => [/* @__PURE__ */ $.structField("A", /* @__PURE__ */ $.basicType("int"), [0], 0, true)]
		)
	}
	return reflect.TypeOf($.interfaceValue($.markAsStructValue(new local()), "dep.local", "dep.local"))
}

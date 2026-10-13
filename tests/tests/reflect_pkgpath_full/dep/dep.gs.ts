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
	public declare Name: string

	public _fields: {
		Name: string
	}

	constructor(init?: Partial<{Name?: string}>) {
		this._fields = {
			Name: init?.Name ?? ("" as string)
		}
	}

	public clone(): Node {
		return $.markAsStructValue(new Node(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Name"])
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
	public declare Value: any

	public _fields: {
		Value: any
	}

	constructor(init?: Partial<{Value?: any}>) {
		this._fields = {
			Value: init?.Value ?? (null! as any)
		}
	}

	public clone(): Box {
		return $.markAsStructValue(new Box(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Value"])
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
		public declare A: number

		public _fields: {
			A: number
		}

		constructor(init?: Partial<{A?: number}>) {
			this._fields = {
				A: init?.A ?? (0 as number)
			}
		}

		public clone(): local {
			return $.markAsStructValue(new local(this))
		}

		static {
			$.bindStructFields(this.prototype, ["A"])
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

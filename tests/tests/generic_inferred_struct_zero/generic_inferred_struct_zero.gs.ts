// Generated file based on generic_inferred_struct_zero.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class entry {
	public get key(): $.Slice<number> {
		return this._fields.key
	}

	public set key(value: $.Slice<number>) {
		this._fields.key = value
	}

	public get n(): number {
		return this._fields.n
	}

	public set n(value: number) {
		this._fields.n = value
	}

	public _fields: {
		key: $.Slice<number>
		n: number
	}

	constructor(init?: Partial<{key?: $.Slice<number>, n?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			key: init?.key ?? (null! as $.Slice<number>),
			n: init?.n ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): entry {
		return new entry(this, true)
	}

	public __goscriptAssign(source: entry): void {
		const target = this._fields
		const values = source._fields
		target.key = values.key
		target.n = values.n
	}

	static __typeInfo = $.registerStructType(
		"main.entry",
		() => new entry(),
		() => [],
		entry,
		() => [{ name: "key", key: "key", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "n", key: "n", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export class tree {
	public get less(): ((a: any, b: any) => boolean | globalThis.Promise<boolean>) | null {
		return this._fields.less
	}

	public set less(value: ((a: any, b: any) => boolean | globalThis.Promise<boolean>) | null) {
		this._fields.less = value
	}

	public get empty(): any {
		return this._fields.empty
	}

	public set empty(value: any) {
		this._fields.empty = value
	}

	public get count(): number {
		return this._fields.count
	}

	public set count(value: number) {
		this._fields.count = value
	}

	public _fields: {
		less: ((a: any, b: any) => boolean | globalThis.Promise<boolean>) | null
		empty: any
		count: number
	}

	constructor(init?: Partial<{less?: ((a: any, b: any) => boolean | globalThis.Promise<boolean>) | null, empty?: any, count?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			less: init?.less ?? (null! as ((a: any, b: any) => boolean | globalThis.Promise<boolean>) | null),
			empty: init?.empty !== undefined ? $.copyElement(init.empty) : (null! as any),
			count: init?.count ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): tree {
		return new tree(this, true)
	}

	public __goscriptAssign(source: tree): void {
		const target = this._fields
		const values = source._fields
		target.less = values.less
		target.empty = $.assignFieldValue(target.empty, values.empty, { kind: $.TypeKind.Interface, methods: [] })
		target.count = values.count
	}

	public ["get"](__typeArgs: $.GenericTypeArgs | undefined): any {
		const tr: tree | $.VarRef<tree> | null = this;
		return $.copyElement($.pointerValue<tree>(tr).empty)
	}

	static __typeInfo = $.registerStructType(
		"main.tree",
		() => new tree(),
		() => [{ name: "get", args: [], returns: [{ type: { kind: $.TypeKind.Interface, methods: [] } }], pointerReceiver: true }],
		tree,
		() => [{ name: "less", key: "less", type: ({ kind: $.TypeKind.Function, params: [{ kind: $.TypeKind.Interface, methods: [] }, { kind: $.TypeKind.Interface, methods: [] }], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo) }, { name: "empty", key: "empty", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "count", key: "count", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newTree(__typeArgs: $.GenericTypeArgs | undefined, less: ((a: any, b: any) => boolean | globalThis.Promise<boolean>) | null): tree | $.VarRef<tree> | null {
	let tr: tree | $.VarRef<tree> | null = new tree({empty: $.genericZero(__typeArgs, "T", null)})
	$.pointerValue<tree>(tr).less = less
	return tr
}

export function literalTree(__typeArgs: $.GenericTypeArgs | undefined): tree {
	return $.markAsStructValue(new tree({count: 1, empty: $.genericZero(__typeArgs, "T", null)}))
}

export function varTree(__typeArgs: $.GenericTypeArgs | undefined): tree {
	let tr: tree = $.markAsStructValue(new tree({empty: $.genericZero(__typeArgs, "T", null)}))
	return $.markAsStructValue($.cloneStructValue(tr))
}

export function zero(__typeArgs: $.GenericTypeArgs | undefined): any {
	let z: any = $.genericZero(__typeArgs, "T", null)
	return $.copyElement(z)
}

export function lessEntry(a: entry, b: entry): boolean {
	return a.n < b.n
}

export async function main(): globalThis.Promise<void> {
	// Inferred from a function-typed argument.
	let tr: tree | $.VarRef<tree> | null = (newTree(__goscriptStatic0(), lessEntry) as tree | $.VarRef<tree> | null)
	let e = ((tree.prototype.get.call(tr, __goscriptStatic0())).clone() as entry)
	await $.println("new", e.key == null, e.n)
	await $.println("less", (__goscriptAwait = $.pointerValue<tree>(tr).less!(new entry({n: 1}, true), new entry({n: 2}, true)), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))

	// Zero values of type-parameter fields in generic constructors.
	let lit = (literalTree(__goscriptStatic0()) as tree)
	await $.println("literal", lit.empty.key == null, lit.empty.n, lit.count)
	let v = (varTree(__goscriptStatic0()) as tree)
	await $.println("var", v.empty.key == null, v.empty.n)
	let z = ((zero(__goscriptStatic0())).clone() as entry)
	await $.println("zero", z.key == null, z.n)
	let ints: tree | $.VarRef<tree> | null = (newTree(__goscriptStatic1(), $.functionValue((a: number, b: number): boolean => {
		return a < b
	}, ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.basicType("int"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("bool")] } as $.FunctionTypeInfo))) as tree | $.VarRef<tree> | null)
	await $.println("int", tree.prototype.get.call(ints, __goscriptStatic1()))
}

var __goscriptStatic0$value: any
function __goscriptStatic0(): any {
	return __goscriptStatic0$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: "main.entry", zero: () => new entry(undefined, true) }})
}

var __goscriptStatic1$value: any
function __goscriptStatic1(): any {
	return __goscriptStatic1$value ??= ({[$.genericTypeArgsMarker]: $.genericTypeArgsBrand, T: { type: /* @__PURE__ */ $.basicType("int"), zero: () => 0 }})
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

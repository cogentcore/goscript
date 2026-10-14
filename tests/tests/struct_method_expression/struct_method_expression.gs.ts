// Generated file based on struct_method_expression.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class worker {
	public get base(): number {
		return this._fields.base
	}

	public set base(value: number) {
		this._fields.base = value
	}

	public _fields: {
		base: number
	}

	constructor(init?: Partial<{base?: number}>) {
		this._fields = {
			base: init?.base ?? (0 as number)
		}
	}

	public clone(): worker {
		return $.markAsStructValue(new worker(this))
	}

	public __goscriptAssign(source: worker): void {
		const target = this._fields
		const values = source._fields
		target.base = values.base
	}

	public add(v: number): number {
		const w: worker | $.VarRef<worker> | null = this;
		return $.pointerValue<worker>(w).base + v
	}

	static __typeInfo = $.registerStructType(
		"main.worker",
		() => new worker(),
		() => [{ name: "add", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		worker,
		() => [{ name: "base", key: "base", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let fn: ((w: worker | $.VarRef<worker> | null, v: number) => number | globalThis.Promise<number>) | null = $.functionValue((w: worker | $.VarRef<worker> | null, v: number): number => $.pointerValue<worker>(w).add(v), ({ kind: $.TypeKind.Function, params: [/* @__PURE__ */ $.pointerType("main.worker"), /* @__PURE__ */ $.basicType("int")], results: [/* @__PURE__ */ $.basicType("int")] } as $.FunctionTypeInfo))
	await $.println("method expr:", (__goscriptAwait = fn!(new worker({base: 5}), 7), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

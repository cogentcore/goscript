// Generated file based on main.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as dep from "@goscript/github.com/s4wave/goscript/tests/tests/type_alias_interface_param_cross_file/dep/index.js"

import * as __goscript_types from "./types.gs.ts"
import "@goscript/github.com/s4wave/goscript/tests/tests/type_alias_interface_param_cross_file/dep/index.js"
import "./types.gs.ts"

export class sink {
	public get size(): number {
		return this._fields.size
	}

	public set size(value: number) {
		this._fields.size = value
	}

	public _fields: {
		size: number
	}

	constructor(init?: Partial<{size?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			size: init?.size ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): sink {
		return new sink(this, true)
	}

	public __goscriptAssign(source: sink): void {
		const target = this._fields
		const values = source._fields
		target.size = values.size
	}

	public Put(v: __goscript_types.Value): void {
		let s: sink | $.VarRef<sink> | null = this;
		$.pointerValue<sink>(s).size = $.sliceLen((v as __goscript_types.Value))
	}

	static __typeInfo = $.registerStructType(
		"main.sink",
		() => new sink(),
		() => [{ name: "Put", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }],
		sink,
		() => [{ name: "size", key: "size", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function write(tx: __goscript_types.Tx | null, v: dep.Value): globalThis.Promise<void> {
	void (__goscriptAwait = (tx !== null && (tx as any).__isVarRef !== true && (tx as any).__goValue === undefined ? (tx as Exclude<__goscript_types.Tx, null>) : $.pointerValue<Exclude<__goscript_types.Tx, null>>(tx)).Put((v as __goscript_types.Value)), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait)
}

export async function main(): globalThis.Promise<void> {
	let s = new sink()
	await write($.interfaceValue<__goscript_types.Tx | null>(s, "*main.sink", /* @__PURE__ */ $.pointerType("main.sink")), (new Uint8Array([1, 2, 3]) as $.Slice<number> as dep.Value))
	await $.println("size:", $.pointerValue<sink>(s).size)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

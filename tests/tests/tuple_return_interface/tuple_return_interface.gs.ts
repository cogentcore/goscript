// Generated file based on tuple_return_interface.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export type Block = {
	Size(): number
}

$.registerInterfaceType(
	"main.Block",
	null,
	[{ name: "Size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }] }]
);

export class blockImpl {
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

	public clone(): blockImpl {
		return new blockImpl(this, true)
	}

	public __goscriptAssign(source: blockImpl): void {
		const target = this._fields
		const values = source._fields
		target.size = values.size
	}

	public Size(): number {
		const b: blockImpl | $.VarRef<blockImpl> | null = this;
		return $.pointerValue<blockImpl>(b).size
	}

	static __typeInfo = $.registerStructType(
		"main.blockImpl",
		() => new blockImpl(),
		() => [{ name: "Size", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		blockImpl,
		() => [{ name: "size", key: "size", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export function newBlock(size: number): [blockImpl | $.VarRef<blockImpl> | null, $.GoError] {
	return [new blockImpl({size: size}), null]
}

export function newInterface(size: number): [Block | null, $.GoError] {
	if (size == 0) {
		return [null, null]
	}
	const __goscriptReturn0 = newBlock(size)
	return [$.interfaceValue<Block | null>(__goscriptReturn0[0], "*main.blockImpl", /* @__PURE__ */ $.pointerType("main.blockImpl")), __goscriptReturn0[1]]
	throw new globalThis.Error("goscript: unreachable return")
}

export async function main(): globalThis.Promise<void> {
	let [block, err] = newInterface(16)
	await $.println("err nil:", err == null)
	await $.println("size:", (__goscriptAwait = (block !== null && (block as any).__isVarRef !== true && (block as any).__goValue === undefined ? (block as Exclude<Block, null>) : $.pointerValue<Exclude<Block, null>>(block)).Size(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

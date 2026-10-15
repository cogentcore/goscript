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
	public declare size: number

	constructor(__goscriptValue?: boolean, size$?: number) {
		this.size = size$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): blockImpl {
		return new blockImpl(true, this.size)
	}

	public __goscriptAssign(source: blockImpl): this {
		this.size = source.size
		return this
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
	return [new blockImpl(false, size), null]
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

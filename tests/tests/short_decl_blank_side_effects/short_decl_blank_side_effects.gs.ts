// Generated file based on short_decl_blank_side_effects.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class cursor {
	public declare pos: number

	constructor(__goscriptValue?: boolean, pos$?: number) {
		this.pos = pos$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): cursor {
		return new cursor(true, this.pos)
	}

	public __goscriptAssign(source: cursor): this {
		this.pos = source.pos
		return this
	}

	public next(): number {
		const c: cursor | $.VarRef<cursor> | null = this;
		const c$: cursor = c == null ? $.pointerTarget<cursor>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<cursor>(c);
		;(c$ as cursor).pos++
		return (c$ as cursor).pos * 10
	}

	public async recv(ch: $.Channel<number> | null): globalThis.Promise<number> {
		const c: cursor | $.VarRef<cursor> | null = this;
		await $.chanSend(ch, (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).next() : cursor.prototype.next.call(c)))
		return await $.chanRecv(ch)
	}

	static __typeInfo = $.registerStructType(
		"main.cursor",
		() => new cursor(),
		() => [{ name: "next", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }, { name: "recv", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [{ type: /* @__PURE__ */ $.basicType("int") }], pointerReceiver: true }],
		cursor,
		() => [{ name: "pos", key: "pos", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	// Each blank target still evaluates its value, in order.
	let c = new cursor()
	let c$: cursor = c == null ? $.pointerTarget<cursor>(c) : (c as any).__isVarRef === true ? (c as any).value : (c as any).__goValue === undefined ? (c as any) : $.pointerTarget<cursor>(c)
	let a = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).next() : cursor.prototype.next.call(c));
	;(c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).next() : cursor.prototype.next.call(c))
	let b = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).next() : cursor.prototype.next.call(c));
	;(c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).next() : cursor.prototype.next.call(c))
	await $.println(a, b, (c$ as cursor).pos)

	// So does one that awaits.
	let ch = $.makeChannel<number>(1, 0, "both")
	await (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).recv(ch) : cursor.prototype.recv.call(c, ch))
	let d = (c !== null && (c as any).__isVarRef !== true && (c as any).__goValue === undefined ? ((c as any) as cursor).next() : cursor.prototype.next.call(c))
	await $.println(d, (c$ as cursor).pos)
}

if ($.isMainScript(import.meta)) {
	await main()
}

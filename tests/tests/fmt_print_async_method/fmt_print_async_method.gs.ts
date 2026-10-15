// Generated file based on fmt_print_async_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export class slowName {
	public declare ch: $.Channel<string> | null

	constructor(__goscriptValue?: boolean, ch$?: $.Channel<string> | null) {
		this.ch = ch$ ?? (null! as $.Channel<string> | null)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): slowName {
		return new slowName(true, this.ch)
	}

	public __goscriptAssign(source: slowName): this {
		this.ch = source.ch
		return this
	}

	public async String(): globalThis.Promise<string> {
		const s = this;
		await $.chanSend(s.ch, "slow")
		return await $.chanRecv(s.ch)
	}

	static __typeInfo = $.registerStructType(
		"main.slowName",
		() => new slowName(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		slowName,
		() => [{ name: "ch", key: "ch", type: /* @__PURE__ */ $.channelType(/* @__PURE__ */ $.basicType("string"), "both") }]
	)
}

export class point {
	public declare x: number

	public declare y: number

	constructor(__goscriptValue?: boolean, x$?: number, y$?: number) {
		this.x = x$ ?? 0
		this.y = y$ ?? 0
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(true, this.x, this.y)
	}

	public __goscriptAssign(source: point): this {
		this.x = source.x
		this.y = source.y
		return this
	}

	public String(): string {
		const p = this;
		return (fmt.Sprintf("(%d, %d)", $.basicInterfaceValue(p.x, "int"), $.basicInterfaceValue(p.y, "int")) as string)
	}

	static __typeInfo = $.registerStructType(
		"main.point",
		() => new point(),
		() => [{ name: "String", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }] }],
		point,
		() => [{ name: "x", key: "x", type: /* @__PURE__ */ $.basicType("int") }, { name: "y", key: "y", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function label(v: fmt.Stringer | null, n: number): globalThis.Promise<string> {
	return fmt.Sprintf("%v/%d", (v as any), $.basicInterfaceValue(n, "int"))
}

export function describe(p: point): string {
	return (fmt.Sprint("point ", $.interfaceValue((p).clone(), "main.point", "main.point")) as string)
}

export async function main(): globalThis.Promise<void> {
	await $.println(await label($.interfaceValue<fmt.Stringer | null>(new slowName(true, $.makeChannel<string>(1, "", "both")), "main.slowName", "main.slowName"), 1))
	await $.println(await label($.interfaceValue<fmt.Stringer | null>(new point(true, 2, 3), "main.point", "main.point"), 4))
	await $.println(describe(new point(true, 5, 6)))
	let err = fmt.Errorf("bad %v", $.interfaceValue(new slowName(true, $.makeChannel<string>(1, "", "both")), "main.slowName", "main.slowName"))
	await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && ((err as any).__goValue === undefined || (err as any).__goType?.charCodeAt(0) !== 42) ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

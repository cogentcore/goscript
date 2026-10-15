// Generated file based on fmt_print_async_method.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as fmt from "@goscript/fmt/index.js"

export class slowName {
	public get ch(): $.Channel<string> | null {
		return this._fields.ch
	}

	public set ch(value: $.Channel<string> | null) {
		this._fields.ch = value
	}

	public _fields: {
		ch: $.Channel<string> | null
	}

	constructor(init?: Partial<{ch?: $.Channel<string> | null}>, __goscriptValue?: boolean) {
		this._fields = {
			ch: init?.ch ?? (null! as $.Channel<string> | null)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): slowName {
		return new slowName(this, true)
	}

	public __goscriptAssign(source: slowName): void {
		const target = this._fields
		const values = source._fields
		target.ch = values.ch
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
	public get x(): number {
		return this._fields.x
	}

	public set x(value: number) {
		this._fields.x = value
	}

	public get y(): number {
		return this._fields.y
	}

	public set y(value: number) {
		this._fields.y = value
	}

	public _fields: {
		x: number
		y: number
	}

	constructor(init?: Partial<{x?: number, y?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			x: init?.x ?? (0 as number),
			y: init?.y ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): point {
		return new point(this, true)
	}

	public __goscriptAssign(source: point): void {
		const target = this._fields
		const values = source._fields
		target.x = values.x
		target.y = values.y
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
	await $.println(await label($.interfaceValue<fmt.Stringer | null>(new slowName({ch: $.makeChannel<string>(1, "", "both")}, true), "main.slowName", "main.slowName"), 1))
	await $.println(await label($.interfaceValue<fmt.Stringer | null>(new point({x: 2, y: 3}, true), "main.point", "main.point"), 4))
	await $.println(describe(new point({x: 5, y: 6}, true)))
	let err = fmt.Errorf("bad %v", $.interfaceValue(new slowName({ch: $.makeChannel<string>(1, "", "both")}, true), "main.slowName", "main.slowName"))
	await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

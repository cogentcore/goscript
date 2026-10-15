// Generated file based on fmt_print_sync_methods.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as errors from "@goscript/errors/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as strconv from "@goscript/strconv/index.js"

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

export class lineError {
	public get line(): number {
		return this._fields.line
	}

	public set line(value: number) {
		this._fields.line = value
	}

	public get err(): $.GoError {
		return this._fields.err
	}

	public set err(value: $.GoError) {
		this._fields.err = value
	}

	public _fields: {
		line: number
		err: $.GoError
	}

	constructor(init?: Partial<{line?: number, err?: $.GoError}>, __goscriptValue?: boolean) {
		this._fields = {
			line: init?.line ?? (0 as number),
			err: init?.err ?? (null! as $.GoError)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): lineError {
		return new lineError(this, true)
	}

	public __goscriptAssign(source: lineError): void {
		const target = this._fields
		const values = source._fields
		target.line = values.line
		target.err = $.assignFieldValue(target.err, values.err, "error")
	}

	public Error(): string {
		const e: lineError | $.VarRef<lineError> | null = this;
		const e$: lineError = e == null ? $.pointerTarget<lineError>(e) : (e as any).__isVarRef === true ? (e as any).value : (e as any).__goValue === undefined ? (e as any) : $.pointerTarget<lineError>(e)
		return "line " + strconv.Itoa((e$ as lineError).line) + ": " + ($.pointerValue<Exclude<$.GoError, null>>((e$ as lineError).err).Error() as string)
	}

	public Unwrap(): $.GoError {
		const e: lineError | $.VarRef<lineError> | null = this;
		return $.pointerValue<lineError>(e).err
	}

	static __typeInfo = $.registerStructType(
		"main.lineError",
		() => new lineError(),
		() => [{ name: "Error", args: [], returns: [{ type: /* @__PURE__ */ $.basicType("string") }], pointerReceiver: true }, { name: "Unwrap", args: [], returns: [{ type: "error" }], pointerReceiver: true }],
		lineError,
		() => [{ name: "line", key: "line", type: /* @__PURE__ */ $.basicType("int") }, { name: "err", key: "err", type: "error" }]
	)
}

export function describe(p: point, n: number): string {
	return (fmt.Sprintf("%v has %d items", $.interfaceValue((p).clone(), "main.point", "main.point"), $.basicInterfaceValue(n, "int")) as string)
}

export function parse(line: number, s: string): [bigint, $.GoError] {
	let [n, err] = strconv.ParseInt(s, 10, 64)
	if (err != null) {
		return [0n, $.interfaceValue<$.GoError>(new lineError({line: line, err: err}), "*main.lineError", /* @__PURE__ */ $.pointerType("main.lineError"))]
	}
	return [n, null]
}

export function message(err: $.GoError): string {
	return (fmt.Sprint("error: ", (err as any)) as string)
}

export async function main(): globalThis.Promise<void> {
	await $.println(describe(new point({x: 1, y: 2}, true), 3))
	await $.println((fmt.Sprint($.interfaceValue(new point({x: 4, y: 5}, true), "main.point", "main.point"), "x", $.basicInterfaceValue(6, "int")) as string))

	let [, err] = parse(3, "abc")
	await $.println((__goscriptAwait = (err !== null && (err as any).__isVarRef !== true && (err as any).__goValue === undefined ? (err as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(err)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait))
	await $.println(message(err))

	let wrapped = fmt.Errorf("wrap %v: %w", $.interfaceValue(new point({x: 7, y: 8}, true), "main.point", "main.point"), (err as any))
	await $.println((__goscriptAwait = (wrapped !== null && (wrapped as any).__isVarRef !== true && (wrapped as any).__goValue === undefined ? (wrapped as Exclude<$.GoError, null>) : $.pointerValue<Exclude<$.GoError, null>>(wrapped)).Error(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.comparableEqual(errors.Unwrap($.pointerValueOrNil(wrapped)!), err))
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}

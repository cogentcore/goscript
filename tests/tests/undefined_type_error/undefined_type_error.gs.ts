// Generated file based on undefined_type_error.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class formatter {
	public declare wid: number

	public declare prec: number

	public declare widPresent: boolean

	public declare precPresent: boolean

	public declare minus: boolean

	public declare plus: boolean

	public declare sharp: boolean

	public declare space: boolean

	public declare zero: boolean

	public declare plusV: boolean

	public declare sharpV: boolean

	constructor(__goscriptValue?: boolean, wid$?: number, prec$?: number, widPresent$?: boolean, precPresent$?: boolean, minus$?: boolean, plus$?: boolean, sharp$?: boolean, space$?: boolean, zero$?: boolean, plusV$?: boolean, sharpV$?: boolean) {
		this.wid = wid$ ?? 0
		this.prec = prec$ ?? 0
		this.widPresent = widPresent$ ?? false
		this.precPresent = precPresent$ ?? false
		this.minus = minus$ ?? false
		this.plus = plus$ ?? false
		this.sharp = sharp$ ?? false
		this.space = space$ ?? false
		this.zero = zero$ ?? false
		this.plusV = plusV$ ?? false
		this.sharpV = sharpV$ ?? false
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): formatter {
		return new formatter(true, this.wid, this.prec, this.widPresent, this.precPresent, this.minus, this.plus, this.sharp, this.space, this.zero, this.plusV, this.sharpV)
	}

	public __goscriptAssign(source: formatter): this {
		this.wid = source.wid
		this.prec = source.prec
		this.widPresent = source.widPresent
		this.precPresent = source.precPresent
		this.minus = source.minus
		this.plus = source.plus
		this.sharp = source.sharp
		this.space = source.space
		this.zero = source.zero
		this.plusV = source.plusV
		this.sharpV = source.sharpV
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.formatter",
		() => new formatter(),
		() => [],
		formatter,
		() => [{ name: "wid", key: "wid", type: /* @__PURE__ */ $.basicType("int") }, { name: "prec", key: "prec", type: /* @__PURE__ */ $.basicType("int") }, { name: "widPresent", key: "widPresent", type: /* @__PURE__ */ $.basicType("bool") }, { name: "precPresent", key: "precPresent", type: /* @__PURE__ */ $.basicType("bool") }, { name: "minus", key: "minus", type: /* @__PURE__ */ $.basicType("bool") }, { name: "plus", key: "plus", type: /* @__PURE__ */ $.basicType("bool") }, { name: "sharp", key: "sharp", type: /* @__PURE__ */ $.basicType("bool") }, { name: "space", key: "space", type: /* @__PURE__ */ $.basicType("bool") }, { name: "zero", key: "zero", type: /* @__PURE__ */ $.basicType("bool") }, { name: "plusV", key: "plusV", type: /* @__PURE__ */ $.basicType("bool") }, { name: "sharpV", key: "sharpV", type: /* @__PURE__ */ $.basicType("bool") }]
	)
}

export class printer {
	public declare buf: $.Slice<number>

	public declare arg: any

	// This line causes the issue: fmt: $.VarRef<fmt>; where fmt is undefined
	// Should generate proper type reference
	public declare fmt: formatter

	constructor(__goscriptValue?: boolean, buf$?: $.Slice<number>, arg$?: any, fmt$?: formatter) {
		this.buf = buf$ ?? (null! as $.Slice<number>)
		this.arg = arg$ ?? (null! as any)
		this.fmt = fmt$ ?? new formatter(true)
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): printer {
		return new printer(true, this.buf, this.arg, this.fmt.clone())
	}

	public __goscriptAssign(source: printer): this {
		this.buf = source.buf
		this.arg = $.assignFieldValue(this.arg, source.arg)
		this.fmt.__goscriptAssign(source.fmt)
		return this
	}

	public async format(verb: number): globalThis.Promise<void> {
		const p: printer | $.VarRef<printer> | null = this;
		const p$: printer = p == null ? $.pointerTarget<printer>(p) : (p as any).__isVarRef === true ? (p as any).value : (p as any).__goValue === undefined ? (p as any) : $.pointerTarget<printer>(p)
		// Use the formatter
		if ((p$ as printer).fmt.minus) {
			await $.println("minus flag set")
		}
		if ((p$ as printer).fmt.plus) {
			await $.println("plus flag set")
		}
	}

	public init(): void {
		let p: printer | $.VarRef<printer> | null = this;
		$.pointerValue<printer>(p).fmt.__goscriptAssign(new formatter(true))
	}

	static __typeInfo = $.registerStructType(
		"main.printer",
		() => new printer(),
		() => [{ name: "format", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [], pointerReceiver: true }, { name: "init", args: [], returns: [], pointerReceiver: true }],
		printer,
		() => [{ name: "buf", key: "buf", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "arg", key: "arg", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "fmt", key: "fmt", type: "main.formatter" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let p = new printer()
	void (p !== null && (p as any).__isVarRef !== true && (p as any).__goValue === undefined ? ((p as any) as printer).init() : printer.prototype.init.call(p))
	await (p !== null && (p as any).__isVarRef !== true && (p as any).__goValue === undefined ? ((p as any) as printer).format(100) : printer.prototype.format.call(p, 100))
	await $.println("Formatter test completed")
}

if ($.isMainScript(import.meta)) {
	await main()
}

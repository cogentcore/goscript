// Generated file based on undefined_type_error.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class formatter {
	public get wid(): number {
		return this._fields.wid
	}

	public set wid(value: number) {
		this._fields.wid = value
	}

	public get prec(): number {
		return this._fields.prec
	}

	public set prec(value: number) {
		this._fields.prec = value
	}

	public get widPresent(): boolean {
		return this._fields.widPresent
	}

	public set widPresent(value: boolean) {
		this._fields.widPresent = value
	}

	public get precPresent(): boolean {
		return this._fields.precPresent
	}

	public set precPresent(value: boolean) {
		this._fields.precPresent = value
	}

	public get minus(): boolean {
		return this._fields.minus
	}

	public set minus(value: boolean) {
		this._fields.minus = value
	}

	public get plus(): boolean {
		return this._fields.plus
	}

	public set plus(value: boolean) {
		this._fields.plus = value
	}

	public get sharp(): boolean {
		return this._fields.sharp
	}

	public set sharp(value: boolean) {
		this._fields.sharp = value
	}

	public get space(): boolean {
		return this._fields.space
	}

	public set space(value: boolean) {
		this._fields.space = value
	}

	public get zero(): boolean {
		return this._fields.zero
	}

	public set zero(value: boolean) {
		this._fields.zero = value
	}

	public get plusV(): boolean {
		return this._fields.plusV
	}

	public set plusV(value: boolean) {
		this._fields.plusV = value
	}

	public get sharpV(): boolean {
		return this._fields.sharpV
	}

	public set sharpV(value: boolean) {
		this._fields.sharpV = value
	}

	public _fields: {
		wid: number
		prec: number
		widPresent: boolean
		precPresent: boolean
		minus: boolean
		plus: boolean
		sharp: boolean
		space: boolean
		zero: boolean
		plusV: boolean
		sharpV: boolean
	}

	constructor(init?: Partial<{wid?: number, prec?: number, widPresent?: boolean, precPresent?: boolean, minus?: boolean, plus?: boolean, sharp?: boolean, space?: boolean, zero?: boolean, plusV?: boolean, sharpV?: boolean}>) {
		this._fields = {
			wid: init?.wid ?? (0 as number),
			prec: init?.prec ?? (0 as number),
			widPresent: init?.widPresent ?? (false as boolean),
			precPresent: init?.precPresent ?? (false as boolean),
			minus: init?.minus ?? (false as boolean),
			plus: init?.plus ?? (false as boolean),
			sharp: init?.sharp ?? (false as boolean),
			space: init?.space ?? (false as boolean),
			zero: init?.zero ?? (false as boolean),
			plusV: init?.plusV ?? (false as boolean),
			sharpV: init?.sharpV ?? (false as boolean)
		}
	}

	public clone(): formatter {
		return $.markAsStructValue(new formatter(this))
	}

	public __goscriptAssign(source: formatter): void {
		const target = this._fields
		const values = source._fields
		target.wid = values.wid
		target.prec = values.prec
		target.widPresent = values.widPresent
		target.precPresent = values.precPresent
		target.minus = values.minus
		target.plus = values.plus
		target.sharp = values.sharp
		target.space = values.space
		target.zero = values.zero
		target.plusV = values.plusV
		target.sharpV = values.sharpV
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
	public get buf(): $.Slice<number> {
		return this._fields.buf
	}

	public set buf(value: $.Slice<number>) {
		this._fields.buf = value
	}

	public get arg(): any {
		return this._fields.arg
	}

	public set arg(value: any) {
		this._fields.arg = value
	}

	// This line causes the issue: fmt: $.VarRef<fmt>; where fmt is undefined
	// Should generate proper type reference
	public get fmt(): formatter {
		return this._fields.fmt
	}

	public set fmt(value: formatter) {
		this._fields.fmt = value
	}

	public _fields: {
		buf: $.Slice<number>
		arg: any
		fmt: formatter
	}

	constructor(init?: Partial<{buf?: $.Slice<number>, arg?: any, fmt?: formatter}>) {
		this._fields = {
			buf: init?.buf ?? (null! as $.Slice<number>),
			arg: init?.arg ?? (null! as any),
			fmt: init?.fmt ? $.markAsStructValue($.cloneStructValue(init.fmt)) : $.markAsStructValue(new formatter())
		}
	}

	public clone(): printer {
		return $.markAsStructValue(new printer(this))
	}

	public __goscriptAssign(source: printer): void {
		const target = this._fields
		const values = source._fields
		target.buf = values.buf
		target.arg = $.assignFieldValue(target.arg, values.arg, { kind: $.TypeKind.Interface, methods: [] })
		$.assignStruct(target.fmt, values.fmt)
	}

	public async format(verb: number): globalThis.Promise<void> {
		const p: printer | $.VarRef<printer> | null = this;
		// Use the formatter
		if ($.pointerValue<printer>(p).fmt.minus) {
			await $.println("minus flag set")
		}
		if ($.pointerValue<printer>(p).fmt.plus) {
			await $.println("plus flag set")
		}
	}

	public init(): void {
		let p: printer | $.VarRef<printer> | null = this;
		$.assignStruct($.pointerValue<printer>(p).fmt, $.markAsStructValue(new formatter()))
	}

	static __typeInfo = $.registerStructType(
		"main.printer",
		() => new printer(),
		() => [{ name: "format", args: [{ type: { kind: $.TypeKind.Basic, name: "unknown" } }], returns: [] }, { name: "init", args: [], returns: [] }],
		printer,
		() => [{ name: "buf", key: "buf", type: /* @__PURE__ */ $.sliceType(/* @__PURE__ */ $.basicType("uint8")) }, { name: "arg", key: "arg", type: { kind: $.TypeKind.Interface, methods: [] } }, { name: "fmt", key: "fmt", type: "main.formatter" }]
	)
}

export async function main(): globalThis.Promise<void> {
	let p: printer | $.VarRef<printer> | null = new printer()
	printer.prototype.init.call(p)
	await printer.prototype.format.call(p, 100)
	await $.println("Formatter test completed")
}

if ($.isMainScript(import.meta)) {
	await main()
}

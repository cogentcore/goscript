// Generated file based on package_import_fmt_sscanf_verbs.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

import * as fmt from "@goscript/fmt/index.js"
import "@goscript/fmt/index.js"

export class Pos {
	public declare Line: number

	public declare Char: number

	public _fields: {
		Line: number
		Char: number
	}

	constructor(init?: Partial<{Line?: number, Char?: number}>) {
		this._fields = {
			Line: init?.Line ?? (0 as number),
			Char: init?.Char ?? (0 as number)
		}
	}

	public clone(): Pos {
		return $.markAsStructValue(new Pos(this))
	}

	static {
		$.bindStructFields(this.prototype, ["Line", "Char"])
	}

	static __typeInfo = $.registerStructType(
		"main.Pos",
		() => new Pos(),
		() => [],
		Pos,
		() => [{ name: "Line", key: "Line", type: /* @__PURE__ */ $.basicType("int") }, { name: "Char", key: "Char", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export async function main(): globalThis.Promise<void> {
	let f32: $.VarRef<number> = $.varRef(0)
	let [n, err] = fmt.Sscanf("1.0", "%g", $.interfaceValue(f32, "*float32", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("float32"))))
	await $.println("g float32:", n, err == null, f32.value)

	let f64: $.VarRef<number> = $.varRef(0)
	let __goscriptTuple0: any = fmt.Sscanf(" 2.5e1 rest", "%f", $.interfaceValue(f64, "*float64", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("float64"))))
	n = __goscriptTuple0[0]
	err = __goscriptTuple0[1]
	await $.println("f float64:", n, err == null, f64.value)

	let i64: $.VarRef<bigint> = $.varRef(0n)
	let u8: $.VarRef<number> = $.varRef(0)
	let __goscriptTuple1: any = fmt.Sscanf("-42,200", "%d,%d", $.interfaceValue(i64, "*int64", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int64"))), $.interfaceValue(u8, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))))
	n = __goscriptTuple1[0]
	err = __goscriptTuple1[1]
	await $.println("d int64 uint8:", n, err == null, i64.value, $.uint(u8.value, 8))

	let r: $.VarRef<number> = $.varRef(0)
	let g: $.VarRef<number> = $.varRef(0)
	let b: $.VarRef<number> = $.varRef(0)
	let __goscriptTuple2: any = fmt.Sscanf("ff8000", "%02x%02x%02x", $.interfaceValue(r, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))), $.interfaceValue(g, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))), $.interfaceValue(b, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))))
	n = __goscriptTuple2[0]
	err = __goscriptTuple2[1]
	await $.println("02x:", n, err == null, $.uint(r.value, 8), $.uint(g.value, 8), $.uint(b.value, 8))
	let __goscriptTuple3: any = fmt.Sscanf("f80", "%1x%1x%1x", $.interfaceValue(r, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))), $.interfaceValue(g, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))), $.interfaceValue(b, "*uint8", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("uint8"))))
	n = __goscriptTuple3[0]
	err = __goscriptTuple3[1]
	await $.println("1x:", n, err == null, $.uint(r.value, 8), $.uint(g.value, 8), $.uint(b.value, 8))

	let p: Pos = $.markAsStructValue(new Pos())
	let __goscriptTuple4: any = fmt.Sscanf("L12C3", "L%dC%d", $.interfaceValue($.fieldRef(p._fields, "Line"), "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))), $.interfaceValue($.fieldRef(p._fields, "Char"), "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))
	n = __goscriptTuple4[0]
	err = __goscriptTuple4[1]
	await $.println("struct fields:", n, err == null, p.Line, p.Char)

	let s: $.VarRef<string> = $.varRef("")
	let v: $.VarRef<number> = $.varRef(0)
	let __goscriptTuple5: any = fmt.Sscanf("name 7", "%s %v", $.interfaceValue(s, "*string", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("string"))), $.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))
	n = __goscriptTuple5[0]
	err = __goscriptTuple5[1]
	await $.println("s v:", n, err == null, s.value, v.value)

	let bl: $.VarRef<boolean> = $.varRef(false)
	let __goscriptTuple6: any = fmt.Sscanf("true", "%t", $.interfaceValue(bl, "*bool", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("bool"))))
	n = __goscriptTuple6[0]
	err = __goscriptTuple6[1]
	await $.println("t:", n, err == null, bl.value)

	let __goscriptTuple7: any = fmt.Sscanf("abc", "%d", $.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))))
	n = __goscriptTuple7[0]
	err = __goscriptTuple7[1]
	await $.println("bad int:", n, err != null)

	let __goscriptTuple8: any = fmt.Sscanf("12", "%d %d", $.interfaceValue(v, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))), $.interfaceValue(i64, "*int64", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int64"))))
	n = __goscriptTuple8[0]
	err = __goscriptTuple8[1]
	await $.println("short:", n, err != null, v.value)

	let a: $.VarRef<number> = $.varRef(0)
	let c: $.VarRef<number> = $.varRef(0)
	let word: $.VarRef<string> = $.varRef("")
	let __goscriptTuple9: any = fmt.Sscan("3  4\n hello", $.interfaceValue(a, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))), $.interfaceValue(c, "*int", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("int"))), $.interfaceValue(word, "*string", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("string"))))
	n = __goscriptTuple9[0]
	err = __goscriptTuple9[1]
	await $.println("Sscan:", n, err == null, a.value, c.value, word.value)
	let fl: $.VarRef<number> = $.varRef(0)
	let __goscriptTuple10: any = fmt.Sscan("1.25", $.interfaceValue(fl, "*float64", /* @__PURE__ */ $.pointerType(/* @__PURE__ */ $.basicType("float64"))))
	n = __goscriptTuple10[0]
	err = __goscriptTuple10[1]
	await $.println("Sscan float:", n, err == null, fl.value)
}

if ($.isMainScript(import.meta)) {
	await main()
}

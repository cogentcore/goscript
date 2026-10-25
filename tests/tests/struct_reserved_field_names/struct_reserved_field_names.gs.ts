// Generated file based on struct_reserved_field_names.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"
import * as json from "@goscript/encoding/json/index.js"
import * as fmt from "@goscript/fmt/index.js"
import * as reflect from "@goscript/reflect/index.js"

export class odd {
	public declare ___proto__: number

	public declare _constructor: string

	public declare Name: string

	constructor(__goscriptValue?: boolean, ___proto__$?: number, _constructor$?: string, Name$?: string) {
		this.___proto__ = ___proto__$ ?? 0
		this._constructor = _constructor$ ?? ""
		this.Name = Name$ ?? ""
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): odd {
		return new odd(true, this.___proto__, this._constructor, this.Name)
	}

	public __goscriptAssign(source: odd): this {
		this.___proto__ = source.___proto__
		this._constructor = source._constructor
		this.Name = source.Name
		return this
	}

	static __typeInfo = $.registerStructType(
		"main.odd",
		() => new odd(),
		() => [],
		odd,
		() => [/* @__PURE__ */ $.structField("__proto__", /* @__PURE__ */ $.basicType("int"), [0], 0, false, { key: "___proto__", pkgPath: "github.com/s4wave/goscript/tests/tests/struct_reserved_field_names" }), /* @__PURE__ */ $.structField("constructor", /* @__PURE__ */ $.basicType("string"), [1], 8, false, { key: "_constructor", pkgPath: "github.com/s4wave/goscript/tests/tests/struct_reserved_field_names" }), /* @__PURE__ */ $.structField("Name", /* @__PURE__ */ $.basicType("string"), [2], 24, true, { tag: "json:\"name\"" })]
	)
}

export async function main(): globalThis.Promise<void> {
	// Fields named like JavaScript object internals are ordinary fields.
	let v = new odd(true, 7, "c", "n")
	let w = (v).clone()
	w.___proto__ = 8
	let p = $.fieldRef(v, "___proto__")
	p!.value += 1
	fmt.Println($.basicInterfaceValue(v.___proto__, "int"), v._constructor, v.Name, $.basicInterfaceValue(w.___proto__, "int"))

	// The struct keeps its type and methods.
	fmt.Printf("%v %+v\n", $.structInterfaceValue((v).clone(), "main.odd", "main.odd"), $.structInterfaceValue(w, "main.odd", "main.odd"))
	fmt.Println((__goscriptAwait = $.pointerValue<Exclude<reflect.Type, null>>(reflect.TypeOf($.structInterfaceValue((v).clone(), "main.odd", "main.odd"))).String(), __goscriptAwait instanceof Promise ? await __goscriptAwait : __goscriptAwait), $.basicInterfaceValue(reflect.ValueOf($.structInterfaceValue((v).clone(), "main.odd", "main.odd")).Field(0).Int(), "int64"), reflect.ValueOf($.structInterfaceValue((v).clone(), "main.odd", "main.odd")).Field(1).String())
	fmt.Println($.structEqual(v, new odd(true, 8, "c", "n")))
	let __goscriptTuple0: any = (json.Marshal($.structInterfaceValue((v).clone(), "main.odd", "main.odd")) as [$.Slice<number>, $.GoError])
	let data: $.Slice<number> = __goscriptTuple0[0]
	let err: $.GoError = __goscriptTuple0[1]
	fmt.Println($.bytesToString(data), err == null)
}

var __goscriptAwait: any

if ($.isMainScript(import.meta)) {
	await main()
}
